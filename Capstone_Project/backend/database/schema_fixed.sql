-- PostgreSQL Database Schema for Python Learning Platform

-- User table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- User progress table
CREATE TABLE user_progress (
    progress_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    lesson_id VARCHAR(10) NOT NULL,
    lesson_type VARCHAR(20) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, lesson_id, lesson_type)
);

-- Practice attempts table
CREATE TABLE practice_attempts (
    attempt_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    lesson_id VARCHAR(10) NOT NULL,
    submitted_code TEXT NOT NULL,
    output TEXT,
    expected_output TEXT,
    is_correct BOOLEAN NOT NULL,
    attempt_number INTEGER DEFAULT 1,
    time_spent INTEGER,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_practice_user_lesson ON practice_attempts(user_id, lesson_id);

-- Test results table
CREATE TABLE test_results (
    test_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    lesson_id VARCHAR(10) NOT NULL,
    selected_answer INTEGER NOT NULL,
    correct_answer INTEGER NOT NULL,
    is_correct BOOLEAN NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_test_user_lesson ON test_results(user_id, lesson_id);

-- Study sessions table
CREATE TABLE study_sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    lesson_id VARCHAR(10),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    duration INTEGER,
    session_date DATE NOT NULL
);

CREATE INDEX idx_session_user_date ON study_sessions(user_id, session_date);

-- Achievements table
CREATE TABLE achievements (
    achievement_id SERIAL PRIMARY KEY,
    achievement_name VARCHAR(50) UNIQUE NOT NULL,
    achievement_icon VARCHAR(10) NOT NULL,
    description TEXT,
    requirement_type VARCHAR(50),
    requirement_value INTEGER
);

-- User achievements table
CREATE TABLE user_achievements (
    user_achievement_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    achievement_id INTEGER REFERENCES achievements(achievement_id) ON DELETE CASCADE,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, achievement_id)
);

-- Code history table
CREATE TABLE code_history (
    history_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    lesson_id VARCHAR(10) NOT NULL,
    code TEXT NOT NULL,
    is_best_solution BOOLEAN DEFAULT FALSE,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

CREATE INDEX idx_code_user_lesson ON code_history(user_id, lesson_id);

-- User files table
CREATE TABLE user_files (
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

-- Create view: user stats summary
CREATE VIEW user_stats_summary AS
SELECT 
    u.user_id,
    u.username,
    COUNT(DISTINCT CASE WHEN up.is_completed AND up.lesson_type = 'practice' THEN up.lesson_id END) as practices_completed,
    COUNT(DISTINCT CASE WHEN tr.is_correct THEN tr.lesson_id END) as tests_passed,
    COALESCE(SUM(ss.duration), 0) as total_study_minutes,
    COUNT(DISTINCT ua.achievement_id) as achievements_earned,
    MAX(ss.session_date) as last_study_date
FROM users u
LEFT JOIN user_progress up ON u.user_id = up.user_id
LEFT JOIN test_results tr ON u.user_id = tr.user_id
LEFT JOIN study_sessions ss ON u.user_id = ss.user_id
LEFT JOIN user_achievements ua ON u.user_id = ua.user_id
GROUP BY u.user_id, u.username;

-- Create view: chapter completion rates
CREATE VIEW chapter_completion_rates AS
SELECT 
    user_id,
    SUBSTRING(lesson_id, 1, 1) as chapter_number,
    COUNT(*) as lessons_in_chapter,
    SUM(CASE WHEN is_completed THEN 1 ELSE 0 END) as completed_lessons,
    ROUND(100.0 * SUM(CASE WHEN is_completed THEN 1 ELSE 0 END) / COUNT(*), 2) as completion_percentage
FROM user_progress
WHERE lesson_type = 'practice'
GROUP BY user_id, SUBSTRING(lesson_id, 1, 1);

-- Indexes for performance
CREATE INDEX idx_practice_attempts_user_correct ON practice_attempts(user_id, is_correct);
CREATE INDEX idx_test_results_user_correct ON test_results(user_id, is_correct);
CREATE INDEX idx_study_sessions_user_date_desc ON study_sessions(user_id, session_date DESC);
