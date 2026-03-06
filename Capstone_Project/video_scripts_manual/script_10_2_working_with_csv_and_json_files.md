# Chapter 10.2: Working with CSV and JSON Files - Video Script
# 总时长：约 5-6 分钟

## [场景 1: 开场] (10 秒)
**画面**: 标题卡 "10.2 Working with CSV and JSON Files"
**配音**:
Welcome to Lesson 10.2: Working with CSV and JSON Files. These formats are essential for data exchange. Let's learn to read and write structured data!

---

## [场景 2: CSV 和 JSON 介绍] (40 秒)
**画面**: CSV 和 JSON 格式对比图示
**配音**:
CSV stands for Comma-Separated Values - a simple format for tabular data like spreadsheets. Each line is a row, values separated by commas. JSON stands for JavaScript Object Notation - a format for nested, structured data. It looks like Python dictionaries. CSV is great for tables and spreadsheets. JSON is perfect for complex data with hierarchy. Both are human-readable and widely used for data exchange between programs.

---

## [场景 3: 实际操作 - 写入 CSV] (90 秒)
**画面**: 代码编辑器录屏
**配音 - 操作讲解**:
OK, Let's write something into CSV files first.

(打字: import csv)
Import the csv module!

(打字: # Write CSV file)
(打字: students = [)
(Tab, 打字:     ["Name", "Age", "Grade"],)
(Tab, 打字:     ["Alice", 20, 85],)
(Tab, 打字:     ["Bob", 22, 92],)
(Tab, 打字:     ["Charlie", 21, 78])
(打字: ])
(打字: with open("students.csv", "w", newline='') as file:)
(Tab, 打字:     writer = csv.writer(file))
Create a CSV writer!

(Tab, 打字:     writer.writerows(students))
Write all rows at once!

(打字: print("CSV written!"))
(运行)
CSV file created!

(打字: # Write with writerow (one at a time))
(打字: with open("students2.csv", "w", newline='') as file:)
(Tab, 打字:     writer = csv.writer(file))
(Tab, 打字:     writer.writerow(["Name", "Age", "Grade"]))
(Tab, 打字:     writer.writerow(["David", 23, 88]))
(Tab, 打字:     writer.writerow(["Eve", 20, 95]))
(打字: print("CSV 2 written!"))
(运行)
One row at a time!

**操作时的代码**:
```python
import csv

# Write CSV file
students = [
    ["Name", "Age", "Grade"],
    ["Alice", 20, 85],
    ["Bob", 22, 92],
    ["Charlie", 21, 78]
]

with open("students.csv", "w", newline='') as file:
    writer = csv.writer(file)
    writer.writerows(students)

print("CSV written!")

# Write with writerow (one at a time)
with open("students2.csv", "w", newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["Name", "Age", "Grade"])
    writer.writerow(["David", 23, 88])
    writer.writerow(["Eve", 20, 95])

print("CSV 2 written!")
```

---

## [场景 4: 实际操作 - 读取 CSV] (90 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
next, Read CSV files. also similar to read file.

(打字: import csv)
(打字: # Read CSV file)
(打字: with open("students.csv", "r") as file:)
(Tab, 打字:     reader = csv.reader(file))
Create a CSV reader!

(Tab, 打字:     for row in reader:)
(Tab*2, 打字:         print(row))
(运行)
Each row is a list!

(打字: # Skip header and process data)
(打字: with open("students.csv", "r") as file:)
(Tab, 打字:     reader = csv.reader(file))
(Tab, 打字:     next(reader)  # Skip header)
(Tab, 打字:     total_grade = 0)
(Tab, 打字:     count = 0)
(Tab, 打字:     for row in reader:)
(Tab*2, 打字:         name, age, grade = row)
(Tab*2, 打字:         total_grade += int(grade))
(Tab*2, 打字:         count += 1)
(Tab, 打字:     print(f"Average grade: {total_grade / count}")
(运行)
Average calculated! Eighty-five!

**操作时的代码**:
```python
import csv

# Read CSV file
with open("students.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)

# Skip header and process data
with open("students.csv", "r") as file:
    reader = csv.reader(file)
    next(reader)  # Skip header
    total_grade = 0
    count = 0
    for row in reader:
        name, age, grade = row
        total_grade += int(grade)
        count += 1
    print(f"Average grade: {total_grade / count}")
```

---

## [场景 5: 实际操作 - CSV DictReader 和 DictWriter] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Work with CSV as dictionaries.

(打字: import csv)
(打字: # Write using DictWriter)
(打字: students = [)
(Tab, 打字:     {"name": "Alice", "age": 20, "grade": 85},)
(Tab, 打字:     {"name": "Bob", "age": 22, "grade": 92})
(打字: ])
(打字: with open("students_dict.csv", "w", newline='') as file:)
(Tab, 打字:     fieldnames = ["name", "age", "grade"])
(Tab, 打字:     writer = csv.DictWriter(file, fieldnames=fieldnames))
(Tab, 打字:     writer.writeheader())
Write header automatically!

(Tab, 打字:     writer.writerows(students))
(打字: print("Dict CSV written!"))
(运行)
Written as dictionaries!

(打字: # Read using DictReader)
(打字: with open("students_dict.csv", "r") as file:)
(Tab, 打字:     reader = csv.DictReader(file))
(Tab, 打字:     for row in reader:)
(Tab*2, 打字:         print(f"{row['name']}: {row['grade']}")
(运行)
Each row is a dictionary! Much easier to work with!

**操作时的代码**:
```python
import csv

# Write using DictWriter
students = [
    {"name": "Alice", "age": 20, "grade": 85},
    {"name": "Bob", "age": 22, "grade": 92}
]

with open("students_dict.csv", "w", newline='') as file:
    fieldnames = ["name", "age", "grade"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(students)

print("Dict CSV written!")

# Read using DictReader
with open("students_dict.csv", "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"{row['name']}: {row['grade']}")
```

---

## [场景 6: 实际操作 - 写入 JSON] (80 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Now let's work with Json.

(打字: import json)
(打字: # Python data structure)
(打字: student = {)
(Tab, 打字:     "name": "Alice",)
(Tab, 打字:     "age": 20,)
(Tab, 打字:     "grades": [85, 90, 95],)
(Tab, 打字:     "active": True)
(打字: })
(打字: # Write to JSON file)
(打字: with open("student.json", "w") as file:)
(Tab, 打字:     json.dump(student, file))
Dump writes to file!

(打字: print("JSON written!"))
(运行)
JSON file created!

(打字: # Pretty print JSON)
(打字: with open("student_pretty.json", "w") as file:)
(Tab, 打字:     json.dump(student, file, indent=2))
Indent makes it readable!

(打字: print("Pretty JSON written!"))
(打字: # Read file content to show)
(打字: with open("student_pretty.json", "r") as file:)
(Tab, 打字:     print(file.read()))
(运行)
Beautiful formatted JSON!

**操作时的代码**:
```python
import json

# Python data structure
student = {
    "name": "Alice",
    "age": 20,
    "grades": [85, 90, 95],
    "active": True
}

# Write to JSON file
with open("student.json", "w") as file:
    json.dump(student, file)

print("JSON written!")

# Pretty print JSON
with open("student_pretty.json", "w") as file:
    json.dump(student, file, indent=2)

print("Pretty JSON written!")

# Read file content to show
with open("student_pretty.json", "r") as file:
    print(file.read())
```

---

## [场景 7: 实际操作 - 读取 JSON] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
next, let's see how to Read JSON files.

(打字: import json)
(打字: # Read JSON file)
(打字: with open("student.json", "r") as file:)
(Tab, 打字:     loaded_student = json.load(file))
Load reads from file!

(打字: print(loaded_student))
(打字: print(type(loaded_student)))
(运行)
Loaded as Python dictionary!

(打字: # Access data)
(打字: print(f"Name: {loaded_student['name']}")
(打字: print(f"Average grade: {sum(loaded_student['grades']) / len(loaded_student['grades'])}")
(运行)
Ninety! We can work with it like any dictionary!

(打字: # JSON string to Python)
(打字: json_string = '{"name": "Bob", "age": 25}')
(打字: data = json.loads(json_string))
Loads parses JSON strings!

(打字: print(data))
(运行)
String converted to dictionary!

**操作时的代码**:
```python
import json

# Read JSON file
with open("student.json", "r") as file:
    loaded_student = json.load(file)

print(loaded_student)
print(type(loaded_student))

# Access data
print(f"Name: {loaded_student['name']}")
print(f"Average grade: {sum(loaded_student['grades']) / len(loaded_student['grades'])}")

# JSON string to Python
json_string = '{"name": "Bob", "age": 25}'
data = json.loads(json_string)
print(data)
```

---

## [场景 8: 实际操作 - 复杂 JSON] (70 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
JSON handles complex nested structures.

(打字: import json)
(打字: # Complex data structure)
(打字: classroom = {)
(Tab, 打字:     "class_name": "Python 101",)
(Tab, 打字:     "teacher": "Mr. Smith",)
(Tab, 打字:     "students": [)
(Tab*2, 打字:         {"name": "Alice", "grades": [85, 90, 95]},)
(Tab*2, 打字:         {"name": "Bob", "grades": [88, 92, 87]})
(Tab, 打字:     ])
(打字: })
(打字: # Save complex structure)
(打字: with open("classroom.json", "w") as file:)
(Tab, 打字:     json.dump(classroom, file, indent=2))
(打字: # Load and process)
(打字: with open("classroom.json", "r") as file:)
(Tab, 打字:     data = json.load(file))
(打字: print(f"Class: {data['class_name']}")
(打字: for student in data['students']:)
(Tab, 打字:     avg = sum(student['grades']) / len(student['grades']))
(Tab, 打字:     print(f"{student['name']}: {avg:.1f}")
(运行)
Nested data handled perfectly!

**操作时的代码**:
```python
import json

# Complex data structure
classroom = {
    "class_name": "Python 101",
    "teacher": "Mr. Smith",
    "students": [
        {"name": "Alice", "grades": [85, 90, 95]},
        {"name": "Bob", "grades": [88, 92, 87]}
    ]
}

# Save complex structure
with open("classroom.json", "w") as file:
    json.dump(classroom, file, indent=2)

# Load and process
with open("classroom.json", "r") as file:
    data = json.load(file)

print(f"Class: {data['class_name']}")
for student in data['students']:
    avg = sum(student['grades']) / len(student['grades'])
    print(f"{student['name']}: {avg:.1f}")
```

---

## [场景 9: 实际应用] (50 秒)
**画面**: 录屏操作
**配音 - 操作讲解**:
Real-world: configuration manager.

(打字: import json)
(打字: # Save application config)
(打字: config = {)
(Tab, 打字:     "app_name": "MyApp",)
(Tab, 打字:     "version": "1.0",)
(Tab, 打字:     "settings": {)
(Tab*2, 打字:         "theme": "dark",)
(Tab*2, 打字:         "language": "en",)
(Tab*2, 打字:         "notifications": True)
(Tab, 打字:     })
(打字: })
(打字: with open("config.json", "w") as file:)
(Tab, 打字:     json.dump(config, file, indent=2))
(打字: # Load config on startup)
(打字: with open("config.json", "r") as file:)
(Tab, 打字:     app_config = json.load(file))
(打字: print(f"Starting {app_config['app_name']} v{app_config['version']}")
(运行)
Perfect for app configuration!

**操作时的代码**:
```python
import json

# Save application config
config = {
    "app_name": "MyApp",
    "version": "1.0",
    "settings": {
        "theme": "dark",
        "language": "en",
        "notifications": True
    }
}

with open("config.json", "w") as file:
    json.dump(config, file, indent=2)

# Load config on startup
with open("config.json", "r") as file:
    app_config = json.load(file)

print(f"Starting {app_config['app_name']} v{app_config['version']}")
```

---

## [场景 10: 结尾] (10 秒)
**画面**: 总结卡片
**配音**:
Excellent! You've mastered CSV and JSON files. Next, we'll learn exception handling to make code robust. See you there!

---

## 制作注意事项：
1. **讲解部分** (场景 1-2, 10): PPT 展示
2. **操作部分** (场景 3-9): 
   - 对比 CSV 和 JSON 用途
   - 演示 DictReader/DictWriter
   - 展示复杂嵌套结构
3. **AI 配音**: 清晰语速
4. **重点**: dump vs dumps, load vs loads, indent 参数
