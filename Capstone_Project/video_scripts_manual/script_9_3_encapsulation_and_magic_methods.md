# Chapter 9.3: Encapsulation and Magic Methods - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "9.3 Encapsulation and Magic Methods"
**配音**:
Welcome to Lesson 9.3: Encapsulation. we will Learn how to protect data and add special behaviors to your classes. Let's explore advanced OOP techniques!

---

## [场景 2: 封装介绍] (40 秒)
**画面**: 封装概念图示
**配音**:
Encapsulation means hiding internal details and controlling access to data. In Python, we use naming conventions: single underscore for protected, double underscore for private. This prevents accidental modification and provides a clean interface. Magic methods, also called dunder methods, are special methods with double underscores like underscore underscore init. They let you customize how objects behave with operators and built-in functions.

---

## [场景 3: 实际操作 - 公共、保护和私有属性] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
now, let's create it in code editor and see the different for access levels.

(打字: class BankAccount:)
(Tab, 打字:     def __init__(self, owner, balance):)
(Tab*2, 打字:         self.owner = owner  # Public)
(Tab*2, 打字:         self._account_number = "1234"  # Protected)
(Tab*2, 打字:         self.__pin = "0000"  # Private)
in this example, you can see owner is public attribute, account number have Single underscore here, it is protected attribute, and pin attribute with double underscore which is private!

(打字: account = BankAccount("Alice", 1000))
(打字: # Public - direct access)
(打字: print(account.owner))
(运行)
Alice! Public attributes are accessible!

(打字: # Protected - can access but shouldn't)
(打字: print(account._account_number))
(运行)
One two three four! Protected means "don't touch unless you know what you're doing"!

(打字: # Private - name mangled)
(打字: # print(account.__pin)  # This would error!)
I'm commenting because it would crash!

(打字: print(account._BankAccount__pin))
(运行)
Private attributes are name-mangled! They become underscore ClassName underscore underscore attribute!

**操作时的代码**:
```python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner  # Public
        self._accountNumber = "1234"  # Protected
        self.__pin = "0000"  # Private

account = BankAccount("Alice", 1000)

# Public - direct access
print(account.owner)

# Protected - can access but shouldn't
print(account._accountNumber)

# Private - name mangled
# print(account.__pin)  # This would error!
print(account._BankAccount__pin)
```

---

## [场景 4: 实际操作 - Getter 和 Setter] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Control access with methods.

(打字: class Person:)
(Tab, 打字:     def __init__(self, name, age):)
(Tab*2, 打字:         self._name = name)
(Tab*2, 打字:         self._age = age)
(Tab, 打字:     def get_age(self):)
(Tab*2, 打字:         return self._age)
Getter method returns the value!

(Tab, 打字:     def set_age(self, age):)
(Tab*2, 打字:         if age > 0 and age < 150:)
(Tab*3, 打字:             self._age = age)
(Tab*2, 打字:         else:)
(Tab*3, 打字:             print("Invalid age!"))
Setter validates before setting!

(打字: person = Person("Bob", 25))
(打字: print(person.get_age()))
(运行)
Twenty-five!

(打字: person.set_age(30))
(打字: print(person.get_age()))
(运行)
Thirty! Valid age accepted!

(打字: person.set_age(-5))
(运行)
Invalid age! Setter validates input!

**操作时的代码**:
```python
class Person:
    def __init__(self, name, age):
        self._name = name
        self._age = age
    
    def get_age(self):
        return self._age
    
    def set_age(self, age):
        if age > 0 and age < 150:
            self._age = age
        else:
            print("Invalid age!")

person = Person("Bob", 25)
print(person.get_age())

person.set_age(30)
print(person.get_age())

person.set_age(-5)
```

---

## [场景 5: 实际操作 - Property 装饰器] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
on the other hand, Property decorator provides cleaner syntax.

(打字: class Person:)
(Tab, 打字:     def __init__(self, name, age):)
(Tab*2, 打字:         self._name = name)
(Tab*2, 打字:         self._age = age)
(Tab, 打字:     @property)
(Tab, 打字:     def age(self):)
(Tab*2, 打字:         return self._age)
Property decorator makes this act like an attribute!

(Tab, 打字:     @age.setter)
(Tab, 打字:     def age(self, age):)
(Tab*2, 打字:         if 0 < age < 150:)
(Tab*3, 打字:             self._age = age)
(Tab*2, 打字:         else:)
(Tab*3, 打字:             raise ValueError("Invalid age"))
Setter decorator for the property!

(打字: person = Person("Charlie", 20))
(打字: print(person.age))
No parentheses! Looks like an attribute!

(运行)
Twenty!

(打字: person.age = 25)
Set like an attribute!

(打字: print(person.age))
(运行)
Twenty-five! Property makes code cleaner!

**操作时的代码**:
```python
class Person:
    def __init__(self, name, age):
        self._name = name
        self._age = age
    
    @property
    def age(self):
        return self._age
    
    @age.setter
    def age(self, age):
        if 0 < age < 150:
            self._age = age
        else:
            raise ValueError("Invalid age")

person = Person("Charlie", 20)
print(person.age)

person.age = 25
print(person.age)
```

---

## [场景 6: 实际操作 - 算术魔术方法] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Magic methods let objects use operators.

(打字: class Vector:)
(Tab, 打字:     def __init__(self, x, y):)
(Tab*2, 打字:         self.x = x)
(Tab*2, 打字:         self.y = y)
(Tab, 打字:     def __add__(self, other):)
(Tab*2, 打字:         return Vector(self.x + other.x, self.y + other.y))
Underscore underscore add lets us use the plus operator!

(Tab, 打字:     def __str__(self):)
(Tab*2, 打字:         return f"Vector({self.x}, {self.y})")
(打字: v1 = Vector(1, 2))
(打字: v2 = Vector(3, 4))
(打字: v3 = v1 + v2)
Using the plus operator!

(打字: print(v3))
(运行)
Vector four, six! We added vectors with the plus operator!

(打字: class Money:)
(Tab, 打字:     def __init__(self, amount):)
(Tab*2, 打字:         self.amount = amount)
(Tab, 打字:     def __add__(self, other):)
(Tab*2, 打字:         return Money(self.amount + other.amount))
(Tab, 打字:     def __str__(self):)
(Tab*2, 打字:         return f"${self.amount}")
(打字: m1 = Money(10))
(打字: m2 = Money(20))
(打字: print(m1 + m2))
(运行)
Thirty dollars! Magic methods make objects behave naturally!

**操作时的代码**:
```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2
print(v3)


```

---

## [场景 7: 实际操作 - 比较魔术方法] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Comparison magic methods.

(打字: class Student:)
(Tab, 打字:     def __init__(self, name, grade):)
(Tab*2, 打字:         self.name = name)
(Tab*2, 打字:         self.grade = grade)
(Tab, 打字:     def __eq__(self, other):)
(Tab*2, 打字:         return self.grade == other.grade)
Underscore underscore eq for equality!

(Tab, 打字:     def __lt__(self, other):)
(Tab*2, 打字:         return self.grade < other.grade)
Underscore underscore lt for less than!

(Tab, 打字:     def __str__(self):)
(Tab*2, 打字:         return f"{self.name}: {self.grade}")
(打字: s1 = Student("Alice", 85))
(打字: s2 = Student("Bob", 90))
(打字: s3 = Student("Charlie", 85))
(打字: print(s1 == s3))
(运行)
True! Same grades!

(打字: print(s1 < s2))
(运行)
True! Alice's grade is less than Bob's!

(打字: students = [s2, s1, s3])
(打字: students.sort())
Sort works because we defined underscore underscore lt!

(打字: for s in students:)
(Tab, 打字:     print(s))
(运行)
Sorted by grade!

**操作时的代码**:
```python
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
    
    def __eq__(self, other):
        return self.grade == other.grade
    
    def __lt__(self, other):
        return self.grade < other.grade
    
    def __str__(self):
        return f"{self.name}: {self.grade}"

s1 = Student("Alice", 85)
s2 = Student("Bob", 90)
s3 = Student("Charlie", 85)

print(s1 == s3)
print(s1 < s2)

students = [s2, s1, s3]
students.sort()
for s in students:
    print(s)
```

---

## [场景 8: 实际操作 - 其他魔术方法] (60 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
More useful magic methods.

(打字: class MyList:)
(Tab, 打字:     def __init__(self, items):)
(Tab*2, 打字:         self.items = items)
(Tab, 打字:     def __len__(self):)
(Tab*2, 打字:         return len(self.items))
Len function support!

(Tab, 打字:     def __getitem__(self, index):)
(Tab*2, 打字:         return self.items[index])
Indexing support!

(Tab, 打字:     def __contains__(self, item):)
(Tab*2, 打字:         return item in self.items)
'in' operator support!

(打字: my_list = MyList([1, 2, 3, 4, 5]))
(打字: print(len(my_list)))
(运行)
Five! Len works!

(打字: print(my_list[2]))
(运行)
Three! Indexing works!

(打字: print(3 in my_list))
(运行)
True! 'in' operator works! Magic methods integrate with Python's built-in features!

**操作时的代码**:
```python
class MyList:
    def __init__(self, items):
        self.items = items
    
    def __len__(self):
        return len(self.items)
    
    def __getitem__(self, index):
        return self.items[index]
    
    def __contains__(self, item):
        return item in self.items

my_list = MyList([1, 2, 3, 4, 5])
print(len(my_list))
print(my_list[2])
print(3 in my_list)
```

---

## [场景 9: 结尾] (10 秒)
**画面**: 总结卡片
**配音**:
Excellent! You've mastered encapsulation and magic methods. Next chapter, we'll explore file operations. See you there!

---

## 制作注意事项：
1. **讲解部分** (场景 1-2, 9): PPT 展示
2. **操作部分** (场景 3-8): 
   - 强调访问级别差异
   - 演示 property 装饰器
   - 展示常用魔术方法
3. **AI 配音**: 清晰语速
4. **重点**: 下划线约定、property、常用魔术方法
