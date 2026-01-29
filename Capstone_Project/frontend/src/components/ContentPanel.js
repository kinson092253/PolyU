import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './ContentPanel.css';

const ContentPanel = ({ lesson, isPracticeComplete, onNextLesson }) => {
  const [mode, setMode] = useState('lecture'); // lecture, test, practice
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const contentRef = useRef(null); // 用于引用内容容器

  // 當課程改變時，重置所有狀態並滾動到頂部
  useEffect(() => {
    setMode('lecture');
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHints(false);
    setShowSolution(false);
    
    // 滾動到頂部
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [lesson?.id]); // 監聽課程 ID 變化

  if (!lesson) {
    return (
      <div className="content-panel">
        <div className="welcome-message">
          <h1>Welcome to Python Learning Platform</h1>
          <p>Please select a lesson from the left sidebar to start learning</p>
        </div>
      </div>
    );
  }

  const handleTestAnswer = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setSelectedAnswer(null);
    setShowResult(false);
    // 切換模式時重置提示和答案顯示
    if (newMode === 'practice') {
      setShowHints(false);
      setShowSolution(false);
    }
  };

  const renderLecture = () => (
    <div className="lecture-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {lesson.content.lecture}
      </ReactMarkdown>
      <div className="action-buttons">
        <button className="btn btn-test" onClick={() => handleModeChange('test')}>
          📝 Start Test
        </button>
      </div>
    </div>
  );

  const renderTest = () => {
    const test = lesson.content.test;
    const isCorrect = selectedAnswer === test.correctAnswer;

    return (
      <div className="test-content">
        <h2>📝 Test</h2>
        <div className="question-box">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {test.question}
          </ReactMarkdown>
          <div className="options">
            {test.options.map((option, index) => (
              <div
                key={index}
                className={`option ${
                  showResult
                    ? index === test.correctAnswer
                      ? 'correct'
                      : index === selectedAnswer
                      ? 'incorrect'
                      : ''
                    : selectedAnswer === index
                    ? 'selected'
                    : ''
                }`}
                onClick={() => !showResult && handleTestAnswer(index)}
              >
                <span className="option-label">{String.fromCharCode(65 + index)}.</span>
                {option}
              </div>
            ))}
          </div>
        </div>
        
        {showResult && (
          <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
            <h3>{isCorrect ? '✅ Correct!' : '❌ Incorrect!'}</h3>
            <p className="explanation">{test.explanation}</p>
            <div className="action-buttons">
              <button className="btn btn-retry" onClick={() => handleModeChange('test')}>
                Retry Test
              </button>
              <button className="btn btn-practice" onClick={() => handleModeChange('practice')}>
                💻 Start Practice
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderPractice = () => {
    const practice = lesson.content.practice;
    
    // 支持两种方式：独立的 hints 字段 或 从 description 中分割
    let taskPart, hintsContent;
    
    if (practice.hints) {
      // 新方式：hints 是独立字段（用于 Test1）
      taskPart = practice.description;
      hintsContent = practice.hints;
    } else {
      // 旧方式：从 description 中分割，移除 Expected Output 部分
      const descriptionParts = practice.description.split('**Hints**');
      taskPart = descriptionParts[0];
      
      // 处理 hints 部分，移除 Expected Output 和 Hints 标题
      if (descriptionParts[1]) {
        const hintsOnly = descriptionParts[1].split('**Expected Output**')[0];
        // 去掉开头的冒号和空格
        hintsContent = hintsOnly.replace(/^:\s*/, '').trim();
      } else {
        hintsContent = '';
      }
    }

    // 从 taskPart 中也移除 Expected Output 部分
    taskPart = taskPart.split('**Expected Output**')[0];

    return (
      <div className="practice-content">
        <h2>💻 Coding Practice</h2>
        
        {/* Task 部分 - 始終顯示 */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {taskPart}
        </ReactMarkdown>
        
        {/* Remind 信息 - 始終顯示 */}
        <div className="practice-hint">
          <p>💡 Write your code in the editor on the right, then click "Run" to see the result</p>
        </div>

        {/* Hints 和 Solution 按鈕 */}
        <div className="practice-buttons">
          <button 
            className="btn btn-hints"
            onClick={() => setShowHints(!showHints)}
          >
            {showHints ? '🔼 Hide Hints' : '💡 Show Hints'}
          </button>
          <button 
            className="btn btn-solution"
            onClick={() => setShowSolution(!showSolution)}
          >
            {showSolution ? '🔼 Hide Solution' : '📖 Show Solution'}
          </button>
        </div>

        {/* Hints 內容 - 點擊後顯示 */}
        {showHints && (
          <div className="hints-box">
            <h3>💡 Hints</h3>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {hintsContent}
            </ReactMarkdown>
          </div>
        )}

        {/* Solution 內容 - 點擊後顯示 */}
        {showSolution && practice.solution && (
          <div className="solution-box">
            <h3>📖 Solution</h3>
            <SyntaxHighlighter
              style={vscDarkPlus}
              language="python"
              PreTag="div"
            >
              {practice.solution}
            </SyntaxHighlighter>
          </div>
        )}

        {/* Next 按鈕 - 當練習完成時顯示 */}
        {isPracticeComplete && mode === 'practice' && (
          <div className="next-button-container">
            <button 
              className="btn btn-next"
              onClick={onNextLesson}
            >
              Next Lesson →
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="content-panel">
      <div className="panel-header">
        <h1>{lesson.title}</h1>
        <div className="mode-tabs">
          <button 
            className={`tab ${mode === 'lecture' ? 'active' : ''}`}
            onClick={() => handleModeChange('lecture')}
          >
            📖 Lecture
          </button>
          <button 
            className={`tab ${mode === 'test' ? 'active' : ''}`}
            onClick={() => handleModeChange('test')}
          >
            📝 Test
          </button>
          <button 
            className={`tab ${mode === 'practice' ? 'active' : ''}`}
            onClick={() => handleModeChange('practice')}
          >
            💻 Practice
          </button>
        </div>
      </div>
      <div className="panel-body" ref={contentRef}>
        {mode === 'lecture' && renderLecture()}
        {mode === 'test' && renderTest()}
        {mode === 'practice' && renderPractice()}
      </div>
    </div>
  );
};

export default ContentPanel;
