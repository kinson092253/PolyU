import requests
import json

# Test submitting Final Test data
url = "http://localhost:5000/api/practice/submit"

test_data = {
    "userId": 1,
    "lessonId": "finalTest.1",
    "submittedCode": "# Test code",
    "output": "Test output",
    "expectedOutput": "Test output",
    "isCorrect": True,
    "timeSpent": 60
}

print("=" * 60)
print("Testing Final Test Submission")
print("=" * 60)

try:
    response = requests.post(url, json=test_data)
    print(f"\nStatus Code: {response.status_code}")
    print(f"Response: {response.json()}")
    
    if response.ok:
        print("\n✅ Submission successful!")
    else:
        print("\n❌ Submission failed!")
except Exception as e:
    print(f"\n❌ Error: {e}")

print("\n" + "=" * 60)
