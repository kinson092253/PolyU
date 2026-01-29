-- 添加用户文件管理表
CREATE TABLE IF NOT EXISTS user_files (
    file_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    lesson_id VARCHAR(10),
    file_name VARCHAR(255) NOT NULL,
    file_content TEXT NOT NULL,
    file_type VARCHAR(50) DEFAULT 'text',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, lesson_id, file_name)
);

CREATE INDEX idx_user_files_user_lesson ON user_files(user_id, lesson_id);

COMMENT ON TABLE user_files IS '存储用户在学习过程中创建的文件';
COMMENT ON COLUMN user_files.lesson_id IS '关联的课程ID，NULL表示全局文件';
COMMENT ON COLUMN user_files.file_type IS '文件类型：text, csv, json等';
