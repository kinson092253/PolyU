import psycopg2
import os
from dotenv import load_dotenv
from pathlib import Path

# 加載環境變量
load_dotenv(Path(__file__).parent.parent / '.env')

def create_final_test_table():
    """創建 final_test_answers 表"""
    try:
        # 連接到數據庫
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
        
        cur = conn.cursor()
        
        print("=" * 60)
        print("Creating final_test_answers Table")
        print("=" * 60)
        
        # 檢查表是否已存在
        cur.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'final_test_answers'
            )
        """)
        exists = cur.fetchone()[0]
        
        if exists:
            print("\n⚠️  Table 'final_test_answers' already exists")
            print("Dropping and recreating...")
            cur.execute("DROP TABLE IF EXISTS final_test_answers CASCADE")
        
        # 創建表
        cur.execute("""
            CREATE TABLE final_test_answers (
                answer_id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
                question_type VARCHAR(20) NOT NULL,
                question_index INTEGER NOT NULL,
                answer_data JSONB NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, question_type, question_index)
            )
        """)
        
        # 創建索引
        cur.execute("""
            CREATE INDEX idx_final_test_answers_user 
            ON final_test_answers(user_id)
        """)
        
        conn.commit()
        
        print("\n✅ Table 'final_test_answers' created successfully!")
        print("   - Columns: answer_id, user_id, question_type, question_index, answer_data")
        print("   - Index: idx_final_test_answers_user")
        
        cur.close()
        conn.close()
        
        print("\n" + "=" * 60)
        return True
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        return False

if __name__ == '__main__':
    import sys
    success = create_final_test_table()
    sys.exit(0 if success else 1)
