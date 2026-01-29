# Chapter 5.3: List Comprehensions - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "5.3 List Comprehensions"
**配音**:
Welcome to Lesson 5.3: List Comprehensions. This is one of Python's most elegant features - a concise way to create lists. Let's explore this powerful technique!

---

## [场景 2: 什么是列表推导式] (40 秒)
**画面**: 对比动画：传统方法 vs 列表推导式
**配音**:
List comprehension is a compact syntax for creating lists based on existing lists or ranges. Instead of writing multiple lines with loops and appends, you can create a new list in just one line. It's faster to write, easier to read, and often more efficient. List comprehensions are a hallmark of Pythonic code.

---

## [场景 3: 基本语法] (30 秒)
**画面**: 语法图示
**配音**:
The basic syntax is: new list equals, open bracket, expression for item in iterable, close bracket. The expression is what each item becomes. The for item in iterable part loops through the values. You can also add an optional if condition to filter items.

---

## [场景 4: 实际操作 - 基本列表推导式] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
Let's see list comprehensions in action.

(打字: # Traditional way)
(打字: squares = [])
(打字: for i in range(1, 6):)
(Tab, 打字:     squares.append(i ** 2))
(打字: print(squares))
(运行)
The old way: create empty list, loop, append. Five lines.

(打字: # List comprehension)
(打字: squares = [i ** 2 for i in range(1, 6)])
(打字: print(squares))
(运行)
Same result in one line! Much cleaner.

(打字: # Another example)
(打字: numbers = [1, 2, 3, 4, 5])
(打字: doubled = [n * 2 for n in numbers])
(打字: print(doubled))
(运行)
Each number is doubled. Two, four, six, eight, ten!

**操作时的代码**:
```python
# Traditional way
squares = []
for i in range(1, 6):
    squares.append(i ** 2)
print(squares)

# List comprehension
squares = [i ** 2 for i in range(1, 6)]
print(squares)

# Another example
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
print(doubled)
```

---

## [场景 5: 实际操作 - 带条件的列表推导式] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Now let's add conditions to filter items.

(打字: numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
(打字: evens = [n for n in numbers if n % 2 == 0])
Only include if n mod two equals zero - that's even numbers.

(打字: print(evens))
(运行)
Two, four, six, eight, ten. Only even numbers!

(打字: odds = [n for n in numbers if n % 2 != 0])
(打字: print(odds))
(运行)
One, three, five, seven, nine. Only odd numbers!

(打字: large = [n for n in numbers if n > 5])
(打字: print(large))
(运行)
Six, seven, eight, nine, ten. Only numbers greater than five!

(打字: # Combine expression and condition)
(打字: squared_evens = [n ** 2 for n in numbers if n % 2 == 0])
Square the even numbers only.

(打字: print(squared_evens))
(运行)
Four, sixteen, thirty-six, sixty-four, one hundred. Squared even numbers!

**操作时的代码**:
```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

evens = [n for n in numbers if n % 2 == 0]
print(evens)

odds = [n for n in numbers if n % 2 != 0]
print(odds)

large = [n for n in numbers if n > 5]
print(large)

# Combine expression and condition
squared_evens = [n ** 2 for n in numbers if n % 2 == 0]
print(squared_evens)
```

---

## [场景 6: 实际操作 - 字符串列表推导式] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
List comprehensions work great with strings too.

(打字: words = ["hello", "world", "python", "code"])
(打字: uppercase = [word.upper() for word in words])
Convert all to uppercase.

(打字: print(uppercase))
(运行)
All words are now uppercase!

(打字: lengths = [len(word) for word in words])
Get the length of each word.

(打字: print(lengths))
(运行)
Five, five, six, four. The length of each word!

(打字: long_words = [word for word in words if len(word) > 4])
Only words longer than four characters.

(打字: print(long_words))
(运行)
Hello, world, python. Code has only four letters so it's excluded!

**操作时的代码**:
```python
words = ["hello", "world", "python", "code"]

uppercase = [word.upper() for word in words]
print(uppercase)

lengths = [len(word) for word in words]
print(lengths)

long_words = [word for word in words if len(word) > 4]
print(long_words)
```

---

## [场景 7: 实际应用] (50 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Practical example: processing temperature data.

(打字: celsius = [0, 10, 20, 30, 40])
(打字: # Convert to Fahrenheit)
(打字: fahrenheit = [(c * 9/5) + 32 for c in celsius])
(打字: print(f"Celsius: {celsius}"))
(打字: print(f"Fahrenheit: {fahrenheit}"))
(运行)
Converted all temperatures at once!

(打字: # Filter temperatures above freezing in Fahrenheit)
(打字: above_freezing = [f for f in fahrenheit if f > 32])
(打字: print(f"Above freezing: {above_freezing}"))
(运行)
List comprehensions make data processing elegant!

**操作时的代码**:
```python
celsius = [0, 10, 20, 30, 40]

# Convert to Fahrenheit
fahrenheit = [(c * 9/5) + 32 for c in celsius]
print(f"Celsius: {celsius}")
print(f"Fahrenheit: {fahrenheit}")

# Filter temperatures above freezing in Fahrenheit
above_freezing = [f for f in fahrenheit if f > 32]
print(f"Above freezing: {above_freezing}")
```

---

## [场景 8: 嵌套列表推导式提及] (20 秒)
**画面**: 简单示例
**配音**:
You can even nest list comprehensions to create two-dimensional lists, but keep it simple - overly complex comprehensions hurt readability. When in doubt, use a regular loop!

---

## [场景 9: 结尾] (10 秒)
**画面**: 总结卡片
**配音**:
Excellent! You've learned list comprehensions - a powerful Pythonic way to create lists. In the next chapter, we'll explore dictionaries, tuples, and sets. See you there!

---

## 制作注意事项：
1. **讲解部分** (场景 1-3, 8-9): PPT 展示
2. **操作部分** (场景 4-7): 
   - 对比传统方法和列表推导式
   - 强调简洁性和可读性
   - 展示多种应用场景
3. **AI 配音**: 清晰语速
4. **重点**: 语法结构、条件过滤、实际应用
