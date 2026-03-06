import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

load_dotenv()

# Database connection
def get_db_connection():
    database_url = os.getenv('DATABASE_URL')
    if database_url:
        return psycopg2.connect(database_url)
    else:
        return psycopg2.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            port=os.getenv('DB_PORT', '5432'),
            database=os.getenv('DB_NAME', 'python_learning'),
            user=os.getenv('DB_USER', 'postgres'),
            password=os.getenv('DB_PASSWORD', '')
        )

try:
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    # 查询所有用户文件
    cur.execute("""
        SELECT file_id, user_id, lesson_id, file_name, file_type, 
               LENGTH(file_content) as content_length, 
               LEFT(file_content, 100) as content_preview
        FROM user_files
        ORDER BY created_at DESC
    """)
    
    files = cur.fetchall()
    
    print("\n" + "="*70)
    print("📁 USER FILES IN DATABASE")
    print("="*70)
    
    if not files:
        print("❌ No files found in database!")
    else:
        for file in files:
            print(f"\n🗂️  File ID: {file['file_id']}")
            print(f"   User ID: {file['user_id']}")
            print(f"   Lesson ID: {file['lesson_id']}")
            print(f"   File Name: {file['file_name']}")
            print(f"   File Type: {file['file_type']}")
            print(f"   Content Length: {file['content_length']} bytes")
            print(f"   Preview: {file['content_preview'][:50]}...")
    
    print("\n" + "="*70 + "\n")
    
    cur.close()
    conn.close()
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
