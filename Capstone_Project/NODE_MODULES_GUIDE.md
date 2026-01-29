# 📦 Node.js 依赖管理最佳实践

## 🎯 问题：node_modules 太大怎么办？

**答案：不需要在本地存储！使用 Docker 即可。**

---

## ✅ **推荐方案：Docker 容器内管理依赖**

### **工作原理**

```
你的项目文件夹                Docker 容器内部
├── src/                     ├── src/          (从你的文件夹映射)
├── public/                  ├── public/       (从你的文件夹映射)
├── package.json             ├── package.json  (从你的文件夹映射)
└── [没有 node_modules] ❌   └── node_modules/ ✅ (只在容器内)
```

### **配置说明**

`docker-compose.yml` 已配置：
```yaml
frontend:
  volumes:
    - ./frontend/src:/app/src          # 映射源代码（可修改）
    - ./frontend/public:/app/public    # 映射公共文件
    - /app/node_modules                # ⭐ 不映射 node_modules（保持在容器内）
```

**关键点：**
- ✅ 源代码从本地映射 → 修改实时生效
- ✅ node_modules 不映射 → 只在容器内存在
- ✅ 本地不需要 node_modules → 项目体积小

---

## 🚀 **使用流程**

### **1. 删除本地 node_modules**
```powershell
cd C:\Users\Kin\Desktop\PolyU\Capstone_Project\frontend
Remove-Item -Recurse -Force node_modules
```

### **2. 启动 Docker（依赖自动安装在容器内）**
```powershell
cd ..
docker-compose up --build
```

**发生了什么：**
1. Docker 构建镜像时运行 `npm install`
2. `node_modules` 安装在**容器内部** `/app/node_modules`
3. 你的**本地文件夹**没有 node_modules
4. 应用正常运行 ✅

### **3. 修改代码（照常工作）**
```powershell
# 编辑 src/App.js
code frontend/src/App.js

# 保存后自动热重载（因为 src 文件夹已映射）
```

### **4. 压缩项目（超快）**
```powershell
# 没有 node_modules，几秒钟完成
Compress-Archive -Path Capstone_Project -DestinationPath Project.zip
```

---

## 🔄 **常见场景处理**

### **场景 1：需要添加新依赖**

```powershell
# 选项 A：在容器内安装
docker-compose exec frontend npm install lodash

# 选项 B：修改 package.json 后重建
# 1. 编辑 frontend/package.json
# 2. 重建容器
docker-compose up --build
```

### **场景 2：需要本地开发（不用 Docker）**

```powershell
# 临时安装本地 node_modules
cd frontend
npm install

# 开发完成后可以删除
Remove-Item -Recurse -Force node_modules
```

### **场景 3：切换分支/拉取代码**

```bash
# Git 不会包含 node_modules（已在 .gitignore）
git pull origin main

# Docker 容器会自动处理依赖
docker-compose up --build
```

### **场景 4：交付给其他人**

```powershell
# 1. 压缩项目（不含 node_modules）
Compress-Archive -Path Capstone_Project -DestinationPath Project.zip

# 2. 对方解压后
docker-compose up --build  # 自动安装所有依赖
```

---

## 📊 **对比：不同方案的优劣**

| 方案 | 本地占用 | 压缩大小 | Git 体积 | 开发体验 |
|------|---------|---------|---------|---------|
| **方案 1：本地 node_modules** | 300+ MB | 350 MB | 不可行 | 好 |
| **方案 2：Docker 容器** | 5 MB | 10 MB | 5 MB | 很好 ✅ |
| **方案 3：CDN（部分库）** | 5 MB | 10 MB | 5 MB | 一般 |

---

## 🎓 **理解概念：为什么这样可行？**

### **类比：Python 的 import**

```python
import numpy  # Python 从 site-packages 导入
```

- Python 的库安装在 `site-packages/`
- 你不需要每个项目都复制一份 numpy
- 多个项目**共享**同一份安装

### **Node.js 的区别**

```javascript
import React from 'react';  // Node.js 从 node_modules 导入
```

- Node.js 默认每个项目有**独立** node_modules
- 但使用 Docker，所有项目可以**容器化隔离**
- 本地不需要存储，容器内按需构建

---

## 💡 **进阶优化（可选）**

### **使用 pnpm（更高效的包管理器）**

```powershell
# 安装 pnpm
npm install -g pnpm

# pnpm 使用硬链接，节省 70% 磁盘空间
cd frontend
pnpm install  # 只会增加 ~30-50 MB 而不是 300 MB
```

### **使用 Yarn PnP（完全去除 node_modules）**

```json
// package.json
{
  "installConfig": {
    "pnp": true
  }
}
```

```powershell
yarn install  # 生成 .pnp.cjs 文件而不是 node_modules
```

---

## 🎯 **总结：你应该做什么**

### **立即执行：**

```powershell
# 1. 删除本地 node_modules
cd frontend
Remove-Item -Recurse -Force node_modules

# 2. 使用 Docker 开发
cd ..
docker-compose up --build
```

### **以后工作流程：**

1. ✅ 编辑代码 → 保存 → 自动热重载
2. ✅ 提交代码 → Git 不包含 node_modules
3. ✅ 压缩项目 → 10 秒完成（5 MB）
4. ✅ 交付给他人 → `docker-compose up` 自动就绪

### **核心理念：**

> **node_modules 是"可重建"的，不是"源代码"**
> 
> 就像 Python 的虚拟环境，可以随时 `pip install -r requirements.txt` 重建
> 
> Node.js 也可以随时 `npm install` 重建

---

## 📚 **相关文件**

- ✅ `.gitignore` - Git 忽略 node_modules
- ✅ `.dockerignore` - Docker 构建排除 node_modules
- ✅ `docker-compose.yml` - 配置容器内依赖管理
- ✅ `package.json` - 记录所有依赖（这才是核心）

**记住：package.json 是"配方"，node_modules 是"成品"。只要有配方，可以随时制作成品！**
