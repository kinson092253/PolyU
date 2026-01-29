# Chapter 6.3: Set - Video Script
# 总时长：约 5 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "6.3 Set"
**配音**:
Welcome to Lesson 6.3: Set. Sets are unordered collections of unique items. Perfect for removing duplicates and performing mathematical set operations. Let's explore!

---

## [场景 2: 集合介绍] (40 秒)
**画面**: 集合概念动画 + 数学集合图示
**配音**:
A set is an unordered collection that cannot have duplicate values. Think of it like a mathematical set. Sets are created with curly braces or the set function. The key features: unordered, no duplicates, and mutable. Sets are perfect for membership testing, removing duplicates, and mathematical operations like union, intersection, and difference.

---

## [场景 3: 实际操作 - 创建集合] (80 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
Let's create sets.

(打字: # Create set with curly braces)
(打字: fruits = {"apple", "banana", "cherry"})
(打字: print(fruits))
(打字: print(type(fruits)))
(运行)
Notice the curly braces! Type is set.

(打字: # Duplicates are automatically removed)
(打字: numbers = {1, 2, 3, 2, 4, 3, 5})
(打字: print(numbers))
(运行)
Only unique values! Duplicates are gone.

(打字: # Create from list using set())
(打字: list_with_duplicates = [1, 2, 2, 3, 3, 3, 4])
(打字: unique = set(list_with_duplicates))
(打字: print(unique))
(运行)
Easy way to remove duplicates from a list!

(打字: # Empty set - must use set())
(打字: empty = set())
(打字: print(empty))
(打字: print(type(empty)))
(运行)
Empty curly braces would create a dictionary, so use set()!

**操作时的代码**:
```python
# Create set with curly braces
fruits = {"apple", "banana", "cherry"}
print(fruits)
print(type(fruits))

# Duplicates are automatically removed
numbers = {1, 2, 3, 2, 4, 3, 5}
print(numbers)

# Create from list using set()
list_with_duplicates = [1, 2, 2, 3, 3, 3, 4]
unique = set(list_with_duplicates)
print(unique)

# Empty set - must use set()
empty = set()
print(empty)
print(type(empty))
```

---

## [场景 4: 实际操作 - 添加和删除] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's modify sets.

(打字: fruits = {"apple", "banana"})
(打字: print(fruits))
(运行)
Starting with two fruits.

(打字: fruits.add("cherry"))
Add method adds one item.

(打字: print(fruits))
(运行)
Cherry is added!

(打字: fruits.add("apple"))
(打字: print(fruits))
(运行)
Apple already exists, so nothing changes!

(打字: fruits.update(["date", "elderberry", "fig"]))
Update adds multiple items.

(打字: print(fruits))
(运行)
All new fruits added!

(打字: fruits.remove("banana"))
Remove deletes an item.

(打字: print(fruits))
(运行)
Banana is gone!

(打字: fruits.discard("orange"))
Discard is safer - no error if item doesn't exist.

(打字: print(fruits))
(运行)
No error! Discard is safe.

**操作时的代码**:
```python
fruits = {"apple", "banana"}
print(fruits)

fruits.add("cherry")
print(fruits)

fruits.add("apple")
print(fruits)

fruits.update(["date", "elderberry", "fig"])
print(fruits)

fruits.remove("banana")
print(fruits)

fruits.discard("orange")
print(fruits)
```

---

## [场景 5: 实际操作 - 集合运算] (100 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Sets support mathematical operations.

(打字: set1 = {1, 2, 3, 4, 5})
(打字: set2 = {4, 5, 6, 7, 8})
(打字: print(f"Set 1: {set1}"))
(打字: print(f"Set 2: {set2}"))
(运行)
Two sets with some overlap.

(打字: # Union - all items from both sets)
(打字: union = set1 | set2)
Pipe symbol for union.

(打字: print(f"Union: {union}"))
(运行)
All items from both sets, no duplicates!

(打字: # Intersection - items in both sets)
(打字: intersection = set1 & set2)
Ampersand for intersection.

(打字: print(f"Intersection: {intersection}"))
(运行)
Only four and five appear in both!

(打字: # Difference - items in set1 but not in set2)
(打字: difference = set1 - set2)
Minus for difference.

(打字: print(f"Difference: {difference}"))
(运行)
One, two, three. Items only in set1!

(打字: # Symmetric difference - items in either but not both)
(打字: sym_diff = set1 ^ set2)
Caret for symmetric difference.

(打字: print(f"Symmetric difference: {sym_diff}"))
(运行)
Items that appear in only one set!

**操作时的代码**:
```python
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}
print(f"Set 1: {set1}")
print(f"Set 2: {set2}")

# Union - all items from both sets
union = set1 | set2
print(f"Union: {union}")

# Intersection - items in both sets
intersection = set1 & set2
print(f"Intersection: {intersection}")

# Difference - items in set1 but not in set2
difference = set1 - set2
print(f"Difference: {difference}")

# Symmetric difference - items in either but not both
sym_diff = set1 ^ set2
print(f"Symmetric difference: {sym_diff}")
```

---

## [场景 6: 实际操作 - 成员测试] (50 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Sets are very fast for membership testing.

(打字: fruits = {"apple", "banana", "cherry", "date"})
(打字: print("apple" in fruits))
(运行)
True! Apple is in the set.

(打字: print("orange" in fruits))
(运行)
False!

(打字: # Check subset and superset)
(打字: set_a = {1, 2, 3})
(打字: set_b = {1, 2, 3, 4, 5})
(打字: print(set_a.issubset(set_b)))
Is set_a a subset of set_b?

(运行)
True! All items of set_a are in set_b.

(打字: print(set_b.issuperset(set_a)))
(运行)
True! set_b contains all of set_a.

**操作时的代码**:
```python
fruits = {"apple", "banana", "cherry", "date"}
print("apple" in fruits)
print("orange" in fruits)

# Check subset and superset
set_a = {1, 2, 3}
set_b = {1, 2, 3, 4, 5}
print(set_a.issubset(set_b))
print(set_b.issuperset(set_a))
```

---

## [场景 7: 实际应用] (50 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Practical example: analyzing student enrollments.

(打字: math_students = {"Alice", "Bob", "Charlie", "David"})
(打字: physics_students = {"Charlie", "David", "Eve", "Frank"})
(打字: # Students in both classes)
(打字: both = math_students & physics_students)
(打字: print(f"Taking both: {both}"))
(打字: # Students in at least one class)
(打字: all_students = math_students | physics_students)
(打字: print(f"All students: {all_students}"))
(打字: # Students only in math)
(打字: only_math = math_students - physics_students)
(打字: print(f"Only math: {only_math}"))
(运行)
Sets make this analysis easy!

**操作时的代码**:
```python
math_students = {"Alice", "Bob", "Charlie", "David"}
physics_students = {"Charlie", "David", "Eve", "Frank"}

# Students in both classes
both = math_students & physics_students
print(f"Taking both: {both}")

# Students in at least one class
all_students = math_students | physics_students
print(f"All students: {all_students}")

# Students only in math
only_math = math_students - physics_students
print(f"Only math: {only_math}")
```

---

## [场景 8: 结尾] (10 秒)
**画面**: 总结卡片
**配音**:
Excellent! You've learned sets - perfect for unique values and mathematical operations. Next chapter, we'll explore functions. See you there!

---

## 制作注意事项：
1. **讲解部分** (场景 1-2, 8): PPT 展示
2. **操作部分** (场景 3-7): 
   - 强调无序性和唯一性
   - 演示数学集合运算
   - 展示实际应用
3. **AI 配音**: 清晰语速
4. **重点**: 去重、集合运算符、成员测试效率
