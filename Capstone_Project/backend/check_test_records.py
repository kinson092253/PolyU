import psycopg2
from psycopg2.extras import RealDictCursor

# Database connection
conn = psycopg2.connect(
    host='localhost',
    port=5432,
    database='python_learning',
    user='postgres',
    password='admin'
)

cur = conn.cursor(cursor_factory=RealDictCursor)

print("=== Checking practice_attempts for test lessons ===")
cur.execute("""
    SELECT lesson_id, is_correct, COUNT(*) as count
    FROM practice_attempts
    WHERE user_id = 1 AND lesson_id LIKE 'test%'
    GROUP BY lesson_id, is_correct
    ORDER BY lesson_id
""")
results = cur.fetchall()
for row in results:
    print(f"Lesson: {row['lesson_id']}, Correct: {row['is_correct']}, Count: {row['count']}")

print("\n=== Checking user_progress for test lessons ===")
cur.execute("""
    SELECT lesson_id, lesson_type, is_completed
    FROM user_progress
    WHERE user_id = 1 AND lesson_id LIKE 'test%'
    ORDER BY lesson_id
""")
results = cur.fetchall()
for row in results:
    print(f"Lesson: {row['lesson_id']}, Type: {row['lesson_type']}, Completed: {row['is_completed']}")

print("\n=== Dashboard calculation test ===")
cur.execute("""
    SELECT 
        COALESCE(COUNT(DISTINCT CASE WHEN up.is_completed AND up.lesson_type = 'practice' AND up.lesson_id NOT LIKE 'test%%' THEN up.lesson_id END), 0) as practices_completed,
        COALESCE(COUNT(DISTINCT CASE WHEN tr.is_correct THEN tr.lesson_id END), 0) + COALESCE(COUNT(DISTINCT CASE WHEN pa.is_correct AND pa.lesson_id LIKE 'test%%' THEN pa.lesson_id END), 0) as tests_passed
    FROM users u
    LEFT JOIN user_progress up ON u.user_id = up.user_id
    LEFT JOIN test_results tr ON u.user_id = tr.user_id
    LEFT JOIN practice_attempts pa ON u.user_id = pa.user_id
    WHERE u.user_id = 1
""")
result = cur.fetchone()
print(f"Practices Completed: {result['practices_completed']}")
print(f"Tests Passed: {result['tests_passed']}")

cur.close()
conn.close()
