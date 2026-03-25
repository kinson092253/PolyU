import psycopg2
import os

# Database connection
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': os.getenv('DB_PORT', '5432'),
    'database': os.getenv('DB_NAME', 'python_learning'),
    'user': os.getenv('DB_USER', 'postgres'),
    'password': os.getenv('DB_PASSWORD', 'admin')
}

try:
    conn = psycopg2.connect(**DB_CONFIG)
    cursor = conn.cursor()
    
    print("=" * 60)
    print("Checking Final Test Records")
    print("=" * 60)
    
    # 1. Check all test records
    cursor.execute("""
        SELECT lesson_id, is_correct, COUNT(*) 
        FROM practice_attempts 
        WHERE lesson_id LIKE 'test%' OR lesson_id LIKE 'finalTest%'
        GROUP BY lesson_id, is_correct
        ORDER BY lesson_id
    """)
    print("\n=== All Test Records ===")
    for row in cursor.fetchall():
        print(f"lesson_id: {row[0]}, is_correct: {row[1]}, count: {row[2]}")
    
    # 2. Check table structure first
    cursor.execute("""
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'practice_attempts'
        ORDER BY ordinal_position
    """)
    print("\n=== practice_attempts Table Structure ===")
    for row in cursor.fetchall():
        print(f"  {row[0]}: {row[1]}")
    
    # 3. Check Final Test specifically
    cursor.execute("""
        SELECT * FROM practice_attempts 
        WHERE lesson_id LIKE 'finalTest%'
        LIMIT 5
    """)
    print("\n=== Final Test Attempts (Most Recent 5) ===")
    rows = cursor.fetchall()
    if rows:
        for row in rows:
            print(f"Full record: {row}")
    else:
        print("No Final Test records found!")
    
    # 4. Check distinct test passes
    cursor.execute("""
        SELECT DISTINCT lesson_id 
        FROM practice_attempts 
        WHERE (lesson_id LIKE 'test%' OR lesson_id LIKE 'finalTest%')
        AND is_correct = TRUE
        ORDER BY lesson_id
    """)
    print("\n=== Distinct Tests Passed ===")
    for row in cursor.fetchall():
        print(f"  - {row[0]}")
    
    cursor.close()
    conn.close()
    print("\n" + "=" * 60)
    
except Exception as e:
    print(f"Error: {e}")
