// Test 1: Comprehensive Project Challenge (Chapters 1-5)
export const test1 = {
  id: "test1",
  title: "Test 1: Student Grade Manager",
  subsections: [
    {
      id: "test1.1",
      title: "Project Challenge: Student Grade Manager",
      content: {
        practice: {
          checkOutput: true,
          description: `
# 🎯 Comprehensive Challenge: Build a Student Grade Manager!

## 📊 Project Overview

Welcome to your first comprehensive project challenge! This is **NOT** a regular lesson - it's a real-world project that tests everything you've learned from **Chapters 1-5**.

Your mission: Build a complete student grade management system that processes student data, calculates statistics, and generates a detailed report!

---

## 📚 What You'll Use (Chapters 1-5)

This project integrates ALL the skills you've learned:

- ✅ **Chapter 1**: Variables, data types, input/output, type conversion
- ✅ **Chapter 2**: Arithmetic operations, comparison operators
- ✅ **Chapter 3**: if/elif/else statements for grading
- ✅ **Chapter 4**: for loops to process multiple students
- ✅ **Chapter 5**: Lists to store names and scores

---

## 🎯 Project Requirements

Build a grade management system that can:

### Core Features:
1. **Store Student Data**: Use two parallel lists (names and scores)
2. **Calculate Statistics**: Average, highest, lowest scores
3. **Grade Assignment**: Convert scores to letter grades (A/B/C/D/F)
4. **Pass/Fail Status**: Determine if each student passed (≥60)
5. **Generate Report**: Display all students with grades and status
6. **Summary Statistics**: Show overall class performance

### Grading Scale:
- **A**: 90-100
- **B**: 80-89
- **C**: 70-79
- **D**: 60-69
- **F**: 0-59

### Pass/Fail Criteria:
- **PASS**: Score ≥ 60
- **FAIL**: Score < 60

---

## 📋 Expected Output

\`\`\`
=== Student Grade Manager ===

Processing 5 students...

==================================================
Student Grade Report
==================================================
1. Alice: 92 points [Grade A] - PASS
2. Bob: 78 points [Grade C] - PASS
3. Charlie: 85 points [Grade B] - PASS
4. David: 54 points [Grade F] - FAIL
5. Emma: 88 points [Grade B] - PASS

==================================================
Summary Statistics
==================================================
Total Students: 5
Average Score: 79.40
Highest Score: 92
Lowest Score: 54
Passed: 4
Failed: 1
Pass Rate: 80.0%
\`\`\`

---

## 💡 Step-by-Step Guide

### Step 1: Prepare Student Data
**Knowledge Used: Chapter 5.1 (Lists)**

Since we're in a browser environment, we'll use pre-defined lists instead of interactive input:

\`\`\`python
# Student data (simulating database or CSV import)
names = ["Alice", "Bob", "Charlie", "David", "Emma"]
scores = [92, 78, 85, 54, 88]
\`\`\`

### Step 2: Calculate Basic Statistics
**Knowledge Used: Chapter 2.1 (Arithmetic)**

\`\`\`python
average = sum(scores) / len(scores)
highest = max(scores)
lowest = min(scores)
\`\`\`

### Step 3: Count Passed Students
**Knowledge Used: Chapter 4.1 (for loop), Chapter 3.1 (if statement)**

\`\`\`python
passed = 0
for score in scores:
    if score >= 60:
        passed += 1
\`\`\`

### Step 4: Determine Letter Grade
**Knowledge Used: Chapter 3.2 (if/elif/else)**

Create logic to convert score to letter grade:

\`\`\`python
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"
\`\`\`

### Step 5: Display Student Report
**Knowledge Used: Chapter 4.1 (for loop with range), Chapter 1.3 (print), Chapter 2.3 (String operations)**

\`\`\`python
print("=" * 50)
print("Student Grade Report")
print("=" * 50)

for i in range(len(names)):
    name = names[i]
    score = scores[i]
    
    # Determine grade
    if score >= 90:
        grade = "A"
    elif score >= 80:
        grade = "B"
    elif score >= 70:
        grade = "C"
    elif score >= 60:
        grade = "D"
    else:
        grade = "F"
    
    # Determine status
    status = "PASS" if score >= 60 else "FAIL"
    
    print(f"{i+1}. {name}: {score} points [Grade {grade}] - {status}")
\`\`\`

### Step 6: Display Summary
**Knowledge Used: Chapter 1.3 (output formatting)**

\`\`\`python
print("\\n" + "=" * 50)
print("Summary Statistics")
print("=" * 50)
print(f"Total Students: {len(names)}")
print(f"Average Score: {average:.2f}")
print(f"Highest Score: {highest}")
print(f"Lowest Score: {lowest}")
print(f"Passed: {passed}")
print(f"Failed: {len(names) - passed}")
print(f"Pass Rate: {(passed/len(names)*100):.1f}%")
\`\`\`

---

## 💻 Important: Browser Environment Adaptation

**Note:** Since this runs in a browser, we use **pre-defined data lists** instead of interactive \`input()\`. This simulates loading student data from a file or database - a common real-world scenario!

**Benefits of this approach:**
- ✅ Demonstrates working with existing data (like CSV imports)
- ✅ Easy to test with different datasets
- ✅ Focuses on logic rather than input handling
- ✅ Compatible with browser Python environment

---

## 🔍 Testing Checklist

Make sure your program:
- ✅ Uses two parallel lists (names and scores)
- ✅ Calculates average correctly
- ✅ Finds highest and lowest scores
- ✅ Assigns correct letter grades (A/B/C/D/F)
- ✅ Counts passed students (score ≥ 60)
- ✅ Displays formatted report for all students
- ✅ Shows accurate summary statistics

---

## 🎨 Bonus Challenges (Optional)

If you finish early, try adding:
- Find students with perfect scores (100)
- Calculate grade distribution (how many A's, B's, etc.)
- Identify students who need improvement (score < 70)
- Display average as a letter grade
- Add class rank for each student

---

## 🌟 What This Tests

This comprehensive project tests your ability to:
- ✅ Work with parallel lists to manage related data
- ✅ Apply arithmetic operations for statistical calculations
- ✅ Use conditional logic for categorization (grading)
- ✅ Implement loops to process collections
- ✅ Format output professionally
- ✅ Combine multiple concepts into a cohesive program

**This is your chance to showcase everything you've learned! 🚀**
          `,
          hints: `
## 💡 Progressive Hints

### 🟢 Hint Level 1: Structure
Your program needs four main parts:
1. **Data Setup**: Create names and scores lists
2. **Statistics Calculation**: Calculate average, max, min, pass count
3. **Student Report**: Loop through students, determine grade and status
4. **Summary Display**: Show overall class statistics

### 🟡 Hint Level 2: Code Skeleton
\`\`\`python
# Student data
names = ["Alice", "Bob", "Charlie", "David", "Emma"]
scores = [92, 78, 85, 54, 88]

print("=== Student Grade Manager ===")
print(f"\\nProcessing {len(names)} students...")

# Calculate statistics
# (average, highest, lowest, passed)

# Display student report
print("\\n" + "=" * 50)
print("Student Grade Report")
print("=" * 50)
# Loop through each student

# Display summary
print("\\n" + "=" * 50)
print("Summary Statistics")
print("=" * 50)
# Print all statistics
\`\`\`

### 🟠 Hint Level 3: Key Code Blocks

**Calculate statistics:**
\`\`\`python
average = sum(scores) / len(scores)
highest = max(scores)
lowest = min(scores)

passed = 0
for score in scores:
    if score >= 60:
        passed += 1
\`\`\`

**Determine grade function:**
\`\`\`python
def get_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"
\`\`\`

**Display student (without function):**
\`\`\`python
for i in range(len(names)):
    score = scores[i]
    
    if score >= 90:
        grade = "A"
    elif score >= 80:
        grade = "B"
    elif score >= 70:
        grade = "C"
    elif score >= 60:
        grade = "D"
    else:
        grade = "F"
    
    status = "PASS" if score >= 60 else "FAIL"
    print(f"{i+1}. {names[i]}: {score} points [Grade {grade}] - {status}")
\`\`\`

### 🔴 Hint Level 4: Complete Statistics Section

\`\`\`python
print("\\n" + "=" * 50)
print("Summary Statistics")
print("=" * 50)
print(f"Total Students: {len(names)}")
print(f"Average Score: {average:.2f}")
print(f"Highest Score: {highest}")
print(f"Lowest Score: {lowest}")
print(f"Passed: {passed}")
print(f"Failed: {len(names) - passed}")
pass_rate = (passed / len(names)) * 100
print(f"Pass Rate: {pass_rate:.1f}%")
\`\`\`
          `,
          starterCode: `# Student data (predefined for browser environment)
names = ["Alice", "Bob", "Charlie", "David", "Emma"]
scores = [92, 78, 85, 54, 88]

print("=== Student Grade Manager ===")
print(f"\\nProcessing {len(names)} students...")

# Step 1: Calculate statistics


# Step 2: Display student report


# Step 3: Display summary statistics

`,
          solution: `# Student data (predefined for browser environment)
names = ["Alice", "Bob", "Charlie", "David", "Emma"]
scores = [92, 78, 85, 54, 88]

print("=== Student Grade Manager ===")
print(f"\\nProcessing {len(names)} students...")

# Step 1: Calculate statistics
average = sum(scores) / len(scores)
highest = max(scores)
lowest = min(scores)

# Count passed students
passed = 0
for score in scores:
    if score >= 60:
        passed += 1

# Step 2: Display student report
print("\\n" + "=" * 50)
print("Student Grade Report")
print("=" * 50)

for i in range(len(names)):
    name = names[i]
    score = scores[i]
    
    # Determine grade
    if score >= 90:
        grade = "A"
    elif score >= 80:
        grade = "B"
    elif score >= 70:
        grade = "C"
    elif score >= 60:
        grade = "D"
    else:
        grade = "F"
    
    # Determine status
    status = "PASS" if score >= 60 else "FAIL"
    
    print(f"{i+1}. {name}: {score} points [Grade {grade}] - {status}")

# Step 3: Display summary statistics
print("\\n" + "=" * 50)
print("Summary Statistics")
print("=" * 50)
print(f"Total Students: {len(names)}")
print(f"Average Score: {average:.2f}")
print(f"Highest Score: {highest}")
print(f"Lowest Score: {lowest}")
print(f"Passed: {passed}")
print(f"Failed: {len(names) - passed}")
print(f"Pass Rate: {(passed/len(names)*100):.1f}%")`,
          expectedOutput: `=== Student Grade Manager ===

Processing 5 students...

==================================================
Student Grade Report
==================================================
1. Alice: 92 points [Grade A] - PASS
2. Bob: 78 points [Grade C] - PASS
3. Charlie: 85 points [Grade B] - PASS
4. David: 54 points [Grade F] - FAIL
5. Emma: 88 points [Grade B] - PASS

==================================================
Summary Statistics
==================================================
Total Students: 5
Average Score: 79.40
Highest Score: 92
Lowest Score: 54
Passed: 4
Failed: 1
Pass Rate: 80.0%`
        }
      }
    }
  ]
};
