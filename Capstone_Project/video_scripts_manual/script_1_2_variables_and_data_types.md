# Chapter 1.2: Variables and Data Types - Video Script
# 总时长：约 4-5 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "1.2 Variables and Data Types"
**配音**:
Welcome to Lesson 1.2: Variables and Data Types. In this lesson, we'll learn how to store and work with different types of data in Python.

---

## [场景 2: 什么是变量] (30 秒)
**画面**: 变量概念动画（箱子装东西的比喻）
**配音**:
Think of a variable as a labeled box that stores information. You give it a name, and you can put data inside it. Later, you can retrieve or change that data using the variable's name. In Python, creating a variable is simple - you just write the name, an equals sign, and the value you want to store.

---

## [场景 3: 数据类型介绍] (40 秒)
**画面**: 数据类型列表和示例
**配音**:
Python has several data types. Integers are whole numbers like 1, 2, or 100. Floats are decimal numbers like 3.14 or 2.5. Strings are text, enclosed in quotes, like "Hello" or "Python". And booleans are either True or False, used for logical operations. Python automatically determines the data type based on the value you assign.

---

## [场景 4: 实际操作 - 创建变量] (120 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
Let's create some variables. I'll open the code editor.

(打字: name = 'Alice')
First, let's create a string variable called "name" and assign it the value "Alice". Notice the quotes around Alice - this tells Python it's text.

(打字: age = 25)
Next, an integer variable called "age" with the value 25. No quotes needed for numbers.

(打字: height = 5.6)
Now a float variable called "height" set to 5.6. The decimal point makes this a float.

(打字: is_student = True)
And finally, a boolean variable called "is underscore student" set to True. Note that True starts with a capital T.

(pause 2 秒)
Now, let's print these variables to see their values.

(打字 4 行 print)
I'll use the print function for each variable. Print open parenthesis name close parenthesis. Then age, then height, then is underscore student.

(点击运行)
When we run this, you can see all the values displayed. Alice, 25, 5.6, and True.

**操作时的代码**:
```python
name = 'Alice'
age = 25
height = 5.6
is_student = True

print(name)
print(age)
print(height)
print(is_student)
```

---

## [场景 5: 实际操作 - 变量运算] (80 秒)
**画面**: 继续录屏操作
**配音 - 操作讲解**:
Variables can also be used in calculations. Let me show you.

(清空编辑器，打字: x = 10)
Let's create a variable x equals 10.

(打字: y = 3)
And y equals 3.

(打字: sum = x + y)
Now we can add them together and store the result in a new variable called sum.

(打字: product = x * y)
We can multiply them and store it in product.

(打字: print('Sum:', sum))
Let's print the sum. I'll add a label: print open parenthesis quote Sum colon quote comma sum.

(打字: print('Product:', product))
And the product: print open parenthesis quote Product colon quote comma product.

(点击运行)
When we run this, we see Sum: 13 and Product: 30. Python performed the calculations and displayed the results.

**操作时的代码**:
```python
x = 10
y = 3

sum = x + y
product = x * y

print('Sum:', sum)
print('Product:', product)
```

---

## [场景 6: 实际操作 - 修改变量] (40 秒)
**画面**: 继续录屏
**配音 - 操作讲解**:
On the other hand, Variables can be changed. Watch this.

(打字: score = 80)
Let's create a variable score with value 80.

(打字: print('Original score:', score))
Print it. then the output will show 80 right?

(打字: score = 95)
but now I reassign score to 95.

(打字: print('New score:', score))
Print it again.

(点击运行)
See? First it shows 80, then 95. The variable value was updated.

**操作时的代码**:
```python
score = 80
print('Original score:', score)

score = 95
print('New score:', score)
```

---

## [场景 7: 结尾] (10 秒)
**画面**: 标题卡或总结
**配音**:
Excellent! You now know how to create and use variables with different data types. Practice creating your own variables, and I'll see you in the next lesson!

---

## 制作注意事项：
1. **录屏要点**:
   - 打字时，偶尔"犯错"再改正（更真实）
   - 运行前先看一眼代码（检查的感觉）
   - 光标停留在重要部分 1-2 秒
2. **AI 配音节奏**: 在打字时稍微慢一点，让声音和动作同步
3. **字幕**: 建议添加中英文字幕

---
