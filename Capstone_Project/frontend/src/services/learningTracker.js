// API Service for tracking learning progress

const API_BASE_URL = 'http://localhost:5000/api';
const CURRENT_USER_ID = 1; // 默认用户ID，后续可以改为登录系统

class LearningTracker {
  // ==================== Dashboard ====================
  
  async getDashboardData(userId = CURRENT_USER_ID) {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      return null;
    }
  }

  // ==================== Practice Tracking ====================
  
  async submitPractice(lessonId, submittedCode, output, expectedOutput, isCorrect, timeSpent = 0) {
    try {
      const response = await fetch(`${API_BASE_URL}/practice/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: CURRENT_USER_ID,
          lessonId,
          submittedCode,
          output,
          expectedOutput,
          isCorrect,
          timeSpent
        })
      });
      
      if (!response.ok) throw new Error('Failed to submit practice');
      return await response.json();
    } catch (error) {
      console.error('Error submitting practice:', error);
      return { success: false, error: error.message };
    }
  }

  // ==================== Test Tracking ====================
  
  async submitTest(lessonId, selectedAnswer, correctAnswer, isCorrect) {
    try {
      const response = await fetch(`${API_BASE_URL}/test/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: CURRENT_USER_ID,
          lessonId,
          selectedAnswer,
          correctAnswer,
          isCorrect
        })
      });
      
      if (!response.ok) throw new Error('Failed to submit test');
      return await response.json();
    } catch (error) {
      console.error('Error submitting test:', error);
      return { success: false, error: error.message };
    }
  }

  // ==================== Code History ====================
  
  async saveCode(lessonId, code) {
    try {
      const response = await fetch(`${API_BASE_URL}/code/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: CURRENT_USER_ID,
          lessonId,
          code
        })
      });
      
      if (!response.ok) throw new Error('Failed to save code');
      return await response.json();
    } catch (error) {
      console.error('Error saving code:', error);
      return { success: false, error: error.message };
    }
  }

  async getCode(lessonId, userId = CURRENT_USER_ID) {
    try {
      const response = await fetch(`${API_BASE_URL}/code/get/${userId}/${lessonId}`);
      if (!response.ok) throw new Error('Failed to get code');
      return await response.json();
    } catch (error) {
      console.error('Error getting code:', error);
      return { success: false, error: error.message };
    }
  }

  // ==================== Health Check ====================
  
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error('API health check failed:', error);
      return { status: 'error', message: error.message };
    }
  }
}

// Export singleton instance
const learningTracker = new LearningTracker();
export default learningTracker;
