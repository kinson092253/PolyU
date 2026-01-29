# Chapter 3.3: Logical Operators - Video Script
# 总时长：约 4-5 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "3.3 Logical Operators"
**配音**:
Welcome to Lesson 3.3: Logical Operators. We'll learn how to combine multiple conditions to create more complex decision-making logic.

---

## [场景 2: 逻辑运算符回顾] (30 秒)
**画面**: AND, OR, NOT 图示
**配音**:
We've already seen logical operators briefly. Let's dive deeper. AND requires all conditions to be True. OR needs at least one condition to be True. And NOT inverts a boolean value. These operators are essential for creating sophisticated conditional logic.

---

## [场景 3: 实际操作 - AND 运算符详解] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
Let's explore AND in depth.

(打字: age = 25)
(打字: has_ticket = True)
(打字: has_id = True)
defining the age equal to 25, has ticket is true, and has id is true.
then We're checking if someone can enter a venue. They need to be 18 or older, have a ticket, and have ID.
write down the if condition that age must greater or equal to 18 and has ticket and has id. if condition is true, print entry allowed, else entry denied
(打字: if age >= 18 and has_ticket and has_id:)
(Tab, 打字:     print("Entry allowed"))
(打字: else:)
(Tab, 打字:     print("Entry denied"))
(运行)
run the code, since all condition is ture, so the output is Entry allowed!

(修改: has_id = False)
What if they forget their ID?

(运行)
Entry denied. Even though age and ticket are okay, ALL conditions must be True for AND.

(修改: age = 16, has_id = True)
What about someone underage?

(运行)
Entry denied again. One False condition makes the entire AND expression False.

**操作时的代码**:
```python
age = 25
has_ticket = True
has_id = True

if age >= 18 and has_ticket and has_id:
    print("Entry allowed")
else:
    print("Entry denied")
```

---

## [场景 4: 实际操作 - OR 运算符详解] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Now let's look at OR operator.

(打字: is_admin = False)
(打字: is_moderator = True)
(打字: is_owner = False)
defining is admin to false, is moderator to true and is owner to false.
then set the if condition for Checking someone has permission to edit or not.
if the condition is true, print can edit content, otherwise print connot edit.
(打字: if is_admin or is_moderator or is_owner:)
(Tab, 打字:     print("Can edit content"))
(打字: else:)
(Tab, 打字:     print("Cannot edit"))
(运行)
let's run the code, output is Can edit! Because moderator is True. With OR, just one True is enough.

(修改所有为 False)
What if all are False?

(运行)
Cannot edit. With OR, at least one must be True.

**操作时的代码**:
```python
is_admin = False
is_moderator = True
is_owner = False

if is_admin or is_moderator or is_owner:
    print("Can edit content")
else:
    print("Cannot edit")
```

---

## [场景 5: 实际操作 - NOT 运算符] (60 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
finally, let's demo the NOT operator, it is useful for checking opposites.

(打字: is_banned = False)
(打字: if not is_banned:)
(Tab, 打字:     print("Welcome!"))
(打字: else:)
(Tab, 打字:     print("Access denied"))
defining is banned to false
if not is banned, print welcome. NOT is banned means the user is not banned. if is banned, print access denied


(运行)
running the code, output is Welcome! Because is banned is False, and NOT False equals True.

(修改: is_banned = True)
(运行)
what if change is banned to true and run it again.
output is Access denied. since NOT True equals False.

**操作时的代码**:
```python
is_banned = False
if not is_banned:
    print("Welcome!")
else:
    print("Access denied")
```

---

## [场景 6: 组合逻辑运算符] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's combine AND, OR, and NOT together.

(打字: age = 25)
(打字: is_student = True)
(打字: has_id = True)
(打字: is_banned = False)
A complex condition: eligible for discount if student with ID, or senior, and not banned.

(打字: if (is_student and has_id) or (age >= 65) and not is_banned:)
(Tab, 打字:     print("Eligible for discount"))
(打字: else:)
(Tab, 打字:     print("Regular price"))
Parentheses help group conditions clearly.

(运行)
Eligible! Is student and has ID are both True, and not banned.

**操作时的代码**:
```python
age = 25
is_student = True
has_id = True
is_banned = False

if (is_student and has_id or age >= 65) and not is_banned:
    print("Eligible for discount")
else:
    print("Regular price")
```

---

## [场景 7: 实际应用 - 表单验证] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's create a form validation example.

(打字: username = "alice123")
(打字: password = "pass1234")
(打字: email = "alice@email.com")
(打字: age = 20)

(打字: if len(username) >= 5 and len(password) >= 8 and "@" in email and age >= 18:)
(Tab, 打字:     print("Registration successful!"))
(打字: else:)
(Tab, 打字:     print("Invalid registration"))
Checking username length, password length, email format, and age.

(运行)
Registration successful! All validations passed.

**操作时的代码**:
```python
username = "alice123"
password = "pass1234"
email = "alice@email.com"
age = 20

if len(username) >= 5 and len(password) >= 8 and "@" in email and age >= 18:
    print("Registration successful!")
else:
    print("Invalid registration")
```

---

## [场景 8: 结尾] (10 秒)
**画面**: 总结卡
**配音**:
Great job! You now understand how to combine conditions using logical operators. This is a powerful tool for creating smart, decision-making programs. See you next time!

---
