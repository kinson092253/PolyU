# 🚀 文件管理功能 - 快速启动指南

## ✅ 已完成的工作

### 1. 数据库
- ✅ 创建了 `user_files` 表
- ✅ 添加了索引优化查询

### 2. 后端 API
- ✅ `/api/files/list/<user_id>` - 获取文件列表
- ✅ `/api/files/create` - 创建文件
- ✅ `/api/files/read/<file_id>` - 读取文件
- ✅ `/api/files/update/<file_id>` - 更新文件
- ✅ `/api/files/delete/<file_id>` - 删除文件
- ✅ `/api/files/execute-with-files` - 执行代码（支持文件操作）

### 3. 前端组件
- ✅ FileManager.js - 文件管理器组件
- ✅ FileDemo.js - 使用示例组件

## 🎯 如何测试

### 方式1：使用示例组件（推荐）

1. **启动后端**
```bash
cd backend
python api.py
```

2. **在 App.js 中临时添加示例组件**

打开 `frontend/src/App.js`，添加：

```javascript
import FileDemo from './components/FileDemo';

// 在 return 之前添加一个按钮切换到 Demo
const [showFileDemo, setShowFileDemo] = useState(false);

// 在 Navbar 中添加按钮
<button onClick={() => setShowFileDemo(true)}>
  📁 File Demo
</button>

// 在 render 中显示
{showFileDemo && (
  <>
    <FileDemo />
    <button onClick={() => setShowFileDemo(false)}>
      返回
    </button>
  </>
)}
```

3. **启动前端**
```bash
cd frontend
npm start
```

4. **测试功能**
   - 点击 "📁 File Demo" 进入演示页面
   - 点击 ➕ 创建文件（例如：data.txt）
   - 在编辑器输入代码并运行

### 方式2：集成到现有课程

将 FileManager 添加到你现有的学习界面：

```javascript
// 在 App.js 或任何组件中
import FileManager from './components/FileManager';

<FileManager
  userId={1}
  lessonId={selectedLesson?.id}
  onFileSelect={(file) => {
    console.log('Selected file:', file);
    // 可以显示文件内容或其他操作
  }}
  onFilesChange={(files) => {
    console.log('Files changed:', files);
    // 文件列表更新时的回调
  }}
/>
```

## 💡 使用示例

### 示例1：读取文本文件

1. **创建文件**
   - 文件名：`message.txt`
   - 内容：`Hello, Python Learning Platform!`

2. **运行代码**
```python
with open('message.txt', 'r') as f:
    content = f.read()
    print(content.upper())
```

### 示例2：CSV 数据处理

1. **创建文件**
   - 文件名：`students.csv`
   - 内容：
```csv
name,age,score
Alice,20,95
Bob,21,87
Charlie,19,92
```

2. **运行代码**
```python
import csv

with open('students.csv', 'r') as f:
    reader = csv.DictReader(f)
    total_score = 0
    count = 0
    
    for row in reader:
        print(f"{row['name']}: {row['score']}分")
        total_score += int(row['score'])
        count += 1
    
    print(f"\\n平均分: {total_score / count:.1f}")
```

### 示例3：JSON 配置

1. **创建文件**
   - 文件名：`config.json`
   - 内容：
```json
{
  "app_name": "Python Learning",
  "version": "1.0",
  "features": ["files", "editor", "dashboard"]
}
```

2. **运行代码**
```python
import json

with open('config.json', 'r') as f:
    config = json.load(f)
    
    print(f"应用: {config['app_name']}")
    print(f"版本: {config['version']}")
    print(f"功能: {', '.join(config['features'])}")
```

### 示例4：文件写入

```python
# 创建新文件
with open('output.txt', 'w') as f:
    f.write('Line 1\\n')
    f.write('Line 2\\n')
    f.write('Line 3\\n')

print("文件已创建！")

# 读取并显示
with open('output.txt', 'r') as f:
    print("\\n文件内容:")
    print(f.read())
```

## 🎨 界面集成建议

### 选项1：侧边栏文件管理器
```
+------------------+------------------+
|   文件管理器      |    代码编辑器     |
|   📁 Files       |    Python       |
|   ➕ data.txt    |    编辑区域      |
|   📊 students.csv|                 |
|   { } config.json|                 |
+------------------+------------------+
```

### 选项2：Tab 切换
```
[ Lecture ] [ Practice ] [ Files ]
```

### 选项3：弹出式文件管理器
```
编辑器右上角添加按钮 [📁 Files]
点击后弹出文件管理对话框
```

## 🔧 后续优化建议

1. **文件编辑器**
   - 点击文件后可以直接编辑内容
   - 支持语法高亮

2. **文件模板**
   - 预设常用文件模板（CSV 模板、JSON 模板等）

3. **文件导入/导出**
   - 从本地上传文件
   - 下载文件到本地

4. **文件分享**
   - 学员之间分享文件
   - 老师分发示例文件

5. **文件夹**
   - 支持文件夹组织
   - 嵌套目录结构

## 🐛 故障排除

### 问题1：文件执行失败
- **检查**：确保后端 API 正在运行
- **检查**：文件名和代码中的文件名是否一致
- **检查**：文件内容格式是否正确（CSV、JSON 格式）

### 问题2：无法创建文件
- **检查**：数据库表是否创建成功
- **检查**：用户 ID 是否正确

### 问题3：执行超时
- **原因**：代码执行时间超过 5 秒
- **解决**：优化代码或增加超时时间

## 📝 注意事项

1. **文件作用域**：当前文件按课程隔离，每个课程的文件相互独立
2. **文件大小**：建议单个文件不超过 1MB
3. **安全性**：代码在隔离环境中执行，5秒超时保护
4. **编码**：统一使用 UTF-8 编码

## 🎓 教学应用场景

### 课程：文件操作基础
- 学员创建文本文件并学习 `open()`, `read()`, `write()`

### 课程：CSV 数据处理
- 学员处理真实的 CSV 数据文件

### 课程：JSON 配置文件
- 学员学习 JSON 解析和配置管理

### 课程：数据分析
- 学员读取数据文件进行统计分析

### 课程：文件批处理
- 学员学习处理多个文件的自动化脚本

---

开始使用吧！有任何问题随时询问。 🚀
