import sqlite3

conn = sqlite3.connect('database/learning_tracker.db')
cur = conn.cursor()

print("=== All Tables ===")
cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = cur.fetchall()
for table in tables:
    print(f"  - {table[0]}")

print("\n=== Practice Attempts Table ===")
try:
    cur.execute("SELECT * FROM practice_attempts LIMIT 1")
    print("practice_attempts table exists")
except:
    print("practice_attempts table does NOT exist")
    print("\n=== User Progress Table ===")
    cur.execute("SELECT lesson_id, is_completed FROM user_progress WHERE lesson_id LIKE 'finalTest%' OR lesson_id LIKE 'test%' ORDER BY completed_at DESC LIMIT 10")
    records = cur.fetchall()
    if records:
        for row in records:
            print(f"Lesson ID: {row[0]}, Completed: {row[1]}")
    else:
        print("No test records in user_progress!")

conn.close()
