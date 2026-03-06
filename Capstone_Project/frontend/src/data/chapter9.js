// Chapter 9: Object-Oriented Programming (OOP)
export const chapter9 = {
  id: 9,
  title: "Chapter 9: Object-Oriented Programming",
  subsections: [
    {
      id: "9.1",
      title: "9.1 Classes and Objects",
      videoUrl: "https://youtu.be/mgq1cYbRN78",
      content: {
        lecture: `
# Classes and Objects

Object-Oriented Programming (OOP) is a way to organize code using **objects** that contain both data and functions.

## What are Classes and Objects?

**Class**: A blueprint or template for creating objects  
**Object**: An instance of a class

Think of it like:
- **Class** = Cookie cutter
- **Object** = The actual cookie

## Defining a Class

\`\`\`python
class Dog:
    pass

# Create an object (instance) of Dog class
my_dog = Dog()
print(my_dog)  # <__main__.Dog object at 0x...>
\`\`\`

## The __init__ Method (Constructor)

The \`__init__\` method initializes the object when it's created.

\`\`\`python
class Dog:
    def __init__(self, name, age):
        self.name = name  # Instance variable
        self.age = age    # Instance variable

# Create Dog objects
dog1 = Dog("Buddy", 3)
dog2 = Dog("Max", 5)

print(dog1.name)  # Buddy
print(dog2.age)   # 5
\`\`\`

## Understanding 'self'

\`self\` refers to the current instance of the class.

\`\`\`python
class Person:
    def __init__(self, name):
        self.name = name  # self.name belongs to this instance
    
    def greet(self):
        print(f"Hello, my name is {self.name}")

person1 = Person("Alice")
person2 = Person("Bob")

person1.greet()  # Hello, my name is Alice
person2.greet()  # Hello, my name is Bob
\`\`\`

## Instance Variables

Instance variables are unique to each object.

\`\`\`python
class Car:
    def __init__(self, brand, model, year):
        self.brand = brand
        self.model = model
        self.year = year

car1 = Car("Toyota", "Camry", 2020)
car2 = Car("Honda", "Accord", 2021)

print(f"{car1.brand} {car1.model} {car1.year}")  # Toyota Camry 2020
print(f"{car2.brand} {car2.model} {car2.year}")  # Honda Accord 2021
\`\`\`

## Creating Multiple Objects

Each object has its own data.

\`\`\`python
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

students = [
    Student("Alice", 95),
    Student("Bob", 88),
    Student("Charlie", 92)
]

for student in students:
    print(f"{student.name}: {student.grade}")
# Output:
# Alice: 95
# Bob: 88
# Charlie: 92
\`\`\`

## Instance Methods

Methods are functions inside a class that operate on objects.

\`\`\`python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def bark(self):
        print(f"{self.name} says Woof!")
    
    def get_info(self):
        return f"{self.name} is {self.age} years old"

dog = Dog("Buddy", 3)
dog.bark()              # Buddy says Woof!
print(dog.get_info())   # Buddy is 3 years old
\`\`\`

## Methods with Parameters

\`\`\`python
class Calculator:
    def __init__(self):
        self.result = 0
    
    def add(self, a, b):
        self.result = a + b
        return self.result
    
    def multiply(self, a, b):
        self.result = a * b
        return self.result

calc = Calculator()
print(calc.add(5, 3))       # 8
print(calc.multiply(4, 7))  # 28
print(calc.result)          # 28 (last result)
\`\`\`

## The __str__ Method

Special method to control how an object is printed.

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        return f"{self.name}, {self.age} years old"

person = Person("Alice", 25)
print(person)  # Alice, 25 years old
\`\`\`

Without \`__str__\`:
\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Alice", 25)
print(person)  # <__main__.Person object at 0x...>
\`\`\`

## Practical Example: Bank Account

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance
    
    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited \${amount}. New balance: \${self.balance}")
    
    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds!")
        else:
            self.balance -= amount
            print(f"Withdrew \${amount}. New balance: \${self.balance}")
    
    def get_balance(self):
        return f"Current balance: \${self.balance}"
    
    def __str__(self):
        return f"BankAccount(owner={self.owner}, balance=\${self.balance})"

# Create account
account = BankAccount("Alice", 1000)
print(account)  # BankAccount(owner=Alice, balance=$1000)

account.deposit(500)   # Deposited $500. New balance: $1500
account.withdraw(200)  # Withdrew $200. New balance: $1300
print(account.get_balance())  # Current balance: $1300
\`\`\`

## Why Use Classes?

1. **Organization** - Group related data and functions together
2. **Reusability** - Create multiple objects from one class
3. **Maintainability** - Easier to update and debug
4. **Real-world modeling** - Represent real entities in code

## Class vs Object Summary

| Class | Object |
|-------|--------|
| Blueprint | Instance |
| Definition | Actual thing |
| \`class Dog:\` | \`my_dog = Dog()\` |
| Created once | Can create many |
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What will be the output of the following code?\n\n```python\nclass Car:\n    def __init__(self, brand):\n        self.brand = brand\n\ncar1 = Car('Toyota')\ncar2 = Car('Honda')\nprint(car1.brand)\nprint(car2.brand)\n```",
              options: [
                "Toyota\nToyota",
                "Honda\nHonda",
                "Toyota\nHonda",
                "Error"
              ],
              correctAnswer: 2,
              explanation: "Each object (car1 and car2) has its own instance variable 'brand'. car1.brand is 'Toyota' and car2.brand is 'Honda'."
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to define a simple class named 'Dog':",
              multiLine: true,
              sharedBlocks: false,
              lines: [
                {
                  label: "Line 1 (class definition):",
                  blocks: ["class", "Dog", ":"],
                  correctOrder: ["class", "Dog", ":"]
                },
                {
                  label: "Line 2 (class body - indented):",
                  blocks: ["pass"],
                  correctOrder: ["pass"],
                  indent: true
                }
              ],
              explanation: "A class is defined using the class keyword, followed by the class name and colon. The class body (even if empty with pass) must be indented."
            }
          ]
        },
        practice: {
          description: `
## Exercise: Create a Person Class

**Task**: 
Create a \`Person\` class with:
1. \`__init__\` method with parameters: name, age, city
2. Store these as instance variables
3. A method \`introduce()\` that prints: "Hi, I'm {name}, {age} years old, from {city}"
4. Create a Person object: name="John", age=25, city="New York"
5. Call the introduce method

**Expected Output**:
\`\`\`
Hi, I'm John, 25 years old, from New York
\`\`\`

**Hints**:
- Use \`def __init__(self, name, age, city):\`
- Store variables as \`self.name\`, \`self.age\`, \`self.city\`
- Use f-string in the introduce method
          `,
          starterCode: `# Define the Person class


# Create a person object


# Call the introduce method

`,
          solution: `# Define the Person class
class Person:
    def __init__(self, name, age, city):
        self.name = name
        self.age = age
        self.city = city
    
    def introduce(self):
        print(f"Hi, I'm {self.name}, {self.age} years old, from {self.city}")

# Create a person object
person = Person("John", 25, "New York")

# Call the introduce method
person.introduce()`,
          expectedOutput: "Hi, I'm John, 25 years old, from New York"
        }
      }
    },
    {
      id: "9.2",
      title: "9.2 Inheritance",
      videoUrl: "https://youtu.be/TXIGlZlZ0ec",
      content: {
        lecture: `
# Inheritance

Inheritance allows a class to inherit attributes and methods from another class, promoting code reuse and creating logical class hierarchies.

## What is Inheritance?

**Inheritance** is when a class (child/subclass) inherits properties and behaviors from another class (parent/superclass).

Think of it like genetics: children inherit traits from their parents.

## Basic Inheritance Syntax

\`\`\`python
# Parent class (superclass)
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        print(f"{self.name} makes a sound")

# Child class (subclass) inherits from Animal
class Dog(Animal):
    pass

# Dog inherits everything from Animal
dog = Dog("Buddy")
dog.speak()  # Buddy makes a sound
\`\`\`

## Extending Parent Class

Child classes can add new methods and attributes while keeping inherited ones.

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        print(f"{self.name} makes a sound")

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # Call parent's __init__
        self.breed = breed
    
    def wag_tail(self):
        print(f"{self.name} wags tail")
    
    def fetch(self):
        print(f"{self.name} fetches the ball")

dog = Dog("Buddy", "Golden Retriever")
dog.speak()      # Buddy makes a sound (inherited)
dog.wag_tail()   # Buddy wags tail (new method)
dog.fetch()      # Buddy fetches the ball (new method)
print(dog.breed) # Golden Retriever (new attribute)
\`\`\`

## The super() Function

\`super()\` is used to call methods from the parent class.

\`\`\`python
class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        print(f"Animal created: {name}")

class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age)  # Call parent's __init__
        self.breed = breed
        print(f"Dog breed: {breed}")

dog = Dog("Buddy", 3, "Golden Retriever")
# Output:
# Animal created: Buddy
# Dog breed: Golden Retriever

print(f"{dog.name} is a {dog.age} year old {dog.breed}")
# Buddy is a 3 year old Golden Retriever
\`\`\`

## Method Overriding

Child classes can override parent methods to provide specific implementations.

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        print(f"{self.name} makes a sound")

class Dog(Animal):
    def speak(self):  # Override parent's speak()
        print(f"{self.name} barks: Woof!")

class Cat(Animal):
    def speak(self):  # Override parent's speak()
        print(f"{self.name} meows: Meow!")

class Bird(Animal):
    def speak(self):  # Override parent's speak()
        print(f"{self.name} chirps: Tweet!")

# Each animal speaks differently
dog = Dog("Buddy")
cat = Cat("Whiskers")
bird = Bird("Tweety")

dog.speak()   # Buddy barks: Woof!
cat.speak()   # Whiskers meows: Meow!
bird.speak()  # Tweety chirps: Tweet!
\`\`\`

## Using super() to Extend Methods

You can call the parent method and add extra functionality.

\`\`\`python
class Vehicle:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
    
    def info(self):
        return f"{self.brand} {self.model}"

class Car(Vehicle):
    def __init__(self, brand, model, doors):
        super().__init__(brand, model)
        self.doors = doors
    
    def info(self):
        parent_info = super().info()  # Get parent's info
        return f"{parent_info}, {self.doors} doors"

car = Car("Toyota", "Camry", 4)
print(car.info())  # Toyota Camry, 4 doors
\`\`\`

## Multiple Levels of Inheritance

Classes can form inheritance chains.

\`\`\`python
class LivingThing:
    def __init__(self, name):
        self.name = name
    
    def breathe(self):
        print(f"{self.name} is breathing")

class Animal(LivingThing):
    def move(self):
        print(f"{self.name} is moving")

class Dog(Animal):
    def bark(self):
        print(f"{self.name} is barking")

dog = Dog("Buddy")
dog.breathe()  # From LivingThing
dog.move()     # From Animal
dog.bark()     # From Dog
\`\`\`

## Multiple Inheritance

A class can inherit from multiple parent classes.

\`\`\`python
class Flyer:
    def fly(self):
        print("Flying in the sky")

class Swimmer:
    def swim(self):
        print("Swimming in water")

class Duck(Flyer, Swimmer):
    def quack(self):
        print("Quack quack!")

duck = Duck()
duck.fly()    # Flying in the sky (from Flyer)
duck.swim()   # Swimming in water (from Swimmer)
duck.quack()  # Quack quack! (own method)
\`\`\`

## Checking Inheritance Relationships

Use \`isinstance()\` and \`issubclass()\`.

\`\`\`python
class Animal:
    pass

class Dog(Animal):
    pass

class Cat(Animal):
    pass

dog = Dog()
cat = Cat()

# isinstance() checks if object is instance of class
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True
print(isinstance(dog, Cat))     # False

# issubclass() checks class relationships
print(issubclass(Dog, Animal))  # True
print(issubclass(Animal, Dog))  # False
print(issubclass(Dog, Cat))     # False
\`\`\`

## Practical Example: Employee System

\`\`\`python
class Employee:
    def __init__(self, name, employee_id, salary):
        self.name = name
        self.employee_id = employee_id
        self.salary = salary
    
    def get_details(self):
        return f"Employee: {self.name} (ID: {self.employee_id}), Salary: \${self.salary}"
    
    def work(self):
        print(f"{self.name} is working")

class Developer(Employee):
    def __init__(self, name, employee_id, salary, programming_language):
        super().__init__(name, employee_id, salary)
        self.programming_language = programming_language
    
    def get_details(self):
        parent_details = super().get_details()
        return f"{parent_details}, Language: {self.programming_language}"
    
    def code(self):
        print(f"{self.name} is writing {self.programming_language} code")

class Manager(Employee):
    def __init__(self, name, employee_id, salary, team_size):
        super().__init__(name, employee_id, salary)
        self.team_size = team_size
    
    def get_details(self):
        parent_details = super().get_details()
        return f"{parent_details}, Team: {self.team_size} members"
    
    def hold_meeting(self):
        print(f"{self.name} is holding a meeting")

# Create employees
dev = Developer("Alice", 101, 80000, "Python")
mgr = Manager("Bob", 201, 100000, 10)

print(dev.get_details())
# Employee: Alice (ID: 101), Salary: $80000, Language: Python

print(mgr.get_details())
# Employee: Bob (ID: 201), Salary: $100000, Team: 10 members

dev.work()  # Alice is working (inherited)
dev.code()  # Alice is writing Python code

mgr.work()           # Bob is working (inherited)
mgr.hold_meeting()   # Bob is holding a meeting
\`\`\`

## Benefits of Inheritance

1. **Code Reusability** - Don't repeat common code
2. **Logical Organization** - Create hierarchies that make sense
3. **Easier Maintenance** - Fix bugs in one place
4. **Extensibility** - Easy to add new types
5. **Polymorphism** - Use child classes interchangeably

## When to Use Inheritance

✅ **Good use cases:**
- "Is-a" relationship (Dog IS AN Animal)
- Sharing common behavior across related classes
- Creating specialized versions of a general class

❌ **Avoid inheritance when:**
- "Has-a" relationship (Car HAS AN Engine - use composition)
- No clear parent-child relationship
- Just to reuse a few methods
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What will be the output of the following code?\n\n```python\nclass Animal:\n    def sound(self):\n        return 'Generic sound'\n\nclass Dog(Animal):\n    def sound(self):\n        return 'Bark'\n\ndog = Dog()\nprint(dog.sound())\n```",
              options: [
                "Generic sound",
                "Bark",
                "Generic sound Bark",
                "Error"
              ],
              correctAnswer: 1,
              explanation: "The Dog class overrides the sound() method from Animal, so when dog.sound() is called, it executes Dog's version and returns 'Bark'."
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to create a class Cat that inherits from Animal:",
              blocks: ["class", "Cat", "(", "Animal", ")", ":"],
              correctOrder: ["class", "Cat", "(", "Animal", ")", ":"],
              explanation: "Inheritance syntax: class ChildClass(ParentClass): - The parent class name goes in parentheses"
            }
          ]
        },
        practice: {
          description: `
## Exercise: Create a Shape Hierarchy

**Task**: 
Create an inheritance system for shapes:
1. Create a parent class \`Shape\` with:
   - \`__init__\` method taking \`name\` parameter
   - Store name as instance variable
2. Create a child class \`Rectangle\` that inherits from \`Shape\`:
   - Override \`__init__\` to accept \`width\` and \`height\`
   - Use \`super().__init__("Rectangle")\` to set name
   - Add a method \`area()\` that returns width × height
3. Create a Rectangle with width=5 and height=10
4. Print the name and area

**Expected Output**:
\`\`\`
Name: Rectangle
Area: 50
\`\`\`

**Hints**:
- Parent class: \`class Shape:\`
- Child class: \`class Rectangle(Shape):\`
- Use \`super().__init__(name)\`
- Calculate area: \`self.width * self.height\`
          `,
          starterCode: `# Define parent class Shape


# Define child class Rectangle


# Create Rectangle object


# Print name and area

`,
          solution: `# Define parent class Shape
class Shape:
    def __init__(self, name):
        self.name = name

# Define child class Rectangle
class Rectangle(Shape):
    def __init__(self, width, height):
        super().__init__("Rectangle")
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

# Create Rectangle object
rect = Rectangle(5, 10)

# Print name and area
print(f"Name: {rect.name}")
print(f"Area: {rect.area()}")`,
          expectedOutput: "Name: Rectangle\nArea: 50"
        }
      }
    },
    {
      id: "9.3",
      title: "9.3 Encapsulation and Magic Methods",
      videoUrl: "https://youtu.be/LEWy-kR7Msc",
      content: {
        lecture: `
# Encapsulation and Magic Methods

Encapsulation protects data by controlling access, while magic methods provide special functionality to classes.

## What is Encapsulation?

**Encapsulation** means hiding internal details and controlling access to data through methods.

Think of it like a TV remote - you press buttons (interface) without knowing the internal circuits (implementation).

## Public, Protected, and Private Attributes

Python uses naming conventions to indicate access levels:

### Public Attributes (no underscore)
Anyone can access and modify.

\`\`\`python
class Person:
    def __init__(self, name):
        self.name = name  # Public

person = Person("Alice")
print(person.name)    # Alice - can access
person.name = "Bob"   # Can modify
print(person.name)    # Bob
\`\`\`

### Protected Attributes (single underscore _)
Convention: for internal use, but still accessible.

\`\`\`python
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self._salary = salary  # Protected (convention)

emp = Employee("Alice", 50000)
print(emp.name)      # Alice - public
print(emp._salary)   # 50000 - can access but shouldn't
\`\`\`

### Private Attributes (double underscore __)
Name mangling makes them harder to access from outside.

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance, pin):
        self.owner = owner           # Public
        self._balance = balance      # Protected
        self.__pin = pin             # Private

    def verify_pin(self, pin):
        return self.__pin == pin

account = BankAccount("Alice", 1000, 1234)
print(account.owner)       # Alice - works
print(account._balance)    # 1000 - works but shouldn't
# print(account.__pin)     # AttributeError!
print(account.verify_pin(1234))  # True - correct way
\`\`\`

## Getters and Setters

Methods to control how data is accessed and modified.

### Without Validation (Bad)

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Alice", 25)
person.age = -5  # Problem! Invalid age
print(person.age)  # -5
\`\`\`

### With Validation (Good)

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self._age = age
    
    def get_age(self):
        return self._age
    
    def set_age(self, age):
        if age < 0 or age > 150:
            print("Invalid age!")
        else:
            self._age = age

person = Person("Alice", 25)
print(person.get_age())  # 25

person.set_age(30)
print(person.get_age())  # 30

person.set_age(-5)       # Invalid age!
print(person.get_age())  # 30 (unchanged)
\`\`\`

## Property Decorators (@property)

More Pythonic way to create getters and setters.

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self._age = age
    
    @property
    def age(self):
        return self._age
    
    @age.setter
    def age(self, value):
        if value < 0 or value > 150:
            print("Invalid age!")
        else:
            self._age = value

person = Person("Alice", 25)
print(person.age)     # 25 (calls getter)

person.age = 30       # calls setter
print(person.age)     # 30

person.age = -5       # Invalid age! (setter validation)
\`\`\`

## Magic Methods (Dunder Methods)

Special methods with double underscores that add functionality.

### __str__() - String Representation

Controls what \`print()\` shows.

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        return f"{self.name}, {self.age} years old"

person = Person("Alice", 25)
print(person)  # Alice, 25 years old
\`\`\`

Without \`__str__\`:
\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Alice", 25)
print(person)  # <__main__.Person object at 0x...>
\`\`\`

### __repr__() - Developer Representation

Used for debugging, should ideally recreate the object.

\`\`\`python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __repr__(self):
        return f"Point({self.x}, {self.y})"
    
    def __str__(self):
        return f"({self.x}, {self.y})"

point = Point(3, 5)
print(point)       # (3, 5) - uses __str__
print(repr(point)) # Point(3, 5) - uses __repr__
\`\`\`

### __eq__() - Equality Comparison

Controls how \`==\` works.

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __eq__(self, other):
        return self.name == other.name and self.age == other.age

person1 = Person("Alice", 25)
person2 = Person("Alice", 25)
person3 = Person("Bob", 30)

print(person1 == person2)  # True
print(person1 == person3)  # False
\`\`\`

### __len__() - Length

Controls \`len()\` function.

\`\`\`python
class Playlist:
    def __init__(self, songs):
        self.songs = songs
    
    def __len__(self):
        return len(self.songs)

playlist = Playlist(["Song1", "Song2", "Song3"])
print(len(playlist))  # 3
\`\`\`

### __add__() - Addition Operator

Controls \`+\` operator.

\`\`\`python
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
v3 = v1 + v2  # Calls __add__
print(v3)     # Vector(4, 6)
\`\`\`

### __getitem__() and __setitem__() - Indexing

Controls bracket notation \`[]\`.

\`\`\`python
class GradeBook:
    def __init__(self):
        self.grades = {}
    
    def __setitem__(self, subject, grade):
        self.grades[subject] = grade
    
    def __getitem__(self, subject):
        return self.grades.get(subject, "No grade")

book = GradeBook()
book["Math"] = 95      # Calls __setitem__
book["Science"] = 88
print(book["Math"])    # 95 - Calls __getitem__
print(book["English"]) # No grade
\`\`\`

## Practical Example: Bank Account with Encapsulation

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance, pin):
        self.owner = owner
        self.__balance = balance  # Private
        self.__pin = pin          # Private
    
    def __verify_pin(self, pin):
        # Private method
        return self.__pin == pin
    
    def get_balance(self, pin):
        if self.__verify_pin(pin):
            return self.__balance
        else:
            return "Invalid PIN!"
    
    def deposit(self, amount, pin):
        if not self.__verify_pin(pin):
            return "Invalid PIN!"
        if amount > 0:
            self.__balance += amount
            return f"Deposited \${amount}. New balance: \${self.__balance}"
        return "Invalid amount!"
    
    def withdraw(self, amount, pin):
        if not self.__verify_pin(pin):
            return "Invalid PIN!"
        if amount > self.__balance:
            return "Insufficient funds!"
        if amount > 0:
            self.__balance -= amount
            return f"Withdrew \${amount}. New balance: \${self.__balance}"
        return "Invalid amount!"
    
    def __str__(self):
        return f"BankAccount(owner={self.owner})"
    
    def __repr__(self):
        return f"BankAccount('{self.owner}', {self.__balance}, ****)"

# Usage
account = BankAccount("Alice", 1000, 1234)
print(account)  # BankAccount(owner=Alice)

print(account.get_balance(1234))        # 1000
print(account.get_balance(9999))        # Invalid PIN!

print(account.deposit(500, 1234))       # Deposited $500. New balance: $1500
print(account.withdraw(200, 1234))      # Withdrew $200. New balance: $1300
print(account.withdraw(5000, 1234))     # Insufficient funds!

# Can't access private attributes directly
# print(account.__balance)  # AttributeError
# print(account.__pin)      # AttributeError
\`\`\`

## Common Magic Methods Summary

| Method | Purpose | Example |
|--------|---------|---------|
| \`__init__()\` | Constructor | \`obj = MyClass()\` |
| \`__str__()\` | String representation | \`print(obj)\` |
| \`__repr__()\` | Developer representation | \`repr(obj)\` |
| \`__len__()\` | Length | \`len(obj)\` |
| \`__eq__()\` | Equality | \`obj1 == obj2\` |
| \`__lt__()\` | Less than | \`obj1 < obj2\` |
| \`__add__()\` | Addition | \`obj1 + obj2\` |
| \`__sub__()\` | Subtraction | \`obj1 - obj2\` |
| \`__getitem__()\` | Get item | \`obj[key]\` |
| \`__setitem__()\` | Set item | \`obj[key] = value\` |

## Benefits of Encapsulation

1. **Data Protection** - Prevent invalid states
2. **Maintainability** - Change internals without breaking code
3. **Flexibility** - Add validation and logic
4. **Security** - Hide sensitive information
5. **Control** - Manage how data is accessed

## Best Practices

✅ **Do:**
- Use getters/setters for validation
- Make sensitive data private
- Provide clear public interfaces
- Use @property for Pythonic access

❌ **Don't:**
- Make everything private unnecessarily
- Bypass encapsulation with name mangling tricks
- Forget that Python trusts programmers
- Overcomplicate simple classes
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What is the purpose of using double underscores (__) before an attribute name in Python?\n\n```python\nclass Account:\n    def __init__(self, balance):\n        self.__balance = balance\n```",
              options: [
                "It makes the attribute completely inaccessible",
                "It applies name mangling to make the attribute harder to access from outside the class",
                "It makes the attribute read-only",
                "It has no special meaning"
              ],
              correctAnswer: 1,
              explanation: "Double underscores trigger name mangling in Python, which changes the attribute name to _ClassName__attributeName, making it harder (but not impossible) to access from outside the class. This is Python's way of implementing 'private' attributes."
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to create a private attribute __age:",
              blocks: ["self.__age", "=", "25"],
              correctOrder: ["self.__age", "=", "25"],
              explanation: "Private attributes in Python are denoted by double underscores: self.__attribute_name. This triggers name mangling for encapsulation."
            }
          ]
        },
        practice: {
          description: `
## Exercise: Temperature Converter with Validation

**Task**: 
Create a \`Temperature\` class with encapsulation:
1. Private attribute \`__celsius\`
2. Constructor that accepts celsius value
3. Getter method \`get_celsius()\` that returns the value
4. Setter method \`set_celsius(value)\` that:
   - Accepts value only if >= -273.15 (absolute zero)
   - Prints "Invalid temperature!" if below absolute zero
   - Updates __celsius if valid
5. Method \`to_fahrenheit()\` that returns celsius × 9/5 + 32
6. Magic method \`__str__()\` that returns "Temperature: {celsius}°C"

Test with:
- Create Temperature(25)
- Print the object (should use __str__)
- Convert to Fahrenheit
- Try setting to -300 (should fail)
- Set to 100
- Print again

**Expected Output**:
\`\`\`
Temperature: 25°C
77.0
Invalid temperature!
Temperature: 100°C
\`\`\`

**Hints**:
- Use \`self.__celsius\` for private attribute
- Validate in setter before updating
- Use f-string in __str__ method
          `,
          starterCode: `# Define Temperature class with encapsulation


# Test the class


`,
          solution: `# Define Temperature class with encapsulation
class Temperature:
    def __init__(self, celsius):
        self.__celsius = celsius
    
    def get_celsius(self):
        return self.__celsius
    
    def set_celsius(self, value):
        if value < -273.15:
            print("Invalid temperature!")
        else:
            self.__celsius = value
    
    def to_fahrenheit(self):
        return self.__celsius * 9/5 + 32
    
    def __str__(self):
        return f"Temperature: {self.__celsius}°C"

# Test the class
temp = Temperature(25)
print(temp)                    # Temperature: 25°C
print(temp.to_fahrenheit())    # 77.0
temp.set_celsius(-300)         # Invalid temperature!
temp.set_celsius(100)
print(temp)                    # Temperature: 100°C`,
          expectedOutput: "Temperature: 25°C\n77.0\nInvalid temperature!\nTemperature: 100°C"
        }
      }
    },
    {
      id: "9.4",
      title: "9.4 Polymorphism",
      videoUrl: "https://youtu.be/hylBNvknq6k",
      content: {
        lecture: `
# Polymorphism

Polymorphism means "many forms" - it allows different classes to be treated through the same interface while each having its own specific implementation.

## What is Polymorphism?

**Polymorphism** enables objects of different classes to be treated as objects of a common parent class, while each maintaining its own specific behavior.

Think of it like a universal remote - the same "play" button works differently for TV, DVD player, and stereo, but you use the same interface.

## Polymorphism with Inheritance

Different child classes can override the same method with different implementations.

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        pass  # To be overridden by child classes

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

class Cow(Animal):
    def speak(self):
        return f"{self.name} says Moo!"

# Polymorphism: same method call, different results
animals = [Dog("Buddy"), Cat("Whiskers"), Cow("Bessie")]

for animal in animals:
    print(animal.speak())
# Output:
# Buddy says Woof!
# Whiskers says Meow!
# Bessie says Moo!
\`\`\`

## Polymorphism with Functions

Functions can work with any object that has the required method.

\`\`\`python
def make_animal_speak(animal):
    print(animal.speak())

class Dog:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return f"{self.name}: Woof!"

class Cat:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return f"{self.name}: Meow!"

class Bird:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return f"{self.name}: Tweet!"

# Same function works with different object types
dog = Dog("Buddy")
cat = Cat("Whiskers")
bird = Bird("Tweety")

make_animal_speak(dog)   # Buddy: Woof!
make_animal_speak(cat)   # Whiskers: Meow!
make_animal_speak(bird)  # Tweety: Tweet!
\`\`\`

## Duck Typing

Python uses "duck typing" - if it walks like a duck and quacks like a duck, it's a duck.

\`\`\`python
class Dog:
    def make_sound(self):
        return "Woof!"

class Cat:
    def make_sound(self):
        return "Meow!"

class Car:
    def make_sound(self):
        return "Beep!"

# These classes are not related, but all have make_sound()
def trigger_sound(obj):
    print(obj.make_sound())

trigger_sound(Dog())  # Woof!
trigger_sound(Cat())  # Meow!
trigger_sound(Car())  # Beep!
\`\`\`

## Practical Example: Payment System

\`\`\`python
class Payment:
    def __init__(self, amount):
        self.amount = amount
    
    def process(self):
        pass  # To be implemented by subclasses

class CreditCardPayment(Payment):
    def __init__(self, amount, card_number):
        super().__init__(amount)
        self.card_number = card_number
    
    def process(self):
        return f"Processing credit card payment of \${self.amount} with card {self.card_number[-4:]}"

class PayPalPayment(Payment):
    def __init__(self, amount, email):
        super().__init__(amount)
        self.email = email
    
    def process(self):
        return f"Processing PayPal payment of \${self.amount} to {self.email}"

class BankTransferPayment(Payment):
    def __init__(self, amount, account_number):
        super().__init__(amount)
        self.account_number = account_number
    
    def process(self):
        return f"Processing bank transfer of \${self.amount} to account {self.account_number}"

# Polymorphic function
def process_payment(payment):
    print(payment.process())

# All payments processed through the same interface
payments = [
    CreditCardPayment(100, "1234-5678-9012-3456"),
    PayPalPayment(50, "user@example.com"),
    BankTransferPayment(200, "9876543210")
]

for payment in payments:
    process_payment(payment)
# Output:
# Processing credit card payment of $100 with card 3456
# Processing PayPal payment of $50 to user@example.com
# Processing bank transfer of $200 to account 9876543210
\`\`\`

## Polymorphism with Abstract Base Classes

Using \`abc\` module to enforce interface implementation.

\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
    
    @abstractmethod
    def perimeter(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14159 * self.radius ** 2
    
    def perimeter(self):
        return 2 * 3.14159 * self.radius

# Polymorphic function
def display_shape_info(shape):
    print(f"Area: {shape.area():.2f}")
    print(f"Perimeter: {shape.perimeter():.2f}")

rect = Rectangle(5, 10)
circle = Circle(7)

print("Rectangle:")
display_shape_info(rect)
# Rectangle:
# Area: 50.00
# Perimeter: 30.00

print("\\nCircle:")
display_shape_info(circle)
# Circle:
# Area: 153.94
# Perimeter: 43.98
\`\`\`

## Method Overloading (Simulated)

Python doesn't support true method overloading, but we can simulate it.

\`\`\`python
class Calculator:
    def add(self, *args):
        """Can handle any number of arguments"""
        return sum(args)

calc = Calculator()
print(calc.add(5, 3))           # 8
print(calc.add(1, 2, 3, 4, 5))  # 15
print(calc.add(10))             # 10
\`\`\`

## Operator Overloading Polymorphism

Magic methods enable polymorphic behavior for operators.

\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(2, 3)
v2 = Vector(4, 5)

# Polymorphic operators
v3 = v1 + v2      # Uses __add__
v4 = v1 * 3       # Uses __mul__

print(v3)  # Vector(6, 8)
print(v4)  # Vector(6, 9)
\`\`\`

## Real-World Example: File Handler System

\`\`\`python
class FileHandler:
    def __init__(self, filename):
        self.filename = filename
    
    def process(self):
        pass

class TextFileHandler(FileHandler):
    def process(self):
        return f"Processing text file: {self.filename}"

class ImageFileHandler(FileHandler):
    def process(self):
        return f"Processing image file: {self.filename}"

class VideoFileHandler(FileHandler):
    def process(self):
        return f"Processing video file: {self.filename}"

def process_file(handler):
    """Polymorphic function - works with any FileHandler"""
    print(handler.process())

# Different handlers, same interface
files = [
    TextFileHandler("document.txt"),
    ImageFileHandler("photo.jpg"),
    VideoFileHandler("movie.mp4")
]

for file in files:
    process_file(file)
# Output:
# Processing text file: document.txt
# Processing image file: photo.jpg
# Processing video file: movie.mp4
\`\`\`

## Benefits of Polymorphism

1. **Flexibility** - Write code that works with multiple types
2. **Extensibility** - Add new types without changing existing code
3. **Maintainability** - Reduce code duplication
4. **Simplicity** - Common interface for different implementations
5. **Testability** - Easy to mock and test

## Polymorphism vs Inheritance

**Inheritance**: "Is-a" relationship (Dog IS AN Animal)  
**Polymorphism**: Many forms through common interface

\`\`\`python
# Inheritance establishes the relationship
class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Woof!"

# Polymorphism allows treating them uniformly
def animal_sound(animal):
    print(animal.speak())

animal_sound(Dog())  # Works because Dog inherits from Animal
\`\`\`

## When to Use Polymorphism

✅ **Good use cases:**
- Multiple classes need the same interface
- Adding new types without modifying existing code
- Plugin systems and frameworks
- Strategy pattern implementations

✅ **Best practices:**
- Define clear interfaces (method names and parameters)
- Use abstract base classes when strict interface is needed
- Leverage duck typing for flexibility
- Document expected behavior

## Summary

Polymorphism allows:
- Same method name, different implementations
- Code that works with multiple object types
- Flexible, extensible designs
- Clean, maintainable code architecture
        `,
        test: {
          questions: [
            {
              type: "multiple-choice",
              question: "What will be the output of the following code?\n\n```python\nclass Animal:\n    def sound(self):\n        return 'Generic'\n\nclass Dog(Animal):\n    def sound(self):\n        return 'Bark'\n\nclass Cat(Animal):\n    def sound(self):\n        return 'Meow'\n\nanimals = [Dog(), Cat()]\nfor a in animals:\n    print(a.sound())\n```",
              options: [
                "Generic\nGeneric",
                "Bark\nMeow",
                "Dog\nCat",
                "Error"
              ],
              correctAnswer: 1,
              explanation: "This demonstrates polymorphism. Although both Dog and Cat inherit from Animal, each overrides the sound() method with its own implementation. The loop calls sound() on each object, and each returns its specific implementation: 'Bark' for Dog and 'Meow' for Cat."
            },
            {
              type: "drag-and-drop",
              question: "Arrange the code blocks to iterate through a list of objects and call their method:",
              blocks: ["for", "obj", "in", "objects", ":", "obj.method()"],
              correctOrder: ["for", "obj", "in", "objects", ":", "obj.method()"],
              explanation: "Polymorphism allows different objects to respond to the same method call in their own way: for obj in objects: obj.method()"
            }
          ]
        },
        practice: {
          description: `
## Exercise: Create a Notification System

**Task**: 
Create a polymorphic notification system:
1. Create a parent class \`Notification\` with:
   - \`__init__\` method taking \`message\` parameter
   - Abstract method \`send()\` that returns a string
2. Create three child classes:
   - \`EmailNotification\`: send() returns "Email: {message}"
   - \`SMSNotification\`: send() returns "SMS: {message}"
   - \`PushNotification\`: send() returns "Push: {message}"
3. Create a function \`send_notification(notification)\` that prints the result of calling send()
4. Create instances of all three types with message "Hello"
5. Call send_notification() for each

**Expected Output**:
\`\`\`
Email: Hello
SMS: Hello
Push: Hello
\`\`\`

**Hints**:
- All child classes inherit from \`Notification\`
- Each overrides the \`send()\` method
- The function works polymorphically with all types
          `,
          starterCode: `# Define parent class Notification


# Define child classes


# Define send_notification function


# Create instances and test

`,
          solution: `# Define parent class Notification
class Notification:
    def __init__(self, message):
        self.message = message
    
    def send(self):
        pass

# Define child classes
class EmailNotification(Notification):
    def send(self):
        return f"Email: {self.message}"

class SMSNotification(Notification):
    def send(self):
        return f"SMS: {self.message}"

class PushNotification(Notification):
    def send(self):
        return f"Push: {self.message}"

# Define send_notification function
def send_notification(notification):
    print(notification.send())

# Create instances and test
email = EmailNotification("Hello")
sms = SMSNotification("Hello")
push = PushNotification("Hello")

send_notification(email)
send_notification(sms)
send_notification(push)`,
          expectedOutput: "Email: Hello\nSMS: Hello\nPush: Hello"
        }
      }
    }
  ]
};

export default chapter9;
