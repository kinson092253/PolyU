# Chapter 6.1: Dictionary - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "6.1 Dictionary"
**配音**:
Welcome to Lesson 6.1: Dictionary. Dictionaries are Python's way of storing data in key-value pairs, like a real dictionary where words map to definitions. Let's explore!

---

## [场景 2: 字典介绍] (40 秒)
**画面**: 字典概念动画 + 对比列表
**配音**:
A dictionary stores data as key-value pairs. Unlike lists that use numeric indices, dictionaries use keys to access values. Think of it like a phone book - names are keys, phone numbers are values. Dictionaries are unordered, changeable, and don't allow duplicate keys. They're perfect when you need to look up values by name rather than position.

---

## [场景 3: 创建字典] (30 秒)
**画面**: 字典语法图示
**配音**:
Dictionaries are created using curly braces with key-colon-value pairs. Keys are usually strings, but can be any immutable type. Values can be anything - strings, numbers, lists, even other dictionaries. Each key must be unique, but values can repeat.

---

## [场景 4: 实际操作 - 创建和访问字典] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
Let's create our first dictionary.

(打字: student = {"name": "Alice", "age": 20, "grade": "A"})
A dictionary with three key-value pairs.

(打字: print(student))
(运行)
See the curly braces? That's a dictionary!

(打字: print(student["name"]))
Access value using square brackets with the key.

(运行)
Alice. We got the value for key "name".

(打字: print(student["age"]))
(运行)
Twenty.

(打字: print(student.get("grade")))
The get method is safer - it won't crash if the key doesn't exist.

(运行)
A.

(打字: print(student.get("email")))
(运行)
None. The key doesn't exist, but no error!

(打字: print(student.get("email", "Not found")))
Get with a default value.

(运行)
Not found. Much safer than brackets!

**操作时的代码**:
```python
student = {"name": "Alice", "age": 20, "grade": "A"}
print(student)

print(student["name"])
print(student["age"])

print(student.get("grade"))
print(student.get("email"))
print(student.get("email", "Not found"))
```

---

## [场景 5: 实际操作 - 添加和修改] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Dictionaries are mutable. Let's modify them.

(打字: student = {"name": "Alice", "age": 20})
(打字: print(student))
(运行)
Starting dictionary with two items.

(打字: student["grade"] = "A")
Add a new key-value pair.

(打字: print(student))
(运行)
Grade is added!

(打字: student["age"] = 21)
Modify an existing value.

(打字: print(student))
(运行)
Age changed from twenty to twenty-one!

(打字: student["courses"] = ["Math", "Physics", "CS"])
Values can be lists!

(打字: print(student))
(运行)
Now student has a list of courses!

**操作时的代码**:
```python
student = {"name": "Alice", "age": 20}
print(student)

student["grade"] = "A"
print(student)

student["age"] = 21
print(student)

student["courses"] = ["Math", "Physics", "CS"]
print(student)
```

---

## [场景 6: 实际操作 - 删除元素] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's remove items from dictionaries.

(打字: student = {"name": "Alice", "age": 20, "grade": "A"})
(打字: print(student))
(运行)
Three items.

(打字: del student["grade"])
Del removes a key-value pair.

(打字: print(student))
(运行)
Grade is gone!

(打字: age = student.pop("age"))
Pop removes and returns the value.

(打字: print(f"Removed age: {age}"))
(打字: print(student))
(运行)
Age is removed and we captured it!

(打字: student["major"] = "CS")
(打字: student["gpa"] = 3.8)
(打字: print(student))
(打字: student.clear())
Clear removes everything.

(打字: print(student))
(运行)
Empty dictionary!

**操作时的代码**:
```python
student = {"name": "Alice", "age": 20, "grade": "A"}
print(student)

del student["grade"]
print(student)

age = student.pop("age")
print(f"Removed age: {age}")
print(student)

student["major"] = "CS"
student["gpa"] = 3.8
print(student)

student.clear()
print(student)
```

---

## [场景 7: 实际操作 - 字典方法] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's explore dictionary methods.

(打字: student = {"name": "Alice", "age": 20, "grade": "A"})
(打字: keys = student.keys())
Get all keys.

(打字: print(list(keys)))
(运行)
Name, age, grade.

(打字: values = student.values())
Get all values.

(打字: print(list(values)))
(运行)
Alice, twenty, A.

(打字: items = student.items())
Get key-value pairs as tuples.

(打字: print(list(items)))
(运行)
Each pair is a tuple!

(打字: # Iterate through dictionary)
(打字: for key, value in student.items():)
(Tab, 打字:     print(f"{key}: {value}"))
(运行)
We can loop through all pairs easily!

**操作时的代码**:
```python
student = {"name": "Alice", "age": 20, "grade": "A"}

keys = student.keys()
print(list(keys))

values = student.values()
print(list(values))

items = student.items()
print(list(items))

# Iterate through dictionary
for key, value in student.items():
    print(f"{key}: {value}")
```

---

## [场景 8: 实际应用] (50 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Practical example: storing product inventory.

(打字: inventory = {)
(Tab, 打字:     "apple": 50,)
(Tab, 打字:     "banana": 30,)
(Tab, 打字:     "orange": 20)
(打字: })
(打字: print("Current inventory:"))
(打字: for item, quantity in inventory.items():)
(Tab, 打字:     print(f"  {item}: {quantity}"))
(打字: # Sell some apples)
(打字: inventory["apple"] -= 10)
(打字: print(f"\nApples after sale: {inventory['apple']}")
(运行)
Perfect for managing real-world data!

**操作时的代码**:
```python
inventory = {
    "apple": 50,
    "banana": 30,
    "orange": 20
}

print("Current inventory:")
for item, quantity in inventory.items():
    print(f"  {item}: {quantity}")

# Sell some apples
inventory["apple"] -= 10
print(f"\nApples after sale: {inventory['apple']}")
```

---

## [场景 9: 结尾] (10 秒)
**画面**: 总结卡片
**配音**:
Excellent work! You've learned dictionaries - Python's key-value storage. Next, we'll explore tuples, the immutable cousin of lists. See you there!

---

## 制作注意事项：
1. **讲解部分** (场景 1-3, 9): PPT 展示
2. **操作部分** (场景 4-8): 
   - 强调 get() 比 [] 更安全
   - 展示字典的灵活性
   - 演示遍历字典
3. **AI 配音**: 清晰语速
4. **重点**: key-value 概念、get vs []、字典方法
