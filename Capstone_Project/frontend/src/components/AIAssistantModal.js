import React from 'react';
import HintPanel from './HintPanel';
import './AIAssistantModal.css';

const AIAssistantModal = ({ 
  isOpen, 
  onClose, 
  hint, 
  hintLevel, 
  loading, 
  onRequestHint
}) => {
  if (!isOpen) return null;

  return (
    <div className="ai-modal-overlay" onClick={onClose}>
      <div className="ai-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="ai-modal-header">
          <div className="ai-modal-title">
            <span className="ai-icon">🤖</span>
            <h3>AI Programming Assistant</h3>
          </div>
          <button className="ai-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="ai-modal-body">
          <HintPanel
            hint={hint}
            hintLevel={hintLevel}
            loading={loading}
            onRequestHint={onRequestHint}
          />
        </div>
      </div>
    </div>
  );
};

export default AIAssistantModal;
