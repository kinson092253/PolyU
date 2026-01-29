// Test 2: Comprehensive Test (Chapters 6-8)
export const test2 = {
  id: "test2",
  title: "Test 2: Contact Manager System",
  subsections: [
    {
      id: "test2.1",
      title: "Test 2: Build a Contact Manager",
      content: {
        lecture: `
# 🎯 Comprehensive Test 2: Contact Manager System

## Overview

This test evaluates your understanding of **Chapters 6-8**. You will build a contact management system that demonstrates your ability to work with advanced data structures, functions, and modules.

## 📚 Knowledge Required

This test will assess your mastery of:

- ✅ **Chapter 6**: Dictionaries, Tuples, and Sets
- ✅ **Chapter 7**: Functions (Definition, Parameters, Return Values, Scope)
- ✅ **Chapter 8**: Modules and Standard Libraries

## 🎯 Project Requirements

Create a contact manager that can:

1. Store contact information using dictionaries
2. Add new contacts with validation
3. Search contacts by name or tags
4. Display all contacts in a formatted way
5. Count contacts by category/tag
6. Use functions to organize code
7. Import standard library modules for additional features

## 📋 Detailed Steps

### Step 1: Initialize Contact Storage
**Knowledge Used: Chapter 6.1 (Dictionary), Chapter 7.3 (Variable Scope)**

Create a dictionary to store all contacts:

\`\`\`python
# Global dictionary to store contacts
# Key: contact name, Value: contact info dictionary
contacts = {}
\`\`\`

### Step 2: Define Contact Structure
**Knowledge Used: Chapter 6.1 (Dictionary), Chapter 6.2 (Tuple), Chapter 6.3 (Set)**

Each contact should have:
- Name (string)
- Phone (string)
- Email (string)
- Tags (set) - for categorization like "family", "work", "friend"
- Added date (tuple) - immutable timestamp

\`\`\`python
contact = {
    "name": "Alice",
    "phone": "123-456-7890",
    "email": "alice@example.com",
    "tags": {"friend", "work"},
    "added": (2026, 1, 2)  # (year, month, day) tuple
}
\`\`\`

### Step 3: Create Add Contact Function
**Knowledge Used: Chapter 7.1 (Function Definition), Chapter 7.2 (Parameters and Return Values)**

\`\`\`python
def add_contact(name, phone, email, tags_list):
    """
    Add a new contact to the contacts dictionary
    
    Parameters:
        name (str): Contact name
        phone (str): Phone number
        email (str): Email address
        tags_list (list): List of tags
    
    Returns:
        bool: True if added successfully, False if contact exists
    """
    if name in contacts:
        return False
    
    contacts[name] = {
        "phone": phone,
        "email": email,
        "tags": set(tags_list),
        "added": (2026, 1, 2)
    }
    return True
\`\`\`

### Step 4: Create Search Function
**Knowledge Used: Chapter 7.1 (Functions), Chapter 6.3 (Set Operations)**

\`\`\`python
def search_by_tag(tag):
    """
    Find all contacts with a specific tag
    
    Parameters:
        tag (str): Tag to search for
    
    Returns:
        list: List of contact names matching the tag
    """
    results = []
    for name, info in contacts.items():
        if tag in info["tags"]:
            results.append(name)
    return results
\`\`\`

### Step 5: Create Display Function
**Knowledge Used: Chapter 7.1 (Functions), Chapter 6.1 (Dictionary Iteration)**

\`\`\`python
def display_all_contacts():
    """Display all contacts in a formatted way"""
    if not contacts:
        print("No contacts found.")
        return
    
    print("\\n=== All Contacts ===")
    for name, info in contacts.items():
        tags_str = ", ".join(info["tags"])
        print(f"Name: {name}")
        print(f"  Phone: {info['phone']}")
        print(f"  Email: {info['email']}")
        print(f"  Tags: {tags_str}")
        print()
\`\`\`

### Step 6: Create Statistics Function
**Knowledge Used: Chapter 7.2 (Return Values), Chapter 6.3 (Set)**

\`\`\`python
def get_statistics():
    """
    Get statistics about contacts
    
    Returns:
        dict: Dictionary with statistics
    """
    total = len(contacts)
    all_tags = set()
    
    for info in contacts.values():
        all_tags.update(info["tags"])
    
    return {
        "total_contacts": total,
        "unique_tags": len(all_tags),
        "all_tags": all_tags
    }
\`\`\`

### Step 7: Use Standard Library Modules
**Knowledge Used: Chapter 8.1 (Importing Modules), Chapter 8.2 (Standard Libraries)**

\`\`\`python
from datetime import datetime

def add_contact_with_timestamp(name, phone, email, tags_list):
    """Add contact with current timestamp"""
    if name in contacts:
        return False
    
    # Get current date as tuple
    now = datetime.now()
    date_tuple = (now.year, now.month, now.day)
    
    contacts[name] = {
        "phone": phone,
        "email": email,
        "tags": set(tags_list),
        "added": date_tuple
    }
    return True
\`\`\`

### Step 8: Email Validation (Optional)
**Knowledge Used: Chapter 8.2 (re module)**

\`\`\`python
import re

def is_valid_email(email):
    """
    Validate email format using regex
    
    Parameters:
        email (str): Email to validate
    
    Returns:
        bool: True if valid, False otherwise
    """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None
\`\`\`

## 🎨 Expected Program Flow

\`\`\`
=== Contact Manager ===

1. Add Contact
2. Search by Tag
3. Display All
4. Statistics
5. Exit

Choice: 1
Name: Alice
Phone: 123-456-7890
Email: alice@email.com
Tags (comma separated): friend,work
✅ Contact added successfully!

Choice: 1
Name: Bob
Phone: 098-765-4321
Email: bob@email.com
Tags (comma separated): family
✅ Contact added successfully!

Choice: 2
Enter tag to search: work
Found 1 contact(s):
- Alice

Choice: 3

=== All Contacts ===
Name: Alice
  Phone: 123-456-7890
  Email: alice@email.com
  Tags: friend, work

Name: Bob
  Phone: 098-765-4321
  Email: bob@email.com
  Tags: family

Choice: 4

=== Statistics ===
Total Contacts: 2
Unique Tags: 3
All Tags: friend, work, family
\`\`\`

## 💡 Tips

1. **Use Dictionaries**: Store contact info in nested dictionaries
2. **Use Sets for Tags**: Sets automatically handle duplicates
3. **Use Tuples for Dates**: Immutable data should use tuples
4. **Create Functions**: Break down tasks into small functions
5. **Return Values**: Functions should return results for flexibility
6. **Import Modules**: Use datetime for timestamps, re for validation

## ⚠️ Common Challenges

- **Nested Data Structures**: Dictionary containing sets and tuples
- **Function Design**: Proper parameter passing and return values
- **Set Operations**: Understanding union, intersection, difference
- **Module Imports**: Knowing when and how to import
- **Scope Issues**: Managing global vs local variables

## 🌟 What This Tests

This comprehensive exercise tests your ability to:
- ✅ Work with complex data structures (dict, set, tuple together)
- ✅ Design and implement functions with clear purposes
- ✅ Use appropriate return values and parameters
- ✅ Import and use standard library modules
- ✅ Organize code in a maintainable way
- ✅ Handle data validation and error cases

Good luck! 🚀
        `,
        test: {
          question: "In the Contact Manager, which data structure combination is most appropriate for storing contact information?\n\n```python\noption_a = {\"name\": \"Alice\", \"tags\": [\"friend\", \"work\"]}\noption_b = {\"name\": \"Alice\", \"tags\": {\"friend\", \"work\"}}\noption_c = [\"Alice\", \"friend\", \"work\"]\n```",
          options: [
            "Dictionary with list for tags (option_a)",
            "Dictionary with set for tags (option_b)",
            "List with all values (option_c)",
            "Tuple with all values"
          ],
          correctAnswer: 1,
          explanation: "Dictionary with set (option_b) is best because: (1) Dictionary allows named access to contact fields, (2) Set automatically prevents duplicate tags, (3) Set provides efficient membership testing, and (4) Tags naturally form an unordered collection where uniqueness matters."
        },
        practice: {
          checkOutput: false,
          description: `
## 🎯 Your Task: Build a Simplified Contact Manager

Build a simplified version of the Contact Manager that demonstrates core concepts.

**Requirements:**

1. Create an empty dictionary called \`contacts\`
2. Create a function \`add_contact(name, phone, email, tags_list)\` that:
   - Creates a contact dictionary with phone, email, and tags (as a set)
   - Adds it to the contacts dictionary using name as key
   - Returns True if successful, False if name already exists
3. Create a function \`search_by_tag(tag)\` that:
   - Returns a list of names with the specified tag
4. Add 3 contacts with different tags
5. Search for contacts with tag "work"
6. Display the results

**Example Output:**
\`\`\`
Adding Alice... Success!
Adding Bob... Success!
Adding Charlie... Success!

Searching for 'work' tag...
Found 2 contacts:
- Alice
- Charlie
\`\`\`

**Note:** Use \`input()\` to get user input for contact details.
          `,
          hints: `**Hints:**

- Create empty dict: \`contacts = {}\`
- Convert list to set: \`set(tags_list)\`
- Check if key exists: \`if name in contacts:\`
- Iterate dictionary: \`for name, info in contacts.items():\`
- Check set membership: \`if tag in info["tags"]:\`
- Return from function: \`return result\`
`,
          starterCode: `# Step 1: Create empty contacts dictionary


# Step 2: Define add_contact function


# Step 3: Define search_by_tag function


# Step 4: Add contacts (use input() to get details)


# Step 5: Search for contacts with a specific tag


# Step 6: Display results

`,
          solution: `# Step 1: Create empty contacts dictionary
contacts = {}

# Step 2: Define add_contact function
def add_contact(name, phone, email, tags_list):
    """Add a new contact"""
    if name in contacts:
        return False
    
    contacts[name] = {
        "phone": phone,
        "email": email,
        "tags": set(tags_list)
    }
    return True

# Step 3: Define search_by_tag function
def search_by_tag(tag):
    """Find contacts by tag"""
    results = []
    for name, info in contacts.items():
        if tag in info["tags"]:
            results.append(name)
    return results

# Step 4: Add contacts
# Contact 1
name1 = input("Enter contact 1 name: ")
phone1 = input("Enter phone: ")
email1 = input("Enter email: ")
tags1 = input("Enter tags (comma separated): ").split(",")
success1 = add_contact(name1, phone1, email1, tags1)
print(f"Adding {name1}... {'Success!' if success1 else 'Failed!'}")

# Contact 2
name2 = input("Enter contact 2 name: ")
phone2 = input("Enter phone: ")
email2 = input("Enter email: ")
tags2 = input("Enter tags (comma separated): ").split(",")
success2 = add_contact(name2, phone2, email2, tags2)
print(f"Adding {name2}... {'Success!' if success2 else 'Failed!'}")

# Contact 3
name3 = input("Enter contact 3 name: ")
phone3 = input("Enter phone: ")
email3 = input("Enter email: ")
tags3 = input("Enter tags (comma separated): ").split(",")
success3 = add_contact(name3, phone3, email3, tags3)
print(f"Adding {name3}... {'Success!' if success3 else 'Failed!'}")

# Step 5: Search for contacts
search_tag = input("\\nEnter tag to search: ")
results = search_by_tag(search_tag)

# Step 6: Display results
print(f"\\nSearching for '{search_tag}' tag...")
if results:
    print(f"Found {len(results)} contact(s):")
    for name in results:
        print(f"- {name}")
else:
    print("No contacts found with that tag.")`
        }
      }
    }
  ]
};
