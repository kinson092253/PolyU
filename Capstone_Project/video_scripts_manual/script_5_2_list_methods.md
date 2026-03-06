# Chapter 5.2: List Methods - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "5.2 List Methods"
**配音**:
Welcome to Lesson 5.2: List Methods. Python provides powerful built-in methods to manipulate lists. Let's explore the most important ones!

---

## [场景 2: 方法概述] (30 秒)
**画面**: 方法列表动画
**配音**:
List methods are functions that belong to lists. They let you add items, remove items, sort, reverse, and more. These methods modify the list directly, making them efficient and easy to use. The most common methods are append, insert, remove, pop, sort, and reverse.

---

## [场景 3: 实际操作 - 添加元素] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
OK, let's demo it in code editor, now i want to add items to lists first.

(打字: fruits = ["apple", "banana"])
(打字: print(fruits))
(运行)
I define a fruits list which include apple and banana in the list. run the code, the output show taht the list include apple and banana. right?

(打字: fruits.append("cherry"))
but now, i want to add cherry in the list, so i use the append method to adds an item to the end of list. so i am input fruits doc append cherry.

(打字: print(fruits))
(运行)
run the code again. And compare with the original list, you can see that Cherry is now at the end! and remember that, using append methods to add the item in the list always adds to the end of list.





(打字: fruits.insert(1, "blueberry"))
However, if you want to add the item to specific position in the list, you can use Insert method. you can input fruits doc insert, there are two parameter inside the parentheses, first parameter to decide which index you want to insert, and the second parameter is decide what items you want to insert in this index position. this example show that i want to add the blueberry in the index 1 position.

(打字: print(fruits))
(运行)
run the code, Blueberry is now the second item! Everything else shifted right.




(打字: more_fruits = ["elderberry", "fig"])
(打字: fruits.extend(more_fruits))
and then one more method to add items in the list that using Extend method. which can use to combine two lists.
now i create another list named more fruits which include elderberry and fig.
then input fruits doc extend more fruits. and print the fruits list again.
(打字: print(fruits))
(运行)
run the code, you can see all items from more_fruits are now added in the fruits list!

**操作时的代码**:
```python
fruits = ["apple", "banana"]
print(fruits)

fruits.append("cherry")
print(fruits)

fruits.append("date")
print(fruits)

fruits.insert(1, "blueberry")
print(fruits)

more_fruits = ["elderberry", "fig"]
fruits.extend(more_fruits)
print(fruits)
```

---


## [场景 4: 实际操作 - 删除元素] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Now let's demo how to remove items from lists.

(打字: numbers = [1, 2, 3, 4, 5, 3])
(打字: print(numbers))
(运行)
define a list named numbers which include 1, 2, 3, 4, 5, 3. there are total 6 numbers. and notice we have double threes in this list.

(打字: numbers.remove(3))
now i want to remove repeat number in the list, so i use Remove method to delete the first occurrence of the value.

(打字: print(numbers))
(运行)
print the list again and run the code, you can see the output is 1, 2, 4, 5, 3. and the first three is gone, but the second three remains.



(打字: numbers.pop())
and one more method to remove item in the list is use Pop, which can removes the last item in the list. just input numbers.pop, and print the numbers list again.

(打字: print(numbers))
(运行)
run the code, you can see that the last item, 3, three, is removed.

(打字: removed = numbers.pop(1))
but Pop method also can remove the item in specific position, just input the index as the parameter. i add 1 in the pop method to remove the item of index 1 and pring the numbers list again.

(打字: print(f"Removed: {removed}"))
(打字: print(numbers))
(运行)
run the code, We removed index one, which was two. And we captured it in a variable!


(打字: numbers.clear())
you also can use Clear method to removes everything in the list.

(打字: print(numbers))
(运行)
run the code, see, Empty list. Everything is gone!

**操作时的代码**:
```python
numbers = [1, 2, 3, 4, 5, 3]
print(numbers)

numbers.remove(3)
print(numbers)

numbers.pop()
print(numbers)

removed = numbers.pop(1)
print(f"Removed: {removed}")
print(numbers)

numbers.clear()
print(numbers)
```

