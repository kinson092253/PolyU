import psycopg2
import os

# Database connection
conn = psycopg2.connect(
    host=os.getenv('DB_HOST', 'localhost'),
    port=os.getenv('DB_PORT', '5432'),
    database=os.getenv('DB_NAME', 'python_learning'),
    user=os.getenv('DB_USER', 'postgres'),
    password=os.getenv('DB_PASSWORD', 'admin')
)

cursor = conn.cursor()

print("=" * 60)
print("Fixing lesson_id column length")
print("=" * 60)

try:
    # Step 1: Drop ALL dependent views
    print("\nStep 1: Dropping all dependent views...")
    cursor.execute("DROP VIEW IF EXISTS user_stats_summary CASCADE")
    cursor.execute("DROP VIEW IF EXISTS chapter_completion_rates CASCADE")
    cursor.execute("DROP VIEW IF EXISTS lesson_statistics CASCADE")
    cursor.execute("DROP VIEW IF EXISTS test_summary CASCADE")
    
    # Step 2: Increase lesson_id length in practice_attempts
    print("Step 2: Updating practice_attempts table...")
    cursor.execute("""
        ALTER TABLE practice_attempts 
        ALTER COLUMN lesson_id TYPE VARCHAR(50)
    """)
    
    # Step 3: Increase lesson_id length in user_progress
    print("Step 3: Updating user_progress table...")
    cursor.execute("""
        ALTER TABLE user_progress 
        ALTER COLUMN lesson_id TYPE VARCHAR(50)
    """)
    
    # Step 4: Increase lesson_id length in test_results (if exists)
    print("Step 4: Updating test_results table...")
    cursor.execute("""
        ALTER TABLE test_results 
        ALTER COLUMN lesson_id TYPE VARCHAR(50)
    """)
    
    # Step 5: Recreate the view (if needed, can be done later)
    print("Step 5: View dropped (can be recreated if needed)")
    
    conn.commit()
    print("\n✅ All tables updated successfully!")
    print("lesson_id columns now support up to 50 characters")
    print("Note: user_stats_summary view was dropped and may need to be recreated")
    
except Exception as e:
    conn.rollback()
    print(f"\n❌ Error: {e}")

finally:
    cursor.close()
    conn.close()

print("\n" + "=" * 60)
