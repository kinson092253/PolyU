# Chapter 8.2: Common Built-in Modules - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "8.2 Common Built-in Modules"
**配音**:
Welcome to Lesson 8.2: Common Built-in Modules. Python comes with dozens of useful modules. Let's explore the most popular ones you'll use regularly!

---

## [场景 2: 常用模块概览] (35 秒)
**画面**: 模块图标展示
**配音**:
Python's standard library is massive. Today we'll explore the most essential modules: math for mathematical operations, random for generating random numbers, datetime for working with dates and times, os for operating system tasks, and json for working with JSON data. These modules solve common programming tasks without external dependencies.

---

## [场景 3: 实际操作 - math 模块] (80 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
OK, Let's explore the math module.

(打字: import math)
(打字: # Common math functions)
(打字: print(math.sqrt(144)))
(运行)
square root function, we see it before, so the output is Twelve!

(打字: print(math.ceil(4.3)))
(打字: print(math.floor(4.8)))
(运行)
C e i l function which used for ceiling the number, it is used for a float number and rounds it up to an integer, if you want to round down the floor, you can use floor function. in this example, 4.3 do the ceiling will get 5 and 4.8 do the flooring will get 4.

(打字: print(math.pow(2, 8)))
(运行)
p o w means power function, the first parameter is the base, and the second parameter is the exponent, so Two to the power of eight equals two fifty-six!

(打字: # Trigonometric functions)
(打字: print(math.sin(math.pi / 2)))
(打字: print(math.cos(0)))
(打字: print(math.tan(45)))
(运行)
we also can use it to calculate Sine, Cosine and tangent. and print the value of pi and e.

(打字: # Constants)
(打字: print(f"Pi: {math.pi}"))
(打字: print(f"E: {math.e}"))
(运行)
Important mathematical constants!

**操作时的代码**:
```python
import math

# Common math functions
print(math.sqrt(144))
print(math.ceil(4.3))
print(math.floor(4.8))
print(math.pow(2, 8))

# Trigonometric functions
print(math.sin(math.pi / 2))
print(math.cos(0))
print(math.tan(45))

# Constants
print(f"Pi: {math.pi}")
print(f"E: {math.e}")
```

---

## [场景 4: 实际操作 - random 模块] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
second, let's see random module.

(打字: import random)
(打字: # Random integer in range)
(打字: print(random.randint(1, 10)))
(运行)
if you want to get a random integer from specific range, you can use randint function, in this example, we want to get a number between one and ten randomly!

(打字: # Random float between 0 and 1)
(打字: print(random.random()))
(运行)
The main purpose of the random function is to generate random numbers, which are used to simulate uncertainty. its range is between 0 to 1. 

(打字: # Random float in range)
(打字: print(random.uniform(5.0, 10.0)))
(运行)
if you want to get float number from float range randomly, you can use uniform function. in this case, Random float between five and ten!

(打字: # Random choice from list)
(打字: colors = ["red", "green", "blue", "yellow"])
(打字: print(random.choice(colors)))
(运行)
however, random module also can use in the list, in this case, you can choose a random element in the list to use choice function.

(打字: # Shuffle a list)
(打字: numbers = [1, 2, 3, 4, 5])
(打字: random.shuffle(numbers))
(打字: print(numbers))
(运行)
If you want to shuffle elements in a list, you can use shuffle function, so the output will print the list again with ramdon element location.

(打字: # Multiple random choices)
(打字: print(random.sample(colors, 2)))
(运行)
if you want to get more than one element in the list randomly, you can use sample function, it can decide how many elements selected from the list randomly. the first parameter enter the list name, second paramter enter how many elements will take out.

**操作时的代码**:
```python
import random

# Random integer in range
print(random.randint(1, 10))

# Random float between 0 and 1
print(random.random())

# Random float in range
print(random.uniform(5.0, 10.0))

# Random choice from list
colors = ["red", "green", "blue", "yellow"]
print(random.choice(colors))

# Shuffle a list
numbers = [1, 2, 3, 4, 5]
random.shuffle(numbers)
print(numbers)

# Multiple random choices
print(random.sample(colors, 2))
```

---

## [场景 5: 实际操作 - datetime 模块] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
third, Work with dates and times using datetime module.

(打字: import datetime)
(打字: # Current date and time)
(打字: now = datetime.datetime.now())
(打字: print(now))
(运行)
if you want to know the current date and time! you can input datetime doc datetime doc now to call the now function.

(打字: # Current date only)
(打字: today = datetime.date.today())
(打字: print(today))
(运行)
if just want to know the date only, input datetime doc date doc today. it will output current's date! the default format is year, month, day with number. 

(打字: # Format dates)
(打字: print(datetime.date.today().strftime("%B %d, %Y")))
(运行)
however, you also can custom the date format. just input doc s t r f t i m e, after today function with specfic format. Uppercase letter B means display the full name of month with string format. lowercase letter d means the date with number format, and uppercase latter Y means display the full name of year with number format. more details can check it in python official website.

(打字: # Create specific date)
(打字: birthday = datetime.date(1990, 5, 15))
(打字: print(birthday))
(运行)
if you want to display specific date, you can input datetime doc date and input three parameters with year, month, day. in this example, let's input nineteen ninety, five and fifteenth! it will output nineteen ninety year, may and fifteenth.

**操作时的代码**:
```python
import datetime

# Current date and time
now = datetime.datetime.now()
print(now)

# Current date only
today = datetime.date.today()
print(today)
print(datetime.date.today().strftime("%B %d, %Y"))

# Create specific date
birthday = datetime.date(1990, 5, 15)
print(birthday)


```

---

## [场景 6: 实际操作 - os 模块] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
fourth, The os module interacts with the operating system.

(打字: import os)
(打字: # Current working directory)
(打字: print(os.getcwd()))
(运行)
if you want to check the current directory, you can input o s doc get c w d.

(打字: # List files in directory)
(打字: files = os.listdir('.'))
(打字: print(files))
(运行)
and then, to check what file in specfic directory, you can input o s doc list d i r, and input path in bracket, so it will display all file in specfic directory

(打字: # Check if file exists)
(打字: print(os.path.exists('test.txt')))
(运行)
if you want to check file exist or not, you can input o s dot path dot exists, and input file name in bracket. then output return boolean value.

(打字: # Check if path is file or directory)
(打字: print(os.path.isfile('test.txt')))
(打字: print(os.path.isdir('.')))
(运行)
and then, you also can check the path is file or directory or not too, input o s dot path dot is file and input path with string format in the bracket. the output also return boolean value.

(打字: # Get file size)
(打字: # print(os.path.getsize('some_file.txt')))
you also can input o s dot path dot get size to know specific file size.

(打字: # Join paths (works on all operating systems))
(打字: path = os.path.join('folder', 'subfolder', 'file.txt'))
(打字: print(path))
(运行)
and then, you also can join the path to use o s dot path dot join. why use this since it can generate correctly formatted path for any OS.

**操作时的代码**:
```python
import os

# Current working directory
print(os.getcwd())

# List files in directory
files = os.listdir('.')
print(files[:5])

# Check if file exists
print(os.path.exists('test.txt'))

# Check if path is file or directory
print(os.path.isfile('test.txt'))
print(os.path.isdir('.'))

# Get file size
# print(os.path.getsize('some_file.txt'))

# Join paths (works on all operating systems)
path = os.path.join('folder', 'subfolder', 'file.txt')
print(path)
```

---

## [场景 7: 实际操作 - json 模块] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
finally, let's see json module, JSON is a popular data format. Let's work with it.

(打字: import json)
(打字: # Python dictionary to JSON string)
(打字: student = {"name": "Alice", "age": 20, "grades": [85, 90, 95]})
(打字: json_string = json.dumps(student))
(打字: print(json_string))
(打字: print(type(json_string)))
(运行)
imort json, then if you want to convert dictionary to json format, you can input json dot dumps, and input dictionary name in bracket.

(打字: # JSON string to Python dictionary)
(打字: json_data = '{"name": "Bob", "age": 25}')
(打字: python_dict = json.loads(json_data))
(打字: print(python_dict))
(打字: print(type(python_dict)))
(运行)
On the contrary, you can convert JSON to dictionary format to input json dot loads, and input json file name in the bracket too.



**操作时的代码**:
```python
import json

# Python dictionary to JSON string
student = {"name": "Alice", "age": 20, "grades": [85, 90, 95]}
json_string = json.dumps(student)
print(json_string)
print(type(json_string))

# JSON string to Python dictionary
json_data = '{"name": "Bob", "age": 25}'
python_dict = json.loads(json_data)
print(python_dict)
print(type(python_dict))


```

---

## [场景 8: 实际应用] (50 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Combining modules: lottery number generator with timestamp.

(打字: import random)
(打字: import datetime)
(打字: import json)
(打字: def generate_lottery():)
(Tab, 打字:     numbers = random.sample(range(1, 50), 6))
(Tab, 打字:     timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
(Tab, 打字:     result = {"numbers": sorted(numbers), "timestamp": timestamp})
(Tab, 打字:     return json.dumps(result, indent=2))
(打字: print(generate_lottery()))
(运行)
Random lottery numbers with timestamp in JSON format! Multiple modules working together!

**操作时的代码**:
```python
import random
import datetime
import json

def generate_lottery():
    numbers = random.sample(range(1, 50), 6)
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    result = {"numbers": sorted(numbers), "timestamp": timestamp}
    return json.dumps(result, indent=2)

print(generate_lottery())
```

---

## [场景 9: 结尾] (10 秒)
**画面**: 总结卡片
**配音**:
Excellent! You've learned the most important built-in modules. Next, we'll learn to create your own custom modules. See you there!

---

## 制作注意事项：
1. **讲解部分** (场景 1-2, 9): PPT 展示
2. **操作部分** (场景 3-8): 
   - 每个模块展示核心功能
   - 强调实际应用
   - 演示模块组合使用
3. **AI 配音**: 清晰语速
4. **重点**: 每个模块的最常用功能
