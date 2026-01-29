# 项目压缩指南

## ❌ 不要压缩这些文件夹

压缩项目前，**务必删除或排除**以下文件夹：

### 前端（Frontend）
- `frontend/node_modules/` - **300+ MB**
- `frontend/build/` - 构建输出
- `frontend/.vscode/` - IDE 配置

### 后端（Backend）
- `backend/__pycache__/` - Python 缓存
- `backend/venv/` 或 `backend/env/` - 虚拟环境
- `backend/.vscode/` - IDE 配置

### 其他
- `.git/` - Git 历史记录（如果有）
- `*.log` - 日志文件
- `.DS_Store` - Mac 系统文件
- `Thumbs.db` - Windows 系统文件

---

## ✅ 如何正确压缩项目

### 方法 1：使用命令行排除（推荐）

#### Windows (PowerShell)
\`\`\`powershell
# 使用 7-Zip 压缩并排除 node_modules
7z a -tzip Capstone_Project.zip Capstone_Project -xr!node_modules -xr!__pycache__ -xr!.git
\`\`\`

#### Mac/Linux
\`\`\`bash
# 使用 tar 压缩并排除
tar -czf Capstone_Project.tar.gz Capstone_Project \
  --exclude='node_modules' \
  --exclude='__pycache__' \
  --exclude='.git' \
  --exclude='build' \
  --exclude='*.log'
\`\`\`

### 方法 2：临时删除 node_modules

\`\`\`powershell
# 1. 删除 node_modules（可以重新安装）
cd frontend
Remove-Item -Recurse -Force node_modules

# 2. 压缩项目
cd ..
Compress-Archive -Path Capstone_Project -DestinationPath Capstone_Project.zip

# 3. 需要时重新安装
cd frontend
npm install
\`\`\`

### 方法 3：使用 .zipignore 文件

创建一个排除列表文件 \`exclude.txt\`：
\`\`\`
frontend/node_modules/*
backend/__pycache__/*
.git/*
*.log
.DS_Store
\`\`\`

然后压缩：
\`\`\`powershell
7z a -tzip Capstone_Project.zip Capstone_Project -x@exclude.txt
\`\`\`

---

## 📦 压缩后的文件大小

| 包含内容 | 预计大小 |
|---------|---------|
| 包含 node_modules | **~350 MB** ⚠️ |
| 不包含 node_modules | **~5-10 MB** ✅ |

---

## 🔄 收到压缩包后如何使用

### 1. 解压项目
\`\`\`powershell
Expand-Archive -Path Capstone_Project.zip -DestinationPath .
\`\`\`

### 2. 安装前端依赖
\`\`\`powershell
cd Capstone_Project/frontend
npm install  # 会根据 package.json 自动下载所有依赖
\`\`\`

### 3. 安装后端依赖（如需要）
\`\`\`powershell
cd ../backend
pip install -r requirements.txt
\`\`\`

### 4. 启动项目
\`\`\`powershell
# 使用 Docker（推荐）
docker-compose up --build

# 或分别启动
# Terminal 1: 启动后端
cd backend
python app.py

# Terminal 2: 启动前端
cd frontend
npm start
\`\`\`

---

## 💡 为什么可以删除 node_modules？

\`node_modules\` 文件夹包含的是 **可重新下载** 的依赖包：

1. **package.json** 文件记录了所有依赖的名称和版本
2. 运行 \`npm install\` 会根据 package.json 自动下载
3. 每个人的环境可能略有不同，重新安装更可靠
4. 大幅减小项目体积（从 350MB 降到 5MB）

---

## ⚡ 快速命令速查

\`\`\`powershell
# 删除 node_modules
Remove-Item -Recurse -Force frontend/node_modules

# 检查文件夹大小
Get-ChildItem frontend/node_modules -Recurse | Measure-Object -Property Length -Sum

# 重新安装依赖
cd frontend
npm install

# 清理 npm 缓存（如果需要）
npm cache clean --force
\`\`\`

---

## 📝 备注

- ✅ **package.json** 和 **package-lock.json** 必须保留
- ✅ **requirements.txt** 必须保留（Python 依赖）
- ✅ 所有源代码文件必须保留
- ✅ Docker 配置文件必须保留
- ❌ **node_modules** 不要包含在压缩包中
- ❌ **__pycache__** 不要包含
- ❌ **.git** 不要包含（除非需要版本历史）
