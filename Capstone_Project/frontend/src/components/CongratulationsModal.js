import React, { useEffect, useState } from 'react';
import './CongratulationsModal.css';

const CongratulationsModal = ({ show, onClose }) => {
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    if (show) {
      // Generate confetti pieces
      const pieces = [];
      for (let i = 0; i < 100; i++) {
        pieces.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 3 + Math.random() * 2,
          color: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#9370DB', '#32CD32'][Math.floor(Math.random() * 6)]
        });
      }
      setConfettiPieces(pieces);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="congratulations-overlay" onClick={onClose}>
      <div className="congratulations-modal" onClick={(e) => e.stopPropagation()}>
        {/* Confetti Animation */}
        <div className="confetti-container">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="confetti"
              style={{
                left: `${piece.left}%`,
                backgroundColor: piece.color,
                animationDelay: `${piece.delay}s`,
                animationDuration: `${piece.duration}s`
              }}
            />
          ))}
        </div>

        {/* Trophy Icon */}
        <div className="trophy-icon">🏆</div>

        {/* Congratulations Message */}
        <h1 className="congrats-title">🎉 Congratulations! 🎉</h1>
        <h2 className="congrats-subtitle">You've Completed the Entire Python Course!</h2>

        <div className="congrats-message">
          <p>You have successfully mastered the core knowledge of Python programming:</p>
          <ul className="achievement-list">
            <li>✅ Basic Syntax & Data Types</li>
            <li>✅ Control Flow & Loops</li>
            <li>✅ Data Structures & Functions</li>
            <li>✅ File Handling & Exception Handling</li>
          </ul>
          <p className="final-message">
            Keep up the enthusiasm for learning and explore more possibilities in programming!
          </p>
        </div>

        {/* Success Emojis */}
        <div className="emoji-celebration">
          <span className="emoji">🎊</span>
          <span className="emoji">🎈</span>
          <span className="emoji">⭐</span>
          <span className="emoji">🎯</span>
          <span className="emoji">💪</span>
        </div>

        {/* Close Button */}
        <button className="congrats-close-btn" onClick={onClose}>
          Awesome!
        </button>
      </div>
    </div>
  );
};

export default CongratulationsModal;
