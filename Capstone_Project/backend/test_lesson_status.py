#!/usr/bin/env python3
"""
测试课程完成状态API
"""

import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

load_dotenv()

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
            password=os.getenv('DB_PASSWORD', 'admin')
        )

def test_lesson_status():
    """检查课程完成状态"""
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        print("\n" + "="*70)
        print("检查 user_progress 表中的数据")
        print("="*70)
        
        # 查看用户1的所有进度
        cur.execute("""
            SELECT lesson_id, lesson_type, is_completed, completed_at
            FROM user_progress
            WHERE user_id = 1
            ORDER BY lesson_id, lesson_type
        """)
        
        rows = cur.fetchall()
        if rows:
            print(f"\n找到 {len(rows)} 条记录:\n")
            for row in rows:
                status = "✅ 完成" if row['is_completed'] else "❌ 未完成"
                print(f"  课程: {row['lesson_id']:10} | 类型: {row['lesson_type']:10} | {status} | {row['completed_at']}")
        else:
            print("\n⚠️ 没有找到任何进度记录！")
            print("这意味着用户还没有完成任何课程。")
        
        print("\n" + "="*70)
        print("检查 practice_attempts 表")
        print("="*70)
        
        cur.execute("""
            SELECT lesson_id, is_correct, submitted_at
            FROM practice_attempts
            WHERE user_id = 1
            ORDER BY submitted_at DESC
            LIMIT 10
        """)
        
        attempts = cur.fetchall()
        if attempts:
            print(f"\n最近 {len(attempts)} 次练习提交:\n")
            for att in attempts:
                status = "✅ 正确" if att['is_correct'] else "❌ 错误"
                print(f"  课程: {att['lesson_id']:10} | {status} | {att['submitted_at']}")
        else:
            print("\n⚠️ 没有找到任何练习提交记录！")
        
        print("\n" + "="*70)
        print("检查 test_results 表")
        print("="*70)
        
        cur.execute("""
            SELECT lesson_id, is_correct, submitted_at
            FROM test_results
            WHERE user_id = 1
            ORDER BY submitted_at DESC
            LIMIT 10
        """)
        
        tests = cur.fetchall()
        if tests:
            print(f"\n最近 {len(tests)} 次测试提交:\n")
            for test in tests:
                status = "✅ 正确" if test['is_correct'] else "❌ 错误"
                print(f"  课程: {test['lesson_id']:10} | {status} | {test['submitted_at']}")
        else:
            print("\n⚠️ 没有找到任何测试提交记录！")
        
        print("\n" + "="*70)
        print("测试课程 2.1 的状态")
        print("="*70)
        
        cur.execute("""
            SELECT lesson_id, lesson_type, is_completed, completed_at
            FROM user_progress
            WHERE user_id = 1 AND lesson_id = '2.1'
        """)
        
        lesson_status = cur.fetchall()
        if lesson_status:
            print("\n课程 2.1 的完成状态:\n")
            for status in lesson_status:
                completed = "✅ 是" if status['is_completed'] else "❌ 否"
                print(f"  类型: {status['lesson_type']:10} | 完成: {completed} | 时间: {status['completed_at']}")
        else:
            print("\n⚠️ 课程 2.1 还没有任何完成记录")
        
        cur.close()
        conn.close()
        
        print("\n" + "="*70)
        print("测试完成")
        print("="*70)
        
    except Exception as e:
        print(f"\n❌ 错误: {e}")

if __name__ == '__main__':
    test_lesson_status()
