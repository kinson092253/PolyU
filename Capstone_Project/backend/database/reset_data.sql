-- Reset all user data to zero
-- This script clears learning progress while keeping the test user account

-- Clear user_files table
DELETE FROM user_files;

-- Clear code_history table
DELETE FROM code_history;

-- Clear user_achievements table
DELETE FROM user_achievements;

-- Clear achievements table
DELETE FROM achievements;

-- Clear study_sessions table
DELETE FROM study_sessions;

-- Clear test_results table
DELETE FROM test_results;

-- Clear practice_attempts table
DELETE FROM practice_attempts;

-- Clear user_progress table
DELETE FROM user_progress;

-- Reset sequences (auto-increment counters)
ALTER SEQUENCE users_user_id_seq RESTART WITH 2;
ALTER SEQUENCE user_progress_progress_id_seq RESTART WITH 1;
ALTER SEQUENCE practice_attempts_attempt_id_seq RESTART WITH 1;
ALTER SEQUENCE test_results_result_id_seq RESTART WITH 1;
ALTER SEQUENCE study_sessions_session_id_seq RESTART WITH 1;
ALTER SEQUENCE achievements_achievement_id_seq RESTART WITH 1;
ALTER SEQUENCE user_achievements_user_achievement_id_seq RESTART WITH 1;
ALTER SEQUENCE code_history_history_id_seq RESTART WITH 1;
ALTER SEQUENCE user_files_file_id_seq RESTART WITH 1;

-- Verify test user still exists
SELECT COUNT(*) as user_count FROM users WHERE user_id = 1;
