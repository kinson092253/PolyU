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

- ✅ **Chapter 6.1**: Dictionaries (storing contact information)
- ✅ **Chapter 6.3**: Sets (managing tags)
- ✅ **Chapter 7.1**: Function Definition (creating reusable functions)
- ✅ **Chapter 7.2**: Function Parameters and Return Values
- ✅ **Chapter 7.3**: Variable Scope

---

## 📝 Step-by-Step Guide

Follow the steps in the code editor ONE BY ONE. Each step builds on the previous one!

**Important:** This guide explains WHAT to do and WHY, but YOU need to write the code yourself!

---

### **Step 1: Create the Contacts Storage**
**Knowledge Used: Chapter 6.1 (Dictionary Basics)**

**What to do:**
Create an empty dictionary called \`contacts\` to store all contact information.

**Think about:**
- How do you create an empty dictionary? (Hint: Chapter 6.1)
- Why use a dictionary instead of a list?

**Structure:**
- **Key**: Person's name (string)
- **Value**: Another dictionary with their details (phone, email, tags)

**Why a dictionary?** Because we want to quickly look up contacts by name!

---

### **Step 2: Create the add_contact Function**
**Knowledge Used: Chapter 7.1 (Function Definition), Chapter 7.2 (Parameters & Return)**

**What to do:**
Create a function named \`add_contact\` that takes 4 parameters: \`name\`, \`phone\`, \`email\`, \`tags_list\`

**The function should:**
1. **Check if contact already exists** - How do you check if a key exists in a dictionary? (Chapter 6.1)
2. **If it exists**: Return \`False\` (can't add duplicate)
3. **If it doesn't exist**:
   - **Add a new contact** to the existing \`contacts\` dictionary
   - Use the person's **name as the key**
   - The **value** should be another dictionary with keys: "phone", "email", "tags"
   - Convert \`tags_list\` to a **set** (Chapter 6.3) - Why? Sets remove duplicates!
   - Return \`True\` (success)

**Important Concept - Adding vs Overwriting a Dictionary:**

❌ **Wrong - This REPLACES the entire dictionary:**
\`\`\`python
dict_name = {key1: value1, key2: value2}
\`\`\`
This overwrites everything! All previous contacts are lost.

✅ **Correct - This ADDS a new entry to existing dictionary:**
\`\`\`python
dict_name[new_key] = {key1: value1, key2: value2, key3: value3}
\`\`\`
This keeps all previous entries and adds a new one.

**Analogy:**
- \`contacts\` is like a **phone book** (created in Step 1)
- \`contacts[key]\` means: "**open the phone book and add this person**"
- Each person's info is stored as a dictionary value

**Structure you need:**
\`\`\`python
dictionary_name[person_name] = {
    "key1": parameter1,
    "key2": parameter2,
    "key3": converted_parameter3
}
\`\`\`

**Think about:**
- How do you define a function with parameters? (Chapter 7.1)
- How do you add a key-value pair to a dictionary? (Chapter 6.1 - pattern: \`dict[key] = value\`)
- How do you convert a list to a set? (Chapter 6.3 - hint: there's a function for this)
- How do you return a value from a function? (Chapter 7.2)

**Pseudo-code structure:**
\`\`\`
function add_contact(name, phone, email, tags_list):
    if name already in contacts:
        return False
    
    create new contact dictionary with phone, email, and tags (as set)
    add it to contacts with name as key
    return True
\`\`\`

---

### **Step 3: Create the search_by_tag Function**
**Knowledge Used: Chapter 7.1 (Functions), Chapter 6.3 (Set Membership)**

**What to do:**
Create a function named \`search_by_tag\` that takes 1 parameter: \`tag\`

**The function should:**
1. Create an empty list named \`results\` to store results
2. Loop through all contacts in the dictionary
3. For each contact, check if the \`tag\` is in their tags set
4. If yes, add the person's name to the results list
5. Return the results list **sorted** alphabetically

**Think about:**
- How do you iterate through a dictionary to get both keys and values? (Chapter 6.1 - hint: \`.items()\`)
- How do you check if an item is in a set? (Chapter 6.3 - hint: \`in\` operator)
- How do you sort a list? (Built-in \`sorted()\` function)

**Pseudo-code structure:**
\`\`\`
function search_by_tag(tag):
    create empty list named results
    
    for each name and info in contacts:
        if tag is in info's tags set:
            add name to results
    
    return sorted results
\`\`\`

---

### **Step 4: Print the Header**
**Knowledge Used: Chapter 1.3 (Output)**

**What to do:**
Print the following 3 lines:
1. "=== Contact Manager System ==="
2. An empty line
3. "Processing contacts..."

**Simple!** Just use \`print()\` statements.

---

### **Step 5: Add the 4 Predefined Contacts**
**Knowledge Used: Chapter 7.1 (Calling Functions), Chapter 3.1 (Conditional Expression)**

**What to do:**
Call your \`add_contact()\` function 4 times with these contact details:

**Contact 1 - Alice:**
- Phone: "123-456-7890"
- Email: "alice@email.com"
- Tags: ["friend", "work"]

**Contact 2 - Bob:**
- Phone: "098-765-4321"
- Email: "bob@email.com"
- Tags: ["family"]

**Contact 3 - Charlie:**
- Phone: "555-111-2222"
- Email: "charlie@email.com"
- Tags: ["work", "colleague"]

**Contact 4 - Diana:**
- Phone: "555-333-4444"
- Email: "diana@email.com"
- Tags: ["friend"]

**For each contact:**
- Store the return value (True/False) in a variable
- Print "Added: [Name]" if successful, or "Failed: [Name]" if not

**Hint:** Use a conditional expression: \`"Added: Alice" if result1 else "Failed: Alice"\`

---

### **Step 6: Search for Contacts with "work" Tag**
**Knowledge Used: Chapter 7.1 (Calling Functions)**

**What to do:**
1. Print an empty line
2. Print "--- Search Results ---"
3. Print "Searching for contacts with tag: work"
4. Call your \`search_by_tag()\` function with "work" as the argument
5. Store the result in a variable \`work_contacts\` (it will be a list of names)

**Expected result:** The list should contain ["Alice", "Charlie"] (sorted alphabetically)

---

### **Step 7: Display the Search Results**
**Knowledge Used: Chapter 4.1 (For Loop), Chapter 1.3 (String Formatting)**

**What to do:**
1. Print how many contacts were found using the length of the list
2. Use a for loop to print each name with "  - " prefix

**Think about:**
- How do you get the length of a list? (Chapter 5.1 - hint: \`len()\`)
- How do you loop through a list? (Chapter 4.1)
- How do you format strings with variables? (Chapter 1.3 - hint: f-strings)

**Expected output format:**
\`\`\`
Found 2 contact(s):
  - Alice
  - Charlie
\`\`\`

---

### **Step 8: Calculate and Display Summary**
**Knowledge Used: Chapter 6.1 (Dictionary), Chapter 6.3 (Set Operations)**

**What to do:**
1. Print an empty line
2. Print "=== Contact Summary ==="
3. Print the total number of contacts
4. Collect ALL unique tags from ALL contacts and display them sorted

**For collecting all tags:**
- Create an empty set called \`all_tags\`
- Loop through all contact information (use \`.values()\` on the contacts dictionary)
- For each contact's tags, add them to \`all_tags\` (Chapter 6.3 - hint: \`.update()\`)
- Sort the tags and join them with ", " separator

**Think about:**
- How do you get the number of items in a dictionary? (hint: \`len()\`)
- How do you iterate through dictionary values only? (Chapter 6.1 - hint: \`.values()\`)
- How do you combine multiple sets? (Chapter 6.3 - hint: \`.update()\`)
- How do you sort a set? (hint: convert to list first with \`sorted()\`)
- How do you join list items into a string? (hint: \`", ".join(...)\`)

**Expected output format:**
\`\`\`
=== Contact Summary ===
Total Contacts: 4
Tags in System: colleague, family, friend, work
\`\`\`

---

## ✅ Complete Expected Output

When you run the complete program, you should see:

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

---

## 💡 Tips for Success

1. **Follow the steps in order** - Each step builds on the previous one
2. **Complete one step at a time** - Don't try to do everything at once
3. **Test as you go** - Run your code after each step to check if it works
4. **Use the code comments** - They tell you exactly what to do in each step
5. **Check the hints** if you get stuck - Click the "Show Hints" button
6. **Compare your output** - Make sure it matches the expected output exactly
7. **Review the chapters** - If you forget something, go back to the relevant chapter

**Remember:** This is a test of your understanding. Think carefully about each step!

**Good luck! You've got this! 🚀**
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


# Display tags in sorted order


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
