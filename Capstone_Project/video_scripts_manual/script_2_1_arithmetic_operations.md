# Chapter 2.1: Arithmetic Operations - Video Script
# 总时长：约 4-5 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "2.1 Arithmetic Operations"
**配音**:
Welcome to Lesson 2.1: Arithmetic Operations. In this lesson, we'll explore how Python handles mathematical calculations.

---

## [场景 2: 基本运算符介绍] (40 秒)
**画面**: 运算符列表动画
**配音**:
Python supports all the basic arithmetic operators you're familiar with. Addition uses the plus sign, subtraction uses the minus sign, multiplication uses the asterisk, and division uses the forward slash. But Python also has some special operators. The double slash performs integer division, which gives you only the whole number part. The percent sign gives you the remainder after division, which we call modulus. And the double asterisk is for exponentiation, or raising to a power.

---

## [场景 3: 实际操作 - 基本运算] (110 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
OK, Let's try these operators in action. Opening the code editor.

(打字: result = 10 + 5)
let's do addition. Result equals 10 plus 5.

(打字: print(result))
Print the result.

(点击运行)
We get 15, as expected.

(清空，打字: result = 10 - 5)
Now subtraction. 10 minus 5.

(打字: print(result))
(运行)
That's 5.

(清空，打字: result = 10 * 5)
Multiplication. 10 times 5.

(打字: print(result))
(运行)
50. Perfect.

(清空，打字: result = 10 / 5)
Regular division. 10 divided by 5.

(打字: print(result))
(运行)
Notice it gives us 2.0, not just 2. In Python, regular division always returns a decimal number, which we call a float.

(清空，打字: result = 10 // 3)
Then integer division. 10 double slash 3.

(打字: print(result))
(运行)
We get 3, because it only keeps the whole number part and discards the remainder.

(清空，打字: result = 10 % 3)
The modulus operator. 10 percent 3.

(打字: print(result))
(运行)
This gives us 1, which is the remainder when 10 is divided by 3.

Finally, try exponentiation.

(打字: result = 2 ** 3)
2 double asterisk 3 means 2 to the power of 3.

**操作时的代码**:
```python
result = 10 + 5
print(result)

result = 10 - 5
print(result)

result = 10 * 5
print(result)

result = 10 / 5
print(result)

result = 10 // 3
print(result)

result = 10 % 3
print(result)
```

---



## [场景 5: 运算顺序] (30 秒)
**画面**: 运算顺序图示
**配音**:
Python follows the standard mathematical order of operations. Parentheses have the highest priority, then exponentiation, then multiplication and division, and finally addition and subtraction. Just like in math class!

---

## [场景 6: 实际操作 - 运算顺序] (50 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let me show you how order of operations works.

(打字: result = 2 + 3 * 4)
2 plus 3 times 4. Without parentheses, multiplication happens first.

(打字: print(result))
(运行)
See? It's 14, not 20. Because it calculates 3 times 4 equals 12 first, then adds 2.

(打字: result = (2 + 3) * 4)
Now with parentheses. 2 plus 3, in parentheses, times 4.

(打字: print(result))
(运行)
Now we get 20, because parentheses are calculated first. 2 plus 3 is 5, then 5 times 4 is 20.

**操作时的代码**:
```python
result = 2 + 3 * 4
print(result)

result = (2 + 3) * 4
print(result)
```

---

## [场景 7: 实际应用 - 计算圆面积] (60 秒)
**画面**: 继续录屏
**配音 - 操作讲解**:
Let's do a practical example. Calculate the area of a circle.

(打字: pi = 3.14159)
First, define pi as 3.14159.

(打字: radius = 5)
Set the radius to 5.

(打字: area = pi * radius ** 2)
Now calculate the area. The formula is pi times radius squared. Notice I use the double asterisk for squaring the radius.

(打字: print('Area:', area))
Print the area.

(运行)
The area is approximately 78.5.

**操作时的代码**:
```python
pi = 3.14159
radius = 5
area = pi * radius ** 2
print('Area:', area)
```

---

## [场景 8: 结尾] (10 秒)
**画面**: 总结卡
**配音**:
Great! You now know how to perform arithmetic operations in Python. Practice these operators, and I'll see you in the next lesson!

---

## 制作注意事项：
1. **运算结果展示**: 每次运行后停留 2-3 秒展示结果
2. **概念强调**: 在讲 float vs int 时可以在视频中标注
3. **实际应用**: 圆面积计算是很好的实践示例

---
