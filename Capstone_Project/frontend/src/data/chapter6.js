// Chapter 6: Dictionaries, Tuples, and Sets
export const chapter6 = {
  id: 6,
  title: "Chapter 6: Dictionaries, Tuples, and Sets",
  subsections: [
    {
      id: "6.1",
      title: "6.1 Dictionary",
      videoUrl: "https://youtu.be/zMLTlMFFqPA",
      content: {
        lecture: `
# Dictionary

A dictionary is a collection of key-value pairs. Each key is unique and maps to a value.

## Creating Dictionaries

Dictionaries are created using curly braces \`{}\` with key-value pairs.

\`\`\`python
# Empty dictionary
empty_dict = {}

# Dictionary with initial values
student = {
    "name": "Alice",
    "age": 20,
    "grade": "A"
}

# Dictionary with different value types
mixed = {
    "name": "Bob",
    "age": 25,
    "grades": [85, 90, 95],
    "active": True
}
\`\`\`

## Accessing Values

Use keys to access values.

\`\`\`python
student = {"name": "Alice", "age": 20, "grade": "A"}

# Access using square brackets
print(student["name"])  # Alice
print(student["age"])   # 20

# Access using get() method (safer)
print(student.get("name"))   # Alice
print(student.get("email"))  # None (no error)
print(student.get("email", "Not found"))  # Not found
\`\`\`

### get() vs [] Access

\`\`\`python
student = {"name": "Alice"}

# Using [] - raises KeyError if key doesn't exist
# print(student["age"])  # KeyError!

# Using get() - returns None or default value
print(student.get("age"))        # None
print(student.get("age", 18))    # 18 (default value)
\`\`\`

## Adding and Modifying Values

\`\`\`python
student = {"name": "Alice", "age": 20}

# Add new key-value pair
student["grade"] = "A"
print(student)  # {'name': 'Alice', 'age': 20, 'grade': 'A'}

# Modify existing value
student["age"] = 21
print(student)  # {'name': 'Alice', 'age': 21, 'grade': 'A'}
\`\`\`

## Removing Items

### del Statement
\`\`\`python
student = {"name": "Alice", "age": 20, "grade": "A"}

del student["grade"]
print(student)  # {'name': 'Alice', 'age': 20}
\`\`\`

### pop() Method
Remove and return the value.
\`\`\`python
student = {"name": "Alice", "age": 20, "grade": "A"}

grade = student.pop("grade")
print(grade)    # A
print(student)  # {'name': 'Alice', 'age': 20}

# pop with default value (no error if key doesn't exist)
email = student.pop("email", "N/A")
print(email)  # N/A
\`\`\`

### clear() Method
Remove all items.
\`\`\`python
student = {"name": "Alice", "age": 20}
student.clear()
print(student)  # {}
\`\`\`

## Dictionary Methods

### keys() - Get All Keys
\`\`\`python
student = {"name": "Alice", "age": 20, "grade": "A"}
keys = student.keys()
print(list(keys))  # ['name', 'age', 'grade']
\`\`\`

### values() - Get All Values
\`\`\`python
student = {"name": "Alice", "age": 20, "grade": "A"}
values = student.values()
print(list(values))  # ['Alice', 20, 'A']
\`\`\`

### items() - Get All Key-Value Pairs
\`\`\`python
student = {"name": "Alice", "age": 20, "grade": "A"}
items = student.items()
print(list(items))  
# [('name', 'Alice'), ('age', 20), ('grade', 'A')]
\`\`\`

## Checking for Keys

\`\`\`python
student = {"name": "Alice", "age": 20}

# Check if key exists
print("name" in student)   # True
print("email" in student)  # False
print("email" not in student)  # True
\`\`\`

## Iterating Through Dictionaries

### Iterate Over Keys
\`\`\`python
student = {"name": "Alice", "age": 20, "grade": "A"}

for key in student:
    print(key)
# Output: name, age, grade
\`\`\`

### Iterate Over Values
\`\`\`python
for value in student.values():
    print(value)
# Output: Alice, 20, A
\`\`\`

### Iterate Over Key-Value Pairs
\`\`\`python
for key, value in student.items():
    print(f"{key}: {value}")
# Output:
# name: Alice
# age: 20
# grade: A
\`\`\`

## Dictionary Length

\`\`\`python
student = {"name": "Alice", "age": 20, "grade": "A"}
print(len(student))  # 3
\`\`\`

## Nested Dictionaries

\`\`\`python
students = {
    "student1": {"name": "Alice", "age": 20},
    "student2": {"name": "Bob", "age": 22}
}

print(students["student1"]["name"])  # Alice
print(students["student2"]["age"])   # 22
\`\`\`

## Dictionary Comprehension

\`\`\`python
# Create dictionary from lists
keys = ["a", "b", "c"]
values = [1, 2, 3]
my_dict = {k: v for k, v in zip(keys, values)}
print(my_dict)  # {'a': 1, 'b': 2, 'c': 3}

# Square numbers dictionary
squares = {x: x**2 for x in range(1, 6)}
print(squares)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
\`\`\`
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What will be the output of the following code?\n\n```python\ndata = {'a': 1, 'b': 2, 'c': 3}\ndata['b'] = 5\ndata['d'] = 4\nprint(len(data))\n```",
              options: [
                "4",
                "3",
                "5",
                "Error"
              ],
              correctAnswer: 0,
              explanation: "Initially, the dictionary has 3 items. Modifying data['b'] doesn't change the count. Adding data['d'] increases the count to 4. So len(data) returns 4."
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to access the value of key 'name' from the student dictionary:",
              blocks: ["student", "[", "'name'", "]"],
              correctOrder: ["student", "[", "'name'", "]"],
              explanation: "Dictionary values are accessed using square brackets with the key: dictionary[key]"
            }
          ]
        },
        practice: {
          description: `
## Exercise: Student Grade Management

**Task**: 
Create a dictionary to store student information and perform operations:
1. Start with: \`student = {"name": "John", "age": 20}\`
2. Add a new key "grade" with value "B"
3. Change the age to 21
4. Print the value of "grade" using get()
5. Print the number of keys in the dictionary

**Hints**:
- Use \`student["key"] = value\` to add or modify
- Use \`student.get("key")\` to retrieve values
- Use \`len(student)\` to get the number of keys
          `,
          starterCode: `# Initial dictionary
student = {"name": "John", "age": 20}

# Add grade


# Change age


# Print grade using get()


# Print number of keys

`,
          solution: `# Initial dictionary
student = {"name": "John", "age": 20}

# Add grade
student["grade"] = "B"

# Change age
student["age"] = 21

# Print grade using get()
print(student.get("grade"))

# Print number of keys
print(len(student))`,
          expectedOutput: "B\n3"
        }
      }
    },
    {
      id: "6.2",
      title: "6.2 Tuple",
      videoUrl: "https://youtu.be/v-KY0GMuLHo",
      content: {
        lecture: `
# Tuple

A tuple is an immutable sequence of values. Once created, tuples cannot be modified.

## Creating Tuples

Tuples are created using parentheses \`()\`.

\`\`\`python
# Empty tuple
empty_tuple = ()

# Tuple with values
numbers = (1, 2, 3, 4, 5)

# Tuple with mixed types
mixed = (1, "hello", 3.14, True)

# Single element tuple (note the comma!)
single = (5,)  # Comma is required
not_tuple = (5)  # This is just an integer!

# Tuple without parentheses (tuple packing)
coordinates = 10, 20, 30
print(coordinates)  # (10, 20, 30)
\`\`\`

## Accessing Tuple Elements

Access elements just like lists.

\`\`\`python
fruits = ("apple", "banana", "cherry", "date")

print(fruits[0])   # apple
print(fruits[2])   # cherry
print(fruits[-1])  # date
print(fruits[1:3]) # ('banana', 'cherry')
\`\`\`

## Why Use Tuples?

### 1. Immutability
Tuples cannot be modified after creation.

\`\`\`python
numbers = (1, 2, 3)
# numbers[0] = 10  # This would cause an error!
\`\`\`

### 2. Faster Than Lists
Tuples are more memory-efficient and faster to access.

### 3. Safe for Dictionary Keys
Tuples can be used as dictionary keys (lists cannot).

\`\`\`python
# Using tuple as key
locations = {
    (40.7128, -74.0060): "New York",
    (51.5074, -0.1278): "London"
}
print(locations[(40.7128, -74.0060)])  # New York
\`\`\`

### 4. Function Return Multiple Values
Functions often return multiple values as tuples.

\`\`\`python
def get_coordinates():
    return 10, 20  # Returns a tuple

x, y = get_coordinates()
print(x, y)  # 10 20
\`\`\`

## Tuple Operations

### Concatenation
\`\`\`python
tuple1 = (1, 2, 3)
tuple2 = (4, 5, 6)
combined = tuple1 + tuple2
print(combined)  # (1, 2, 3, 4, 5, 6)
\`\`\`

### Repetition
\`\`\`python
numbers = (1, 2)
repeated = numbers * 3
print(repeated)  # (1, 2, 1, 2, 1, 2)
\`\`\`

### Membership
\`\`\`python
fruits = ("apple", "banana", "cherry")
print("apple" in fruits)   # True
print("orange" in fruits)  # False
\`\`\`

## Tuple Methods

Tuples have only 2 methods (because they're immutable).

### count() - Count Occurrences
\`\`\`python
numbers = (1, 2, 2, 3, 2, 4)
count = numbers.count(2)
print(count)  # 3
\`\`\`

### index() - Find Position
\`\`\`python
fruits = ("apple", "banana", "cherry")
position = fruits.index("banana")
print(position)  # 1
\`\`\`

## Tuple Unpacking

Assign tuple values to multiple variables.

\`\`\`python
# Basic unpacking
point = (3, 4)
x, y = point
print(x, y)  # 3 4

# Unpacking with multiple values
person = ("Alice", 25, "Engineer")
name, age, job = person
print(name)  # Alice
print(age)   # 25
print(job)   # Engineer
\`\`\`

### Using * for Remaining Elements
\`\`\`python
numbers = (1, 2, 3, 4, 5)
first, *middle, last = numbers
print(first)   # 1
print(middle)  # [2, 3, 4]
print(last)    # 5
\`\`\`

## Swapping Values

\`\`\`python
a = 5
b = 10

# Traditional swap (requires temporary variable)
temp = a
a = b
b = temp

# Python swap (using tuple unpacking)
a, b = b, a
print(a, b)  # 10 5
\`\`\`

## Converting Between Tuples and Lists

\`\`\`python
# List to tuple
my_list = [1, 2, 3]
my_tuple = tuple(my_list)
print(my_tuple)  # (1, 2, 3)

# Tuple to list
my_tuple = (4, 5, 6)
my_list = list(my_tuple)
print(my_list)  # [4, 5, 6]
\`\`\`

## Nested Tuples

\`\`\`python
nested = ((1, 2), (3, 4), (5, 6))
print(nested[0])     # (1, 2)
print(nested[1][0])  # 3
\`\`\`

## When to Use Tuples vs Lists

**Use Tuples when:**
- Data should not change (immutable)
- Using as dictionary keys
- Returning multiple values from functions
- Need better performance

**Use Lists when:**
- Data needs to be modified
- Need to add/remove elements
- Using list methods like append(), remove(), etc.
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What will be the output of the following code?\n\n```python\ndata = (1, 2, 3, 4, 5)\nfirst, *middle, last = data\nprint(len(middle))\n```",
              options: [
                "3",
                "2",
                "4",
                "5"
              ],
              correctAnswer: 0,
              explanation: "The unpacking assigns first=1, last=5, and middle gets the remaining elements [2, 3, 4]. The length of middle is 3."
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to create a tuple with values 10, 20, 30:",
              blocks: ["point", "=", "(", "10,", "20,", "30", ")"],
              correctOrder: ["point", "=", "(", "10,", "20,", "30", ")"],
              explanation: "Tuples are created using parentheses with comma-separated values: (value1, value2, value3)"
            }
          ]
        },
        practice: {
          description: `
## Exercise: Work with Coordinates

**Task**: 
Work with a tuple representing coordinates:
1. Create a tuple: \`point = (10, 20, 30)\`
2. Unpack it into three variables: x, y, z
3. Calculate the sum of all coordinates
4. Print the sum

**Hints**:
- Use tuple unpacking: \`x, y, z = point\`
- Calculate sum: \`x + y + z\`
- Print the result
          `,
          starterCode: `# Create tuple
point = (10, 20, 30)

# Unpack into variables


# Calculate sum


# Print result

`,
          solution: `# Create tuple
point = (10, 20, 30)

# Unpack into variables
x, y, z = point

# Calculate sum
total = x + y + z

# Print result
print(total)`,
          expectedOutput: "60"
        }
      }
    },
    {
      id: "6.3",
      title: "6.3 Set",
      videoUrl: "https://youtu.be/IUyWyMCqnOA",
      content: {
        lecture: `
# Set

A set is an unordered collection of unique elements. Sets automatically remove duplicates.

## Creating Sets

Sets are created using curly braces \`{}\` or the \`set()\` function.

\`\`\`python
# Set with values
numbers = {1, 2, 3, 4, 5}

# Create from list (removes duplicates)
my_list = [1, 2, 2, 3, 3, 3]
unique = set(my_list)
print(unique)  # {1, 2, 3}

# Empty set (must use set(), not {})
empty_set = set()  # Correct
empty_dict = {}    # This is a dictionary!
\`\`\`

## Key Characteristics

### 1. No Duplicates
\`\`\`python
numbers = {1, 2, 2, 3, 3, 3}
print(numbers)  # {1, 2, 3}
\`\`\`

### 2. Unordered
Sets don't maintain order.
\`\`\`python
my_set = {3, 1, 4, 1, 5}
print(my_set)  # Order may vary: {1, 3, 4, 5}
\`\`\`

### 3. Mutable
You can add and remove elements.

## Adding Elements

### add() - Add Single Element
\`\`\`python
fruits = {"apple", "banana"}
fruits.add("cherry")
print(fruits)  # {'apple', 'banana', 'cherry'}

# Adding duplicate has no effect
fruits.add("apple")
print(fruits)  # {'apple', 'banana', 'cherry'}
\`\`\`

### update() - Add Multiple Elements
\`\`\`python
fruits = {"apple", "banana"}
fruits.update(["cherry", "date", "apple"])
print(fruits)  # {'apple', 'banana', 'cherry', 'date'}
\`\`\`

## Removing Elements

### remove() - Remove Element (raises error if not found)
\`\`\`python
fruits = {"apple", "banana", "cherry"}
fruits.remove("banana")
print(fruits)  # {'apple', 'cherry'}

# fruits.remove("orange")  # KeyError!
\`\`\`

### discard() - Remove Element (no error if not found)
\`\`\`python
fruits = {"apple", "banana", "cherry"}
fruits.discard("banana")
fruits.discard("orange")  # No error
print(fruits)  # {'apple', 'cherry'}
\`\`\`

### pop() - Remove and Return Random Element
\`\`\`python
numbers = {1, 2, 3, 4, 5}
item = numbers.pop()
print(item)     # Random element
print(numbers)  # Remaining elements
\`\`\`

### clear() - Remove All Elements
\`\`\`python
numbers = {1, 2, 3}
numbers.clear()
print(numbers)  # set()
\`\`\`

## Set Operations

### Union - Combine Sets (|)
Elements in either set.
\`\`\`python
set1 = {1, 2, 3}
set2 = {3, 4, 5}

# Using | operator
union = set1 | set2
print(union)  # {1, 2, 3, 4, 5}

# Using union() method
union = set1.union(set2)
print(union)  # {1, 2, 3, 4, 5}
\`\`\`

### Intersection - Common Elements (&)
Elements in both sets.
\`\`\`python
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

# Using & operator
intersection = set1 & set2
print(intersection)  # {3, 4}

# Using intersection() method
intersection = set1.intersection(set2)
print(intersection)  # {3, 4}
\`\`\`

### Difference - Elements Only in First Set (-)
\`\`\`python
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

# Using - operator
difference = set1 - set2
print(difference)  # {1, 2}

# Using difference() method
difference = set1.difference(set2)
print(difference)  # {1, 2}
\`\`\`

### Symmetric Difference - Elements in Either but Not Both (^)
\`\`\`python
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

# Using ^ operator
sym_diff = set1 ^ set2
print(sym_diff)  # {1, 2, 5, 6}

# Using symmetric_difference() method
sym_diff = set1.symmetric_difference(set2)
print(sym_diff)  # {1, 2, 5, 6}
\`\`\`

## Set Comparison

### Subset - Check if One Set is Contained in Another
\`\`\`python
set1 = {1, 2, 3}
set2 = {1, 2, 3, 4, 5}

print(set1.issubset(set2))    # True
print(set1 <= set2)           # True
\`\`\`

### Superset - Check if One Set Contains Another
\`\`\`python
set1 = {1, 2, 3, 4, 5}
set2 = {1, 2, 3}

print(set1.issuperset(set2))  # True
print(set1 >= set2)           # True
\`\`\`

### Disjoint - Check if Sets Have No Common Elements
\`\`\`python
set1 = {1, 2, 3}
set2 = {4, 5, 6}

print(set1.isdisjoint(set2))  # True
\`\`\`

## Membership Testing

\`\`\`python
fruits = {"apple", "banana", "cherry"}

print("apple" in fruits)   # True
print("orange" in fruits)  # False
\`\`\`

## Iterating Over Sets

\`\`\`python
fruits = {"apple", "banana", "cherry"}

for fruit in fruits:
    print(fruit)
# Note: Order is not guaranteed
\`\`\`

## Set Comprehension

\`\`\`python
# Square of even numbers
squares = {x**2 for x in range(10) if x % 2 == 0}
print(squares)  # {0, 4, 16, 36, 64}
\`\`\`

## Practical Use Cases

### Remove Duplicates from List
\`\`\`python
numbers = [1, 2, 2, 3, 3, 3, 4, 5, 5]
unique_numbers = list(set(numbers))
print(unique_numbers)  # [1, 2, 3, 4, 5]
\`\`\`

### Find Common Elements
\`\`\`python
list1 = [1, 2, 3, 4, 5]
list2 = [4, 5, 6, 7, 8]
common = set(list1) & set(list2)
print(common)  # {4, 5}
\`\`\`

### Check for Unique Elements
\`\`\`python
def has_duplicates(items):
    return len(items) != len(set(items))

numbers = [1, 2, 3, 4, 5]
print(has_duplicates(numbers))  # False

numbers = [1, 2, 2, 3, 4]
print(has_duplicates(numbers))  # True
\`\`\`
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What will be the output of the following code?\n\n```python\nset1 = {1, 2, 3, 4}\nset2 = {3, 4, 5, 6}\nresult = set1 & set2\nprint(len(result))\n```",
              options: [
                "2",
                "4",
                "6",
                "8"
              ],
              correctAnswer: 0,
              explanation: "The & operator performs intersection, finding common elements. set1 and set2 both contain 3 and 4, so result = {3, 4}. The length is 2."
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to add the element 'apple' to the fruits set:",
              blocks: ["fruits", ".", "add", "(", "'apple'", ")"],
              correctOrder: ["fruits", ".", "add", "(", "'apple'", ")"],
              explanation: "The add() method adds a single element to a set: set.add(element)"
            }
          ]
        },
        practice: {
          description: `
## Exercise: Remove Duplicates and Find Common

**Task**: 
Work with two lists to remove duplicates and find common elements:
1. Given: \`list1 = [1, 2, 2, 3, 4, 4, 5]\`
2. Given: \`list2 = [4, 5, 5, 6, 7, 8]\`
3. Convert both to sets to remove duplicates
4. Find the intersection (common elements)
5. Print the result as a sorted list

**Hints**:
- Use \`set()\` to convert list to set
- Use \`&\` operator for intersection
- Use \`sorted()\` to sort the result
- Convert back to list if needed
          `,
          starterCode: `# Given lists
list1 = [1, 2, 2, 3, 4, 4, 5]
list2 = [4, 5, 5, 6, 7, 8]

# Convert to sets


# Find intersection


# Print as sorted list

`,
          solution: `# Given lists
list1 = [1, 2, 2, 3, 4, 4, 5]
list2 = [4, 5, 5, 6, 7, 8]

# Convert to sets
set1 = set(list1)
set2 = set(list2)

# Find intersection
common = set1 & set2

# Print as sorted list
print(sorted(common))`,
          expectedOutput: "[4, 5]"
        }
      }
    }
  ]
};
