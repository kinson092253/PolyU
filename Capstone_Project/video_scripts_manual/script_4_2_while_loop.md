# Chapter 4.2: while Loop - Video Script
# 总时长：约 4-5 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "4.2 while Loop"
**配音**:
Welcome to Lesson 4.2: while Loop. While the for loop repeats a set number of times, the while loop continues until a condition becomes False. Let's explore!

---

## [场景 2: while 循环介绍] (35 秒)
**画面**: while 循环流程图
**配音**:
The while loop checks a condition before each iteration. As long as the condition is True, the loop continues. When the condition becomes False, the loop stops. This is perfect when you don't know in advance how many times you need to repeat something.

---

## [场景 3: 实际操作 - 基本 while 循环] (80 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
Let's create our first while loop.

(打字: count = 0)
Starting with count equals zero.

(打字: while count < 5:)
While count is less than 5.

(Tab, 打字:     print(count))
(Tab, 打字:     count = count + 1)
Print count, then increase it by 1.

(运行)
It prints 0, 1, 2, 3, 4, then stops because count becomes 5 and the condition is False.

(打字: count += 1)
By the way, count plus equals 1 is shorthand for count equals count plus 1.

**操作时的代码**:
```python
count = 0
while count < 5:
    print(count)
    count = count + 1
```

---

## [场景 4: while vs for 对比] (40 秒)
**画面**: 对比图示
**配音**:
When should you use while versus for? Use for when you know the number of iterations, like looping through a list or counting to 10. Use while when the loop depends on a changing condition, like waiting for user input or processing data until a condition is met.

---

## [场景 5: 实际操作 - 输入验证] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
While loops are perfect for input validation. Let's create a password checker.

(打字: password = "")
Empty password initially.

(打字: while password != "secret":)
While password is not equal to secret.

(Tab, 打字:     password = input("Enter password: "))
Ask for password each time.

(打字: print("Access granted!"))
This runs after the loop ends.

(运行，输入: wrong)
I enter "wrong". The loop continues.

(输入: wrong again)
Still wrong. Loop continues.

(输入: secret)
Now I enter "secret". The condition becomes False, loop exits, and we see Access granted!

**操作时的代码**:
```python
password = ""
while password != "secret":
    password = input("Enter password: ")
print("Access granted!")
```

---

## [场景 6: 实际操作 - 计数和累加] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's calculate the sum of numbers.

(打字: total = 0)
(打字: number = 1)
Starting values.

(打字: while number <= 10:)
While number is 10 or less.

(Tab, 打字:     total += number)
(Tab, 打字:     print(f"Added {number}, total: {total}"))
(Tab, 打字:     number += 1)
Add number to total, show progress, increment.

(运行)
Watch it add: 1, 3, 6, 10, up to 55. The sum of 1 through 10!

**操作时的代码**:
```python
total = 0
number = 1
while number <= 10:
    total += number
    print(f"Added {number}, total: {total}")
    number += 1
```

---

## [场景 7: 无限循环警告] (40 秒)
**画面**: 警告图示
**配音**:
Be careful! If the condition never becomes False, you create an infinite loop. Always make sure your loop variable changes in a way that will eventually make the condition False. If you accidentally create an infinite loop, you can stop it with Control C in most environments.

---

## [场景 8: 实际操作 - 倒计时] (60 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's create a countdown timer.

(打字: countdown = 5)
(打字: print("Rocket launch countdown:"))
(打字: while countdown > 0:)
(Tab, 打字:     print(countdown))
(Tab, 打字:     countdown -= 1)
(打字: print("Blast off!"))
Count down from 5 to 1.

(运行)
5, 4, 3, 2, 1, Blast off! When countdown reaches 0, the loop stops.

**操作时的代码**:
```python
countdown = 5
print("Rocket launch countdown:")
while countdown > 0:
    print(countdown)
    countdown -= 1
print("Blast off!")
```

---

## [场景 9: 结尾] (10 秒)
**画面**: 总结卡
**配音**:
Great work! You now understand while loops and when to use them. They're powerful tools for condition-based repetition. See you in the next lesson!

---
