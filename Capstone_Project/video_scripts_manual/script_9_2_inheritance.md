# Chapter 9.2: Inheritance - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "9.2 Inheritance"
**配音**:
Welcome to Lesson 9.2: Inheritance. Inheritance lets classes share code by creating parent-child relationships. Let's learn how to build class hierarchies!

---

## [场景 2: 继承介绍] (40 秒)
**画面**: 继承概念图示 + 类层次结构
**配音**:
Inheritance allows a class to inherit attributes and methods from another class. The parent class, or superclass, provides common functionality. The child class, or subclass, extends or modifies that functionality. This promotes code reuse and creates logical hierarchies. For example, a Dog class and Cat class can both inherit from an Animal class, sharing common features while having their own unique behaviors.

---

## [场景 3: 实际操作 - 基本继承] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
now, Let's see how to create a class hierarchy in code editor.

(打字: # Parent class)
(打字: class Animal:)
(Tab, 打字:     def __init__(self, name):)
(Tab*2, 打字:         self.name = name)
(Tab, 打字:     def speak(self):)
(Tab*2, 打字:         print(f"{self.name} makes a sound"))
I create Parent class first with basic functionality. the class has name attribute,  speak method and eat method in the constructor.

(打字: # Child class inherits from Animal)
(打字: class Dog(Animal):)
(Tab, 打字:     def speak(self):)
(Tab*2, 打字:         print(f"{self.name} barks: Woof!"))
after complete the parent class, i create child class named Dog, it inherits from Animal, and remind that if you want to inherit from parent class, remember input the parent class name in the parentheses like this!

(打字: class Cat(Animal):)
(Tab, 打字:     def speak(self):)
(Tab*2, 打字:         print(f"{self.name} meows: Meow!"))
then, i also create another child class named Cat, it also inherits from Animal too!

(打字: dog = Dog("Buddy"))
(打字: cat = Cat("Whiskers"))
(打字: dog.speak())
(打字: cat.speak())
(运行)
Both inherit from Animal, but they rewrite the speak method, run the code, you can see the output will show the rewrite version of speak method which define in each child class. This is method overriding! if the child class doesn't rewrite the method, when the object call this method, it will show the output that defined in the parent class.

**操作时的代码**:
```python
# Parent class
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        print(f"{self.name} makes a sound")

# Child class inherits from Animal
class Dog(Animal):
    def speak(self):
        print(f"{self.name} barks: Woof!")

class Cat(Animal):
    def speak(self):
        print(f"{self.name} meows: Meow!")

dog = Dog("Buddy")
cat = Cat("Whiskers")

dog.speak()
cat.speak()
```

---

## [场景 4: 实际操作 - super() 函数] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
moreover, let's introduce how to use super function to call parent class methods.

(打字: class Animal:)
(Tab, 打字:     def __init__(self, name, age):)
(Tab*2, 打字:         self.name = name)
(Tab*2, 打字:         self.age = age)
(Tab*2, 打字:         print(f"Animal created: {name}"))
(打字: class Dog(Animal):)
(Tab, 打字:     def __init__(self, name, age, breed):)
(Tab*2, 打字:         super().__init__(name, age))
Super calls the parent's init!

(Tab*2, 打字:         self.breed = breed)
(Tab*2, 打字:         print(f"Dog breed: {breed}"))
(打字: dog = Dog("Buddy", 3, "Golden Retriever"))
(运行)
Animal created first, then dog breed! Super calls parent initialization!

(打字: print(f"{dog.name} is a {dog.age} year old {dog.breed}"))
(运行)
All attributes work! Name and age from parent, breed from child!

**操作时的代码**:
```python
class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        print(f"Animal created: {name}")

class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age)
        self.breed = breed
        print(f"Dog breed: {breed}")

dog = Dog("Buddy", 3, "Golden Retriever")
print(f"{dog.name} is a {dog.age} year old {dog.breed}")
```

---

## [场景 5: 实际操作 - 扩展父类功能] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
on the other hand, Child classes also can add new methods.

(打字: class Animal:)
(Tab, 打字:     def __init__(self, name):)
(Tab*2, 打字:         self.name = name)
(Tab, 打字:     def eat(self):)
(Tab*2, 打字:         print(f"{self.name} is eating"))
(打字: class Dog(Animal):)
(Tab, 打字:     def fetch(self):)
(Tab*2, 打字:         print(f"{self.name} is fetching the ball!"))
in this example, we have parenet class animal with attribute name and eat method, then, Dog class inherit animal class, and dog class define a new method that Animal doesn't have!

(打字: class Bird(Animal):)
(Tab, 打字:     def fly(self):)
(Tab*2, 打字:         print(f"{self.name} is flying!"))
and create Bird class also interit animal class, it also has its own unique method!

(打字: dog = Dog("Max"))
(打字: bird = Bird("Tweety"))
(打字: dog.eat())
(打字: dog.fetch())
(打字: bird.eat())
(打字: bird.fly())
(运行)
create dog and bird object, then call the method, you can see animal method can use by child method, they can call eat method, moreover, they also can call the new  method that created by each child class.
run the code, see, Each subclass has parent methods plus its own!

**操作时的代码**:
```python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def eat(self):
        print(f"{self.name} is eating")

class Dog(Animal):
    def fetch(self):
        print(f"{self.name} is fetching the ball!")

class Bird(Animal):
    def fly(self):
        print(f"{self.name} is flying!")

dog = Dog("Max")
bird = Bird("Tweety")

dog.eat()
dog.fetch()
bird.eat()
bird.fly()
```

---

## [场景 6: 实际操作 - isinstance 和 issubclass] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Check object types and class relationships.

(打字: class Animal:)
(Tab, 打字:     pass)
(打字: class Dog(Animal):)
(Tab, 打字:     pass)
(打字: dog = Dog())
(打字: # Check if object is instance of class)
(打字: print(isinstance(dog, Dog)))
(运行)
True! dog is a Dog instance!

(打字: print(isinstance(dog, Animal)))
(运行)
Also True! dog is an Animal because Dog inherits from Animal!

(打字: print(isinstance(dog, str)))
(运行)
False! dog is not a string!

(打字: # Check if class is subclass of another)
(打字: print(issubclass(Dog, Animal)))
(运行)
True! Dog is a subclass of Animal!

(打字: print(issubclass(Animal, Dog)))
(运行)
False! Animal is not a subclass of Dog!

**操作时的代码**:
```python
class Animal:
    pass

class Dog(Animal):
    pass

dog = Dog()

# Check if object is instance of class
print(isinstance(dog, Dog))
print(isinstance(dog, Animal))
print(isinstance(dog, str))

# Check if class is subclass of another
print(issubclass(Dog, Animal))
print(issubclass(Animal, Dog))
```

---

## [场景 7: 实际操作 - 多级继承] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
on the other hand, let's introduce Multi-level Inheritance.

(打字: class Animal:)
(Tab, 打字:     def breathe(self):)
(Tab*2, 打字:         print("Breathing..."))
(打字: class Mammal(Animal):)
(Tab, 打字:     def feed_milk(self):)
(Tab*2, 打字:         print("Feeding milk to babies"))
Mammal inherits from Animal!

(打字: class Dog(Mammal):)
(Tab, 打字:     def bark(self):)
(Tab*2, 打字:         print("Woof!"))
Dog inherits from Mammal, which inherits from Animal!

(打字: dog = Dog())
(打字: dog.breathe())
From Animal!

(打字: dog.feed_milk())
From Mammal!

(打字: dog.bark())
From Dog!

(运行)
Three levels of inheritance! Dog has access to all methods up the chain!

**操作时的代码**:
```python
class Animal:
    def breathe(self):
        print("Breathing...")

class Mammal(Animal):
    def feed_milk(self):
        print("Feeding milk to babies")

class Dog(Mammal):
    def bark(self):
        print("Woof!")

dog = Dog()
dog.breathe()
dog.feed_milk()
dog.bark()
```

---

## [场景 8: 实际应用] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Real-world example: Employee hierarchy.

(打字: class Employee:)
(Tab, 打字:     def __init__(self, name, salary):)
(Tab*2, 打字:         self.name = name)
(Tab*2, 打字:         self.salary = salary)
(Tab, 打字:     def get_info(self):)
(Tab*2, 打字:         return f"{self.name}: ${self.salary}")
(打字: class Manager(Employee):)
(Tab, 打字:     def __init__(self, name, salary, department):)
(Tab*2, 打字:         super().__init__(name, salary))
(Tab*2, 打字:         self.department = department)
(Tab, 打字:     def get_info(self):)
(Tab*2, 打字:         return f"Manager {self.name}: ${self.salary} - {self.department}")
(打字: class Developer(Employee):)
(Tab, 打字:     def __init__(self, name, salary, language):)
(Tab*2, 打字:         super().__init__(name, salary))
(Tab*2, 打字:         self.language = language)
(打字: emp = Employee("John", 50000))
(打字: mgr = Manager("Alice", 80000, "Engineering"))
(打字: dev = Developer("Bob", 70000, "Python"))
(打字: print(emp.get_info()))
(打字: print(mgr.get_info()))
(打字: print(dev.get_info()))
(运行)
Inheritance models real-world relationships!

**操作时的代码**:
```python
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
    
    def get_info(self):
        return f"{self.name}: ${self.salary}"

class Manager(Employee):
    def __init__(self, name, salary, department):
        super().__init__(name, salary)
        self.department = department
    
    def get_info(self):
        return f"Manager {self.name}: ${self.salary} - {self.department}"

class Developer(Employee):
    def __init__(self, name, salary, language):
        super().__init__(name, salary)
        self.language = language

emp = Employee("John", 50000)
mgr = Manager("Alice", 80000, "Engineering")
dev = Developer("Bob", 70000, "Python")

print(emp.get_info())
print(mgr.get_info())
print(dev.get_info())
```

---

## [场景 9: 结尾] (10 秒)
**画面**: 总结卡片
**配音**:
Excellent! You've mastered inheritance and class hierarchies. Next, we'll explore encapsulation and magic methods. See you there!

---

## 制作注意事项：
1. **讲解部分** (场景 1-2, 9): PPT 展示
2. **操作部分** (场景 3-8): 
   - 强调继承语法和 super()
   - 演示方法重写
   - 展示多级继承
3. **AI 配音**: 清晰语速
4. **重点**: 继承语法、super()、方法重写、isinstance
