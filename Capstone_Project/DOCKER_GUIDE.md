# Docker 部署指南

## 📦 使用 Docker 的优势

### 1. **节省本地空间**
- ✅ 删除本地 `node_modules` (300+ MB)
- ✅ 依赖只存在 Docker 镜像中
- ✅ 本地项目约 1-2 MB

### 2. **一致性环境**
- ✅ 所有人运行相同环境
- ✅ 避免"在我机器上能运行"问题

### 3. **快速部署**
- ✅ 一条命令启动应用
- ✅ 自动构建和配置

---

## 🚀 使用步骤

### **方案 A: 完全使用 Docker（推荐节省空间）**

1. **删除本地 node_modules**
```powershell
Remove-Item -Recurse -Force frontend\node_modules
```

2. **构建并启动**
```powershell
docker-compose up --build
```

3. **访问应用**
```
http://localhost:3000
```

4. **停止应用**
```powershell
docker-compose down
```

---

### **方案 B: 本地开发（快速热重载）**

1. **安装依赖**
```powershell
cd frontend
npm install
```

2. **启动开发服务器**
```powershell
npm start
```

3. **访问应用**
```
http://localhost:3001
```

---

## 📊 空间对比

| 模式 | 本地文件大小 | node_modules |
|------|------------|--------------|
| **Docker** | ~2 MB | ❌ 删除（在镜像中） |
| **本地开发** | ~302 MB | ✅ 保留 |

---

## 🔄 切换方式

### 从本地开发切换到 Docker：
```powershell
# 1. 删除 node_modules
Remove-Item -Recurse -Force frontend\node_modules

# 2. 使用 Docker
docker-compose up --build
```

### 从 Docker 切换到本地开发：
```powershell
# 1. 停止 Docker
docker-compose down

# 2. 安装依赖
cd frontend
npm install

# 3. 启动开发服务器
npm start
```

---

## 💡 最佳实践

### **开发阶段（建议方案 B）**
- 使用 `npm start` 本地开发
- 热重载更快（秒级）
- 方便调试

### **演示/分享阶段（建议方案 A）**
- 删除 node_modules
- 用 Docker 运行
- 节省空间，易于分享

### **生产部署**
```powershell
# 构建生产镜像
docker-compose up --build -d

# 或部署到云平台
# - GitHub Pages (静态)
# - Netlify
# - Vercel
# - AWS/Azure/GCP
```

---

## 🛠️ 镜像管理

### 查看镜像
```powershell
docker images
```

### 清理未使用的镜像
```powershell
docker system prune -a
```

### 重新构建（代码更新后）
```powershell
docker-compose up --build --force-recreate
```

---

## ✅ 推荐配置

**平时开发**: 
- 保留 node_modules
- 使用 `npm start`

**需要分享项目时**:
- 删除 node_modules
- 压缩整个项目
- 接收方用 Docker 运行

**最终交付**:
- 提供 Docker 镜像
- 或部署到云端提供 URL
