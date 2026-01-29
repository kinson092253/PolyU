// Chapter 10: File Operations
export const chapter10 = {
  id: 10,
  title: "Chapter 10: File Operations",
  subsections: [
    {
      id: "10.1",
      title: "10.1 Reading and Writing Text Files",
      content: {
        lecture: `
# Reading and Writing Text Files

File operations allow programs to read data from files and write data to files, making data persistent.

## Why Use Files?

1. **Persistence** - Data survives after program ends
2. **Large Data** - Handle data too big for memory
3. **Sharing** - Exchange data between programs
4. **Configuration** - Store settings and preferences

## Opening Files

Use the \`open()\` function to open files.

\`\`\`python
file = open("filename.txt", "mode")
# Always close the file when done
file.close()
\`\`\`

### File Modes

- \`r\` Read (default) - File must exist
- \`w\` Write - Creates new or overwrites existing
- \`a\` Append - Adds to end of file
- \`x\` Exclusive create - Fails if file exists
- \`r+\` Read and write

## Reading Files

### Read Entire File

\`\`\`python
# Open and read file
file = open("data.txt", "r")
content = file.read()
print(content)
file.close()
\`\`\`

### Read Line by Line

\`\`\`python
file = open("data.txt", "r")
for line in file:
    print(line.strip())  # strip() removes newline characters
file.close()
\`\`\`

### Read Specific Number of Characters

\`\`\`python
file = open("data.txt", "r")
first_10_chars = file.read(10)  # Read first 10 characters
print(first_10_chars)
file.close()
\`\`\`

### Read Lines into a List

\`\`\`python
file = open("data.txt", "r")
lines = file.readlines()  # Returns list of lines
print(lines)
file.close()
\`\`\`

### Read One Line at a Time

\`\`\`python
file = open("data.txt", "r")
line1 = file.readline()
line2 = file.readline()
print(line1)
print(line2)
file.close()
\`\`\`

## Writing to Files

### Write String to File

\`\`\`python
file = open("output.txt", "w")
file.write("Hello, World!\\n")
file.write("This is a new line.\\n")
file.close()
\`\`\`

⚠️ **Warning**: Mode \`'w'\` will overwrite existing files!

### Write Multiple Lines

\`\`\`python
lines = ["Line 1\\n", "Line 2\\n", "Line 3\\n"]

file = open("output.txt", "w")
file.writelines(lines)
file.close()
\`\`\`

## Appending to Files

\`\`\`python
# Append mode adds to end without deleting existing content
file = open("log.txt", "a")
file.write("New log entry\\n")
file.close()
\`\`\`

## The with Statement (Best Practice)

The \`with\` statement automatically closes files, even if errors occur.

\`\`\`python
# Reading with 'with'
with open("data.txt", "r") as file:
    content = file.read()
    print(content)
# File automatically closed here

# Writing with 'with'
with open("output.txt", "w") as file:
    file.write("Hello, World!\\n")
# File automatically closed here
\`\`\`

✅ **Best Practice**: Always use \`with\` statement!

## File Path Examples

\`\`\`python
# Relative path (same directory)
with open("data.txt", "r") as file:
    content = file.read()
\`\`\`

## Practical Example: Writing and Reading

\`\`\`python
# Write data to file
with open("students.txt", "w") as file:
    file.write("Alice,85\\n")
    file.write("Bob,92\\n")
    file.write("Charlie,78\\n")

# Read data from file
with open("students.txt", "r") as file:
    for line in file:
        name, score = line.strip().split(",")
        print(f"{name}: {score}")

# Output:
# Alice: 85
# Bob: 92
# Charlie: 78
\`\`\`

## Example: Counting Words in File

\`\`\`python
with open("essay.txt", "r") as file:
    content = file.read()
    words = content.split()
    word_count = len(words)
    print(f"Word count: {word_count}")
\`\`\`

## Example: Filtering Lines

\`\`\`python
# Read file and write only lines containing "error"
with open("log.txt", "r") as infile:
    with open("errors.txt", "w") as outfile:
        for line in infile:
            if "error" in line.lower():
                outfile.write(line)
\`\`\`

## File Positions

\`\`\`python
with open("data.txt", "r") as file:
    print(file.tell())      # Get current position (0)
    content = file.read(5)  # Read 5 characters
    print(file.tell())      # Position is now 5
    file.seek(0)            # Go back to beginning
    print(file.tell())      # Position is 0 again
\`\`\`
        `,
        test: {
          question: "What does the 'w' mode do when opening a file?\n\n```python\nwith open('data.txt', 'w') as file:\n    file.write('Hello')\n```",
          options: [
            "Reads the file",
            "Appends to the end of the file",
            "Creates new file or overwrites existing file",
            "Raises an error if file doesn't exist"
          ],
          correctAnswer: 2,
          explanation: "Mode 'w' (write) creates a new file if it doesn't exist, or completely overwrites the existing file if it does exist."
        },
        practice: {
          description: `
## Exercise: Real File Operations

**Task**: 
Now you can work with real files! Let's practice file reading and writing:

1. **Create a file first**:
   - Click the "File Manager" below the code editor (click ▶ to expand)
   - Click ➕ to create a new file named \`data.txt\`
   - Add some initial content (press Enter for new lines):
     - Hello World
     - Python Programming
     - File Operations
   - Or upload a text file from your computer

2. **Write Python code** to:
   - Open the file \`data.txt\` in read mode
   - Read all content using \`.read()\`
   - Print the content
   - Close the file (or use \`with\` statement)

3. **Modify the file**:
   - Write code to append a new line to the file
   - Read and print the updated content

**💡 Tips**:
- Use \`with open("data.txt", "r") as file:\` for reading
- Use \`with open("data.txt", "a") as file:\` for appending
- The File Manager stores files in the database
- Your code runs on the backend with real file access!
          `,
          starterCode: `# Step 1: Read the file
# Make sure you created data.txt in File Manager first!


# Step 2: Append a new line to the file


# Step 3: Read the file again to see the changes
`,
          solution: `# Step 1: Read the file
with open("data.txt", "r") as file:
    content = file.read()
    print("Original content:")
    print(content)
    print("---")

# Step 2: Append a new line to the file
with open("data.txt", "a") as file:
    file.write("\\nNew line added!")

# Step 3: Read the file again to see the changes
with open("data.txt", "r") as file:
    content = file.read()
    print("\\nUpdated content:")
    print(content)`,
          expectedOutput: "Original content:\nHello World\nPython Programming\nFile Operations\n---\n\nUpdated content:\nHello World\nPython Programming\nFile Operations\nNew line added!"
        }
      }
    },
    {
      id: "10.2",
      title: "10.2 CSV and JSON Processing",
      content: {
        lecture: `
# CSV and JSON Processing

CSV (Comma-Separated Values) and JSON (JavaScript Object Notation) are popular formats for storing structured data.

## CSV Files

CSV files store tabular data with commas separating values.

### Example CSV File

\`\`\`
name,age,city
Alice,25,New York
Bob,30,Los Angeles
Charlie,28,Chicago
\`\`\`

## Reading CSV Files

### Using csv Module

\`\`\`python
import csv

with open("data.csv", "r") as file:
    csv_reader = csv.reader(file)
    for row in csv_reader:
        print(row)

# Output:
# ['name', 'age', 'city']
# ['Alice', '25', 'New York']
# ['Bob', '30', 'Los Angeles']
# ['Charlie', '28', 'Chicago']
\`\`\`

### Reading CSV with Headers

\`\`\`python
import csv

with open("data.csv", "r") as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        print(f"{row['name']} is {row['age']} years old")

# Output:
# Alice is 25 years old
# Bob is 30 years old
# Charlie is 28 years old
\`\`\`

## Writing CSV Files

### Basic CSV Writing

\`\`\`python
import csv

data = [
    ["name", "age", "city"],
    ["Alice", 25, "New York"],
    ["Bob", 30, "Los Angeles"]
]

with open("output.csv", "w", newline='') as file:
    csv_writer = csv.writer(file)
    csv_writer.writerows(data)
\`\`\`

### Writing CSV with DictWriter

\`\`\`python
import csv

data = [
    {"name": "Alice", "age": 25, "city": "New York"},
    {"name": "Bob", "age": 30, "city": "Los Angeles"}
]

with open("output.csv", "w", newline='') as file:
    fieldnames = ["name", "age", "city"]
    csv_writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    csv_writer.writeheader()
    csv_writer.writerows(data)
\`\`\`

## JSON Files

JSON stores data in key-value pairs, similar to Python dictionaries.

### Example JSON File

\`\`\`json
{
    "name": "Alice",
    "age": 25,
    "city": "New York",
    "skills": ["Python", "JavaScript", "SQL"]
}
\`\`\`

## Reading JSON Files

\`\`\`python
import json

with open("data.json", "r") as file:
    data = json.load(file)
    print(data)
    print(f"Name: {data['name']}")
    print(f"Age: {data['age']}")
    print(f"Skills: {', '.join(data['skills'])}")
\`\`\`

## Writing JSON Files

\`\`\`python
import json

data = {
    "name": "Alice",
    "age": 25,
    "city": "New York",
    "skills": ["Python", "JavaScript", "SQL"]
}

with open("output.json", "w") as file:
    json.dump(data, file, indent=4)
\`\`\`

The \`indent=4\` parameter makes the JSON file more readable.

## JSON String Conversion

### Python to JSON String

\`\`\`python
import json

data = {"name": "Alice", "age": 25}
json_string = json.dumps(data)
print(json_string)  # {"name": "Alice", "age": 25}
print(type(json_string))  # <class 'str'>
\`\`\`

### JSON String to Python

\`\`\`python
import json

json_string = '{"name": "Alice", "age": 25}'
data = json.loads(json_string)
print(data)  # {'name': 'Alice', 'age': 25}
print(type(data))  # <class 'dict'>
\`\`\`

## Python to JSON Type Conversion

| Python | JSON |
|--------|------|
| dict | object |
| list, tuple | array |
| str | string |
| int, float | number |
| True | true |
| False | false |
| None | null |

## Working with Complex JSON

\`\`\`python
import json

data = {
    "students": [
        {"name": "Alice", "grade": 85},
        {"name": "Bob", "grade": 92},
        {"name": "Charlie", "grade": 78}
    ],
    "class": "Python 101",
    "semester": "Fall 2024"
}

# Write to file
with open("class.json", "w") as file:
    json.dump(data, file, indent=2)

# Read from file
with open("class.json", "r") as file:
    loaded_data = json.load(file)
    print(f"Class: {loaded_data['class']}")
    for student in loaded_data['students']:
        print(f"{student['name']}: {student['grade']}")
\`\`\`

## CSV vs JSON

### When to Use CSV

✅ Simple tabular data  
✅ All rows have same structure  
✅ Spreadsheet compatibility  
✅ Smaller file size  

### When to Use JSON

✅ Nested/hierarchical data  
✅ Mixed data types  
✅ Web API communication  
✅ More flexible structure  

## Practical Example: Student Records

\`\`\`python
import json

# Create student data
students = [
    {
        "id": 1,
        "name": "Alice",
        "grades": {"math": 85, "science": 90, "english": 88}
    },
    {
        "id": 2,
        "name": "Bob",
        "grades": {"math": 92, "science": 87, "english": 91}
    }
]

# Save to JSON
with open("students.json", "w") as file:
    json.dump(students, file, indent=2)

# Load from JSON
with open("students.json", "r") as file:
    loaded_students = json.load(file)
    
    for student in loaded_students:
        name = student["name"]
        avg_grade = sum(student["grades"].values()) / len(student["grades"])
        print(f"{name}: Average grade = {avg_grade:.1f}")

# Output:
# Alice: Average grade = 87.7
# Bob: Average grade = 90.0
\`\`\`

## Practical Example: CSV Processing

\`\`\`python
import csv

# Read CSV and calculate statistics
total_age = 0
count = 0

with open("people.csv", "r") as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        total_age += int(row["age"])
        count += 1

average_age = total_age / count
print(f"Average age: {average_age:.1f}")
\`\`\`

## Pretty Printing JSON

\`\`\`python
import json

data = {"name": "Alice", "age": 25, "skills": ["Python", "SQL"]}

# Compact (one line)
print(json.dumps(data))
# {"name": "Alice", "age": 25, "skills": ["Python", "SQL"]}

# Pretty (formatted)
print(json.dumps(data, indent=2))
# {
#   "name": "Alice",
#   "age": 25,
#   "skills": [
#     "Python",
#     "SQL"
#   ]
# }

# Sorted keys
print(json.dumps(data, indent=2, sort_keys=True))
\`\`\`

## Handling Special Characters in CSV

\`\`\`python
import csv

# Data with commas and quotes
data = [
    ["name", "description"],
    ["Product A", "High quality, durable"],
    ["Product B", 'Says "excellent"']
]

with open("products.csv", "w", newline='') as file:
    csv_writer = csv.writer(file)
    csv_writer.writerows(data)

# CSV automatically handles quoting
\`\`\`
        `,
        test: {
          question: "What is the result of the following code?\n\n```python\nimport json\n\ndata = {'name': 'Alice', 'age': 25}\njson_string = json.dumps(data)\nprint(type(json_string))\n```",
          options: [
            "<class 'dict'>",
            "<class 'str'>",
            "<class 'json'>",
            "<class 'list'>"
          ],
          correctAnswer: 1,
          explanation: "json.dumps() converts a Python dictionary to a JSON-formatted string, so the type is 'str'."
        },
        practice: {
          description: `
## Exercise: Working with JSON Files

**Task**: 
Now you can work with real JSON files! Let's practice JSON file operations:

1. **Create a JSON file first**:
   - Click the File Manager below (expand with ▶)
   - Click ➕ to create a file named \`book.json\`
   - Add this content:
     - {"title": "Python Basics", "author": "Jane Smith", "year": 2023, "pages": 250}
   - Or upload a JSON file from your computer

2. **Write Python code** to:
   - Import the \`json\` module
   - Open and read the JSON file
   - Load the JSON data into a Python dictionary
   - Print the book title
   - Modify the year to 2024
   - Save the updated data back to the file

3. **Bonus**: 
   - Read the file again and print all book information

**💡 Tips**:
- Use \`import json\`
- Use \`json.load(file)\` to read JSON from file
- Use \`json.dump(data, file, indent=2)\` to write JSON to file
- Remember to use \`with open()\` statements
- File operations will run on the backend!
          `,
          starterCode: `# Step 1: Import json module and read the JSON file


# Step 2: Print the title


# Step 3: Modify the year to 2024 and save back to file


# Step 4: Read the file again and print all information
`,
          solution: `# Step 1: Import json module and read the JSON file
import json

with open("book.json", "r") as file:
    book = json.load(file)

# Step 2: Print the title
print(f"Title: {book['title']}")

# Step 3: Modify the year to 2024 and save back to file
book['year'] = 2024

with open("book.json", "w") as file:
    json.dump(book, file, indent=2)

# Step 4: Read the file again and print all information
with open("book.json", "r") as file:
    updated_book = json.load(file)
    print(f"Updated book: {updated_book}")`,
          expectedOutput: "Title: Python Basics\nUpdated book: {'title': 'Python Basics', 'author': 'Jane Smith', 'year': 2024, 'pages': 250}"
        }
      }
    },
    {
      id: "10.3",
      title: "10.3 Exception Handling (try-except)",
      content: {
        lecture: `
# Exception Handling (try-except)

Exception handling allows programs to handle errors gracefully instead of crashing.

## What are Exceptions?

Exceptions are errors that occur during program execution. Without handling, they cause the program to stop.

### Common Exceptions

| Exception | Cause |
|-----------|-------|
| \`ValueError\` | Invalid value |
| \`TypeError\` | Wrong type |
| \`ZeroDivisionError\` | Division by zero |
| \`FileNotFoundError\` | File doesn't exist |
| \`IndexError\` | Invalid index |
| \`KeyError\` | Invalid dictionary key |
| \`AttributeError\` | Invalid attribute |

## Basic try-except

\`\`\`python
try:
    # Code that might raise an exception
    result = 10 / 0
except:
    # Code to handle the exception
    print("An error occurred")

# Program continues
print("Program still running")
\`\`\`

## Catching Specific Exceptions

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Output: Cannot divide by zero!
\`\`\`

## Multiple Exception Types

\`\`\`python
try:
    num = int(input_str)  # input_str is predefined
    result = 10 / num
except ValueError:
    print("Invalid number format")
except ZeroDivisionError:
    print("Cannot divide by zero")

# Handle different errors differently
\`\`\`

## Catching Multiple Exceptions Together

\`\`\`python
try:
    # Some code
    result = int("abc") / 0
except (ValueError, ZeroDivisionError):
    print("Either invalid value or division by zero")
\`\`\`

## Getting Exception Details

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
    print(f"Type: {type(e)}")

# Output:
# Error: division by zero
# Type: <class 'ZeroDivisionError'>
\`\`\`

## The else Clause

Code in \`else\` runs only if no exception occurs.

\`\`\`python
try:
    result = 10 / 2
except ZeroDivisionError:
    print("Cannot divide by zero")
else:
    print(f"Result: {result}")
    print("Operation successful")

# Output:
# Result: 5.0
# Operation successful
\`\`\`

## The finally Clause

Code in \`finally\` always runs, whether exception occurs or not.

\`\`\`python
try:
    file = open("data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("File not found")
finally:
    print("Cleanup code runs here")
    # file.close() if file exists
\`\`\`

## Complete try-except Structure

\`\`\`python
try:
    # Code that might raise exception
    result = 10 / 2
except ZeroDivisionError:
    # Handles division by zero
    print("Cannot divide by zero")
except ValueError:
    # Handles invalid values
    print("Invalid value")
else:
    # Runs if no exception
    print(f"Success! Result: {result}")
finally:
    # Always runs
    print("Cleanup completed")
\`\`\`

## Safe File Reading

\`\`\`python
try:
    with open("data.txt", "r") as file:
        content = file.read()
        print(content)
except FileNotFoundError:
    print("Error: File not found")
except PermissionError:
    print("Error: No permission to read file")
except Exception as e:
    print(f"Unexpected error: {e}")
\`\`\`

## Safe User Input

\`\`\`python
# Simulate user input
user_input = "25"

try:
    age = int(user_input)
    if age < 0:
        raise ValueError("Age cannot be negative")
    print(f"Age: {age}")
except ValueError as e:
    print(f"Invalid input: {e}")

# Output: Age: 25
\`\`\`

## Raising Exceptions

You can raise exceptions manually.

\`\`\`python
def calculate_discount(price, discount):
    if discount < 0 or discount > 100:
        raise ValueError("Discount must be between 0 and 100")
    return price * (1 - discount / 100)

try:
    final_price = calculate_discount(100, 150)
except ValueError as e:
    print(f"Error: {e}")

# Output: Error: Discount must be between 0 and 100
\`\`\`

## Creating Custom Exceptions

\`\`\`python
class InsufficientFundsError(Exception):
    pass

class BankAccount:
    def __init__(self, balance):
        self.balance = balance
    
    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError("Not enough funds")
        self.balance -= amount

account = BankAccount(100)

try:
    account.withdraw(150)
except InsufficientFundsError as e:
    print(f"Error: {e}")

# Output: Error: Not enough funds
\`\`\`

## Practical Example: Safe Division

\`\`\`python
def safe_divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        return "Error: Cannot divide by zero"
    except TypeError:
        return "Error: Invalid types for division"

print(safe_divide(10, 2))    # 5.0
print(safe_divide(10, 0))    # Error: Cannot divide by zero
print(safe_divide("10", 2))  # Error: Invalid types for division
\`\`\`

## Practical Example: Safe List Access

\`\`\`python
def get_item(lst, index):
    try:
        return lst[index]
    except IndexError:
        return "Error: Index out of range"
    except TypeError:
        return "Error: Invalid index type"

numbers = [1, 2, 3, 4, 5]
print(get_item(numbers, 2))     # 3
print(get_item(numbers, 10))    # Error: Index out of range
print(get_item(numbers, "a"))   # Error: Invalid index type
\`\`\`

## Practical Example: Safe Dictionary Access

\`\`\`python
def get_value(dictionary, key, default=None):
    try:
        return dictionary[key]
    except KeyError:
        return default

person = {"name": "Alice", "age": 25}
print(get_value(person, "name"))      # Alice
print(get_value(person, "city", "Unknown"))  # Unknown
\`\`\`

## Best Practices

✅ **Do:**
- Catch specific exceptions
- Use try-except for operations that might fail
- Provide helpful error messages
- Clean up resources in finally

❌ **Don't:**
- Use bare \`except:\` (catches all errors)
- Ignore exceptions silently
- Use exceptions for normal flow control
- Catch too broadly

## Exception Handling in Loops

\`\`\`python
numbers = ["10", "20", "abc", "30", "xyz"]

for num_str in numbers:
    try:
        num = int(num_str)
        print(f"Converted: {num}")
    except ValueError:
        print(f"Cannot convert '{num_str}' to integer")

# Output:
# Converted: 10
# Converted: 20
# Cannot convert 'abc' to integer
# Converted: 30
# Cannot convert 'xyz' to integer
\`\`\`

## Nested try-except

\`\`\`python
try:
    file = open("data.txt", "r")
    try:
        content = file.read()
        number = int(content)
    except ValueError:
        print("File content is not a number")
    finally:
        file.close()
except FileNotFoundError:
    print("File not found")
\`\`\`

## When to Use Exception Handling

Use exception handling when:
- Reading files (file might not exist)
- User input (might be invalid)
- Network operations (connection might fail)
- Type conversions (might fail)
- Dictionary/list access (key/index might not exist)
        `,
        test: {
          question: "What will be the output of the following code?\n\n```python\ntry:\n    result = 10 / 2\nexcept ZeroDivisionError:\n    print('Error')\nelse:\n    print('Success')\nfinally:\n    print('Done')\n```",
          options: [
            "Error",
            "Success",
            "Success\nDone",
            "Error\nDone"
          ],
          correctAnswer: 2,
          explanation: "Since 10/2 doesn't raise an exception, the else block runs printing 'Success', then finally always runs printing 'Done'."
        },
        practice: {
          description: `
## Exercise: Safe Integer Conversion

**Task**: 
Create a function that safely converts strings to integers:
1. Define a function \`safe_int_convert(value)\` that:
   - Uses try-except to convert the value to int
   - Returns the integer if conversion succeeds
   - Returns 0 if conversion fails (ValueError)
2. Test with three values:
   - "123" (should return 123)
   - "abc" (should return 0)
   - "456" (should return 456)
3. Print each result

**Hints**:
- Define function with \`def safe_int_convert(value):\`
- Use try block with \`int(value)\`
- Use except ValueError to catch conversion errors
- Return the converted value or 0
          `,
          starterCode: `# Define safe conversion function


# Test with different values



`,
          solution: `# Define safe conversion function
def safe_int_convert(value):
    try:
        return int(value)
    except ValueError:
        return 0

# Test with different values
print(safe_int_convert("123"))
print(safe_int_convert("abc"))
print(safe_int_convert("456"))`,
          expectedOutput: "123\n0\n456"
        }
      }
    }
  ]
};
