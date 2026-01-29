import React from 'react';
import './Navbar.css';

const Navbar = ({ onDashboardClick, onSettingsClick, onAIAssistantClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">🐍</span>
        <span className="navbar-title">Python Learning Platform</span>
      </div>
      
      <div className="navbar-menu">
        <button className="navbar-btn" onClick={onDashboardClick}>
          <span className="btn-icon">📊</span>
          Dashboard
        </button>
        
        <button className="navbar-btn" onClick={onAIAssistantClick} title="AI 編程助手">
          <span className="btn-icon">🤖</span>
          AI Assistant
        </button>
        
        <button className="navbar-btn">
          <span className="btn-icon">📚</span>
          My Courses
        </button>
        
        <button className="navbar-btn" onClick={onSettingsClick}>
          <span className="btn-icon">⚙️</span>
          Settings
        </button>
        
        <button className="navbar-btn">
          <span className="btn-icon">👤</span>
          Profile
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
