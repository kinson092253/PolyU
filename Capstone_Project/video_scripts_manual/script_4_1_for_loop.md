# Chapter 4.1: for Loop - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "4.1 for Loop"
**配音**:
Welcome to Lesson 4.1: for Loop. Loops let us repeat code multiple times without writing it over and over. Let's explore Python's for loop!

---

## [场景 2: 循环介绍] (30 秒)
**画面**: 循环概念动画
**配音**:
Imagine you’re just starting to learn Python and want to print the numbers 1 to 10. The most straightforward way might look like this.
Sure, it works — but what if you now need to print 1 to 1000? Are you really going to type 1000 lines of print statement by hand? That would take forever, it’s super easy to make typos, and the code quickly becomes long, messy, and hard to maintain.
This is exactly where loops come to the rescue! Loops let you repeat an action automatically many times. In particular, the for loop is perfect when you already know exactly how many times you want to repeat something.

---

## [场景 3: range() 函数介绍] (40 秒)
**画面**: range() 说明图示
**配音**:
The range function is the key to for loops. Range with one argument generates numbers from zero up to, but not including, that number. Range with two arguments goes from start to stop. And range with three arguments adds a step size, letting you skip numbers or count backwards.

---

## [场景 4: 实际操作 - 基本 for 循环] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
OK, Let's try to use for loop in code editor.

(打字: for i in range(5):)
the format is For i in range 5, colon. Remind that the parameter need to write it in parentheses. That means this will loop 5 times.

(Tab, 打字:     print(i))
then Print i each time.

(运行)
let's run the code, See? It prints 0, 1, 2, 3, 4. Five numbers starting from zero.

(打字: for i in range(1, 6):)
(Tab, 打字:     print(i))
now, let's change the range with two arguments. From 1 to 6, but 6 is not included.

(运行)
and run the code again, Now we get 1, 2, 3, 4, 5. Five numbers starting from 1.

(打字: for i in range(0, 10, 2):)
(Tab, 打字:     print(i))
easy right? let's change the range with three arguments. Count by twos.

(运行)
and run the code to see the output, output is 0, 2, 4, 6, 8. It skips 2 between each number!

**操作时的代码**:
```python
for i in range(5):
    print(i)

for i in range(1, 6):
    print(i)

for i in range(0, 10, 2):
    print(i)
```

---

## [场景 5: 实际操作 - 循环中的计算] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
on the other hand, let's do calculations inside a loop.

(打字: total = 0)
Initialize total to zero.

(打字: for i in range(1, 6):)
(Tab, 打字:     total = total + i)
(Tab, 打字:     print(f"Adding {i}, total is now {total}"))
Each iteration, we add i to total and show the progress.

(运行)
run the code to watch the total grow: 1, 3, 6, 10, 15. We're calculating the sum of numbers 1 through 5!

(打字: print(f"Final total: {total}"))
(运行)
the final total is 15.

**操作时的代码**:
```python
total = 0
for i in range(1, 6):
    total = total + i
    print(f"Adding {i}, total is now {total}")
print(f"Final total: {total}")
```

---

## [场景 6: 遍历列表] (40 秒)
**画面**: 列表遍历图示
**配音**:
For loops aren't just for numbers. We also can loop through lists, strings, and other collections. This is called iteration. Python makes it beautifully simple.

---

## [场景 7: 实际操作 - 遍历列表] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's loop through a list of fruits.

(打字: fruits = ['apple', 'banana', 'cherry', 'date'])
Creating a list of fruits.

(打字: for fruit in fruits:)
(Tab, 打字:     print(fruit))
For each fruit in fruits, print it.

(运行)
Simple! It prints each fruit one by one.

(打字: for fruit in fruits:)
(Tab, 打字:     print(f"I like {fruit}"))
We can use the loop variable in any way.

(运行)
Now each fruit is in a sentence.


Let's see the simple string for loop example
(打字: for letter in "Python":)
(Tab, 打字:     print(letter))
We can loop through strings! Each character is processed.

(运行)
run the code, the output is P, y, t, h, o, n. Each letter on a separate line.

**操作时的代码**:
```python
fruits = ['apple', 'banana', 'cherry', 'date']
for fruit in fruits:
    print(fruit)

for fruit in fruits:
    print(f"I like {fruit}")

for letter in "Python":
    print(letter)
```

---

## [场景 8: 实际应用 - 乘法表] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's create a multiplication table.

(打字: number = 5)
(打字: print(f"Multiplication table for {number}:"))
(打字: for i in range(1, 11):)
(Tab, 打字:     result = number * i)
(Tab, 打字:     print(f"{number} x {i} = {result}"))
Generate the 5 times table from 1 to 10.

(运行)
Perfect! A complete multiplication table. This would be tedious to write manually!

**操作时的代码**:
```python
number = 5
print(f"Multiplication table for {number}:")
for i in range(1, 11):
    result = number * i
    print(f"{number} x {i} = {result}")
```

---

## [场景 9: 结尾] (10 秒)
**画面**: 总结卡
**配音**:
Excellent! You now know how to use for loops to repeat code and iterate through collections. This is a fundamental programming skill. See you in the next lesson!

---