---

## [场景 5: 实际操作 - 排序和反转] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
OK, Let's demo the sort and reverse method in the list.

(打字: numbers = [5, 2, 8, 1, 9])
(打字: print(numbers))
(运行)
defines list named numbers with 5, 2, 8, 1, 9.
print the nubmers and run the code.
you can see that the numbers are unsorted in the list.

(打字: numbers.sort())
(打字: print(numbers))
now i want to sort the number, input numbers doc sort. print the numbers list again.
run the code again, you can see the number are sorted from smallest to largest in the list.




(打字: numbers.sort(reverse=True))
however, if you want to sort the number from largest to smallest. you can use Sort with reverse equals True to sorts descending.

(打字: print(numbers))
(运行)
see, the number sort from Largest to smallest!



(打字: words = ["banana", "apple", "cherry"])
(打字: words.reverse())
(打字: print(words))
(运行)
on the other hand, reverse method can flips all items in the list. let's see the example. define list named words with banana, apple, cherry. then input words doc reverse and print the words list. run the code. you can see the output is cherry, apple, banana. 



**操作时的代码**:
```python
numbers = [5, 2, 8, 1, 9]
print(numbers)

numbers.sort()
print(numbers)

numbers.sort(reverse=True)
print(numbers)

words = ["banana", "apple", "cherry"]
words.sort()
print(words)

numbers = [1, 2, 3, 4, 5]
numbers.reverse()
print(numbers)
```

---

## [场景 6: 实际操作 - 其他有用方法] (60 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
A few more useful methods.

(打字: numbers = [1, 2, 3, 2, 4, 2])
(打字: count = numbers.count(2))
Count tells us how many times a value appears.

(打字: print(f"Number 2 appears {count} times"))
(运行)
Three times!

(打字: index = numbers.index(3))
Index tells us where a value is located.

(打字: print(f"Number 3 is at index {index}"))
(运行)
Index two.

(打字: original = [1, 2, 3])
(打字: copied = original.copy())
Copy creates a duplicate.

(打字: copied.append(4))
(打字: print(f"Original: {original}"))
(打字: print(f"Copied: {copied}"))
(运行)
The original is unchanged! Copy made an independent list.

**操作时的代码**:
```python
numbers = [1, 2, 3, 2, 4, 2]
count = numbers.count(2)
print(f"Number 2 appears {count} times")

index = numbers.index(3)
print(f"Number 3 is at index {index}")

original = [1, 2, 3]
copied = original.copy()
copied.append(4)
print(f"Original: {original}")
print(f"Copied: {copied}")
```

---

## [场景 7: 实际应用] (40 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Practical example: managing a to-do list.

(打字: todo = [])
(打字: todo.append("Buy groceries"))
(打字: todo.append("Study Python"))
(打字: todo.append("Exercise"))
(打字: print(f"Tasks: {todo}"))
(打字: todo.insert(0, "Wake up early"))
(打字: print(f"Updated: {todo}"))
(打字: completed = todo.pop(0))
(打字: print(f"Completed: {completed}"))
(打字: print(f"Remaining: {todo}"))
(运行)
A real-world task manager!

**操作时的代码**:
```python
todo = []
todo.append("Buy groceries")
todo.append("Study Python")
todo.append("Exercise")
print(f"Tasks: {todo}")

todo.insert(0, "Wake up early")
print(f"Updated: {todo}")

completed = todo.pop(0)
print(f"Completed: {completed}")
print(f"Remaining: {todo}")
```

---

## [场景 8: 结尾] (10 秒)
**画面**: 总结卡片
**配音**:
Great work! You've mastered list methods. In the next lesson, we'll learn list comprehensions - a powerful way to create lists. See you there!

---

## 制作注意事项：
1. **讲解部分** (场景 1-2, 8): 使用 PPT，配 AI 语音
2. **操作部分** (场景 3-7): 
   - 录制屏幕
   - 强调方法会修改原列表
   - 演示 pop 返回值的特性
   - 展示 copy 的重要性
3. **AI 配音**: 清晰语速
4. **重点**: append vs insert, remove vs pop, sort vs reverse
