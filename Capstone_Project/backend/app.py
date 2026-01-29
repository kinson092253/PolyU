from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import subprocess
import tempfile
import os
import signal
import time
from datetime import timedelta

# 導入數據庫模組
from database.db import init_db_pool, test_connection, get_db_cursor, execute_query

app = Flask(__name__)
CORS(app)  # 允許前端跨域請求

# 配置
EXECUTION_TIMEOUT = 5  # 代碼執行超時時間（秒）
MAX_OUTPUT_LENGTH = 10000  # 最大輸出長度

# JWT 配置
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
jwt = JWTManager(app)

# 初始化數據庫連接池（Flask 3.0+ 方式）
def initialize_database():
    """應用啟動時初始化數據庫"""
    print("🔧 Initializing database connection...")
    if init_db_pool():
        print("✅ Database pool initialized")
        test_connection()
    else:
        print("⚠️ Failed to initialize database pool")

# 在應用上下文中初始化
with app.app_context():
    initialize_database()

def execute_python_code(code, stdin_input=''):
    """
    在隔離環境中執行 Python 代碼
    
    Args:
        code: Python 代碼
        stdin_input: 標準輸入內容（用於 input() 函數）
    """
    try:
        # 如果有 input()，包裝代碼以隱藏提示
        if stdin_input and 'input(' in code:
            wrapper_code = '''import sys
_input_values = """''' + stdin_input + '''""".strip().split('\\n')
_input_index = 0

def _custom_input(prompt=''):
    global _input_index
    if _input_index >= len(_input_values):
        raise EOFError('No more input values')
    value = _input_values[_input_index]
    _input_index += 1
    return value

input = _custom_input

''' + code
            code = wrapper_code
        
        # 創建臨時文件來存儲用戶代碼
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False, encoding='utf-8') as f:
            f.write(code)
            temp_file = f.name
        
        try:
            # 使用 subprocess 執行代碼，設置超時和資源限制
            result = subprocess.run(
                ['python', temp_file],
                capture_output=True,
                text=True,
                timeout=EXECUTION_TIMEOUT,
                # 限制資源使用
                env={**os.environ, 'PYTHONDONTWRITEBYTECODE': '1'}
            )
            
            # 獲取輸出
            stdout = result.stdout
            stderr = result.stderr
            
            # 限制輸出長度
            if len(stdout) > MAX_OUTPUT_LENGTH:
                stdout = stdout[:MAX_OUTPUT_LENGTH] + '\n... (輸出過長，已截斷)'
            
            if len(stderr) > MAX_OUTPUT_LENGTH:
                stderr = stderr[:MAX_OUTPUT_LENGTH] + '\n... (錯誤訊息過長，已截斷)'
            
            # 返回結果
            if result.returncode == 0:
                return {
                    'success': True,
                    'output': stdout,
                    'error': stderr if stderr else None
                }
            else:
                return {
                    'success': False,
                    'output': stdout,
                    'error': stderr or '程式執行失敗'
                }
                
        finally:
            # 清理臨時文件
            if os.path.exists(temp_file):
                os.remove(temp_file)
                
    except subprocess.TimeoutExpired:
        return {
            'success': False,
            'output': '',
            'error': f'代碼執行超時（超過 {EXECUTION_TIMEOUT} 秒）\n提示：可能存在無限迴圈或耗時操作'
        }
    except Exception as e:
        return {
            'success': False,
            'output': '',
            'error': f'執行錯誤：{str(e)}'
        }

@app.route('/api/health', methods=['GET'])
def health_check():
    """健康檢查端點"""
    db_status = 'connected'
    try:
        with get_db_cursor() as cursor:
            cursor.execute("SELECT 1")
    except:
        db_status = 'disconnected'
    
    return jsonify({
        'status': 'ok', 
        'message': 'Python 執行服務運行中',
        'database': db_status
    })

# ============================================
# 用戶認證 API
# ============================================

