import psycopg2
import os
from pathlib import Path

def initialize_database():
    """初始化資料庫：完全刪除舊表格並重新建立（用於新環境部署）"""
    try:
        # 连接到数据库 - 优先使用 DATABASE_URL（Replit/生产环境）
        database_url = os.getenv('DATABASE_URL')
        if database_url:
            conn = psycopg2.connect(database_url)
        else:
            conn = psycopg2.connect(
                host=os.getenv('DB_HOST', 'localhost'),
                port=os.getenv('DB_PORT', '5432'),
                database=os.getenv('DB_NAME', 'python_learning'),
                user=os.getenv('DB_USER', 'postgres'),
                password=os.getenv('DB_PASSWORD', 'admin')
            )
        conn.autocommit = True
        cur = conn.cursor()
        
        print("\n" + "="*60)
        print("🗑️  DROPPING ALL TABLES...")
        print("="*60)
        
        # 删除所有表（按依赖关系反向删除）
        tables = [
            'user_files',
            'code_history',
            'user_achievements',
            'achievements',
            'study_sessions',
            'test_results',
            'practice_attempts',
            'user_progress',
            'users'
        ]
        
        for table in tables:
            cur.execute(f"DROP TABLE IF EXISTS {table} CASCADE")
            print(f"  ✅ Dropped table: {table}")
        
        print("\n" + "="*60)
        print("🔨 CREATING TABLES...")
        print("="*60)
        
        # 读取schema文件 - 使用脚本所在目录的绝对路径
        script_dir = Path(__file__).parent
        schema_path = script_dir / 'schema_fixed.sql'
        with open(schema_path, 'r', encoding='utf-8') as f:
            schema_sql = f.read()
        
        # 执行schema创建
        cur.execute(schema_sql)
        print("  ✅ All tables created successfully")
        
        print("\n" + "="*60)
        print("👤 CREATING DEFAULT USER...")
        print("="*60)
        
        # 插入默认测试用户
        cur.execute("""
            INSERT INTO users (username, email, password_hash)
            VALUES ('testuser', 'test@example.com', 'test_hash_placeholder')
            RETURNING user_id
        """)
        user_id = cur.fetchone()[0]
        print(f"  ✅ Created user with ID: {user_id}")
        
        print("\n" + "="*60)
        print("✅ DATABASE REBUILD COMPLETE!")
        print("="*60)
        print(f"  Database: python_learning")
        print(f"  User ID: {user_id}")
        print(f"  All tables: EMPTY")
        print("="*60 + "\n")
        
        cur.close()
        conn.close()
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    initialize_database()
