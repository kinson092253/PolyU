# 🚀 Replit 後端部署完整指南

## 📋 前置準備

- GitHub 帳號
- Replit 帳號（可用 GitHub 登入）
- 確保代碼已推送到 GitHub

---

## 🎯 步驟 1：創建 Replit 項目

### 1.1 登入 Replit
1. 訪問 [Replit.com](https://replit.com)
2. 點擊右上角 **"Log in"** 或 **"Sign up"**
3. 選擇 **"Continue with GitHub"** 登入

### 1.2 導入 GitHub 倉庫
1. 登入後，點擊左側 **"+ Create Repl"**
2. 選擇 **"Import from GitHub"**
3. 在搜索框輸入或粘貼你的倉庫 URL：
   ```
   https://github.com/kinson092253/PolyU
   ```
4. 點擊倉庫名稱選中它
5. **Language** 會自動識別為 **Python**
6. 點擊 **"Import from GitHub"** 按鈕
7. 等待導入完成（約 30-60 秒）

---

## 🎯 步驟 2：配置 PostgreSQL 數據庫

### 2.1 啟用 Replit PostgreSQL
1. 在 Replit 編輯器左側，找到 **"Tools"** 工具欄
2. 點擊 **"Database"** 圖標 🗄️
3. 選擇 **"PostgreSQL"**
4. 點擊 **"Create Database"**
5. 等待數據庫創建完成

### 2.2 獲取數據庫連接信息
1. 在 Database 面板中，找到 **"Connection String"**
2. 複製完整的 `DATABASE_URL`，格式類似：
   ```
   postgresql://username:password@hostname:port/database
   ```
3. 保存這個 URL，稍後會用到

### 2.3 初始化數據庫表結構
1. 在 Replit 底部打開 **Shell** 標籤頁
2. 執行以下命令：
   ```bash
   cd Capstone_Project/backend
   
   # 安裝 psycopg2
   pip install psycopg2-binary
   
   # 初始化數據庫
   psql $DATABASE_URL -f database/schema_fixed.sql
   ```
3. 如果看到成功創建表的信息，說明數據庫初始化完成 ✅

---

## 🎯 步驟 3：配置環境變量

### 3.1 打開 Secrets 管理器
1. 在 Replit 左側工具欄，點擊 **"Secrets"** 🔒 圖標
2. 或點擊左下角的鎖圖標

### 3.2 添加必要的環境變量

逐個添加以下變量：

#### 數據庫配置
```
Key: DATABASE_URL
Value: <剛才複製的 PostgreSQL 連接字符串>
```

#### Flask 配置
```
Key: SECRET_KEY
Value: your-super-secret-key-change-this-in-production
```

#### OpenRouter AI 配置（如果使用 AI 功能）
```
Key: OPENROUTER_API_KEY
Value: <你的 OpenRouter API Key>
```

```
Key: OPENROUTER_MODEL
Value: deepseek/deepseek-chat
```

#### 端口配置（可選）
```
Key: PORT
Value: 5000
```

> **提示**：點擊 **"+ New secret"** 添加每個變量

---

## 🎯 步驟 4：安裝依賴並運行

### 4.1 安裝 Python 依賴
在 Shell 中執行：
```bash
cd Capstone_Project/backend
pip install -r requirements.txt
```

### 4.2 運行應用
1. 點擊頂部綠色的 **"Run"** ▶️ 按鈕
2. Replit 會自動執行 `.replit` 文件中的命令
3. 等待啟動，應該看到類似的輸出：
   ```
   * Running on http://0.0.0.0:5000
   * Restarting with stat
   ```

### 4.3 獲取公網 URL
1. 應用運行後，Replit 右側會顯示 **Webview** 預覽窗口
2. 點擊預覽窗口頂部的 **"Open in new tab"** 圖標 🔗
3. 你的後端 URL 格式為：
   ```
   https://<project-name>.<username>.repl.co
   ```
4. **複製這個 URL**，稍後配置前端時使用

---

## 🎯 步驟 5：測試 API

### 5.1 測試健康檢查端點
在瀏覽器中訪問：
```
https://<your-repl-url>.repl.co/api/health
```

應該返回：
```json
{"status": "healthy"}
```

### 5.2 測試其他端點
```bash
# 在本地 PowerShell 測試
curl https://<your-repl-url>.repl.co/api/chapters

# 或在 Replit Shell 測試
curl http://localhost:5000/api/health
```

---

## 🎯 步驟 6：配置前端連接到 Replit 後端

### 6.1 更新 Cloudflare Pages 環境變量

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 進入你的 **Pages 項目**
3. 點擊 **"Settings"** → **"Environment variables"**
4. 添加或更新：
   ```
   Variable name: REACT_APP_API_URL
   Value: https://<your-repl-url>.repl.co/api
   ```
5. 選擇應用範圍：**Production** ✅ 和 **Preview** ✅
6. 點擊 **"Save"**

### 6.2 重新部署前端
在 Cloudflare Pages 中：
1. 進入 **"Deployments"** 標籤
2. 點擊最新部署旁的 **"···"** → **"Retry deployment"**
3. 或者推送新 commit 觸發自動部署

---

## 🎯 步驟 7：處理 Replit 休眠問題

### 免費版限制
- Replit 免費版應用在**閒置 1 小時後會自動休眠**
- 下次訪問時需要等待約 10-30 秒喚醒

### 解決方案

#### 方法 1：升級到 Replit Hacker Plan
- 費用：$7/月
- 特點：Always-on，24/7 運行不休眠

#### 方法 2：使用定時 Ping 服務（免費）
使用 [UptimeRobot](https://uptimerobot.com) 或 [Cron-Job.org](https://cron-job.org)：

1. 註冊免費帳號
2. 添加監控：
   - URL: `https://<your-repl-url>.repl.co/api/health`
   - 間隔：每 5 分鐘
3. 這會保持應用活躍狀態

#### 方法 3：在前端添加重試邏輯
前端檢測到後端休眠時自動重試（已在代碼中實現）

---

## 📝 常見問題

### Q1: Replit 顯示 "This site can't be reached"
**A**: 檢查：
- 應用是否正在運行（點擊 Run 按鈕）
- Shell 中是否有錯誤信息
- 環境變量是否正確配置

### Q2: 數據庫連接失敗
**A**: 
1. 確認 `DATABASE_URL` 在 Secrets 中正確設置
2. 在 Shell 運行：`echo $DATABASE_URL` 確認變量存在
3. 檢查數據庫是否成功創建

### Q3: 如何查看日誌
**A**: 
- 在 Replit 的 **Console** 標籤查看實時日誌
- Shell 中運行：`python api.py` 查看詳細錯誤

### Q4: 如何更新代碼
**A**:
1. 在本地修改並 push 到 GitHub
2. 在 Replit Shell 中：
   ```bash
   git pull origin main
   ```
3. 點擊 **Run** 重啟應用

### Q5: API 響應很慢
**A**: 免費版 Replit 性能有限，建議：
- 升級到付費版
- 或使用 Railway/Render 等其他平台

---

## ✅ 部署檢查清單

- [ ] GitHub 倉庫已創建並推送代碼
- [ ] Replit 項目已從 GitHub 導入
- [ ] PostgreSQL 數據庫已創建
- [ ] 數據庫表結構已初始化
- [ ] 所有環境變量已在 Secrets 中配置
- [ ] Python 依賴已安裝
- [ ] 應用成功運行
- [ ] API 測試通過（/api/health 返回 200）
- [ ] Cloudflare Pages 環境變量已更新
- [ ] 前端已重新部署
- [ ] 前後端連接測試通過

---

## 🎉 部署完成！

你的應用現在已經：
- ✅ 前端部署在 Cloudflare Pages
- ✅ 後端部署在 Replit
- ✅ 數據庫託管在 Replit PostgreSQL
- ✅ 全球可訪問

**前端 URL**: `https://<your-project>.pages.dev`  
**後端 URL**: `https://<your-repl>.repl.co`

---

## 🔗 相關資源

- [Replit 文檔](https://docs.replit.com)
- [PostgreSQL 文檔](https://www.postgresql.org/docs/)
- [Flask 部署指南](https://flask.palletsprojects.com/en/latest/deploying/)
