# Chapter 7.2: Function Parameters and Return Values - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "7.2 Function Parameters and Return Values"
**配音**:
Welcome to Lesson 7.2: Function Parameters and Return Values. Parameters let functions accept input, and return values let them give back output. Let's make our functions interactive!

---

## [场景 2: 参数和返回值介绍] (40 秒)
**画面**: 参数和返回值概念动画
**配音**:
Parameters are variables in the function definition that receive values when the function is called. Arguments are the actual values you pass. Return values let functions send results back to the caller. Think of a function like a machine - parameters are the input, the function body processes them, and the return value is the output. This makes functions flexible and reusable with different data.

---

## [场景 3: 实际操作 - 基本参数] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
Now, Let's see how to add parameters to functions in practicial.

(打字: def greet(name):)
(Tab, 打字:     print(f"Hello, {name}!"))
let's define a function named greet, inside the bracket, name is a parameter, when call the function, it receives a value and use it in the function when call this parameter.

(打字: greet("Alice"))
(运行)
run the code, see, we pass Alice as an argument. so the output is hello alice.

(打字: greet("Bob"))
(打字: greet("Charlie"))
(运行)
and then, same function also can use with different parameter input. like this.


(打字: # Multiple parameters)
(打字: def introduce(name, age):)
(Tab, 打字:     print(f"I'm {name} and I'm {age} years old."))
on the other hand, you can add more than one parameters in the function!

(打字: introduce("Alice", 20))
(运行)
in this case, i have name parameter and age parameter in this function. when i call the function, alice is the name, 20 is the age. so you can see the output is I'm Alice and I'm twenty years old! and pay attention that when you call a function, you must enter the parameters in the order they appear.



**操作时的代码**:
```python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
greet("Bob")
greet("Charlie")

# Multiple parameters
def introduce(name, age):
    print(f"I'm {name} and I'm {age} years old.")

introduce("Alice", 20)
introduce("Bob", 25)
```

---

## [场景 4: 实际操作 - 返回值] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
moreover, Functions also can return values. but why we need to use return? because return statement has two primary roles, First, it returns a value or multiple values to the caller of the function. and caller can save it in a variable for further use. Second, it immediately stops the execution of the function. For instance, in an authentication check, if the first condition fails and a return is executed, the remaining code in the function will not run.


(打字: def add(a, b):)
(Tab, 打字:     return a + b)
let's see the demo, define an add function with a and b two parameters. inside the function, i return the result with a plus b.

(打字: result = add(5, 3))
so when i call this function, i create a variable result to capture the returned value.

if result > 10:
    print('your result is greater than 10')
else:
    print('your result is less than 10')

After I obtain the results, I can use it for further comparison.


(打字: print(result))
(运行)
Eight! The function returned the sum!


One more example to demonstrate return, We define a dictionary to store user information. Then we create a function to check the user's input. If the username does not exist in the database, it prints an error message and immediately returns False, terminating the function without checking the password. so the output is account does not exist.

**操作时的代码**:
```python
def add(a, b):
    return a + b

result = add(5, 3)


example2:
user_database = {
    "alice": "password123",
    "bob": "qwerty",
    "charlie": "letmein"
}

def check_login(username, password):
    if username not in user_database:
        print("account does not exist")
        return False          

    
    if password != user_database[username]:
        print("incorrect password")
        return False          
    
    print("login successful")
    return True               

check_login("ken", "password123")
```

---

## [场景 5: 实际操作 - 默认参数] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
however, Parameters can set the default values when define it.

(打字: def greet(name, greeting="Hello"):)
(Tab, 打字:     print(f"{greeting}, {name}!"))
for example, define greet function with name parameter and greeting parameter. Greeting has a default value of Hello.

(打字: greet("Alice"))
(运行)
then, i call the greet function and input name parameter to alice, although we don't input another parameters. the program also can run. run the code, Hello, Alice! Used the default greeting as the parameter.

(打字: greet("Bob", "Hi"))
(运行)
but if you call the function that input all parameters. the program will use new parameter rather then use default parameter. you can see the output is Hi, Bob! 


(打字: def create_profile(name, age=18, country="USA"):)
(Tab, 打字:     print(f"{name}, {age} years old, from {country}"))
Multiple default parameters!

(打字: create_profile("Alice"))
(运行)
Used all defaults!

(打字: create_profile("Bob", 25))
(运行)
Custom age, default country!

(打字: create_profile("Charlie", 30, "UK"))
(运行)
All custom values! Default parameters are optional!

**操作时的代码**:
```python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")
greet("Bob", "Hi")

def create_profile(name, age=18, country="USA"):
    print(f"{name}, {age} years old, from {country}")

create_profile("Alice")
create_profile("Bob", 25)
create_profile("Charlie", 30, "UK")
```

---

## [场景 6: 实际操作 - 关键字参数] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
You can specify arguments by name.

(打字: def book_info(title, author, year):)
(Tab, 打字:     print(f"{title} by {author} ({year})"))
Three parameters.

(打字: book_info("Python 101", "John Doe", 2024))
(运行)
Positional arguments - order matters.

(打字: book_info(year=2024, title="Python 101", author="John Doe"))
Keyword arguments - order doesn't matter!

(运行)
Same result! Named arguments are clearer.

(打字: book_info("Python 101", year=2024, author="John Doe"))
(运行)
You can mix positional and keyword arguments! Positional must come first.

**操作时的代码**:
```python
def book_info(title, author, year):
    print(f"{title} by {author} ({year})")

book_info("Python 101", "John Doe", 2024)

book_info(year=2024, title="Python 101", author="John Doe")

book_info("Python 101", year=2024, author="John Doe")
```

---

## [场景 7: 实际操作 - None 返回值] (50 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Functions without return statements return None.

(打字: def print_message(msg):)
(Tab, 打字:     print(msg))
No return statement.

(打字: result = print_message("Hello!"))
(运行)
Hello is printed!

(打字: print(f"Result: {result}"))
(运行)
Result is None! Functions without return automatically return None.

(打字: def process_data(data):)
(Tab, 打字:     if data < 0:)
(Tab*2, 打字:         return None  # Early return for invalid data)
(Tab, 打字:     return data * 2)
(打字: print(process_data(5)))
(打字: print(process_data(-3)))
(运行)
None can signal invalid or missing results!

**操作时的代码**:
```python
def print_message(msg):
    print(msg)

result = print_message("Hello!")
print(f"Result: {result}")

def process_data(data):
    if data < 0:
        return None  # Early return for invalid data
    return data * 2

print(process_data(5))
print(process_data(-3))
```

---

## [场景 8: 实际应用] (50 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Practical example: temperature converter.

(打字: def celsius_to_fahrenheit(celsius):)
(Tab, 打字:     return (celsius * 9/5) + 32)
(打字: def fahrenheit_to_celsius(fahrenheit):)
(Tab, 打字:     return (fahrenheit - 32) * 5/9)
(打字: temp_c = 25)
(打字: temp_f = celsius_to_fahrenheit(temp_c))
(打字: print(f"{temp_c}°C = {temp_f}°F"))
(打字: temp_f2 = 77)
(打字: temp_c2 = fahrenheit_to_celsius(temp_f2))
(打字: print(f"{temp_f2}°F = {temp_c2:.1f}°C"))
(运行)
Real-world functions with clear inputs and outputs!

**操作时的代码**:
```python
def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    return (fahrenheit - 32) * 5/9

temp_c = 25
temp_f = celsius_to_fahrenheit(temp_c)
print(f"{temp_c}°C = {temp_f}°F")

temp_f2 = 77
temp_c2 = fahrenheit_to_celsius(temp_f2)
print(f"{temp_f2}°F = {temp_c2:.1f}°C")
```

---

## [场景 9: 结尾] (10 秒)
**画面**: 总结卡片
**配音**:
Great work! You've learned parameters, return values, defaults, and keyword arguments. Next, we'll explore variable scope and lambda functions. See you there!

---

## 制作注意事项：
1. **讲解部分** (场景 1-2, 9): PPT 展示
2. **操作部分** (场景 3-8): 
   - 区分参数和参数值
   - 演示返回值的多种用法
   - 展示默认参数和关键字参数
3. **AI 配音**: 清晰语速
4. **重点**: return 语句、默认值、关键字参数
