import React from 'react';
import './Navbar.css';

const Navbar = ({ onDashboardClick, onSettingsClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/pythonlogo.png" alt="Python Logo" className="navbar-logo" />
        <span className="navbar-title">Python Learning Platform</span>
      </div>
      
      <div className="navbar-menu">
        <button className="navbar-btn" onClick={onDashboardClick}>
          <span className="btn-icon">📊</span>
          Dashboard
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
