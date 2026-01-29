# Chapter 2.2: Comparison and Logical Operations - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "2.2 Comparison and Logical Operations"
**配音**:
Welcome to Lesson 2.2: Comparison and Logical Operations. Today we'll learn how to compare values and combine conditions in Python.

---

## [场景 2: 比较运算符介绍] (40 秒)
**画面**: 比较运算符列表
**配音**:
Comparison operators let us compare two values and get True or False as a result. There are several comparison operators you should know include less than, greater than, less than or equal to,  greater than or equal to, equal to, and not equal to. These operators return boolean values, either True or False.

---

## [场景 3: 实际操作 - 比较运算符] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
OK, Let's test these operators in code editor.

(打字: print(5 == 5))
5 double equals 5. True, they are equal.

(打字: print(5 == 3))
5 equals 3 is False, they're not equal.


(打字: print(5 != 3))
5 not equals 3. The exclamation mark equals means not equal.

(运行)
True, they are not equal.

(打字: print(10 > 5))
10 is greater than 5.

(运行)
True.

(打字: print(3 < 5))
3 is less than 5.

(运行)
True.

(打字: print(5 >= 5))
5 is greater than or equal to 5.

(运行)
True, because they're equal.

**操作时的代码**:
```python
print(5 == 5)
print(5 == 3)
print(5 != 3)
print(10 > 5)
print(3 < 5)
print(5 >= 5)
```

---

## [场景 4: 逻辑运算符介绍] (40 秒)
**画面**: AND, OR, NOT 图示
**配音**:
On the other hand, we also can use Logical operators to combine multiple conditions. The AND operator requires both conditions to be True. The OR operator needs at least one condition to be True. The NOT operator inverts a boolean value, turning True to False and False to True.

---

## [场景 5: 实际操作 - AND 运算符] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Let's explore the AND operator.

(打字: age = 25)
(打字: has_license = True)
Setting up our variables. Age is 25, and has underscore license is True.

(打字: print(age >= 18 and has_license))
Now we check: is age greater than or equal to 18 'AND' has license True?

(运行)
True, because both conditions are met.

(打字: print(age >= 30 and has_license))
What if we check age greater than or equal to 30?

(运行)
False, because the first condition fails. Even though has license is True, we need BOTH to be True for AND.

**操作时的代码**:
```python
age = 25
has_license = True

print(age >= 18 and has_license)
print(age >= 30 and has_license)
```

---

## [场景 6: 实际操作 - OR 运算符] (60 秒)
**画面**: 继续录屏
**配音 - 操作讲解**:
Now the OR operator.

(打字: is_weekend = True)
(打字: is_holiday = False)
Is weekend is True, is holiday is False.

(打字: print(is_weekend or is_holiday))
Is it weekend OR holiday?

(运行)
True! Because at least ONE condition is True. With OR, we only need one to be True.

(打字: print(False or False))
What if i change is weekend to False?

(运行)
Then we get False. At least one must be True for OR to return True.

**操作时的代码**:
```python
is_weekend = True
is_holiday = False

print(is_weekend or is_holiday)
print(False or False)
```

---

## [场景 7: 实际操作 - NOT 运算符] (50 秒)
**画面**: 继续录屏
**配音 - 操作讲解**:
finally The 'NOT' operator inverts boolean values.

(打字: is_raining = False)
i define Is raining is False.

(打字: print(not is_raining))
then print 'NOT' is raining.

(运行)
the output is True, because NOT False equals True.

however, if i change is raining is true
then not true is equals false


**操作时的代码**:
```python
is_raining = False
print(not is_raining)


```

---

## [场景 8: 实际应用] (50 秒)
**画面**: 继续录屏
**配音 - 操作讲解**:
OK, Let's combine these in a practical example.

(打字: score = 85)
(打字: if score >= 80 and score <= 90:)
(Tab, 打字: print('Grade: B'))
If score is between 80 and 90, print Grade B.

(运行)
Grade B! The score is in range.

(打字: if 80 <= score <= 90:)
(Tab, 打字: print('Grade: B'))
Python has a shortcut. We can chain comparisons like this.

(运行)
Same result, cleaner code.

**操作时的代码**:
```python
score = 85

if score >= 80 and score <= 90:
    print('Grade: B')

if 80 <= score <= 90:
    print('Grade: B')
```

---

## [场景 9: 结尾] (10 秒)
**画面**: 总结卡
**配音**:
Excellent work! You now know how to compare values and combine conditions using logical operators. See you in the next lesson!

---
