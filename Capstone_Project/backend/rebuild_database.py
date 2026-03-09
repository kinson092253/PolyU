import psycopg2
import os

def rebuild_database():
    """Complete database rebuild: drop all tables and recreate from schema"""
    
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
    cursor = conn.cursor()
    
    print("Starting database rebuild...")
    
    # Drop all tables in correct order (reverse dependency)
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
        try:
            cursor.execute(f"DROP TABLE IF EXISTS {table} CASCADE")
            print(f"✅ Dropped table: {table}")
        except Exception as e:
            print(f"❌ Error dropping {table}: {e}")
    
    # Read and execute schema file
    schema_path = os.path.join(os.path.dirname(__file__), 'database', 'schema_fixed.sql')
    
    with open(schema_path, 'r', encoding='utf-8') as f:
        schema_sql = f.read()
    
    try:
        cursor.execute(schema_sql)
        print("✅ All tables created successfully")
    except Exception as e:
        print(f"❌ Error creating tables: {e}")
        return
    
    # Create default test user
    try:
        cursor.execute("""
            INSERT INTO users (username, email, password_hash)
            VALUES ('testuser', 'test@example.com', 'test_hash_placeholder')
            RETURNING user_id
        """)
        user_id = cursor.fetchone()[0]
        print(f"✅ Created user with ID: {user_id}")
    except Exception as e:
        print(f"❌ Error creating user: {e}")
    
    cursor.close()
    conn.close()
    
    print("\n" + "="*50)
    print("DATABASE REBUILD COMPLETE!")
    print("="*50)
    print(f"Database: {db_params['database']}")
    print(f"User ID: {user_id}")
    print("All tables: EMPTY")
    print("Ready for testing!")

if __name__ == '__main__':
    rebuild_database()
