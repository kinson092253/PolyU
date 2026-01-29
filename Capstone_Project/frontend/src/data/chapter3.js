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
    },
    {
      id: "3.3",
      title: "3.3 Logical Operators",
      content: {
        lecture: `
# Logical Operators

Logical operators allow you to combine multiple conditions in a single if statement, making your code more concise and powerful.

## The Three Logical Operators

Python has three main logical operators:

1. **\`and\`** - Returns True if ALL conditions are True
2. **\`or\`** - Returns True if AT LEAST ONE condition is True
3. **\`not\`** - Reverses the boolean value (True becomes False, False becomes True)

## The AND Operator

The \`and\` operator requires ALL conditions to be True.

\`\`\`python
age = 25
has_ticket = True
has_id = True

if age >= 18 and has_ticket and has_id:
    print("Entry allowed")
else:
    print("Entry denied")

# Output: Entry allowed
# (All conditions are True)
\`\`\`

### AND Truth Table

| Condition 1 | Condition 2 | Result |
|------------|------------|--------|
| True       | True       | True   |
| True       | False      | False  |
| False      | True       | False  |
| False      | False      | False  |

### Key Point: ALL conditions must be True

\`\`\`python
age = 25
has_ticket = True
has_id = False

if age >= 18 and has_ticket and has_id:
    print("Entry allowed")
else:
    print("Entry denied")

# Output: Entry denied
# (One condition is False, so AND is False)
\`\`\`

## The OR Operator

The \`or\` operator returns True if AT LEAST ONE condition is True.

\`\`\`python
is_admin = False
is_moderator = True
is_owner = False

if is_admin or is_moderator or is_owner:
    print("Can edit content")
else:
    print("Cannot edit")

# Output: Can edit content!
# (At least one condition is True)
\`\`\`

### OR Truth Table

| Condition 1 | Condition 2 | Result |
|------------|------------|--------|
| True       | True       | True   |
| True       | False      | True   |
| False      | True       | True   |
| False      | False      | False  |

### Key Point: Only ONE condition needs to be True

\`\`\`python
is_admin = False
is_moderator = False
is_owner = False

if is_admin or is_moderator or is_owner:
    print("Can edit content")
else:
    print("Cannot edit")

# Output: Cannot edit
# (All conditions are False, so OR is False)
\`\`\`

## The NOT Operator

The \`not\` operator reverses a boolean value.

\`\`\`python
is_raining = False

if not is_raining:
    print("You can go outside without umbrella")
else:
    print("Bring an umbrella")

# Output: You can go outside without umbrella
\`\`\`

### NOT Truth Table

| Original | NOT Result |
|----------|-----------|
| True     | False     |
| False    | True      |

## Combining Logical Operators

You can combine multiple logical operators in one condition:

\`\`\`python
age = 20
is_student = True
has_id = True

if (age >= 18 and age < 65) and (is_student or has_id):
    print("Discount applied!")
else:
    print("Regular price")

# Output: Discount applied!
\`\`\`

## Order of Operations

Python evaluates logical operators in this order:
1. \`not\` (highest priority)
2. \`and\`
3. \`or\` (lowest priority)

\`\`\`python
# Without parentheses
result = True or False and False
print(result)  # True (and is evaluated first)

# With parentheses for clarity
result = (True or False) and False
print(result)  # False (different result!)
\`\`\`

**Best Practice**: Use parentheses to make your logic clear!

## Short-Circuit Evaluation

Python uses "short-circuit" evaluation for efficiency:

### AND Short-Circuit
If the first condition is False, Python doesn't check the rest.

\`\`\`python
x = 0
if x != 0 and 10 / x > 1:
    print("This won't cause division by zero error")
# x != 0 is False, so the second part is never evaluated
\`\`\`

### OR Short-Circuit
If the first condition is True, Python doesn't check the rest.

\`\`\`python
is_admin = True
if is_admin or expensive_check():
    print("Access granted!")
# is_admin is True, so expensive_check() is never called
\`\`\`

## Practical Examples

### Example 1: Movie Ticket Eligibility
\`\`\`python
age = 10
has_adult = True
money = 15
sold_out = False

if (age >= 13 or has_adult) and money >= 12 and not sold_out:
    print("Can buy ticket!")
else:
    print("Cannot buy ticket")

# Output: Can buy ticket!
\`\`\`

### Example 2: Access Control
\`\`\`python
is_employee = True
has_badge = True

if is_employee and has_badge:
    print("Access granted to building")
else:
    print("Please check in at reception")

# Output: Access granted to building
\`\`\`

### Example 3: Weather Decision
\`\`\`python
temperature = 28
is_sunny = True
is_raining = False

if temperature > 25 and is_sunny and not is_raining:
    print("Perfect weather for outdoor activities!")
elif temperature > 15 and not is_raining:
    print("Good weather for a walk")
else:
    print("Indoor activities recommended")

# Output: Perfect weather for outdoor activities!
\`\`\`

## Best Practices

1. **Use parentheses** for complex conditions to make logic clear
2. **Keep conditions simple** - break complex logic into variables
3. **Use meaningful names** for boolean variables (is_valid, has_permission)
4. **Comment complex logic** to explain your reasoning
5. **Consider readability** over brevity

## Simplifying Complex Conditions

Instead of complex inline conditions:
\`\`\`python
if (age >= 18 and age < 65) and (is_citizen or has_work_permit) and not is_banned:
    print("Eligible")
\`\`\`

Break into clear boolean variables:
\`\`\`python
is_working_age = age >= 18 and age < 65
has_legal_status = is_citizen or has_work_permit
is_eligible = is_working_age and has_legal_status and not is_banned

if is_eligible:
    print("Eligible")
\`\`\`

## Summary

- **\`and\`** requires ALL conditions to be True
- **\`or\`** requires AT LEAST ONE condition to be True
- **\`not\`** reverses the boolean value
- Use parentheses to control evaluation order
- Python uses short-circuit evaluation for efficiency
- Break complex conditions into named variables for clarity
        `,
        test: {
          question: "What will be the output of the following code?\n\n\`\`\`python\nx = 10\ny = 5\nz = 20\n\nif x > y or x > z and y < z:\n    print('Condition A')\nelse:\n    print('Condition B')\n\`\`\`",
          options: [
            "Condition A",
            "Condition B",
            "Error",
            "No output"
          ],
          correctAnswer: 0,
          explanation: "Due to operator precedence, 'and' is evaluated before 'or'. So the expression becomes: 'x > y or (x > z and y < z)'. Breaking it down: x > y is True (10 > 5), so the entire OR expression is True due to short-circuit evaluation. The output is 'Condition A'."
        },
        practice: {
          description: `## Exercise: Movie Ticket Eligibility

**Task**: 
Create a program that determines if someone can buy a movie ticket using logical operators.

Requirements:
- age: person's age
- has_adult: whether they are with an adult (True/False)
- money: amount of money they have
- sold_out: whether the movie is sold out (True/False)

Rules:
1. Must be 13 or older, OR must have an adult with them
2. Must have at least $12 for the ticket
3. Movie must not be sold out

Print "Can buy ticket!" if all conditions are met, otherwise print "Cannot buy ticket"

Test with: age = 10, has_adult = True, money = 15, sold_out = False

**Expected Output**:
\`\`\`
Can buy ticket!
\`\`\`

**Hints**:
- Use parentheses to group the age OR has_adult condition
- Combine all three requirements with AND
- Use NOT for the sold_out check
- Think about: (age_condition or adult_condition) and money_condition and not sold_out_condition`,
          starterCode: `age = 10
has_adult = True
money = 15
sold_out = False

# Write your logical operators here
`,
          solution: `age = 10
has_adult = True
money = 15
sold_out = False

if (age >= 13 or has_adult) and money >= 12 and not sold_out:
    print("Can buy ticket!")
else:
    print("Cannot buy ticket")`,
          expectedOutput: "Can buy ticket!"
        }
      }
    }
  ]
};
