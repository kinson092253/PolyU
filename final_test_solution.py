# =============================================================================
# Library Management System - Complete Solution
# =============================================================================

# Step 1: Initialize Library Data
books = [
    {"id": 1, "title": "Python Crash Course", "author": "Eric Matthes", "year": 2019, "is_borrowed": False, "borrower": None, "due_date": None},
    {"id": 2, "title": "Clean Code", "author": "Robert Martin", "year": 2008, "is_borrowed": False, "borrower": None, "due_date": None},
    {"id": 3, "title": "The Pragmatic Programmer", "author": "Hunt & Thomas", "year": 1999, "is_borrowed": False, "borrower": None, "due_date": None}
]

# Step 2: Add Book Function
def add_book(books, title, author, year):
    new_id = max([book["id"] for book in books]) + 1
    new_book = {"id": new_id, "title": title, "author": author, "year": year, "is_borrowed": False, "borrower": None, "due_date": None}
    books.append(new_book)
    print('Book "' + title + '" by ' + author + ' added successfully! (ID: ' + str(new_id) + ')')

# Step 3: List Books Function
def list_books(books):
    for book in books:
        status = "Available"
        if book["is_borrowed"]:
            status = "Borrowed by " + book["borrower"] + " (Due: " + book["due_date"] + ")"
        print("ID: " + str(book["id"]) + " | " + book["title"] + " by " + book["author"] + " (" + str(book["year"]) + ") | Status: " + status)

# Step 4: Search Books Function
def search_books(books, keyword):
    keyword = keyword.lower()
    found = []
    for book in books:
        if keyword in book["title"].lower() or keyword in book["author"].lower():
            found.append(book)
    
    print("Found " + str(len(found)) + " book(s):")
    for book in found:
        print("  ID: " + str(book["id"]) + " | " + book["title"] + " by " + book["author"] + " (" + str(book["year"]) + ")")

# Step 5: Borrow Book Function
def borrow_book(books, book_id, borrower_name, due_date):
    for book in books:
        if book["id"] == book_id:
            if not book["is_borrowed"]:
                book["is_borrowed"] = True
                book["borrower"] = borrower_name
                book["due_date"] = due_date
                print('Book "' + book["title"] + '" borrowed successfully by ' + borrower_name)
                print("Due date: " + due_date)
            else:
                print("Book is already borrowed!")
            return
    print("Book not found!")

# Step 6: Return Book Function
def return_book(books, book_id):
    for book in books:
        if book["id"] == book_id:
            if book["is_borrowed"]:
                print('Book "' + book["title"] + '" returned successfully!')
                book["is_borrowed"] = False
                book["borrower"] = None
                book["due_date"] = None
            else:
                print("Book was not borrowed!")
            return
    print("Book not found!")

# Step 7: Statistics Function - KEY FIX HERE!
def view_statistics(books):
    total = len(books)
    borrowed = 0
    for book in books:
        if book["is_borrowed"]:
            borrowed = borrowed + 1
    available = total - borrowed
    percentage = (borrowed * 100.0) / total
    
    print("Total Books: " + str(total))
    print("Available: " + str(available))
    print("Borrowed: " + str(borrowed))
    # CRITICAL: Use format() to ensure 2 decimal places
    print("Borrowed Percentage: " + "{:.2f}".format(percentage) + "%")

# Step 8: Display Data Function
def display_data(books):
    print("Data saved successfully!")
    for book in books:
        print(str(book))

# Main Program
print("=== Library Management System ===\n")

print("--- Initial Library Status ---")
list_books(books)

print("\n--- Adding Book: Design Patterns ---")
add_book(books, "Design Patterns", "Gang of Four", 1994)

print("\n--- Searching for 'Python' ---")
search_books(books, "Python")

print("\n--- Borrowing Book #1 ---")
borrow_book(books, 1, "John Doe", "2026-04-08")

print("\n--- Current Library Status ---")
list_books(books)

print("\n--- Library Statistics ---")
view_statistics(books)

print("\n--- Returning Book #1 ---")
return_book(books, 1)

print("\n--- Saving Library Data ---")
display_data(books)

print("\n=== Demo Complete ===")
