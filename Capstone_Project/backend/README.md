# Python 學習平台 - 後端 API

基於 Flask 的 Python 代碼執行服務，提供安全的代碼執行環境。

## 功能特點

- ✅ 安全的代碼執行（隔離環境）
- ✅ 超時保護（防止無限循環）
- ✅ 輸出長度限制
- ✅ 基本安全檢查（禁止危險模組）
- ✅ CORS 支持（跨域請求）

## API 端點

### 1. 執行代碼
```
POST /api/execute
Content-Type: application/json

{
  "code": "print('Hello, World!')"
}
```

**響應**：
```json
{
  "success": true,
  "output": "Hello, World!\n",
  "error": null
}
```

### 2. 驗證語法
```
POST /api/validate
Content-Type: application/json

{
  "code": "print('test')"
}
```

### 3. 健康檢查
```
GET /api/health
```

## 快速開始

### 1. 安裝依賴

```bash
cd backend
pip install -r requirements.txt
```

### 2. 啟動服務器

```bash
python app.py
```

服務將在 http://localhost:5000 運行

### 3. 測試 API

```bash
# 使用 curl 測試
curl -X POST http://localhost:5000/api/execute \
  -H "Content-Type: application/json" \
  -d "{\"code\":\"print('Hello')\"}"
```

## Docker 部署（推薦）

### 構建鏡像
```bash
docker build -t python-learning-backend .
```

### 運行容器
```bash
docker run -p 5000:5000 python-learning-backend
```

### 使用 Docker Compose
```bash
docker-compose up
```

## 安全考慮

### 當前實現的安全措施：
1. ✅ 執行超時限制（5秒）
2. ✅ 輸出長度限制
3. ✅ 禁止危險模組（os, subprocess, sys 等）
4. ✅ 臨時文件隔離

### 生產環境建議：
1. 使用 Docker 容器隔離
2. 限制 CPU 和內存使用
3. 使用專用的代碼執行沙箱（如 PyPy sandbox）
4. 添加用戶認證
5. 實現請求頻率限制
6. 添加日誌監控

## 配置選項

在 `app.py` 中修改：

```python
EXECUTION_TIMEOUT = 5  # 執行超時（秒）
MAX_OUTPUT_LENGTH = 10000  # 最大輸出長度
```

## 開發模式 vs 生產模式

### 開發模式（當前）
```python
app.run(debug=True, host='0.0.0.0', port=5000)
```

### 生產模式
使用 Gunicorn：
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## 故障排除

### 問題：CORS 錯誤
確保 flask-cors 已安裝：
```bash
pip install flask-cors
```

### 問題：端口被佔用
更改端口：
```python
app.run(port=5001)
```

### 問題：代碼執行超時
增加超時限制或檢查代碼是否有無限循環

## 後續改進

- [ ] 實現用戶會話管理
- [ ] 添加代碼執行歷史記錄
- [ ] 實現更嚴格的沙箱環境
- [ ] 支持多種 Python 版本
- [ ] 添加代碼分析和提示功能
- [ ] 實現代碼性能分析

## 授權

MIT License
