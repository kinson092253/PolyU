# Chapter 10.3: Exception Handling - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "10.3 Exception Handling"
**配音**:
Welcome to Lesson 10.3: Exception Handling. Errors are inevitable, but we can handle them gracefully. Let's learn to write robust, crash-resistant code!

---

## [场景 2: 异常处理介绍] (40 秒)
**画面**: 异常概念图示 + 常见错误类型
**配音**:
When Python encounters an error, it raises an exception and stops execution. Exception handling lets you catch these errors and respond appropriately, preventing crashes. The try block contains code that might fail. The except block handles errors. The else block runs if no error occurred. The finally block always runs, perfect for cleanup. Proper exception handling makes programs reliable and user-friendly.

---

## [场景 3: 实际操作 - 基本 Try-Except] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
Let's handle exceptions.

(打字: # Without exception handling - will crash!)
(打字: # result = 10 / 0)
I'm commenting this because it would crash!

(打字: # With exception handling)
(打字: try:)
(Tab, 打字:     result = 10 / 0)
Code that might fail goes in try!

(打字: except ZeroDivisionError:)
(Tab, 打字:     print("Cannot divide by zero!"))
Catch specific exception!

(运行)
Cannot divide by zero! Program didn't crash!

(打字: # Another example)
(打字: try:)
(Tab, 打字:     number = int("hello"))
Try to convert invalid string!

(打字: except ValueError:)
(Tab, 打字:     print("Invalid number format!"))
(运行)
Caught ValueError! Program continues!

(打字: # Multiple exceptions)
(打字: try:)
(Tab, 打字:     numbers = [1, 2, 3])
(Tab, 打字:     print(numbers[10]))
(打字: except IndexError:)
(Tab, 打字:     print("Index out of range!"))
(运行)
Index error caught!

**操作时的代码**:
```python
# Without exception handling - will crash!
# result = 10 / 0

# With exception handling
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Another example
try:
    number = int("hello")
except ValueError:
    print("Invalid number format!")

# Multiple exceptions
try:
    numbers = [1, 2, 3]
    print(numbers[10])
except IndexError:
    print("Index out of range!")
```

---

## [场景 4: 实际操作 - 多个 Except 块] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Handle different errors differently.

(打字: def divide_numbers(a, b):)
(Tab, 打字:     try:)
(Tab*2, 打字:         result = a / b)
(Tab*2, 打字:         return result)
(Tab, 打字:     except ZeroDivisionError:)
(Tab*2, 打字:         print("Error: Cannot divide by zero"))
(Tab*2, 打字:         return None)
(Tab, 打字:     except TypeError:)
(Tab*2, 打字:         print("Error: Invalid types for division"))
(Tab*2, 打字:         return None)
Multiple except blocks for different errors!

(打字: print(divide_numbers(10, 2)))
(运行)
Five! Normal operation!

(打字: print(divide_numbers(10, 0)))
(运行)
Zero division caught!

(打字: print(divide_numbers(10, "two")))
(运行)
Type error caught! Different errors handled differently!

**操作时的代码**:
```python
def divide_numbers(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Error: Cannot divide by zero")
        return None
    except TypeError:
        print("Error: Invalid types for division")
        return None

print(divide_numbers(10, 2))
print(divide_numbers(10, 0))
print(divide_numbers(10, "two"))
```

---

## [场景 5: 实际操作 - Else 和 Finally] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Else and finally clauses.

(打字: def process_file(filename):)
(Tab, 打字:     try:)
(Tab*2, 打字:         file = open(filename, 'r'))
(Tab*2, 打字:         content = file.read())
(Tab, 打字:     except FileNotFoundError:)
(Tab*2, 打字:         print(f"File {filename} not found"))
(Tab, 打字:     else:)
(Tab*2, 打字:         print(f"Successfully read {len(content)} characters"))
Else runs only if no exception!

(Tab, 打字:     finally:)
(Tab*2, 打字:         print("Process complete"))
Finally always runs!

(打字: process_file("sample.txt"))
(运行)
File exists, else runs, finally runs!

(打字: process_file("nonexistent.txt"))
(运行)
File not found, except runs, finally still runs! Finally is perfect for cleanup!

**操作时的代码**:
```python
def process_file(filename):
    try:
        file = open(filename, 'r')
        content = file.read()
    except FileNotFoundError:
        print(f"File {filename} not found")
    else:
        print(f"Successfully read {len(content)} characters")
    finally:
        print("Process complete")

process_file("sample.txt")
process_file("nonexistent.txt")
```

---

## [场景 6: 实际操作 - 捕获异常信息] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Get exception details.

(打字: try:)
(Tab, 打字:     result = 10 / 0)
(打字: except ZeroDivisionError as e:)
(Tab, 打字:     print(f"Error occurred: {e}"))
(Tab, 打字:     print(f"Error type: {type(e).__name__}")
As e captures the exception object!

(运行)
Error message and type displayed!

(打字: # Catch any exception)
(打字: def safe_operation(x, y, operation):)
(Tab, 打字:     try:)
(Tab*2, 打字:         if operation == "divide":)
(Tab*3, 打字:             return x / y)
(Tab*2, 打字:         elif operation == "index":)
(Tab*3, 打字:             return [1, 2, 3][x])
(Tab, 打字:     except Exception as e:)
(Tab*2, 打字:         return f"Error: {type(e).__name__} - {e}")
Exception catches any error!

(打字: print(safe_operation(10, 0, "divide"))
(打字: print(safe_operation(10, 2, "divide"))
(运行)
All errors caught!

**操作时的代码**:
```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error occurred: {e}")
    print(f"Error type: {type(e).__name__}")

# Catch any exception
def safe_operation(x, y, operation):
    try:
        if operation == "divide":
            return x / y
        elif operation == "index":
            return [1, 2, 3][x]
    except Exception as e:
        return f"Error: {type(e).__name__} - {e}"

print(safe_operation(10, 0, "divide"))
print(safe_operation(10, 2, "divide"))
```

---

## [场景 7: 实际操作 - 抛出异常] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Raise your own exceptions.

(打字: def check_age(age):)
(Tab, 打字:     if age < 0:)
(Tab*2, 打字:         raise ValueError("Age cannot be negative"))
Raise creates an exception!

(Tab, 打字:     if age > 150:)
(Tab*2, 打字:         raise ValueError("Age seems unrealistic"))
(Tab, 打字:     return f"Age {age} is valid")
(打字: try:)
(Tab, 打字:     print(check_age(25)))
(运行)
Valid age!

(打字:     print(check_age(-5)))
(打字: except ValueError as e:)
(Tab, 打字:     print(f"Invalid: {e}"))
(运行)
Exception caught! Raising exceptions signals errors in your code!

(打字: # Custom exception)
(打字: class InsufficientFundsError(Exception):)
(Tab, 打字:     pass)
(打字: def withdraw(balance, amount):)
(Tab, 打字:     if amount > balance:)
(Tab*2, 打字:         raise InsufficientFundsError("Not enough funds"))
(Tab, 打字:     return balance - amount)
(打字: try:)
(Tab, 打字:     withdraw(100, 200))
(打字: except InsufficientFundsError as e:)
(Tab, 打字:     print(e))
(运行)
Custom exception!

**操作时的代码**:
```python
def check_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age seems unrealistic")
    return f"Age {age} is valid"

try:
    print(check_age(25))
    print(check_age(-5))
except ValueError as e:
    print(f"Invalid: {e}")

# Custom exception
class InsufficientFundsError(Exception):
    pass

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError("Not enough funds")
    return balance - amount

try:
    withdraw(100, 200)
except InsufficientFundsError as e:
    print(e)
```

---

## [场景 8: 实际应用] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Real-world: robust file processor.

(打字: import json)
(打字: def load_config(filename):)
(Tab, 打字:     try:)
(Tab*2, 打字:         with open(filename, 'r') as file:)
(Tab*3, 打字:             config = json.load(file))
(Tab*2, 打字:         print("Config loaded successfully"))
(Tab*2, 打字:         return config)
(Tab, 打字:     except FileNotFoundError:)
(Tab*2, 打字:         print("Config file not found, using defaults"))
(Tab*2, 打字:         return {"theme": "light", "lang": "en"})
(Tab, 打字:     except json.JSONDecodeError as e:)
(Tab*2, 打字:         print(f"Invalid JSON: {e}"))
(Tab*2, 打字:         return None)
(Tab, 打字:     except Exception as e:)
(Tab*2, 打字:         print(f"Unexpected error: {e}"))
(Tab*2, 打字:         return None)
Handles multiple error types gracefully!

(打字: config = load_config("config.json"))
(打字: if config:)
(Tab, 打字:     print(f"App settings: {config}"))
(运行)
Robust error handling!

**操作时的代码**:
```python
import json

def load_config(filename):
    try:
        with open(filename, 'r') as file:
            config = json.load(file)
        print("Config loaded successfully")
        return config
    except FileNotFoundError:
        print("Config file not found, using defaults")
        return {"theme": "light", "lang": "en"}
    except json.JSONDecodeError as e:
        print(f"Invalid JSON: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None

config = load_config("config.json")
if config:
    print(f"App settings: {config}")
```

---

## [场景 9: 最佳实践] (40 秒)
**画面**: 最佳实践清单
**配音**:
Exception handling best practices: Catch specific exceptions, not just Exception. Use finally for cleanup like closing files. Don't hide errors silently - log or report them. Raise exceptions for invalid input in your functions. And most importantly, don't overuse try-except - only wrap code that might actually fail. Good exception handling makes code professional and reliable!

---

## [场景 10: 结尾总结] (20 秒)
**画面**: 课程总结卡片
**配音**:
Congratulations! You've completed all ten chapters of our Python course! You've learned variables, operators, control flow, loops, lists, dictionaries, functions, modules, object-oriented programming, and file operations. You now have a solid foundation to build amazing Python projects. Keep practicing and happy coding!

---

## 制作注意事项：
1. **讲解部分** (场景 1-2, 9-10): PPT 展示
2. **操作部分** (场景 3-8): 
   - 对比有无异常处理的差异
   - 演示 try-except-else-finally 流程
   - 展示实际应用场景
3. **AI 配音**: 清晰语速，结尾部分可以稍微欢快
4. **重点**: try-except 结构、specific vs general exceptions、finally 用途
5. **特别**: 这是课程最后一节，结尾应该更有总结和鼓励性
