# Chapter 3.1: if Statement - Video Script
# 总时长：约 4-5 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "3.1 if Statement"
**配音**:
Welcome to Lesson 3.1: if Statement. Today we'll learn how to make our programs make decisions based on different conditions.

---

## [场景 2: 条件语句介绍] (40 秒)
**画面**: 决策流程图
**配音**:
In the world of programming, we often need the computer to make decisions.We set up certain conditions, and depending on whether those conditions are true or false, the program will run different pieces of code.For example, If the condition is true, run this block of code.If the condition is false, run another block of code, This kind of 'choose different actions based on whether something is true or false' structure is what we call conditional statements

---

## [场景 3: 实际操作 - 基本 if 语句] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
OK, Let's write our first if statement in the code editor.

(打字: age = 18)
Setting age to 18.

(打字: if age >= 18:)
and set the if statementthat age is greater than or equal to 18, colon.

(按 Enter, 自动缩进)
Notice Python automatically indents the next line. This indentation is crucial.

(打字:     print("You are an adult"))
Print "You are an adult". This line only runs if the condition is True.

(点击运行)
The message prints because 18 is greater than or equal to 18.

(修改: age = 16)
Let me change age to 16.

(运行)
Now nothing prints, because the condition is False. 16 is less than 18.

**操作时的代码**:
```python
age = 18
if age >= 18:
    print("You are an adult")

# Try with age = 16
age = 16
if age >= 18:
    print("You are an adult")
```

---

## [场景 4: if-else 语句] (30 秒)
**画面**: if-else 流程图
**配音**:
What if we want to do something when the condition is False? That's where else comes in. The else block runs when the if condition is False.

---

## [场景 5: 实际操作 - if-else] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's add an else block.

(打字: age = 16)
Age is 16.

(打字: if age >= 18:)
(Tab, 打字:     print("You are an adult"))
If 18 or older, print adult.

(打字: else:)
please pay attention that, there are no indentation for the else keyword.

(Tab, 打字:     print("You are not yet an adult"))
If the condition is False, print this message.

(运行)
Now we get "You are not yet an adult" because age is 16.

(修改: age = 20)
Let me change age to 20.

(运行)
Now we get "You are an adult" because the if condition is True.

**操作时的代码**:
```python
age = 16
if age >= 18:
    print("You are an adult")
else:
    print("You are not yet an adult")
```

---

## [场景 6: if-elif-else 语句] (40 秒)
**画面**: 多分支流程图
**配音**:
Sometimes we need more than two options. We can use elif, short for "else if", to check multiple conditions in sequence. Python checks each condition from top to bottom and executes the first one that's True.

---

## [场景 7: 实际操作 - if-elif-else] (100 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's create a grade calculator.

(打字: score = 85)
Score is 85.

(打字: if score >= 90:)
(Tab, 打字:     print("Excellent"))
If 90 or above, Excellent.

(打字: elif score >= 80:)
(Tab, 打字:     print("Good"))
Elif means else if. If score is 80 or above, Good.

(打字: elif score >= 60:)
(Tab, 打字:     print("Pass"))
Another elif for passing grade.

(打字: else:)
(Tab, 打字:     print("Fail"))
If none of the above, Fail.

(运行)
With score 85, we get "Good" because it's between 80 and 90.

(修改: score = 95)
Let's try 95.

(运行)
Excellent! The first condition was True.

(修改: score = 50)
And 50.

(运行)
Fail. None of the if or elif conditions were True.

**操作时的代码**:
```python
score = 85
if score >= 90:
    print("Excellent")
elif score >= 80:
    print("Good")
elif score >= 60:
    print("Pass")
else:
    print("Fail")
```

---

## [场景 8: 实际应用] (50 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's create a practical example: a simple login system.

(打字: username = "alice")
(打字: password = "secret123")
(打字: if username == "alice" and password == "secret123":)
(Tab, 打字:     print("Login successful!"))
(打字: else:)
(Tab, 打字:     print("Invalid credentials"))
(运行)
Login successful!

(修改: password = "wrong")
(运行)
Invalid credentials. The condition is False.

**操作时的代码**:
```python
username = "alice"
password = "secret123"

if username == "alice" and password == "secret123":
    print("Login successful!")
else:
    print("Invalid credentials")
```

---

## [场景 9: 结尾] (10 秒)
**画面**: 总结卡
**配音**:
Excellent work! You now know how to use if, else, and elif to make decisions in your programs. Practice creating different conditions, and I'll see you in the next lesson!

---
