#!/usr/bin/env python3
"""
確保測試用戶存在
運行 reset_database.py 後執行此腳本
"""

import psycopg2
import sys
from pathlib import Path
from dotenv import load_dotenv
import os

# 加載環境變量
load_dotenv(Path(__file__).parent.parent / '.env')

def ensure_test_user():
    """確保測試用戶 (user_id=1) 存在"""
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
        print("Ensuring Test User Exists")
        print("=" * 60)
        
        # 檢查是否存在 user_id=1
        cur.execute("SELECT user_id FROM users WHERE user_id = 1")
        result = cur.fetchone()
        
        if result:
            print("\n✅ Test user (user_id=1) already exists")
        else:
            print("\n⚠️  Test user not found, creating...")
            
            # 創建測試用戶
            cur.execute("""
                INSERT INTO users (user_id, username, email, password_hash, created_at)
                VALUES (1, 'testuser', 'test@example.com', 'dummy_hash', NOW())
                ON CONFLICT (user_id) DO NOTHING
            """)
            
            # 確保 user_id 序列正確
            cur.execute("SELECT setval('users_user_id_seq', (SELECT MAX(user_id) FROM users))")
            
            conn.commit()
            print("✅ Test user created successfully!")
        
        # 顯示用戶資訊
        cur.execute("SELECT user_id, username, email, created_at FROM users WHERE user_id = 1")
        user = cur.fetchone()
        
        print(f"\n=== Test User Info ===")
        print(f"User ID: {user[0]}")
        print(f"Username: {user[1]}")
        print(f"Email: {user[2]}")
        print(f"Created: {user[3]}")
        
        cur.close()
        conn.close()
        
        print("\n" + "=" * 60)
        print("✅ Database ready to use!")
        print("=" * 60)
        return True
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        return False

if __name__ == '__main__':
    success = ensure_test_user()
    sys.exit(0 if success else 1)
