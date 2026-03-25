import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime, timedelta
from dotenv import load_dotenv
from ai_service import ai_service

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database connection
def get_db_connection():
    # Use DATABASE_URL for Replit/production, fallback to individual vars for local dev
    database_url = os.getenv('DATABASE_URL')
    if database_url:
        return psycopg2.connect(database_url)
    else:
        return psycopg2.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            port=os.getenv('DB_PORT', '5432'),
            database=os.getenv('DB_NAME', 'python_learning'),
            user=os.getenv('DB_USER', 'postgres'),
            password=os.getenv('DB_PASSWORD', 'admin')
        )

# ==================== Dashboard API ====================

@app.route('/api/dashboard/<int:user_id>', methods=['GET'])
def get_dashboard(user_id):
    """获取Dashboard数据"""
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        # 获取总体统计
        cur.execute("""
            SELECT 
                COALESCE(COUNT(DISTINCT CASE WHEN up.is_completed AND up.lesson_type = 'practice' AND up.lesson_id NOT LIKE 'test%%' AND up.lesson_id NOT LIKE 'finalTest%%' THEN up.lesson_id END), 0) as practices_completed,
                COALESCE(COUNT(DISTINCT CASE WHEN tr.is_correct THEN tr.lesson_id END), 0) + COALESCE(COUNT(DISTINCT CASE WHEN pa.is_correct AND (pa.lesson_id LIKE 'test%%' OR pa.lesson_id LIKE 'finalTest%%') THEN pa.lesson_id END), 0) as tests_passed
            FROM users u
            LEFT JOIN user_progress up ON u.user_id = up.user_id
            LEFT JOIN test_results tr ON u.user_id = tr.user_id
            LEFT JOIN practice_attempts pa ON u.user_id = pa.user_id
            WHERE u.user_id = %s
        """, (user_id,))
        stats_result = cur.fetchone()
        
        # 如果用户不存在，返回默认值
        if not stats_result:
            stats = {'practices_completed': 0, 'tests_passed': 0}
        else:
            stats = stats_result
        
        # 获取连续学习天数（基于完成练习的日期）
        cur.execute("""
            SELECT COALESCE(COUNT(*), 0) as streak
            FROM (
                SELECT activity_date,
                       LAG(activity_date) OVER (ORDER BY activity_date DESC) as prev_date
                FROM (
                    SELECT DISTINCT DATE(completed_at) as activity_date
                    FROM user_progress
                    WHERE user_id = %s AND is_completed = true AND completed_at IS NOT NULL
                    ORDER BY activity_date DESC
                ) dates
            ) calc
            WHERE prev_date IS NULL OR (prev_date - activity_date) = 1
        """, (user_id,))
        streak_result_raw = cur.fetchone()
        streak_result = streak_result_raw if streak_result_raw else {'streak': 0}
        
        # 定义每个章节的练习课程总数（根据课程设计）
        chapter_lesson_counts = {
            '1': 3,   # Chapter 1: 1.1, 1.2, 1.3
            '2': 3,   # Chapter 2: 2.1, 2.2, 2.3
            '3': 2,   # Chapter 3: 3.1, 3.2
            '4': 4,   # Chapter 4: 4.1, 4.2, 4.3, 4.4
            '5': 3,   # Chapter 5: 5.1, 5.2, 5.3
            '6': 3,   # Chapter 6: 6.1, 6.2, 6.3
            '7': 3,   # Chapter 7: 7.1, 7.2, 7.3
            '8': 3,   # Chapter 8: 8.1, 8.2, 8.3
            '9': 4,   # Chapter 9: 9.1, 9.2, 9.3, 9.4
            '10': 3   # Chapter 10: 10.1, 10.2, 10.3
        }
        
        # 获取用户完成的practice课程
        cur.execute("""
            SELECT 
                SPLIT_PART(pa.lesson_id, '.', 1) as chapter,
                COUNT(DISTINCT pa.lesson_id) as completed
            FROM practice_attempts pa
            WHERE pa.user_id = %s 
                AND pa.is_correct = true
                AND SPLIT_PART(pa.lesson_id, '.', 1) ~ '^[0-9]+$'
            GROUP BY SPLIT_PART(pa.lesson_id, '.', 1)
            ORDER BY SPLIT_PART(pa.lesson_id, '.', 1)::integer
        """, (user_id,))
        user_chapter_progress = {str(row['chapter']): row['completed'] for row in cur.fetchall()}
        
        # 格式化章节进度 - 包含所有10个章节
        formatted_chapters = []
        for chapter_num in range(1, 11):
            chapter_str = str(chapter_num)
            total = chapter_lesson_counts[chapter_str]
            completed = user_chapter_progress.get(chapter_str, 0)
            percentage = int(round((completed / total) * 100)) if total > 0 else 0
            
            formatted_chapters.append({
                'chapter': f'Ch {chapter_num}',
                'completed': completed,
                'total': total,
                'percentage': percentage
            })
        
        
        # 获取薄弱环节
        cur.execute("""
            SELECT 
                lesson_id as topic,
                ROUND(100.0 * SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) / COUNT(*), 0) as accuracy,
                COUNT(*) as attempts
            FROM practice_attempts
            WHERE user_id = %s
            GROUP BY lesson_id
            HAVING COUNT(*) >= 3
            ORDER BY accuracy ASC
            LIMIT 5
        """, (user_id,))
        weak_points = cur.fetchall()
        
        # 计算总体进度（假设31个practice）
        practices_completed = stats.get('practices_completed', 0) or 0
        overall_progress = round((practices_completed / 31) * 100) if practices_completed > 0 else 0
        
        cur.close()
        conn.close()
        
        return jsonify({
            'stats': {
                'overallProgress': overall_progress,
                'practicesCompleted': practices_completed,
                'totalPractices': 31,
                'testsPassed': stats.get('tests_passed', 0) or 0,
                'totalTests': 3,  # Mid-Test 1, Mid-Test 2, Final Test
                'currentStreak': streak_result.get('streak', 0) or 0,
                'achievements': []
            },
            'chapterProgress': formatted_chapters,
            'weakPoints': [dict(row) for row in weak_points] if weak_points else []
        })
        
    except Exception as e:
        import traceback
        print(f"Error in get_dashboard: {e}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

# ==================== Practice API ====================

@app.route('/api/practice/submit', methods=['POST'])
def submit_practice():
    """提交练习代码"""
    try:
        data = request.json
        conn = get_db_connection()
        cur = conn.cursor()
        
        # 插入练习记录
        cur.execute("""
            INSERT INTO practice_attempts 
            (user_id, lesson_id, submitted_code, output, expected_output, is_correct, time_spent)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING attempt_id
        """, (
            data['userId'], data['lessonId'], data['submittedCode'],
            data['output'], data['expectedOutput'], data['isCorrect'],
            data.get('timeSpent', 0)
        ))
        
        attempt_id = cur.fetchone()[0]
        
        # 如果正确，更新进度
        if data['isCorrect']:
            cur.execute("""
                INSERT INTO user_progress (user_id, lesson_id, lesson_type, is_completed, completed_at, last_accessed)
                VALUES (%s, %s, 'practice', true, NOW(), NOW())
                ON CONFLICT (user_id, lesson_id, lesson_type) 
                DO UPDATE SET is_completed = true, completed_at = NOW(), last_accessed = NOW()
            """, (data['userId'], data['lessonId']))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({'success': True, 'attemptId': attempt_id})
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

# ==================== Test API ====================

@app.route('/api/test/submit', methods=['POST'])
def submit_test():
    """提交测验答案"""
    try:
        data = request.json
        conn = get_db_connection()
        cur = conn.cursor()
        
        # 插入测验记录
        cur.execute("""
            INSERT INTO test_results 
            (user_id, lesson_id, selected_answer, correct_answer, is_correct)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING test_id
        """, (
            data['userId'], data['lessonId'], data['selectedAnswer'],
            data['correctAnswer'], data['isCorrect']
        ))
        
        test_id = cur.fetchone()[0]
        
        # 如果正确，更新进度
        if data['isCorrect']:
            cur.execute("""
                INSERT INTO user_progress (user_id, lesson_id, lesson_type, is_completed, completed_at)
                VALUES (%s, %s, 'test', true, NOW())
                ON CONFLICT (user_id, lesson_id, lesson_type) 
                DO UPDATE SET is_completed = true, completed_at = NOW()
            """, (data['userId'], data['lessonId']))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({'success': True, 'testId': test_id})
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

# ==================== Final Test Answers API ====================

@app.route('/api/final-test/answers/<int:user_id>', methods=['GET'])
def get_final_test_answers(user_id):
    """獲取用戶的 Final Test 答案"""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute("""
            SELECT question_type, question_index, answer_data
            FROM final_test_answers
            WHERE user_id = %s
            ORDER BY question_type, question_index
        """, (user_id,))
        
        rows = cur.fetchall()
        
        # 組織答案數據
        answers = {
            'mc': {},
            'dropdown': {},
            'coding': {}
        }
        
        for row in rows:
            question_type, question_index, answer_data = row
            if question_type == 'mc':
                answers['mc'][question_index] = answer_data
            elif question_type == 'dropdown':
                answers['dropdown'][question_index] = answer_data
            elif question_type == 'coding':
                answers['coding'][question_index] = answer_data
        
        cur.close()
        conn.close()
        
        return jsonify({'success': True, 'answers': answers})
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/final-test/answers', methods=['POST'])
def save_final_test_answer():
    """保存 Final Test 答案"""
    try:
        data = request.json
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute("""
            INSERT INTO final_test_answers 
            (user_id, question_type, question_index, answer_data, updated_at)
            VALUES (%s, %s, %s, %s, NOW())
            ON CONFLICT (user_id, question_type, question_index)
            DO UPDATE SET 
                answer_data = EXCLUDED.answer_data,
                updated_at = NOW()
            RETURNING answer_id
        """, (
            data['userId'],
            data['questionType'],
            data['questionIndex'],
            json.dumps(data['answerData'])
        ))
        
        answer_id = cur.fetchone()[0]
        
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({'success': True, 'answerId': answer_id})
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/final-test/answers/<int:user_id>', methods=['DELETE'])
def clear_final_test_answers(user_id):
    """清除用戶的 Final Test 答案 (Restart)"""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute("""
            DELETE FROM final_test_answers
            WHERE user_id = %s
        """, (user_id,))
        
        deleted_count = cur.rowcount
        
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({
            'success': True, 
            'message': f'Cleared {deleted_count} answers',
            'deletedCount': deleted_count
        })
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

# ==================== Code History API ====================

@app.route('/api/code/save', methods=['POST'])
def save_code():
    """保存用户代码到历史记录"""
    try:
        data = request.json
        conn = get_db_connection()
        cur = conn.cursor()
        
        # 检查是否已存在该课程的代码
        cur.execute("""
            SELECT history_id FROM code_history
            WHERE user_id = %s AND lesson_id = %s
            ORDER BY saved_at DESC
            LIMIT 1
        """, (data['userId'], data['lessonId']))
        
        existing = cur.fetchone()
        
        if existing:
            # 更新现有记录
            cur.execute("""
                UPDATE code_history
                SET code = %s, saved_at = NOW()
                WHERE history_id = %s
            """, (data['code'], existing[0]))
        else:
            # 创建新记录
            cur.execute("""
                INSERT INTO code_history (user_id, lesson_id, code)
                VALUES (%s, %s, %s)
            """, (data['userId'], data['lessonId'], data['code']))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({'success': True})
        
    except Exception as e:
        print(f"Error saving code: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/code/get/<int:user_id>/<lesson_id>', methods=['GET'])
def get_code(user_id, lesson_id):
    """获取用户保存的代码"""
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute("""
            SELECT code, saved_at
            FROM code_history
            WHERE user_id = %s AND lesson_id = %s
            ORDER BY saved_at DESC
            LIMIT 1
        """, (user_id, lesson_id))
        
        result = cur.fetchone()
        cur.close()
        conn.close()
        
        if result:
            return jsonify({
                'success': True,
                'code': result['code'],
                'savedAt': result['saved_at'].isoformat() if result['saved_at'] else None
            })
        else:
            return jsonify({'success': True, 'code': None})
        
    except Exception as e:
        print(f"Error getting code: {e}")
        return jsonify({'error': str(e)}), 500

# ==================== File Management API ====================

@app.route('/api/files/list/<int:user_id>', methods=['GET'])
def list_files(user_id):
    """获取用户的所有文件"""
    try:
        lesson_id = request.args.get('lessonId')
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        if lesson_id:
            # 获取特定课程的文件
            cur.execute("""
                SELECT file_id, file_name, file_type, created_at, updated_at,
                       LENGTH(file_content) as file_size
                FROM user_files
                WHERE user_id = %s AND lesson_id = %s
                ORDER BY file_name
            """, (user_id, lesson_id))
        else:
            # 获取所有文件
            cur.execute("""
                SELECT file_id, file_name, file_type, lesson_id, created_at, updated_at,
                       LENGTH(file_content) as file_size
                FROM user_files
                WHERE user_id = %s
                ORDER BY lesson_id, file_name
            """, (user_id,))
        
        files = cur.fetchall()
        cur.close()
        conn.close()
        
        return jsonify({
            'success': True,
            'files': [dict(f) for f in files]
        })
        
    except Exception as e:
        print(f"Error listing files: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/files/create', methods=['POST'])
def create_file():
    """创建新文件"""
    try:
        data = request.json
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute("""
            INSERT INTO user_files (user_id, lesson_id, file_name, file_content, file_type)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (user_id, lesson_id, file_name)
            DO UPDATE SET file_content = EXCLUDED.file_content, 
                         updated_at = NOW()
            RETURNING file_id
        """, (
            data['userId'],
            data.get('lessonId'),
            data['fileName'],
            data.get('fileContent', ''),
            data.get('fileType', 'text')
        ))
        
        file_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({'success': True, 'fileId': file_id})
        
    except Exception as e:
        print(f"Error creating file: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/files/read/<int:file_id>', methods=['GET'])
def read_file(file_id):
    """读取文件内容"""
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute("""
            SELECT file_id, file_name, file_content, file_type, created_at, updated_at
            FROM user_files
            WHERE file_id = %s
        """, (file_id,))
        
        file_data = cur.fetchone()
        cur.close()
        conn.close()
        
        if file_data:
            return jsonify({
                'success': True,
                'file': dict(file_data)
            })
        else:
            return jsonify({'error': 'File not found'}), 404
        
    except Exception as e:
        print(f"Error reading file: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/files/update/<int:file_id>', methods=['PUT'])
def update_file(file_id):
    """更新文件内容"""
    try:
        data = request.json
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute("""
            UPDATE user_files
            SET file_content = %s, updated_at = NOW()
            WHERE file_id = %s
        """, (data['fileContent'], file_id))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({'success': True})
        
    except Exception as e:
        print(f"Error updating file: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/files/delete/<int:file_id>', methods=['DELETE'])
def delete_file(file_id):
    """删除文件"""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute("DELETE FROM user_files WHERE file_id = %s", (file_id,))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({'success': True})
        
    except Exception as e:
        print(f"Error deleting file: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/files/execute-with-files', methods=['POST'])
def execute_with_files():
    """在临时环境中执行代码，支持文件操作"""
    import tempfile
    import shutil
    import subprocess
    
    try:
        data = request.json
        user_id = data['userId']
        lesson_id = data.get('lessonId')
        code = data['code']
        
        # 创建临时目录
        temp_dir = tempfile.mkdtemp()
        
        try:
            # 从数据库获取用户文件
            conn = get_db_connection()
            cur = conn.cursor(cursor_factory=RealDictCursor)
            
            # 修改查询：获取用户所有文件（不限制 lesson_id）
            cur.execute("""
                SELECT file_name, file_content, lesson_id
                FROM user_files
                WHERE user_id = %s
                ORDER BY created_at DESC
            """, (user_id,))
            
            files = cur.fetchall()
            
            # 打印调试信息
            print(f"📂 [DEBUG] Found {len(files)} files for user {user_id}")
            for file in files:
                print(f"   - {file['file_name']} (lesson: {file.get('lesson_id', 'None')})")
            
            # 记录原始文件名和内容
            original_files = {file['file_name'] for file in files}
            original_file_contents = {file['file_name']: file['file_content'] for file in files}
            
            # 在临时目录创建文件
            for file in files:
                file_path = os.path.join(temp_dir, file['file_name'])
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(file['file_content'])
                print(f"✅ [DEBUG] Created file: {file['file_name']}")
            
            # 创建代码文件
            code_file = os.path.join(temp_dir, 'main.py')
            with open(code_file, 'w', encoding='utf-8') as f:
                f.write(code)
            print(f"✅ [DEBUG] Created main.py in {temp_dir}")
            print(f"📁 [DEBUG] Files in temp dir: {os.listdir(temp_dir)}")
            
            # 执行代码
            result = subprocess.run(
                ['python', 'main.py'],
                cwd=temp_dir,
                capture_output=True,
                text=True,
                timeout=5
            )
            
            print(f"🔍 [DEBUG] Execution completed with return code: {result.returncode}")
            
            output = result.stdout
            if result.stderr:
                output += '\n' + result.stderr
            
            # 检查新创建的文件和修改的文件
            new_files_saved = []
            modified_files_saved = []
            if result.returncode == 0:  # 只在成功执行时保存文件
                current_files = set(os.listdir(temp_dir))
                new_file_names = current_files - original_files - {'main.py'}
                
                # 保存新创建的文件
                for new_file_name in new_file_names:
                    try:
                        file_path = os.path.join(temp_dir, new_file_name)
                        
                        # 读取新文件内容
                        with open(file_path, 'r', encoding='utf-8') as f:
                            new_content = f.read()
                        
                        # 确定文件类型
                        ext = new_file_name.split('.')[-1].lower() if '.' in new_file_name else ''
                        file_type_map = {'txt': 'text', 'csv': 'csv', 'json': 'json', 'py': 'python'}
                        file_type = file_type_map.get(ext, 'text')
                        
                        # 保存到数据库
                        cur.execute("""
                            INSERT INTO user_files (user_id, lesson_id, file_name, file_content, file_type)
                            VALUES (%s, %s, %s, %s, %s)
                            ON CONFLICT (user_id, lesson_id, file_name)
                            DO UPDATE SET file_content = EXCLUDED.file_content, updated_at = NOW()
                        """, (user_id, lesson_id, new_file_name, new_content, file_type))
                        
                        new_files_saved.append(new_file_name)
                        
                    except Exception as e:
                        print(f"Error saving new file {new_file_name}: {e}")
                
                # 检查并保存修改的文件（append mode）
                for original_file_name in original_files:
                    try:
                        file_path = os.path.join(temp_dir, original_file_name)
                        
                        # 读取当前文件内容
                        if os.path.exists(file_path):
                            with open(file_path, 'r', encoding='utf-8') as f:
                                current_content = f.read()
                            
                            # 比较内容是否改变
                            if current_content != original_file_contents[original_file_name]:
                                # 确定文件类型
                                ext = original_file_name.split('.')[-1].lower() if '.' in original_file_name else ''
                                file_type_map = {'txt': 'text', 'csv': 'csv', 'json': 'json', 'py': 'python'}
                                file_type = file_type_map.get(ext, 'text')
                                
                                # 更新数据库
                                cur.execute("""
                                    UPDATE user_files
                                    SET file_content = %s, updated_at = NOW()
                                    WHERE user_id = %s AND file_name = %s
                                """, (current_content, user_id, original_file_name))
                                
                                modified_files_saved.append(original_file_name)
                                print(f"✅ [DEBUG] Modified file saved: {original_file_name}")
                        
                    except Exception as e:
                        print(f"Error checking modified file {original_file_name}: {e}")
                
                if new_files_saved or modified_files_saved:
                    conn.commit()
                    print(f"💾 [DEBUG] Saved {len(new_files_saved)} new files, {len(modified_files_saved)} modified files")
            
            cur.close()
            conn.close()
            
            return jsonify({
                'success': True,
                'output': output,
                'returnCode': result.returncode,
                'newFiles': new_files_saved,
                'modifiedFiles': modified_files_saved
            })
            
        finally:
            # 清理临时目录
            shutil.rmtree(temp_dir, ignore_errors=True)
        
    except subprocess.TimeoutExpired:
        return jsonify({'error': 'Code execution timeout'}), 500
    except Exception as e:
        print(f"Error executing code with files: {e}")
        return jsonify({'error': str(e)}), 500

# ==================== AI Hint API ====================

@app.route('/api/ai/get-hint', methods=['POST'])
def get_ai_hint():
    """Get AI-generated hint for student code"""
    try:
        data = request.json
        
        # Generate hint using AI service
        result = ai_service.get_hint(
            student_code=data.get('studentCode', ''),
            exercise_desc=data.get('exerciseDescription', ''),
            expected_output=data.get('expectedOutput', ''),
            current_output=data.get('currentOutput', ''),
            hint_level=data.get('hintLevel', 1)
        )
        
        if result['success']:
            # Optionally save hint to database for tracking
            try:
                conn = get_db_connection()
                cur = conn.cursor()
                
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS hint_requests (
                        hint_id SERIAL PRIMARY KEY,
                        user_id INTEGER,
                        lesson_id VARCHAR(20),
                        student_code TEXT,
                        hint_level INTEGER,
                        hint_text TEXT,
                        created_at TIMESTAMP DEFAULT NOW()
                    )
                """)
                
                cur.execute("""
                    INSERT INTO hint_requests 
                    (user_id, lesson_id, student_code, hint_level, hint_text)
                    VALUES (%s, %s, %s, %s, %s)
                """, (
                    data.get('userId', 1), 
                    data.get('lessonId', ''),
                    data.get('studentCode', ''),
                    result['hintLevel'],
                    result['hint']
                ))
                
                conn.commit()
                cur.close()
                conn.close()
            except Exception as db_error:
                print(f"Warning: Could not save hint to database: {db_error}")
        
        return jsonify(result)
        
    except Exception as e:
        print(f"Error getting AI hint: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

# ==================== Reset Database ====================

@app.route('/api/reset-database', methods=['POST'])
def reset_database():
    """重置数据库所有学习记录（开发环境专用）"""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # 清空所有表
        tables = [
            'user_files',
            'code_history',
            'user_achievements',
            'achievements',
            'study_sessions',
            'test_results',
            'practice_attempts',
            'user_progress'
        ]
        
        deleted_counts = {}
        for table in tables:
            cur.execute(f"DELETE FROM {table}")
            deleted_counts[table] = cur.rowcount
        
        # 重置序列
        sequences = [
            'users_user_id_seq',
            'user_progress_progress_id_seq',
            'practice_attempts_attempt_id_seq',
            'test_results_result_id_seq',
            'study_sessions_session_id_seq',
            'achievements_achievement_id_seq',
            'user_achievements_user_achievement_id_seq',
            'code_history_history_id_seq',
            'user_files_file_id_seq'
        ]
        
        for seq_name in sequences:
            try:
                restart_val = 2 if seq_name == 'users_user_id_seq' else 1
                cur.execute(f"ALTER SEQUENCE {seq_name} RESTART WITH {restart_val}")
            except Exception as e:
                print(f"Warning: Could not reset sequence {seq_name}: {e}")
        
        conn.commit()
        
        # 验证用户还在
        cur.execute("SELECT COUNT(*) FROM users WHERE user_id = 1")
        user_count = cur.fetchone()[0]
        
        cur.close()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': '数据库已重置',
            'deleted': deleted_counts,
            'users_preserved': user_count
        })
        
    except Exception as e:
        print(f"Error resetting database: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

# ==================== Lesson Status API ====================

@app.route('/api/lesson/status/<int:user_id>/<lesson_id>', methods=['GET'])
def get_lesson_status(user_id, lesson_id):
    """获取课程的完成状态"""
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        # 检查practice是否完成
        cur.execute("""
            SELECT is_completed, completed_at
            FROM user_progress
            WHERE user_id = %s AND lesson_id = %s AND lesson_type = 'practice'
        """, (user_id, lesson_id))
        practice_result = cur.fetchone()
        
        # 检查test是否完成
        cur.execute("""
            SELECT is_completed, completed_at
            FROM user_progress
            WHERE user_id = %s AND lesson_id = %s AND lesson_type = 'test'
        """, (user_id, lesson_id))
        test_result = cur.fetchone()
        
        cur.close()
        conn.close()
        
        return jsonify({
            'success': True,
            'practiceCompleted': practice_result['is_completed'] if practice_result else False,
            'testCompleted': test_result['is_completed'] if test_result else False,
            'practiceCompletedAt': practice_result['completed_at'].isoformat() if (practice_result and practice_result['completed_at']) else None,
            'testCompletedAt': test_result['completed_at'].isoformat() if (test_result and test_result['completed_at']) else None
        })
        
    except Exception as e:
        print(f"Error getting lesson status: {e}")
        return jsonify({'error': str(e)}), 500

# ==================== Health Check ====================

@app.route('/api/health', methods=['GET'])
def health_check():
    """健康检查"""
    try:
        conn = get_db_connection()
        conn.close()
        return jsonify({'status': 'ok', 'database': 'connected'})
    except:
        return jsonify({'status': 'error', 'database': 'disconnected'}), 500

if __name__ == '__main__':
    print("\n" + "=" * 50)
    print("Flask Server Starting...")
    print("=" * 50)
    print("Dashboard: http://127.0.0.1:5000/api/dashboard/1")
    print("Health: http://127.0.0.1:5000/api/health")
    print("=" * 50 + "\n")
    app.run(debug=True, port=5000, use_reloader=False)
