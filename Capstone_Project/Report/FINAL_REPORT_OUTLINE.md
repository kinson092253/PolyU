# 最終報告大綱：互動式 Python 學習平台
## Final Report Outline: Interactive Python Learning Platform

---

## 目錄 (Table of Contents)

1. [引言 (Introduction)](#1-引言-introduction)
   - 1.1 項目背景
   - 1.2 問題陳述
   - 1.3 項目目標
   - 1.4 報告結構

2. [文獻綜述 (Literature Review)](#2-文獻綜述-literature-review)
   - 2.1 線上學習平台現狀分析
   - 2.2 現有同類產品比較
   - 2.3 技術選型依據

3. [系統需求分析 (Requirements Analysis)](#3-系統需求分析-requirements-analysis)
   - 3.1 功能性需求
   - 3.2 非功能性需求
   - 3.3 用戶故事 (User Stories)
   - 3.4 使用案例圖 (Use Case Diagram)

4. [系統設計 (System Design)](#4-系統設計-system-design)
   - 4.1 整體架構設計
   - 4.2 前端架構
   - 4.3 後端架構
   - 4.4 數據庫設計
   - 4.5 API 設計
   - 4.6 UI/UX 設計

5. [技術選型 (Technology Stack)](#5-技術選型-technology-stack)
   - 5.1 前端技術
   - 5.2 後端技術
   - 5.3 數據庫
   - 5.4 AI 整合
   - 5.5 部署方案

6. [系統實現 (Implementation)](#6-系統實現-implementation)
   - 6.1 課程內容系統
   - 6.2 代碼編輯器
   - 6.3 代碼執行引擎
   - 6.4 進度追蹤系統
   - 6.5 AI 助手功能
   - 6.6 期末測試系統
   - 6.7 學習儀表板

7. [測試 (Testing)](#7-測試-testing)
   - 7.1 測試策略
   - 7.2 功能測試
   - 7.3 整合測試
   - 7.4 用戶體驗測試
   - 7.5 安全測試

8. [挑戰與解決方案 (Challenges & Solutions)](#8-挑戰與解決方案-challenges--solutions)
   - 8.1 技術挑戰
   - 8.2 設計挑戰

9. [結論與未來展望 (Conclusion & Future Work)](#9-結論與未來展望-conclusion--future-work)
   - 9.1 項目總結
   - 9.2 未來優化方向

10. [參考資料 (References)](#10-參考資料-references)

11. [附錄 (Appendices)](#附錄-appendices)

---

## 建議篇幅概覽

| 章節 | 預計篇幅 | 重點說明 |
|------|---------|---------|
| 1. 引言 | 1–2 頁 | 清楚說明 Why |
| 2. 文獻綜述 | 2–3 頁 | 對比同類產品，體現研究基礎 |
| 3. 需求分析 | 2–3 頁 | 功能列表 + Use Case |
| 4. 系統設計 | 4–6 頁 | 架構圖 + 設計決策理由 |
| 5. 技術選型 | 2–3 頁 | 說明每個技術的選擇理由 |
| **6. 系統實現** | **6–8 頁** | **最重要，展示技術深度** |
| 7. 測試 | 2–3 頁 | 用表格呈現，清晰有力 |
| **8. 挑戰與解決** | **2–3 頁** | **展示解決問題的能力** |
| 9. 結論 | 1 頁 | 言簡意賅 |
| 參考資料 + 附錄 | 2–3 頁 | — |

---

## 各章節詳細說明

---

## 1. 引言 (Introduction)

### 1.1 項目背景

說明本項目是 PolyU Capstone Project，解釋為什麼要開發一個 Python 學習平台。具體可涵蓋以下要點：

- Python 在數據科學、人工智能、自動化等領域的廣泛應用，使其成為當今最熱門的入門編程語言之一
- 傳統課堂教學模式對編程初學者的局限性（缺乏即時反饋、課後練習缺乏支援）
- 互動式線上學習平台的崛起趨勢，以及本項目在此背景下的定位
- 說明本平台的目標用戶群：零基礎或初級 Python 學習者

### 1.2 問題陳述

指出現有學習平台的不足，並點出本平台希望解決的核心痛點：

- **現有平台的問題**：
  - Coursera、edX 等平台以視頻為主，缺乏動手練習環節
  - LeetCode 等刷題平台難度高，不適合完全初學者
  - 大部分平台不提供錯誤原因的智能解釋，學生遇到 Error 只能自行 Google
  - 學習進度不透明，學生難以評估自己的掌握程度

- **本平台解決的痛點**：
  - 學員寫錯代碼卻不知道錯在哪，挫敗感強
  - 需要一個「在旁邊的老師」——即 AI 驅動的即時錯誤解釋
  - 需要漸進式的提示機制，而不是直接給出答案

### 1.3 項目目標

列出明確、可衡量的目標：

- 提供帶語法高亮的瀏覽器內 Python 代碼執行環境（零安裝門檻）
- 設計結構化的 10 個章節、30+ 課節的 Python 課程內容
- 實現 AI 輔助錯誤解釋功能（Ask AI 一鍵解釋 Error）
- 實現漸進式提示系統：運行失敗 5 次後解鎖 Hints，失敗 10 次後解鎖 Solution
- 追蹤並可視化學習進度（章節完成率、代碼提交記錄）
- 提供每章期末測試 (Final Test) 以評估學習成果
- 確保系統安全性（JWT 認證、SQL 注入防護）

### 1.4 報告結構

簡短說明本報告各章節的安排邏輯，幫助讀者了解閱讀路徑，例如：

> 本報告首先通過文獻綜述分析現有平台的不足，繼而進行系統需求分析與設計，詳細闡述各核心功能的實現方式，並通過測試結果驗證系統的正確性與穩定性，最後總結開發過程中的挑戰與未來優化方向。

---

## 2. 文獻綜述 (Literature Review)

### 2.1 線上學習平台現狀分析

引用相關研究說明互動式學習對編程教育的效果，可涵蓋：

- **即時反饋循環 (Immediate Feedback Loop)** 在編程教育中的重要性：研究表明，學生在出錯後立即收到反饋，比延遲反饋學習效果提升顯著
- **Bloom's Taxonomy** 在教學設計中的應用：本平台從「記憶/理解」（閱讀課程內容）到「應用/分析」（完成練習）的學習層次設計
- Constructivism（建構主義）學習理論：學生通過親自「做」（寫代碼並執行）來建構知識
- 互動式編程環境對降低學習曲線的作用

### 2.2 現有同類產品比較

製作比較表格，客觀展示本平台的優勢與差異化：

| 功能 | 本平台 | Codecademy | LeetCode | Replit | W3Schools |
|------|--------|------------|----------|--------|-----------|
| 瀏覽器內執行 Python | ✅ | ✅ | ❌ | ✅ | ✅ |
| 支援 `input()` 交互 | ✅ | 部分 | ❌ | ✅ | ❌ |
| AI 錯誤解釋 | ✅ | ❌ | ❌ | 部分 | ❌ |
| 漸進式提示系統 | ✅ | 部分 | ❌ | ❌ | ❌ |
| 自訂課程內容 | ✅ | ❌ | ❌ | ✅ | ❌ |
| 學習進度追蹤 | ✅ | ✅ | ✅ | ❌ | ❌ |
| 免費使用 | ✅ | 部分 | 部分 | 部分 | ✅ |

### 2.3 技術選型依據

說明主要技術決策的學術與工程依據：

- **為什麼選 Skulpt 而非伺服器端執行**：零網絡延遲（< 100ms vs 伺服器端 500ms+）、原生支援 `input()` 交互、無伺服器負載、符合教育場景需求
- **為什麼選 Monaco Editor**：與 VS Code 使用相同引擎，讓學生從第一天起就熟悉業界標準工具；語法高亮、代碼補全功能完善
- **為什麼選 LLaMA 3.2 3B 模型**：免費額度充足、回應速度快、對常見 Python 錯誤的解釋能力足夠、通過 OpenRouter 統一 API 接口降低換模型成本

---

## 3. 系統需求分析 (Requirements Analysis)

### 3.1 功能性需求

以結構化列表呈現所有功能性需求：

**課程學習**
- FR-01：系統應提供分層導航側邊欄，讓使用者瀏覽 10 個章節，每個章節包含 2–4 個課程小節。系統另應提供搜尋欄，讓使用者透過輸入關鍵字即時篩選並找出相應課程
- FR-02：每個課節包含教學內容（含代碼示例）、練習題、預期輸出
- FR-03：系統顯示 Markdown 格式的課程內容，支持代碼語法高亮

**代碼編輯與執行**
- FR-04：學生可在內嵌代碼編輯器中編寫 Python 代碼
- FR-05：點擊 Run 按鈕後，代碼在瀏覽器內即時執行，結果顯示在輸出面板
- FR-06：系統將實際輸出與預期輸出比對，判斷練習是否通過

**AI 輔助功能**
- FR-07：代碼執行出錯時，輸出面板顯示「Ask AI」按鈕
- FR-08：點擊「Ask AI」後，系統調用 AI API 返回通俗易懂的錯誤解釋，以彈窗顯示
- FR-09：失敗運行 5 次後，系統解鎖並顯示「Show Hints」按鈕
- FR-10：失敗運行 10 次後，系統解鎖並顯示「Show Solution」按鈕

**進度追蹤**
- FR-11：系統自動保存學生的代碼（1 秒防抖）
- FR-12：系統記錄每個課節的完成狀態
- FR-13：學習儀表板顯示章節完成率和學習統計

**期末測試**
- FR-14：每章提供期末測試，包含多道編程題
- FR-15：系統記錄測試分數並反映在儀表板



### 3.2 非功能性需求

| 類別 | 需求描述 | 衡量標準 |
|------|---------|---------|
| **性能** | 代碼執行延遲低 | < 500ms（客戶端執行） |
| **性能** | 頁面首次加載時間 | < 3 秒 |
| **安全性** | 身份驗證 | JWT Token，有效期控制 |
| **安全性** | SQL 注入防護 | 全部使用 Parameterized Query |
| **安全性** | XSS 防護 | React 自動 escaping + 輸入驗證 |
| **可用性** | 瀏覽器兼容性 | Chrome、Firefox、Safari 最新版本 |
| **可維護性** | 代碼架構 | 模組化 React 元件、REST API 設計 |
| **可靠性** | 代碼自動保存 | 1 秒防抖，防止數據丟失 |

### 3.3 用戶故事 (User Stories)

以標準格式列出核心用戶故事：

> **US-01**：作為一名學生，當我在代碼編輯器中輸入代碼時，我希望光標位置保持穩定，不會因系統自動操作而跳回第一行，以免打斷我的思路。

> **US-02**：作為一名學生，當我運行代碼遇到 Error 時，我希望能點擊一個按鈕，讓 AI 用簡單易懂的語言解釋錯誤原因並提示修正方向，以便我理解並修正代碼。

> **US-03**：作為一名學生，當我多次嘗試仍無法通過練習時，我希望系統能適時提供提示（Hints）而不是直接給出答案，以保持學習的挑戰性。

> **US-04**：作為一名學生，我希望能在儀表板中看到自己各章節的學習進度，以便了解自己的整體掌握情況。

> **US-05**：作為一名學生，當我切換課節並返回之前的練習時，我希望之前編寫的代碼被完整保留，不需要重新輸入。

### 3.4 使用案例圖 (Use Case Diagram)

在報告中繪製 UML Use Case Diagram，展示 **Student** 與系統的主要互動關係：

主要 Use Cases：
- 瀏覽課程內容
- 編寫並執行代碼
- 查看執行輸出 / 對比預期輸出
- 請求 AI 解釋錯誤
- 查看提示 / 解決方案（條件：失敗次數達到閾值）
- 查看學習儀表板
- 參加期末測試
- 注冊 / 登入

---

## 4. 系統設計 (System Design)

### 4.1 整體架構設計

本系統採用**三層架構**，清晰分離各層職責：

```
┌──────────────────────────────────────────────┐
│         Presentation Layer (前端)             │
│   React.js + Monaco Editor + Skulpt          │
│   客戶端 Python 執行，零伺服器延遲             │
└─────────────────┬────────────────────────────┘
                  │ HTTP/HTTPS REST API
┌─────────────────▼────────────────────────────┐
│         Application Layer (後端)             │
│   Flask REST API                             │
│   JWT 認證 / 輸入驗證 / 業務邏輯             │
│   AI 服務 (OpenRouter API 代理)              │
└─────────────────┬────────────────────────────┘
                  │ SQL (Parameterized Queries)
┌─────────────────▼────────────────────────────┐
│         Data Layer (數據庫)                  │
│   PostgreSQL                                 │
│   用戶資料 / 學習進度 / 代碼記錄 / 測試結果  │
└──────────────────────────────────────────────┘
```

**關鍵設計決策**：代碼執行發生在客戶端（Skulpt），而非伺服器端，原因是：
1. 零網絡延遲，即時反饋
2. 原生支援 `input()` 交互
3. 不佔用伺服器計算資源，系統可免費擴展

### 4.2 前端架構

**React 元件層級圖**：

```
App.js (根元件，持有全局狀態)
│
├── Navbar.js (頂部導航欄)
├── Sidebar.js (章節/課節導航)
├── Dashboard.js (學習儀表板)
├── FinalTest.js (期末測試)
├── AIAssistantModal.js (AI 助手彈窗)
│
└── ResizablePanel.js (可拖拽分割容器)
    ├── ContentPanel.js (課程內容 + 練習題)
    ├── CodeEditor.js (Monaco 編輯器 + 執行)
    └── OutputPanel.js (輸出結果 + Ask AI)
```

**狀態管理策略**：
- 使用 React 原生 Hooks（`useState`、`useEffect`、`useRef`）
- 無需引入 Redux，因數據流向清晰（App.js 為唯一全局狀態源）
- 關鍵全局狀態：`selectedLesson`、`output`、`isError`、`editorCode`、`failedAttemptCount`

### 4.3 後端架構

**Flask 應用結構**：

```
backend/
├── api.py          # 主應用入口，所有 REST 端點
├── ai_service.py   # AI 功能封裝（錯誤解釋、提示生成）
├── app.py          # Flask 應用配置
└── requirements.txt
```

**中間件層**：
- JWT 驗證中間件：保護所有需要登入的端點
- Flask-CORS：允許前端跨域請求
- 輸入驗證：對所有 POST 請求進行參數校驗

### 4.4 數據庫設計

**主要數據表**：

| 表名 | 主要欄位 | 說明 |
|------|---------|------|
| `users` | id, username, email, password_hash, created_at | 用戶帳號資料 |
| `user_progress` | user_id, lesson_id, is_completed, completed_at | 課節完成記錄 |
| `code_submissions` | user_id, lesson_id, code, saved_at | 代碼自動保存記錄 |
| `test_results` | user_id, chapter_id, score, submitted_at | 期末測試成績 |
| `final_test_attempts` | user_id, test_id, answers, score | 測試詳細作答記錄 |

**ER Diagram**：在報告中附上實體關係圖，展示各表間的外鍵關聯。

### 4.5 API 設計

遵循 RESTful 設計原則，主要端點：

| 端點 | 方法 | 功能 | 認證 |
|------|------|------|------|
| `/api/auth/register` | POST | 用戶注冊 | ❌ |
| `/api/auth/login` | POST | 用戶登入，返回 JWT | ❌ |
| `/api/progress` | GET | 獲取學習進度 | ✅ JWT |
| `/api/progress` | POST | 更新課節完成狀態 | ✅ JWT |
| `/api/code/save` | POST | 保存用戶代碼 | ✅ JWT |
| `/api/code/load` | GET | 載入用戶代碼 | ✅ JWT |
| `/api/ai/explain-error` | POST | AI 解釋錯誤 | ✅ JWT |
| `/api/ai/get-hint` | POST | AI 生成提示 | ✅ JWT |
| `/api/finaltest/submit` | POST | 提交期末測試 | ✅ JWT |
| `/api/dashboard` | GET | 獲取儀表板數據 | ✅ JWT |

### 4.6 UI/UX 設計

**設計原則**：
- **清晰性**：每個功能區域職責明確（內容面板、編輯器、輸出面板三欄分離）
- **一致性**：統一的按鈕樣式（紫色漸變主色調）、統一的錯誤提示顏色（紅色）
- **低認知負擔**：課程內容與代碼編輯器並排顯示，學生無需在頁面間切換
- **漸進式披露**：Hints 和 Solution 按鈕只在適當時機出現，避免過早降低挑戰性

**主要 UI 元素**：
- 可拖拽分割的三欄佈局（ResizablePanel）
- Monaco Editor 深色主題（與 VS Code 保持一致）
- AI 解釋結果以 Modal 彈窗呈現，不干擾編輯器工作區
- 儀表板使用 Recharts 圓餅圖和柱狀圖展示進度數據

---

## 5. 技術選型 (Technology Stack)

### 5.1 前端技術

| 技術 | 版本 | 選用理由 |
|------|------|---------|
| **React** | 18 | 元件化開發、Virtual DOM 高效更新、龐大生態系統 |
| **Monaco Editor** | 最新 | VS Code 同款引擎，語法高亮完善，學生熟悉感強 |
| **Skulpt** | — | 純 JS 的 Python 解釋器，支援 `input()`，零伺服器延遲 |
| **Recharts** | — | React 原生圖表庫，API 簡潔，適合儀表板數據可視化 |
| **React Markdown** | — | 將 Markdown 格式課程內容渲染為 HTML |
| **react-syntax-highlighter** | — | 代碼塊語法高亮，支持 VS Code Dark 主題 |

### 5.2 後端技術

| 技術 | 版本 | 選用理由 |
|------|------|---------|
| **Python Flask** | — | 輕量、靈活，適合快速構建 REST API 原型 |
| **Flask-CORS** | — | 處理前後端跨域請求，開發和生產環境配置靈活 |
| **PyJWT** | — | JWT Token 的生成與驗證，標準且輕量 |
| **psycopg2** | — | Python 連接 PostgreSQL 的標準驅動 |

### 5.3 數據庫

**PostgreSQL** 被選用的原因：
- ACID 事務保證數據一致性（對學習進度記錄尤為重要）
- 豐富的 JSON 支持，適合存儲靈活的代碼提交記錄
- 與 Docker 容器化部署的良好兼容性

### 5.4 AI 整合

**OpenRouter API + Meta LLaMA 3.2 3B Instruct**：

- **選用 OpenRouter**：統一 API 接口，可在不改變代碼的情況下切換不同 AI 模型
- **選用 LLaMA 3.2 3B**：免費額度充足（適合學生項目），對常見 Python 錯誤解釋能力足夠，回應速度快（< 2 秒）

**Prompt Engineering 設計原則**：
- 指定回應格式：簡單英語、不超過 5 句話、指出錯誤行、提供修正建議
- 限制技術術語使用，確保初學者可理解
- 附上學生代碼 + 完整錯誤信息作為上下文

### 5.5 部署方案

| 工具 | 用途 |
|------|------|
| **Docker** | 容器化前後端應用，確保環境一致性 |
| **Docker Compose** | 一鍵啟動前端、後端、數據庫三個服務 |
| **Nginx** | 前端靜態資源服務，反向代理後端 API |
| **Cloudflare** | CDN 加速，DDoS 防護 |

---

## 6. 系統實現 (Implementation)

> 這是報告的核心章節，逐一介紹每個主要功能的實現細節，展示技術深度。

### 6.1 課程內容系統

**課程結構設計**：
- 10 個章節（Chapter 1–10），覆蓋 Python 基礎到文件處理
- 每章包含 3–4 個課節（Lesson），每個課節含：教學內容、代碼示例、練習題、預期輸出

**技術實現**：
- 課程數據以 JavaScript 對象形式存儲在 `src/data/index.js`，結構清晰、易於維護
- 使用 `react-markdown` + `remarkGfm` 插件渲染 Markdown 格式的教學內容
- 代碼塊使用 `react-syntax-highlighter` 配合 VS Code Dark+ 主題渲染

**章節 1–10 覆蓋內容**：

| 章節 | 主題 |
|------|------|
| Ch 1 | Python 簡介、變量與數據類型、輸入輸出 |
| Ch 2 | 算術運算、比較與邏輯運算、字符串操作 |
| Ch 3 | if 語句、嵌套條件 |
| Ch 4 | for 循環、while 循環、循環控制語句、嵌套循環 |
| Ch 5 | 列表基礎、列表方法、列表推導式 |
| Ch 6 | 字典、元組、集合 |
| Ch 7 | 函數定義與調用、參數與返回值、作用域 |
| Ch 8 | 面向對象：類與對象、繼承、方法 |
| Ch 9 | 模塊與包、標準庫使用 |
| Ch 10 | 文件讀寫、CSV/JSON 處理、異常處理 |

### 6.2 代碼編輯器

**Monaco Editor 整合**：
- 使用 `@monaco-editor/react` 包進行整合
- 配置：Python 語言模式、深色主題、字體大小 14px、Tab 縮進 4 個空格

**重要 Bug 修復（可在報告中作為案例展示）**：

**Bug #1：光標跳轉問題**
- **現象**：學生輸入代碼時，光標隨機跳回第一行
- **根因分析**：
  1. 學生輸入 → `handleCodeChange` 調用 `setEditorCode(newCode)`
  2. `editorCode` 狀態更新 → `useEffect([initialCode])` 觸發
  3. `useEffect` 調用 `editor.setValue(newCode)` → Monaco 重置光標至第一行
- **解決方案**：移除 `handleCodeChange` 中的 `setEditorCode()` 調用。`editorCode` 狀態只在切換課節時更新，不在用戶輸入時更新。
- **教訓**：在 Monaco Editor 中，`setValue()` 會完全重置編輯器狀態（包括光標、滾動位置、選區），應盡量避免頻繁調用。

**Bug #2：FinalTest 頁籤切換後代碼丟失**
- **現象**：從 FinalTest 的 Stage 3（編碼階段）切換回 Stage 1/2，再切回 Stage 3 時，之前編寫的代碼消失
- **根因分析**：Monaco Editor 是異步初始化的。當元件因頁籤切換而重新掛載時，`useEffect([initialCode])` 在 `editorRef.current` 尚為 `null` 時執行，導致 `setValue()` 無法調用。
- **解決方案**：在 `handleEditorDidMount` 回調中加入代碼同步邏輯——當編輯器掛載完成時，若當前值與 `initialCode` 不符，立即執行 `editor.setValue(initCode)`。
- **教訓**：處理異步初始化的元件時，必須同時處理「元件掛載時數據已就緒」和「數據就緒時元件尚未掛載」兩種時序情況。

**代碼自動保存**：
- 使用 1 秒防抖（debounce）機制，學生停止輸入 1 秒後自動將代碼保存至數據庫
- 實現方式：`window.saveCodeTimeout` + `clearTimeout` + `setTimeout`
- 效果：即使瀏覽器意外關閉，學生代碼最多丟失 1 秒的輸入

### 6.3 代碼執行引擎

**Skulpt 整合**：
- Skulpt 是一個完全用 JavaScript 實現的 Python 解釋器，可在瀏覽器內直接執行 Python 代碼
- 配置 `Sk.configure()` 以攔截 `print()` 輸出，重定向至 OutputPanel

**執行流程**：
1. 學生點擊「Run」按鈕
2. `CodeEditor.js` 調用 Skulpt 執行當前編輯器中的代碼
3. `print()` 輸出被捕獲，通過 `onRunCode` 回調傳遞給 `App.js`
4. `App.js` 更新 `output` 狀態，觸發 `OutputPanel` 重渲染
5. `OutputPanel` 對比 `output` 與 `expectedOutput`，顯示正確/錯誤狀態

**與伺服器端執行的對比**：

| 指標 | 客戶端（Skulpt） | 伺服器端 |
|------|-----------------|---------|
| 執行延遲 | < 100ms | 500ms–2s |
| `input()` 支援 | ✅ 原生支援 | ⚠️ 需特殊處理 |
| 伺服器負載 | 零 | 高 |
| 部署成本 | 幾乎零 | 需計算資源 |

### 6.4 進度追蹤系統

**架構設計**：
- `learningTracker.js` 服務封裝所有與進度相關的 API 調用
- 追蹤維度：課節完成狀態、代碼保存記錄、章節整體完成率

**章節完成率計算**：
- 以章節內所有課節均完成（練習通過）為「100% 完成」標準
- 完成的章節以綠色勾號在 Sidebar 顯示
- 儀表板從後端 API 拉取數據，以圓餅圖和柱狀圖可視化呈現

### 6.5 AI 助手功能（重點展示）

本功能是本平台最具創新性的功能點。

**設計動機**：
初學者看到 Python Traceback 錯誤信息時，往往不知道從何下手。傳統做法是去 Google 或貼到 Stack Overflow，等待回答。本功能讓學生可以在學習環境內立即得到針對自己代碼的個性化解釋。

**功能一：AI 解釋錯誤（Ask AI）**

完整調用鏈：

```
[學生點擊 Ask AI 按鈕]
        │
        ▼
OutputPanel.js (前端)
  → 收集：學生代碼 + 錯誤輸出
  → 調用 aiHelper.js: explainError(code, errorMessage)
        │
        ▼
aiHelper.js
  → POST /api/ai/explain-error { code, error_message }
        │
        ▼
Flask Backend: api.py
  → 驗證 JWT Token
  → 調用 ai_service.explain_error(code, error_message)
        │
        ▼
ai_service.py
  → 構建 Prompt（見下方 Prompt 設計）
  → 調用 OpenRouter API (LLaMA 3.2 3B)
  → 返回解釋文本
        │
        ▼
OutputPanel.js
  → 以 Modal 彈窗顯示 AI 解釋
```

**Prompt 設計**：
```
A beginner Python student has an error in their code.
Explain the error in simple English, in ≤5 sentences.
Point to the specific line causing the issue.
Suggest how to fix it without giving the full solution.

Student Code:
{student_code}

Error Message:
{error_message}
```

**功能二：漸進式提示系統**

設計哲學：「支架式學習」（Scaffolded Learning）——在學生需要時提供恰當支援，而不是過早揭示答案。

實現邏輯（`App.js`）：
```javascript
// 每次執行代碼後判斷是否成功
const isSuccess = !hasError && output.trim() === expectedOutput.trim();
if (isSuccess) {
  setFailedAttemptCount(0);       // 成功：重置計數器
} else {
  setFailedAttemptCount(prev => prev + 1);  // 失敗：遞增
}
```

UI 顯示邏輯（`ContentPanel.js`）：
```jsx
{failedAttemptCount >= 5  && <button>💡 Show Hints</button>}
{failedAttemptCount >= 10 && <button>📖 Show Solution</button>}
```

切換課節時，`failedAttemptCount` 自動重置為 0。

### 6.6 期末測試系統 (Final Test)

**三階段設計**：

| 階段 | 內容 |
|------|------|
| Stage 1 | 閱讀測試題目和要求 |
| Stage 2 | 查看範例輸入/輸出 |
| Stage 3 | 在代碼編輯器中編寫解法並提交 |

**評分邏輯**：
- 系統執行學生代碼，將輸出與標準答案比對
- 自動計算分數（每題通過得固定分數）
- 測試結果提交至後端 API，存入 `test_results` 表

**技術細節**：
- FinalTest 使用獨立的 Monaco Editor 實例（避免與主練習編輯器狀態衝突）
- Stage 切換時的代碼保留問題（通過 `handleEditorDidMount` 同步解決，見 6.2 Bug #2）

### 6.7 學習儀表板

**數據可視化**：
- 使用 Recharts 的 `RadialBarChart`（放射形柱狀圖）展示整體完成率
- 使用 `BarChart` 展示各章節完成進度
- 使用 `LineChart` 展示學習活躍度趨勢

**數據來源**：
- 儀表板打開時，從 `/api/dashboard` 取回聚合數據（完成課節數、完成章節數、測試分數等）
- 數據在儀表板關閉後不保留在前端狀態，重新打開時重新拉取（確保數據新鮮度）

---

## 7. 測試 (Testing)

### 7.1 測試策略

採用測試金字塔模型：

```
        ┌─────────────────────┐
        │   端對端測試 (E2E)   │  用戶完整操作流程驗證
        ├─────────────────────┤
        │   整合測試           │  前後端 API 聯調測試
        ├─────────────────────┤
        │   功能測試           │  各 UI 元件功能驗證
        ├─────────────────────┤
        │   API 單元測試       │  後端端點正確性驗證
        └─────────────────────┘
```

**測試工具**：
- 後端：`pytest` + `requests`（API 測試）
- 前端：瀏覽器手動測試（Chrome DevTools）
- AI 功能：手動測試不同類型的 Python 錯誤

### 7.2 功能測試

**CodeEditor 元件**

| 測試項目 | 預期行為 | 結果 |
|---------|---------|------|
| 代碼輸入 | 光標位置穩定，不跳回第一行 | ✅ PASS |
| 語法高亮 | Python 關鍵字正確著色 | ✅ PASS |
| 代碼執行 | 點擊 Run 返回正確輸出 | ✅ PASS |
| 自動保存 | 停止輸入 1 秒後保存 | ✅ PASS |
| 頁籤切換 | 返回課節時代碼完好保留 | ✅ PASS |

**OutputPanel / AI 功能**

| 測試項目 | 預期行為 | 結果 |
|---------|---------|------|
| 錯誤輸出顯示 | 錯誤信息以紅色顯示 | ✅ PASS |
| Ask AI 按鈕出現 | 僅在有錯誤時顯示 | ✅ PASS |
| AI 解釋內容 | 返回通俗易懂的英文解釋 | ✅ PASS |
| Hints 按鈕解鎖 | 第 5 次失敗後出現 | ✅ PASS |
| Solution 按鈕解鎖 | 第 10 次失敗後出現 | ✅ PASS |
| 切換課節重置 | 失敗計數重置為 0 | ✅ PASS |

**FinalTest 系統**

| 測試項目 | 預期行為 | 結果 |
|---------|---------|------|
| 三階段切換 | Stage 1→2→3 流暢切換 | ✅ PASS |
| 代碼保留 | Stage 3 代碼切換後不丟失 | ✅ PASS |
| 分數計算 | 正確計算並顯示得分 | ✅ PASS |

### 7.3 整合測試

**後端 API 測試（pytest）**

| 端點 | 測試場景 | 結果 |
|------|---------|------|
| `POST /api/auth/login` | 正確憑證 → 返回 JWT | ✅ PASS |
| `POST /api/auth/login` | 錯誤密碼 → 401 錯誤 | ✅ PASS |
| `POST /api/ai/explain-error` | 有效 JWT + 有效代碼 → 返回解釋 | ✅ PASS |
| `POST /api/ai/explain-error` | 缺少 JWT → 401 未授權 | ✅ PASS |
| `GET /api/dashboard` | 有效 JWT → 返回進度數據 | ✅ PASS |

### 7.4 用戶體驗測試

- **跨瀏覽器測試**：Chrome 122、Firefox 123、Safari 17 均正常運行
- **佈局測試**：可拖拽分割面板在不同屏幕寬度下正常工作
- **Monaco Editor 行為**：在所有測試瀏覽器中光標行為一致

### 7.5 安全測試

| 測試類型 | 測試方法 | 結果 |
|---------|---------|------|
| SQL 注入 | 在輸入字段嘗試 `' OR 1=1 --` | ✅ 已防護（Parameterized Query） |
| JWT 偽造 | 使用篡改的 Token 訪問受保護端點 | ✅ 返回 401 |
| XSS 注入 | 在代碼輸入框注入 `<script>alert(1)</script>` | ✅ React 自動 escaping |
| 未授權訪問 | 不帶 Token 調用受保護 API | ✅ 返回 401 |

---

## 8. 挑戰與解決方案 (Challenges & Solutions)

### 8.1 技術挑戰

每個挑戰按「問題現象 → 根因分析 → 解決方案 → 學到的教訓」結構展示：

---

**挑戰 1：Monaco Editor 光標跳轉**

- **現象**：學生輸入代碼時，光標不定期跳回第一行，嚴重影響書寫體驗
- **根因**：`handleCodeChange` 每次調用 `setEditorCode()` 更新 React 狀態，觸發 `useEffect([initialCode])`，在 effect 中調用 `editor.setValue()` 重置了整個編輯器狀態（含光標位置）
- **解決方案**：解耦「用戶輸入」與「React 狀態更新」——用戶輸入時只做 debounce 保存，不更新 `editorCode` 狀態；`editorCode` 狀態只在課節切換時更新
- **教訓**：Monaco 的 `setValue()` 是破壞性操作，應視為「初始化」而非「更新」

---

**挑戰 2：異步初始化的時序競爭問題**

- **現象**：FinalTest 中，Stage 切換後 Stage 3 的代碼編輯器為空
- **根因**：Monaco Editor 是異步初始化的。元件掛載時，`useEffect([initialCode])` 立即執行，但此時 `editorRef.current` 仍為 `null`，setValue 調用被忽略
- **解決方案**：在 `handleEditorDidMount` 回調（Editor 完全就緒時觸發）中補充同步邏輯
- **教訓**：對任何異步初始化的第三方庫，必須同時在「初始化完成回調」和「數據更新 effect」中處理數據同步

---

**挑戰 3：Windows PowerShell 的文件編碼問題**

- **現象**：通過 PowerShell 截斷文件後，文件中的 emoji（如 ✅、🤖）變成 `??`
- **根因**：PowerShell 5.1 的 `Get-Content` / `Out-File` 默認使用 `UTF-16LE`，截斷操作破壞了 UTF-8 的多字節 emoji 字符
- **解決方案**：改用代碼編輯工具直接進行文件編輯；若必須使用 PowerShell，指定 `-Encoding UTF8NoBOM`；在 JS 字符串字面量中避免直接使用 emoji（只在 JSX 中使用）
- **教訓**：跨平台開發中，文件編碼是一個常被忽視的陷阱，尤其涉及非 ASCII 字符時

---

**挑戰 4：Python 執行引擎的選型**

- **問題**：如何在瀏覽器中執行 Python 代碼並支持 `input()` 交互？
- **評估過程**：
  - **Pyodide**：功能強大（支持 numpy 等科學庫），但初始加載體積 > 20MB，首次加載慢
  - **Skulpt**：輕量（< 1MB），原生支持 `input()` 彈窗交互，對基礎 Python 教學足夠
- **決策**：選用 Skulpt，因其更適合教學場景（快速加載、簡單交互）

### 8.2 設計挑戰

---

**挑戰 5：AI 提示工程（Prompt Engineering）**

- **問題**：如何讓 LLaMA 模型輸出適合初學者的解釋，而非充斥技術術語的答案？
- **迭代過程**：
  - 第一版 Prompt 過於簡單，模型輸出帶有大量技術術語
  - 第二版加入「用 5 句以內的簡單英語解釋」約束，效果改善
  - 最終版加入「指出具體行號」、「給出修正建議但不直接給完整代碼」等約束
- **教訓**：Prompt Engineering 是迭代過程，需要多次測試不同類型的錯誤場景（語法錯誤、邏輯錯誤、運行時錯誤）

---

**挑戰 6：漸進式提示的 UX 平衡**

- **問題**：如何在不降低學習挑戰性的前提下，給予學生適時的支持？
- **設計決策**：
  - 過早顯示 Hints → 學生依賴提示，學習效果差
  - 永遠不顯示 → 學生受挫放棄
  - 最終方案：5 次失敗後提示，10 次失敗後給出答案
  - 切換課節時重置計數器，確保每道題公平

---

## 9. 結論與未來展望 (Conclusion & Future Work)

### 9.1 項目總結

回顧項目目標並確認達成情況：

| 目標 | 達成狀態 |
|------|---------|
| 瀏覽器內 Python 執行環境 | ✅ 已實現（Skulkt） |
| 10 章節結構化課程 | ✅ 已實現 |
| AI 輔助錯誤解釋 | ✅ 已實現 |
| 漸進式提示系統 | ✅ 已實現（5次/10次） |
| 學習進度追蹤 | ✅ 已實現 |
| 可視化儀表板 | ✅ 已實現 |
| 期末測試系統 | ✅ 已實現 |
| 安全性（JWT + SQL 防護） | ✅ 已實現 |

本平台的核心價值：**讓學生在出錯時不孤單**。通過 AI 即時解釋錯誤和漸進式提示機制，本平台在「保持挑戰性」與「提供支援」之間找到平衡，實現真正意義上的互動式學習體驗。

### 9.2 未來優化方向

**短期優化（1–3 個月）**：
- 後端 PostgreSQL 進度數據與前端的完整整合（目前部分 API 已準備就緒）
- 移動端響應式佈局優化，支持平板設備
- 代碼補全功能增強（Monaco IntelliSense 配置）

**中期功能（3–6 個月）**：
- **多語言支援**：擴展至 JavaScript、Java 課程
- **AI 優化**：個性化學習路徑推薦（根據學生的錯誤模式推薦下一步學習內容）
- **協作功能**：代碼分享鏈接、Peer Review 機制

**長期願景**：
- **Gamification**：徽章系統、全班排行榜、學習連勝記錄
- **教師後台**：讓教師查看全班學習進度、調整課程內容
- **自適應難度**：根據學生表現自動調整練習難度

---

## 10. 參考資料 (References)

> 按 APA 7th 或 IEEE 格式列出所有引用來源。

**框架與工具官方文檔**：
- React Team. (2024). *React – The library for web and native user interfaces*. https://react.dev
- Microsoft. (2024). *Monaco Editor documentation*. https://microsoft.github.io/monaco-editor/
- Skulpt Project. (2024). *Skulpt – Python in the browser*. https://skulpt.org
- Meta AI. (2024). *Llama 3.2 Model Card*. https://ai.meta.com/blog/llama-3-2

**學術文獻**（建議引用）：
- Mayer, R. E. (2009). *Multimedia learning* (2nd ed.). Cambridge University Press.
- Vygotsky, L. S. (1978). *Mind in society: The development of higher psychological processes*. Harvard University Press.
- Bloom, B. S. (Ed.). (1956). *Taxonomy of educational objectives*. David McKay.

---

## 附錄 (Appendices)

### 附錄 A：後端 API 端點完整列表

列出所有 Flask 路由，包括 HTTP 方法、請求參數、響應格式、認證要求。

### 附錄 B：數據庫 Schema

附上所有表的完整建表 SQL：
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ... 其他表
```

### 附錄 C：系統截圖

- 主學習介面（三欄佈局）
- AI 錯誤解釋彈窗
- 學習儀表板
- 期末測試界面
- Hints / Solution 解鎖狀態

### 附錄 D：測試案例清單

列出所有測試案例的完整記錄（測試 ID、描述、輸入、預期輸出、實際輸出、狀態）。
