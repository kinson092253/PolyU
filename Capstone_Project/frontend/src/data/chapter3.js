// Chapter 3: Conditional Statements
// LAST UPDATED: 2026-01-18 23:45 - Fixed practice starterCode
export const chapter3 = {
  id: 3,
  title: "Chapter 3: Conditional Statements",
  subsections: [
    {
      id: "3.1",
      title: "3.1 if Statement",
      content: {
        lecture: `
# Conditional Statements

Conditional statements allow programs to respond differently to different situations.

## if Statement

\`\`\`python
age = 18

if age >= 18:
    print("You are an adult")
\`\`\`

## if-else Statement

\`\`\`python
age = 16

if age >= 18:
    print("You are an adult")
else:
    print("You are not yet an adult")
\`\`\`

## if-elif-else Statement

\`\`\`python
score = 85

if score >= 90:
    print("Excellent")
elif score >= 80:
    print("Good")
elif score >= 60:
    print("Pass")
else:
    print("Fail")
\`\`\`

## Comparison Operators

- \`==\` Equal to
- \`!=\` Not equal to
- \`>\` Greater than
- \`<\` Less than
- \`>=\` Greater than or equal to
- \`<=\` Less than or equal to
        `,
        test: {
          question: "What will the following code output?\n\n```python\nx = 10\nif x > 5:\n    print('A')\nelif x > 8:\n    print('B')\nelse:\n    print('C')\n```",
          options: [
            "A",
            "B",
            "C",
            "A and B"
          ],
          correctAnswer: 0,
          explanation: "Although both x > 5 and x > 8 are true, the if-elif-else statement only executes the first true condition branch. Since x > 5 is checked first and is true, it outputs 'A' and does not check the subsequent elif."
        },
        practice: {
          description: `
## Exercise: Determine Odd or Even

**Task**:
Write a program to determine if a number is odd or even.

**Output Format**:
- If the number is even, output: "[number] is even"
- If the number is odd, output: "[number] is odd"

Given: number = 7

**Hints**:
- An even number divided by 2 has a remainder of 0
- Use the % operator to get the remainder
          `,
          starterCode: `number = 7

# Write your logic here
`,
          solution: `number = 7

if number % 2 == 0:
    print(f"{number} is even")
else:
    print(f"{number} is odd")`,
          expectedOutput: "7 is odd"
        }
      }
    },
    {
      id: "3.2",
      title: "3.2 Nested Conditionals",
      content: {
        lecture: `
# Nested Conditionals

Nested conditionals are if statements inside other if statements. This allows you to handle complex decision trees where one decision depends on another.

## What are Nested Conditionals?

Sometimes decisions depend on other decisions. For example, you might check if it's a weekend, and then check if it's sunny. This creates a hierarchy of conditions. We call this nesting, where one if statement is inside another.

## Basic Nested Structure

\`\`\`python
age = 25
has_license = True

if age >= 18:
    print("You are an adult")
    if has_license:
        print("You can drive")
    else:
        print("You need a license")
else:
    print("You are too young")

# Output:
# You are an adult
# You can drive
\`\`\`

## Understanding Indentation

Each nested level requires additional indentation. Python uses indentation to understand the structure:

\`\`\`python
if condition1:
    # First level - 1 indent
    print("First condition is True")
    if condition2:
        # Second level - 2 indents
        print("Second condition is also True")
        if condition3:
            # Third level - 3 indents
            print("All conditions are True")
\`\`\`

## Multiple Levels of Nesting

You can nest if statements up to multiple levels:

\`\`\`python
level = 15
strength = 50
has_sword = True

if level >= 10:
    print("Entering intermediate zone")
    if strength >= 40:
        print("Strong enough for battle")
        if has_sword:
            print("Ready for boss fight!")
        else:
            print("Need a weapon")
    else:
        print("Need more training")
else:
    print("Level too low")

# Output:
# Entering intermediate zone
# Strong enough for battle
# Ready for boss fight!
\`\`\`

## Nested Conditionals with elif

You can combine nested if statements with elif chains:

\`\`\`python
score = 85
has_extra_credit = True

if score >= 60:
    print("You passed!")
    if score >= 90:
        print("Excellent grade: A")
    elif score >= 80:
        if has_extra_credit:
            print("Good grade: A- (with extra credit)")
        else:
            print("Good grade: B")
    else:
        print("Grade: C")
else:
    print("You failed")

# Output:
# You passed!
# Good grade: A- (with extra credit)
\`\`\`

## When to Use Nesting vs AND

Sometimes you can simplify nested conditionals using logical operators. Both approaches work, but choose based on your needs:

### Nested Version:
\`\`\`python
age = 25
income = 50000

if age >= 21:
    if income >= 30000:
        print("Loan approved")
\`\`\`

### Simplified with AND:
\`\`\`python
age = 25
income = 50000

if age >= 21 and income >= 30000:
    print("Loan approved")
\`\`\`

**When to use nesting:**
- When you need different actions at each level
- When inner conditions only matter if outer conditions are True
- When the logic is naturally hierarchical

**When to use AND:**
- When you're just checking multiple conditions
- When all conditions are equally important
- When you want cleaner, simpler code

## Best Practices

1. **Keep nesting shallow** - Too many levels (>3) make code hard to read
2. **Use meaningful variable names** - Makes nested logic clearer
3. **Add comments** - Explain complex nested logic
4. **Consider simplification** - Use AND/OR when appropriate
5. **Consistent indentation** - Use 4 spaces per level
        `,
        test: {
          question: "What will be the output of the following code?\n\n\`\`\`python\nage = 16\nhas_license = True\n\nif age >= 18:\n    if has_license:\n        print('Can drive')\n    else:\n        print('Need license')\nelse:\n    print('Too young')\n\`\`\`",
          options: [
            "Can drive",
            "Need license",
            "Too young",
            "No output"
          ],
          correctAnswer: 2,
          explanation: "Since age (16) is less than 18, the first condition 'age >= 18' is False. The program goes to the else block and prints 'Too young'. The inner nested conditions are never evaluated because the outer condition failed."
        },
        practice: {
          description: `## Exercise: Grade Calculator with Extra Credit

**Task**: 
Create a nested conditional system that:
1. Check if score >= 60 (passing grade)
2. If passing:
   - If score >= 90: print "Grade: A"
   - Else if score >= 80:
     - If has_extra_credit == True: print "Grade: A- (with extra credit)"
     - Else: print "Grade: B"
   - Else: print "Grade: C"
3. If not passing: print "Grade: F"

Test with: score = 85, has_extra_credit = True

**Expected Output**:
\`\`\`
Grade: A- (with extra credit)
\`\`\`

**Hints**:
- First check if passing (>= 60)
- Use nested if-elif inside the passing block
- The extra credit check is nested inside the 80-89 range
- Pay attention to indentation levels`,
          starterCode: `score = 85
has_extra_credit = True

# Write your nested conditionals here
`,
          solution: `score = 85
has_extra_credit = True

if score >= 60:
    print("You passed!")
    if score >= 90:
        print("Grade: A")
    elif score >= 80:
        if has_extra_credit:
            print("Grade: A- (with extra credit)")
        else:
            print("Grade: B")
    else:
        print("Grade: C")
else:
    print("Grade: F")`,
          expectedOutput: "Grade: A- (with extra credit)"
        }
      }
    }
  ]
};
