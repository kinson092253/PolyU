"""
數據庫連接和工具模組
"""
import psycopg2
from psycopg2.extras import RealDictCursor
from psycopg2.pool import SimpleConnectionPool
import os
from contextlib import contextmanager

# 數據庫連接配置
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': os.getenv('DB_PORT', '5432'),
    'database': os.getenv('DB_NAME', 'python_learning'),
    'user': os.getenv('DB_USER', 'admin'),
    'password': os.getenv('DB_PASSWORD', 'admin123')
}

# 連接池（提高性能）
connection_pool = None

def init_db_pool(minconn=1, maxconn=10):
    """初始化數據庫連接池"""
    global connection_pool
    try:
        connection_pool = SimpleConnectionPool(
            minconn,
            maxconn,
            **DB_CONFIG
        )
        print("[OK] Database connection pool initialized")
        return True
    except Exception as e:
        print(f"[ERROR] Failed to initialize database pool: {e}")
        return False

@contextmanager
def get_db_connection():
    """
    上下文管理器：獲取數據庫連接
    使用方式：
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users")
    """
    conn = None
    try:
        if connection_pool:
            conn = connection_pool.getconn()
        else:
            conn = psycopg2.connect(**DB_CONFIG)
        yield conn
        conn.commit()
    except Exception as e:
        if conn:
            conn.rollback()
        raise e
    finally:
        if conn:
            if connection_pool:
                connection_pool.putconn(conn)
            else:
                conn.close()

@contextmanager
def get_db_cursor(commit=True):
    """
    上下文管理器：獲取數據庫游標（返回字典格式）
    使用方式：
        with get_db_cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
            user = cursor.fetchone()
    """
    with get_db_connection() as conn:
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            yield cursor
            if commit:
                conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()

def test_connection():
    """測試數據庫連接"""
    try:
        with get_db_cursor() as cursor:
            cursor.execute("SELECT version();")
            version = cursor.fetchone()
            print(f"[OK] Database connection successful!")
            print(f"[INFO] PostgreSQL version: {version['version']}")
            return True
    except Exception as e:
        print(f"[ERROR] Database connection failed: {e}")
        return False

def execute_query(query, params=None, fetch_one=False, fetch_all=False):
    """
    執行 SQL 查詢的便捷函數
    
    Args:
        query: SQL 查詢語句
        params: 參數（防止 SQL 注入）
        fetch_one: 返回單條記錄
        fetch_all: 返回所有記錄
    
    Returns:
        查詢結果或 None
    """
    try:
        with get_db_cursor() as cursor:
            cursor.execute(query, params or ())
            
            if fetch_one:
                return cursor.fetchone()
            elif fetch_all:
                return cursor.fetchall()
            else:
                return cursor.rowcount
    except Exception as e:
        print(f"Query error: {e}")
        raise e

# 初始化時測試連接
if __name__ == "__main__":
    print("Testing database connection...")
    init_db_pool()
    test_connection()
