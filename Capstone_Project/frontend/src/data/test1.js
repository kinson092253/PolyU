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

## � Important: Browser Environment Adaptation

**Note:** Since this runs in a browser, we use **pre-defined data lists** instead of interactive \`input()\`. This simulates loading student data from a file or database - a common real-world scenario!

---

## 📝 Step-by-Step Guide

Follow the steps in the code editor ONE BY ONE. This guide explains WHAT to do and WHY, but YOU need to write the code!

---

### **Setup: Student Data (Already Provided)**
**Knowledge Used: Chapter 5.1 (Lists)**

**Good news:** The data and header are already provided for you!

\`\`\`python
names = ["Alice", "Bob", "Charlie", "David", "Emma"]
scores = [92, 78, 85, 54, 88]

print("=== Student Grade Manager ===")
print(f"\\nProcessing {len(names)} students...")
\`\`\`

These are **parallel lists** - index 0 of both lists refer to the same student (Alice has 92 points).

Now follow the 3 steps in the code editor:

---

### **Step 1: Calculate Statistics**
**Knowledge Used: Chapter 2.1 (Arithmetic), Chapter 5.2 (List Methods), Chapter 4.1 (For Loop)**

**What to calculate:**
1. **Average score**: Sum of all scores divided by number of students
2. **Highest score**: The maximum value in the scores list
3. **Lowest score**: The minimum value in the scores list
4. **Number of passed students**: Count how many students have score ≥ 60

**Think about:**
- How do you get the sum of a list? (hint: \`sum()\` function)
- How do you get the length of a list? (hint: \`len()\` function)
- How do you find the maximum value in a list? (hint: \`max()\` function)
- How do you find the minimum value in a list? (hint: \`min()\` function)
- How do you count items that meet a condition? (hint: Chapter 4.1 - for loop + Chapter 3.1 - if statement)



---

### **Step 2: Display Student Report**
**Knowledge Used: Chapter 1.3 (Output), Chapter 2.3 (String Operations), Chapter 4.1 (For Loop), Chapter 3.2 (if/elif/else)**

This step includes TWO parts:

**Part A: Print the report header**
- A blank line
- A line of 50 equal signs (=)
- "Student Grade Report"
- Another line of 50 equal signs (=)

**Hint:** You can create repeated characters using \`"=" * 50\`

**Part B: Display each student's information**

Loop through all students and for each one:
1. Get the student's name and score using the same index
2. Determine their letter grade based on the score
3. Determine their pass/fail status
4. Print in the format: "X. Name: Score points [Grade Y] - STATUS"

**Think about:**
- How do you loop through list indices? (hint: \`for i in range(len(names)):\`)
- How do you access list items by index? (hint: \`names[i]\`, \`scores[i]\`)
- How do you determine the grade? (hint: if/elif/else chain from Chapter 3.2)
- How do you determine pass/fail? (hint: conditional expression or if/else)

**Grade determination logic:**
\`\`\`
if score >= 90:
    grade is "A"
else if score >= 80:
    grade is "B"
else if score >= 70:
    grade is "C"
else if score >= 60:
    grade is "D"
else:
    grade is "F"
\`\`\`

**Status logic:**
\`\`\`
if score >= 60:
    status is "PASS"
else:
    status is "FAIL"
\`\`\`

**Output format example:**
\`\`\`
1. Alice: 92 points [Grade A] - PASS
\`\`\`

**Hint:** Use f-string formatting and remember that list indices start at 0, but we want to display starting from 1!

---

### **Step 3: Display Summary Statistics**
**Knowledge Used: Chapter 1.3 (Output Formatting), Chapter 2.1 (Arithmetic)**

**What to display:**
1. A blank line
2. A line of 50 equal signs
3. "Summary Statistics"
4. Another line of 50 equal signs
5. All the following statistics (one per line):
   - Total Students: [count]
   - Average Score: [average with 2 decimal places]
   - Highest Score: [highest]
   - Lowest Score: [lowest]
   - Passed: [number of students who passed]
   - Failed: [number of students who failed]
   - Pass Rate: [percentage with 1 decimal place]%

**Think about:**
- How do you format a number to 2 decimal places? (hint: f-string with \`:.2f\`)
- How do you calculate the number of failed students? (hint: total - passed)
- How do you calculate the pass rate percentage? (hint: (passed / total) * 100)
- How do you format percentage to 1 decimal place? (hint: \`:.1f\`)

**Use the statistics you calculated in Step 1!**

---

## ✅ Complete Expected Output

When you run the complete program, you should see:

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

## 🔍 Testing Checklist

Make sure your program:
- ✅ Uses two parallel lists (names and scores)
- ✅ Calculates average correctly (79.40)
- ✅ Finds highest (92) and lowest (54) scores
- ✅ Assigns correct letter grades for all students
- ✅ Counts passed students correctly (4)
- ✅ Displays formatted report for all 5 students
- ✅ Shows accurate summary statistics
- ✅ Output matches expected format exactly

---

## 💡 Tips for Success

1. **Work step by step** - Don't try to do everything at once
2. **Test each part** - Run your code after completing each step
3. **Check your output** - Compare with the expected output above
4. **Use the hints** - They're there if you get stuck
5. **Review chapters** - If you forget syntax, go back to the relevant chapter
6. **Pay attention to formatting** - Spacing and decimal places matter!

---

## 🎨 Bonus Challenges (Optional)

If you finish early and want extra practice, try adding:
- Find students with perfect scores (100)
- Calculate grade distribution (how many A's, B's, etc.)
- Identify students who need improvement (score < 70)
- Display the class average as a letter grade
- Add class rank for each student (1st, 2nd, 3rd, etc.)

---

## 🌟 What This Tests

This comprehensive project tests your ability to:
- ✅ Work with parallel lists to manage related data
- ✅ Apply arithmetic operations for statistical calculations
- ✅ Use conditional logic for categorization (grading)
- ✅ Implement loops to process collections
- ✅ Format output professionally
- ✅ Combine multiple concepts into a cohesive program

**Remember:** This is a test of your understanding. Think carefully and take your time!

**Good luck! You've got this! 🚀**
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
# Calculate average, highest, lowest


# Count passed students


# Step 2: Display student report
# Print report header


# Loop through each student and display their information


# Step 3: Display summary statistics
# Print summary header


# Display all statistics


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
