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
    lesson_id VARCHAR(50) NOT NULL,
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
    lesson_id VARCHAR(50) NOT NULL,
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
    lesson_id VARCHAR(50) NOT NULL,
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
    lesson_id VARCHAR(50),
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
    lesson_id VARCHAR(50) NOT NULL,
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
    lesson_id VARCHAR(50),
    file_name VARCHAR(255) NOT NULL,
    file_content TEXT NOT NULL,
    file_type VARCHAR(50) DEFAULT 'text',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, lesson_id, file_name)
);

CREATE INDEX idx_user_files_user_lesson ON user_files(user_id, lesson_id);

-- Final Test Answers table (for persisting user answers)
CREATE TABLE final_test_answers (
    answer_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    question_type VARCHAR(20) NOT NULL, -- 'mc' or 'dropdown'
    question_index INTEGER NOT NULL,
    answer_data JSONB NOT NULL, -- Stores answer(s) as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, question_type, question_index)
);

CREATE INDEX idx_final_test_answers_user ON final_test_answers(user_id);

-- Note: Views removed to prevent schema modification issues
-- Create them manually if needed after database initialization

-- Indexes for performance
CREATE INDEX idx_practice_attempts_user_correct ON practice_attempts(user_id, is_correct);
CREATE INDEX idx_test_results_user_correct ON test_results(user_id, is_correct);
CREATE INDEX idx_study_sessions_user_date_desc ON study_sessions(user_id, session_date DESC);
