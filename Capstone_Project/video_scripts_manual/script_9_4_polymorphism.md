# Chapter 9.4: Polymorphism - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "9.4 Polymorphism"
**配音**:
Welcome to Lesson 9.4: Polymorphism. Polymorphism means "many forms" - it allows different objects to respond to the same method in their own way. Let's see how this makes code flexible and powerful!

---

## [场景 2: 多态介绍] (40 秒)
**画面**: 多态概念图示 + 多种形态示意
**配音**:
Polymorphism enables objects of different classes to be treated through a common interface. Think of a universal remote control - the same "play" button works differently for your TV, DVD player, and music system, but you use the same button. In programming, this means we can write code that works with multiple object types without knowing their specific class. The key is that different classes implement the same method name with their own specific behavior.

---

## [场景 3: 实际操作 - 基本多态] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
Let's create polymorphic classes!

(打字: # Different classes, same method name)
(打字: class Dog:)
(Tab, 打字:     def __init__(self, name):)
(Tab*2, 打字:         self.name = name)
(Tab, 打字:     def speak(self):)
(Tab*2, 打字:         return f"{self.name}: Woof!")
Dog class with speak method!

(打字: class Cat:)
(Tab, 打字:     def __init__(self, name):)
(Tab*2, 打字:         self.name = name)
(Tab, 打字:     def speak(self):)
(Tab*2, 打字:         return f"{self.name}: Meow!")
Cat with the same method name!

(打字: class Bird:)
(Tab, 打字:     def __init__(self, name):)
(Tab*2, 打字:         self.name = name)
(Tab, 打字:     def speak(self):)
(Tab*2, 打字:         return f"{self.name}: Tweet!")
Bird also has speak!

(打字: # Polymorphic behavior)
(打字: animals = [Dog("Buddy"), Cat("Whiskers"), Bird("Tweety")])
(打字: for animal in animals:)
(Tab, 打字:     print(animal.speak()))
(运行)
Same method call, different results! That's polymorphism!

**操作时的代码**:
```python
# Different classes, same method name
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

# Polymorphic behavior
animals = [Dog("Buddy"), Cat("Whiskers"), Bird("Tweety")]
for animal in animals:
    print(animal.speak())
```

---

## [场景 4: 实际操作 - 多态函数] (80 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
Now let's write polymorphic functions!

(打字: # Polymorphic function)
(打字: def make_sound(animal):)
(Tab, 打字:     print(animal.speak()))
One function for all animal types!

(打字: dog = Dog("Max"))
(打字: cat = Cat("Luna"))
(打字: bird = Bird("Chirpy"))
(打字: make_sound(dog))
(打字: make_sound(cat))
(打字: make_sound(bird))
(运行)
The same function works with different object types! As long as they have a speak method, it works!

(清空屏幕)
(打字: # Duck typing - if it has the method, it works!)
(打字: class Robot:)
(Tab, 打字:     def speak(self):)
(Tab*2, 打字:         return "Beep boop!")
Robot isn't an animal!

(打字: robot = Robot())
(打字: make_sound(robot))
(运行)
But it still works! This is called duck typing - if it walks like a duck and quacks like a duck, treat it like a duck!

**操作时的代码**:
```python
# Polymorphic function
def make_sound(animal):
    print(animal.speak())

dog = Dog("Max")
cat = Cat("Luna")
bird = Bird("Chirpy")
make_sound(dog)
make_sound(cat)
make_sound(bird)

# Duck typing - if it has the method, it works!
class Robot:
    def speak(self):
        return "Beep boop!"

robot = Robot()
make_sound(robot)  # Works even though Robot isn't related!
```

---

## [场景 5: 实际案例 - 支付系统] (120 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
Let's build a real-world payment system!

(打字: # Parent class)
(打字: class Payment:)
(Tab, 打字:     def __init__(self, amount):)
(Tab*2, 打字:         self.amount = amount)
(Tab, 打字:     def process(self):)
(Tab*2, 打字:         pass)
Base payment class!

(打字: class CreditCardPayment(Payment):)
(Tab, 打字:     def __init__(self, amount, card_number):)
(Tab*2, 打字:         super().__init__(amount))
(Tab*2, 打字:         self.card_number = card_number)
(Tab, 打字:     def process(self):)
(Tab*2, 打字:         last_four = self.card_number[-4:])
(Tab*2, 打字:         return f"Credit card \${self.amount} - card {last_four}")
Credit card payment!

(打字: class PayPalPayment(Payment):)
(Tab, 打字:     def __init__(self, amount, email):)
(Tab*2, 打字:         super().__init__(amount))
(Tab*2, 打字:         self.email = email)
(Tab, 打字:     def process(self):)
(Tab*2, 打字:         return f"PayPal \${self.amount} to {self.email}")
PayPal payment!

(打字: class BankTransferPayment(Payment):)
(Tab, 打字:     def __init__(self, amount, account):)
(Tab*2, 打字:         super().__init__(amount))
(Tab*2, 打字:         self.account = account)
(Tab, 打字:     def process(self):)
(Tab*2, 打字:         return f"Bank transfer \${self.amount} to {self.account}")
Bank transfer!

(打字: # Polymorphic processing)
(打字: def process_payment(payment):)
(Tab, 打字:     print(payment.process()))
One function handles all payment types!

(打字: payments = [)
(Tab, 打字:     CreditCardPayment(100, "1234-5678-9012-3456"),)
(Tab, 打字:     PayPalPayment(50, "user@example.com"),)
(Tab, 打字:     BankTransferPayment(200, "9876543210"))
(打字: ])
(打字: for payment in payments:)
(Tab, 打字:     process_payment(payment))
(运行)
Different payment methods, same interface! This is the power of polymorphism!

**操作时的代码**:
```python
# Parent class
class Payment:
    def __init__(self, amount):
        self.amount = amount
    
    def process(self):
        pass

class CreditCardPayment(Payment):
    def __init__(self, amount, card_number):
        super().__init__(amount)
        self.card_number = card_number
    
    def process(self):
        last_four = self.card_number[-4:]
        return f"Credit card ${self.amount} - card {last_four}"

class PayPalPayment(Payment):
    def __init__(self, amount, email):
        super().__init__(amount)
        self.email = email
    
    def process(self):
        return f"PayPal ${self.amount} to {self.email}"

class BankTransferPayment(Payment):
    def __init__(self, amount, account):
        super().__init__(amount)
        self.account = account
    
    def process(self):
        return f"Bank transfer ${self.amount} to {self.account}"

# Polymorphic processing
def process_payment(payment):
    print(payment.process())

payments = [
    CreditCardPayment(100, "1234-5678-9012-3456"),
    PayPalPayment(50, "user@example.com"),
    BankTransferPayment(200, "9876543210")
]
for payment in payments:
    process_payment(payment)
```

---

## [场景 6: 实际案例 - 文件处理器] (80 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
Another example - file handlers!

(打字: class FileHandler:)
(Tab, 打字:     def __init__(self, filename):)
(Tab*2, 打字:         self.filename = filename)
(Tab, 打字:     def process(self):)
(Tab*2, 打字:         pass)
Base handler!

(打字: class TextFileHandler(FileHandler):)
(Tab, 打字:     def process(self):)
(Tab*2, 打字:         return f"Processing text: {self.filename}")

(打字: class ImageFileHandler(FileHandler):)
(Tab, 打字:     def process(self):)
(Tab*2, 打字:         return f"Processing image: {self.filename}")

(打字: class VideoFileHandler(FileHandler):)
(Tab, 打字:     def process(self):)
(Tab*2, 打字:         return f"Processing video: {self.filename}")
Different file types!

(打字: files = [)
(Tab, 打字:     TextFileHandler("doc.txt"),)
(Tab, 打字:     ImageFileHandler("photo.jpg"),)
(Tab, 打字:     VideoFileHandler("movie.mp4"))
(打字: ])
(打字: for file in files:)
(Tab, 打字:     print(file.process()))
(运行)
Same interface, different implementations!

**操作时的代码**:
```python
class FileHandler:
    def __init__(self, filename):
        self.filename = filename
    
    def process(self):
        pass

class TextFileHandler(FileHandler):
    def process(self):
        return f"Processing text: {self.filename}"

class ImageFileHandler(FileHandler):
    def process(self):
        return f"Processing image: {self.filename}"

class VideoFileHandler(FileHandler):
    def process(self):
        return f"Processing video: {self.filename}"

files = [
    TextFileHandler("doc.txt"),
    ImageFileHandler("photo.jpg"),
    VideoFileHandler("movie.mp4")
]
for file in files:
    print(file.process())
```

---

## [场景 7: 多态的好处] (30 秒)
**画面**: 图示展示多态优势
**配音**:
Why use polymorphism? First, flexibility - write code that works with multiple types. Second, extensibility - add new types without changing existing code. Third, maintainability - common interface reduces code duplication. Fourth, simplicity - treat different objects uniformly. Polymorphism is essential for building scalable, maintainable applications!

---

## [场景 8: 继承 vs 多态对比] (40 秒)
**画面**: 对比图示
**配音**:
Let's clarify the difference. Inheritance establishes relationships - it's about "is-a" connections, like Dog is an Animal. Polymorphism is about behavior - it's about treating different objects through a common interface. Inheritance is the tool, polymorphism is the result. They work together - inheritance sets up the hierarchy, polymorphism lets you use it flexibly!

---

## [场景 9: 实际练习提示] (30 秒)
**画面**: 练习题展示
**配音**:
Time to practice! Create a notification system with Email, SMS, and Push notification classes. Each should have a send method that returns a specific format. Then write a function that can send any type of notification polymorphically. Remember - same method name, different implementations!

---

## [场景 10: 总结与下一步] (20 秒)
**画面**: 回顾要点 + Chapter 10 预告
**配音**:
Great work! You've learned polymorphism - how to write flexible code that works with multiple object types. You understand duck typing, polymorphic functions, and real-world applications. In Chapter 10, we'll explore modules and packages to organize larger projects. See you there!

---

## 拍摄提示

### 代码演示节奏
- **打字速度**: 保持中等速度，让观众能跟上
- **停顿时机**: 
  - 完成一个完整的类定义后停顿 1-2 秒
  - 运行代码后停顿 2-3 秒让观众看清输出
  - 解释关键概念时适当放慢
- **高亮提示**: 
  - 使用注释标记关键点
  - 运行结果用方框或高亮突出

### 配音注意事项
- **语速**: 稍慢于正常对话，特别是术语部分
- **强调**: polymorphism, duck typing, interface 等关键词略加重音
- **停顿**: 每个场景之间留 0.5 秒空白
- **语气**: 保持友好、鼓励的教学风格

### 屏幕录制设置
- **分辨率**: 1920×1080 最小
- **代码字体**: 18-20pt，确保清晰
- **编辑器主题**: 深色背景（保护眼睛）
- **终端输出**: 保留完整输出，必要时用高亮框标注

### 后期编辑建议
- 场景 5（支付系统）内容较长，可考虑分成两个小段
- 添加图示说明 "polymorphism = many forms" 概念
- 输出结果可用动画效果强调不同之处
- 在 duck typing 部分添加鸭子图标作为视觉隐喻

### 时间轴参考
- 0:00-0:10 开场
- 0:10-0:50 概念介绍
- 0:50-2:20 基本多态示例
- 2:20-3:40 多态函数与 duck typing
- 3:40-5:40 实际案例（支付系统）
- 5:40-7:00 文件处理器示例
- 7:00-7:30 多态的好处
- 7:30-8:10 继承 vs 多态
- 8:10-8:40 练习提示
- 8:40-9:00 总结

### 预估总时长
**约 8-9 分钟** (可以通过适当加快某些演示部分控制在 6-7 分钟内)

---

## 额外资源建议
- 准备一个 universal remote 的图片/图标作为开场视觉比喻
- 创建简单动画展示 "same interface, different behavior"
- 在支付系统示例中可以添加信用卡、PayPal、银行图标
- Duck typing 部分可以添加真实鸭子的图片配合讲解
