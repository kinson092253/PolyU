# Dashboard API Documentation

## 数据库连接配置

### Backend环境变量设置 (`.env`)
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=python_learning
DB_USER=your_username
DB_PASSWORD=your_password
```

## API Endpoints

### 1. 获取用户Dashboard数据
**GET** `/api/dashboard/:userId`

**响应示例:**
```json
{
  "stats": {
    "overallProgress": 35,
    "practicesCompleted": 10,
    "totalPractices": 28,
    "testsPassed": 8,
    "totalTests": 12,
    "studyTimeToday": 120,
    "totalStudyTime": 390,
    "currentStreak": 5,
    "achievements": ["🏆", "🎯", "⭐", "🔥"]
  },
  "chapterProgress": [
    { "chapter": "Ch 1", "completed": 3, "total": 3, "percentage": 100 },
    { "chapter": "Ch 2", "completed": 2, "total": 3, "percentage": 67 }
  ],
  "weeklyStudyTime": [
    { "day": "Mon", "minutes": 45 },
    { "day": "Tue", "minutes": 60 }
  ],
  "weakPoints": [
    { "topic": "Lists Methods", "accuracy": 55, "attempts": 8 }
  ]
}
```

### 2. 记录练习提交
**POST** `/api/practice/submit`

**请求体:**
```json
{
  "userId": 1,
  "lessonId": "5.2",
  "submittedCode": "print('Hello')",
  "output": "Hello",
  "expectedOutput": "Hello",
  "isCorrect": true,
  "timeSpent": 120
}
```

### 3. 记录测验结果
**POST** `/api/test/submit`

**请求体:**
```json
{
  "userId": 1,
  "lessonId": "5.2",
  "selectedAnswer": 0,
  "correctAnswer": 0,
  "isCorrect": true
}
```

### 4. 记录学习时长
**POST** `/api/session/track`

**请求体:**
```json
{
  "userId": 1,
  "lessonId": "5.2",
  "startTime": "2026-01-11T10:00:00Z",
  "endTime": "2026-01-11T10:30:00Z",
  "duration": 30
}
```

### 5. 获取用户成就
**GET** `/api/achievements/:userId`

**响应示例:**
```json
{
  "earned": [
    {
      "achievementId": 1,
      "name": "First Chapter",
      "icon": "🏆",
      "earnedAt": "2026-01-10T15:30:00Z"
    }
  ],
  "available": [
    {
      "achievementId": 5,
      "name": "All Tests Passed",
      "icon": "💎",
      "progress": 8,
      "requirement": 12
    }
  ]
}
```

## Flask Backend 实现示例

### app.py 添加以下路由:

```python
from flask import Flask, jsonify, request
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime, timedelta

# Database connection
def get_db_connection():
    return psycopg2.connect(
        host=os.getenv('DB_HOST'),
        port=os.getenv('DB_PORT'),
        database=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD')
    )

@app.route('/api/dashboard/<int:user_id>', methods=['GET'])
def get_dashboard(user_id):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    # 获取统计数据
    cur.execute("""
        SELECT * FROM user_stats_summary WHERE user_id = %s
    """, (user_id,))
    stats = cur.fetchone()
    
    # 获取章节进度
    cur.execute("""
        SELECT * FROM chapter_completion_rates 
        WHERE user_id = %s 
        ORDER BY chapter_number
    """, (user_id,))
    chapter_progress = cur.fetchall()
    
    # 获取本周学习时长
    cur.execute("""
        SELECT 
            TO_CHAR(session_date, 'Dy') as day,
            SUM(duration) as minutes
        FROM study_sessions
        WHERE user_id = %s 
        AND session_date >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY session_date, day
        ORDER BY session_date
    """, (user_id,))
    weekly_study = cur.fetchall()
    
    # 获取薄弱环节
    cur.execute("""
        SELECT 
            lesson_id as topic,
            ROUND(100.0 * SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) / COUNT(*), 0) as accuracy,
            COUNT(*) as attempts
        FROM practice_attempts
        WHERE user_id = %s
        GROUP BY lesson_id
        HAVING COUNT(*) >= 3
        ORDER BY accuracy ASC
        LIMIT 5
    """, (user_id,))
    weak_points = cur.fetchall()
    
    cur.close()
    conn.close()
    
    return jsonify({
        'stats': stats,
        'chapterProgress': chapter_progress,
        'weeklyStudyTime': weekly_study,
        'weakPoints': weak_points
    })

@app.route('/api/practice/submit', methods=['POST'])
def submit_practice():
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()
    
    cur.execute("""
        INSERT INTO practice_attempts 
        (user_id, lesson_id, submitted_code, output, expected_output, is_correct, time_spent)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING attempt_id
    """, (
        data['userId'], data['lessonId'], data['submittedCode'],
        data['output'], data['expectedOutput'], data['isCorrect'],
        data['timeSpent']
    ))
    
    attempt_id = cur.fetchone()[0]
    
    # 如果正确，更新进度
    if data['isCorrect']:
        cur.execute("""
            INSERT INTO user_progress (user_id, lesson_id, lesson_type, is_completed, completed_at)
            VALUES (%s, %s, 'practice', true, NOW())
            ON CONFLICT (user_id, lesson_id, lesson_type) 
            DO UPDATE SET is_completed = true, completed_at = NOW()
        """, (data['userId'], data['lessonId']))
    
    conn.commit()
    cur.close()
    conn.close()
    
    return jsonify({'success': True, 'attemptId': attempt_id})
```

## Frontend修改建议

在 `Dashboard.js` 中的 `fetchDashboardData` 函数替换为:

```javascript
const fetchDashboardData = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/dashboard/${userId}`);
    const data = await response.json();
    
    setStats(data.stats);
    setChapterProgress(data.chapterProgress);
    setWeeklyStudyTime(data.weeklyStudyTime);
    setWeakPoints(data.weakPoints);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }
};
```

## 数据库初始化步骤

1. 安装PostgreSQL
2. 创建数据库: `CREATE DATABASE python_learning;`
3. 执行schema: `psql -d python_learning -f backend/database/dashboard_schema.sql`
4. 创建测试用户: 
```sql
INSERT INTO users (username, email, password_hash) 
VALUES ('testuser', 'test@example.com', 'hashed_password');
```
