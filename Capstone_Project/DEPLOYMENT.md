# Python 學習平台 - 完整部署指南

## 📋 系統架構

```
前端 (React + Monaco Editor)  ←→  後端 (Flask API)  ←→  Python 執行環境
     ↓ http://localhost:3000        ↓ http://localhost:5000
   用戶界面                        代碼執行服務
```

## 🚀 快速開始（本地開發）

### 方案 1：分別運行前後端（推薦用於開發）

#### 步驟 1：啟動後端

```powershell
# 在 PowerShell 終端 1 中
cd backend

# 安裝 Python 依賴
pip install -r requirements.txt

# 啟動 Flask 服務器
python app.py
```

✅ 後端將運行在：http://localhost:5000

#### 步驟 2：啟動前端

```powershell
# 在 PowerShell 終端 2 中
cd frontend

# 如果還沒安裝依賴
npm install

# 啟動 React 開發服務器
npm start
```

✅ 前端將運行在：http://localhost:3000

### 方案 2：使用 Docker（推薦用於生產）

```powershell
# 在項目根目錄
docker-compose up --build
```

這會同時啟動前端和後端服務。

## 🧪 測試後端 API

### 使用 PowerShell 測試：

```powershell
# 測試健康檢查
Invoke-WebRequest -Uri http://localhost:5000/api/health -Method GET

# 測試代碼執行
$body = @{
    code = "a = 1`nb = 2`nprint(a + b)"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5000/api/execute -Method POST -Body $body -ContentType "application/json"
```

### 使用瀏覽器測試：

訪問：http://localhost:5000/api/health

## 📝 完整測試流程

1. **啟動後端**
   ```powershell
   cd backend
   python app.py
   ```
   看到：`🚀 Python 執行服務已啟動`

2. **啟動前端**
   ```powershell
   cd frontend
   npm start
   ```
   自動打開瀏覽器到 http://localhost:3000

3. **測試代碼執行**
   - 在界面中選擇一個課程
   - 點擊「練習」標籤
   - 在編輯器中輸入：
     ```python
     a = 1
     b = 2
     print(a + b)
     ```
   - 點擊「▶ 運行代碼」
   - 右側應該顯示：`3`

## 🔧 故障排除

### 問題 1：後端啟動失敗

**錯誤**：`ModuleNotFoundError: No module named 'flask'`

**解決**：
```powershell
pip install -r backend/requirements.txt
```

### 問題 2：前端無法連接後端

**錯誤**：`❌ 無法連接到後端服務器`

**檢查清單**：
1. 後端是否正在運行？
   ```powershell
   # 測試後端
   curl http://localhost:5000/api/health
   ```

2. 防火牆是否阻擋？
   - Windows：允許 Python 和 Node.js 通過防火牆

3. 端口是否被佔用？
   ```powershell
   # 檢查 5000 端口
   netstat -ano | findstr :5000
   ```

### 問題 3：CORS 錯誤

**確保 backend/app.py 中有**：
```python
from flask_cors import CORS
CORS(app)
```

### 問題 4：代碼執行超時

**調整超時設置**（backend/app.py）：
```python
EXECUTION_TIMEOUT = 10  # 增加到 10 秒
```

## 🔒 安全注意事項

### 當前版本（開發環境）
- ✅ 基本安全檢查（禁止危險模組）
- ✅ 執行超時保護
- ✅ 輸出長度限制
- ⚠️ 不適合生產環境

### 生產環境建議
1. **使用 Docker 容器隔離**
   ```powershell
   docker-compose up
   ```

2. **添加用戶認證**
   - 實現 JWT token
   - 限制 API 訪問

3. **添加速率限制**
   ```python
   from flask_limiter import Limiter
   limiter = Limiter(app, key_func=get_remote_address)
   ```

4. **監控和日誌**
   - 記錄所有代碼執行
   - 監控資源使用

## 📦 項目結構

```
Capstone_Project/
├── backend/                 # 後端服務
│   ├── app.py              # Flask 應用
│   ├── requirements.txt    # Python 依賴
│   ├── Dockerfile          # Docker 配置
│   └── README.md           # 後端文檔
│
├── frontend/               # 前端應用
│   ├── src/
│   │   ├── App.js         # 主應用（已修改為調用後端）
│   │   ├── components/    # React 組件
│   │   └── data/          # 課程數據
│   ├── package.json
│   └── README.md
│
└── docker-compose.yml      # Docker Compose 配置
```

## 🎯 功能測試清單

- [ ] 後端健康檢查正常
- [ ] 前端成功連接後端
- [ ] 簡單 print 語句執行成功
- [ ] 變量運算執行成功
- [ ] 錯誤提示正確顯示
- [ ] 超時保護生效
- [ ] 危險代碼被阻止

## 📚 下一步開發

1. **用戶系統**
   - 註冊/登錄
   - 學習進度保存
   - 代碼歷史記錄

2. **增強功能**
   - 支持 input() 函數
   - 支持圖形輸出
   - 代碼自動評分
   - 單元測試支持

3. **性能優化**
   - Redis 緩存
   - 代碼執行隊列
   - WebSocket 實時輸出

4. **安全加固**
   - 更嚴格的沙箱
   - 網絡隔離
   - 資源配額管理

## 💡 使用提示

### 支持的 Python 功能
現在你可以運行完整的 Python 代碼：
```python
# 變量和運算
a = 10
b = 20
print(a + b)

# 條件判斷
if a > 5:
    print("大於 5")
else:
    print("小於等於 5")

# 循環
for i in range(5):
    print(i)

# 函數
def greet(name):
    return f"Hello, {name}!"
    
print(greet("World"))
```

### 限制
- ❌ 不支持文件 I/O（安全考慮）
- ❌ 不支持網絡請求
- ❌ 不支持某些危險模組
- ⏱️ 執行時間限制 5 秒

## 🆘 獲取幫助

如果遇到問題：
1. 查看終端錯誤訊息
2. 檢查瀏覽器控制台（F12）
3. 查看後端日誌輸出
4. 參考 backend/README.md 和 frontend/README.md

## 🎉 完成！

現在你的 Python 學習平台已經完全可以執行真實的 Python 代碼了！
