# Python 學習平台 (Python Learning Platform)

一個互動式的 Python 學習平台，提供視頻教程、程式碼編輯器和練習功能。

## 🌟 功能特點

- **互動式代碼編輯器**：基於 Monaco Editor 的程式碼編輯環境
- **即時代碼執行**：在瀏覽器中運行 Python 代碼
- **章節式學習**：結構化的 Python 課程內容（10 個章節）
- **進度追蹤**：記錄學習進度和代碼提交歷史
- **用戶認證**：JWT 身份驗證系統
- **測驗系統**：章節測驗和結果記錄
- **學習儀表板**：可視化學習數據和進度

## 🏗️ 技術架構

### 前端
- **React 18** - UI 框架
- **Monaco Editor** - 代碼編輯器
- **Pyodide** - 瀏覽器端 Python 運行環境
- **React Router** - 路由管理
- **Recharts** - 數據可視化

### 後端
- **Flask** - Python Web 框架
- **PostgreSQL** - 數據庫
- **JWT** - 身份驗證
- **Flask-CORS** - 跨域資源共享

### 部署
- **Docker & Docker Compose** - 容器化部署
- **Nginx** - 前端服務器

## 🚀 快速開始

### 前置需求

在開始之前，請確保已安裝以下軟體：

| 軟體 | 建議版本 | 下載 |
|------|---------|------|
| Python | 3.9+ | https://www.python.org/downloads/ |
| Node.js | 16+ | https://nodejs.org/ |
| PostgreSQL | 14+ | https://www.postgresql.org/download/ |

---

### 第一步：設置 PostgreSQL 資料庫

安裝 PostgreSQL 後，建立資料庫：

```bash
# 以 postgres 用戶登入 psql
psql -U postgres

# 在 psql 中執行（建立資料庫）
CREATE DATABASE python_learning;
\q
```

> 預設資料庫密碼為 `admin`（可在 `backend/api.py` 的 `get_db_connection()` 中修改 `DB_PASSWORD`）

---

### 第二步：設置並啟動後端

```bash
cd Capstone_Project/backend

# 建立 Python 虛擬環境
python -m venv venv

# 啟動虛擬環境
# Windows:
venv\Scripts\activate
# macOS / Linux:
source venv/bin/activate

# 安裝 Python 依賴
pip install -r requirements.txt

# 初始化資料庫（建立所有表格）
python database/initialize_database.py

# 啟動後端伺服器（port 5000）
python api.py
```

後端成功啟動後，你會看到：
```
 * Running on http://127.0.0.1:5000
```

---

### 第三步：設置並啟動前端

**開啟新的終端視窗**，然後：

```bash
cd Capstone_Project/frontend

# 安裝 Node.js 依賴
npm install

# 啟動前端開發伺服器（port 3000）
npm start
```

瀏覽器會自動開啟 http://localhost:3000

---

### 本地開發

### 本地開發

如果想分開啟動（不用虛擬環境），直接：

```bash
# 後端（需已安裝依賴）
cd Capstone_Project/backend
python api.py

# 前端（另開終端）
cd Capstone_Project/frontend
npm start
```

## 📚 項目結構

```
Capstone_Project/
├── backend/                 # Flask 後端
│   ├── app.py              # 主應用
│   ├── api.py              # API 端點
│   ├── ai_service.py       # AI 提示服務
│   ├── database/           # 資料庫模組
│   └── requirements.txt    # Python 依賴
├── frontend/               # React 前端
│   ├── src/
│   │   ├── components/    # React 組件
│   │   ├── VideoScript/   # 課程內容
│   │   └── App.js         # 主應用
│   └── package.json       # Node 依賴
├── Report/                # 項目報告
├── video_scripts_manual/  # 課程腳本
└── docker-compose.yml     # Docker 配置
```

## 📖 文檔

- [部署指南](DEPLOYMENT.md) - 完整部署說明
- [MacOS 快速開始](MACOS_QUICK_START.md) - MacBook 部署指南
- [數據庫設置](backend/DATABASE_SETUP.md) - 數據庫配置
- [Docker 指南](DOCKER_GUIDE.md) - Docker 使用說明
- [後端集成狀態](BACKEND_INTEGRATION_STATUS.md) - API 集成狀態

## 🎓 課程內容

### 章節列表
1. Python 基礎
2. 運算符
3. 條件語句
4. 循環
5. 列表
6. 數據結構（字典、元組、集合）
7. 函數
8. 模組
9. 物件導向程式設計
10. 文件處理

## 🔧 環境要求

- **Node.js**: 14.x 或更高
- **Python**: 3.8 或更高
- **PostgreSQL**: 15.x
- **Docker**: 20.x 或更高（可選）

## 🌐 部署選項

### Docker Compose
最簡單的部署方式，一鍵啟動所有服務。

### Replit
查看 [REPLIT_DEPLOYMENT_GUIDE.md](../REPLIT_DEPLOYMENT_GUIDE.md)

### Cloudflare Pages
查看 [CLOUDFLARE_DEPLOYMENT.md](CLOUDFLARE_DEPLOYMENT.md)

## 🧪 測試

```bash
# 後端測試
cd backend
python test_dashboard_api.py

# 前端測試
cd frontend
npm test
```

## 📝 開發說明

### API 端點

- `GET /api/health` - 健康檢查
- `POST /api/execute` - 執行 Python 代碼
- `POST /api/register` - 用戶註冊
- `POST /api/login` - 用戶登入
- `GET /api/dashboard/stats` - 獲取儀表板統計
- `POST /api/progress/save` - 保存學習進度

詳細 API 文檔請查看 [backend/DASHBOARD_API.md](backend/DASHBOARD_API.md)

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

此項目為教育用途。

## 👥 作者

PolyU Capstone Project Team

## 🙏 致謝

感謝所有使用和支持這個項目的人！
