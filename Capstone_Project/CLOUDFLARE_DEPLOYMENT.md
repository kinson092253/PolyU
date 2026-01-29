# Cloudflare 部署指南

## 🎯 部署策略

由于这是一个全栈应用（React + Flask + PostgreSQL），我们需要分开部署：

- **前端**：Cloudflare Pages（静态托管）
- **后端**：Railway/Render/Heroku（支持 Python 和数据库）

---

## 📦 步骤 1：部署前端到 Cloudflare Pages

### 方法 A：通过 Git（推荐）

1. **将项目推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```

2. **连接到 Cloudflare Pages**
   - 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 进入 **Pages** → 点击 **Create a project**
   - 选择 **Connect to Git**
   - 授权并选择你的 GitHub 仓库

3. **配置构建设置**
   ```
   Build command: npm run build
   Build output directory: build
   Root directory: frontend
   Environment variables:
     - REACT_APP_API_URL = https://your-backend-url.railway.app/api
   ```

4. **部署**
   - 点击 **Save and Deploy**
   - 等待构建完成（约 2-3 分钟）
   - 获得 URL：`https://your-project.pages.dev`

### 方法 B：通过 Wrangler CLI（直接上传）

1. **安装 Wrangler**
   ```powershell
   npm install -g wrangler
   ```

2. **登录 Cloudflare**
   ```powershell
   wrangler login
   ```

3. **构建前端**
   ```powershell
   cd frontend
   npm run build
   ```

4. **部署到 Pages**
   ```powershell
   wrangler pages deploy build --project-name=python-learning-platform
   ```

---

## 🔧 步骤 2：部署后端（选择一个平台）

### 🌟 选项 A：Replit（最推荐！完全免费）

**为什么选择 Replit？**
- ✅ **100% 免费**（无需信用卡）
- ✅ 支持 Python + PostgreSQL
- ✅ 在线编辑器，随时随地编码
- ✅ 自动部署和公网 URL
- ✅ 简单易用，一键运行
- ✅ 支持私有仓库导入

#### **部署步骤：**

##### **第 1 步：注册 Replit 账号**

