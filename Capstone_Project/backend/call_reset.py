import requests

response = requests.post('http://localhost:5000/api/reset-database')
print(response.json())
