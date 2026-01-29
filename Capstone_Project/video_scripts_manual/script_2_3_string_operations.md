# Chapter 2.3: String Operations - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "2.3 String Operations"
**配音**:
Welcome to Lesson 2.3: String Operations. In this lesson, we'll learn how to manipulate and work with text strings in Python.

---

## [场景 2: 字符串拼接介绍] (30 秒)
**画面**: 字符串拼接示意图
**配音**:
Strings can be combined using the plus operator, just like adding numbers. This is called concatenation. We can join multiple strings together to create new text.

---

## [场景 3: 实际操作 - 字符串拼接] (60 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
it's easy right? Let's try string concatenation in code editor to show the details.

(打字: first_name = "John")
(打字: last_name = "Doe")
now i Set first name to John and last name to Doe.

(打字: full_name = first_name + " " + last_name)
Now I combine them with a space in between using the plus operator.

(打字: print(full_name))
(运行)
We get John Doe. Notice how the space is a separate string.

(打字: greeting = "Hello, " + full_name + "!")
(打字: print(greeting))
and then, We also can keep concatenating include strings and string variable like this greeting example.and it also have the output here.



**操作时的代码**:
```python
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name
print(full_name)

greeting = "Hello, " + full_name + "!"
print(greeting)
```

---

## [场景 4: 字符串索引和切片] (50 秒)
**画面**: 索引示意图（显示每个字符的位置）
**配音**:
On the other hand, every character in a string has a position, called an index. Python counts from zero, so the first character is at index 0. We can also use negative indices to count from the end. Minus 1 is the last character, minus 2 is second from last, and so on. We can extract portions of strings using slicing, which uses a start and end position.

---

## [场景 5: 实际操作 - 索引和切片] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
ok, Let's explore more detail about indexing and slicing.

(打字: text = "Python")
(打字: print(text[0]))
i define variable to store string Python first, then let's getting the first character at index 0 to see what output will get.

(运行)
see, we get the P character here.

(打字: print(text[1]))
if i change to get Index 1.

(运行)
the second character y show here.

(打字: print(text[-1]))
if i change it to Negative 1, the output will gives us the last character n.


(打字: text = "Programming")
(打字: print(text[0:4]))
on the other hand, let me explain how to use slicing. if we want to get more than one characters, for example, the start index is 0, the end index is 4. which mean from index 0 to 4, but index 4 is not included. so we can get the The first 4 characters P r o g



(打字: print(text[4:]))
if i want to get the index from index 4 to the end. i can do the slicing like this, start index is 4, and the end index is empty. which mean the system will start to get index 4 to the last index as the output. the output is r a m


(打字: print(text[-3:]))
and then we also can use negative index to get last 3 characters like this example. the output is same r a m



**操作时的代码**:
```python
text = "Python"
print(text[0])
print(text[1])
print(text[-1])

text = "Programming"
print(text[0:4])
print(text[4:])
print(text[-3:])
```

---

## [场景 6: 字符串方法介绍] (30 秒)
**画面**: 常用方法列表
**配音**:
moreover, Python provides many built-in string methods. These are functions that belong to strings and help us manipulate text easily. Let's explore some common ones.

---

## [场景 7: 实际操作 - 大小写转换] (60 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
First, case conversion methods.

(打字: text = "Hello World")
(打字: print(text.upper()))
upper converts everything to uppercase.

(运行)
HELLO WORLD.

(打字: print(text.lower()))
lower converts to lowercase.

(运行)
hello world.

(打字: print(text.title()))
title makes every word start with a capital letter.

(运行)
Hello World.

**操作时的代码**:
```python
text = "Hello World"
print(text.upper())
print(text.lower())
print(text.title())
```

---

## [场景 8: 实际操作 - 查找和替换] (70 秒)
**画面**: 继续录屏
**配音 - 操作讲解**:
Now let's find and replace text.

(打字: text = "Hello World")
(打字: print(text.replace("World", "Python")))
replace changes World to Python.

(运行)
Hello Python.

(打字: print(text.find("World")))
find tells us where World starts.

(运行)
6. That's the index position where W begins.

(打字: print(text.count("l")))
count tells us how many lowercase L's are in the text.

(运行)
3. There are three L's.

**操作时的代码**:
```python
text = "Hello World"
print(text.replace("World", "Python"))
print(text.find("World"))
print(text.count("l"))
```

---

## [场景 9: 实际操作 - 分割字符串] (50 秒)
**画面**: 继续录屏
**配音 - 操作讲解**:
The split method is very useful.

(打字: sentence = "Python is awesome")
(打字: words = sentence.split())
split breaks a string into a list of words.

(打字: print(words))
(运行)
We get a list: Python, is, awesome.

(打字: print(words[0]))
We can access individual words.

(运行)
Python.

**操作时的代码**:
```python
sentence = "Python is awesome"
words = sentence.split()
print(words)
print(words[0])
```

---

## [场景 10: 结尾] (10 秒)
**画面**: 总结卡
**配音**:
Great job! You now know how to work with strings in Python. Practice these methods, and see you in the next chapter!

---

## 制作注意事项：
1. **索引图示**: 在讲索引时，画面上显示字符串每个位置的编号
2. **方法演示**: 每个方法都要清晰展示输入和输出
3. **实用性**: 强调这些方法在实际编程中的应用

---