1. **访问 [Replit.com](https://replit.com)**
2. **注册账号**
   - 可以用 GitHub/Google/邮箱注册
   - 完全免费，无需验证

##### **第 2 步：导入 GitHub 仓库**

1. **在 Replit 首页点击 "+ Create Repl"**
2. **选择 "Import from GitHub"**
3. **输入仓库 URL**：
   ```
   https://github.com/kinson092253/PolyU
   ```
4. **授权 Replit 访问**（如果是私有仓库）
5. **等待导入完成**（约 30 秒）

##### **第 3 步：配置项目**

导入后 Replit 会自动识别项目，但需要手动配置：

1. **设置工作目录**
   - 点击左侧的 "Shell" 或 Console
   - 运行：
   ```bash
   cd Capstone_Project/backend
   ```

2. **创建 `.replit` 配置文件**
   - 在项目根目录创建文件：`.replit`
   - 内容：
   ```toml
   run = "cd Capstone_Project/backend && python api.py"
   
   [nix]
   channel = "stable-22_11"
   
   [deployment]
   run = ["sh", "-c", "cd Capstone_Project/backend && python api.py"]
   ```

3. **安装依赖**
   在 Shell 中运行：
   ```bash
   cd Capstone_Project/backend
   pip install -r requirements.txt
   ```

##### **第 4 步：配置 PostgreSQL 数据库**

1. **添加 PostgreSQL**
   - 点击左侧 **"Tools"** → **"Database"**
   - 选择 **"PostgreSQL"**
   - Replit 会自动创建数据库

2. **获取连接信息**
   - 在 Database 面板中查看连接字符串
   - 格式：`postgresql://username:password@host:port/database`

3. **初始化数据库**
   在 Shell 中运行：
   ```bash
   cd Capstone_Project/backend
   psql $DATABASE_URL -f database/schema_fixed.sql
   ```

##### **第 5 步：配置环境变量**

1. **点击左侧的 "Secrets" (🔒)**
2. **添加以下环境变量**：
   ```
   DB_HOST=<从 DATABASE_URL 提取>
   DB_PORT=5432
   DB_NAME=<从 DATABASE_URL 提取>
   DB_USER=<从 DATABASE_URL 提取>
   DB_PASSWORD=<从 DATABASE_URL 提取>
   JWT_SECRET_KEY=your-secret-key-here
   OPENROUTER_API_KEY=<你的 API 密钥>
   OPENROUTER_MODEL=deepseek/deepseek-chat
   PORT=5000
   ```

   **或者直接使用 DATABASE_URL**：
   ```
   DATABASE_URL=<完整的连接字符串>
   ```

3. **修改 `database/db.py` 使用 DATABASE_URL**：
   ```python
   import os
   import psycopg2
   from psycopg2.extras import RealDictCursor
   
   def get_db_connection():
       return psycopg2.connect(
           os.environ.get('DATABASE_URL'),
           cursor_factory=RealDictCursor
       )
   ```

##### **第 6 步：运行和部署**

1. **点击顶部绿色的 "Run" 按钮**
   - Replit 会自动安装依赖并启动应用
   - 等待启动完成（约 30 秒）

2. **获取公网 URL**
   - 应用运行后，右侧会显示一个 Web 视图
   - 点击顶部的 "Open in new tab" 图标
   - URL 格式：`https://your-repl-name.yourusername.repl.co`

3. **测试 API**
   ```bash
   curl https://your-repl-name.yourusername.repl.co/api/health
   ```

4. **启用 Always On（可选）**
   - 免费账号的 Repl 会在不活动后休眠
   - 升级到 Hacker 计划（$7/月）可以保持 24/7 运行
   - 或使用 UptimeRobot 等服务定期 ping 你的应用

##### **第 7 步：更新前端配置**

1. **复制 Replit 提供的 URL**
2. **在 Cloudflare Pages 设置中更新环境变量**：
   ```
   REACT_APP_API_URL=https://your-repl-name.yourusername.repl.co/api
   ```
3. **推送更改触发重新部署**

---

### 选项 B：PythonAnywhere（免费但数据库功能需付费）

### 为什么选择 PythonAnywhere？
- ✅ **完全免费**（无需信用卡）
- ✅ 专为 Python 设计
- ✅ 内置 MySQL 数据库
- ✅ 简单易用，只需邮箱注册
- ✅ 香港访问稳定
- ✅ 提供 Bash Console 直接管理

### 部署步骤：

#### **第 1 步：注册 PythonAnywhere 账号**

1. **访问 [PythonAnywhere.com](https://www.pythonanywhere.com)**
   - 点击 **"Start running Python online in less than a minute!"**
   
2. **创建免费账号**
   - 点击 **"Create a Beginner account"**
   - 输入用户名、邮箱、密码
   - **无需信用卡，完全免费**
   - 验证邮箱后登录

#### **第 2 步：上传代码**

登录后有两种方式上传代码：

**方法 A：使用 Git Clone（推荐）**

1. 打开 **"Consoles"** → **"Bash"**
2. 在终端中运行：
   ```bash
   git clone https://github.com/kinson092253/PolyU.git
   cd PolyU/Capstone_Project/backend
   ```

**方法 B：手动上传文件**

1. 点击 **"Files"**
2. 创建目录结构：`/home/yourusername/backend`
3. 上传所有后端文件

#### **第 3 步：创建虚拟环境并安装依赖**

在 Bash Console 中运行：

```bash
# 进入项目目录
cd ~/PolyU/Capstone_Project/backend

# 创建虚拟环境
mkvirtualenv --python=/usr/bin/python3.10 myenv

# 激活虚拟环境
workon myenv

# 安装依赖
pip install -r requirements.txt
```

#### **第 4 步：创建 MySQL 数据库**

1. **在 PythonAnywhere Dashboard**
   - 点击 **"Databases"** 标签

2. **创建数据库**
   - 在 "Create a new database" 输入：`pythonlearning`
   - 点击 **"Create"**
   - 记下数据库连接信息：
     ```
     Host: yourusername.mysql.pythonanywhere-services.com
     Database: yourusername$pythonlearning
     Username: yourusername
     Password: (你设置的密码)
     ```

3. **初始化数据库**
   - 在 Bash Console 运行：
     ```bash
     cd ~/PolyU/Capstone_Project/backend
     mysql -h yourusername.mysql.pythonanywhere-services.com -u yourusername -p
     # 输入密码后：
     USE yourusername$pythonlearning;
     SOURCE database/schema_fixed.sql;
     exit;
     ```

#### **第 5 步：修改数据库配置**

需要将 PostgreSQL 改为 MySQL：

1. **修改 `requirements.txt`**
   ```bash
   cd ~/PolyU/Capstone_Project/backend
   nano requirements.txt
   ```
   
   将 `psycopg2-binary` 替换为：
   ```
   PyMySQL==1.1.0
   cryptography==41.0.7
   ```

2. **修改 `database/db.py`**（如果存在）
   或在 `api.py` 中修改数据库连接：
   
   ```python
   import pymysql
   
   def get_db_connection():
       return pymysql.connect(
           host='yourusername.mysql.pythonanywhere-services.com',
           user='yourusername',
           password='your-password',
           database='yourusername$pythonlearning',
           cursorclass=pymysql.cursors.DictCursor
       )
   ```

3. **推送更改**（如果在本地修改）
   ```bash
   git add .
   git commit -m "Switch to MySQL for PythonAnywhere"
   git push
   ```
   
   然后在 PythonAnywhere 拉取：
   ```bash
   cd ~/PolyU
   git pull
   ```

#### **第 6 步：配置 Web App**

1. **点击 "Web" 标签**
   - 点击 **"Add a new web app"**

2. **配置向导**
   - 选择免费域名：`yourusername.pythonanywhere.com`
   - 框架选择：**"Flask"**
   - Python 版本：**3.10**
   - 路径设置：`/home/yourusername/PolyU/Capstone_Project/backend/api.py`

3. **配置 WSGI 文件**
   - 在 Web 配置页面，点击 **"WSGI configuration file"** 链接
   - 编辑文件，替换为：
   
   ```python
   import sys
   import os
   
   # 添加项目路径
   path = '/home/yourusername/PolyU/Capstone_Project/backend'
   if path not in sys.path:
       sys.path.insert(0, path)
   
   # 设置环境变量
   os.environ['DB_HOST'] = 'yourusername.mysql.pythonanywhere-services.com'
   os.environ['DB_USER'] = 'yourusername'
   os.environ['DB_PASSWORD'] = 'your-password'
   os.environ['DB_NAME'] = 'yourusername$pythonlearning'
   os.environ['JWT_SECRET_KEY'] = 'your-secret-key'
   os.environ['OPENROUTER_API_KEY'] = 'your-openrouter-key'
   
   # 导入 Flask app
   from api import app as application
   ```

4. **配置虚拟环境**
   - 在 Web 配置页面的 "Virtualenv" 部分
   - 输入：`/home/yourusername/.virtualenvs/myenv`

5. **配置静态文件**（可选）
   - URL: `/static/`
   - Directory: `/home/yourusername/PolyU/Capstone_Project/backend/static/`

#### **第 7 步：重新加载 Web App**

1. 在 Web 配置页面顶部
2. 点击绿色的 **"Reload yourusername.pythonanywhere.com"** 按钮
3. 等待重新加载完成

#### **第 8 步：测试后端 API**

```bash
# 测试健康检查
curl https://yourusername.pythonanywhere.com/api/health

# 应该返回：{"status": "healthy"}
```

你的后端 URL：`https://yourusename.pythonanywhere.com`

---

## 🔗 步骤 3：连接前端和后端

1. **更新前端环境变量**
   - 在 Cloudflare Pages 设置中
   - 添加环境变量：
     ```
     REACT_APP_API_URL=https://yourusername.pythonanywhere.com/api
     ```

2. **更新后端 CORS 设置**
   编辑 `backend/api.py`：
   ```python
   from flask_cors import CORS
   
   # 允许 Cloudflare Pages 域名
   CORS(app, origins=[
       "http://localhost:3000",
       "https://your-project.pages.dev",
       "https://*.pages.dev"  # 允许所有 Cloudflare Pages 子域名
   ])
   ```

3. **重新部署**
   - 推送更改到 GitHub
   - Cloudflare Pages 会自动重新部署
   - PythonAnywhere 需要手动点击 "Reload" 按钮

---

## 🌐 步骤 4：配置自定义域名（可选）

### Cloudflare Pages 自定义域名

1. 在 Cloudflare Pages 项目设置中
2. 点击 **Custom domains**
3. 添加你的域名（例如：`learn-python.com`）
4. Cloudflare 会自动配置 DNS
PythonAnywhere 自定义域名

PythonAnywhere 免费账号不支持自定义域名，只能使用：
- `yourusername.pythonanywhere.com`

如需自定义域名，需升级到付费账号（$5/月起）。
4. 在你的 DNS 提供商添加 CNAME 记录指向 Render 提供的地址

---

## 📊 其他后端部署选项
ender.com
- 免费套餐但需要信用卡验证
- 支持 Python + PostgreSQL
- 网址：https://render.com

### 选项 E：Railway.app
- 免费套餐：$5/月额度
- 支持 Python + PostgreSQL
- 需要 GitHub OAuth（香港可能有连接问题）
- 网址：https://railway.app

### 选项 D
### 选项 C：Heroku
- 需要信用卡（但有免费额度）
- 成熟稳定
- 网址：https://heroku.com

### 选项 D：Azure/AWS
- 更强大但更复杂
- 需要付费
- 适合企业级部署

---

## ✅ 部署检查清单

### 前端 (Cloudflare Pages)
- [ ] 构建PythonAnywherem run build`）
- [ ] 环境变量已配置（API URL）
- [ ] 可以访问部署的网站
- [ ] 静态资源加载正常

### 后端 (Render)
- [ ] Python 依赖安装成功
- [ ] 数据库连接成功
- [ ] API 端点可访问
- [ ] CORS 配置正确
- [ ] 环境变量已设置

### 连接测试
- [ ] 前端可以调用后端 API
- [ ] 用户注册/登录功能正常
- [ ] Dashboard 数据加载正常
- [ ] 代码执行功能正常

---

## 🐛 常见问题

### Q1: 前端无法连接后端（CORS 错误）
**解决方案**：
- 检查后端 CORS 设置是否包含前端域名
- 确保 API URL 配置正确（包含 `/api` 路径）

### Q2: 数据库连接失败
**解决方案**：
- 检查环境变量是否正确
- 确保数据库服务正在运行
- 验证数据库连接字符串格式

### Q3: 构建失败
**解决方案**：
- 检查 `package.json` 和 `requirements.txt`
- 查看构建日志定位错误
- 确保 Node/Python 版本兼容

### Q4: Python 代码执行超时
**解决方案**：
- 增加服务器超时限制
- 优化代码执行逻辑
- 考虑使用后台任务队列

---
PythonAnywhere**：完全免费（500MB 存储，100k 请求/天）
- **MySQL 数据库**：免费（512MB）
- **总计**：100% 免费，无需信用卡 💰🎉

### 付费升级方案：
- **Cloudflare Pages**：$20/月（Pro 计划）
- **PythonAnywhere**：$5/月起（更好性能和存储）
- **总计**：约 $25免费 💰

### 付费升级方案：
- **Cloudflare Pages**：$20/月（Pro 计划）
- **Render**：$7/月起（更好性能）
- **总计**：约 $27/月起

---

## 📞 需要帮助？

如果遇到问题：ender 的部署日志（Logs 标签）
2. 查看 Cloudflare Pages 的构建日志
3. 使用浏览器开发者工具检查网络请求
4. 查看后端服务器日志
5. Render 免费套餐会在 15 分钟无活动后休眠，首次访问可能需要等待 30 秒唤醒具检查网络请求
4. 查看后端服务器日志

---

## 🎉 完成！

部署成功后，你将拥有：
- 🌐 一个快速的全球 CDN 托管前端
- 🔧 一个可靠的后端 API 服务
- 💾 一个托管的 PostgreSQL 数据库
- 🔒 自动 HTTPS 加密

立即开始学习 Python！🚀
