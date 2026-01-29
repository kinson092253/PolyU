# Chapter 8.1: Importing Modules - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "8.1 Importing Modules"
**配音**:
Welcome to Lesson 8.1: Importing Modules. Modules let you use pre-written code, saving time and effort. Let's learn how to import and use Python's powerful modules!

---

## [场景 2: 模块介绍] (40 秒)
**画面**: 模块概念动画 + 好处列表
**配音**:
A module is a file containing Python code - functions, classes, and variables that you can reuse. Python comes with a huge standard library of modules for everything from math to web requests. Modules provide code reusability, better organization, namespace management, and access to thousands of existing functions. Instead of reinventing the wheel, import what you need!

---

## [场景 3: 导入语法] (30 秒)
**画面**: 导入语法图示
**配音**:
There are several ways to import. Import module loads everything. From module import specific loads only what you need. Import module as alias creates a shortcut. And from module import star loads everything directly, though this is not recommended due to potential naming conflicts.

---

## [场景 4: 实际操作 - 基本导入] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
Let's import our first module.

(打字: import math)
Import the math module.

(打字: # Use module.function syntax)
(打字: result = math.sqrt(16))
(打字: print(result))
(运行)
Four! We used the square root function from math.

(打字: print(math.pi))
(运行)
Pi constant from the math module!

(打字: print(math.pow(2, 3)))
(运行)
Eight! Two to the power of three.

(打字: # Import multiple modules)
(打字: import random)
(打字: import datetime)
(打字: print(random.randint(1, 10)))
(运行)
Random number between one and ten!

(打字: print(datetime.date.today()))
(运行)
Today's date! Multiple modules working together!

**操作时的代码**:
```python
import math

# Use module.function syntax
result = math.sqrt(16)
print(result)

print(math.pi)
print(math.pow(2, 3))

# Import multiple modules
import random
import datetime

print(random.randint(1, 10))
print(datetime.date.today())
```

---

## [场景 5: 实际操作 - 导入特定项] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Import only what you need.

(打字: from math import sqrt, pi)
Import specific functions - no need for math dot prefix!

(打字: print(sqrt(25)))
(运行)
Five! Direct access, no module prefix needed.

(打字: print(pi))
(运行)
Pi directly!

(打字: from math import sqrt, pow, pi, e)
Import multiple items.

(打字: print(sqrt(9)))
(打字: print(pow(2, 4)))
(打字: print(pi))
(打字: print(e))
(运行)
All available directly! This is cleaner when you use items frequently.

(打字: # Can still import the module normally too)
(打字: import math)
(打字: print(math.ceil(4.3)))
(运行)
Ceiling function! Five!

**操作时的代码**:
```python
from math import sqrt, pi

print(sqrt(25))
print(pi)

from math import sqrt, pow, pi, e

print(sqrt(9))
print(pow(2, 4))
print(pi)
print(e)

# Can still import the module normally too
import math
print(math.ceil(4.3))
```

---

## [场景 6: 实际操作 - 别名导入] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Use aliases to shorten long module names.

(打字: import math as m)
Create alias 'm' for math.

(打字: print(m.sqrt(36)))
(运行)
Six! Using the alias.

(打字: print(m.pi))
(运行)
Much shorter to type!

(打字: from math import sqrt as square_root)
Alias for specific function.

(打字: result = square_root(64))
(打字: print(result))
(运行)
Eight! More descriptive name!

(打字: # Common practice with popular libraries)
(打字: import datetime as dt)
(打字: print(dt.date.today()))
(运行)
This is very common! Many Python developers use these conventions.

**操作时的代码**:
```python
import math as m

print(m.sqrt(36))
print(m.pi)

from math import sqrt as square_root

result = square_root(64)
print(result)

# Common practice with popular libraries
import datetime as dt
print(dt.date.today())
```

---

## [场景 7: 实际操作 - 探索模块] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Discover what's in a module.

(打字: import math)
(打字: # Use dir() to see all functions)
(打字: print(dir(math)))
(运行)
A list of everything in the math module! Lots of functions!

(打字: # Get help on a function)
(打字: help(math.sqrt))
(运行)
Detailed documentation! Help explains what the function does!

(打字: # Access module documentation)
(打字: print(math.__doc__[:100]))
(运行)
First hundred characters of the math module documentation!

(打字: # Check if a function exists)
(打字: print(hasattr(math, 'sqrt')))
(打字: print(hasattr(math, 'divide')))
(运行)
True for sqrt, False for divide. We can check if functions exist!

**操作时的代码**:
```python
import math

# Use dir() to see all functions
print(dir(math))

# Get help on a function
help(math.sqrt)

# Access module documentation
print(math.__doc__[:100])

# Check if a function exists
print(hasattr(math, 'sqrt'))
print(hasattr(math, 'divide'))
```

---

## [场景 8: 实际应用] (60 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Practical example: random password generator.

(打字: import random)
(打字: import string)
(打字: def generate_password(length=8):)
(Tab, 打字:     # All possible characters)
(Tab, 打字:     characters = string.ascii_letters + string.digits)
(Tab, 打字:     # Random selection)
(Tab, 打字:     password = ''.join(random.choice(characters) for i in range(length)))
(Tab, 打字:     return password)
(打字: print("Password 1:", generate_password()))
(打字: print("Password 2:", generate_password(12)))
(打字: print("Password 3:", generate_password(16)))
(运行)
Three random passwords! This shows the power of combining modules!

**操作时的代码**:
```python
import random
import string

def generate_password(length=8):
    # All possible characters
    characters = string.ascii_letters + string.digits
    # Random selection
    password = ''.join(random.choice(characters) for i in range(length))
    return password

print("Password 1:", generate_password())
print("Password 2:", generate_password(12))
print("Password 3:", generate_password(16))
```

---

## [场景 9: Import Star 警告] (30 秒)
**画面**: 警告图示
**配音**:
Avoid using from module import star. While it imports everything, it can cause naming conflicts and makes code harder to understand. Always import specifically what you need, or import the whole module with a clear name.

---

## [场景 10: 结尾] (10 秒)
**画面**: 总结卡片
**配音**:
Great job! You've learned to import modules in multiple ways. Next, we'll explore common built-in modules in detail. See you there!

---

## 制作注意事项：
1. **讲解部分** (场景 1-3, 9-10): PPT 展示
2. **操作部分** (场景 4-8): 
   - 演示多种导入方式
   - 展示 dir() 和 help()
   - 强调别名的常见用法
3. **AI 配音**: 清晰语速
4. **重点**: import 语法、别名、探索模块内容
