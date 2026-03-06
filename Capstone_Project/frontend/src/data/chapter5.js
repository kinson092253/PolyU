// Chapter 5: Lists
export const chapter5 = {
  id: 5,
  title: "Chapter 5: Lists",
  subsections: [
    {
      id: "5.1",
      title: "5.1 List Basics",
      videoUrl: "https://youtu.be/_-EauEW0xyQ",
      content: {
        lecture: `
# List Basics

A list is a collection of items in a particular order. Lists are one of the most commonly used data structures in Python.

## Creating Lists

Lists are created using square brackets \`[]\`.

\`\`\`python
# Empty list
empty_list = []

# List of numbers
numbers = [1, 2, 3, 4, 5]

# List of strings
fruits = ["apple", "banana", "cherry"]

# List with mixed types
mixed = [1, "hello", 3.14, True]

# List with duplicate values
duplicates = [1, 2, 2, 3, 3, 3]
\`\`\`

## Accessing List Elements

Use index numbers to access elements (indices start from 0).

### Positive Indexing
\`\`\`python
fruits = ["apple", "banana", "cherry", "date"]

print(fruits[0])   # apple (first element)
print(fruits[1])   # banana
print(fruits[3])   # date (last element)
\`\`\`

### Negative Indexing
Access elements from the end of the list.
\`\`\`python
fruits = ["apple", "banana", "cherry", "date"]

print(fruits[-1])  # date (last element)
print(fruits[-2])  # cherry (second from last)
print(fruits[-4])  # apple (first element)
\`\`\`

## List Slicing

Extract a portion of the list.

\`\`\`python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# [start:end] - end is not included
print(numbers[2:5])    # [2, 3, 4]
print(numbers[:4])     # [0, 1, 2, 3] (from beginning)
print(numbers[6:])     # [6, 7, 8, 9] (to end)
print(numbers[-3:])    # [7, 8, 9] (last 3 elements)
print(numbers[::2])    # [0, 2, 4, 6, 8] (every 2nd element)
\`\`\`

## Modifying Lists

Lists are mutable - you can change their content.

### Change Single Element
\`\`\`python
fruits = ["apple", "banana", "cherry"]
fruits[1] = "blueberry"
print(fruits)  # ['apple', 'blueberry', 'cherry']
\`\`\`

### Change Multiple Elements
\`\`\`python
numbers = [1, 2, 3, 4, 5]
numbers[1:3] = [20, 30]
print(numbers)  # [1, 20, 30, 4, 5]
\`\`\`

## List Length

Use \`len()\` to get the number of elements.

\`\`\`python
fruits = ["apple", "banana", "cherry"]
print(len(fruits))  # 3

empty = []
print(len(empty))   # 0
\`\`\`

## Checking Membership

Use \`in\` and \`not in\` to check if an element exists.

\`\`\`python
fruits = ["apple", "banana", "cherry"]

print("apple" in fruits)      # True
print("orange" in fruits)     # False
print("orange" not in fruits) # True
\`\`\`

## List Concatenation

Combine lists using \`+\`.

\`\`\`python
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = list1 + list2
print(combined)  # [1, 2, 3, 4, 5, 6]
\`\`\`

## List Repetition

Repeat lists using \`*\`.

\`\`\`python
numbers = [1, 2, 3]
repeated = numbers * 3
print(repeated)  # [1, 2, 3, 1, 2, 3, 1, 2, 3]
\`\`\`
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What will be the output of the following code?\n\n```python\nfruits = ['apple', 'banana', 'cherry', 'date']\nprint(fruits[1:3])\n```",
              options: [
                "['banana', 'cherry']",
                "['apple', 'banana', 'cherry']",
                "['banana', 'cherry', 'date']",
                "['apple', 'banana']"
              ],
              correctAnswer: 0,
              explanation: "List slicing [1:3] extracts elements from index 1 to index 2 (3 is not included). So fruits[1] is 'banana' and fruits[2] is 'cherry', resulting in ['banana', 'cherry']."
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to access elements from index 2 to 4 (not including 4) from the list:",
              blocks: ["fruits", "[", "2", ":", "4", "]"],
              correctOrder: ["fruits", "[", "2", ":", "4", "]"],
              explanation: "List slicing uses the syntax: list[start:end] where end is not included. So fruits[2:4] gets elements at index 2 and 3."
            }
          ]
        },
        practice: {
          description: `
## Exercise: Modify and Access List Elements

**Task**: 
Given a list of numbers, perform the following operations:
1. Change the second element (index 1) to 100
2. Print the modified list
3. Print the last element using negative indexing

Given: \`numbers = [10, 20, 30, 40, 50]\`

**Hints**:
- Use \`numbers[1] = 100\` to modify the second element
- Use \`numbers[-1]\` to access the last element
- Print the modified list first, then the last element
          `,
          starterCode: `# Given list
numbers = [10, 20, 30, 40, 50]

# Change the second element to 100


# Print the modified list


# Print the last element

`,
          solution: `# Given list
numbers = [10, 20, 30, 40, 50]

# Change the second element to 100
numbers[1] = 100

# Print the modified list
print(numbers)

# Print the last element
print(numbers[-1])`,
          expectedOutput: "[10, 100, 30, 40, 50]\n50"
        }
      }
    },
    {
      id: "5.2",
      title: "5.2 List Methods",
      videoUrl: "https://youtu.be/4cXJNhlhIY4",
      content: {
        lecture: `
# List Methods

Python provides many built-in methods to manipulate lists.

## append() - Add to End

Add a single element to the end of the list.

\`\`\`python
fruits = ["apple", "banana"]
fruits.append("cherry")
print(fruits)  # ['apple', 'banana', 'cherry']

# Append multiple times
numbers = [1, 2, 3]
numbers.append(4)
numbers.append(5)
print(numbers)  # [1, 2, 3, 4, 5]
\`\`\`

## insert() - Add at Position

Insert an element at a specific position.

\`\`\`python
fruits = ["apple", "cherry"]
fruits.insert(1, "banana")  # Insert at index 1
print(fruits)  # ['apple', 'banana', 'cherry']

# Insert at beginning
numbers = [2, 3, 4]
numbers.insert(0, 1)
print(numbers)  # [1, 2, 3, 4]
\`\`\`

## remove() - Remove by Value

Remove the first occurrence of a value.

\`\`\`python
fruits = ["apple", "banana", "cherry", "banana"]
fruits.remove("banana")  # Removes first 'banana'
print(fruits)  # ['apple', 'cherry', 'banana']
\`\`\`

⚠️ **Warning**: Raises an error if the value doesn't exist!

\`\`\`python
fruits = ["apple", "banana"]
# fruits.remove("orange")  # This would cause an error!
\`\`\`

## pop() - Remove by Index

Remove and return an element at a specific index.

\`\`\`python
fruits = ["apple", "banana", "cherry"]

# Remove last element (default)
last = fruits.pop()
print(last)    # cherry
print(fruits)  # ['apple', 'banana']

# Remove at specific index
fruits = ["apple", "banana", "cherry"]
item = fruits.pop(1)
print(item)    # banana
print(fruits)  # ['apple', 'cherry']
\`\`\`

## clear() - Remove All Elements

\`\`\`python
fruits = ["apple", "banana", "cherry"]
fruits.clear()
print(fruits)  # []
\`\`\`

## sort() - Sort the List

Sort the list in ascending order (modifies the original list).

\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2]
numbers.sort()
print(numbers)  # [1, 1, 2, 3, 4, 5, 9]

# Sort in descending order
numbers.sort(reverse=True)
print(numbers)  # [9, 5, 4, 3, 2, 1, 1]

# Sort strings alphabetically
fruits = ["cherry", "apple", "banana"]
fruits.sort()
print(fruits)  # ['apple', 'banana', 'cherry']
\`\`\`

## reverse() - Reverse the List

\`\`\`python
numbers = [1, 2, 3, 4, 5]
numbers.reverse()
print(numbers)  # [5, 4, 3, 2, 1]
\`\`\`

## index() - Find Element Position

Find the index of the first occurrence of a value.

\`\`\`python
fruits = ["apple", "banana", "cherry"]
position = fruits.index("banana")
print(position)  # 1
\`\`\`

## count() - Count Occurrences

Count how many times a value appears.

\`\`\`python
numbers = [1, 2, 2, 3, 2, 4]
count = numbers.count(2)
print(count)  # 3
\`\`\`

## extend() - Add Multiple Elements

Add all elements from another list.

\`\`\`python
list1 = [1, 2, 3]
list2 = [4, 5, 6]
list1.extend(list2)
print(list1)  # [1, 2, 3, 4, 5, 6]
\`\`\`

## copy() - Create a Copy

Create a shallow copy of the list.

\`\`\`python
original = [1, 2, 3]
copied = original.copy()
copied.append(4)

print(original)  # [1, 2, 3]
print(copied)    # [1, 2, 3, 4]
\`\`\`

## Method Summary

| Method | Description | Modifies Original? |
|--------|-------------|-------------------|
| append(x) | Add x to end | Yes |
| insert(i, x) | Insert x at index i | Yes |
| remove(x) | Remove first x | Yes |
| pop(i) | Remove and return at index i | Yes |
| clear() | Remove all elements | Yes |
| sort() | Sort in place | Yes |
| reverse() | Reverse in place | Yes |
| index(x) | Find index of x | No |
| count(x) | Count occurrences of x | No |
| copy() | Create a copy | No |
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What will be the output of the following code?\n\n```python\nnumbers = [3, 1, 4, 1, 5]\nnumbers.append(2)\nnumbers.sort()\nprint(numbers)\n```",
              options: [
                "[1, 1, 2, 3, 4, 5]",
                "[3, 1, 4, 1, 5, 2]",
                "[2, 1, 1, 3, 4, 5]",
                "[1, 2, 3, 4, 5]"
              ],
              correctAnswer: 0,
              explanation: "First, append(2) adds 2 to the end: [3, 1, 4, 1, 5, 2]. Then sort() arranges them in ascending order: [1, 1, 2, 3, 4, 5]."
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to add 'orange' to the end of the fruits list:",
              blocks: ["fruits", ".", "append", "(", "'orange'", ")"],
              correctOrder: ["fruits", ".", "append", "(", "'orange'", ")"],
              explanation: "The append() method adds an element to the end of the list. Syntax: list.append(item)"
            }
          ]
        },
        practice: {
          description: `
## Exercise: Manage a Shopping List

**Task**: 
Perform the following operations on a shopping list:
1. Start with: \`shopping_list = ["milk", "bread", "eggs"]\`
2. Add "butter" to the end
3. Remove "bread"
4. Sort the list alphabetically
5. Print the final list

**Hints**:
- Use \`.append()\` to add an item
- Use \`.remove()\` to remove an item
- Use \`.sort()\` to sort alphabetically
- Print the final result
          `,
          starterCode: `# Initial shopping list
shopping_list = ["milk", "bread", "eggs"]

# Add "butter"


# Remove "bread"


# Sort alphabetically


# Print the result

`,
          solution: `# Initial shopping list
shopping_list = ["milk", "bread", "eggs"]

# Add "butter"
shopping_list.append("butter")

# Remove "bread"
shopping_list.remove("bread")

# Sort alphabetically
shopping_list.sort()

# Print the result
print(shopping_list)`,
          expectedOutput: "['butter', 'eggs', 'milk']"
        }
      }
    },
    {
      id: "5.3",
      title: "5.3 List Comprehension",
      videoUrl: "https://youtu.be/xsy9W8Srax0",
      content: {
        lecture: `
# List Comprehension

List comprehension provides a concise way to create lists. It's a powerful feature that makes code more readable and efficient.

## Basic Syntax

\`\`\`python
[expression for item in iterable]
\`\`\`

## Simple Examples

### Traditional Way vs List Comprehension

**Traditional for loop:**
\`\`\`python
# Create a list of squares
squares = []
for i in range(1, 6):
    squares.append(i ** 2)
print(squares)  # [1, 4, 9, 16, 25]
\`\`\`

**List comprehension:**
\`\`\`python
# Same result, more concise
squares = [i ** 2 for i in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]
\`\`\`

## More Examples

### Generate Numbers
\`\`\`python
# Numbers 0 to 9
numbers = [i for i in range(10)]
print(numbers)  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Multiples of 5
multiples = [i * 5 for i in range(1, 6)]
print(multiples)  # [5, 10, 15, 20, 25]
\`\`\`

### Transform Strings
\`\`\`python
# Convert to uppercase
fruits = ["apple", "banana", "cherry"]
upper_fruits = [fruit.upper() for fruit in fruits]
print(upper_fruits)  # ['APPLE', 'BANANA', 'CHERRY']

# Get lengths
lengths = [len(fruit) for fruit in fruits]
print(lengths)  # [5, 6, 6]
\`\`\`

## List Comprehension with Conditions

Add an \`if\` condition to filter elements.

### Basic Filtering

\`\`\`python
# Only even numbers
numbers = [i for i in range(10) if i % 2 == 0]
print(numbers)  # [0, 2, 4, 6, 8]

# Only positive numbers
values = [-2, -1, 0, 1, 2, 3]
positives = [x for x in values if x > 0]
print(positives)  # [1, 2, 3]
\`\`\`

### Filter Strings

\`\`\`python
# Words longer than 5 characters
words = ["cat", "elephant", "dog", "butterfly"]
long_words = [word for word in words if len(word) > 5]
print(long_words)  # ['elephant', 'butterfly']

# Words starting with 'a'
fruits = ["apple", "banana", "apricot", "cherry"]
a_fruits = [fruit for fruit in fruits if fruit.startswith('a')]
print(a_fruits)  # ['apple', 'apricot']
\`\`\`

## If-Else in List Comprehension

Use if-else for conditional expressions.

\`\`\`python
# Label numbers as even or odd
numbers = [1, 2, 3, 4, 5]
labels = ["even" if n % 2 == 0 else "odd" for n in numbers]
print(labels)  # ['odd', 'even', 'odd', 'even', 'odd']

# Double even numbers, keep odd numbers as is
numbers = [1, 2, 3, 4, 5, 6]
result = [n * 2 if n % 2 == 0 else n for n in numbers]
print(result)  # [1, 4, 3, 8, 5, 12]
\`\`\`

## Nested List Comprehension

Create multi-dimensional lists.

\`\`\`python
# 3x3 matrix filled with zeros
matrix = [[0 for j in range(3)] for i in range(3)]
print(matrix)
# [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

# Multiplication table
table = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(table)
# [[1, 2, 3], [2, 4, 6], [3, 6, 9]]
\`\`\`

## Flatten a Nested List

\`\`\`python
# Flatten 2D list to 1D
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in matrix for num in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
\`\`\`

## Performance Benefits

List comprehensions are often faster than traditional loops because they're optimized at the C level in Python.

\`\`\`python
# List comprehension (faster)
squares = [i ** 2 for i in range(1000)]

# Traditional loop (slower)
squares = []
for i in range(1000):
    squares.append(i ** 2)
\`\`\`

## When to Use List Comprehension

✅ **Use when:**
- Creating a new list from an existing sequence
- The logic is simple and fits on one line
- You want more readable, Pythonic code

❌ **Avoid when:**
- The logic is complex and hard to read
- You're not creating a list (use generator expressions instead)
- You need to handle errors for each item
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What will be the output of the following code?\n\n```python\nnumbers = [1, 2, 3, 4, 5]\nresult = [x * 2 for x in numbers if x > 2]\nprint(result)\n```",
              options: [
                "[6, 8, 10]",
                "[2, 4, 6, 8, 10]",
                "[3, 4, 5]",
                "[4, 6, 8, 10]"
              ],
              correctAnswer: 0,
              explanation: "The list comprehension filters numbers greater than 2 (which are 3, 4, 5) and then multiplies each by 2. So: 3*2=6, 4*2=8, 5*2=10, resulting in [6, 8, 10]."
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to create a list [1, 2, 3, 4, 5] using range:",
              blocks: ["list(", "range(", "1,", "6", "))"],
              correctOrder: ["list(", "range(", "1,", "6", "))"],
              explanation: "The list() function converts a range object to a list: list(range(1, 6)) creates [1, 2, 3, 4, 5]"
            }
          ]
        },
        practice: {
          description: `
## Exercise: Filter and Transform Numbers

**Task**: 
Given a list of numbers, use list comprehension to create a new list containing only the even numbers, and square each of them.

Given: \`numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\`

**Hints**:
- Use list comprehension: \`[expression for item in list if condition]\`
- Check if number is even: \`n % 2 == 0\`
- Square a number: \`n ** 2\`
- The expression should be \`n ** 2\` and condition should be \`n % 2 == 0\`
          `,
          starterCode: `# Given list
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Use list comprehension to get squared even numbers
squared_evens = 

# Print the result
print(squared_evens)
`,
          solution: `# Given list
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Use list comprehension to get squared even numbers
squared_evens = [n ** 2 for n in numbers if n % 2 == 0]

# Print the result
print(squared_evens)`,
          expectedOutput: "[4, 16, 36, 64, 100]"
        }
      }
    }
  ]
};
