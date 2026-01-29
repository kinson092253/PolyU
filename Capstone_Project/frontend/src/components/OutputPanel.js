import React, { useState } from 'react';
import './OutputPanel.css';

const OutputPanel = ({ output, isError, expectedOutput }) => {
  const [activeTab, setActiveTab] = useState('testcases');

  // 比较输出是否正确（移除前后空白字符后比较）
  const isCorrect = output && expectedOutput && 
    output.trim() === expectedOutput.trim() && 
    !isError;

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
                {output && expectedOutput && (
                  <span className={`result-indicator ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? '✓' : '✗'}
                  </span>
                )}
              </div>
              <div className="output-section-content">
                {output ? (
                  <pre className={isError ? 'error' : ''}>{output}</pre>
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
              <pre className={isError ? 'error' : ''}>{output}</pre>
            ) : (
              <div className="empty-message">Console output will appear here</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
