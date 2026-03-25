// Final Test: Comprehensive Assessment (All Chapters 1-10)
export const finalTest = {
  id: "finalTest",
  title: "Final Test: Python Mastery Challenge",
  subsections: [
    {
      id: "finalTest.1",
      title: "Final Comprehensive Assessment",
      content: {
        isFinalTest: true, // Special flag to trigger FinalTest component
        
        // Stage 1: Multiple Choice Questions
        multipleChoice: [
          {
            id: 1,
            question: "What is the correct way to define a function in Python that takes two parameters and returns their sum?",
            options: [
              "def sum(a, b): return a + b",
              "function sum(a, b) { return a + b }",
              "def sum(a, b) { return a + b }",
              "function sum(a, b): return a + b"
            ],
            correctAnswer: 0,
            explanation: "Python uses `def` keyword followed by function name, parameters in parentheses, colon, and the return statement."
          },
          {
            id: 2,
            question: "Which data structure would be best for storing unique student IDs?",
            options: [
              "List",
              "Dictionary",
              "Set",
              "Tuple"
            ],
            correctAnswer: 2,
            explanation: "Sets automatically ensure all elements are unique, making them ideal for storing unique identifiers."
          },
          {
            id: 3,
            question: "What will be the output of: `print(list(range(2, 8, 2)))`?",
            options: [
              "[2, 4, 6]",
              "[2, 4, 6, 8]",
              "[2, 3, 4, 5, 6, 7, 8]",
              "[4, 6, 8]"
            ],
            correctAnswer: 0,
            explanation: "range(2, 8, 2) generates numbers from 2 up to (but not including) 8, with a step of 2: [2, 4, 6]"
          },
          {
            id: 4,
            question: "Which statement about dictionaries is TRUE?",
            options: [
              "Dictionary keys must be strings",
              "Dictionary values must be unique",
              "Dictionaries maintain insertion order (Python 3.7+)",
              "Dictionaries cannot contain nested dictionaries"
            ],
            correctAnswer: 2,
            explanation: "Since Python 3.7, dictionaries maintain the order in which items were inserted. Keys can be any immutable type, values can be duplicated, and dictionaries can be nested."
          },
          {
            id: 5,
            question: "What is the purpose of a `try-except` block in file operations?",
            options: [
              "To improve file reading speed",
              "To handle potential errors gracefully",
              "To create new files automatically",
              "To compress file data"
            ],
            correctAnswer: 1,
            explanation: "try-except blocks catch and handle exceptions, preventing program crashes when errors occur (like file not found, permission denied, etc.)."
          },
          {
            id: 6,
            question: "Which loop structure would you use when you don't know how many iterations are needed?",
            options: [
              "for loop",
              "while loop",
              "nested loop",
              "infinite loop"
            ],
            correctAnswer: 1,
            explanation: "while loops continue until a condition becomes false, making them ideal when the number of iterations is unknown beforehand."
          },
          {
            id: 7,
            question: "What is the difference between `append()` and `extend()` for lists?",
            options: [
              "They do the same thing",
              "append() adds one element, extend() adds multiple elements from an iterable",
              "extend() adds one element, append() adds multiple elements",
              "append() is faster than extend()"
            ],
            correctAnswer: 1,
            explanation: "append() adds a single item to the list, while extend() adds all items from another iterable (like another list) individually."
          },
          {
            id: 8,
            question: "Which module would you import to work with CSV files in Python?",
            options: [
              "file",
              "csv",
              "excel",
              "pandas"
            ],
            correctAnswer: 1,
            explanation: "The csv module provides functionality for reading and writing CSV (Comma-Separated Values) files. While pandas can also handle CSV, the csv module is the standard library choice."
          },
          {
            id: 9,
            question: "What will `x = [1, 2, 3]; y = x; y.append(4); print(x)` output?",
            options: [
              "[1, 2, 3]",
              "[1, 2, 3, 4]",
              "[4]",
              "Error"
            ],
            correctAnswer: 1,
            explanation: "Lists are mutable and passed by reference. When y = x, both variables point to the same list in memory, so modifying y also affects x."
          },
          {
            id: 10,
            question: "Which operator would you use to check if a key exists in a dictionary?",
            options: [
              "==",
              "is",
              "in",
              "has"
            ],
            correctAnswer: 2,
            explanation: "The 'in' operator checks for membership - whether a key exists in a dictionary: `if 'name' in my_dict:`"
          }
        ],
        
        // Stage 2: Dropdown/Fill-in-the-blank Questions
        dropdownQuestions: [
          {
            id: 1,
            question: "Complete the code to read a text file safely:",
            template: "___BLANK1___ open('data.txt', '___BLANK2___') ___BLANK3___ file:\n    content = file.___BLANK4___()",
            blanks: [
              {
                id: "BLANK1",
                options: ["try", "with", "for", "while"],
                correctAnswer: "with"
              },
              {
                id: "BLANK2",
                options: ["w", "r", "a", "rb"],
                correctAnswer: "r"
              },
              {
                id: "BLANK3",
                options: ["in", "as", "for", "with"],
                correctAnswer: "as"
              },
              {
                id: "BLANK4",
                options: ["open", "read", "write", "close"],
                correctAnswer: "read"
              }
            ],
            explanation: "The 'with' statement ensures proper file handling. 'r' mode is for reading. 'as file' creates a file object. read() reads the entire file content."
          },
          {
            id: 2,
            question: "Complete the function definition with proper syntax:",
            template: "___BLANK1___ calculate_average(numbers):\n    total = ___BLANK2___(numbers)\n    count = ___BLANK3___(numbers)\n    ___BLANK4___ total / count",
            blanks: [
              {
                id: "BLANK1",
                options: ["function", "def", "define", "func"],
                correctAnswer: "def"
              },
              {
                id: "BLANK2",
                options: ["sum", "total", "add", "count"],
                correctAnswer: "sum"
              },
              {
                id: "BLANK3",
                options: ["size", "length", "len", "count"],
                correctAnswer: "len"
              },
              {
                id: "BLANK4",
                options: ["print", "return", "output", "give"],
                correctAnswer: "return"
              }
            ],
            explanation: "Functions are defined with 'def', sum() adds all numbers, len() gets the count, and 'return' sends back the result."
          },
          {
            id: 3,
            question: "Complete the dictionary manipulation code:",
            template: "student = ___BLANK1___\nstudent___BLANK2___'name'___BLANK3___ = 'Alice'\nstudent['grades'] = ___BLANK4___\nstudent['grades'].___BLANK5___(95)",
            blanks: [
              {
                id: "BLANK1",
                options: ["[]", "{}", "()", "set()"],
                correctAnswer: "{}"
              },
              {
                id: "BLANK2",
                options: [".", "[", "(", "{"],
                correctAnswer: "["
              },
              {
                id: "BLANK3",
                options: [".", "]", ")", "}"],
                correctAnswer: "]"
              },
              {
                id: "BLANK4",
                options: ["{}", "[]", "()", "set()"],
                correctAnswer: "[]"
              },
              {
                id: "BLANK5",
                options: ["add", "append", "insert", "push"],
                correctAnswer: "append"
              }
            ],
            explanation: "Dictionaries use {}, access items with [], values can be lists (initialized with []), and lists use append() to add items."
          },
          {
            id: 4,
            question: "Complete the loop with proper control flow:",
            template: "___BLANK1___ i ___BLANK2___ range(10):\n    ___BLANK3___ i == 5:\n        ___BLANK4___\n    ___BLANK5___ i % 2 == 0:\n        print(i)",
            blanks: [
              {
                id: "BLANK1",
                options: ["while", "for", "loop", "each"],
                correctAnswer: "for"
              },
              {
                id: "BLANK2",
                options: ["in", "of", "from", "at"],
                correctAnswer: "in"
              },
              {
                id: "BLANK3",
                options: ["when", "if", "while", "for"],
                correctAnswer: "if"
              },
              {
                id: "BLANK4",
                options: ["break", "continue", "pass", "stop"],
                correctAnswer: "continue"
              },
              {
                id: "BLANK5",
                options: ["when", "if", "elif", "else"],
                correctAnswer: "if"
              }
            ],
            explanation: "'for i in range()' iterates through numbers. 'if' checks conditions. 'continue' skips to the next iteration."
          },
          {
            id: 5,
            question: "Complete the JSON file operation:",
            template: "import ___BLANK1___\nwith open('data.json', '___BLANK2___') as file:\n    data = ___BLANK3___.___BLANK4___(file)\nprint(data___BLANK5___)",
            blanks: [
              {
                id: "BLANK1",
                options: ["csv", "json", "file", "data"],
                correctAnswer: "json"
              },
              {
                id: "BLANK2",
                options: ["w", "r", "a", "rb"],
                correctAnswer: "r"
              },
              {
                id: "BLANK3",
                options: ["file", "json", "data", "content"],
                correctAnswer: "json"
              },
              {
                id: "BLANK4",
                options: ["read", "load", "open", "parse"],
                correctAnswer: "load"
              },
              {
                id: "BLANK5",
                options: [".keys", ".keys()", "[keys]", ".get_keys()"],
                correctAnswer: ".keys()"
              }
            ],
            explanation: "Import json module, open file in read mode 'r', use json.load() to parse, and .keys() to get dictionary keys."
          }
        ],
        
        // Stage 3: Comprehensive Coding Challenge
        codingChallenge: {
          title: "Ultimate Python Project: Library Management System",
          description: `
# 🎯 Final Coding Challenge: Build a Complete Library Management System!

## 📚 Project Overview

**Congratulations on making it to the Final Test!** 

This is your ultimate challenge that tests **EVERYTHING** you've learned from **Chapters 1-10**. You'll build a complete Library Management System from scratch!

---

## 📖 What You'll Build

A comprehensive library system that can:
- ✅ Manage books (add, search, borrow, return)
- ✅ Track borrower information
- ✅ Handle file operations (save/load data)
- ✅ Process multiple operations through a menu
- ✅ Generate statistics and reports

---

## 🎓 Knowledge Required (All Chapters)

This project uses concepts from EVERY chapter:

- **Chapter 1**: Variables, input/output, data types
- **Chapter 2**: Operators, calculations
- **Chapter 3**: Conditionals (if/elif/else)
- **Chapter 4**: Loops (for/while)
- **Chapter 5**: Lists and list operations
- **Chapter 6**: Dictionaries to store book data
- **Chapter 7**: Functions to organize code
- **Chapter 8**: Modules (math, random)
- **Chapter 9**: Classes for Book and Library
- **Chapter 10**: File operations, error handling

---

## 📋 System Requirements

### Data Structures:

**Book Object (Dictionary):**
\`\`\`python
{
    "id": 1,
    "title": "Book Title",
    "author": "Author Name",
    "year": 2024,
    "is_borrowed": False,
    "borrower": None,
    "due_date": None
}
\`\`\`

**Library Operations:**
1. **Add Book**: Create new book entry
2. **List All Books**: Display all books with status
3. **Search Books**: Find books by title or author
4. **Borrow Book**: Mark book as borrowed with due date
5. **Return Book**: Mark book as available
6. **View Statistics**: Show borrowed/available counts
7. **Display Data**: Show all book data in structured format

### Grading Criteria:
- **A (90-100%)**: All features working perfectly with error handling
- **B (80-89%)**: Core features working, minor issues in edge cases
- **C (70-79%)**: Basic operations working, missing some features
- **D (60-69%)**: Some functionality present but incomplete
- **F (<60%)**: Major functionality missing or broken

---

## 📝 Implementation Guide

Follow these steps to build your system:

### **Step 1: Initialize Library Data**
**Knowledge Used: Chapters 5, 6**

Create a list to store book dictionaries. Start with 3 sample books:
- "Python Crash Course" by Eric Matthes (2019)
- "Clean Code" by Robert Martin (2008)
- "The Pragmatic Programmer" by Hunt & Thomas (1999)

Each book should have: id, title, author, year, is_borrowed=False, borrower=None, due_date=None

---

### **Step 2: Add Book Function**
**Knowledge Used: Chapters 1, 6, 7**

Create function \`add_book(books)\` that:
- Takes title, author, year as parameters
- Creates new book dictionary with unique id
- Adds to books list
- Returns success message

**Demo Note:** For automated testing, use predefined values like "Design Patterns" by Gang of Four (1994). Note: \`input()\` function works in Pyodide but demo uses hardcoded values for consistency.

---

### **Step 3: List Books Function**
**Knowledge Used: Chapters 3, 4, 6**

Create function \`list_books(books)\` that:
- Loops through all books
- Displays: ID | Title | Author | Year | Status
- Status shows "Available" or "Borrowed by [name] (Due: [date])"
- Handles empty library case

---

### **Step 4: Search Books Function**
**Knowledge Used: Chapters 3, 4, 6, 7**

Create function \`search_books(books, keyword)\` that:
- Searches for keyword in title OR author (case-insensitive)
- Returns list of matching books
- Displays results or "No books found" message

**Demo Note:** Search for "Python" to test functionality.

---

### **Step 5: Borrow Book Function**
**Knowledge Used: Chapters 3, 6, 7**

Create function \`borrow_book(books, book_id, borrower_name, due_date)\` that:
- Finds book by ID
- Checks if already borrowed
- Sets is_borrowed=True, borrower=name, due_date=date_string
- Returns success/error message

**Demo Note:** Borrow book ID 1 with borrower "John Doe" and due date "2026-04-08".

---

### **Step 6: Return Book Function**
**Knowledge Used: Chapters 3, 6, 7**

Create function \`return_book(books, book_id)\` that:
- Finds book by ID
- Checks if book is borrowed
- Resets is_borrowed=False, borrower=None, due_date=None
- Returns success/error message

**Demo Note:** Return book ID 1.

---

### **Step 7: Statistics Function**
**Knowledge Used: Chapters 2, 4, 6, 7**

Create function \`view_statistics(books)\` that calculates and displays:
- Total number of books
- Number of available books
- Number of borrowed books
- Percentage of books borrowed (formatted to 2 decimal places)

**Important:** Use string formatting to ensure 2 decimal places are always shown:
\`\`\`python
percentage = (borrowed / total) * 100
print("Borrowed Percentage: " + "{:.2f}".format(percentage) + "%")
\`\`\`
This ensures "25.00%" instead of "25.0%"

---

### **Step 8: Display Data Function**
**Knowledge Used: Chapters 4, 6, 7**

Create function \`display_data(books)\` that:
- Prints "Data saved successfully!"
- Loops through all books
- Prints each book using \`str(book)\` to show the dictionary format

**Demo Note:** This simulates saving data by displaying the structured information.

---

### **Step 11: Main Program Flow**
**Knowledge Used: Chapters 3, 4**

Create main program that:
- Initializes library with sample books
- Displays menu
- Simulates user operations in sequence:
  1. List all books (initial)
  2. Add new book
  3. Search for "Python"
  4. Borrow book ID 1
  5. List all books (show borrowed status)
  6. View statistics
  7. Return book ID 1
  8. Save data
- Uses print statements to show each operation clearly

**Note:** Since this runs in browser, we'll **demonstrate all features automatically** rather than using interactive input().

---


## 💡 Tips & Hints

1. **Start with data structure**: Get the book dictionary format right first
2. **Build incrementally**: Test each function before moving to the next
3. **Use helper functions**: Break complex operations into smaller functions
4. **Print debug info**: Add print statements to track your progress
5. **Handle edge cases**: What if book ID doesn't exist? What if library is empty?

---


## 🚀 Ready to Begin?

This is your moment to shine! Use everything you've learned to build a complete, working system.

**Remember:**
- Take it step by step
- Test frequently
- Don't be afraid to refer back to previous chapters
- You've learned everything you need - now put it all together!

Good luck! 🎓
`,
          starterCode: `# =============================================================================
# Library Management System - Browser Compatible Version
# No external imports needed - using only Python basics!
# =============================================================================

# =============================================================================
# STEP 1: Initialize Library Data
# =============================================================================
# TODO: Create a list called 'books' with 3 sample book dictionaries
# Each book should have: id, title, author, year, is_borrowed, borrower, due_date
# Example: {"id": 1, "title": "Book Name", "author": "Author", "year": 2020, 
#           "is_borrowed": False, "borrower": None, "due_date": None}


# =============================================================================
# STEP 2: Add Book Function
# =============================================================================
# TODO: Create function add_book(books, title, author, year)
# - Find max ID from existing books and add 1
# - Create new book dictionary with is_borrowed=False
# - Append to books list
# - Print success message with book ID


# =============================================================================
# STEP 3: List Books Function
# =============================================================================
# TODO: Create function list_books(books)
# - Loop through all books
# - For each book, print: "ID: X | Title by Author (Year) | Status: ..."
# - Status shows either "Available" or "Borrowed by [name] (Due: [date])"


# =============================================================================
# STEP 4: Search Books Function
# =============================================================================
# TODO: Create function search_books(books, keyword)
# - Convert keyword to lowercase for case-insensitive search
# - Search in both title and author fields
# - Print number of books found
# - Display matching books


# =============================================================================
# STEP 5: Borrow Book Function
# =============================================================================
# TODO: Create function borrow_book(books, book_id, borrower_name, due_date)
# - Find book by ID
# - Check if book exists and is available
# - If available: set is_borrowed=True, borrower=name, due_date=date
# - Print success message with due date
# - If not available: print error message


# =============================================================================
# STEP 6: Return Book Function
# =============================================================================
# TODO: Create function return_book(books, book_id)
# - Find book by ID
# - Check if book exists and is borrowed
# - If borrowed: reset is_borrowed=False, borrower=None, due_date=None
# - Print success message with book title
# - If not borrowed: print error message


# =============================================================================
# STEP 7: Statistics Function
# =============================================================================
# TODO: Create function view_statistics(books)
# - Calculate total number of books (use len())
# - Count available books (where is_borrowed is False)
# - Count borrowed books (where is_borrowed is True)
# - Calculate borrowed percentage: (borrowed / total) * 100
# - Print statistics with percentage formatted to 2 decimals
# - Use "{:.2f}".format(percentage) to ensure "25.00%" not "25.0%"


# =============================================================================
# STEP 8: Display Data Function
# =============================================================================
# TODO: Create function display_data(books)
# - Print "Data saved successfully!"
# - Loop through all books and print each one
# - Use str(book) to convert dictionary to string format


# =============================================================================
# STEP 9: Main Program - Demo Mode
# =============================================================================
# TODO: Implement main program that demonstrates all features:

print("=== Library Management System ===\\n")

# 1. Initialize library with 3 books (Step 1)

# 2. Display initial library status using list_books()

# 3. Add new book: "Design Patterns" by "Gang of Four" (1994)

# 4. Search for books containing "Python"

# 5. Borrow book ID 1 by "John Doe", due date "2026-04-08"

# 6. Display updated library status

# 7. Display library statistics

# 8. Return book ID 1

# 9. Display saved data

print("\\n=== Demo Complete ===")
`,
          expectedOutput: `=== Library Management System ===

--- Initial Library Status ---
ID: 1 | Python Crash Course by Eric Matthes (2019) | Status: Available
ID: 2 | Clean Code by Robert Martin (2008) | Status: Available
ID: 3 | The Pragmatic Programmer by Hunt & Thomas (1999) | Status: Available

--- Adding Book: Design Patterns ---
Book "Design Patterns" by Gang of Four added successfully! (ID: 4)

--- Searching for 'Python' ---
Found 1 book(s):
  ID: 1 | Python Crash Course by Eric Matthes (2019)

--- Borrowing Book #1 ---
Book "Python Crash Course" borrowed successfully by John Doe
Due date: 2026-04-08

--- Current Library Status ---
ID: 1 | Python Crash Course by Eric Matthes (2019) | Status: Borrowed by John Doe (Due: 2026-04-08)
ID: 2 | Clean Code by Robert Martin (2008) | Status: Available
ID: 3 | The Pragmatic Programmer by Hunt & Thomas (1999) | Status: Available
ID: 4 | Design Patterns by Gang of Four (1994) | Status: Available

--- Library Statistics ---
Total Books: 4
Available: 3
Borrowed: 1
Borrowed Percentage: 25.00%

--- Returning Book #1 ---
Book "Python Crash Course" returned successfully!

--- Saving Library Data ---
Data saved successfully!
{'id': 1, 'title': 'Python Crash Course', 'author': 'Eric Matthes', 'year': 2019, 'is_borrowed': False, 'borrower': None, 'due_date': None}
{'id': 2, 'title': 'Clean Code', 'author': 'Robert Martin', 'year': 2008, 'is_borrowed': False, 'borrower': None, 'due_date': None}
{'id': 3, 'title': 'The Pragmatic Programmer', 'author': 'Hunt & Thomas', 'year': 1999, 'is_borrowed': False, 'borrower': None, 'due_date': None}
{'id': 4, 'title': 'Design Patterns', 'author': 'Gang of Four', 'year': 1994, 'is_borrowed': False, 'borrower': None, 'due_date': None}

=== Demo Complete ===`
        }
      }
    }
  ]
};

export default finalTest;
