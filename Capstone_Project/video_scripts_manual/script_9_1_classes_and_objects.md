# Chapter 9.1: Classes and Objects - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "9.1 Classes and Objects"
**配音**:
Welcome to Lesson 9.1: Classes and Objects. Object-Oriented Programming is a powerful way to organize code. Let's learn how to create classes and objects!

---

## [场景 2: OOP 介绍] (40 秒)
**画面**: OOP 概念动画 + 对比
**配音**:
Object-Oriented Programming, or OOP, organizes code around objects and classes. A class is like a blueprint - it defines the structure. An object is an instance created from that blueprint. Think of a class as a cookie cutter, and objects as the cookies. Classes bundle data and functions together, making code more organized, reusable, and easier to maintain. Python is fully object-oriented!

---

## [场景 3: 实际操作 - 第一个类] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
OK, Let's see how to cerate class and object in code editor first.

(打字: class Dog:)
(Tab, 打字:     pass)
We define a class named Dog, and inside it we simply use pass as a placeholder, pass meaning the class has no functionality yet
(打字: # Create an object)
(打字: my_dog = Dog())
(打字: print(my_dog))
(打字: print(type(my_dog)))
(运行)
Next, we create an object — that is, an instance of this class. The way to create an object is similar to assigning a variable. input object name equal to class name, and we must remember to add the parentheses after the class name. These parentheses are what actually call the class and produce the instance. When we print the object, we see something like this, This tells us it’s a Dog object and shows its memory address. Then, we also check its type and show that my dog is an instance of the Dog class.

(打字: # Real class with __init__)
(打字: class Dog:)
(Tab, 打字:     def __init__(self, name, age):)
(Tab*2, 打字:         self.name = name)
(Tab*2, 打字:         self.age = age)
OK, now let's learn how to define methods inside a class. The most important special method input underscore underscore i n i t underscore underscore, it is Python's constructor, constructor runs automatically the moment when you create a new object. and then, in constructor or any method you define, the first parameter must input self, self refers to the object that is just being created, after self parameter, you can add any other parameters you want. in this case, we add name and age two parameter in the constructor. which mean the object need two parameter to define. self is not a meaningful parameter but is must input in the parentheses. moreover, inside the constructor, why do we write self dot name equal to name and self dot age equal to age? Because we want to save the values that were passed in as attributes of the object itself. for example, self name dot name means Take the name value you gave me, and attach it to this object as its own name property. in here we define dog one object with two parameter buddy and 3. so in this object, name is buddy, age is 3. you can call the object to print the attribute too.




(打字: dog1 = Dog("Buddy", 3))
(打字: dog2 = Dog("Lucy", 5))
(打字: print(dog1.name))
(打字: print(dog2.age))
(运行)
Buddy and five! Each object has its own data!

**操作时的代码**:
```python
    class Dog:
        pass

    # Create an object
    my_dog = Dog()
    print(my_dog)
    print(type(my_dog))

# Real class with __init__
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

dog1 = Dog("Buddy", 3)
dog2 = Dog("Lucy", 5)

print(dog1.name)
print(dog2.age)
```

---

## [场景 4: 实际操作 - 实例方法] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Add methods to classes.

(打字: class Dog:)
(Tab, 打字:     def __init__(self, name, age):)
(Tab*2, 打字:         self.name = name)
(Tab*2, 打字:         self.age = age)
(Tab, 打字:     def bark(self):)
(Tab*2, 打字:         print(f"{self.name} says Woof!"))
except constructor, we also can define other instance method in the class, but remember each method that the first parameter is always self!

in this case, we define bark method, and remind that, all methods can use the attribute that define before. so here i can get the name value.

(打字: dog = Dog("Max", 4))
(打字: dog.bark())
(运行)
define an object with name equal to max and age equal to 4. then call the method bark. run the code, see, the output is Max says woof.




**操作时的代码**:
```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def bark(self):
        print(f"{self.name} says Woof!")
    
    def get_info(self):
        return f"{self.name} is {self.age} years old"

dog = Dog("Max", 4)
dog.bark()
print(dog.get_info())

dog2 = Dog("Bella", 2)
dog2.bark()
print(dog2.get_info())
```

---

## [场景 5: 实际操作 - 修改属性] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
on the other hand, Object attributes also can be modified. let's see how to do it.

(打字: class Student:)
(Tab, 打字:     def __init__(self, name, grade):)
(Tab*2, 打字:         self.name = name)
(Tab*2, 打字:         self.grade = grade)
(Tab, 打字:     def improve_grade(self, points):)
(Tab*2, 打字:         self.grade += points)
(Tab*2, 打字:         print(f"{self.name}'s grade is now {self.grade}"))
(打字: student = Student("Alice", 85))
(打字: print(f"Initial grade: {student.grade}"))
(运行)
we define a constructor first, it include two parameters name and grade. then, define a method named improve grade, it accept a parameter points. then we create an object with name alice and grade 85, after that we call improve grade method with point 10, so the point will add into the grade and update it. so we can see the grade is updated from 85 to 95. moreover, we also can input class name dot attribute name to update the value directly like this, the output is change to 100.  

(打字: student.improve_grade(10))
(运行)
Grade improved to ninety-five!

(打字: # Direct attribute access)
(打字: student.grade = 100)
(打字: print(f"New grade: {student.grade}"))
(运行)
We can modify attributes directly!

**操作时的代码**:
```python
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
    
    def improve_grade(self, points):
        self.grade += points
        print(f"{self.name}'s grade is now {self.grade}")

student = Student("Alice", 85)
print(f"Initial grade: {student.grade}")

student.improve_grade(10)

# Direct attribute access
student.grade = 100
print(f"New grade: {student.grade}")
```

---

## [场景 6: 实际操作 - 类属性] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Class attributes are shared by all instances.

(打字: class Dog:)
(Tab, 打字:     species = "Canis familiaris"  # Class attribute)
(Tab, 打字:     def __init__(self, name):)
(Tab*2, 打字:         self.name = name  # Instance attribute)
Class attribute is defined outside init!

(打字: dog1 = Dog("Buddy"))
(打字: dog2 = Dog("Lucy"))
(打字: # Access class attribute)
(打字: print(dog1.species))
(打字: print(dog2.species))
(运行)
Both dogs share the same species!

(打字: print(Dog.species))
(运行)
Can access through class name too!

(打字: # Instance attributes are unique)
(打字: print(dog1.name))
(打字: print(dog2.name))
(运行)
But names are different! Instance attributes are unique to each object!

**操作时的代码**:
```python
class Dog:
    species = "Canis familiaris"  # Class attribute
    
    def __init__(self, name):
        self.name = name  # Instance attribute

dog1 = Dog("Buddy")
dog2 = Dog("Lucy")

# Access class attribute
print(dog1.species)
print(dog2.species)
print(Dog.species)

# Instance attributes are unique
print(dog1.name)
print(dog2.name)
```

---

## [场景 7: 实际操作 - 字符串表示] (60 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Customize how objects are printed.

(打字: class Book:)
(Tab, 打字:     def __init__(self, title, author):)
(Tab*2, 打字:         self.title = title)
(Tab*2, 打字:         self.author = author)
(Tab, 打字:     def __str__(self):)
(Tab*2, 打字:         return f"'{self.title}' by {self.author}")
Underscore underscore str defines string representation!

(打字: book = Book("Python 101", "John Doe"))
(打字: print(book))
(运行)
Nice readable output! Without underscore underscore str, it would show object address.

(打字: book2 = Book("AI Basics", "Jane Smith"))
(打字: print(book2))
(运行)
Custom string representation makes objects more readable!

**操作时的代码**:
```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
    
    def __str__(self):
        return f"'{self.title}' by {self.author}"

book = Book("Python 101", "John Doe")
print(book)

book2 = Book("AI Basics", "Jane Smith")
print(book2)
```

---

## [场景 8: 实际应用] (60 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
finally, let's see an bank account practice

(打字: class BankAccount:)
(Tab, 打字:     def __init__(self, owner, balance=0):)
(Tab*2, 打字:         self.owner = owner)
(Tab*2, 打字:         self.balance = balance)
(Tab, 打字:     def deposit(self, amount):)
(Tab*2, 打字:         self.balance += amount)
(Tab*2, 打字:         print(f"Deposited ${amount}. New balance: ${self.balance}"))
(Tab, 打字:     def withdraw(self, amount):)
(Tab*2, 打字:         if amount <= self.balance:)
(Tab*3, 打字:             self.balance -= amount)
(Tab*3, 打字:             print(f"Withdrew ${amount}. New balance: ${self.balance}"))
(Tab*2, 打字:         else:)
(Tab*3, 打字:             print("Insufficient funds!"))
(打字: account = BankAccount("Alice", 1000))
(打字: account.deposit(500))
(打字: account.withdraw(300))
(打字: account.withdraw(2000))
(运行)
i create a class named bank account, inside the class, i create a constructor with two parameter, remember the constructor name must underscore underscore i n i t underscore underscore, and the first parameter must self, then input onwer and balance in the parentheses, and the balance default is 0. in the constructor, save the value that passed when create object. then define two methods named depostit and withdraw with a parameter amount, if call the deposit method, the balance will add the amounnt, if call withdraw method, the balance will deduct the amount, after that will print out how many amount is added or deducted, an show the new balance too. moreover, we also need to set a if condition inside withdraw method, if amount is greater than the balance will print the error message. otherwase the action is accepted.

after complete the class, let's create an object, the object name is account and owner is alice and balance is 1000, and remind that, since we set the balance is 1000, so the default value 0 will be coverd. it will use when we without set the banalce value. then we first deposit 500 from account, after that, withdraw 300 and 2000 in account, let's see the output. we can see the account balance is 1500 when deposit 500, then update to 1200 after withdraw 300. however, the error message printed since the amount 2000 is greater than the latest balance 1200.

**操作时的代码**:
```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
    
    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited ${amount}. New balance: ${self.balance}")
    
    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            print(f"Withdrew ${amount}. New balance: ${self.balance}")
        else:
            print("Insufficient funds!")

account = BankAccount("Alice", 1000)
account.deposit(500)
account.withdraw(300)
account.withdraw(2000)
```

---

## [场景 9: 结尾] (10 秒)
**画面**: 总结卡片
**配音**:
Excellent! You've learned to create classes and objects. Next, we'll explore inheritance - reusing code through class hierarchies. See you there!

---

## 制作注意事项：
1. **讲解部分** (场景 1-2, 9): PPT 展示
2. **操作部分** (场景 3-8): 
   - 强调 self 的重要性
   - 区分实例属性和类属性
   - 展示 __init__ 和 __str__
3. **AI 配音**: 清晰语速
4. **重点**: 类定义、self 参数、实例 vs 类属性
