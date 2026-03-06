# Chapter 10.1: Reading and Writing Text Files - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "10.1 Reading and Writing Text Files"
**配音**:
Welcome to Lesson 10.1: Reading and Writing Text Files. File operations let programs save and load data, making it persistent. Let's learn file handling!

---

## [场景 2: 文件操作介绍] (40 秒)
**画面**: 文件操作概念图示
**配音**:
Files allow programs to store data permanently. Python makes file operations easy with built-in functions. The open function opens files in different modes: r for reading, w for writing (overwrites), a for appending, and x for exclusive creation. Always close files after use, or better yet, use the with statement which closes files automatically. File operations are essential for data persistence, logging, and configuration.

---

## [场景 3: 实际操作 - 写入文件] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
now, Let's write something to a file through code.

(打字: # Writing to a file)
(打字: file = open("sample.txt", "w"))
Open file in write mode. Creates file if it doesn't exist!

(打字: file.write("Hello, World!\n"))
(打字: file.write("This is line 2.\n"))
(打字: file.write("Python is awesome!\n"))
Write adds text to the file!

(打字: file.close())
Always close the file!

(打字: print("File written successfully!"))
(运行)
File created!

(打字: # Better way - using with statement)
(打字: with open("sample2.txt", "w") as file:)
(Tab, 打字:     file.write("Line 1\n"))
(Tab, 打字:     file.write("Line 2\n"))
(Tab, 打字:     file.write("Line 3\n"))
With automatically closes the file!

(打字: print("File 2 written!"))
(运行)
Much better! File closes automatically even if error occurs!

**操作时的代码**:
```python
# Writing to a file
file = open("sample.txt", "w")
file.write("Hello, World!\n")
file.write("This is line 2.\n")
file.write("Python is awesome!\n")
file.close()

print("File written successfully!")

# Better way - using with statement
with open("sample2.txt", "w") as file:
    file.write("Line 1\n")
    file.write("Line 2\n")
    file.write("Line 3\n")

print("File 2 written!")
```

---

## [场景 4: 实际操作 - 读取文件] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
on the other hand, let's see how to read files through code.

(打字: # Read entire file)
(打字: with open("sample.txt", "r") as file:)
(Tab, 打字:     content = file.read())
(Tab, 打字:     print(content))
Read gets all content!

(运行)
All three lines printed!

(打字: # Read line by line)
(打字: with open("sample.txt", "r") as file:)
(Tab, 打字:     for line in file:)
(Tab*2, 打字:         print(line.strip()))
Strip removes the newline characters!

(运行)
Each line printed without extra blank lines!

(打字: # Read specific number of characters)
(打字: with open("sample.txt", "r") as file:)
(Tab, 打字:     first_10 = file.read(10))
(Tab, 打字:     print(f"First 10 chars: {first_10}"))
(运行)
First ten characters only!

(打字: # Read lines into a list)
(打字: with open("sample.txt", "r") as file:)
(Tab, 打字:     lines = file.readlines())
(Tab, 打字:     print(f"Total lines: {len(lines)}"))
(运行)
Three lines! Readlines returns a list!

**操作时的代码**:
```python
# Read entire file
with open("sample.txt", "r") as file:
    content = file.read()
    print(content)

# Read line by line
with open("sample.txt", "r") as file:
    for line in file:
        print(line.strip())

# Read specific number of characters
with open("sample.txt", "r") as file:
    first_10 = file.read(10)
    print(f"First 10 chars: {first_10}")

# Read lines into a list
with open("sample.txt", "r") as file:
    lines = file.readlines()
    print(lines)
    print(lines[0])
```

---

## [场景 5: 实际操作 - 追加模式] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
on the other hand, if you want to add new content but you don't want to cover the old content, you can use Append method that adds to existing files without erasing.

(打字: # Create initial file)
(打字: with open("log.txt", "w") as file:)
(Tab, 打字:     file.write("Log started\n"))
(打字: print("Log created"))
(运行)
Initial log file!

(打字: # Append to file)
(打字: with open("log.txt", "a") as file:)
(Tab, 打字:     file.write("New entry 1\n"))
(Tab, 打字:     file.write("New entry 2\n"))
Append mode! Won't erase existing content!

(打字: print("Entries added"))
(运行)
New entries added!

(打字: # Read to verify)
(打字: with open("log.txt", "r") as file:)
(Tab, 打字:     print(file.read()))
(运行)
All three lines! Original content plus new entries! Write would have erased the original!

**操作时的代码**:
```python
# Create initial file
with open("log.txt", "w") as file:
    file.write("Log started\n")

print("Log created")

# Append to file
with open("log.txt", "a") as file:
    file.write("New entry 1\n")
    file.write("New entry 2\n")

print("Entries added")

# Read to verify
with open("log.txt", "r") as file:
    print(file.read())
```

---

## [场景 6: 实际操作 - 文件存在检查] (60 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Check if files exist before operating.

(打字: import os)
(打字: # Check if file exists)
(打字: if os.path.exists("sample.txt"):)
(Tab, 打字:     print("File exists!"))
(打字: else:)
(Tab, 打字:     print("File not found!"))
(运行)
File exists!

(打字: if os.path.exists("nonexistent.txt"):)
(Tab, 打字:     print("Found"))
(打字: else:)
(Tab, 打字:     print("Not found"))
(运行)
Not found! Always check before reading to avoid errors!

(打字: # Get file size)
(打字: size = os.path.getsize("sample.txt"))
(打字: print(f"File size: {size} bytes"))
(运行)
File size in bytes!

**操作时的代码**:
```python
import os

# Check if file exists
if os.path.exists("sample.txt"):
    print("File exists!")
else:
    print("File not found!")

if os.path.exists("nonexistent.txt"):
    print("Found")
else:
    print("Not found")

# Get file size
size = os.path.getsize("sample.txt")
print(f"File size: {size} bytes")
```

---

## [场景 7: 实际操作 - 读写数字数据] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Files store text, so convert numbers.

(打字: # Write numbers)
(打字: numbers = [10, 20, 30, 40, 50])
(打字: with open("numbers.txt", "w") as file:)
(Tab, 打字:     for num in numbers:)
(Tab*2, 打字:         file.write(str(num) + "\n"))
Convert numbers to strings!

(打字: print("Numbers written"))
(运行)
Saved!

(打字: # Read numbers back)
(打字: with open("numbers.txt", "r") as file:)
(Tab, 打字:     loaded_numbers = [])
(Tab, 打字:     for line in file:)
(Tab*2, 打字:         loaded_numbers.append(int(line.strip())))
Convert strings back to integers!

(打字: print(f"Loaded: {loaded_numbers}"))
(运行)
Numbers loaded and converted!

(打字: print(f"Sum: {sum(loaded_numbers)}"))
(运行)
One fifty! We can do math with loaded numbers!

**操作时的代码**:
```python
# Write numbers
numbers = [10, 20, 30, 40, 50]
with open("numbers.txt", "w") as file:
    for num in numbers:
        file.write(str(num) + "\n")

print("Numbers written")

# Read numbers back
with open("numbers.txt", "r") as file:
    loaded_numbers = []
    for line in file:
        loaded_numbers.append(int(line.strip()))

print(f"Loaded: {loaded_numbers}")
print(f"Sum: {sum(loaded_numbers)}")
```

---

## [场景 8: 实际应用] (60 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Real-world example: simple grade manager.

(打字: # Save student grades)
(打字: def save_grades(filename, students):)
(Tab, 打字:     with open(filename, "w") as file:)
(Tab*2, 打字:         for name, grade in students.items():)
(Tab*3, 打字:             file.write(f"{name},{grade}\n"))
(打字: # Load grades)
(打字: def load_grades(filename):)
(Tab, 打字:     students = {})
(Tab, 打字:     with open(filename, "r") as file:)
(Tab*2, 打字:         for line in file:)
(Tab*3, 打字:             name, grade = line.strip().split(","))
(Tab*3, 打字:             students[name] = int(grade))
(Tab, 打字:     return students)
(打字: grades = {"Alice": 85, "Bob": 92, "Charlie": 78})
(打字: save_grades("grades.txt", grades))
(打字: loaded = load_grades("grades.txt"))
(打字: print(f"Loaded grades: {loaded}"))
(运行)
Persistent data storage!

**操作时的代码**:
```python
# Save student grades
def save_grades(filename, students):
    with open(filename, "w") as file:
        for name, grade in students.items():
            file.write(f"{name},{grade}\n")

# Load grades
def load_grades(filename):
    students = {}
    with open(filename, "r") as file:
        for line in file:
            name, grade = line.strip().split(",")
            students[name] = int(grade)
    return students

grades = {"Alice": 85, "Bob": 92, "Charlie": 78}
save_grades("grades.txt", grades)
loaded = load_grades("grades.txt")
print(f"Loaded grades: {loaded}")
```

---

## [场景 9: 结尾] (10 秒)
**画面**: 总结卡片
**配音**:
Great work! You've learned text file operations. Next, we'll work with CSV and JSON files. See you there!

---

## 制作注意事项：
1. **讲解部分** (场景 1-2, 9): PPT 展示
2. **操作部分** (场景 3-8): 
   - 强调 with 语句的重要性
   - 演示不同文件模式
   - 展示类型转换
3. **AI 配音**: 清晰语速
4. **重点**: with 语句、文件模式、类型转换
