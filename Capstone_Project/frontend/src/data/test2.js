// Test 2: Comprehensive Project Challenge (Chapters 6-8)
export const test2 = {
  id: "test2",
  title: "Test 2: Contact Manager System",
  subsections: [
    {
      id: "test2.1",
      title: "Project Challenge: Contact Manager System",
      content: {
        practice: {
          checkOutput: true,
          description: `
# 🎯 Comprehensive Challenge: Build a Contact Manager System!

## 📊 Project Overview

Welcome to your second comprehensive project challenge! This is **NOT** a regular lesson - it's a real-world project that tests everything you've learned from **Chapters 6-8**.

Your mission: Build a complete contact management system that uses dictionaries, functions, and data structures to manage contact information!

---

## 📚 What You'll Use (Chapters 6-8)

This project integrates ALL the skills you've learned:

- ✅ **Chapter 6**: Dictionaries, Tuples, and Sets
- ✅ **Chapter 7**: Functions (Definition, Parameters, Return Values, Scope)
- ✅ **Chapter 8**: Modules and Standard Libraries (if needed)

---

## 🎯 Your Task: Build a Contact Manager System

Build a contact management system that demonstrates your mastery of dictionaries, functions, and data structures from Chapters 6-8.

**Requirements:**

1. Create an empty dictionary called \`contacts\`
2. Create a function \`add_contact(name, phone, email, tags_list)\` that:
   - Creates a contact dictionary with phone, email, and tags (as a set)
   - Adds it to the contacts dictionary using name as key
   - Returns True if successful, False if name already exists
3. Create a function \`search_by_tag(tag)\` that:
   - Returns a list of names (sorted) with the specified tag
4. Add 4 predefined contacts to the system
5. Search for contacts with tag "work" 
6. Display a formatted contact report

**Predefined Contact Data:**
- Contact 1: Alice, 123-456-7890, alice@email.com, tags: friend, work
- Contact 2: Bob, 098-765-4321, bob@email.com, tags: family
- Contact 3: Charlie, 555-111-2222, charlie@email.com, tags: work, colleague
- Contact 4: Diana, 555-333-4444, diana@email.com, tags: friend

**Expected Output Format:**
\`\`\`
=== Contact Manager System ===

Processing contacts...
Added: Alice
Added: Bob
Added: Charlie
Added: Diana

--- Search Results ---
Searching for contacts with tag: work
Found 2 contact(s):
  - Alice
  - Charlie

=== Contact Summary ===
Total Contacts: 4
Tags in System: colleague, family, friend, work
\`\`\`

**Note:** This exercise uses predefined data. Focus on implementing the functions correctly.
          `,
          hints: `**Hints:**

- Create empty dict: \`contacts = {}\`
- Convert list to set: \`set(tags_list)\`
- Check if key exists: \`if name in contacts:\`
- Add to dict: \`contacts[name] = {...}\`
- Iterate dictionary: \`for name, info in contacts.items():\`
- Check set membership: \`if tag in info["tags"]:\`
- Sort list: \`sorted(results)\`
- Get all tags: Use \`set.union()\` or loop through all contacts
`,
          starterCode: `# Step 1: Create empty contacts dictionary


# Step 2: Define add_contact function
def add_contact(name, phone, email, tags_list):
    """Add a new contact to the system"""
    # Check if contact already exists
    
    
    # Create contact dictionary with set for tags
    
    
    # Return success status
    

# Step 3: Define search_by_tag function
def search_by_tag(tag):
    """Find all contacts with a specific tag"""
    # Create empty results list
    
    
    # Loop through all contacts
    
    
    # Return sorted results
    


# Step 4: Print header
print("=== Contact Manager System ===")
print()
print("Processing contacts...")

# Step 5: Add predefined contacts
# Contact 1: Alice
result1 = add_contact("Alice", "123-456-7890", "alice@email.com", ["friend", "work"])
print("Added: Alice" if result1 else "Failed: Alice")

# Contact 2: Bob


# Contact 3: Charlie


# Contact 4: Diana


# Step 6: Search for 'work' tag
print()
print("--- Search Results ---")
print("Searching for contacts with tag: work")


# Step 7: Display search results


# Step 8: Calculate and display summary
print()
print("=== Contact Summary ===")
# Total contacts


# Collect all unique tags


`,
          solution: `# Step 1: Create empty contacts dictionary
contacts = {}

# Step 2: Define add_contact function
def add_contact(name, phone, email, tags_list):
    """Add a new contact to the system"""
    # Check if contact already exists
    if name in contacts:
        return False
    
    # Create contact dictionary with set for tags
    contacts[name] = {
        "phone": phone,
        "email": email,
        "tags": set(tags_list)
    }
    
    # Return success status
    return True

# Step 3: Define search_by_tag function
def search_by_tag(tag):
    """Find all contacts with a specific tag"""
    # Create empty results list
    results = []
    
    # Loop through all contacts
    for name, info in contacts.items():
        if tag in info["tags"]:
            results.append(name)
    
    # Return sorted results
    return sorted(results)

# Step 4: Print header
print("=== Contact Manager System ===")
print()
print("Processing contacts...")

# Step 5: Add predefined contacts
# Contact 1: Alice
result1 = add_contact("Alice", "123-456-7890", "alice@email.com", ["friend", "work"])
print("Added: Alice" if result1 else "Failed: Alice")

# Contact 2: Bob
result2 = add_contact("Bob", "098-765-4321", "bob@email.com", ["family"])
print("Added: Bob" if result2 else "Failed: Bob")

# Contact 3: Charlie
result3 = add_contact("Charlie", "555-111-2222", "charlie@email.com", ["work", "colleague"])
print("Added: Charlie" if result3 else "Failed: Charlie")

# Contact 4: Diana
result4 = add_contact("Diana", "555-333-4444", "diana@email.com", ["friend"])
print("Added: Diana" if result4 else "Failed: Diana")

# Step 6: Search for 'work' tag
print()
print("--- Search Results ---")
print("Searching for contacts with tag: work")
work_contacts = search_by_tag("work")

# Step 7: Display search results
print(f"Found {len(work_contacts)} contact(s):")
for name in work_contacts:
    print(f"  - {name}")

# Step 8: Calculate and display summary
print()
print("=== Contact Summary ===")
# Total contacts
print(f"Total Contacts: {len(contacts)}")

# Collect all unique tags
all_tags = set()
for info in contacts.values():
    all_tags.update(info["tags"])

# Display tags in sorted order
tags_sorted = ", ".join(sorted(all_tags))
print(f"Tags in System: {tags_sorted}")`,
          expectedOutput: `=== Contact Manager System ===

Processing contacts...
Added: Alice
Added: Bob
Added: Charlie
Added: Diana

--- Search Results ---
Searching for contacts with tag: work
Found 2 contact(s):
  - Alice
  - Charlie

=== Contact Summary ===
Total Contacts: 4
Tags in System: colleague, family, friend, work`
        }
      }
    }
  ]
};
