# Chapter Progress 功能实现说明

## 功能需求
- X轴显示所有章节（Ch 1 ~ Ch 10）
- Y轴显示百分比（0-100%）
- 根据每个章节中的课程数量动态计算完成百分比

## 实现方式

### 数据计算逻辑

对于每个章节，计算方式为：

```
完成百分比 = (已完成课程数 / 该章节总课程数) × 100%
```

#### 示例：

1. **Chapter 1** 有 3 个课程
   - 完成 0 个 → 0%
   - 完成 1 个 → 33%
   - 完成 2 个 → 67%
   - 完成 3 个 → 100%

2. **Chapter 4** 有 4 个课程
   - 完成 0 个 → 0%
   - 完成 1 个 → 25%
   - 完成 2 个 → 50%
   - 完成 3 个 → 75%
   - 完成 4 个 → 100%

### 后端实现 (api.py)

修改了 `/api/dashboard/<user_id>` 端点的章节进度查询逻辑：

1. **第一步**：获取所有章节的总课程数
   - 查询数据库中存在的所有课程（lesson_id）
   - 按章节号分组统计总数
   
2. **第二步**：获取用户已完成的课程数
   - 查询用户完成的 practice 课程
   - 按章节号分组统计完成数

3. **第三步**：计算每个章节的完成百分比
   - 遍历所有 10 个章节（1-10）
   - 对于每个章节计算：`(completed / total) × 100%`
   - 如果该章节没有课程或用户还未开始，显示 0%

### 返回数据格式

```json
{
  "chapterProgress": [
    {
      "chapter": "Ch 1",
      "completed": 1,
      "total": 3,
      "percentage": 33
    },
    {
      "chapter": "Ch 2",
      "completed": 0,
      "total": 2,
      "percentage": 0
    },
    ...
    {
      "chapter": "Ch 10",
      "completed": 0,
      "total": 1,
      "percentage": 0
    }
  ]
}
```

### 前端实现 (Dashboard.js)

前端代码已正确配置：

```javascript
<BarChart data={chapterProgress}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="chapter" />        {/* X轴：Ch 1, Ch 2, ... Ch 10 */}
  <YAxis />                          {/* Y轴：0-100% */}
  <Tooltip />
  <Legend />
  <Bar dataKey="percentage" fill="#667eea" />  {/* 显示百分比 */}
</BarChart>
```

## 修改的文件

1. **c:\Users\Kin\Desktop\PolyU\Capstone_Project\backend\api.py**
   - 行 70-97：重新设计了章节进度查询和计算逻辑

## 测试方法

1. 启动后端：
   ```bash
   cd Capstone_Project/backend
   python api.py
   ```

2. 启动前端：
   ```bash
   cd Capstone_Project/frontend
   npm start
   ```

3. 访问 Dashboard，应该看到：
   - X轴显示 Ch 1 到 Ch 10 的所有章节
   - 每个柱子的高度代表该章节的完成百分比
   - 完成课程后，对应章节的百分比会更新

## 关键特性

✅ 显示所有10个章节（即使没有课程或未开始）  
✅ 动态计算百分比（基于课程数量）  
✅ 自动适应不同章节的课程数量  
✅ 支持部分完成显示（如1个课程中完成部分）  
✅ 前端实时更新显示
