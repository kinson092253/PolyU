import psycopg2
import os

def get_db_connection():
    """连接数据库 - 使用与api.py相同的配置"""
    return psycopg2.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        port=os.getenv('DB_PORT', '5432'),
        database=os.getenv('DB_NAME', 'python_learning'),
        user=os.getenv('DB_USER', 'postgres'),
        password=os.getenv('DB_PASSWORD', '')
    )

def check_database():
    """检查数据库当前状态"""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        print("\n" + "="*60)
        print("DATABASE STATUS CHECK")
        print("="*60)
        
        # 检查各表记录数
        tables = [
            'user_progress',
            'practice_attempts',
            'test_results',
            'code_history',
            'user_files'
        ]
        
        for table in tables:
            cur.execute(f"SELECT COUNT(*) FROM {table}")
            count = cur.fetchone()[0]
            print(f"{table:20} : {count} records")
        
        print("\n" + "="*60)
        print("USER_PROGRESS DETAILS (user_id=1)")
        print("="*60)
        cur.execute("""
            SELECT lesson_id, lesson_type, is_completed, completed_at
            FROM user_progress 
            WHERE user_id = 1
            ORDER BY lesson_id
        """)
        rows = cur.fetchall()
        if rows:
            for row in rows:
                print(f"  {row[0]:10} | {row[1]:10} | Completed: {row[2]} | {row[3]}")
        else:
            print("  No records found")
        
        print("\n" + "="*60)
        print("PRACTICE_ATTEMPTS DETAILS (user_id=1)")
        print("="*60)
        cur.execute("""
            SELECT lesson_id, is_correct, submitted_at
            FROM practice_attempts 
            WHERE user_id = 1
            ORDER BY submitted_at DESC
            LIMIT 10
        """)
        rows = cur.fetchall()
        if rows:
            for row in rows:
                print(f"  {row[0]:10} | Correct: {row[1]} | {row[2]}")
        else:
            print("  No records found")
        
        print("\n" + "="*60)
        print("TEST_RESULTS DETAILS (user_id=1)")
        print("="*60)
        cur.execute("""
            SELECT lesson_id, is_correct, submitted_at
            FROM test_results 
            WHERE user_id = 1
            ORDER BY submitted_at DESC
        """)
        rows = cur.fetchall()
        if rows:
            for row in rows:
                print(f"  {row[0]:10} | Correct: {row[1]} | {row[2]}")
        else:
            print("  No records found")
        
        print("\n" + "="*60)
        
        cur.close()
        conn.close()
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_database()
