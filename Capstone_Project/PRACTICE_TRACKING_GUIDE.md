# Practice 追踪功能说明

## ✅ 已实现的功能

### 1. 自动追踪 Practice 完成状态
当学员完成 practice 练习时（输出与 expectedOutput 一致），系统会自动：
- 记录提交的代码
- 记录输出结果
- 记录完成时间
- 更新数据库中的 user_progress 表
- 标记该课程为已完成

### 2. 学习时间追踪
- 开始课程时自动开始计时（startSession）
- 切换课程或关闭页面时自动结束计时（endSession）
- 记录每次学习的时长到数据库

### 3. Dashboard 实时更新
Dashboard 会显示：
- **Overall Progress**: 完成的 practice 数 / 总共 28 个 practice
- **Chapter Progress**: 每个章节的完成百分比
  - 例如：Chapter 1 有 3 个课程，完成 1 个 = 33%
  - 例如：Chapter 2 有 3 个课程，完成 2 个 = 67%
- **Study Time**: 总学习时间和今日学习时间
- **Current Streak**: 连续学习天数

## 📊 数据库表结构

### user_progress 表
记录学员的课程进度：
- `user_id`: 用户ID
- `lesson_id`: 课程ID（如 "1.1", "2.3"）
- `lesson_type`: 类型（practice 或 test）
- `is_completed`: 是否完成
- `completed_at`: 完成时间

### practice_attempts 表
记录每次 practice 提交：
- `user_id`: 用户ID
- `lesson_id`: 课程ID
- `submitted_code`: 提交的代码
- `output`: 实际输出
- `expected_output`: 预期输出
- `is_correct`: 是否正确
- `time_spent`: 花费时间（秒）

### study_sessions 表
记录学习会话：
- `user_id`: 用户ID
- `lesson_id`: 课程ID
- `start_time`: 开始时间
- `end_time`: 结束时间
- `duration`: 持续时间（分钟）

## 🎯 工作流程

### 学员完成 Practice 的流程：

1. **选择课程**
   - 系统调用 `learningTracker.startSession(lessonId)`
   - 开始记录学习时间

2. **编写代码**
   - 学员在 CodeEditor 中编写代码
   - 点击 "Run Code" 执行

3. **检查输出**
   - 如果输出正确（与 expectedOutput 一致）：
     - 自动调用 `learningTracker.submitPractice()`
     - 数据保存到 `practice_attempts` 表
     - 更新 `user_progress` 表，标记为已完成
     - OutputPanel 显示绿色 ✓ 表示正确
     - 显示 "Next" 按钮进入下一课

4. **切换课程**
   - 系统调用 `learningTracker.endSession()`
   - 记录本次学习时长
   - 开始新的 session

## 📈 章节进度计算

章节进度由后端 API 自动计算：

```sql
SELECT 
    SPLIT_PART(lesson_id, '.', 1) as chapter,
    COUNT(*) as total,
    SUM(CASE WHEN is_completed THEN 1 ELSE 0 END) as completed,
    ROUND(100.0 * SUM(CASE WHEN is_completed THEN 1 ELSE 0 END) / COUNT(*), 0) as percentage
FROM user_progress
WHERE user_id = ? AND lesson_type = 'practice'
GROUP BY SPLIT_PART(lesson_id, '.', 1)
ORDER BY SPLIT_PART(lesson_id, '.', 1)::integer
```

示例：
- Chapter 1 有课程: 1.1, 1.2, 1.3
- 完成了 1.1
- 进度 = 1/3 = 33%

## 🧪 测试步骤

### 1. 启动服务器
```powershell
# 后端
cd "c:\Users\Kin\Desktop\PolyU\Capstone_Project\backend"
python api.py

# 前端
cd "c:\Users\Kin\Desktop\PolyU\Capstone_Project\frontend"
npm start
```

### 2. 测试 Practice 追踪
1. 打开浏览器访问 http://localhost:3000
2. 选择 Chapter 1 > 1.1 Printing
3. 运行 starter code（应该输出正确）
4. 检查控制台是否显示 "✅ Practice completed and tracked!"
5. 点击 Dashboard 查看进度更新

### 3. 验证数据库
```sql
-- 查看完成记录
SELECT * FROM user_progress WHERE user_id = 1 ORDER BY completed_at DESC;

-- 查看 practice 提交记录
SELECT * FROM practice_attempts WHERE user_id = 1 ORDER BY attempted_at DESC;

-- 查看学习时长
SELECT * FROM study_sessions WHERE user_id = 1 ORDER BY start_time DESC;
```

### 4. 检查 Dashboard
- Overall Progress 应该从 7% 增加到更高
- Chapter Progress 应该显示正确的百分比
- 如果完成多个课程，应该看到进度条增长

## 🔍 调试技巧

### 浏览器控制台
打开浏览器开发者工具（F12）查看：
- Network 标签：查看 API 请求是否成功
- Console 标签：查看日志消息
  - "✅ Practice completed and tracked!" - 成功追踪
  - "Failed to track practice" - 追踪失败

### 后端日志
后端终端会显示：
- "Dashboard called for user_id: 1"
- "Executing stats query..."
- "✅ Dashboard data prepared successfully"

### 常见问题

1. **Dashboard 没有更新**
   - 刷新页面重新获取数据
   - 检查后端是否在运行
   - 检查浏览器控制台是否有错误

2. **Practice 没有被追踪**
   - 确保输出完全匹配 expectedOutput（包括空格和换行）
   - 检查浏览器控制台的错误消息
   - 确认后端 API 正在运行

3. **数据库连接失败**
   - 检查 PostgreSQL 是否在运行
   - 验证 .env 文件中的密码是否正确
   - 测试连接：`psql -U postgres -d python_learning`

## 🎉 功能完成清单

- ✅ Practice 完成时自动追踪
- ✅ 记录代码、输出、完成时间
- ✅ 更新 user_progress 表
- ✅ 学习时间追踪（session start/end）
- ✅ Dashboard 显示实时进度
- ✅ 章节进度百分比计算
- ✅ 数据库集成完整

所有功能已经实现并正常工作！🚀
