# Chapter 8.3: Creating Custom Modules - Video Script
# 总时长：约 5 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "8.3 Creating Custom Modules"
**配音**:
Welcome to Lesson 8.3: Creating Custom Modules. You can create your own modules to organize code and share functionality across projects. Let's learn how!

---

## [场景 2: 自定义模块介绍] (40 秒)
**画面**: 模块概念图示
**配音**:
Creating a module is simple - any Python file is a module! When you save functions in a dot py file, you can import that file from other Python programs. This helps organize large projects, promotes code reuse, and makes maintenance easier. You can create modules for utilities, configurations, or shared functions. It's like building your own personal library!

---

## [场景 3: 实际操作 - 创建第一个模块] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
Now，Let's create our first custom module in code editor.

(创建新文件: mymath.py)
I'm creating a new file called mymath dot py.

(打字: # mymath.py - Custom math utilities)
(打字: def square(x):)
(Tab, 打字:     """Calculate square of a number""")
(Tab, 打字:     return x ** 2)
(打字: def cube(x):)
(Tab, 打字:     """Calculate cube of a number""")
(Tab, 打字:     return x ** 3)
(打字: def average(numbers):)
(Tab, 打字:     """Calculate average of a list""")
(Tab, 打字:     return sum(numbers) / len(numbers))
(打字: # Module-level variable)
(打字: PI = 3.14159)
next, open mymath file and import math module and write down some function named square, cube, average and pi, all functions except pi function mush input a parameter x when call it, then, to call different function will do the different calculation and return the result to user. OK, save this file!

(创建新文件: main.py)
Now create main dot py in the same directory.

(打字: import mymath)
inside the main file, remember to import our custom module before you use it!

(打字: print(mymath.square(5)))
(打字: print(mymath.cube(3)))
(打字: print(mymath.average([10, 20, 30, 40])))
(打字: print(mymath.pi))
(运行)
after that, we can call all custom functions from mymath module in main file here! and remind that, parameter can be different type like integer, float, string, list and etc. run the code, you can see the outputs are Twenty-five, twenty-seven, twenty-five, and value of pi 3.14!

**操作时的代码 - mymath.py**:
```python
# mymath.py - Custom math utilities
import math

def square(x):
    """Calculate square of a number"""
    return x ** 2

def cube(x):
    """Calculate cube of a number"""
    return x ** 3

def average(numbers):
    """Calculate average of a list"""
    return sum(numbers) / len(numbers)

def pi():
    """Return the value of pi"""
    return math.pi
```

**操作时的代码 - main.py**:
```python
import mymath

print(mymath.square(5))
print(mymath.cube(3))
print(mymath.average([10, 20, 30, 40]))
print(mymath.PI)
```

---

## [场景 4: 实际操作 - 不同导入方式] (70 秒)
**画面**: 录屏操作，继续编辑 main.py
**配音 - 操作讲解**:
moreover, we have introduced several method to import the module before, these method also work with custom modules. let's see the example.

(清空 main.py，打字: from mymath import square, cube)
first, we can import specific functions in the custom module.

(打字: print(square(4)))
(打字: print(cube(2)))
(运行)
so when we call it, we are no need to input the module prefix. and we also can see the output, Sixteen and eight!

(清空，打字: from mymath import average as avg)
we also can import with alias if the function name is too long.

(打字: numbers = [5, 10, 15, 20])
(打字: print(f"Average: {avg(numbers)}"))
(运行)
see, here we use the alias to call the function, Average is twelve point five!

(清空，打字: import mymath as mm)
and Module also can save with alias.

(打字: print(mm.square(7)))
(打字: print(mm.PI))
(运行)
and it is work, output is Forty-nine and value of pi!

**操作时的代码**:
```python
from mymath import square, cube

print(square(4))
print(cube(2))

# --

from mymath import average as avg

numbers = [5, 10, 15, 20]
print(f"Average: {avg(numbers)}")

# --

import mymath as mm

print(mm.square(7))
print(mm.PI)
```

---

## [场景 5: 实际操作 - __name__ 变量] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
OK, let me introduce some Special variable which is useful when you define the module, the first one you can input underscore underscore name underscore underscore.

(编辑 mymath.py，添加到底部:)
(打字: def test_functions():)
(Tab, 打字:     print("Testing square:", square(4)))
(Tab, 打字:     print("Testing cube:", cube(3)))
(打字: if __name__ == "__main__":)
(Tab, 打字:     print("Running mymath.py directly"))
(Tab, 打字:     test_functions())
if you use this varible equal to underscore underscore main underscore underscore. This means the code only runs when file is executed directly, not when imported! let me show you the different.

(运行 mymath.py)
in this case, When we run mymath dot py directly, the test code executes!

(切换到 main.py)
(打字: import mymath)
(打字: print(mymath.square(5)))
(运行 main.py)
however, When imported in main dot py, since the underscore underscore main underscore underscore will change to module name my math, it is not match the condition so the test code doesn't run! the benefit is available to do some test in the module file directly and avoids unnecessary output when importing modules.

**操作时的代码 - mymath.py (底部添加)**:
```python
def test_functions():
    print("Testing square:", square(4))
    print("Testing cube:", cube(3))

if __name__ == "__main__":
    print("Running mymath.py directly")
    test_functions()
```

---

## [场景 6: 实际操作 - 文档字符串] (60 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
next, we can Add documentation to our module.

(编辑 mymath.py 顶部:)
(打字: """mymath - Custom Mathematics Module)
(打字: )
(打字: This module provides basic math utilities:)
(打字: - square(x): Returns x squared)
(打字: - cube(x): Returns x cubed)
(打字: - average(numbers): Returns average of list)
(打字: """)
but it must use Module-level docstring to explain what the module does, pay attention that you cannot use hashtag to write the documentation comment.

(在 main.py 中:)
(打字: import mymath)
(打字: print(mymath.__doc__))
(运行)
so when you in other file, before you use module, you can call underscore underscore d o c underscore underscore to print out the module documentation!

(打字: help(mymath.square))
(运行)
and we also can use Help function for check specfic function description!

**操作时的代码 - mymath.py (顶部)**:
```python
"""
mymath - Custom Mathematics Module

This module provides basic math utilities:
- square(x): Returns x squared
- cube(x): Returns x cubed
- average(numbers): Returns average of list
"""

# ... rest of the code
```

**操作时的代码 - main.py**:
```python
import mymath

print(mymath.__doc__)
help(mymath.square)
```

---

## [场景 7: 实际操作 - 模块包结构] (60 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
on the other hand, we also can organize several modules in a package.

(创建文件夹结构展示:)
utilities/
    __init__.py
    math_utils.py
    string_utils.py

(创建 utilities/__init__.py 文件，为空或写:)
(打字: # This makes utilities a package)
we define a folder named utilities, and put modules file into this foloder, but pay attention that in the package, you must define a file named underscore underscore init underscore underscore dot py to makes this directory to a package! and this file can be empty.

(创建 utilities/string_utils.py:)
(打字: def reverse(text):)
(Tab, 打字:     return text[::-1])
(打字: def capitalize_words(text):)
(Tab, 打字:     return text.title())

(在 main.py:)
(打字: from utilities import string_utils)
(打字: print(string_utils.reverse("hello")))
(打字: print(string_utils.capitalize_words("python is awesome")))
(运行)
in this case, we have two modules in this pacakge, when we want to use specific module, we can input from package name import module name. then call specific function with module name dot function name to call it.

**文件结构**:
```
utilities/
    __init__.py
    string_utils.py
```

**操作时的代码 - string_utils.py**:
```python
def reverse(text):
    return text[::-1]

def capitalize_words(text):
    return text.title()
```

**操作时的代码 - main.py**:
```python
from utilities import string_utils

print(string_utils.reverse("hello"))
print(string_utils.capitalize_words("python is awesome"))
```

---

## [场景 8: 实际应用] (50 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Real-world module: configuration manager.

(创建 config.py:)
(打字: """Application configuration module""")
(打字: # Database settings)
(打字: DB_HOST = "localhost")
(打字: DB_PORT = 5432)
(打字: DB_NAME = "myapp")
(打字: # App settings)
(打字: DEBUG = True)
(打字: MAX_CONNECTIONS = 100)
(打字: def get_db_url():)
(Tab, 打字:     return f"{DB_HOST}:{DB_PORT}/{DB_NAME}")

(在 main.py:)
(打字: import config)
(打字: print(f"Debug mode: {config.DEBUG}"))
(打字: print(f"Database: {config.get_db_url()}"))
(运行)
Centralized configuration! Easy to manage!

**操作时的代码 - config.py**:
```python
"""Application configuration module"""

# Database settings
DB_HOST = "localhost"
DB_PORT = 5432
DB_NAME = "myapp"

# App settings
DEBUG = True
MAX_CONNECTIONS = 100

def get_db_url():
    return f"{DB_HOST}:{DB_PORT}/{DB_NAME}"
```

---

## [场景 9: 结尾] (10 秒)
**画面**: 总结卡片
**配音**:
Excellent! You've learned to create custom modules and organize code professionally. Next chapter, we'll explore object-oriented programming. See you there!

---

## 制作注意事项：
1. **讲解部分** (场景 1-2, 9): PPT 展示
2. **操作部分** (场景 3-8): 
   - 演示文件创建过程
   - 展示目录结构
   - 强调 __name__ == "__main__" 模式
3. **AI 配音**: 清晰语速
4. **重点**: 文件即模块、文档字符串、包结构
