#!/usr/bin/env python3
"""
测试 API 端点
"""

import requests
import json

BASE_URL = 'http://127.0.0.1:5000/api'

def test_api():
    print("\n" + "="*70)
    print("测试 API: /api/lesson/status/1/2.1")
    print("="*70)
    
    try:
        url = f"{BASE_URL}/lesson/status/1/2.1"
        print(f"\n请求 URL: {url}")
        
        response = requests.get(url, timeout=5)
        print(f"状态码: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"\n响应数据:")
            print(json.dumps(data, indent=2, ensure_ascii=False))
            
            if data.get('success'):
                print(f"\n✅ API 正常工作!")
                print(f"   Practice 完成: {'是' if data.get('practiceCompleted') else '否'}")
                print(f"   Test 完成: {'是' if data.get('testCompleted') else '否'}")
            else:
                print(f"\n⚠️ API 返回 success=False")
        else:
            print(f"\n❌ API 返回错误状态码: {response.status_code}")
            print(f"响应: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("\n❌ 无法连接到后端服务器!")
        print("请确保后端服务器正在运行:")
        print("  cd Capstone_Project/backend")
        print("  python api.py")
    except Exception as e:
        print(f"\n❌ 错误: {e}")
    
    print("\n" + "="*70)
    print("测试 API: /api/dashboard/1")
    print("="*70)
    
    try:
        url = f"{BASE_URL}/dashboard/1"
        print(f"\n请求 URL: {url}")
        
        response = requests.get(url, timeout=5)
        print(f"状态码: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"\n响应数据摘要:")
            if 'stats' in data:
                print(f"  练习完成: {data['stats'].get('practicesCompleted', 0)}/{data['stats'].get('totalPractices', 0)}")
                print(f"  测试通过: {data['stats'].get('testsPassed', 0)}/{data['stats'].get('totalTests', 0)}")
            print(f"\n✅ Dashboard API 正常工作!")
        else:
            print(f"\n❌ API 返回错误状态码: {response.status_code}")
            
    except Exception as e:
        print(f"\n❌ 错误: {e}")

if __name__ == '__main__':
    test_api()
