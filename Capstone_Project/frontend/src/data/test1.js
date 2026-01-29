// Test 1: Comprehensive Test (Chapters 1-5)
export const test1 = {
  id: "test1",
  title: "Test 1: Student Grade Manager",
  subsections: [
    {
      id: "test1.1",
      title: "Test 1: Build a Student Grade Manager",
      content: {
        lecture: `
# 🎯 Comprehensive Test 1: Student Grade Manager

## Overview

This test evaluates your understanding of **Chapters 1-5**. You will build a student grade management system that demonstrates your ability to integrate multiple Python concepts in a practical application.

## 📚 Knowledge Required

This test will assess your mastery of:

- ✅ **Chapter 1**: Variables, Data Types, Input/Output
- ✅ **Chapter 2**: Arithmetic Operations, Comparison Operations
- ✅ **Chapter 3**: Conditional Statements (if/elif/else)
- ✅ **Chapter 4**: Loops (for loop and while loop)
- ✅ **Chapter 5**: Lists (storing and processing data)

## 🎯 Project Requirements

Create a grade management program that can:

1. Get student names and scores through interactive input
2. Store multiple students' data in lists
3. Calculate average score
4. Find highest and lowest scores
5. Count how many students passed (score ≥ 60)
6. Display all students with their grades and pass/fail status
7. Show summary statistics

## 📋 Detailed Steps

### Step 1: Get Number of Students
**Knowledge Used: Chapter 1.3 (Input), Chapter 1.2 (Type Conversion)**

Ask the user how many students they want to enter.

\`\`\`python
num_students = int(input("How many students? "))
\`\`\`

### Step 2: Create Empty Lists
**Knowledge Used: Chapter 5.1 (List Basics)**

Create two lists to store student names and scores:

\`\`\`python
names = []
scores = []
\`\`\`

### Step 3: Input Student Data
**Knowledge Used: Chapter 4.1 (for loop), Chapter 1.3 (Input), Chapter 5.2 (List Methods)**

Use a for loop to get each student's name and score:

\`\`\`python
for i in range(num_students):
    name = input(f"Enter student {i+1} name: ")
    score = int(input(f"Enter {name}'s score: "))
    names.append(name)
    scores.append(score)
\`\`\`

### Step 4: Calculate Statistics
**Knowledge Used: Chapter 2.1 (Arithmetic), Chapter 4.1 (for loop)**

Calculate important statistics:
- Total score (use sum() or loop)
- Average score (total / count)
- Highest score (use max())
- Lowest score (use min())
- Pass count (scores >= 60)

\`\`\`python
average = sum(scores) / len(scores)
highest = max(scores)
lowest = min(scores)

# Count passed students
passed = 0
for score in scores:
    if score >= 60:
        passed += 1
\`\`\`

### Step 5: Determine Grade Level
**Knowledge Used: Chapter 3.1 & 3.2 (Conditional Statements)**

Create a function logic to convert score to grade:
- A: 90-100
- B: 80-89
- C: 70-79
- D: 60-69
- F: 0-59

\`\`\`python
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
# ... and so on
\`\`\`

### Step 6: Display Student List
**Knowledge Used: Chapter 4.1 (for loop with index), Chapter 1.3 (Output), Chapter 2.3 (String formatting)**

Display each student with their score, grade, and status:

\`\`\`python
print("\\n" + "="*50)
print("Student Grade Report")
print("="*50)

for i in range(len(names)):
    name = names[i]
    score = scores[i]
    
    # Determine grade
    if score >= 90:
        grade = "A"
    elif score >= 80:
        grade = "B"
    # ... continue for other grades
    
    # Determine status
    status = "PASS" if score >= 60 else "FAIL"
    
    print(f"{i+1}. {name}: {score} points [Grade {grade}] - {status}")
\`\`\`

### Step 7: Display Summary Statistics
**Knowledge Used: Chapter 1.3 (Output), Chapter 2.1 (Arithmetic)**

Show the summary:

\`\`\`python
print("\\n" + "="*50)
print("Summary Statistics")
print("="*50)
print(f"Total Students: {len(names)}")
print(f"Average Score: {average:.2f}")
print(f"Highest Score: {highest}")
print(f"Lowest Score: {lowest}")
print(f"Passed: {passed}")
print(f"Failed: {len(names) - passed}")
print(f"Pass Rate: {(passed/len(names)*100):.1f}%")
\`\`\`

## 🎨 Expected Program Flow

\`\`\`
How many students? 3
Enter student 1 name: Alice
Enter Alice's score: 85
Enter student 2 name: Bob
Enter Bob's score: 92
Enter student 3 name: Charlie
Enter Charlie's score: 58

==================================================
Student Grade Report
==================================================
1. Alice: 85 points [Grade B] - PASS
2. Bob: 92 points [Grade A] - PASS
3. Charlie: 58 points [Grade F] - FAIL

==================================================
Summary Statistics
==================================================
Total Students: 3
Average Score: 78.33
Highest Score: 92
Lowest Score: 58
Passed: 2
Failed: 1
Pass Rate: 66.7%
\`\`\`

## 💡 Tips

1. **Start with Input**: First get the data correctly
2. **Use Lists Parallel**: Keep names[i] and scores[i] aligned
3. **Calculate Step by Step**: Do one calculation at a time
4. **Test with Small Numbers**: Start with 2-3 students
5. **Format Output**: Use f-strings for clean output

## ⚠️ Common Challenges

- **Index Management**: Make sure names[i] matches scores[i]
- **Type Conversion**: Remember to convert score input to int
- **Pass Counting**: Use a counter variable in a loop
- **Grade Logic**: Use if/elif carefully for correct ranges

## 🌟 What This Tests

This comprehensive exercise tests your ability to:
- ✅ Handle user input and type conversion
- ✅ Use lists to store related data
- ✅ Implement loops for repetitive tasks
- ✅ Apply conditional logic for grading
- ✅ Perform calculations and comparisons
- ✅ Format and display results professionally

Good luck! 🚀
        `,
        test: {
          question: "In the Student Grade Manager, which approach is best for storing student names and their corresponding scores?\n\n```python\noption_a = \"Alice,Bob,Charlie\" and \"85,92,58\"\noption_b = names = [\"Alice\", \"Bob\"], scores = [85, 92]\noption_c = students = \"Alice:85,Bob:92\"\n```",
          options: [
            "Two strings with comma-separated values (option_a)",
            "Two separate lists with matching indices (option_b)",
            "One combined string (option_c)",
            "Multiple individual variables"
          ],
          correctAnswer: 1,
          explanation: "Using two separate lists (option_b) is the best approach because: (1) names[i] and scores[i] naturally correspond to the same student, (2) lists allow easy addition of new students, (3) you can perform operations on scores separately (like sum, max, min), and (4) the code is clean and maintainable."
        },
        practice: {
          checkOutput: false,
          description: `
## 🎯 Your Task: Build a Simplified Grade Manager

Build a simplified version of the Student Grade Manager that demonstrates the core concepts. This practice focuses on the essential functionality without the full interactive menu.

**Requirements:**

1. Create two lists: \`names\` and \`scores\`
2. Use \`input()\` to ask "How many students? "
3. Use a for loop to get each student's name and score
4. Calculate:
   - Average score
   - Number of students who passed (score >= 60)
5. Display each student with their score and status (PASS/FAIL)
6. Display summary: total students, average, and passed count

**Example Interaction:**
\`\`\`
How many students? 3
Enter student 1 name: Alice
Enter score: 85
Enter student 2 name: Bob  
Enter score: 72
Enter student 3 name: Charlie
Enter score: 55

=== Student Results ===
Alice: 85 - PASS
Bob: 72 - PASS
Charlie: 55 - FAIL

=== Summary ===
Total Students: 3
Average Score: 70.67
Passed: 2
\`\`\`
          `,
          hints: `**Hints:**

- Use \`int(input())\` for numbers
- Use \`for i in range(num_students):\` to loop  
- Calculate average: \`sum(scores) / len(scores)\`
- Use another loop to count passed students
- Use \`for i in range(len(names)):\` to display results
`,
          starterCode: `# Step 1: Ask how many students


# Step 2: Create empty lists for names and scores


# Step 3: Loop to get student data


# Step 4: Calculate statistics


# Step 5: Display results


# Step 6: Display summary

`,
          solution: `# Step 1: Ask how many students
num_students = int(input("How many students? "))

# Step 2: Create empty lists for names and scores
names = []
scores = []

# Step 3: Loop to get student data
for i in range(num_students):
    name = input(f"Enter student {i+1} name: ")
    score = int(input("Enter score: "))
    names.append(name)
    scores.append(score)

# Step 4: Calculate statistics
average = sum(scores) / len(scores)

passed = 0
for score in scores:
    if score >= 60:
        passed += 1

# Step 5: Display results
print("\\n=== Student Results ===")
for i in range(len(names)):
    status = "PASS" if scores[i] >= 60 else "FAIL"
    print(f"{names[i]}: {scores[i]} - {status}")

# Step 6: Display summary
print("\\n=== Summary ===")
print(f"Total Students: {num_students}")
print(f"Average Score: {average:.2f}")
print(f"Passed: {passed}")`
        }
      }
    }
  ]
};
