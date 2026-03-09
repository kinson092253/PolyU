#!/usr/bin/env python3
"""
清空數據庫腳本 - 重置所有用戶數據為零
保留test user (user_id=1)
"""

import psycopg2
from psycopg2.extras import RealDictCursor
import sys
from pathlib import Path

# 添加backend目錄到路徑
sys.path.insert(0, str(Path(__file__).parent.parent))

from dotenv import load_dotenv
import os

# 加載環境變量
load_dotenv(Path(__file__).parent.parent / '.env')

def reset_database():
    """清空數據庫中的所有用戶進度數據"""
    try:
        # 連接到數據庫 - 优先使用 DATABASE_URL（Replit/生产环境）
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
        
        print("[INFO] Starting database reset...")
        print("[INFO] Clearing all user progress data...")
        
        # 執行清空操作（按依賴順序）
        sql_commands = [
            "DELETE FROM user_files;",
            "DELETE FROM code_history;",
            "DELETE FROM user_achievements;",
            "DELETE FROM achievements;",
            "DELETE FROM study_sessions;",
            "DELETE FROM test_results;",
            "DELETE FROM practice_attempts;",
            "DELETE FROM user_progress;",
        ]
        
        for sql in sql_commands:
            try:
                cur.execute(sql)
                conn.commit()  # 提交每個刪除操作
                print(f"[OK] Executed: {sql}")
            except Exception as e:
                conn.rollback()  # 如果出錯則回滾
                print(f"[ERROR] Failed to execute {sql}: {e}")
        
        # 重置序列（跳過不存在的）
        sequences = [
            "users_user_id_seq",
            "user_progress_progress_id_seq",
            "practice_attempts_attempt_id_seq",
            "study_sessions_session_id_seq",
            "achievements_achievement_id_seq",
            "user_achievements_user_achievement_id_seq",
            "code_history_history_id_seq",
            "user_files_file_id_seq"
        ]
        
        for seq in sequences:
            try:
                cur.execute(f"ALTER SEQUENCE {seq} RESTART WITH 1;")
                conn.commit()
                print(f"[OK] Reset sequence: {seq}")
            except Exception as e:
                conn.rollback()
                print(f"[WARN] Could not reset sequence {seq}")
        
        # 驗證數據
        cur.execute("SELECT COUNT(*) as count FROM user_progress WHERE user_id = 1;")
        result = cur.fetchone()
        progress_count = result[0] if result else 0
        
        cur.execute("SELECT COUNT(*) as count FROM test_results WHERE user_id = 1;")
        result = cur.fetchone()
        tests_count = result[0] if result else 0
        
        cur.execute("SELECT COUNT(*) as count FROM practice_attempts WHERE user_id = 1;")
        result = cur.fetchone()
        attempts_count = result[0] if result else 0
        
        print(f"\n[STATS] After reset:")
        print(f"  - User progress records: {progress_count}")
        print(f"  - Test results: {tests_count}")
        print(f"  - Practice attempts: {attempts_count}")
        
        # 提交變更
        conn.commit()
        
        print("\n[SUCCESS] Database reset completed successfully!")
        print("[INFO] All user data has been cleared (set to 0)")
        return True
        
    except Exception as e:
        print(f"\n[ERROR] Database reset failed: {e}")
        return False

if __name__ == '__main__':
    success = reset_database()
    sys.exit(0 if success else 1)
