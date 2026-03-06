# Chapter 5.1: List Basics - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "5.1 List Basics"
**配音**:
Welcome to Lesson 5.1: List Basics. Lists are one of Python's most powerful and commonly used data structures. Let's learn how to create and work with them!

---

## [场景 2: 列表介绍] (35 秒)
**画面**: 列表概念动画 + 示例图
**配音**:
A list is a collection of items in a particular order. Think of it like a shopping list or a to-do list. Lists can contain any type of data - numbers, strings, even other lists. What makes lists special is that they're ordered, changeable, and allow duplicate values. You can add items, remove items, or modify them anytime.

---

## [场景 3: 创建列表] (40 秒)
**画面**: 列表创建语法图示
**配音**:
Lists are created using square brackets. You can create an empty list, a list of numbers, a list of strings, or even mix different types together. Lists are flexible - you can put anything inside them. The items are separated by commas, and Python keeps track of their order automatically.

---

## [场景 4: 实际操作 - 创建和访问列表] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
Let's create our first lists in code editor.

(打字: fruits = ["apple", "banana", "cherry"])
I'm creating a list called fruits with apple, banana, cherry three items. and print the fruits

(打字: print(fruits))
(运行)
run the code, The entire list prints with square brackets.

(打字: print(fruits[0]))
and then, if i want to access a single item, use its index. Index zero gets the first item.

(运行)
run the code again, output is Apple. Remember, index starts counting from zero, not one.


(打字: print(fruits[-1]))
the negative indices count from the end of list. Minus one can get the last item cherry. This is super useful when you don't know the list length!



**操作时的代码**:
```python
fruits = ["apple", "banana", "cherry"]
print(fruits)

print(fruits[0])
print(fruits[1])
print(fruits[-1])
```

---

## [场景 5: 实际操作 - 列表切片] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Now let's learn slicing - extracting parts of a list.

(打字: numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
(打字: print(numbers))
(运行)
Here's a list of numbers from zero to nine.

(打字: print(numbers[2:5]))
Slice from index 2 to 5. The end index is not included.

(运行)
We get 2, 3, 4. Five is not included.

(打字: print(numbers[:4]))
Colon four means from the beginning up to index 4.

(运行)
Zero, one, two, three.

(打字: print(numbers[6:]))
Six colon means from index 6 to the end.

(运行)
Six, seven, eight, nine.

(打字: print(numbers[::2]))
Double colon two means every second element.

(运行)
Zero, two, four, six, eight. We're skipping every other number!

**操作时的代码**:
```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(numbers)

print(numbers[2:5])
print(numbers[:4])
print(numbers[6:])
print(numbers[::2])
```

---

## [场景 6: 实际操作 - 修改列表] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
on the other hand, we know that Lists are mutable, that's mean we can change them. let me show you how to do it.

(打字: fruits = ["apple", "banana", "cherry"])
(打字: print(fruits))
(运行)
i also define fruits list with apple, banana and cherry
and print the second item, the output is banana. right?

(打字: fruits[1] = "blueberry")
now i want to change the second item. I am input fruits index 1 equal to blueberry. and let's print the fruits index 1 again.

(打字: print(fruits))
(运行)
run the code, you can see that the original fruits index 1 is Banana and now is change to blueberry!

(打字: print("apple" in fruits))
moreover, if you want to know is it the item in the list, you can write down the item name as the string format then check in specific list. for example, this code is check if apple is in the fruits list or not.

(运行)
the output is True. so The word in our list.

(打字: print("orange" in fruits))
(运行)

if return False. that means Orange is not in our fruits list.

(打字: print(len(fruits)))
and then Len function can tell us how many items. you just input l,e,n to call the function, and input the list name inside the brackets

(运行)
Three items in our list.

**操作时的代码**:
```python
fruits = ["apple", "banana", "cherry"]
print(fruits)

fruits[1] = "blueberry"
print(fruits)

print("apple" in fruits)
print("orange" in fruits)
print(len(fruits))
```

---

## [场景 7: 实际应用示例] (40 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's see a practical example.

(打字: scores = [85, 92, 78, 95, 88])
Student test scores.

(打字: print(f"Total students: {len(scores)}"))
(打字: print(f"Highest score: {max(scores)}"))
(打字: print(f"Lowest score: {min(scores)}"))
(打字: print(f"First three scores: {scores[:3]}"))
(运行)
We can analyze data using list functions and slicing!

**操作时的代码**:
```python
scores = [85, 92, 78, 95, 88]
print(f"Total students: {len(scores)}")
print(f"Highest score: {max(scores)}")
print(f"Lowest score: {min(scores)}")
print(f"First three scores: {scores[:3]}")
```

---

## [场景 8: 结尾] (10 秒)
**画面**: 总结卡片
**配音**:
Excellent! You've learned to create lists, access elements, slice them, and modify them. In the next lesson, we'll explore powerful list methods. See you there!

---

## 制作注意事项：
1. **讲解部分** (场景 1-3, 8): 使用 PPT 或图片，配 AI 语音
2. **操作部分** (场景 4-7): 
   - 用 OBS 录制屏幕
   - 打字速度：中等，清晰展示索引操作
   - 每行代码打完后暂停 1-2 秒
   - 运行后暂停 2-3 秒让学生看结果
   - 特别强调负索引和切片的概念
3. **AI 配音**: 使用稍慢的语速（0.9x），清晰发音
4. **重点**: 零索引、负索引、切片的 end 不包含
