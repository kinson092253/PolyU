# Chapter 7.3: Variable Scope and Lambda Functions - Video Script
# 总时长：约 5 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "7.3 Variable Scope and Lambda Functions"
**配音**:
Welcome to Lesson 7.3: Variable Scope and Lambda Functions. Understanding scope helps avoid bugs, and lambda functions provide a concise way to write small functions. Let's explore!

---

## [场景 2: 作用域介绍] (40 秒)
**画面**: 作用域概念图示
**配音**:
Variable scope determines where a variable can be accessed. The LEGB rule guides Python include Local, Enclosed, Global, and Built-in. Local variables exist only inside functions. Global variables exist outside functions and are accessible everywhere. Enclosed scope relates to nested functions. Built-in scope can use in anywhere and no need to define by user before. Understanding scope prevents naming conflicts and bugs. 

---

## [场景 3: 实际操作 - 局部和全局作用域] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
OK, Let's see how to use local and global scope first.

(打字: # Global variable)
(打字: message = "I'm global")
(打字: def show_message():)
(Tab, 打字:     print(message))
To define global variable, the variable must define outside the function, when you define function, it can access this global variable. let's see the example. here i define a message equal to I'm global. then define a show message function. inside the function. print the message.

(打字: show_message())
(打字: print(message))
(运行)
when i call the function and print the message, the output are same and show that I'm global! that means the function can access this global variable.


(打字: def create_local():)
(Tab, 打字:     local_message = "I'm local")
(Tab, 打字:     print(local_message))
however, if i define a local variable inside the function. like this, d e f create local, then define a variable local message equal to i'm local. and print the local message inside the function.

(打字: create_local())
(运行)
when i call this function. it's Work. right? it can print the variable message.

(打字: # This would cause error:)
(打字: # print(local_message))
but if i print the varible directly, the output is error message. since we can't access local variable outside!


(打字: x = 10  # Global)
(打字: def modify_global():)
(Tab, 打字:     global x)
(Tab, 打字:     x = 20)
(Tab, 打字:     print(f"Inside: x = {x}"))
on the other hand, we also can modify the value of global variable in the function. in this case, we define the global variable first, the variable name must same with global variable name, and its type is global, then we modify the x from 10 to 20, before we call the function, print the x that it can show the original data, when we call the function, the value of x will change, then we print the x again, see, The global variable was modified! the value change to 20.

(打字: print(f"Before: x = {x}"))
(打字: modify_global())
(打字: print(f"After: x = {x}"))
(运行)


**操作时的代码**:
```python
# Global variable
message = "I'm global"

def show_message():
    print(message)

show_message()
print(message)

# Local variable
def create_local():
    local_message = "I'm local"
    print(local_message)

create_local()

# This would cause error:
# print(local_message)



x = 10  # Global

def modify_global():
    global x
    x = 20
    print(f"Inside: x = {x}")

print(f"Before: x = {x}")
modify_global()
print(f"After: x = {x}")
```

---

## [场景 4: 实际操作 - 嵌套作用域] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
next, let's introduce enclosed scope, functions inside functions have enclosed scope.

(打字: def outer():)
(Tab, 打字:     outer_var = "I'm outer")
(Tab, 打字:     def inner():)
(Tab*2, 打字:         print(outer_var))
(Tab*2, 打字:         inner_var = "I'm inner")
(Tab*2, 打字:         print(inner_var))
(Tab, 打字:     inner())
(Tab, 打字:     print("Back in outer"))
define a function named outer, then inside the outer, i define a variable named outer variable equal to i'm outer, and define a function named inner inside the outer function. in this inner function, print the outer variable, and define an inner variable equal to i'm inner, then print the inner variable too. after complete the inner function definition, call the inner function inside the outer function. finally, complete the outer function definition, call the outer function. run the code, we can see the output that Inner function can access outer function's variables! that's enclosed scope.

(打字: outer())


(打字: def outer2():)
(Tab, 打字:     count = 0)
(Tab, 打字:     def increment():)
(Tab*2, 打字:         nonlocal count)
(Tab*2, 打字:         count += 1)
(Tab*2, 打字:         return count)
(Tab, 打字:     print(increment()))
(Tab, 打字:     print(increment()))
(打字: outer2())
(运行)
one more example, we define outer function with a varialbe count equal to zero, and a inner function named increment, inside the increment function, i want to change the value of count, so i define the count variable again, pay attention that the type in here should use nonlocal rather then global, since count is not a global variable and local variable, then change count equal to count plus one. that means every time to call increment function, the count value will plus one. if call it two time, the value of count is two. after complete the increment function definition, execute the increment function two time and print it inside the outer function. then complete the outer function definition, call the outer function. run the code, you can see that the output is two, that's mean the inner functions also can modify outer function variables!

**操作时的代码**:
```python
def outer():
    outer_var = "I'm outer"
    
    def inner():
        print(outer_var)
        inner_var = "I'm inner"
        print(inner_var)
    
    inner()
    print("Back in outer")

outer()


def outer():
    count = 0
    
    def increment():
        nonlocal count
        count += 1
        return count
    
    print(increment())
    print(increment())

outer()
```

---



## [场景 5: Lambda 函数介绍] (30 秒)
**画面**: Lambda 概念图示
**配音**:
OK, we complete the introduction of variable scope. now, let's introduce what is lambda function. 
Lambda functions are small, anonymous functions. They're written in one line and are perfect for simple operations. using lambda function can help us to avoid defining a full function with definition just for a simple one-liner logic. it can make the program clear and tidy. The syntax is: lambda parameters colon expression. Lambda functions can have multiple parameters but only one expression. They're commonly used with functions like map, filter, and sorted.

---

## [场景 6: 实际操作 - 基本 Lambda] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's see how to use lambda functions.

(打字: # Regular function)
(打字: def square(x):)
(Tab, 打字:     return x ** 2)
(打字: print(square(5)))
(运行)
in this example, we want to input a number and know its squared value. if use Regular function, we need to define a function and named it with parameter x. here we define square x, then return the value with square operation. call the function and print the result. 

(打字: # Same as lambda)
(打字: square_lambda = lambda x: x ** 2)
however, if we use lambda function, just one line can do the same work! Lambda takes x and returns x squared.

(打字: print(square_lambda(5)))
(运行)
the function call is same with the regular function. the output are Same! but use lambda is much more concise!



(打字: # Multiple parameters)
(打字: add = lambda a, b: a + b)
(打字: print(add(3, 7)))
(运行)
and then, lambda also accept multiple parameters. in this example, lambda function accept two parameters and use them to do the addition operation. we call the function with three and seven this two parameters. run the code, see, the output is Ten!

(打字: # More complex expression)
(打字: is_even = lambda n: n % 2 == 0)
(打字: print(is_even(4)))
(打字: print(is_even(5)))
(运行)
We can also use lambda to determine whether the parameters meet the requirements or not! Lambda can return boolean values.

**操作时的代码**:
```python
# Regular function
def square(x):
    return x ** 2

print(square(5))

# Same as lambda
square_lambda = lambda x: x ** 2
print(square_lambda(5))

# Multiple parameters
add = lambda a, b: a + b
print(add(3, 7))

# More complex expression
is_even = lambda n: n % 2 == 0
print(is_even(4))
print(is_even(5))
```

---

## [场景 7: 实际操作 - Lambda 与内置函数] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
finally, let's demo how Lambda functions shine with map, filter, and sorted.

(打字: numbers = [1, 2, 3, 4, 5])
(打字: # Map - apply function to each element)
(打字: squared = list(map(lambda x: x ** 2, numbers)))
(打字: print(squared))
(运行)
with map function, it can use to apply the lambda function to each element, for example, we create a list named with numbers include 1 to 5, then we can make all numbers squared to use map function! Map applies the lambda to each item in numbers list. run the code, so the output is 1, 4, 9, 16, and 25.

(打字: # Filter - keep elements that return True)
(打字: evens = list(filter(lambda x: x % 2 == 0, numbers)))
(打字: print(evens))
(运行)
about filter function, it only print the result which match the lambda function, in this case, Filter function only keeps items where lambda returns True. so the output is 2 and 4 only.

(打字: # Sorted with key)
(打字: words = ["banana", "pie", "Washington", "book"])
(打字: sorted_words = sorted(words, key=lambda s: len(s)))
Sort function can sort the list with specific condition, in this example, it is sorted by length of each word, you can see the output, the first length of element is shortest, and the last element is longest in the list. and you also can sort it by alphabetically and other method!

(打字: print(sorted_words))
(运行)
Sorted by word length!

(打字: # Sort by last letter)
(打字: by_last = sorted(words, key=lambda s: s[-1]))
(打字: print(by_last))
(运行)
Sorted by last letter! Lambda makes custom sorting easy!

**操作时的代码**:
```python
numbers = [1, 2, 3, 4, 5]

# Map - apply function to each element
squared = list(map(lambda x: x ** 2, numbers))
print(squared)

# Filter - keep elements that return True
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)

# Sorted with key
words = ["banana", "pie", "Washington", "book"]
sorted_words = sorted(words, key=lambda s: len(s))
print(sorted_words)

# Sort by last letter
by_last = sorted(words, key=lambda s: s[-1])
print(by_last)
```

---

## [场景 8: 实际应用] (50 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Practical example: processing student data.

(打字: students = [)
(Tab, 打字:     {"name": "Alice", "grade": 85},)
(Tab, 打字:     {"name": "Bob", "grade": 92},)
(Tab, 打字:     {"name": "Charlie", "grade": 78})
(打字: ])
(打字: # Sort by grade)
(打字: by_grade = sorted(students, key=lambda s: s["grade"], reverse=True))
(打字: for student in by_grade:)
(Tab, 打字:     print(f"{student['name']}: {student['grade']}")
(打字: # Filter high achievers)
(打字: high_achievers = list(filter(lambda s: s["grade"] >= 85, students)))
(打字: print(f"\nHigh achievers: {len(high_achievers)}")
(运行)
Lambda functions make data processing elegant!

**操作时的代码**:
```python
students = [
    {"name": "Alice", "grade": 85},
    {"name": "Bob", "grade": 92},
    {"name": "Charlie", "grade": 78}
]

# Sort by grade
by_grade = sorted(students, key=lambda s: s["grade"], reverse=True)
for student in by_grade:
    print(f"{student['name']}: {student['grade']}")

# Filter high achievers
high_achievers = list(filter(lambda s: s["grade"] >= 85, students))
print(f"\nHigh achievers: {len(high_achievers)}")
```

---

## [场景 9: 结尾] (10 秒)
**画面**: 总结卡片
**配音**:
Good Job! You've mastered variable scope and lambda functions. Next chapter, we'll explore modules and packages. See you there!

---

## 制作注意事项：
1. **讲解部分** (场景 1-2, 5, 9): PPT 展示
2. **操作部分** (场景 3-4, 6-8): 
   - 清晰演示作用域规则
   - 对比 lambda 和常规函数
   - 展示 lambda 的实际应用
3. **AI 配音**: 清晰语速
4. **重点**: global/nonlocal 关键字、lambda 语法、map/filter
