# Git 更新推送工作流程 🔄

## 📝 每次修改代碼後的標準流程

### 基本三步驟（最常用）

```powershell
# 1. 添加所有修改的文件
git add .

# 2. 提交更改（附上說明）
git commit -m "你的更新說明"

# 3. 推送到 GitHub
git push
```

就這麼簡單！✅

---

## 🎯 詳細步驟說明

### Step 1: 查看修改了什麼

```powershell
# 查看哪些文件被修改了
git status

# 查看具體修改內容
git diff
```

### Step 2: 添加要提交的文件

```powershell
# 方式 1：添加所有修改的文件（最常用）
git add .

# 方式 2：添加特定文件
git add backend/app.py
git add frontend/src/App.js

# 方式 3：添加某個目錄的所有文件
git add backend/
```

### Step 3: 提交更改

```powershell
# 基本提交
git commit -m "修復登錄功能的 bug"

# 詳細提交（多行說明）
git commit -m "添加用戶儀表板功能" -m "- 新增進度統計圖表" -m "- 優化數據加載性能"
```

### Step 4: 推送到 GitHub

```powershell
# 第一次推送（設置上游分支）
git push -u origin main

# 之後的推送（簡單命令）
git push
```

---

## 💡 提交信息最佳實踐

### 好的提交信息示例

```powershell
git commit -m "修復代碼編輯器無法保存的問題"
git commit -m "添加 AI 提示功能"
git commit -m "更新 README 文檔"
git commit -m "優化數據庫查詢性能"
git commit -m "修復 macOS 部署指南中的錯誤"
```

### 提交信息格式建議

```
<類型>: <簡短描述>

常見類型：
- feat: 新功能
- fix: 修復 bug
- docs: 文檔更新
- style: 代碼格式調整
- refactor: 重構代碼
- test: 測試相關
- chore: 構建/工具相關
```

示例：
```powershell
git commit -m "feat: 添加用戶註冊郵件驗證功能"
git commit -m "fix: 修復 Dashboard 數據不刷新的問題"
git commit -m "docs: 更新部署指南"
```

---

## 🔄 完整工作流程示例

### 場景 1：修改了前端代碼

```powershell
# 1. 查看改了什麼
git status

# 2. 添加修改
git add frontend/

# 3. 提交
git commit -m "優化前端界面樣式"

# 4. 推送
git push
```

### 場景 2：修改了多個文件

```powershell
# 查看狀態
git status

# 添加所有修改
git add .

# 提交（清楚說明做了什麼）
git commit -m "修復登錄 bug 並更新文檔"

# 推送
git push
```

### 場景 3：只修改了一個文件

```powershell
# 直接提交特定文件（合併 add 和 commit）
git commit backend/app.py -m "修復 API 認證問題"

# 推送
git push
```

---

## 📊 常用查看命令

```powershell
# 查看當前狀態
git status

# 查看修改內容
git diff

# 查看提交歷史
git log --oneline

# 查看最近 5 次提交
git log --oneline -5

# 查看遠程倉庫地址
git remote -v

# 查看當前分支
git branch
```

---

## 🆘 常見場景處理

### 忘記添加文件怎麼辦？

```powershell
# 已經 commit 但忘記添加某個文件
git add 遺漏的文件.py
git commit --amend --no-edit

# 如果已經 push 了
git add 遺漏的文件.py
git commit -m "補充遺漏的文件"
git push
```

### 提交信息寫錯了怎麼辦？

```powershell
# 還沒 push，修改最後一次提交信息
git commit --amend -m "正確的提交信息"

# 已經 push 了，只能新建一個提交
git commit -m "更正：正確的描述"
git push
```

### 想撤銷剛才的修改

```powershell
# 撤銷工作區的修改（還沒 add）
git checkout -- 文件名

# 撤銷已經 add 的文件
git reset HEAD 文件名

# 撤銷最後一次 commit（保留修改）
git reset --soft HEAD^

# 撤銷最後一次 commit（丟棄修改）
git reset --hard HEAD^
```

### 拉取遠程最新代碼（多人協作）

```powershell
# 拉取並合併
git pull

# 等同於
git fetch
git merge origin/main
```

---

## ⚡ 快速命令備忘錄

```powershell
# 【最常用】快速提交並推送
git add . ; git commit -m "更新說明" ; git push

# 查看狀態
git status

# 查看歷史
git log --oneline

# 拉取遠程更新
git pull

# 丟棄本地所有修改
git reset --hard HEAD
```

---

## 🎨 VSCode Git 圖形界面

如果你使用 VS Code，也可以用圖形界面：

1. **查看修改**：點擊左側 Source Control 圖標
2. **添加文件**：點擊文件旁的 `+` 號
3. **提交**：在 Message 框輸入說明，按 `Ctrl+Enter`
4. **推送**：點擊上方的 `...` → Push

---

## 📋 日常工作流程模板

```powershell
# === 開始工作 ===
cd c:\Users\Kin\Desktop\PolyU\Capstone_Project
git pull  # 拉取最新代碼

# === 修改代碼 ===
# ... 進行你的修改 ...

# === 提交更改 ===
git status              # 查看改了什麼
git add .              # 添加所有修改
git commit -m "描述"   # 提交
git push               # 推送到 GitHub

# 完成！✅
```

---

## 💾 保存此腳本為快捷命令

創建 `push.ps1` 文件（可選）：

```powershell
# push.ps1
param([string]$message = "Update code")

git add .
git commit -m $message
git push

Write-Host "✅ 推送完成！" -ForegroundColor Green
```

使用方式：
```powershell
.\push.ps1 "修復登錄 bug"
# 或
.\push.ps1  # 使用預設信息 "Update code"
```

---

記住這三個命令就夠了！🎯

```powershell
git add .
git commit -m "更新說明"
git push
```
