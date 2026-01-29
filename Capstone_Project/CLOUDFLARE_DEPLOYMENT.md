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

## 🔧 步骤 2：部署后端到 Railway（推荐）

### 为什么选择 Railway？
- ✅ 免费套餐（每月 $5 额度）
- ✅ 支持 Python 和 PostgreSQL
- ✅ 自动 HTTPS
- ✅ 简单易用

### 部署步骤：

1. **访问 [Railway](https://railway.app/)**
   - 使用 GitHub 账号登录

2. **创建新项目**
   - 点击 **New Project**
   - 选择 **Deploy from GitHub repo**
   - 选择你的仓库

3. **添加 PostgreSQL 数据库**
   - 在项目中点击 **New**
   - 选择 **Database** → **PostgreSQL**
   - Railway 会自动提供数据库连接信息

4. **配置后端服务**
   - 选择 backend 服务
   - 设置 **Root Directory**: `backend`
   - 添加环境变量：
     ```
     DB_HOST=<从 Railway PostgreSQL 获取>
     DB_PORT=5432
     DB_NAME=railway
     DB_USER=<从 Railway PostgreSQL 获取>
     DB_PASSWORD=<从 Railway PostgreSQL 获取>
     JWT_SECRET_KEY=<生成一个随机密钥>
     OPENROUTER_API_KEY=<你的 API 密钥>
     OPENROUTER_MODEL=deepseek/deepseek-chat
     ```

5. **部署**
   - Railway 会自动检测 `requirements.txt` 并部署
   - 获得后端 URL：`https://your-app.railway.app`

6. **初始化数据库**
   - 在 Railway 控制台中连接到 PostgreSQL
   - 或使用提供的连接字符串运行：
     ```powershell
     psql <railway-connection-string> -f backend/database/schema_fixed.sql
     ```

---

## 🔗 步骤 3：连接前端和后端

1. **更新前端环境变量**
   - 在 Cloudflare Pages 设置中
   - 添加环境变量：
     ```
     REACT_APP_API_URL=https://your-app.railway.app/api
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
   - Cloudflare Pages 和 Railway 会自动重新部署

---

## 🌐 步骤 4：配置自定义域名（可选）

### Cloudflare Pages 自定义域名

1. 在 Cloudflare Pages 项目设置中
2. 点击 **Custom domains**
3. 添加你的域名（例如：`learn-python.com`）
4. Cloudflare 会自动配置 DNS

### Railway 自定义域名

1. 在 Railway 项目设置中
2. 点击 **Settings** → **Domains**
3. 添加自定义域名（例如：`api.learn-python.com`）
4. 在你的 DNS 提供商添加 CNAME 记录

---

## 📊 其他后端部署选项

### 选项 B：Render.com
- 免费套餐：有限制但够用
- 支持 Python + PostgreSQL
- 部署步骤类似 Railway
- 网址：https://render.com

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
- [ ] 构建成功（`npm run build`）
- [ ] 环境变量已配置（API URL）
- [ ] 可以访问部署的网站
- [ ] 静态资源加载正常

### 后端 (Railway/Render)
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

## 💰 成本估算

### 免费方案组合：
- **Cloudflare Pages**：免费（无限带宽）
- **Railway**：$5/月免费额度（够轻量使用）
- **总计**：基本免费

### 付费升级方案：
- **Cloudflare Pages**：$20/月（Pro 计划）
- **Railway**：按使用付费（约 $10-20/月）
- **总计**：约 $30-40/月

---

## 📞 需要帮助？

如果遇到问题：
1. 检查 Railway/Render 的部署日志
2. 查看 Cloudflare Pages 的构建日志
3. 使用浏览器开发者工具检查网络请求
4. 查看后端服务器日志

---

## 🎉 完成！

部署成功后，你将拥有：
- 🌐 一个快速的全球 CDN 托管前端
- 🔧 一个可靠的后端 API 服务
- 💾 一个托管的 PostgreSQL 数据库
- 🔒 自动 HTTPS 加密

立即开始学习 Python！🚀
