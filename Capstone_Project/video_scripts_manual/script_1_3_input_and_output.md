# Chapter 1.3: Input and Output - Video Script
# 总时长：约 3-4 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "1.3 Input and Output"
**配音**:
Welcome to Lesson 1.3: Input and Output. In this lesson, we'll learn how to get user input and display formatted output in Python.

---

## [场景 2: Output - print 函数详解] (40 秒)
**画面**: print 函数说明图
**配音**:
We've already used the print function, but let's explore it further. Print can display multiple items separated by commas. By default, it adds a space between items and moves to a new line after printing. You can customize this behavior using optional parameters like sep for the separator, and end for what comes at the end.

---

## [场景 3: 实际操作 - 高级 print] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
Let's see print in action. Opening the editor.

(打字: print('Python', 'is', 'fun'))
First, printing multiple words separated by commas. Print open parenthesis quote Python quote comma quote is quote comma quote fun quote.

(点击运行)
See? Python automatically adds spaces between the words.

(打字: print('Python', 'is', 'fun', sep='-'))
Now let's change the separator. I'll add sep equals dash in quotes.

(点击运行)
Now the words are separated by dashes instead of spaces.

(打字: print('Hello', end=' '))
(打字: print('Python'))
Here's something interesting. I'll print Hello with end equals space. Then print Python on the next line.

(点击运行)
Notice they appear on the same line? The first print didn't move to a new line because we set end to a space instead of a newline.

**操作时的代码**:
```python
print('Python', 'is', 'fun')
print('Python', 'is', 'fun', sep='-')

print('Hello', end=' ')
print('World')
```

---

## [场景 4: Input - 获取用户输入] (30 秒)
**画面**: input 函数说明
**配音**:
Now let's talk about input. The input function pauses your program and waits for the user to type something and press Enter. Whatever the user types is returned as a string. You can display a prompt message to guide the user.

---

## [场景 5: 实际操作 - 获取并使用输入] (100 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let me demonstrate. Clearing the editor.

(打字: name = input('What is your name? '))
I'll create a variable called name, equals input open parenthesis quote What is your name question mark space quote.

(打字: print('Hello', name))
Then print string Hello comma name.

(点击运行)
When we run this, the program pauses and displays the prompt. Let me type a name.

(输入: John，按回车)
I typed John and pressed Enter. Now the program continues and displays Hello John.

(清空，打字: age = input('How old are you? '))
Let's try with a number. Age equals input quote How old are you question mark space.

(打字: print('You are', age, 'years old'))
Then print You are comma age comma years old.

(点击运行，输入: 25)
I enter 25. And it displays You are 25 years old.

**操作时的代码**:
```python
name = input('What is your name? ')
print('Hello', name)

age = input('How old are you? ')
print('You are', age, 'years old')
```

---

## [场景 6: 实际操作 - 完整示例] (60 秒)
**画面**: 继续录屏
**配音 - 操作讲解**:
Let's create a complete interactive program.

(打字完整程序)
I'll write a program that asks for a name and favorite number, then displays a personalized message.

First, print a welcome message. Then get the name using input. Get the favorite number. And finally, print a message using all this information.

(点击运行)
Running it now. I'll enter Alice.

(输入: Alice)
And my favorite number is 7.

(输入: 7)
Perfect! The program displays a personalized message: Nice to meet you Alice! Your favorite number is 7.

**操作时的代码**:
```python
print('Welcome to my program!')

name = input('What is your name? ')
number = input('What is your favorite number? ')

print('Nice to meet you', name)
print('Your favorite number is', number)
```

---

## [场景 7: 结尾] (10 秒)
**画面**: 总结卡
**配音**:
Fantastic! You now know how to display output and get user input. These are fundamental skills you'll use in every Python program. Keep practicing, and I'll see you in the next lesson!

---

## 制作注意事项：
1. **录屏技巧**:
   - 运行 input 程序时，暂停 1-2 秒再输入
   - 输入时也用正常速度，不要太快
   - 展示输出结果时停留 3 秒
2. **演示顺序**: 先演示简单的，再演示复杂的
3. **提示**: 可以在旁白中强调"按 Enter 键"这个动作

---
