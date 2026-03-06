// Chapter 4: Loops
export const chapter4 = {
  id: 4,
  title: "Chapter 4: Loops",
  subsections: [
    {
      id: "4.1",
      title: "4.1 for Loop",
      videoUrl: "https://youtu.be/esdTMOMIhOM",
      content: {
        lecture: `
# for Loop

The \`for\` loop is used to iterate over a sequence (like a list, string, or range of numbers).

## Basic Syntax

\`\`\`python
for variable in sequence:
    # code to execute
\`\`\`

## The range() Function

The \`range()\` function generates a sequence of numbers.

### range(stop)
Generates numbers from 0 to stop-1
\`\`\`python
for i in range(5):
    print(i)
# Output: 0, 1, 2, 3, 4
\`\`\`

### range(start, stop)
Generates numbers from start to stop-1
\`\`\`python
for i in range(2, 6):
    print(i)
# Output: 2, 3, 4, 5
\`\`\`

### range(start, stop, step)
Generates numbers with a specific step
\`\`\`python
for i in range(0, 10, 2):
    print(i)
# Output: 0, 2, 4, 6, 8
\`\`\`

## Iterating Over Lists

\`\`\`python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(f"I like {fruit}")

# Output:
# I like apple
# I like banana
# I like cherry
\`\`\`

## Iterating Over Strings

\`\`\`python
message = "Python"

for char in message:
    print(char)

# Output: P y t h o n (each on a new line)
\`\`\`

## Using enumerate()

Get both index and value while iterating
\`\`\`python
fruits = ["apple", "banana", "cherry"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Output:
# 0: apple
# 1: banana
# 2: cherry
\`\`\`

## Practical Examples

### Sum of Numbers
\`\`\`python
total = 0
for i in range(1, 6):
    total += i
print(f"Sum: {total}")  # Sum: 15
\`\`\`

### Counting Vowels
\`\`\`python
text = "Hello World"
vowels = "aeiouAEIOU"
count = 0

for char in text:
    if char in vowels:
        count += 1
print(f"Vowels: {count}")  # Vowels: 3
\`\`\`
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What will be the output of the following code?\n\n```python\nfor i in range(3, 7):\n    print(i, end=' ')\n```",
              options: [
                "3 4 5 6",
                "3 4 5 6 7",
                "4 5 6 7",
                "3 4 5"
              ],
              correctAnswer: 0,
              explanation: "range(3, 7) generates numbers from 3 to 6 (7 is not included). The end=' ' parameter makes print() add a space instead of a newline, so the output is: 3 4 5 6"
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to create a for loop that iterates from 0 to 4:",
              blocks: ["for", "i", "in", "range(5)", ":"],
              correctOrder: ["for", "i", "in", "range(5)", ":"],
              explanation: "A for loop in Python uses the syntax: for variable in sequence:"
            }
          ]
        },
        practice: {
          description: `
## Exercise: Calculate Sum of Even Numbers

**Task**: 
Write a program to calculate the sum of all even numbers from 1 to 10.

**Hints**:
- Use \`range()\` to generate numbers from 1 to 10
- Check if a number is even using \`% 2 == 0\`
- Use a variable to accumulate the sum
- Print the final sum
          `,
          starterCode: `# Initialize sum
total = 0

# Loop through numbers 1 to 10


# Print the result
`,
          solution: `# Initialize sum
total = 0

# Loop through numbers 1 to 10
for i in range(1, 11):
    if i % 2 == 0:
        total += i

# Print the result
print(total)`,
          expectedOutput: "30"
        }
      }
    },
    {
      id: "4.2",
      title: "4.2 while Loop",
      videoUrl: "https://youtu.be/DrQiUExfAw4",
      content: {
        lecture: `
# while Loop

The \`while\` loop repeats a block of code as long as a condition is True.

## Basic Syntax

\`\`\`python
while condition:
    # code to execute
\`\`\`

## Simple Example

\`\`\`python
count = 0

while count < 5:
    print(f"Count: {count}")
    count += 1

# Output:
# Count: 0
# Count: 1
# Count: 2
# Count: 3
# Count: 4
\`\`\`

## Infinite Loops

⚠️ **Warning**: Always make sure your condition will eventually become False!

\`\`\`python
# This will run forever (DON'T RUN THIS!)
while True:
    print("This never stops!")
\`\`\`

## Common Patterns

### Countdown Timer
\`\`\`python
countdown = 5

while countdown > 0:
    print(countdown)
    countdown -= 1
print("Blast off!")

# Output: 5, 4, 3, 2, 1, Blast off!
\`\`\`

### Accumulator Pattern
\`\`\`python
total = 0
num = 1

while num <= 5:
    total += num
    num += 1

print(f"Total: {total}")  # Total: 15
\`\`\`

### Search Pattern with break
\`\`\`python
numbers = [1, 3, 5, 7, 9]
target = 5
index = 0
found = False

while index < len(numbers):
    if numbers[index] == target:
        print(f"Found {target} at index {index}")
        found = True
        break
    index += 1

if not found:
    print(f"{target} not found")
\`\`\`

## while vs for

**Use for when:**
- You know how many iterations you need
- You're iterating over a sequence

**Use while when:**
- You don't know how many iterations you need
- You're waiting for a condition to change
- You need more control over the loop
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What will be the output of the following code?\n\n```python\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1\n```",
              options: [
                "0 1 2",
                "1 2 3",
                "0 1",
                "0 1 2 3"
              ],
              correctAnswer: 0,
              explanation: "The loop starts with count = 0. It prints 0, then increments to 1. Prints 1, increments to 2. Prints 2, increments to 3. Now count < 3 is False, so the loop stops. Output: 0 1 2"
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to create a while loop that continues until count reaches 10:",
              blocks: ["while", "count", "<", "10", ":"],
              correctOrder: ["while", "count", "<", "10", ":"],
              explanation: "A while loop continues as long as the condition is True. The syntax is: while condition:"
            }
          ]
        },
        practice: {
          description: `
## Exercise: Count Down from 10

**Task**: 
Write a program that prints numbers counting down from 10 to 1 using a while loop.

**Hints**:
- Start with \`count = 10\`
- Use a while loop with condition \`count > 0\`
- Print the count
- Decrement count by 1 each iteration
          `,
          starterCode: `# Count down from 10
count = 10

# Write your while loop

`,
          solution: `# Count down from 10
count = 10

while count > 0:
    print(count)
    count -= 1`,
          expectedOutput: "10\n9\n8\n7\n6\n5\n4\n3\n2\n1"
        }
      }
    },
    {
      id: "4.3",
      title: "4.3 Loop Control Statements",
      videoUrl: "https://youtu.be/SPRA3nuiQdU",
      content: {
        lecture: `
# Loop Control Statements

Loop control statements allow you to change how a loop executes. Learn how to use \`break\`, \`continue\`, and the \`else\` clause to fine-tune your loops.

## The break Statement

The \`break\` statement immediately exits a loop.

\`\`\`python
for i in range(10):
    if i == 5:
        break
    print(i)

# Output: 0, 1, 2, 3, 4
\`\`\`

## Practical Example: Finding a Number

\`\`\`python
numbers = [3, 7, 2, 9, 5, 1]
target = 9

for num in numbers:
    if num == target:
        print(f"Found {target}!")
        break
    print(f"Checking {num}")

# Output:
# Checking 3
# Checking 7
# Checking 2
# Found 9!
\`\`\`

## The continue Statement

The \`continue\` statement skips the rest of the current iteration and moves to the next one.

\`\`\`python
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)

# Output: 1, 3, 5, 7, 9 (only odd numbers)
\`\`\`

## Practical Example: Filtering Data

\`\`\`python
numbers = [5, -3, 8, -1, 10, -7, 3]

for num in numbers:
    if num < 0:
        continue
    print(num)

# Output: 5, 8, 10, 3 (negative numbers skipped)
\`\`\`

## The else Clause in Loops

The \`else\` clause runs when a loop completes normally without hitting a \`break\`.

### Normal Completion (else runs)
\`\`\`python
for i in range(5):
    print(i)
else:
    print("Loop completed normally")

# Output:
# 0, 1, 2, 3, 4
# Loop completed normally
\`\`\`

### With break (else does NOT run)
\`\`\`python
for i in range(5):
    if i == 3:
        print("Breaking!")
        break
    print(i)
else:
    print("Loop completed normally")

# Output:
# 0, 1, 2
# Breaking!
# (else clause is NOT executed)
\`\`\`

## Practical Example: Search System

\`\`\`python
users = ['alice', 'bob', 'charlie', 'david', 'eve']
banned = ['bob', 'eve']
search = 'charlie'

for user in users:
    if user in banned:
        print(f"Skipping banned user: {user}")
        continue
    if user == search:
        print(f"Found user: {user}")
        break
    print(f"Checking: {user}")
else:
    print("User not found")

# Output:
# Checking: alice
# Skipping banned user: bob
# Found user: charlie
\`\`\`

## Using with while Loops

Break and continue work with while loops too:

\`\`\`python
count = 0

while count < 10:
    count += 1
    if count == 3 or count == 7:
        continue
    if count == 9:
        break
    print(count)

# Output: 1, 2, 4, 5, 6, 8
\`\`\`

## Best Practices

1. **Use break** when you've found what you're looking for
2. **Use continue** to skip items that don't meet criteria
3. **Use else** to handle the "not found" case
4. **Keep loops readable** - don't nest too many control statements
5. **Comment complex logic** - explain why you're breaking or continuing
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What will be the output of the following code?\\n\\n```python\\nfor i in range(5):\\n    if i == 2:\\n        continue\\n    if i == 4:\\n        break\\n    print(i)\\nelse:\\n    print('Done')\\n```",
              options: [
                "0 1 3",
                "0 1 2 3",
                "0 1 3 Done",
                "0 1 Done"
              ],
              correctAnswer: 0,
              explanation: "When i=0, prints 0. When i=1, prints 1. When i=2, continue skips the print. When i=3, prints 3. When i=4, break exits the loop. The else clause does NOT run because of the break. Output: 0 1 3"
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to break out of a loop when target is found:",
              multiLine: true,
              lines: [
                {
                  label: "Line 1 (if statement):",
                  blocks: ["if", "num", "==", "target", ":"],
                  correctOrder: ["if", "num", "==", "target", ":"]
                },
                {
                  label: "Line 2 (break - indented):",
                  blocks: ["break"],
                  correctOrder: ["break"],
                  indent: true
                }
              ],
              explanation: "The break statement must be on a separate line, indented under the if statement. This exits the loop when the condition is true."
            }
          ]
        },
        practice: {
          description: `## Exercise: Search for a Number

**Task**: 
Create a program that searches through a list of numbers and prints:
- The numbers being checked
- Stop when you find the target number (99)
- Skip negative numbers using continue
- If not found, print a message (using else)

Test with the provided list.

**Hints**:
- Use \`if num < 0: continue\` to skip negatives
- Use \`if num == 99: break\` to stop when found
- Use the else clause for "not found" message
- Print each number being checked`,
          starterCode: `numbers = [5, -3, 8, -1, 99, -7, 3]
target = 99

# Search through the list

`,
          solution: `numbers = [5, -3, 8, -1, 99, -7, 3]
target = 99

for num in numbers:
    if num < 0:
        continue
    if num == target:
        print(f"Found {target}!")
        break
    print(f"Checking: {num}")
else:
    print(f"{target} not found")`,
          expectedOutput: "Checking: 5\nChecking: 8\nChecking: -1\nFound 99!"
        }
      }
    },
    {
      id: "4.4",
      title: "4.4 Nested Loops",
      videoUrl: "https://youtu.be/cf3MVLHY4SU",
      content: {
        lecture: `
# Nested Loops

A nested loop is a loop inside another loop. The inner loop completes all its iterations for each iteration of the outer loop.

## Basic Structure

\`\`\`python
for i in outer_sequence:
    for j in inner_sequence:
        # code executes for each combination of i and j
\`\`\`

## Simple Example

\`\`\`python
for i in range(3):
    for j in range(2):
        print(f"i={i}, j={j}")

# Output:
# i=0, j=0
# i=0, j=1
# i=1, j=0
# i=1, j=1
# i=2, j=0
# i=2, j=1
\`\`\`

## Multiplication Table (99 Table)

### Simple 3x3 Table
\`\`\`python
for i in range(1, 4):
    for j in range(1, 4):
        result = i * j
        print(f"{i} x {j} = {result}")
    print()  # Empty line between groups

# Output:
# 1 x 1 = 1
# 1 x 2 = 2
# 1 x 3 = 3
#
# 2 x 1 = 2
# 2 x 2 = 4
# 2 x 3 = 6
# ...
\`\`\`

### Formatted Multiplication Table
\`\`\`python
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i * j:3}", end="")
    print()  # New line after each row

# Output:
#   1  2  3
#   2  4  6
#   3  6  9
\`\`\`

## Pattern Printing

### Right Triangle
\`\`\`python
for i in range(1, 6):
    for j in range(i):
        print("*", end="")
    print()

# Output:
# *
# **
# ***
# ****
# *****
\`\`\`

### Number Pyramid
\`\`\`python
for i in range(1, 6):
    for j in range(1, i + 1):
        print(j, end="")
    print()

# Output:
# 1
# 12
# 123
# 1234
# 12345
\`\`\`

### Square Grid
\`\`\`python
size = 4

for i in range(size):
    for j in range(size):
        print("#", end=" ")
    print()

# Output:
# # # # #
# # # # #
# # # # #
# # # # #
\`\`\`

## Nested Lists

### Creating a 2D Grid
\`\`\`python
rows = 3
cols = 4
grid = []

for i in range(rows):
    row = []
    for j in range(cols):
        row.append(0)
    grid.append(row)

print(grid)
# Output: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
\`\`\`

### Processing 2D Data
\`\`\`python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Print each element
for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        print(f"matrix[{i}][{j}] = {matrix[i][j]}")
\`\`\`

## Performance Consideration

⚠️ **Be careful with nested loops!** If the outer loop runs n times and the inner loop runs m times, the total iterations are n × m.

\`\`\`python
# This runs 10,000 times!
for i in range(100):
    for j in range(100):
        # code here runs 10,000 times
\`\`\`

## Breaking Out of Nested Loops

\`\`\`python
# Using a flag variable
found = False

for i in range(5):
    for j in range(5):
        if i * j == 12:
            print(f"Found: {i} * {j} = 12")
            found = True
            break
    if found:
        break
\`\`\`
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "How many times will 'Hello' be printed?\n\n```python\nfor i in range(2):\n    for j in range(3):\n        print('Hello')\n```",
              options: [
                "5",
                "6",
                "2",
                "3"
              ],
              correctAnswer: 1,
              explanation: "The outer loop runs 2 times, and for each iteration, the inner loop runs 3 times. So 'Hello' is printed 2 × 3 = 6 times."
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to create a nested loop structure (outer loop iterates 3 times, inner loop iterates 2 times):",
              multiLine: true,
              sharedBlocks: false,
              lines: [
                {
                  label: "Line 1 (outer loop):",
                  blocks: ["for", "i", "in", "range(3)", ":"],
                  correctOrder: ["for", "i", "in", "range(3)", ":"]
                },
                {
                  label: "Line 2 (inner loop - indented):",
                  blocks: ["for", "j", "in", "range(2)", ":"],
                  correctOrder: ["for", "j", "in", "range(2)", ":"],
                  indent: true
                }
              ],
              explanation: "Nested loops have one loop inside another. The inner loop completes all iterations for each iteration of the outer loop. Total iterations: 3 × 2 = 6"
            }
          ]
        },
        practice: {
          description: `
## Exercise: Print Multiplication Table

**Task**: 
Create a multiplication table for numbers 1 to 3.
Print each multiplication in the format: "1 x 1 = 1"
Add an empty line between each group (when outer loop changes).

**Hints**:
- Use nested for loops
- Outer loop: \`range(1, 4)\` for i
- Inner loop: \`range(1, 4)\` for j
- Print \`f"{i} x {j} = {i * j}"\`
- Print an empty line after inner loop completes
          `,
          starterCode: `# Multiplication table
# Outer loop for first number


    # Inner loop for second number
    

    # Empty line between groups

`,
          solution: `# Multiplication table
# Outer loop for first number
for i in range(1, 4):
    # Inner loop for second number
    for j in range(1, 4):
        print(f"{i} x {j} = {i * j}")
    
    # Empty line between groups
    print()`,
          expectedOutput: "1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n\n2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n\n3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9"
        }
      }
    }
  ]
};
