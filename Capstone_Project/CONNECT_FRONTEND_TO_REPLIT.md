# 如何让 Frontend 连接到 Replit Backend

## 已完成的代码修改

✅ 创建了 `frontend/src/config.js` 统一管理 API 配置
✅ 更新了所有使用硬编码 `localhost:5000` 的文件：
- `services/learningTracker.js`
- `services/aiHelper.js`
- `components/CodeEditor.js`
- `components/FileDemo.js`
- `components/FileManager.js`

现在所有 API 调用都会使用环境变量 `REACT_APP_API_URL`

---

## 步骤 1: 在 Cloudflare Pages 设置环境变量

1. **登录 Cloudflare Dashboard**
   - 进入 Pages 项目

2. **进入 Settings → Environment Variables**
   - 点击 "Add variable"

3. **添加变量**
   ```
   Variable name: REACT_APP_API_URL
   Value: https://backendzip--kinson092253.replit.app/api
   ```

4. **选择应用范围**
   - Production ✅
   - Preview ✅ (可选)

5. **保存设置**

---

## 步骤 2: 重新部署 Frontend

### 方法 1: 推送代码触发自动部署
```powershell
cd C:\Users\Kin\Desktop\PolyU\Capstone_Project

# 添加修改的文件
git add frontend/src/config.js
git add frontend/src/services/
git add frontend/src/components/

# 提交
git commit -m "Configure API URL with environment variable"

# 推送
git push
```

### 方法 2: 在 Cloudflare Dashboard 手动触发
1. 进入 Deployments 页面
2. 点击 "Retry deployment" 或 "Create new deployment"

---

## 步骤 3: 验证连接

部署完成后（约 2-3 分钟），测试以下内容：

### 3.1 检查 API URL
打开浏览器控制台（F12），在 Network 标签中查看：
- API 请求是否发送到 `https://backendzip--kinson092253.replit.app/api`
- 不应该再看到 `localhost:5000`

### 3.2 测试功能
1. **Dashboard 页面**
   - 数据是否正常加载
   - 图表是否显示

2. **练习提交**
   - 运行代码是否正常
   - 结果是否保存

3. **文件管理**
   - 创建、读取、删除文件是否正常

---

## 工作原理

### 开发环境（本地）
```javascript
// 没有设置 REACT_APP_API_URL
API_BASE_URL = 'http://localhost:5000/api'  // 使用默认值
```

### 生产环境（Cloudflare Pages）
```javascript
// 设置了 REACT_APP_API_URL
API_BASE_URL = 'https://backendzip--kinson092253.replit.app/api'  // 使用环境变量
```

Create React App 在构建时会自动替换 `process.env.REACT_APP_API_URL`

---

## 常见问题

### Q: 修改环境变量后没有生效？
A: 需要重新部署。环境变量在构建时注入，不是运行时读取。

### Q: 本地开发如何测试生产 API？
A: 创建 `.env.local` 文件：
```
REACT_APP_API_URL=https://backendzip--kinson092253.replit.app/api
```

### Q: CORS 错误怎么办？
A: 确保 Replit backend 的 `api.py` 中已配置：
```python
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://e7dadb4d.polyu-e8e.pages.dev"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
```

---

## 下一步

1. ✅ 代码已修改完成
2. ⏳ 在 Cloudflare Pages 设置环境变量
3. ⏳ 推送代码或手动触发部署
4. ⏳ 测试功能是否正常
