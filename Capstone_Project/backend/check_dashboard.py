import requests
import json

# 直接调用API查看dashboard数据
response = requests.get('http://localhost:5000/api/dashboard/1')
data = response.json()

print("\n" + "="*60)
print("DASHBOARD API RESPONSE")
print("="*60)
print(json.dumps(data, indent=2))
print("="*60)
