# GitHub 上傳指南 📤

## ✅ 已完成
- [x] Git 倉庫已初始化
- [x] 所有文件已添加並提交
- [x] README.md 已創建
- [x] .gitignore 配置完成

## 🚀 上傳到 GitHub 的步驟

### 方法 1：使用 GitHub 網頁界面（最簡單）

#### Step 1: 創建 GitHub 倉庫

1. 訪問 https://github.com 並登錄
2. 點擊右上角的 **"+"** → **"New repository"**
3. 填寫倉庫信息：
   - **Repository name**: `python-learning-platform` （或你想要的名稱）
   - **Description**: `Interactive Python Learning Platform with code editor and tutorials`
   - **Public** 或 **Private**（根據需求選擇）
   - ⚠️ **不要勾選** "Add a README file"（因為我們已經有了）
   - ⚠️ **不要勾選** "Add .gitignore"（已經有了）
4. 點擊 **"Create repository"**

#### Step 2: 推送代碼到 GitHub

創建倉庫後，GitHub 會顯示指令。在 PowerShell 中執行：

```powershell
# 進入項目目錄
cd c:\Users\Kin\Desktop\PolyU\Capstone_Project

# 添加遠程倉庫（替換 YOUR_USERNAME 為你的 GitHub 用戶名）
git remote add origin https://github.com/YOUR_USERNAME/python-learning-platform.git

# 推送代碼到 GitHub
git branch -M main
git push -u origin main
```

**重要提示：** 將 `YOUR_USERNAME` 替換為你的實際 GitHub 用戶名！

#### Step 3: 輸入認證信息

第一次推送時，Windows 會彈出 GitHub 認證窗口：
- 選擇 "Sign in with browser" 
- 在瀏覽器中登錄你的 GitHub 帳號
- 授權後回到終端

或者使用 Personal Access Token：
1. 訪問 https://github.com/settings/tokens
2. 生成新的 token (classic)
3. 勾選 `repo` 權限
4. 複製 token
5. 推送時用 token 作為密碼

### 方法 2：使用 GitHub Desktop（可視化）

1. **下載並安裝 GitHub Desktop**
   - https://desktop.github.com/

2. **打開 GitHub Desktop**
   - File → Add Local Repository
   - 選擇：`c:\Users\Kin\Desktop\PolyU\Capstone_Project`

3. **發布到 GitHub**
   - 點擊 "Publish repository"
   - 設置倉庫名稱和描述
   - 選擇 Public/Private
   - 點擊 "Publish Repository"

✅ 完成！

---

## 📋 推送完成後

訪問你的 GitHub 倉庫頁面：
```
https://github.com/YOUR_USERNAME/python-learning-platform
```

你應該看到：
- ✅ README.md 顯示在首頁
- ✅ 125 個文件
- ✅ 所有源代碼和文檔

---

## 🔄 後續更新代碼

當你修改代碼後，使用以下命令推送更新：

```powershell
# 查看修改的文件
git status

# 添加所有更改
git add .

# 提交更改
git commit -m "更新說明（例如：修復登錄功能）"

# 推送到 GitHub
git push
```

---

## 🎯 快速命令備忘

```powershell
# 查看狀態
git status

# 查看提交歷史
git log --oneline

# 查看遠程倉庫
git remote -v

# 拉取最新代碼（如果多人協作）
git pull

# 創建新分支
git checkout -b feature/new-feature

# 切換分支
git checkout main
```

---

## 🔐 安全提示

✅ **已排除的敏感文件**（不會上傳到 GitHub）：
- `.env` 文件（環境變量）
- `node_modules/`（Node 依賴）
- `venv/`（Python 虛擬環境）
- `__pycache__/`（Python 緩存）
- 數據庫文件

⚠️ **上傳前檢查**：
- 確保沒有硬編碼的密碼或 API 密鑰
- 檢查 `.gitignore` 是否正確配置
- 不要將生產環境的配置上傳

---

## 🆘 常見問題

### Q: 推送時提示 "remote origin already exists"
```powershell
# 刪除舊的 remote
git remote remove origin

# 重新添加
git remote add origin https://github.com/YOUR_USERNAME/your-repo.git
```

### Q: 推送失敗 "Authentication failed"
使用 Personal Access Token 代替密碼：
1. 生成 token: https://github.com/settings/tokens
2. 推送時使用 token 作為密碼

### Q: 想要修改上一次提交信息
```powershell
git commit --amend -m "新的提交信息"
git push --force  # 如果已經推送過
```

---

## 📖 下一步

1. **添加倉庫描述和標籤**
   - 在 GitHub 倉庫頁面點擊 "About" 旁的設置圖標
   - 添加網站、主題標籤（python, react, education, flask）

2. **設置 GitHub Pages**（可選）
   - 部署前端為靜態網站

3. **啟用 Issues 和 Discussions**
   - 方便追蹤問題和討論

4. **添加 LICENSE 文件**
   - 選擇合適的開源協議

---

**準備好了嗎？執行上面的命令開始上傳吧！** 🚀
