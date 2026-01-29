import React from 'react';
import './HintPanel.css';

const HintPanel = ({ hint, hintLevel, onRequestHint, loading }) => {
  const getLevelInfo = (level) => {
    switch(level) {
      case 1:
        return { emoji: '🟢', text: 'Level 1: Gentle Nudge', color: '#10b981' };
      case 2:
        return { emoji: '🟡', text: 'Level 2: More Specific', color: '#f59e0b' };
      case 3:
        return { emoji: '🔴', text: 'Level 3: Detailed Help', color: '#ef4444' };
      default:
        return { emoji: '💡', text: 'Hint', color: '#667eea' };
    }
  };

  const levelInfo = getLevelInfo(hintLevel);

  return (
    <div className="hint-panel">
      <div className="hint-content">
        {!hint && (
          <div className="hint-intro">
            <p>💭 Stuck on this exercise?</p>
            <p>Click the button below to get a hint from AI!</p>
            <p className="hint-note">
              <strong>Note:</strong> AI will guide you without giving the answer directly.
              You can request up to 3 levels of hints, each more specific than the last.
              <strong style={{ color: '#f59e0b' }}> Use them wisely - no resets allowed!</strong>
            </p>
          </div>
        )}
        
        {hint && (
          <div className="hint-message">
            <div className="hint-level" style={{ color: levelInfo.color }}>
              {levelInfo.emoji} Level {hintLevel}/3: {levelInfo.text}
            </div>
            <div className="hint-text">{hint}</div>
          </div>
        )}
        
        {loading && (
          <div className="hint-loading">
            <div className="spinner"></div>
            <span>AI is thinking...</span>
          </div>
        )}
        
        <div className="hint-actions">
          <button 
            className="btn-get-hint"
            onClick={() => onRequestHint(hint ? hintLevel + 1 : 1)}
            disabled={loading || hintLevel >= 3}
          >
            {loading ? '🤔 Thinking...' : 
             !hint ? '💡 Get First Hint' :
             hintLevel < 3 ? `💡 Get Level ${hintLevel + 1} Hint` :
             '✓ All Hints Used'}
          </button>
          
          {hintLevel >= 3 && (
            <div className="hint-limit-message">
              <span style={{ color: '#ef4444' }}>⚠️ You've used all 3 hints for this exercise.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HintPanel;
