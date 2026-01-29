# Chapter 3.2: Nested Conditionals - Video Script
# 总时长：约 4-5 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "3.2 Nested Conditionals"
**配音**:
Welcome to Lesson 3.2: Nested Conditionals. Today we'll learn how to put if statements inside other if statements to handle complex decision trees.

---

## [场景 2: 嵌套条件介绍] (30 秒)
**画面**: 嵌套决策树图示
**配音**:
In programming, some decisions depend on the outcome of previous conditions, forming a layered structure of logic. For example, you might first check whether it is a weekend; only if the answer is yes would you then proceed to check whether the weather is sunny. This technique of placing one if statement inside another is known as nested conditions (or nesting).

---

## [场景 3: 实际操作 - 基本嵌套] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
OK, Let's demo a simple nested condition in the code editor.

(打字: age = 25)
(打字: has_license = True)
(打字: if age >= 18:)
(Tab, 打字:     print("You are an adult"))
First, check if they're an adult.

(Tab, 打字:     if has_license:)
Inside the first if, we add another if. Notice the double indentation.

(Tab×2, 打字:         print("You can drive"))
This only runs if BOTH conditions are True.

(Tab, 打字:     else:)
(Tab×2, 打字:         print("You need a license"))
(打字: else:)
(Tab, 打字:     print("You are too young"))
(运行)
We see "You are an adult" and "You can drive" because both conditions are True.

(修改: has_license = False)
(运行)
Now we see "You are an adult" but "You need a license".

(修改: age = 16)
(运行)
With age 16, we only see "You are too young". The inner if never runs.

**操作时的代码**:
```python
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
```

---

## [场景 4: 实际操作 - 多层嵌套] (100 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's create a more complex example: a game character stat checker.

(打字: level = 15)
(打字: strength = 50)
(打字: has_sword = True)

(打字: if level >= 10:)
(Tab, 打字:     print("Entering intermediate zone"))
(Tab, 打字:     if strength >= 40:)
(Tab×2, 打字:         print("Strong enough for battle"))
(Tab×2, 打字:         if has_sword:)
(Tab×3, 打字:             print("Ready for boss fight!"))
(Tab×2, 打字:         else:)
(Tab×3, 打字:             print("Need a weapon"))
(Tab, 打字:     else:)
(Tab×2, 打字:         print("Need more training"))
(打字: else:)
(Tab, 打字:     print("Level too low"))
Three levels of nesting! Each level depends on the previous.

(运行)
All three messages print because all conditions are True.

**操作时的代码**:
```python
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
```

---

## [场景 5: 简化嵌套 - 使用 AND] (50 秒)
**画面**: 对比图示
**配音**:
Deep nesting can be hard to read. Sometimes we can simplify using logical operators. Instead of nesting multiple ifs, we can combine conditions with AND. Both approaches work, but the second is often cleaner.

---

## [场景 6: 实际操作 - 简化示例] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let me show you the difference.

(打字: # Nested version)
(打字: age = 25)
(打字: income = 50000)
(打字: if age >= 21:)
(Tab, 打字:     if income >= 30000:)
(Tab×2, 打字:         print("Loan approved"))
This is nested.

(打字: # Simplified version)
(打字: if age >= 21 and income >= 30000:)
(Tab, 打字:     print("Loan approved"))
This does the same thing but is cleaner.

(运行两者)
Both give the same result! Use AND when you're just checking multiple conditions. Use nesting when you need different actions at each level.

**操作时的代码**:
```python
# Nested version
age = 25
income = 50000
if age >= 21:
    if income >= 30000:
        print("Loan approved")

# Simplified version
if age >= 21 and income >= 30000:
    print("Loan approved")
```

---

## [场景 7: 实际应用 - 成绩系统] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's build a grade system with extra credit.

(打字: score = 85)
(打字: has_extra_credit = True)

(打字: if score >= 60:)
(Tab, 打字:     print("You passed!"))
(Tab, 打字:     if score >= 90:)
(Tab×2, 打字:         print("Excellent grade: A"))
(Tab, 打字:     elif score >= 80:)
(Tab×2, 打字:         if has_extra_credit:)
(Tab×3, 打字:             print("Good grade: A- (with extra credit)"))
(Tab×2, 打字:         else:)
(Tab×3, 打字:             print("Good grade: B"))
(打字: else:)
(Tab, 打字:     print("You failed"))

(运行)
With score 85 and extra credit, we get upgraded to A minus!

**操作时的代码**:
```python
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
    print("You failed")
```

---

## [场景 8: 结尾] (10 秒)
**画面**: 总结卡
**配音**:
Fantastic! You now know how to use nested conditionals for complex decision-making. Remember, keep nesting shallow when possible for cleaner code. See you in the next chapter!

---
