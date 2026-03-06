// Chapter 7: Functions
export const chapter7 = {
  id: 7,
  title: "Chapter 7: Functions",
  subsections: [
    {
      id: "7.1",
      title: "7.1 Function Definition and Calling",
      videoUrl: "https://youtu.be/L_uqqWwKpns",
      content: {
        lecture: `
# Function Definition and Calling

A function is a reusable block of code that performs a specific task. Functions help organize code and avoid repetition.

## Why Use Functions?

1. **Code Reusability** - Write once, use many times
2. **Organization** - Break complex problems into smaller parts
3. **Maintainability** - Easier to update and debug
4. **Abstraction** - Hide implementation details

## Basic Function Syntax

\`\`\`python
def function_name():
    # code to execute
    pass
\`\`\`

## Creating a Simple Function

\`\`\`python
def greet():
    print("Hello, World!")

# Call the function
greet()  # Output: Hello, World!
\`\`\`

## Function with Multiple Statements

\`\`\`python
def welcome():
    print("Welcome to Python!")
    print("Let's learn about functions.")
    print("This is exciting!")

welcome()
# Output:
# Welcome to Python!
# Let's learn about functions.
# This is exciting!
\`\`\`

## Calling Functions Multiple Times

\`\`\`python
def say_hello():
    print("Hello!")

say_hello()  # Hello!
say_hello()  # Hello!
say_hello()  # Hello!
\`\`\`

## Function Naming Conventions

✅ **Good function names:**
\`\`\`python
def calculate_total():
    pass

def get_user_info():
    pass

def is_valid():
    pass
\`\`\`

❌ **Bad function names:**
\`\`\`python
def x():  # Not descriptive
    pass

def DoSomething():  # Should use snake_case
    pass

def calculate-total():  # Can't use hyphens
    pass
\`\`\`

## Functions Can Call Other Functions

\`\`\`python
def print_line():
    print("-" * 30)

def print_header():
    print_line()
    print("Welcome to My Program")
    print_line()

print_header()
# Output:
# ------------------------------
# Welcome to My Program
# ------------------------------
\`\`\`

## DRY Principle (Don't Repeat Yourself)

**Without functions (repetitive):**
\`\`\`python
print("=" * 20)
print("Section 1")
print("=" * 20)

print("=" * 20)
print("Section 2")
print("=" * 20)

print("=" * 20)
print("Section 3")
print("=" * 20)
\`\`\`

**With functions (clean):**
\`\`\`python
def print_section(title):
    print("=" * 20)
    print(title)
    print("=" * 20)

print_section("Section 1")
print_section("Section 2")
print_section("Section 3")
\`\`\`

## Functions vs Built-in Functions

Python has many built-in functions you've already used:
\`\`\`python
# Built-in functions
print("Hello")
len([1, 2, 3])
type(5)
range(10)

# Custom functions
def my_function():
    print("This is my function")
\`\`\`

## Docstrings - Documenting Functions

Use triple quotes to document what your function does.

\`\`\`python
def greet():
    """
    This function prints a greeting message.
    """
    print("Hello, World!")

def calculate_area():
    """
    Calculate the area of a rectangle.
    Returns the area value.
    """
    pass
\`\`\`
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What will be the output of the following code?\n\n```python\ndef display():\n    print('A')\n    print('B')\n\ndisplay()\nprint('C')\n```",
              options: [
                "A B C",
                "A C B",
                "C A B",
                "Error"
              ],
              correctAnswer: 0,
              explanation: "First, display() is called which prints 'A' then 'B'. After the function completes, print('C') executes. The output is A, B, C (each on a new line)."
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to define a function named 'greet':",
              blocks: ["def", "greet", "(", ")", ":"],
              correctOrder: ["def", "greet", "(", ")", ":"],
              explanation: "A function is defined using the def keyword followed by the function name, parentheses, and a colon: def function_name():"
            }
          ]
        },
        practice: {
          description: `
## Exercise: Create a Greeting Function

**Task**: 
Create a function called \`print_greeting\` that:
1. Prints "Welcome to Python Programming!"
2. Prints "Let's start learning!"
3. Call the function twice

**Hints**:
- Define function using \`def function_name():\`
- Use \`print()\` inside the function
- Call the function by writing its name followed by \`()\`
          `,
          starterCode: `# Define the function



# Call the function twice


`,
          solution: `# Define the function
def print_greeting():
    print("Welcome to Python Programming!")
    print("Let's start learning!")

# Call the function twice
print_greeting()
print_greeting()`,
          expectedOutput: "Welcome to Python Programming!\nLet's start learning!\nWelcome to Python Programming!\nLet's start learning!"
        }
      }
    },
    {
      id: "7.2",
      title: "7.2 Parameters and Return Values",
      videoUrl: "https://youtu.be/P7s9QKZKlds",
      content: {
        lecture: `
# Parameters and Return Values

Functions can accept input (parameters) and produce output (return values).

## Parameters (Input)

Parameters allow you to pass information to functions.

### Single Parameter

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # Hello, Alice!
greet("Bob")    # Hello, Bob!
\`\`\`

### Multiple Parameters

\`\`\`python
def add(a, b):
    result = a + b
    print(f"{a} + {b} = {result}")

add(3, 5)   # 3 + 5 = 8
add(10, 20) # 10 + 20 = 30
\`\`\`

## Positional Parameters

Order matters with positional parameters.

\`\`\`python
def introduce(name, age, city):
    print(f"My name is {name}")
    print(f"I am {age} years old")
    print(f"I live in {city}")

introduce("Alice", 25, "New York")
# My name is Alice
# I am 25 years old
# I live in New York
\`\`\`

## Default Parameters

Provide default values for parameters.

\`\`\`python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")              # Hello, Alice!
greet("Bob", "Good morning") # Good morning, Bob!
\`\`\`

### Multiple Default Parameters

\`\`\`python
def create_profile(name, age=18, country="USA"):
    print(f"Name: {name}")
    print(f"Age: {age}")
    print(f"Country: {country}")

create_profile("Alice")
# Name: Alice
# Age: 18
# Country: USA

create_profile("Bob", 25, "UK")
# Name: Bob
# Age: 25
# Country: UK
\`\`\`

⚠️ **Rule**: Default parameters must come after non-default parameters!

\`\`\`python
# Correct
def func(a, b=10):
    pass

# Wrong!
# def func(a=10, b):
#     pass
\`\`\`

## Keyword Arguments

Specify parameters by name.

\`\`\`python
def introduce(name, age, city):
    print(f"{name}, {age}, {city}")

# Positional
introduce("Alice", 25, "NYC")

# Keyword arguments (order doesn't matter)
introduce(age=25, name="Alice", city="NYC")
introduce(city="NYC", name="Alice", age=25)
\`\`\`

### Mixing Positional and Keyword

\`\`\`python
def book_ticket(name, destination, seat="economy"):
    print(f"Passenger: {name}")
    print(f"Going to: {destination}")
    print(f"Seat class: {seat}")

# Positional + default
book_ticket("Alice", "Paris")

# Positional + keyword
book_ticket("Bob", "London", seat="business")
\`\`\`

## Return Values (Output)

Functions can return values using the \`return\` statement.

### Simple Return

\`\`\`python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # 8
\`\`\`

### Using Returned Values

\`\`\`python
def square(x):
    return x ** 2

# Use in calculations
num = square(5)
print(num)  # 25

# Use directly
print(square(3) + square(4))  # 9 + 16 = 25
\`\`\`

### Return vs Print

\`\`\`python
def add_and_print(a, b):
    result = a + b
    print(result)  # Only prints

def add_and_return(a, b):
    result = a + b
    return result  # Returns value

# Print version
add_and_print(3, 5)  # Prints 8
x = add_and_print(3, 5)  # x is None!

# Return version
add_and_return(3, 5)  # No output
y = add_and_return(3, 5)  # y is 8
print(y)  # 8
\`\`\`

### Return Multiple Values

Return multiple values as a tuple.

\`\`\`python
def get_min_max(numbers):
    return min(numbers), max(numbers)

result = get_min_max([1, 5, 3, 9, 2])
print(result)  # (1, 9)

# Unpack values
minimum, maximum = get_min_max([1, 5, 3, 9, 2])
print(f"Min: {minimum}, Max: {maximum}")  # Min: 1, Max: 9
\`\`\`

### Early Return

\`\`\`python
def divide(a, b):
    if b == 0:
        return "Cannot divide by zero"
    return a / b

print(divide(10, 2))  # 5.0
print(divide(10, 0))  # Cannot divide by zero
\`\`\`

### Return None

Functions without return or with empty return return \`None\`.

\`\`\`python
def say_hello():
    print("Hello")
    # No return statement

result = say_hello()  # Prints: Hello
print(result)         # None

def greet(name):
    if not name:
        return  # Returns None
    print(f"Hello, {name}!")

greet("")    # Returns None (no output)
greet("Bob") # Hello, Bob!
\`\`\`

## Combining Everything

\`\`\`python
def calculate_total(price, quantity=1, discount=0):
    """
    Calculate total price with discount.
    
    Args:
        price: Unit price
        quantity: Number of items (default: 1)
        discount: Discount percentage (default: 0)
    
    Returns:
        Total price after discount
    """
    subtotal = price * quantity
    discount_amount = subtotal * (discount / 100)
    total = subtotal - discount_amount
    return total

# Different ways to call
print(calculate_total(100))                    # 100.0
print(calculate_total(100, 3))                 # 300.0
print(calculate_total(100, 3, 10))             # 270.0
print(calculate_total(100, discount=20))       # 80.0
print(calculate_total(price=50, quantity=4, discount=15))  # 170.0
\`\`\`
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What will be the output of the following code?\n\n```python\ndef multiply(x, y=2):\n    return x * y\n\nresult1 = multiply(5)\nresult2 = multiply(5, 3)\nprint(result1 + result2)\n```",
              options: [
                "25",
                "30",
                "15",
                "35"
              ],
              correctAnswer: 0,
              explanation: "multiply(5) uses default y=2, so 5*2=10. multiply(5, 3) gives 5*3=15. Total: 10+15=25."
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to create a function that returns the sum of a and b:",
              multiLine: true,
              sharedBlocks: false,
              lines: [
                {
                  label: "Line 1 (function definition):",
                  blocks: ["def", "add", "(", "a,", "b", ")", ":"],
                  correctOrder: ["def", "add", "(", "a,", "b", ")", ":"]
                },
                {
                  label: "Line 2 (return statement - indented):",
                  blocks: ["return", "a", "+", "b"],
                  correctOrder: ["return", "a", "+", "b"],
                  indent: true
                }
              ],
              explanation: "A complete function definition includes: 1) def keyword with function name and parameters, 2) indented return statement to send back the result."
            }
          ]
        },
        practice: {
          description: `
## Exercise: Calculate Rectangle Area

**Task**: 
Create a function called \`calculate_area\` that:
1. Takes two parameters: width and height
2. Returns the area (width × height)
3. Call the function with width=5 and height=10
4. Print the returned result

**Hints**:
- Define function: \`def calculate_area(width, height):\`
- Calculate area: \`width * height\`
- Use \`return\` to return the value
- Store the result in a variable and print it
          `,
          starterCode: `# Define the function


# Call the function and store result


# Print the result

`,
          solution: `# Define the function
def calculate_area(width, height):
    return width * height

# Call the function and store result
area = calculate_area(5, 10)

# Print the result
print(area)`,
          expectedOutput: "50"
        }
      }
    },
    {
      id: "7.3",
      title: "7.3 Variable Scope and Lambda Functions",
      videoUrl: "https://youtu.be/Rm2-rqpFbRk",
      content: {
        lecture: `
# Variable Scope and Lambda Functions

## Part 1: Variable Scope

Variable scope determines where a variable can be accessed in your code.

### Local Variables

Variables defined inside a function are **local** to that function.

\`\`\`python
def my_function():
    local_var = 10  # Local variable
    print(local_var)

my_function()  # 10
# print(local_var)  # Error! local_var doesn't exist here
\`\`\`

### Local Variables Are Isolated

\`\`\`python
def function1():
    x = 10
    print(f"Function1: x = {x}")

def function2():
    x = 20
    print(f"Function2: x = {x}")

function1()  # Function1: x = 10
function2()  # Function2: x = 20
# Each function has its own x
\`\`\`

### Global Variables

Variables defined outside functions are **global** and can be accessed anywhere.

\`\`\`python
global_var = 100  # Global variable

def my_function():
    print(global_var)  # Can read global variable

my_function()  # 100
print(global_var)  # 100
\`\`\`

### Local vs Global

\`\`\`python
x = 10  # Global variable

def display():
    x = 20  # Local variable (different from global x)
    print(f"Inside function: x = {x}")

display()  # Inside function: x = 20
print(f"Outside function: x = {x}")  # Outside function: x = 10
\`\`\`

### The global Keyword

Use \`global\` to modify a global variable inside a function.

\`\`\`python
count = 0  # Global variable

def increment():
    global count  # Declare we're using the global count
    count += 1
    print(f"Count is now: {count}")

increment()  # Count is now: 1
increment()  # Count is now: 2
increment()  # Count is now: 3
print(count)  # 3
\`\`\`

### LEGB Rule

Python searches for variables in this order:
1. **L**ocal - Inside the current function
2. **E**nclosing - Inside enclosing functions
3. **G**lobal - At the module level
4. **B**uilt-in - Python's built-in names

\`\`\`python
x = "global"  # Global

def outer():
    x = "enclosing"  # Enclosing
    
    def inner():
        x = "local"  # Local
        print(x)
    
    inner()

outer()  # local
\`\`\`

### Nested Functions and the nonlocal Keyword

Inner functions can access and modify enclosing function variables using \`nonlocal\`.

\`\`\`python
def outer():
    count = 0
    
    def increment():
        nonlocal count  # Modify the enclosing variable
        count += 1
        return count
    
    print(increment())  # 1
    print(increment())  # 2
    print(increment())  # 3

outer()
\`\`\`

---

## Part 2: Lambda Functions

A **lambda** is a small anonymous function that takes any number of arguments but executes only one expression.

### Lambda Syntax

\`\`\`python
lambda arguments: expression
\`\`\`

### Basic Lambda Examples

\`\`\`python
# Regular function
def square(x):
    return x ** 2

# Equivalent lambda function
square_lambda = lambda x: x ** 2

print(square(5))          # 25
print(square_lambda(5))   # 25
\`\`\`

### Lambda with Multiple Arguments

\`\`\`python
add = lambda x, y: x + y
multiply = lambda x, y, z: x * y * z

print(add(3, 5))          # 8
print(multiply(2, 3, 4))  # 24
\`\`\`

### Lambda with Default Arguments

\`\`\`python
greet = lambda name, greeting="Hello": f"{greeting}, {name}!"

print(greet("Alice"))                    # Hello, Alice!
print(greet("Bob", "Hi"))                # Hi, Bob!
\`\`\`

### Lambda with map()

Use lambda with \`map()\` to apply a function to all items in an iterable.

\`\`\`python
numbers = [1, 2, 3, 4, 5]

# Square each number
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# Convert to string
as_strings = list(map(lambda x: str(x), numbers))
print(as_strings)  # ['1', '2', '3', '4', '5']
\`\`\`

### Lambda with filter()

Use lambda with \`filter()\` to select items that meet a condition.

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filter even numbers
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6, 8, 10]

# Filter numbers greater than 5
greater_than_5 = list(filter(lambda x: x > 5, numbers))
print(greater_than_5)  # [6, 7, 8, 9, 10]
\`\`\`

### Lambda with sorted()

Use lambda with \`sorted()\` to sort by a custom key.

\`\`\`python
words = ["apple", "pie", "zoo", "cat"]

# Sort by length
sorted_by_length = sorted(words, key=lambda s: len(s))
print(sorted_by_length)  # ['pie', 'zoo', 'cat', 'apple']

# Sort by reverse alphabetically
sorted_reverse = sorted(words, key=lambda s: s, reverse=True)
print(sorted_reverse)  # ['zoo', 'pie', 'cat', 'apple']
\`\`\`

### Practical Example: Working with Data

\`\`\`python
# Student data
students = [
    {"name": "Alice", "grade": 85},
    {"name": "Bob", "grade": 92},
    {"name": "Charlie", "grade": 78},
    {"name": "Diana", "grade": 95}
]

# Get all grades
grades = list(map(lambda s: s["grade"], students))
print(grades)  # [85, 92, 78, 95]

# Filter high achievers (grade >= 90)
high_achievers = list(filter(lambda s: s["grade"] >= 90, students))
print(high_achievers)  
# [{'name': 'Bob', 'grade': 92}, {'name': 'Diana', 'grade': 95}]

# Sort by name
sorted_students = sorted(students, key=lambda s: s["name"])
print(sorted_students)
# [{'name': 'Alice', 'grade': 85}, {'name': 'Bob', 'grade': 92}, ...]
\`\`\`

### When to Use Lambda

**Use lambda when**:
- You need a simple function for a short time
- Using it as an argument to functions like \`map()\`, \`filter()\`, \`sorted()\`

**Don't use lambda when**:
- The function is complex or multi-line
- You'll use the function multiple times (define a regular function instead)

\`\`\`python
# Good: Lambda is simple and used once
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))

# Better: Use regular function if you'll use it many times
def square(x):
    return x ** 2

squared = list(map(square, numbers))
\`\`\`
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What will be the output of the following code?\n\n```python\nnumbers = [1, 2, 3, 4, 5]\nresult = list(filter(lambda x: x > 2, numbers))\nprint(result)\n```",
              options: [
                "[3, 4, 5]",
                "[1, 2]",
                "[2, 3, 4, 5]",
                "[1, 2, 3, 4, 5]"
              ],
              correctAnswer: 0,
              explanation: "The filter() function with lambda x: x > 2 keeps only numbers greater than 2. So it filters out 1 and 2, returning [3, 4, 5]."
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to create a lambda function that doubles a number:",
              blocks: ["lambda", "n:", "n", "*", "2"],
              correctOrder: ["lambda", "n:", "n", "*", "2"],
              explanation: "Lambda functions are small anonymous functions. Syntax: lambda parameter: expression. This creates a function that doubles n: lambda n: n * 2"
            }
          ]
        },
        practice: {
          description: `
## Exercise: Processing Student Data with Lambda

**Task**: 
Create a program to process student data using lambda functions with map() and filter():
1. Define a list of students (dictionaries with 'name' and 'score' keys)
2. Use \`map()\` with a lambda to extract all scores
3. Use \`filter()\` with a lambda to find students with score >= 80
4. Use \`sorted()\` with a lambda to sort students by name alphabetically

**Sample Data**:
- Alice: 85
- Bob: 72
- Charlie: 88
- Diana: 76

**Hints**:
- Use \`lambda s: s["score"]\` to access dictionary values
- Use \`list()\` to convert map and filter results to lists
- Use \`key=lambda s: s["name"]\` with sorted()
          `,
          starterCode: `# Student data
students = [
    {"name": "Alice", "score": 85},
    {"name": "Bob", "score": 72},
    {"name": "Charlie", "score": 88},
    {"name": "Diana", "score": 76}
]

# Extract all scores using map
scores = 


# Filter students with score >= 80
passed = 


# Sort students by name
sorted_students = 


print("All scores:", scores)
print("Passed students:", passed)
print("Sorted by name:", sorted_students)
`,
          solution: `# Student data
students = [
    {"name": "Alice", "score": 85},
    {"name": "Bob", "score": 72},
    {"name": "Charlie", "score": 88},
    {"name": "Diana", "score": 76}
]

# Extract all scores using map
scores = list(map(lambda s: s["score"], students))

# Filter students with score >= 80
passed = list(filter(lambda s: s["score"] >= 80, students))

# Sort students by name
sorted_students = sorted(students, key=lambda s: s["name"])

print("All scores:", scores)
print("Passed students:", passed)
print("Sorted by name:", sorted_students)`,
          expectedOutput: "All scores: [85, 72, 88, 76]\nPassed students: [{'name': 'Alice', 'score': 85}, {'name': 'Charlie', 'score': 88}]\nSorted by name: [{'name': 'Alice', 'score': 85}, {'name': 'Bob', 'score': 72}, {'name': 'Charlie', 'score': 88}, {'name': 'Diana', 'score': 76}]"
        }
      }
    }
  ]
};
