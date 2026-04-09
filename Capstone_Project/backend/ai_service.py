"""
AI Hint Service using OpenRouter API
Provides progressive hints for students without giving direct answers
"""

import os
import requests
from dotenv import load_dotenv

load_dotenv()

HINT_SYSTEM_PROMPT = """You are a helpful Python programming tutor. Your role is to guide students without giving direct answers.

RULES:
1. Provide progressive hints based on hint level (1=subtle, 2=moderate, 3=specific)
2. Never give complete solutions or write the full code
3. Ask guiding questions to make students think
4. Point out specific issues without fixing them directly
5. Keep hints under 3 sentences
6. Be encouraging and positive
7. Focus on the learning process

Remember: Your goal is to help students learn, not to solve the problem for them!"""

class AIHintService:
    def __init__(self):
        self.api_key = os.getenv('OPENROUTER_API_KEY')
        self.model = os.getenv('OPENROUTER_MODEL', 'meta-llama/llama-3.2-3b-instruct:free')
        self.api_url = 'https://openrouter.ai/api/v1/chat/completions'
    
    def generate_hint_prompt(self, student_code, exercise_desc, expected_output, current_output, hint_level):
        """Generate the user prompt based on student's situation"""
        
        output_info = current_output if current_output else "No output yet (code hasn't been run or produced no output)"
        
        level_guidance = {
            1: "Ask a guiding question that makes the student think about what they're missing. Don't point to specific code.",
            2: "Point to the specific area or concept that needs work, but don't give the solution.",
            3: "Give a more detailed explanation with a similar example (but not the exact solution to their problem)."
        }
        
        return f"""Student's Exercise:
{exercise_desc}

Expected Output:
{expected_output}

Student's Current Code:
```python
{student_code}
```

Student's Current Output:
{output_info}

Hint Level: {hint_level}/3
{level_guidance.get(hint_level, level_guidance[1])}

Provide an appropriate hint for level {hint_level}. Remember: Guide, don't solve!"""
    
    def get_hint(self, student_code, exercise_desc, expected_output, current_output, hint_level):
        """Get AI-generated hint from OpenRouter"""
        
        if not self.api_key:
            return {
                'success': False,
                'error': 'OpenRouter API key not configured'
            }
        
        try:
            user_prompt = self.generate_hint_prompt(
                student_code, exercise_desc, expected_output, 
                current_output, hint_level
            )
            
            headers = {
                'Authorization': f'Bearer {self.api_key}',
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'Python Learning Platform'
            }
            
            payload = {
                'model': self.model,
                'messages': [
                    {'role': 'system', 'content': HINT_SYSTEM_PROMPT},
                    {'role': 'user', 'content': user_prompt}
                ],
                'temperature': 0.7,
                'max_tokens': 300
            }
            
            response = requests.post(
                self.api_url,
                headers=headers,
                json=payload,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                hint = data['choices'][0]['message']['content'].strip()
                
                return {
                    'success': True,
                    'hint': hint,
                    'hintLevel': hint_level,
                    'canRequestMore': hint_level < 3
                }
            else:
                return {
                    'success': False,
                    'error': f'API error: {response.status_code} - {response.text}'
                }
            
        except requests.exceptions.Timeout:
            return {
                'success': False,
                'error': 'Request timeout. Please try again.'
            }
        except Exception as e:
            return {
                'success': False,
                'error': f'Error: {str(e)}'
            }

    def explain_error(self, student_code, error_message):
        """Explain a Python error to a student in plain, friendly language"""

        if not self.api_key:
            return {
                'success': False,
                'error': 'OpenRouter API key not configured'
            }

        system_prompt = """You are a friendly Python tutor helping beginner students understand error messages.

RULES:
1. Explain what the error means in simple, plain English (no jargon)
2. Point out which line or part of the code caused the error
3. Give a clear, concise suggestion on how to fix it
4. Keep the response under 5 sentences
5. Be encouraging — errors are a normal part of learning!"""

        user_prompt = f"""A student got the following error when running their Python code:

Error:
{error_message}

Student's Code:
```python
{student_code}
```

Please explain what went wrong in simple terms and how they can fix it."""

        try:
            headers = {
                'Authorization': f'Bearer {self.api_key}',
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'Python Learning Platform'
            }

            payload = {
                'model': self.model,
                'messages': [
                    {'role': 'system', 'content': system_prompt},
                    {'role': 'user', 'content': user_prompt}
                ],
                'temperature': 0.5,
                'max_tokens': 350
            }

            response = requests.post(
                self.api_url,
                headers=headers,
                json=payload,
                timeout=30
            )

            if response.status_code == 200:
                data = response.json()
                explanation = data['choices'][0]['message']['content'].strip()
                return {'success': True, 'explanation': explanation}
            else:
                return {
                    'success': False,
                    'error': f'API error: {response.status_code} - {response.text}'
                }

        except requests.exceptions.Timeout:
            return {'success': False, 'error': 'Request timeout. Please try again.'}
        except Exception as e:
            return {'success': False, 'error': f'Error: {str(e)}'}


# Create singleton instance
ai_service = AIHintService()
