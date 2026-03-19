 # MacBook 快速部署指南 🍎

## 🎯 最快捷的方法：使用 Docker（推薦）

### 前置需求
1. **安裝 Docker Desktop for Mac**
   ```bash
   # 下載並安裝：https://www.docker.com/products/docker-desktop
   ```

2. **安裝完成後，確認 Docker 運行**
   ```bash
   docker --version
   docker-compose --version
   ```

### 一鍵啟動全部服務

```bash
# 1. 進入項目目錄
cd ~/Desktop/PolyU/Capstone_Project

# 2. 啟動所有服務（前端 + 後端 + 數據庫）
docker-compose up --build
```

✅ **完成！** 訪問 http://localhost:3000 使用應用

服務端口：
- 前端：http://localhost:3000
- 後端 API：http://localhost:5000
- PostgreSQL：localhost:5432

---

## 📦 方法二：本地環境運行（開發模式）

### 前置需求

#### 1. 安裝 Homebrew（如果沒有）
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### 2. 安裝 Python 3
```bash
brew install python@3.11
python3 --version
```

#### 3. 安裝 Node.js
```bash
brew install node
node --version
npm --version
```

#### 4. 安裝 PostgreSQL
```bash
# 選項 A：使用 Docker 運行數據庫（推薦）
docker run -d \
  --name python-learning-db \
  -e POSTGRES_DB=python_learning \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres123 \
  -p 5432:5432 \
  postgres:15

# 選項 B：直接安裝 PostgreSQL
brew install postgresql@15
brew services start postgresql@15
createdb python_learning
```

### 啟動步驟

#### Step 1：設置後端

```bash
# 進入後端目錄
cd ~/Desktop/PolyU/Capstone_Project/backend

# 創建虛擬環境（推薦）
python3 -m venv venv
source venv/bin/activate

# 安裝依賴
pip install -r requirements.txt

# 初始化數據庫（如果需要）
python database/initialize_database.py

# 啟動後端服務器
python app.py
```

✅ 後端運行在：http://localhost:5000

#### Step 2：設置前端（新終端窗口）

```bash
# 進入前端目錄
cd ~/Desktop/PolyU/Capstone_Project/frontend

# 安裝依賴
npm install

# 啟動前端開發服務器
npm start
```

✅ 前端自動打開在：http://localhost:3000

---

## 🧪 驗證部署

### 1. 測試後端 API
```bash
# 健康檢查
curl http://localhost:5000/api/health

# 測試代碼執行
curl -X POST http://localhost:5000/api/execute \
  -H "Content-Type: application/json" \
  -d '{"code":"print(\"Hello from MacBook!\")"}'
```

### 2. 測試前端
打開瀏覽器訪問 http://localhost:3000，應該能看到 Python 學習平台界面。

---

## 🔧 常見問題

### 問題 1：端口被占用
```bash
# 查看占用 5000 端口的進程
lsof -ti:5000

# 終止該進程
kill -9 $(lsof -ti:5000)
```

### 問題 2：數據庫連接失敗
```bash
# 檢查 Docker 容器是否運行
docker ps

# 重啟數據庫容器
docker restart python-learning-db

# 查看數據庫日誌
docker logs python-learning-db
```

### 問題 3：Python 虛擬環境未激活
```bash
# 確保激活虛擬環境
source backend/venv/bin/activate

# 你應該看到終端提示符前面有 (venv)
```

---

## 📝 環境變量配置（可選）

如果需要自定義配置，在 `backend` 目錄創建 `.env` 文件：

```bash
# backend/.env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=python_learning
DB_USER=postgres
DB_PASSWORD=postgres123
JWT_SECRET_KEY=your-secret-key-here
```

---

## 🚀 快速命令備忘

### Docker 方式
```bash
# 啟動
docker-compose up -d

# 停止
docker-compose down

# 查看日誌
docker-compose logs -f

# 重新構建
docker-compose up --build
```

### 本地開發方式
```bash
# 終端 1 - 後端
cd backend && source venv/bin/activate && python app.py

# 終端 2 - 前端
cd frontend && npm start

# 終端 3 - 數據庫（如果使用 Docker）
docker start python-learning-db
```

---

## 💡 推薦工作流程

**日常開發：**
1. 使用 Docker 運行數據庫
2. 本地運行後端（方便查看日誌和調試）
3. 本地運行前端（支持熱重載）

**快速演示：**
1. 直接使用 `docker-compose up` 一鍵啟動所有服務

**部署測試：**
1. 使用 Docker Compose 模擬生產環境

---

## 📞 需要幫助？

如果遇到問題：
1. 查看 `DEPLOYMENT.md` 獲取更詳細的部署說明
2. 查看 `DATABASE_SETUP.md` 了解數據庫配置
3. 檢查終端的錯誤日誌信息

祝你在 MacBook 上開發順利！🎉
