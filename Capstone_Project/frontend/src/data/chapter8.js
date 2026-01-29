// Chapter 8: Modules and Packages
export const chapter8 = {
  id: 8,
  title: "Chapter 8: Modules and Packages",
  subsections: [
    {
      id: "8.1",
      title: "8.1 Importing Modules",
      content: {
        lecture: `
# Importing Modules

A module is a file containing Python code (functions, classes, variables) that you can reuse in other programs.

## Why Use Modules?

1. **Code Reusability** - Use existing code without rewriting
2. **Organization** - Break large programs into smaller files
3. **Namespace Management** - Avoid naming conflicts
4. **Standard Library** - Access Python's built-in functionality

## Basic Import Syntax

### Import Entire Module

\`\`\`python
import math

# Use module_name.function_name
result = math.sqrt(16)
print(result)  # 4.0

print(math.pi)  # 3.141592653589793
\`\`\`

### Import Specific Items

\`\`\`python
from math import sqrt, pi

# Use directly without module name
result = sqrt(25)
print(result)  # 5.0

print(pi)  # 3.141592653589793
\`\`\`

### Import Everything (Not Recommended)

\`\`\`python
from math import *

# All functions available directly
print(sqrt(36))  # 6.0
print(cos(0))    # 1.0
\`\`\`

⚠️ **Warning**: \`from module import *\` can cause naming conflicts!

### Import with Alias

\`\`\`python
import math as m

print(m.sqrt(49))  # 7.0
print(m.pi)        # 3.141592653589793
\`\`\`

\`\`\`python
from math import sqrt as square_root

result = square_root(64)
print(result)  # 8.0
\`\`\`

## Import Multiple Modules

\`\`\`python
import math
import random
import datetime

print(math.sqrt(16))
print(random.randint(1, 10))
print(datetime.date.today())
\`\`\`

## Import Multiple Items

\`\`\`python
from math import sqrt, pow, pi, e

print(sqrt(9))    # 3.0
print(pow(2, 3))  # 8.0
print(pi)         # 3.141592653589793
print(e)          # 2.718281828459045
\`\`\`

## Checking Available Functions

Use \`dir()\` to see what's in a module:

\`\`\`python
import math

print(dir(math))
# ['__doc__', '__name__', 'acos', 'asin', 'atan', 'ceil', 'cos', 
#  'degrees', 'e', 'exp', 'floor', 'log', 'pi', 'pow', 'radians', 
#  'sin', 'sqrt', 'tan', ...]
\`\`\`

## Getting Help

Use \`help()\` to see documentation:

\`\`\`python
import math

help(math.sqrt)
# Help on built-in function sqrt in module math:
# sqrt(x, /)
#     Return the square root of x.
\`\`\`

## Import Styles Comparison

\`\`\`python
# Style 1: Import module
import math
x = math.sqrt(16)

# Style 2: Import specific items
from math import sqrt
x = sqrt(16)

# Style 3: Import with alias
import math as m
x = m.sqrt(16)

# Style 4: Import item with alias
from math import sqrt as sq
x = sq(16)
\`\`\`

## Best Practices

✅ **Good practices:**
\`\`\`python
import math
import random

from datetime import datetime, timedelta
\`\`\`

❌ **Avoid:**
\`\`\`python
from math import *  # Don't import everything
from random import *
\`\`\`

## Common Import Errors

### ModuleNotFoundError

\`\`\`python
# import mymodule  # Error if mymodule doesn't exist
# ModuleNotFoundError: No module named 'mymodule'
\`\`\`

### AttributeError

\`\`\`python
import math
# print(math.squareroot(16))  # AttributeError
# Correct: math.sqrt(16)
\`\`\`

### ImportError

\`\`\`python
# from math import squareroot  # ImportError
# Correct: from math import sqrt
\`\`\`

## Module Search Path

Python searches for modules in these locations (in order):
1. Current directory
2. Directories in PYTHONPATH environment variable
3. Standard library directories
4. Site-packages (third-party modules)

\`\`\`python
import sys
print(sys.path)  # Shows all search paths
\`\`\`

## Organizing Imports

Follow PEP 8 style guide:

\`\`\`python
# 1. Standard library imports
import os
import sys
import math

# 2. Third-party imports
# import numpy
# import pandas

# 3. Local application imports
# from mymodule import myfunction
\`\`\`
        `,
        test: {
          question: "What is the correct way to use the sqrt function after this import statement?\n\n```python\nimport math\n```",
          options: [
            "sqrt(16)",
            "math.sqrt(16)",
            "import.sqrt(16)",
            "python.sqrt(16)"
          ],
          correctAnswer: 1,
          explanation: "When you import a module with 'import math', you must use the module name followed by a dot to access its functions: math.sqrt(16)."
        },
        practice: {
          description: `
## Exercise: Calculate Circle Area

**Task**: 
Use the \`math\` module to calculate the area of a circle:
1. Import the \`math\` module
2. Define radius = 5
3. Calculate area using formula: π × radius²
4. Print the result (rounded to 2 decimal places)

**Hints**:
- Use \`import math\`
- Access pi with \`math.pi\`
- Use \`math.pow(radius, 2)\` or \`radius ** 2\`
- Use \`round(area, 2)\` to round to 2 decimal places
          `,
          starterCode: `# Import math module


# Define radius


# Calculate area


# Print result

`,
          solution: `# Import math module
import math

# Define radius
radius = 5

# Calculate area
area = math.pi * radius ** 2

# Print result
print(round(area, 2))`,
          expectedOutput: "78.54"
        }
      }
    },
    {
      id: "8.2",
      title: "8.2 Common Standard Libraries",
      content: {
        lecture: `
# Common Standard Libraries

Python comes with a rich standard library. Let's explore the most commonly used modules.

## 1. math Module

Provides mathematical functions and constants.

### Common Functions

\`\`\`python
import math

# Square root
print(math.sqrt(16))      # 4.0

# Power
print(math.pow(2, 3))     # 8.0

# Rounding
print(math.ceil(4.3))     # 5 (round up)
print(math.floor(4.7))    # 4 (round down)

# Absolute value
print(math.fabs(-5))      # 5.0

# Trigonometry
print(math.sin(math.pi/2))  # 1.0
print(math.cos(0))          # 1.0
\`\`\`

### Constants

\`\`\`python
import math

print(math.pi)   # 3.141592653589793
print(math.e)    # 2.718281828459045
print(math.inf)  # inf (infinity)
print(math.nan)  # nan (not a number)
\`\`\`

### Logarithms

\`\`\`python
import math

print(math.log(10))      # 2.302585... (natural log)
print(math.log10(100))   # 2.0 (base 10)
print(math.log2(8))      # 3.0 (base 2)
\`\`\`

## 2. random Module

Generates random numbers and makes random selections.

### Random Integers

\`\`\`python
import random

# Random integer between a and b (inclusive)
dice = random.randint(1, 6)
print(dice)  # e.g., 4

# Random integer from range
num = random.randrange(0, 10, 2)  # 0, 2, 4, 6, or 8
print(num)
\`\`\`

### Random Floats

\`\`\`python
import random

# Random float between 0 and 1
x = random.random()
print(x)  # e.g., 0.7234...

# Random float between a and b
price = random.uniform(10.5, 20.5)
print(price)  # e.g., 15.23...
\`\`\`

### Random Choice

\`\`\`python
import random

# Choose one random element
colors = ["red", "blue", "green", "yellow"]
color = random.choice(colors)
print(color)  # e.g., "green"

# Choose multiple random elements (with replacement)
samples = random.choices(colors, k=3)
print(samples)  # e.g., ['red', 'red', 'blue']

# Choose multiple random elements (without replacement)
winners = random.sample(colors, k=2)
print(winners)  # e.g., ['blue', 'yellow']
\`\`\`

### Shuffle List

\`\`\`python
import random

cards = [1, 2, 3, 4, 5]
random.shuffle(cards)
print(cards)  # e.g., [3, 1, 5, 2, 4]
\`\`\`

### Set Random Seed

For reproducible random numbers:

\`\`\`python
import random

random.seed(42)
print(random.randint(1, 100))  # Always same result with seed 42

random.seed(42)
print(random.randint(1, 100))  # Same result again
\`\`\`

## 3. datetime Module

Work with dates and times.

### Current Date and Time

\`\`\`python
from datetime import datetime, date, time

# Current date and time
now = datetime.now()
print(now)  # 2024-03-15 14:30:45.123456

# Current date only
today = date.today()
print(today)  # 2024-03-15

# Current time only
current_time = datetime.now().time()
print(current_time)  # 14:30:45.123456
\`\`\`

### Creating Specific Dates

\`\`\`python
from datetime import date, time, datetime

# Create specific date
birthday = date(1990, 5, 15)
print(birthday)  # 1990-05-15

# Create specific time
meeting_time = time(14, 30, 0)
print(meeting_time)  # 14:30:00

# Create specific datetime
event = datetime(2024, 12, 31, 23, 59, 59)
print(event)  # 2024-12-31 23:59:59
\`\`\`

### Accessing Date/Time Components

\`\`\`python
from datetime import datetime

now = datetime.now()
print(now.year)     # e.g., 2024
print(now.month)    # e.g., 3
print(now.day)      # e.g., 15
print(now.hour)     # e.g., 14
print(now.minute)   # e.g., 30
print(now.second)   # e.g., 45
\`\`\`

### Formatting Dates

\`\`\`python
from datetime import datetime

now = datetime.now()

# Format as string
print(now.strftime("%Y-%m-%d"))           # 2024-03-15
print(now.strftime("%d/%m/%Y"))           # 15/03/2024
print(now.strftime("%B %d, %Y"))          # March 15, 2024
print(now.strftime("%I:%M %p"))           # 02:30 PM
print(now.strftime("%A, %B %d, %Y"))      # Friday, March 15, 2024
\`\`\`

Common format codes:
- \`%Y\` - Year (4 digits)
- \`%m\` - Month (01-12)
- \`%d\` - Day (01-31)
- \`%H\` - Hour (00-23)
- \`%M\` - Minute (00-59)
- \`%S\` - Second (00-59)
- \`%A\` - Weekday name
- \`%B\` - Month name

### Parsing Strings to Dates

\`\`\`python
from datetime import datetime

date_string = "2024-03-15"
date_obj = datetime.strptime(date_string, "%Y-%m-%d")
print(date_obj)  # 2024-03-15 00:00:00
\`\`\`

### Date Arithmetic

\`\`\`python
from datetime import datetime, timedelta

today = datetime.now()

# Add/subtract days
tomorrow = today + timedelta(days=1)
yesterday = today - timedelta(days=1)
next_week = today + timedelta(weeks=1)

print(tomorrow)
print(yesterday)
print(next_week)

# Add/subtract hours, minutes
in_3_hours = today + timedelta(hours=3)
print(in_3_hours)

# Calculate difference
start = datetime(2024, 1, 1)
end = datetime(2024, 12, 31)
difference = end - start
print(f"Days: {difference.days}")  # Days: 365
\`\`\`

## Practical Examples

### Example 1: Dice Game

\`\`\`python
import random

print("Rolling two dice...")
dice1 = random.randint(1, 6)
dice2 = random.randint(1, 6)
total = dice1 + dice2

print(f"Dice 1: {dice1}")
print(f"Dice 2: {dice2}")
print(f"Total: {total}")
\`\`\`

### Example 2: Password Generator

\`\`\`python
import random
import string

length = 8
characters = string.ascii_letters + string.digits
password = ''.join(random.choice(characters) for _ in range(length))
print(f"Generated password: {password}")
\`\`\`

### Example 3: Age Calculator

\`\`\`python
from datetime import date

birthday = date(1990, 5, 15)
today = date.today()
age = today.year - birthday.year

# Adjust if birthday hasn't occurred this year
if (today.month, today.day) < (birthday.month, birthday.day):
    age -= 1

print(f"Age: {age} years")
\`\`\`

### Example 4: Countdown Timer Display

\`\`\`python
from datetime import datetime, timedelta

event_date = datetime(2024, 12, 31, 23, 59, 59)
now = datetime.now()
remaining = event_date - now

days = remaining.days
hours = remaining.seconds // 3600
minutes = (remaining.seconds % 3600) // 60

print(f"Countdown: {days} days, {hours} hours, {minutes} minutes")
\`\`\`
        `,
        test: {
          question: "What will be the range of possible outputs from this code?\n\n```python\nimport random\nx = random.randint(5, 10)\nprint(x)\n```",
          options: [
            "5, 6, 7, 8, 9",
            "5, 6, 7, 8, 9, 10",
            "6, 7, 8, 9, 10",
            "5.0 to 10.0 (decimal numbers)"
          ],
          correctAnswer: 1,
          explanation: "random.randint(5, 10) returns a random integer between 5 and 10, inclusive. So possible values are: 5, 6, 7, 8, 9, or 10."
        },
        practice: {
          checkOutput: false,
          description: `
## Exercise: Random Number Game

**Task**: 
Create a simple guessing game:
1. Import the \`random\` module
2. Generate a random number between 1 and 10
3. Set a predefined guess (use \`guess = 7\`)
4. Compare the guess with the random number
5. Print "Correct!" if they match, or "Try again!" if they don't

**Expected Output** (example):
\`\`\`
Random number: 7
Your guess: 7
Correct!
\`\`\`
OR
\`\`\`
Random number: 3
Your guess: 7
Try again!
\`\`\`

**Hints**:
- Use \`random.randint(1, 10)\` to generate the number
- Store it in a variable called \`secret_number\`
- Use an if-else statement to compare
- Print both numbers to see the result
          `,
          starterCode: `# Import random module


# Generate random number


# Define guess


# Print both numbers


# Check if guess is correct


`,
          solution: `# Import random module
import random

# Generate random number
secret_number = random.randint(1, 10)

# Define guess
guess = 7

# Print both numbers
print(f"Random number: {secret_number}")
print(f"Your guess: {guess}")

# Check if guess is correct
if guess == secret_number:
    print("Correct!")
else:
    print("Try again!")`
        }
      }
    },
    {
      id: "8.3",
      title: "8.3 Creating Your Own Modules",
      content: {
        lecture: `
# Creating Your Own Modules

You can create your own modules to organize and reuse your code across multiple programs.

## What is a Custom Module?

A custom module is simply a Python file (.py) containing functions, classes, or variables that you can import into other programs.

## Creating a Simple Module

### Step 1: Create a Module File

Create a file named \`mymath.py\`:

\`\`\`python
# mymath.py

def add(a, b):
    """Add two numbers"""
    return a + b

def subtract(a, b):
    """Subtract b from a"""
    return a - b

def multiply(a, b):
    """Multiply two numbers"""
    return a * b

def divide(a, b):
    """Divide a by b"""
    if b == 0:
        return "Cannot divide by zero"
    return a / b

# Module-level variable
PI = 3.14159
\`\`\`

### Step 2: Import and Use Your Module

Create another file in the same directory:

\`\`\`python
# main.py
import mymath

result1 = mymath.add(10, 5)
result2 = mymath.multiply(3, 4)

print(result1)  # 15
print(result2)  # 12
print(mymath.PI)  # 3.14159
\`\`\`

## Different Import Methods

\`\`\`python
# Method 1: Import entire module
import mymath
print(mymath.add(5, 3))

# Method 2: Import specific functions
from mymath import add, multiply
print(add(5, 3))
print(multiply(2, 4))

# Method 3: Import with alias
import mymath as mm
print(mm.add(5, 3))

# Method 4: Import function with alias
from mymath import add as addition
print(addition(5, 3))
\`\`\`

## Module with Multiple Features

Create \`student_tools.py\`:

\`\`\`python
# student_tools.py

def calculate_average(scores):
    """Calculate average of scores"""
    if not scores:
        return 0
    return sum(scores) / len(scores)

def get_grade(score):
    """Convert score to letter grade"""
    if score >= 90:
        return 'A'
    elif score >= 80:
        return 'B'
    elif score >= 70:
        return 'C'
    elif score >= 60:
        return 'D'
    else:
        return 'F'

def format_student_info(name, age, grade):
    """Format student information"""
    return f"Student: {name}, Age: {age}, Grade: {grade}"

# Constants
PASSING_GRADE = 60
MAX_SCORE = 100
\`\`\`

Using the module:

\`\`\`python
import student_tools

scores = [85, 92, 78, 90]
avg = student_tools.calculate_average(scores)
grade = student_tools.get_grade(avg)

print(f"Average: {avg}")
print(f"Grade: {grade}")
print(student_tools.format_student_info("Alice", 20, grade))
\`\`\`

## The __name__ Variable

Every module has a special variable \`__name__\`:

\`\`\`python
# calculator.py

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

# This code only runs when the file is executed directly
if __name__ == "__main__":
    print("Testing calculator module...")
    print(f"5 + 3 = {add(5, 3)}")
    print(f"10 - 4 = {subtract(10, 4)}")
\`\`\`

When you run \`calculator.py\` directly:
\`\`\`
Testing calculator module...
5 + 3 = 8
10 - 4 = 6
\`\`\`

When you import it:
\`\`\`python
import calculator
result = calculator.add(5, 3)  # Works, but test code doesn't run
\`\`\`

## Module Documentation

Add docstrings to document your module:

\`\`\`python
# geometry.py

"""
Geometry Module
===============
This module provides functions for geometric calculations.

Functions:
    - circle_area(radius): Calculate circle area
    - rectangle_area(width, height): Calculate rectangle area
"""

def circle_area(radius):
    """
    Calculate the area of a circle.
    
    Args:
        radius (float): The radius of the circle
    
    Returns:
        float: The area of the circle
    """
    PI = 3.14159
    return PI * radius ** 2

def rectangle_area(width, height):
    """
    Calculate the area of a rectangle.
    
    Args:
        width (float): The width of the rectangle
        height (float): The height of the rectangle
    
    Returns:
        float: The area of the rectangle
    """
    return width * height
\`\`\`

View documentation:
\`\`\`python
import geometry
help(geometry)
help(geometry.circle_area)
\`\`\`

## Private Functions

Use underscore prefix to indicate private functions:

\`\`\`python
# utils.py

def public_function():
    """This is meant to be used by others"""
    return _private_helper()

def _private_helper():
    """This is for internal use only"""
    return "Helper result"
\`\`\`

## Module Initialization

Code at module level runs when imported:

\`\`\`python
# config.py

print("Loading configuration...")

DEFAULT_TIMEOUT = 30
MAX_RETRIES = 3
API_URL = "https://api.example.com"

print("Configuration loaded!")
\`\`\`

When imported:
\`\`\`python
import config  
# Output:
# Loading configuration...
# Configuration loaded!

print(config.DEFAULT_TIMEOUT)  # 30
\`\`\`

## Package Structure

For larger projects, organize modules into packages (folders):

\`\`\`
myproject/
    main.py
    utils/
        __init__.py
        math_tools.py
        string_tools.py
\`\`\`

\`__init__.py\` makes a folder into a package (can be empty).

Using packages:
\`\`\`python
from utils import math_tools
from utils.string_tools import capitalize_words
\`\`\`

## Best Practices

✅ **Good practices:**
1. Use clear, descriptive module names
2. Add docstrings to modules and functions
3. Keep related functions together
4. Use \`if __name__ == "__main__":\` for test code
5. Avoid circular imports

❌ **Avoid:**
1. Too many functions in one module
2. Module names that conflict with standard library
3. Using \`from module import *\` in modules

## Complete Example

\`\`\`python
# text_tools.py
"""
Text Processing Tools
=====================
Provides utility functions for text manipulation.
"""

def word_count(text):
    """Count words in text"""
    return len(text.split())

def char_count(text, include_spaces=False):
    """Count characters in text"""
    if include_spaces:
        return len(text)
    return len(text.replace(" ", ""))

def reverse_text(text):
    """Reverse the text"""
    return text[::-1]

def is_palindrome(text):
    """Check if text is a palindrome"""
    cleaned = text.replace(" ", "").lower()
    return cleaned == cleaned[::-1]

if __name__ == "__main__":
    # Test code
    sample = "A man a plan a canal Panama"
    print(f"Word count: {word_count(sample)}")
    print(f"Is palindrome: {is_palindrome(sample)}")
\`\`\`

Using it:
\`\`\`python
# main.py
import text_tools

text = "Hello World"
print(text_tools.word_count(text))      # 2
print(text_tools.char_count(text))      # 10
print(text_tools.reverse_text(text))    # dlroW olleH
\`\`\`
        `,
        test: {
          question: "You create a module file named 'helpers.py' with a function 'greet()'. What is the correct way to use this function in another file?\n\n```python\n# helpers.py\ndef greet():\n    print('Hello!')\n```",
          options: [
            "greet()",
            "import greet\ngreet()",
            "import helpers\nhelpers.greet()",
            "from helpers import *\nhelpers.greet()"
          ],
          correctAnswer: 2,
          explanation: "To use a function from a custom module, you need to import the module first, then use module_name.function_name(). So: import helpers, then helpers.greet()."
        },
        practice: {
          description: `
## Exercise: Create a Temperature Converter Module

**Task**: 
Create a simple temperature converter module:
1. Imagine you have a file called \`temp_converter.py\` with these functions:
   - \`celsius_to_fahrenheit(c)\`: converts Celsius to Fahrenheit (F = C × 9/5 + 32)
   - \`fahrenheit_to_celsius(f)\`: converts Fahrenheit to Celsius (C = (F - 32) × 5/9)
2. In your main code, import the module
3. Convert 25°C to Fahrenheit
4. Convert 77°F to Celsius
5. Print both results

**Hints**:
- Since we can't create multiple files here, define the functions directly
- Formula for C to F: \`c * 9/5 + 32\`
- Formula for F to C: \`(f - 32) * 5/9\`
- Format output with f-strings
          `,
          starterCode: `# Define the conversion functions
def celsius_to_fahrenheit(c):
    # Your code here
    pass

def fahrenheit_to_celsius(f):
    # Your code here
    pass

# Test the functions



`,
          solution: `# Define the conversion functions
def celsius_to_fahrenheit(c):
    return c * 9/5 + 32

def fahrenheit_to_celsius(f):
    return (f - 32) * 5/9

# Test the functions
celsius = 25
fahrenheit = 77

f_result = celsius_to_fahrenheit(celsius)
c_result = fahrenheit_to_celsius(fahrenheit)

print(f"{celsius}°C = {f_result}°F")
print(f"{fahrenheit}°F = {c_result}°C")`,
          expectedOutput: "25°C = 77.0°F\n77°F = 25.0°C"
        }
      }
    }
  ]
};
