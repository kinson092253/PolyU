-- =============================================
-- Docker 自動初始化腳本
-- PostgreSQL 啟動時自動執行
-- =============================================

-- User table
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
    progress_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    lesson_id VARCHAR(50) NOT NULL,
    lesson_type VARCHAR(20) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, lesson_id, lesson_type)
);

-- Practice attempts table
CREATE TABLE IF NOT EXISTS practice_attempts (
    attempt_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    lesson_id VARCHAR(50) NOT NULL,
    submitted_code TEXT NOT NULL,
    output TEXT,
    expected_output TEXT,
    is_correct BOOLEAN NOT NULL,
    attempt_number INTEGER DEFAULT 1,
    time_spent INTEGER,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_practice_user_lesson ON practice_attempts(user_id, lesson_id);

-- Test results table
CREATE TABLE IF NOT EXISTS test_results (
    test_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    lesson_id VARCHAR(50) NOT NULL,
    selected_answer INTEGER NOT NULL,
    correct_answer INTEGER NOT NULL,
    is_correct BOOLEAN NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_test_user_lesson ON test_results(user_id, lesson_id);

-- Study sessions table
CREATE TABLE IF NOT EXISTS study_sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    lesson_id VARCHAR(50),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    duration INTEGER,
    session_date DATE NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_session_user_date ON study_sessions(user_id, session_date);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
    achievement_id SERIAL PRIMARY KEY,
    achievement_name VARCHAR(50) UNIQUE NOT NULL,
    achievement_icon VARCHAR(10) NOT NULL,
    description TEXT,
    requirement_type VARCHAR(50),
    requirement_value INTEGER
);

-- User achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
    user_achievement_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    achievement_id INTEGER REFERENCES achievements(achievement_id) ON DELETE CASCADE,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, achievement_id)
);

-- Code history table
CREATE TABLE IF NOT EXISTS code_history (
    history_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    lesson_id VARCHAR(50) NOT NULL,
    code TEXT NOT NULL,
    is_best_solution BOOLEAN DEFAULT FALSE,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_code_user_lesson ON code_history(user_id, lesson_id);

-- User files table
CREATE TABLE IF NOT EXISTS user_files (
    file_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    lesson_id VARCHAR(50),
    file_name VARCHAR(255) NOT NULL,
    file_content TEXT NOT NULL,
    file_type VARCHAR(50) DEFAULT 'text',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, lesson_id, file_name)
);

CREATE INDEX IF NOT EXISTS idx_user_files_user_lesson ON user_files(user_id, lesson_id);

-- Final Test Answers table
CREATE TABLE IF NOT EXISTS final_test_answers (
    answer_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    question_type VARCHAR(20) NOT NULL,
    question_index INTEGER NOT NULL,
    answer_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, question_type, question_index)
);

CREATE INDEX IF NOT EXISTS idx_final_test_answers_user ON final_test_answers(user_id);

-- Hint requests table
CREATE TABLE IF NOT EXISTS hint_requests (
    hint_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    lesson_id VARCHAR(20),
    student_code TEXT,
    hint_level INTEGER,
    hint_text TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 建立預設測試用戶 (user_id = 1)
-- =============================================
INSERT INTO users (user_id, username, email, password_hash)
VALUES (1, 'student', 'student@example.com', 'default_hash')
ON CONFLICT (user_id) DO NOTHING;

-- 重置 user_id sequence，確保下一個新用戶從 2 開始
SELECT setval('users_user_id_seq', GREATEST((SELECT MAX(user_id) FROM users), 1));
