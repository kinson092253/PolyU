# Chapter 4.4: Nested Loops - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "4.4 Nested Loops"
**配音**:
Welcome to Lesson 4.4: Nested Loops. Today we'll learn how to put loops inside loops to create powerful patterns and process multi-dimensional data.

---

## [场景 2: 嵌套循环介绍] (30 秒)
**画面**: 嵌套循环示意图
**配音**:
A nested loop is a loop inside another loop. it is same like the nested condition. but the inner loop completes all its iterations for each iteration of the outer loop. This is perfect for creating patterns, multiplication tables, and working with 2D data.

---

## [场景 3: 实际操作 - 基本嵌套循环] (80 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
Let's start with a simple nested loop in code editor.

(打字: for i in range(3):)
(Tab, 打字:     for j in range(2):)
(Tab×2, 打字:         print(f"i={i}, j={j}"))
The outer loop runs 3 times. For each outer iteration, the inner loop runs 2 times.

(运行)
then run the code to see how it prints all combinations: i goes from 0 to 2, and for each i, j goes from 0 to 1.

(打字: # Calculate total iterations)
(打字: outer = 3)
(打字: inner = 2)
(打字: total = outer * inner)
(打字: print(f"Total iterations: {total}"))
If outer loops 3 times and inner loops 2 times, total is 3 × 2 = 6 iterations!

**操作时的代码**:
```python
for i in range(3):
    for j in range(2):
        print(f"i={i}, j={j}")

# Total: 3 × 2 = 6 iterations
```

---

## [场景 4: 实际操作 - 乘法表] (100 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's create a multiplication table.

(打字: for i in range(1, 4):)
(Tab, 打字:     for j in range(1, 4):)
(Tab×2, 打字:         result = i * j)
(Tab×2, 打字:         print(f"{i} x {j} = {result}"))
(Tab, 打字:     print())
A 3x3 multiplication table. We print each result, and add an empty line between rows.

(运行)
Perfect! We get all 9 multiplications organized by rows.

(打字: # Formatted version)
(打字: for i in range(1, 4):)
(Tab, 打字:     for j in range(1, 4):)
(Tab×2, 打字:         print(f"{i * j:3}", end=""))
(Tab, 打字:     print())
We can also format it nicely on one line using print(end="").

(运行)
Much cleaner! The numbers are aligned in a grid.

**操作时的代码**:
```python
# Simple version
for i in range(1, 4):
    for j in range(1, 4):
        result = i * j
        print(f"{i} x {j} = {result}")
    print()

# Formatted version
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i * j:3}", end="")
    print()
```

---

## [场景 5: 实际操作 - 星形图案] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
One more demo, Let's use nested loops for creating patterns.

(打字: for i in range(1, 6):)
(Tab, 打字:     for j in range(i):)
(Tab×2, 打字:         print("*", end=""))
(Tab, 打字:     print())
I want to use nested loops to create a simple pattern.
The outer loop runs with variable i from 1 to 5, there are 5 lines in total.
and the inner loop prints exactly i stars on each line.
so the inner loop runs as many times as i.

(运行)
OK, let's run the code to see what pattern will be output. It is a triangle pattern! Row 1 has 1 star, row 2 has 2 stars, etc.

(打字: # Number pyramid)
(打字: for i in range(1, 6):)
(Tab, 打字:     for j in range(1, i + 1):)
(Tab×2, 打字:         print(j, end=""))
(Tab, 打字:     print())
A number pyramid instead of stars.

(运行)
Row 1 shows: 1, Row 2 shows: 12, Row 3 shows: 123, etc.

**操作时的代码**:
```python
# Star triangle
for i in range(1, 6):
    for j in range(i):
        print("*", end="")
    print()

# Number pyramid
for i in range(1, 6):
    for j in range(1, i + 1):
        print(j, end="")
    print()
```

---

## [场景 6: 实际操作 - 处理2D列表] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Nested loops are essential for working with 2D data.

(打字: matrix = [[1, 2, 3],)
(打字:            [4, 5, 6],)
(打字:            [7, 8, 9]])
We have a 3x3 matrix.

(打字: for i in range(len(matrix)):)
(Tab, 打字:     for j in range(len(matrix[i])):)
(Tab×2, 打字:         print(f"{matrix[i][j]}", end=" "))
(Tab, 打字:     print())
Iterate through each row and column.

(运行)
Perfect grid display! The outer loop goes through rows, inner loop goes through columns.

(打字: # Sum all elements)
(打字: total = 0)
(打字: for row in matrix:)
(Tab, 打字:     for element in row:)
(Tab×2, 打字:         total += element)
(打字: print(f"Total: {total}"))
Sum all elements in the matrix.

(运行)
1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 = 45

**操作时的代码**:
```python
matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]

# Display the matrix
for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        print(f"{matrix[i][j]}", end=" ")
    print()

# Sum all elements
total = 0
for row in matrix:
    for element in row:
        total += element
print(f"Total: {total}")
```

---

## [场景 7: 性能考虑] (40 秒)
**画面**: 警告图示
**配音**:
Be careful with nested loops! If the outer loop runs n times and the inner loop runs m times, the total iterations are n × m.

(打字: for i in range(100):)
(Tab, 打字:     for j in range(100):)
(Tab×2, 打字:         # This runs 10,000 times!)
This runs 10,000 times! With larger numbers, performance can suffer.

**操作时的代码**:
```python
# This runs 10,000 times!
for i in range(100):
    for j in range(100):
        # code here runs 10,000 times
```

---

## [场景 8: 结尾] (10 秒)
**画面**: 总结卡
**配音**:
Excellent! You now know how to use nested loops. Remember to think about performance with large datasets. See you in the next chapter!

---
