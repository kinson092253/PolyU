import React, { useState } from 'react';
import aiHelper from '../services/aiHelper';
import './OutputPanel.css';

const OutputPanel = ({ output, isError, expectedOutput, code }) => {
  const [activeTab, setActiveTab] = useState('testcases');
  const [errorExplanation, setErrorExplanation] = useState(null);
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 瘥?颲?臬甇?＆嚗宏?文??征?賢?蝚血?瘥?嚗?
  const isCorrect = output && expectedOutput && 
    output.trim() === expectedOutput.trim() && 
    !isError;

  const handleAskAI = async () => {
    setShowModal(true);
    setErrorExplanation(null);
    setIsLoadingExplanation(true);
    const result = await aiHelper.explainError(code || '', output || '');
    setIsLoadingExplanation(false);
    if (result.success) {
      setErrorExplanation(result.explanation);
    } else {
      setErrorExplanation(`Failed to get explanation: ${result.error}`);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Reset explanation when output changes
  React.useEffect(() => {
    setErrorExplanation(null);
    setShowModal(false);
  }, [output]);

  const askAIButton = (label = 'Ask AI') => (
    <button
      className="ask-ai-btn output-ask-ai-btn"
      onClick={handleAskAI}
      disabled={isLoadingExplanation}
      title="Ask AI to explain this error"
    >
      {isLoadingExplanation ? 'Thinking...' : label}
    </button>
  );

  return (
    <div className="output-panel">
      <div className="output-tabs">
        <button 
          className={`tab-btn ${activeTab === 'testcases' ? 'active' : ''}`}
          onClick={() => setActiveTab('testcases')}
        >
          TEST CASES
        </button>
        <button 
          className={`tab-btn ${activeTab === 'console' ? 'active' : ''}`}
          onClick={() => setActiveTab('console')}
        >
          CONSOLE
        </button>
      </div>
      
      <div className="output-content-wrapper">
        {activeTab === 'testcases' ? (
          <div className="split-output">
            <div className="output-section">
              <div className="output-section-header">
                <span className="output-section-header-text">Output</span>
                <div className="output-header-actions">
                  {output && expectedOutput && (
                    <span className={`result-indicator ${isCorrect ? 'correct' : 'incorrect'}`}>
                      {isCorrect ? '\u2713' : '\u2717'}
                    </span>
                  )}
                </div>
              </div>
              <div className="output-section-content">
                {output ? (
                  <>
                    <pre className={isError ? 'error' : ''}>{output}</pre>
                    {isError && (
                      <div className="output-ask-ai-row">
                        {askAIButton('\ud83e\udd16 Ask AI to explain this error')}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="empty-message">Run code to see output</div>
                )}
              </div>
            </div>
            <div className="output-divider"></div>
            <div className="output-section">
              <div className="output-section-header">
                <span className="output-section-header-text">Expected Output</span>
              </div>
              <div className="output-section-content">
                {expectedOutput ? (
                  <pre>{expectedOutput}</pre>
                ) : (
                  <div className="empty-message">No expected output</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="console-output">
            {output ? (
              <>
                <pre className={isError ? 'error' : ''}>{output}</pre>
                {isError && (
                  <div className="console-ask-ai">
                    {askAIButton('🤖 Ask AI to explain this error')}
                  </div>
                )}
              </>
            ) : (
              <div className="empty-message">Console output will appear here</div>
            )}
          </div>
        )}
      </div>

      {/* AI Error Explanation Modal */}
      {showModal && (
        <div className="error-explanation-overlay" onClick={handleCloseModal}>
          <div className="error-explanation-modal" onClick={e => e.stopPropagation()}>
            <div className="error-explanation-modal-header">
              <div className="error-explanation-modal-title">
                <span className="ai-icon">🤖</span>
                <h3>AI Error Explanation</h3>
              </div>
              <button className="error-explanation-modal-close" onClick={handleCloseModal}>✕</button>
            </div>
            <div className="error-explanation-modal-body">
              {isLoadingExplanation ? (
                <div className="error-explanation-loading">
                  <div className="spinner"></div>
                  <span>AI is analysing your error...</span>
                </div>
              ) : (
                <>
                  <div className="error-explanation-error-box">
                    <div className="error-explanation-error-label">❌ Your Error</div>
                    <pre>{output}</pre>
                  </div>
                  <div className="error-explanation-text">
                    <div className="error-explanation-ai-label">💡 What went wrong</div>
                    <p>{errorExplanation}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputPanel;
