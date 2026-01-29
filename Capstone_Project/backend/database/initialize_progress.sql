-- 初始化所有课程记录到 user_progress 表
-- 这样计算百分比时会正确显示每个章节的进度

-- 首先清空现有数据
TRUNCATE TABLE user_progress CASCADE;

-- Chapter 1: 3 个 subsections (1.1, 1.2, 1.3)
INSERT INTO user_progress (user_id, lesson_id, lesson_type, is_completed, last_accessed)
VALUES 
    (1, '1.1', 'practice', false, CURRENT_TIMESTAMP),
    (1, '1.2', 'practice', false, CURRENT_TIMESTAMP),
    (1, '1.3', 'practice', false, CURRENT_TIMESTAMP);

-- Chapter 2: 3 个 subsections (2.1, 2.2, 2.3)
INSERT INTO user_progress (user_id, lesson_id, lesson_type, is_completed, last_accessed)
VALUES 
    (1, '2.1', 'practice', false, CURRENT_TIMESTAMP),
    (1, '2.2', 'practice', false, CURRENT_TIMESTAMP),
    (1, '2.3', 'practice', false, CURRENT_TIMESTAMP);

-- Chapter 3: 2 个 subsections (3.1, 3.2)
INSERT INTO user_progress (user_id, lesson_id, lesson_type, is_completed, last_accessed)
VALUES 
    (1, '3.1', 'practice', false, CURRENT_TIMESTAMP),
    (1, '3.2', 'practice', false, CURRENT_TIMESTAMP);

-- Chapter 4: 3 个 subsections (4.1, 4.2, 4.3)
INSERT INTO user_progress (user_id, lesson_id, lesson_type, is_completed, last_accessed)
VALUES 
    (1, '4.1', 'practice', false, CURRENT_TIMESTAMP),
    (1, '4.2', 'practice', false, CURRENT_TIMESTAMP),
    (1, '4.3', 'practice', false, CURRENT_TIMESTAMP);

-- Chapter 5: 3 个 subsections (5.1, 5.2, 5.3)
INSERT INTO user_progress (user_id, lesson_id, lesson_type, is_completed, last_accessed)
VALUES 
    (1, '5.1', 'practice', false, CURRENT_TIMESTAMP),
    (1, '5.2', 'practice', false, CURRENT_TIMESTAMP),
    (1, '5.3', 'practice', false, CURRENT_TIMESTAMP);

-- Chapter 6: 3 个 subsections (6.1, 6.2, 6.3)
INSERT INTO user_progress (user_id, lesson_id, lesson_type, is_completed, last_accessed)
VALUES 
    (1, '6.1', 'practice', false, CURRENT_TIMESTAMP),
    (1, '6.2', 'practice', false, CURRENT_TIMESTAMP),
    (1, '6.3', 'practice', false, CURRENT_TIMESTAMP);

-- Chapter 7: 3 个 subsections (7.1, 7.2, 7.3)
INSERT INTO user_progress (user_id, lesson_id, lesson_type, is_completed, last_accessed)
VALUES 
    (1, '7.1', 'practice', false, CURRENT_TIMESTAMP),
    (1, '7.2', 'practice', false, CURRENT_TIMESTAMP),
    (1, '7.3', 'practice', false, CURRENT_TIMESTAMP);

-- Chapter 8: 3 个 subsections (8.1, 8.2, 8.3)
INSERT INTO user_progress (user_id, lesson_id, lesson_type, is_completed, last_accessed)
VALUES 
    (1, '8.1', 'practice', false, CURRENT_TIMESTAMP),
    (1, '8.2', 'practice', false, CURRENT_TIMESTAMP),
    (1, '8.3', 'practice', false, CURRENT_TIMESTAMP);

-- Chapter 9: 3 个 subsections (9.1, 9.2, 9.3)
INSERT INTO user_progress (user_id, lesson_id, lesson_type, is_completed, last_accessed)
VALUES 
    (1, '9.1', 'practice', false, CURRENT_TIMESTAMP),
    (1, '9.2', 'practice', false, CURRENT_TIMESTAMP),
    (1, '9.3', 'practice', false, CURRENT_TIMESTAMP);

-- Chapter 10: 3 个 subsections (10.1, 10.2, 10.3)
INSERT INTO user_progress (user_id, lesson_id, lesson_type, is_completed, last_accessed)
VALUES 
    (1, '10.1', 'practice', false, CURRENT_TIMESTAMP),
    (1, '10.2', 'practice', false, CURRENT_TIMESTAMP),
    (1, '10.3', 'practice', false, CURRENT_TIMESTAMP);

-- 综合测试: Test 1 和 Test 2
INSERT INTO user_progress (user_id, lesson_id, lesson_type, is_completed, last_accessed)
VALUES 
    (1, 'test1.1', 'test', false, CURRENT_TIMESTAMP),
    (1, 'test2.1', 'test', false, CURRENT_TIMESTAMP);

-- 验证插入结果
SELECT 
    SPLIT_PART(lesson_id, '.', 1) as chapter,
    COUNT(*) as total_lessons,
    SUM(CASE WHEN is_completed THEN 1 ELSE 0 END) as completed,
    ROUND(100.0 * SUM(CASE WHEN is_completed THEN 1 ELSE 0 END) / COUNT(*), 0) as percentage
FROM user_progress
WHERE user_id = 1 AND lesson_type = 'practice'
GROUP BY SPLIT_PART(lesson_id, '.', 1)
ORDER BY SPLIT_PART(lesson_id, '.', 1)::integer;

-- 显示总数
SELECT 'Total lessons initialized: ' || COUNT(*) as summary FROM user_progress WHERE user_id = 1;
