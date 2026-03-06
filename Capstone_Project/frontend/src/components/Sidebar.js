import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ lessons, onSelectLesson, selectedLessonId, isCollapsed, onToggle }) => {
  const [expandedChapters, setExpandedChapters] = useState([1]); // Default expand first chapter
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter lessons based on search term
  const filteredLessons = lessons.map(lesson => {
    if (!searchTerm.trim()) return lesson;
    
    const search = searchTerm.toLowerCase();
    const matchesChapter = lesson.title.toLowerCase().includes(search) || 
                           lesson.id.toString().includes(search);
    
    const filteredSubsections = lesson.subsections.filter(sub => 
      sub.title.toLowerCase().includes(search) || 
      sub.id.toLowerCase().includes(search)
    );
    
    if (matchesChapter || filteredSubsections.length > 0) {
      return { ...lesson, subsections: filteredSubsections.length > 0 ? filteredSubsections : lesson.subsections };
    }
    return null;
  }).filter(Boolean);

  // Auto-expand chapters when searching
  const chaptersToShow = searchTerm.trim() 
    ? filteredLessons.map(lesson => lesson.id)
    : expandedChapters;

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
      
      <div className="search-bar-container">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search chapters or topics... (e.g., 1.1 or Variables)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              ✕
            </button>
          )}
        </div>
        {searchTerm && filteredLessons.length === 0 && (
          <div className="no-results">No results found</div>
        )}
      </div>
      
      <div className="sidebar-content">
        {filteredLessons.map((lesson) => (
          <div key={lesson.id} className="chapter">
            <div 
              className="chapter-title" 
              onClick={() => toggleChapter(lesson.id)}
            >
              <span className="chapter-icon">
                {chaptersToShow.includes(lesson.id) ? '▼' : '▶'}
              </span>
              {lesson.title}
            </div>
            {chaptersToShow.includes(lesson.id) && (
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
