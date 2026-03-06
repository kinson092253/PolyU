# Chapter 6.2: Tuple - Video Script
# 总时长：约 4-5 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "6.2 Tuple"
**配音**:
Welcome to Lesson 6.2: Tuple. Tuples are like lists, but with one key difference - they're immutable. Let's learn when and why to use tuples!

---

## [场景 2: 元组介绍] (40 秒)
**画面**: 元组 vs 列表对比动画
**配音**:
A tuple is an ordered collection like a list, but you cannot change it after creation. Tuples are created with parentheses instead of square brackets. Why use tuples? First, they're faster than lists. Second, they're safer - preventing accidental modifications. Third, they can be used as dictionary keys, unlike lists. Use tuples for data that shouldn't change, like coordinates or dates.

---

## [场景 3: 实际操作 - 创建元组] (80 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
now, Let's see how to create tuples in code editor.

(打字: # Create tuple with parentheses)
(打字: coordinates = (10, 20))
(打字: print(coordinates))
(打字: print(type(coordinates)))
(运行)
please remember to create tuple with parentheses, in this tuple with two values 10 and 20. let's print the tuple and its data type. run the code, you can see the tuple data and its data type show that is tuple type.

(打字: # Tuple without parentheses)
(打字: point = 5, 10, 15)
(打字: print(point))
(打字: print(type(point)))
(运行)
and then, if you define multiple data in a variable without any bracket,  Python also recognizes this as a tuple! So Parentheses are optional if you define a tuple.

(打字: # Single element tuple - need comma!)
(打字: single = (5,))
(打字: print(single))
(打字: print(type(single)))
(运行)
however, although you define a data in tuple, remember that the comma is necessary, which makes it a tuple! if without comma, in this example, it is a integer.
and tuple same with list, also can hold different types in it.
(打字: not_tuple = (5))
(打字: print(type(not_tuple)))
(运行)
Without comma, it's just an integer in parentheses!

(打字: # Mixed types)
(打字: mixed = ("Alice", 20, True, 3.14))
(打字: print(mixed))
(运行)
Tuples can hold different types!

**操作时的代码**:
```python
# Create tuple with parentheses
coordinates = (10, 20)
print(coordinates)
print(type(coordinates))

# Tuple without parentheses
point = 5, 10, 15
print(point)
print(type(point))

# Single element tuple - need comma!
single = (5,)
print(single)
print(type(single))

not_tuple = (5)
print(type(not_tuple))

# Mixed types
mixed = ("Alice", 20, True, 3.14)
print(mixed)
```

---

## [场景 4: 实际操作 - 访问元组元素] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
on the other hand, let's see how to Access tuples works like lists.

(打字: colors = ("red", "green", "blue", "yellow"))
(打字: print(colors[0]))
(运行)
it also same with list, use the index to access the element, for example in this case, print colors zero, the output is Red. it is the first element in this tuple.

(打字: print(colors[-1]))
(运行)
and then, colors minus one means the last element. so the output is Yellow.

(打字: print(colors[1:3]))
(运行)
tuple also can do the slicing works! begin is 1 and end is 3, that means get first and second element that is Green and blue.

(打字: # Unpacking tuples)
(打字: x, y, z = (10, 20, 30))
(打字: print(f"x={x}, y={y}, z={z}"))
(运行)
Tuple unpacking! Each variable gets a value!

(打字: # Swap values using tuples)
(打字: a = 5)
(打字: b = 10)
(打字: a, b = b, a)
(打字: print(f"a={a}, b={b}"))
(运行)
Values swapped in one line! Super elegant!

**操作时的代码**:
```python
colors = ("red", "green", "blue", "yellow")
print(colors[0])
print(colors[-1])
print(colors[1:3])

# Unpacking tuples
x, y, z = (10, 20, 30)
print(f"x={x}, y={y}, z={z}")

# Swap values using tuples
a = 5
b = 10
a, b = b, a
print(f"a={a}, b={b}")
```

---

## [场景 5: 实际操作 - 元组不可变性] (60 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
moreover, Tuples cannot be modified after defined.

(打字: numbers = (1, 2, 3, 4, 5))
(打字: print(numbers))
(运行)
in this case, tuple named numbers with 1 2 3 4 5, print the tuple you can see the same output right?

(打字: # This will cause error:)
(打字: # numbers[0] = 10)
if i input number zero equal to 10 which mean i want to change the element of index zero from 1 change 1 to 10.
run the code again. it is crash!


(打字: # Convert to list if you need to modify)
(打字: numbers_list = list(numbers))
(打字: numbers_list[0] = 10)
(打字: numbers = tuple(numbers_list))
(打字: print(numbers))
(运行)
but it has method to modify the element, you can convert tuple to list first, then modify the element, and it convert back!

**操作时的代码**:
```python
numbers = (1, 2, 3, 4, 5)
print(numbers)

# This will cause error:
# numbers[0] = 10

# But we can create a new tuple
new_numbers = numbers + (6, 7)
print(new_numbers)

repeated = numbers * 2
print(repeated)

# Convert to list if you need to modify
numbers_list = list(numbers)
numbers_list[0] = 10
numbers = tuple(numbers_list)
print(numbers)
```

---

## [场景 6: 实际操作 - 元组方法] (50 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
and then, Tuples also have fewer methods can use.

(打字: numbers = (1, 2, 3, 2, 4, 2, 5))
(打字: count = numbers.count(2))
Count method can count how many times the element appears. in this case, it counts how many time appear the number two. so the output is 3.

(打字: print(f"2 appears {count} times"))
(运行)
Three times!

(打字: index = numbers.index(5))
index method can tell us the index location with specific element. in this case, Find the index location for element 5. the output is 6. so 5 is in index 6.


(打字: print(f"Length: {len(numbers)}")
(打字: print(f"Max: {max(numbers)}")
(打字: print(f"Min: {min(numbers)}")
(运行)
other Built-in functions include l e n to know the length of tuple, max method to know the maximum number in tuple, min method to know the minimum number in tuple.

**操作时的代码**:
```python
numbers = (1, 2, 3, 2, 4, 2, 5)
count = numbers.count(2)
print(f"2 appears {count} times")

index = numbers.index(5)
print(f"5 is at index {index}")

print(f"Length: {len(numbers)}")
print(f"Max: {max(numbers)}")
print(f"Min: {min(numbers)}")
```

---

## [场景 7: 实际应用] (50 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Practical example: returning multiple values from a function.

(打字: def get_student_info():)
(Tab, 打字:     name = "Alice")
(Tab, 打字:     age = 20)
(Tab, 打字:     grade = "A")
(Tab, 打字:     return name, age, grade)
Functions can return tuples!

(打字: student_name, student_age, student_grade = get_student_info())
Unpack the returned tuple.

(打字: print(f"Name: {student_name}"))
(打字: print(f"Age: {student_age}"))
(打字: print(f"Grade: {student_grade}"))
(运行)
Tuples make returning multiple values elegant!

**操作时的代码**:
```python
def get_student_info():
    name = "Alice"
    age = 20
    grade = "A"
    return name, age, grade

student_name, student_age, student_grade = get_student_info()
print(f"Name: {student_name}")
print(f"Age: {student_age}")
print(f"Grade: {student_grade}")
```

---

## [场景 8: 结尾] (10 秒)
**画面**: 总结卡片
**配音**:
Great job! You've learned tuples - immutable, efficient, and safe. Next, we'll explore sets, Python's collection for unique values. See you there!

---

## 制作注意事项：
1. **讲解部分** (场景 1-2, 8): PPT 展示
2. **操作部分** (场景 3-7): 
   - 强调不可变性
   - 演示单元素元组的特殊语法
   - 展示元组解包
3. **AI 配音**: 清晰语速
4. **重点**: 不可变性、逗号的重要性、元组解包
