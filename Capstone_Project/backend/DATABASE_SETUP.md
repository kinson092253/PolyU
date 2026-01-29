# PostgreSQL 設置完成 ✅

## 📁 新增的文件

1. **backend/database/schema.sql** - 數據庫結構定義
2. **backend/database/db.py** - 數據庫連接工具模組

## 🗄️ 數據庫架構

創建了 4 張表：
- `users` - 用戶資料（用戶名、郵箱、密碼）
- `user_progress` - 學習進度追蹤
- `quiz_results` - 測驗結果記錄
- `code_submissions` - 代碼提交歷史（可選）

## 🚀 啟動步驟

### 1. 啟動所有服務（推薦）
```powershell
cd C:\Users\Kin\Desktop\PolyU\Capstone_Project
docker-compose up --build
```

服務啟動後：
- PostgreSQL: `localhost:5432`
- Backend API: `localhost:5000`
- Frontend: `localhost:3000`

### 2. 僅啟動數據庫（用於本地開發）
```powershell
docker-compose up db
```

然後在本地運行 backend：
```powershell
cd backend
pip install -r requirements.txt
python app.py
```

## 🧪 測試 API

### 1. 健康檢查
```powershell
curl http://localhost:5000/api/health
```

預期輸出：
```json
{
  "status": "ok",
  "message": "Python 執行服務運行中",
  "database": "connected"
}
```

### 2. 用戶註冊
```powershell
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Test User"
  }'
```

### 3. 用戶登入
```powershell
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

會返回 JWT token，保存後用於後續請求。

### 4. 獲取當前用戶（需要 JWT token）
```powershell
curl http://localhost:5000/api/auth/me `
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## 🔧 直接連接數據庫

### 使用 psql（如果已安裝）
```powershell
psql -h localhost -p 5432 -U admin -d python_learning
# 密碼：admin123
```

### 使用 Docker exec
```powershell
docker exec -it python-learning-db psql -U admin -d python_learning
```

常用查詢：
```sql
-- 查看所有用戶
SELECT * FROM users;

-- 查看某用戶的學習進度
SELECT * FROM user_progress WHERE user_id = 1;

-- 查看測驗結果統計
SELECT lesson_id, COUNT(*) as attempts, 
       AVG(CASE WHEN is_correct THEN 100 ELSE 0 END) as accuracy
FROM quiz_results 
GROUP BY lesson_id;
```

## 📊 數據庫管理工具（推薦）

可以使用圖形化工具：
- **pgAdmin** - https://www.pgadmin.org/
- **DBeaver** - https://dbeaver.io/
- **TablePlus** - https://tableplus.com/

連接信息：
- Host: `localhost`
- Port: `5432`
- Database: `python_learning`
- Username: `admin`
- Password: `admin123`

## 🛠️ 常見問題

### 問題 1: 端口 5432 已被佔用
```powershell
# 查找佔用端口的進程
netstat -ano | findstr :5432

# 停止現有的 PostgreSQL 服務
# 或修改 docker-compose.yml 中的端口映射
ports:
  - "5433:5432"  # 改用 5433
```

### 問題 2: 數據庫連接失敗
1. 確認 Docker 容器正在運行：
```powershell
docker ps
```

2. 查看數據庫日誌：
```powershell
docker logs python-learning-db
```

3. 重啟服務：
```powershell
docker-compose down
docker-compose up --build
```

### 問題 3: 重置數據庫
```powershell
# 停止並刪除所有容器和數據卷
docker-compose down -v

# 重新啟動（會自動執行 schema.sql）
docker-compose up --build
```

## 📝 下一步

1. ✅ PostgreSQL 已設置完成
2. ⏭️ 實現學習進度追蹤 API
3. ⏭️ 實現測驗系統 API
4. ⏭️ 更新前端集成用戶認證
5. ⏭️ 添加進度追蹤界面

## 🔐 安全注意事項（生產環境）

當前配置適合開發環境。生產環境需要：
1. 更改數據庫密碼（不要使用 admin123）
2. 更改 JWT_SECRET_KEY
3. 使用環境變量存儲敏感信息
4. 啟用 SSL/TLS 連接
5. 配置防火牆規則
6. 定期備份數據庫

## 📚 新增的 API 端點

| 方法 | 路徑 | 說明 | 需要認證 |
|------|------|------|---------|
| POST | /api/auth/register | 用戶註冊 | ❌ |
| POST | /api/auth/login | 用戶登入 | ❌ |
| GET | /api/auth/me | 獲取當前用戶 | ✅ |
| GET | /api/health | 健康檢查 | ❌ |
| POST | /api/execute | 執行代碼 | ❌ (可改為需要) |
| POST | /api/validate | 驗證語法 | ❌ |

---

**設置完成！** 🎉 現在可以啟動服務並測試認證功能了。
