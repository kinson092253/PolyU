import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ lessons, onSelectLesson, selectedLessonId, isCollapsed, onToggle }) => {
  const [expandedChapters, setExpandedChapters] = useState([1]); // Default expand first chapter

  const toggleChapter = (chapterId) => {
    if (expandedChapters.includes(chapterId)) {
      setExpandedChapters(expandedChapters.filter(id => id !== chapterId));
    } else {
      setExpandedChapters([...expandedChapters, chapterId]);
    }
  };

  const collapseAll = () => {
    setExpandedChapters([]);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="header-content">
          <h2>Python Learning</h2>
          <button className="collapse-all-btn" onClick={collapseAll} title="Collapse All">
            ⊟
          </button>
        </div>
        <button className="toggle-btn" onClick={onToggle}>
          ✕
        </button>
      </div>
      <div className="sidebar-content">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="chapter">
            <div 
              className="chapter-title" 
              onClick={() => toggleChapter(lesson.id)}
            >
              <span className="chapter-icon">
                {expandedChapters.includes(lesson.id) ? '▼' : '▶'}
              </span>
              {lesson.title}
            </div>
            {expandedChapters.includes(lesson.id) && (
              <div className="subsections">
                {lesson.subsections.map((subsection) => (
                  <div
                    key={subsection.id}
                    className={`subsection ${selectedLessonId === subsection.id ? 'active' : ''}`}
                    onClick={() => onSelectLesson(subsection)}
                  >
                    {subsection.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
