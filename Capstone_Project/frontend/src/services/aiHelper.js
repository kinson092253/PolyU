const API_BASE_URL = 'http://localhost:5000/api';

class AIHelper {
  /**
   * Get AI-generated hint for student code
   * @param {number} userId - User ID
   * @param {string} lessonId - Lesson ID
   * @param {string} studentCode - Student's current code
   * @param {string} exerciseDesc - Exercise description
   * @param {string} expectedOutput - Expected output
   * @param {string} currentOutput - Current output from student's code
   * @param {number} hintLevel - Hint level (1=gentle, 2=moderate, 3=specific)
   */
  async getHint(userId, lessonId, studentCode, exerciseDesc, expectedOutput, currentOutput, hintLevel = 1) {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/get-hint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          lessonId,
          studentCode,
          exerciseDescription: exerciseDesc,
          expectedOutput,
          currentOutput,
          hintLevel
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting AI hint:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to connect to AI service' 
      };
    }
  }
}

const aiHelperInstance = new AIHelper();
export default aiHelperInstance;
