# Chapter 7.1: Function Definition and Calling - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "7.1 Function Definition and Calling"
**配音**:
Welcome to Lesson 7.1: Function Definition and Calling. Functions are reusable blocks of code that help organize your programs. Let's learn how to create and use them!

---

## [场景 2: 函数介绍] (40 秒)
**画面**: 函数概念动画 + 好处列表
**配音**:
A function is a named block of code that performs a specific task. Think of it like a recipe - you write it once and can use it many times. Functions provide four major benefits: code reusability, better organization, easier maintenance, and abstraction. Instead of writing the same code repeatedly, you define it once and call it whenever needed. This makes your code cleaner and less error-prone.

---

## [场景 3: 函数语法] (30 秒)
**画面**: 语法图示
**配音**:
Functions start with the def keyword, followed by the function name, parentheses, and a colon. The function body is indented. Function names should be descriptive and follow snake_case convention - lowercase words separated by underscores. To use a function, simply call it by name with parentheses.

---

## [场景 4: 实际操作 - 第一个函数] (80 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
Let's create our first function.

(打字: def greet():)
(Tab, 打字:     print("Hello, World!"))
Define a function called greet. It prints a message.

(打字: # Call the function)
(打字: greet())
(运行)
Hello, World! The function executed!

(打字: greet())
Call it again.

(打字: greet())
And again!

(运行)
See? We can use it as many times as we want!

(打字: # Function with multiple statements)
(打字: def welcome():)
(Tab, 打字:     print("Welcome to Python!"))
(Tab, 打字:     print("Let's learn about functions."))
(Tab, 打字:     print("This is exciting!"))
Multiple statements in one function.

(打字: welcome())
(运行)
All three lines execute when we call it once!

**操作时的代码**:
```python
def greet():
    print("Hello, World!")

# Call the function
greet()
greet()
greet()

# Function with multiple statements
def welcome():
    print("Welcome to Python!")
    print("Let's learn about functions.")
    print("This is exciting!")

welcome()
```

---

## [场景 5: 实际操作 - 函数命名] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Good function names are important.

(打字: # Good function names - descriptive and clear)
(打字: def calculate_total():)
(Tab, 打字:     print("Calculating total..."))
Clear what it does.

(打字: def get_user_info():)
(Tab, 打字:     print("Getting user info..."))
Descriptive verb-noun pattern.

(打字: def is_valid():)
(Tab, 打字:     print("Checking validity..."))
Boolean functions often start with 'is'.

(打字: calculate_total())
(打字: get_user_info())
(打字: is_valid())
(运行)
All functions have clear purposes from their names!

(打字: # Bad examples (don't do this):)
(打字: # def x(): pass  # Not descriptive)
(打字: # def DoSomething(): pass  # Should use snake_case)
I'm showing these as comments because they're bad practices!

**操作时的代码**:
```python
# Good function names - descriptive and clear
def calculate_total():
    print("Calculating total...")

def get_user_info():
    print("Getting user info...")

def is_valid():
    print("Checking validity...")

calculate_total()
get_user_info()
is_valid()

# Bad examples (don't do this):
# def x(): pass  # Not descriptive
# def DoSomething(): pass  # Should use snake_case
```

---

## [场景 6: 实际操作 - 函数调用函数] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Functions can call other functions.

(打字: def print_line():)
(Tab, 打字:     print("-" * 30))
Helper function to print a line.

(打字: def print_header():)
(Tab, 打字:     print_line())
(Tab, 打字:     print("Welcome to My Program"))
(Tab, 打字:     print_line())
This function calls print_line twice!

(打字: print_header())
(运行)
See? print_header uses print_line to create a nice border!

(打字: def show_menu():)
(Tab, 打字:     print_header())
(Tab, 打字:     print("1. Start")
(Tab, 打字:     print("2. Settings")
(Tab, 打字:     print("3. Exit")
(Tab, 打字:     print_line())
This function uses print_header!

(打字: show_menu())
(运行)
Functions building on functions! This is how we organize complex code!

**操作时的代码**:
```python
def print_line():
    print("-" * 30)

def print_header():
    print_line()
    print("Welcome to My Program")
    print_line()

print_header()

def show_menu():
    print_header()
    print("1. Start")
    print("2. Settings")
    print("3. Exit")
    print_line()

show_menu()
```

---

## [场景 7: 实际操作 - 函数的作用域] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Variables inside functions are local.

(打字: def my_function():)
(Tab, 打字:     message = "Hello from inside")
(Tab, 打字:     print(message))
Message is created inside the function.

(打字: my_function())
(运行)
Works inside the function!

(打字: # This would cause an error:)
(打字: # print(message)  # message doesn't exist outside!)
I'm commenting this because message only exists inside the function!

(打字: # Global variable)
(打字: greeting = "Hello, Global!")
This is global - defined outside functions.

(打字: def show_greeting():)
(Tab, 打字:     print(greeting))
Functions can access global variables.

(打字: show_greeting())
(运行)
Global variables are visible inside functions!

**操作时的代码**:
```python
def my_function():
    message = "Hello from inside"
    print(message)

my_function()

# This would cause an error:
# print(message)  # message doesn't exist outside!

# Global variable
greeting = "Hello, Global!"

def show_greeting():
    print(greeting)

show_greeting()
```

---

## [场景 8: 实际应用] (50 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Practical example: creating a calculator starter.

(打字: def show_calculator():)
(Tab, 打字:     print("=" * 30))
(Tab, 打字:     print("  Simple Calculator"))
(Tab, 打字:     print("=" * 30))
(打字: def display_message():)
(Tab, 打字:     print("Calculator is ready!"))
(打字: def main():)
(Tab, 打字:     show_calculator())
(Tab, 打字:     display_message())
Main function coordinates everything!

(打字: main())
(运行)
This is how real programs are structured!

**操作时的代码**:
```python
def show_calculator():
    print("=" * 30)
    print("  Simple Calculator")
    print("=" * 30)

def display_message():
    print("Calculator is ready!")

def main():
    show_calculator()
    display_message()

main()
```

---

## [场景 9: 结尾] (10 秒)
**画面**: 总结卡片
**配音**:
Excellent! You've learned to define and call functions. Next, we'll add parameters and return values to make functions even more powerful. See you there!

---

## 制作注意事项：
1. **讲解部分** (场景 1-3, 9): PPT 展示
2. **操作部分** (场景 4-8): 
   - 强调 def 关键字和缩进
   - 演示函数复用
   - 展示函数组合
3. **AI 配音**: 清晰语速
4. **重点**: 定义语法、命名规范、作用域概念
