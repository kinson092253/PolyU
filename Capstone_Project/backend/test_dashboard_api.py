import requests
import json

# Test the Dashboard API
response = requests.get('http://localhost:5000/api/dashboard/1')

if response.status_code == 200:
    data = response.json()
    print("=== Dashboard API Response ===")
    print(json.dumps(data, indent=2))
    print("\n=== Stats Summary ===")
    stats = data.get('stats', {})
    print(f"Overall Progress: {stats.get('overallProgress')}%")
    print(f"Practices Completed: {stats.get('practicesCompleted')}/{stats.get('totalPractices')}")
    print(f"Tests Passed: {stats.get('testsPassed')}/{stats.get('totalTests')}")
else:
    print(f"Error: {response.status_code}")
    print(response.text)
