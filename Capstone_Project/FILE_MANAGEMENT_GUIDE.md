# 文件管理功能使用指南

## 功能概述

学习平台现在支持真实的文件操作！学员可以创建、编辑、删除文件，并在 Python 代码中使用这些文件。

## 如何使用

### 1. 创建文件

1. 点击文件管理器右上角的 ➕ 按钮
2. 输入文件名（例如：`data.txt`, `students.csv`, `config.json`）
3. 输入文件内容（可选）
4. 点击"创建"按钮

### 2. 支持的文件类型

- **`.txt`** - 纯文本文件
- **`.csv`** - CSV 数据文件
- **`.json`** - JSON 配置文件
- **`.py`** - Python 代码文件

### 3. 在代码中使用文件

创建文件后，可以在 Python 代码中直接使用：

```python
# 读取文本文件
with open('data.txt', 'r') as f:
    content = f.read()
    print(content)

# 读取 CSV 文件
import csv
with open('students.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)

# 读取 JSON 文件
import json
with open('config.json', 'r') as f:
    data = json.load(f)
    print(data)

# 写入文件
with open('output.txt', 'w') as f:
    f.write('Hello, World!')
```

### 4. 文件作用域

- **课程文件**：在特定课程中创建的文件只在该课程中可用
- **全局文件**：可以创建跨课程共享的文件（未来功能）

## 实际应用场景

### 场景 1：学习文件读写

```python
# 课程：文件操作基础
# 创建文件：message.txt（内容："Hello Python"）

# 学员代码：
with open('message.txt', 'r') as f:
    text = f.read()
    print(text.upper())  # 输出：HELLO PYTHON
```

### 场景 2：CSV 数据处理

```python
# 课程：CSV 文件处理
# 创建文件：scores.csv
# 内容：
# name,math,english
# Alice,95,88
# Bob,87,92

import csv

with open('scores.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        total = int(row['math']) + int(row['english'])
        print(f"{row['name']}: {total}")
```

### 场景 3：JSON 配置

```python
# 课程：JSON 数据处理
# 创建文件：config.json
# 内容：{"app_name": "MyApp", "version": "1.0"}

import json

with open('config.json', 'r') as f:
    config = json.load(f)
    print(f"应用名称：{config['app_name']}")
    print(f"版本：{config['version']}")
```

## 数据库设计

```sql
CREATE TABLE user_files (
    file_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    lesson_id VARCHAR(10),
    file_name VARCHAR(255),
    file_content TEXT,
    file_type VARCHAR(50),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

## API 端点

### 获取文件列表
```
GET /api/files/list/<user_id>?lessonId=<lesson_id>
```

### 创建文件
```
POST /api/files/create
Body: {
  userId: 1,
  lessonId: "1.1",
  fileName: "data.txt",
  fileContent: "Hello",
  fileType: "text"
}
```

### 读取文件
```
GET /api/files/read/<file_id>
```

### 更新文件
```
PUT /api/files/update/<file_id>
Body: { fileContent: "new content" }
```

### 删除文件
```
DELETE /api/files/delete/<file_id>
```

### 执行代码（支持文件操作）
```
POST /api/files/execute-with-files
Body: {
  userId: 1,
  lessonId: "1.1",
  code: "with open('data.txt') as f: print(f.read())"
}
```

## 实现原理

1. **存储**：文件内容存储在 PostgreSQL 数据库中
2. **执行**：运行代码时，在服务器创建临时目录
3. **临时文件**：将数据库中的文件内容写入临时目录
4. **执行代码**：在临时目录中执行 Python 代码
5. **清理**：执行完成后自动删除临时目录

## 安全特性

- ✅ 每个用户的文件相互隔离
- ✅ 代码在临时环境中执行
- ✅ 执行超时保护（5秒）
- ✅ 执行完成后自动清理

## 未来扩展

- [ ] 文件编辑器（直接在界面编辑文件内容）
- [ ] 文件夹组织
- [ ] 文件分享功能
- [ ] 文件版本历史
- [ ] 导入导出文件
- [ ] 文件大小限制
- [ ] 支持图片预览
