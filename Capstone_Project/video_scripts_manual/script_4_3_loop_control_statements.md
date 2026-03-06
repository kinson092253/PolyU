# Chapter 4.3: Loop Control Statements - Video Script
# 总时长：约 4-5 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "4.3 Loop Control Statements"
**配音**:
Welcome to Lesson 4.3: Loop Control Statements. Today we'll learn how to control loop behavior using break, continue, and the else clause.

---

## [场景 2: 控制语句介绍] (35 秒)
**画面**: break, continue, else 图示
**配音**:
In a loop, We can also include control statements inside a loop to manage its behavior more flexibly. The break statement immediately exits the entire loop, continue skips the remaining code in the current iteration and proceeds to the next one, and the else clause runs only if the loop finishes naturally without being interrupted by a break.

---

## [场景 3: 实际操作 - break 语句] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
OK, Let's demo how the break use in loop statment first.

(打字: for i in range(10):)
(Tab, 打字:     if i == 5:)
(Tab×2, 打字:         break)
(Tab, 打字:     print(i))
i define the for loop that for i in range 10, then add the if statement inside for statemnt, if it is true then execute the break. and print the output i when execute the for loop each time. this code will loop from 0 to 9, but break when i equals 5.

(运行)
let's run the code, the output is 0, 1, 2, 3, 4, then it stops! Break exited the loop immediately.

(打字: # Finding a number in a list)
(打字: numbers = [3, 7, 2, 9, 5, 1])
(打字: target = 9)
(打字: for num in numbers:)
(Tab, 打字:     if num == target:)
(Tab×2, 打字:         print(f"Found {target}!"))
(Tab×2, 打字:         break)
(打字: else:)
(Tab, 打字:     print(f"{target} not found"))
Stop searching once we find the target.

(运行)
Found 9! We don't need to check the remaining numbers.

**操作时的代码**:
```python
for i in range(10):
    if i == 5:
        break
    print(i)

# Finding a number
numbers = [3, 7, 2, 9, 5, 1]
target = 9
for num in numbers:
    if num == target:
        print(f"Found {target}!")
        break
```

---

## [场景 4: 实际操作 - continue 语句] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Now let's look at continue statement.

(打字: for i in range(10):)
(Tab, 打字:     if i % 2 == 0:)
(Tab×2, 打字:         continue)
(Tab, 打字:     print(i))
Define for loop iterates through numbers from 0 to 9 using for i in range 10. Inside the loop, it checks whether the current number i is even by using the condition if i mod 2 equal to 0. If the number is even, the continue statement is executed. This immediately skips the rest of the code inside the current loop iteration and jumps back to the beginning of the for loop to start the next iteration with the next value of i. otherwise, the if statement is false, then the i will print as the output.


(运行)
Let's run the code, the output is 1, 3, 5, 7, 9. Only odd numbers! Continue skipped the print for even numbers.

(打字: # Skip negative numbers)
(打字: numbers = [5, -3, 8, -1, 10, -7, 3])
(打字: for num in numbers:)
(Tab, 打字:     if num < 0:)
(Tab×2, 打字:         continue)
(Tab, 打字:     print(num))
Skip negative numbers.

(运行)
5, 8, 10, 3. All negative numbers were skipped!

**操作时的代码**:
```python
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)

# Skip negative numbers
numbers = [5, -3, 8, -1, 10, -7, 3]
for num in numbers:
    if num < 0:
        continue
    print(num)
```

---

## [场景 5: 实际操作 - else 子句] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
on the other hand, The else clause with loops is unique to Python. else clause is not only use in if statement, also can use in loop statement, let see the example

(打字: for i in range(5):)
(Tab, 打字:     print(i))
(打字: else:)
(Tab, 打字:     print("Loop completed normally"))
it is a normal for loop to print the number from 0 to 4, and else runs when the loop finishes without break.

(运行)
let's see the output, 0, 1, 2, 3, 4, then "Loop completed normally".

(打字: # With break)
(打字: for i in range(5):)
(Tab, 打字:     if i == 3:)
(Tab×2, 打字:         print("Breaking!")
(Tab×2, 打字:         break)
(Tab, 打字:     print(i))
(打字: else:)
(Tab, 打字:     print("Loop completed normally"))
Now with a break.

(运行)
0, 1, 2, Breaking! The else doesn't run because we broke out of the loop.

**操作时的代码**:
```python
for i in range(5):
    print(i)
else:
    print("Loop completed normally")

# With break
for i in range(5):
    if i == 3:
        print("Breaking!")
        break
    print(i)
else:
    print("Loop completed normally")
```

---

## [场景 6: 实际应用 - 搜索系统] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's build a search system using all three concepts.

(打字: users = ['alice', 'bob', 'charlie', 'david', 'eve'])
(打字: banned = ['bob', 'eve'])
(打字: search = 'charlie')

(打字: for user in users:)
(Tab, 打字:     if user in banned:)
(Tab×2, 打字:         print(f"Skipping banned user: {user}"))
(Tab×2, 打字:         continue)
Skip banned users.

(Tab, 打字:     if user == search:)
(Tab×2, 打字:         print(f"Found user: {user}"))
(Tab×2, 打字:         break)
Stop when found.

(Tab, 打字:     print(f"Checking: {user}"))
(打字: else:)
(Tab, 打字:     print("User not found"))
(运行)
It skips banned users, finds charlie, and stops!

**操作时的代码**:
```python
users = ['alice', 'bob', 'charlie', 'david', 'eve']
banned = ['bob', 'eve']
search = 'charlie'

for user in users:
    if user in banned:
        print(f"Skipping banned user: {user}")
        continue
    if user == search:
        print(f"Found user: {user}")
        break
    print(f"Checking: {user}")
else:
    print("User not found")
```

---

## [场景 7: 结尾] (10 秒)
**画面**: 总结卡
**配音**:
Excellent! You now know how to control loops with break, continue, and else. These tools give you fine-grained control over loop behavior. See you in the next chapter!

---
