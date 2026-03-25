// Chapter 2: Operations and Expressions
export const chapter2 = {
  id: 2,
  title: "Chapter 2: Operations and Expressions",
  subsections: [
    {
      id: "2.1",
      title: "2.1 Arithmetic Operations",
      videoUrl: "https://youtu.be/zYQ6IvqDTYk",
      content: {
        lecture: `
# Arithmetic Operations

Python supports various mathematical operations.

## Basic Operators

\`\`\`python
# Addition
result = 10 + 5  # 15

# Subtraction
result = 10 - 5  # 5

# Multiplication
result = 10 * 5  # 50

# Division (result is float)
result = 10 / 5  # 2.0

# Integer Division (floor division)
result = 10 // 3  # 3

# Modulus (remainder)
result = 10 % 3  # 1

# Exponentiation
result = 2 ** 3  # 8
\`\`\`

## Order of Operations

Follows mathematical order of operations (parentheses > exponentiation > multiplication/division > addition/subtraction)

\`\`\`python
result = 2 + 3 * 4  # 14
result = (2 + 3) * 4  # 20
\`\`\`
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What is the result of the following code?\n\nresult = 10 + 5 * 2",
              options: [
                "30",
                "20",
                "25",
                "15"
              ],
              correctAnswer: 1,
              explanation: "According to the order of operations, multiplication has priority over addition, so first calculate 5 * 2 = 10, then 10 + 10 = 20."
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to calculate the expression: (10 + 5) * 2",
              blocks: ["result", "=", "(", "10", "+", "5", ")", "*", "2"],
              correctOrder: ["result", "=", "(", "10", "+", "5", ")", "*", "2"],
              explanation: "The correct syntax is: result = (10 + 5) * 2 - parentheses ensure addition is performed first, then multiplication. The result is 30."
            }
          ]
        },
        practice: {
          description: `
## Exercise: Calculate the Area of a Circle

**Task**:
Calculate the area of a circle with radius 5 (using formula: area = π × r × r)

**Hints**:
- π is approximately 3.14159
- Use the ** operator to calculate the square
- Finally use print() to output the result
          `,
          starterCode: `# Define variables
pi = 3.14159
radius = 5

# Calculate area
area = 

# Output result
`,
          solution: `pi = 3.14159
radius = 5
area = pi * radius ** 2
print(area)`,
          expectedOutput: "78.53975"
        }
      }
    },
    {
      id: "2.2",
      title: "2.2 Comparison and Logical Operations",
      videoUrl: "https://youtu.be/xBeUFBWQDWQ",
      content: {
        lecture: `
# Comparison and Logical Operations

## Comparison Operators

Comparison operators compare two values and return True or False.

\`\`\`python
# Equal to
5 == 5  # True
5 == 3  # False

# Not equal to
5 != 3  # True
5 != 5  # False

# Greater than
10 > 5  # True
3 > 5   # False

# Less than
3 < 5   # True
10 < 5  # False

# Greater than or equal to
5 >= 5  # True
5 >= 3  # True
3 >= 5  # False

# Less than or equal to
3 <= 5  # True
5 <= 5  # True
7 <= 5  # False
\`\`\`

## Logical Operators

Logical operators combine multiple conditions.

### AND Operator
Both conditions must be True
\`\`\`python
age = 25
has_license = True

# Both conditions must be True
if age >= 18 and has_license:
    print("You can drive")  # This will print

# Example with False
if age >= 30 and has_license:
    print("You can drive")  # This will NOT print
\`\`\`

### OR Operator
At least one condition must be True
\`\`\`python
is_weekend = True
is_holiday = False

# At least one condition must be True
if is_weekend or is_holiday:
    print("You can rest")  # This will print

# Another example
if is_weekend or False:
    print("Rest day")  # This will print
\`\`\`

### NOT Operator
Inverts the boolean value
\`\`\`python
is_raining = False

if not is_raining:
    print("Let's go outside!")  # This will print

# Another example
is_busy = True
if not is_busy:
    print("Free time")  # This will NOT print
\`\`\`

## Combining Multiple Operators

\`\`\`python
age = 25
has_license = True
has_car = False

# Complex condition
if (age >= 18 and has_license) or has_car:
    print("Can travel by car")
\`\`\`

## Common Use Cases

### Checking Range
\`\`\`python
score = 85

# Check if score is between 80 and 90
if score >= 80 and score <= 90:
    print("Grade: B")

# Shorter way
if 80 <= score <= 90:
    print("Grade: B")
\`\`\`

### Checking Multiple Conditions
\`\`\`python
temperature = 25
is_sunny = True

if temperature > 20 and is_sunny:
    print("Perfect day for a picnic!")
\`\`\`
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What will the following code output?\n\n```python\nx = 10\ny = 5\nif x > 5 and y < 10:\n    print('Yes')\nelse:\n    print('No')\n```",
              options: [
                "Yes",
                "No",
                "True",
                "Error"
              ],
              correctAnswer: 0,
              explanation: "Both conditions are true: x > 5 (10 > 5 is True) and y < 10 (5 < 10 is True). Since both conditions in the 'and' statement are True, it prints 'Yes'."
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to create a condition: age >= 18 or has_license",
              blocks: ["age", ">=", "18", "or", "has_license"],
              correctOrder: ["age", ">=", "18", "or", "has_license"],
              explanation: "The correct syntax is: age >= 18 or has_license - this condition is True if either the person is 18 or older OR they have a license."
            }
          ]
        },
        practice: {
          description: `
## Exercise: Check Eligibility for Discount

**Task**: 
A store offers discounts based on these rules:
- Customers aged 65 or older get a discount
- Students get a discount
- If either condition is true, print "You are eligible for a discount"
- Otherwise, print "No discount available"

Use the variables: age = 30, is_student = True

**Hints**:
- Use the \`or\` operator
- Use \`>=\` for age comparison
- Use an if-else statement
          `,
          starterCode: `age = 30
is_student = True

# Write your condition here
`,
          solution: `age = 30
is_student = True

if age >= 65 or is_student:
    print("You are eligible for a discount")
else:
    print("No discount available")`,
          expectedOutput: "You are eligible for a discount"
        }
      }
    },
    {
      id: "2.3",
      title: "2.3 String Operations",
      videoUrl: "https://youtu.be/7vIOY_yek_M",
      content: {
        lecture: `
# String Operations

## String Concatenation

Combine strings using the + operator

\`\`\`python
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name
print(full_name)  # Output: John Doe
\`\`\`

## String Indexing

Access individual characters using square brackets

\`\`\`python
text = "Python"
print(text[0])   # P (first character)
print(text[1])   # y
print(text[-1])  # n (last character)
print(text[-2])  # o (second from last)
\`\`\`

## String Slicing

Extract a portion of a string

\`\`\`python
text = "Programming"

# [start:end] - end is not included
print(text[0:4])    # Prog
print(text[3:7])    # gram
print(text[:4])     # Prog (from beginning)
print(text[4:])     # ramming (to end)
print(text[-3:])    # ing (last 3 characters)
\`\`\`

## String Methods

Python provides many built-in string methods

### Changing Case
\`\`\`python
text = "Hello World"

print(text.upper())      # HELLO WORLD
print(text.lower())      # hello world
print(text.capitalize()) # Hello world
print(text.title())      # Hello World
\`\`\`

### Finding and Replacing
\`\`\`python
text = "Hello World"

print(text.replace("World", "Python"))  # Hello Python
print(text.find("World"))                # 6 (index position)
print(text.count("l"))                   # 3 (number of 'l')
\`\`\`

### Checking Content
\`\`\`python
text = "Hello123"

print(text.isalpha())     # False (contains numbers)
print(text.isdigit())     # False (contains letters)
print(text.isalnum())     # True (alphanumeric)
print(text.startswith("H"))  # True
print(text.endswith("3"))    # True
\`\`\`

### Trimming Whitespace
\`\`\`python
text = "  Hello  "

print(text.strip())   # "Hello" (removes both sides)
print(text.lstrip())  # "Hello  " (removes left)
print(text.rstrip())  # "  Hello" (removes right)
\`\`\`

### Splitting and Joining
\`\`\`python
# Split string into list
sentence = "Python is awesome"
words = sentence.split()
print(words)  # ['Python', 'is', 'awesome']

# Join list into string
words = ['Python', 'is', 'awesome']
sentence = " ".join(words)
print(sentence)  # Python is awesome
\`\`\`

## String Multiplication

Repeat strings using the * operator

\`\`\`python
print("Ha" * 3)     # HaHaHa
print("-" * 20)     # --------------------
\`\`\`

## String Length

Get the length of a string

\`\`\`python
text = "Python"
length = len(text)
print(length)  # 6
\`\`\`

## Escape Characters

Special characters in strings

\`\`\`python
# New line
print("Line 1\\nLine 2")

# Tab
print("Name:\\tJohn")

# Quote inside string
print("He said \\"Hello\\"")

# Backslash
print("Path: C:\\\\Users\\\\Documents")
\`\`\`
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What will be the output of the following code?\n\n```python\ntext = 'Python Programming'\nprint(text[7:11])\n```",
              options: [
                "Prog",
                "Programming",
                "gram",
                "ogra"
              ],
              correctAnswer: 0,
              explanation: "String slicing [7:11] extracts characters from index 7 to 10 (11 is not included). In 'Python Programming', index 7 is 'P', and characters from 7 to 10 are 'Prog'."
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to create a greeting message",
              blocks: ["greeting", "=", '"Hello, "', "+", "name"],
              correctOrder: ["greeting", "=", '"Hello, "', "+", "name"],
              explanation: "The correct syntax is: greeting = \"Hello, \" + name - this concatenates the string \"Hello, \" with the variable name."
            }
          ]
        },
        practice: {
          description: `
## Exercise: Format Email Address

**Task**: 
Create a program that:
1. Takes a first name: "john"
2. Takes a last name: "doe"
3. Converts both to lowercase
4. Creates an email in format: firstname.lastname@company.com
5. The company domain is "techcorp"

**Expected Output**:
\`\`\`
john.doe@techcorp.com
\`\`\`

**Hints**:
- Use \`.lower()\` method
- Use string concatenation with +
- Don't forget the @ and .com
          `,
          starterCode: `first_name = "John"
last_name = "Doe"
company = "techcorp"

# Convert to lowercase


# Create email


# Print result
`,
          solution: `first_name = "John"
last_name = "Doe"
company = "techcorp"

first_name = first_name.lower()
last_name = last_name.lower()
email = first_name + "." + last_name + "@" + company + ".com"
print(email)`,
              expectedOutput: "john.doe@techcorp.com"
        }
      }
    }
  ]
};
