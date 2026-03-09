import React from 'react';
import './Navbar.css';

const Navbar = ({ onDashboardClick, onMyCoursesClick, showDashboard = false }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/pythonlogo.png" alt="Python Logo" className="navbar-logo" />
        <span className="navbar-title">Python Learning Platform</span>
      </div>
      
      <div className="navbar-menu">
        {!showDashboard && (
          <button className="navbar-btn" onClick={onDashboardClick}>
            <span className="btn-icon">📊</span>
            Dashboard
          </button>
        )}
        
        {showDashboard && (
          <button className="navbar-btn" onClick={onMyCoursesClick}>
            <span className="btn-icon">📚</span>
            My Courses
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