@app.route('/api/auth/register', methods=['POST'])
def register():
    """用戶註冊"""
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        full_name = data.get('full_name', '')
        
        # 驗證必填字段
        if not all([username, email, password]):
            return jsonify({'error': '用戶名、郵箱和密碼為必填項'}), 400
        
        # 檢查用戶名是否已存在
        with get_db_cursor() as cursor:
            cursor.execute("SELECT id FROM users WHERE username = %s", (username,))
            if cursor.fetchone():
                return jsonify({'error': '用戶名已存在'}), 409
            
            cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
            if cursor.fetchone():
                return jsonify({'error': '郵箱已被註冊'}), 409
            
            # 創建新用戶
            password_hash = generate_password_hash(password)
            cursor.execute("""
                INSERT INTO users (username, email, password_hash, full_name)
                VALUES (%s, %s, %s, %s)
                RETURNING id, username, email, full_name, role, created_at
            """, (username, email, password_hash, full_name))
            
            user = cursor.fetchone()
        
        # 生成 JWT token
        access_token = create_access_token(identity=user['id'])
        
        return jsonify({
            'message': '註冊成功',
            'token': access_token,
            'user': dict(user)
        }), 201
        
    except Exception as e:
        return jsonify({'error': f'註冊失敗：{str(e)}'}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """用戶登入"""
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not all([username, password]):
            return jsonify({'error': '用戶名和密碼為必填項'}), 400
        
        # 查找用戶
        with get_db_cursor() as cursor:
            cursor.execute("""
                SELECT id, username, email, password_hash, full_name, role, created_at
                FROM users WHERE username = %s
            """, (username,))
            user = cursor.fetchone()
        
        if not user:
            return jsonify({'error': '用戶名或密碼錯誤'}), 401
        
        # 驗證密碼
        if not check_password_hash(user['password_hash'], password):
            return jsonify({'error': '用戶名或密碼錯誤'}), 401
        
        # 更新最後登入時間
        with get_db_cursor() as cursor:
            cursor.execute("""
                UPDATE users SET last_login = CURRENT_TIMESTAMP
                WHERE id = %s
            """, (user['id'],))
        
        # 生成 JWT token
        access_token = create_access_token(identity=user['id'])
        
        # 移除密碼哈希後返回用戶信息
        user_data = dict(user)
        del user_data['password_hash']
        
        return jsonify({
            'message': '登入成功',
            'token': access_token,
            'user': user_data
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'登入失敗：{str(e)}'}), 500

@app.route('/api/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """獲取當前登入用戶信息"""
    try:
        user_id = get_jwt_identity()
        
        with get_db_cursor() as cursor:
            cursor.execute("""
                SELECT id, username, email, full_name, role, created_at, last_login
                FROM users WHERE id = %s
            """, (user_id,))
            user = cursor.fetchone()
        
        if not user:
            return jsonify({'error': '用戶不存在'}), 404
        
        return jsonify({'user': dict(user)}), 200
        
    except Exception as e:
        return jsonify({'error': f'獲取用戶信息失敗：{str(e)}'}), 500

@app.route('/api/execute', methods=['POST'])
def execute_code():
    """
    執行 Python 代碼的 API 端點
    請求格式：{"code": "print('Hello')"}
    """
    try:
        # 獲取請求數據
        data = request.get_json()
        
        if not data or 'code' not in data:
            return jsonify({
                'success': False,
                'error': '請求格式錯誤：缺少 code 欄位'
            }), 400
        
        code = data['code']
        stdin_input = data.get('input', '')  # 獲取標準輸入內容
        
        # 驗證代碼不為空
        if not code.strip():
            return jsonify({
                'success': False,
                'error': '代碼不能為空'
            }), 400
        
        # 基本安全檢查（可根據需要擴展）
        dangerous_imports = ['os', 'subprocess', 'sys', 'importlib', '__import__']
        for dangerous in dangerous_imports:
            if f'import {dangerous}' in code or f'from {dangerous}' in code:
                return jsonify({
                    'success': False,
                    'error': f'出於安全考慮，不允許使用 {dangerous} 模組'
                }), 403
        
        # 執行代碼（傳遞標準輸入）
        result = execute_python_code(code, stdin_input)
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'服務器錯誤：{str(e)}'
        }), 500

@app.route('/api/validate', methods=['POST'])
def validate_code():
    """
    驗證 Python 代碼語法
    """
    try:
        data = request.get_json()
        code = data.get('code', '')
        
        try:
            compile(code, '<string>', 'exec')
            return jsonify({
                'valid': True,
                'message': '語法正確'
            })
        except SyntaxError as e:
            return jsonify({
                'valid': False,
                'error': f'語法錯誤：第 {e.lineno} 行 - {e.msg}'
            })
            
    except Exception as e:
        return jsonify({
            'valid': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    print('🚀 Python 學習平台後端服務已啟動')
    print('📍 API 端點：')
    print('   認證相關：')
    print('   - POST /api/auth/register - 用戶註冊')
    print('   - POST /api/auth/login - 用戶登入')
    print('   - GET  /api/auth/me - 獲取當前用戶信息（需要 JWT）')
    print('   代碼執行：')
    print('   - POST /api/execute - 執行 Python 代碼')
    print('   - POST /api/validate - 驗證代碼語法')
    print('   系統：')
    print('   - GET  /api/health - 健康檢查')
    print('⚠️  注意：這是開發環境，生產環境請使用 Docker 和更嚴格的安全措施')
    
    # 初始化數據庫
    init_db_pool()
    
    app.run(debug=True, host='0.0.0.0', port=5000)
