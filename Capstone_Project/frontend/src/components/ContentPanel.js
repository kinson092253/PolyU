import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './ContentPanel.css';

const ContentPanel = ({ lesson, isPracticeComplete, onNextLesson }) => {
  const [mode, setMode] = useState('lecture'); // lecture, test, practice
  const [theme, setTheme] = useState('dark'); // light, dark
  const [fontSize, setFontSize] = useState('medium'); // small, medium, large
  const [learningMode, setLearningMode] = useState('text'); // video, text
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [draggedBlocks, setDraggedBlocks] = useState([]); // 拖拽题型的当前顺序（单行）
  const [availableBlocks, setAvailableBlocks] = useState([]); // 拖拽题型的可用选项
  const [draggedBlocksLines, setDraggedBlocksLines] = useState([]); // 多行拖拉题型（数组的数组）
  const [availableBlocksLines, setAvailableBlocksLines] = useState([]); // 多行拖拉题每行的可用代码块
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 当前题目索引
  const [answersState, setAnswersState] = useState({}); // 所有题目的答案状态
  const contentRef = useRef(null); // 用于引用内容容器

  // 當課程改變時，重置所有狀態並滾動到頂部
  useEffect(() => {
    setMode('lecture');
    setLearningMode('text'); // 默認顯示文字教學
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHints(false);
    setShowSolution(false);
    setDraggedBlocks([]);
    setAvailableBlocks([]);
    setDraggedBlocksLines([]);
    setAvailableBlocksLines([]);
    setCurrentQuestionIndex(0);
    setAnswersState({});
    
    // 滾動到頂部
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [lesson?.id]); // 監聽課程 ID 變化

  // 當切換到 test 模式或切換題目時，初始化當前題目
  useEffect(() => {
    if (mode === 'test' && lesson?.content?.test) {
      const testContent = lesson.content.test;
      
      // 新格式：多题目
      if (testContent.questions) {
        const currentQuestion = testContent.questions[currentQuestionIndex];
        
        if (currentQuestion?.type === 'drag-and-drop') {
          // 多行拖拉题
          if (currentQuestion.multiLine && currentQuestion.lines) {
            if (currentQuestion.sharedBlocks === false) {
              // 每行独立的代码块
              const shuffledLines = currentQuestion.lines.map(line => {
                const blocks = [...line.blocks];
                return blocks.sort(() => Math.random() - 0.5);
              });
              setAvailableBlocksLines(shuffledLines);
              setDraggedBlocksLines(currentQuestion.lines.map(() => []));
              setAvailableBlocks([]);
              setDraggedBlocks([]);
            } else {
              // 共享代码块池
              const allBlocks = currentQuestion.lines.flatMap(line => line.blocks);
              const shuffled = allBlocks.sort(() => Math.random() - 0.5);
              setAvailableBlocks(shuffled);
              setDraggedBlocksLines(currentQuestion.lines.map(() => []));
              setAvailableBlocksLines([]);
              setDraggedBlocks([]);
            }
          } 
          // 单行拖拉题
          else {
            const blocks = [...currentQuestion.blocks];
            const shuffled = blocks.sort(() => Math.random() - 0.5);
            setAvailableBlocks(shuffled);
            setDraggedBlocks([]);
            setDraggedBlocksLines([]);
            setAvailableBlocksLines([]);
          }
        }
        
        // 恢复当前题目的答案状态
        const savedState = answersState[currentQuestionIndex];
        if (savedState) {
          setSelectedAnswer(savedState.selectedAnswer || null);
          setShowResult(savedState.showResult || false);
          if (currentQuestion?.type === 'drag-and-drop') {
            if (currentQuestion.multiLine) {
              setDraggedBlocksLines(savedState.draggedBlocksLines || currentQuestion.lines.map(() => []));
              if (currentQuestion.sharedBlocks === false) {
                setAvailableBlocksLines(savedState.availableBlocksLines || []);
              } else {
                setAvailableBlocks(savedState.availableBlocks || []);
              }
            } else {
              setDraggedBlocks(savedState.draggedBlocks || []);
              setAvailableBlocks(savedState.availableBlocks || []);
            }
          }
        } else {
          setSelectedAnswer(null);
          setShowResult(false);
        }
      }
      // 旧格式：单题目（向后兼容）
      else if (testContent.type === 'drag-and-drop') {
        const blocks = [...testContent.blocks];
        const shuffled = blocks.sort(() => Math.random() - 0.5);
        setAvailableBlocks(shuffled);
        setDraggedBlocks([]);
        setDraggedBlocksLines([]);
        setAvailableBlocksLines([]);
        setShowResult(false);
      }
    }
  }, [mode, currentQuestionIndex, lesson?.content?.test]);

  if (!lesson) {
    return (
      <div className={`content-panel ${theme} font-${fontSize}`}>
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
    setDraggedBlocks([]);
    setAvailableBlocks([]);
    setCurrentQuestionIndex(0);
    setAnswersState({});
    // 切換模式時重置提示和答案顯示
    if (newMode === 'practice') {
      setShowHints(false);
      setShowSolution(false);
    }
  };

  // 题目导航函数
  const handleNextQuestion = () => {
    // 保存当前题目的状态
    saveCurrentQuestionState();
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handlePreviousQuestion = () => {
    // 保存当前题目的状态
    saveCurrentQuestionState();
    setCurrentQuestionIndex(prev => prev - 1);
  };

  const saveCurrentQuestionState = () => {
    const testContent = lesson.content.test;
    const currentQuestion = testContent.questions?.[currentQuestionIndex];
    
    setAnswersState(prev => ({
      ...prev,
      [currentQuestionIndex]: {
        selectedAnswer,
        showResult,
        draggedBlocks: [...draggedBlocks],
        availableBlocks: [...availableBlocks],
        draggedBlocksLines: currentQuestion?.multiLine ? draggedBlocksLines.map(line => [...line]) : [],
        availableBlocksLines: currentQuestion?.sharedBlocks === false ? availableBlocksLines.map(line => [...line]) : []
      }
    }));
  };

  // 拖拽处理函数
  const handleDragStart = (e, block, fromArea) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify({ block, fromArea }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropToAnswer = (e, index) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const { block, fromArea } = data;

    if (fromArea === 'available') {
      // 从可用区移到答案区
      const newAvailable = availableBlocks.filter(b => b !== block);
      const newDragged = [...draggedBlocks];
      newDragged.splice(index, 0, block);
      setAvailableBlocks(newAvailable);
      setDraggedBlocks(newDragged);
    } else if (fromArea === 'answer') {
      // 在答案区内重新排列
      const oldIndex = draggedBlocks.indexOf(block);
      const newDragged = [...draggedBlocks];
      newDragged.splice(oldIndex, 1);
      newDragged.splice(index, 0, block);
      setDraggedBlocks(newDragged);
    }
  };

  const handleDropToAvailable = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const { block, fromArea } = data;

    if (fromArea === 'answer') {
      // 从答案区移回可用区
      const newDragged = draggedBlocks.filter(b => b !== block);
      setDraggedBlocks(newDragged);
      setAvailableBlocks([...availableBlocks, block]);
    }
  };

  const handleCheckDragAnswer = () => {
    setShowResult(true);
  };

  const handleResetDrag = () => {
    const testContent = lesson.content.test;
    
    // 支持新格式（多题目）和旧格式（单题目）
    const currentTest = testContent.questions 
      ? testContent.questions[currentQuestionIndex]
      : testContent;
    
    if (currentTest.multiLine && currentTest.lines) {
      if (currentTest.sharedBlocks === false) {
        // 每行独立的代码块重置
        const shuffledLines = currentTest.lines.map(line => {
          const blocks = [...line.blocks];
          return blocks.sort(() => Math.random() - 0.5);
        });
        setAvailableBlocksLines(shuffledLines);
        setDraggedBlocksLines(currentTest.lines.map(() => []));
        setShowResult(false);
      } else {
        // 共享代码块池重置
        const allBlocks = currentTest.lines.flatMap(line => line.blocks);
        const shuffled = allBlocks.sort(() => Math.random() - 0.5);
        setAvailableBlocks(shuffled);
        setDraggedBlocksLines(currentTest.lines.map(() => []));
        setShowResult(false);
      }
    } else if (currentTest.blocks) {
      // 单行拖拉题重置
      const blocks = [...currentTest.blocks];
      const shuffled = blocks.sort(() => Math.random() - 0.5);
      setAvailableBlocks(shuffled);
      setDraggedBlocks([]);
      setShowResult(false);
    }
  };

  // 多行拖拉处理函数
  const handleDragStartMultiLine = (e, block, fromArea, fromLineIndex = null) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify({ block, fromArea, fromLineIndex }));
  };

  const handleDropToAnswerLine = (e, lineIndex, index) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const { block, fromArea, fromLineIndex } = data;
    
    const testContent = lesson.content.test;
    const currentQuestion = testContent.questions?.[currentQuestionIndex];
    const useIndependentBlocks = currentQuestion?.sharedBlocks === false;

    if (fromArea === 'available') {
      if (useIndependentBlocks) {
        // 从该行的独立可用区移到答案区
        const newAvailableLines = [...availableBlocksLines];
        newAvailableLines[fromLineIndex] = newAvailableLines[fromLineIndex].filter(b => b !== block);
        const newLines = [...draggedBlocksLines];
        const newLine = [...(newLines[lineIndex] || [])];
        newLine.splice(index, 0, block);
        newLines[lineIndex] = newLine;
        setAvailableBlocksLines(newAvailableLines);
        setDraggedBlocksLines(newLines);
      } else {
        // 从共享可用区移到指定行
        const newAvailable = availableBlocks.filter(b => b !== block);
        const newLines = [...draggedBlocksLines];
        const newLine = [...(newLines[lineIndex] || [])];
        newLine.splice(index, 0, block);
        newLines[lineIndex] = newLine;
        setAvailableBlocks(newAvailable);
        setDraggedBlocksLines(newLines);
      }
    } else if (fromArea === 'answer' && fromLineIndex === lineIndex) {
      // 在同一行内重新排列
      const newLines = [...draggedBlocksLines];
      const oldIndex = newLines[lineIndex].indexOf(block);
      const newLine = [...newLines[lineIndex]];
      newLine.splice(oldIndex, 1);
      newLine.splice(index, 0, block);
      newLines[lineIndex] = newLine;
      setDraggedBlocksLines(newLines);
    } else if (fromArea === 'answer' && fromLineIndex !== lineIndex && !useIndependentBlocks) {
      // 从一行移到另一行（只在共享模式下允许）
      const newLines = [...draggedBlocksLines];
      newLines[fromLineIndex] = newLines[fromLineIndex].filter(b => b !== block);
      const newLine = [...(newLines[lineIndex] || [])];
      newLine.splice(index, 0, block);
      newLines[lineIndex] = newLine;
      setDraggedBlocksLines(newLines);
    }
  };

  const handleDropToAvailableFromLine = (e, targetLineIndex = null) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const { block, fromArea, fromLineIndex } = data;
    
    const testContent = lesson.content.test;
    const currentQuestion = testContent.questions?.[currentQuestionIndex];
    const useIndependentBlocks = currentQuestion?.sharedBlocks === false;

    if (fromArea === 'answer') {
      if (useIndependentBlocks) {
        // 移回该行的独立可用区
        const newLines = [...draggedBlocksLines];
        newLines[fromLineIndex] = newLines[fromLineIndex].filter(b => b !== block);
        const newAvailableLines = [...availableBlocksLines];
        newAvailableLines[fromLineIndex] = [...newAvailableLines[fromLineIndex], block];
        setDraggedBlocksLines(newLines);
        setAvailableBlocksLines(newAvailableLines);
      } else {
        // 从答案行移回共享可用区
        const newLines = [...draggedBlocksLines];
        newLines[fromLineIndex] = newLines[fromLineIndex].filter(b => b !== block);
        setDraggedBlocksLines(newLines);
        setAvailableBlocks([...availableBlocks, block]);
      }
    }
  };

  const handleFontSizeChange = () => {
    if (fontSize === 'small') setFontSize('medium');
    else if (fontSize === 'medium') setFontSize('large');
    else setFontSize('small');
  };

  const renderLecture = () => {
    // Convert YouTube URL to embed format
    const getYouTubeEmbedUrl = (url) => {
      if (!url) return null;
      
      // Handle youtu.be format
      const youtubeShortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
      if (youtubeShortMatch) {
        return `https://www.youtube.com/embed/${youtubeShortMatch[1]}`;
      }
      
      // Handle youtube.com format
      const youtubeLongMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
      if (youtubeLongMatch) {
        return `https://www.youtube.com/embed/${youtubeLongMatch[1]}`;
      }
      
      return null;
    };

    const embedUrl = getYouTubeEmbedUrl(lesson.videoUrl);
    const hasVideo = !!embedUrl;

    return (
      <div className="lecture-content">
        {/* Learning Mode Toggle - only show if video exists */}
        {hasVideo && (
          <div className="learning-mode-toggle">
            <button 
              className={`mode-toggle-btn ${learningMode === 'text' ? 'active' : ''}`}
              onClick={() => setLearningMode('text')}
            >
              📄 Text Tutorial
            </button>
            <button 
              className={`mode-toggle-btn ${learningMode === 'video' ? 'active' : ''}`}
              onClick={() => setLearningMode('video')}
            >
              🎥 Video Tutorial
            </button>
          </div>
        )}

        {/* Video Content */}
        {hasVideo && learningMode === 'video' && (
          <div className="video-container">
            <iframe
              width="100%"
              height="500"
              src={embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Text Content */}
        {(!hasVideo || learningMode === 'text') && (
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
        )}

        <div className="action-buttons">
          <button className="btn btn-test" onClick={() => handleModeChange('test')}>
            📝 Start Test
          </button>
        </div>
      </div>
    );
  };

  const renderTest = () => {
    const test = lesson.content.test;

    // Multi-question format
    if (test.questions) {
      const currentQuestion = test.questions[currentQuestionIndex];
      const totalQuestions = test.questions.length;

      // Render drag-and-drop question
      if (currentQuestion.type === 'drag-and-drop') {
        // Multi-line drag-and-drop
        if (currentQuestion.multiLine && currentQuestion.lines) {
          const allCorrect = currentQuestion.lines.every((line, index) => 
            JSON.stringify(draggedBlocksLines[index]) === JSON.stringify(line.correctOrder)
          );

          return (
            <div className="test-content">
              <h2>📝 Test - Question {currentQuestionIndex + 1} of {totalQuestions}</h2>
              <div className="question-box">
                <p className="drag-question">{currentQuestion.question}</p>
                
                {/* 多行答案区 */}
                {currentQuestion.lines.map((line, lineIndex) => (
                  <div key={lineIndex} className="answer-area">
                    <div className="area-label">{line.label}</div>
                    <div 
                      className={`drop-zone ${line.indent ? 'indented' : ''}`}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDropToAnswerLine(e, lineIndex, draggedBlocksLines[lineIndex]?.length || 0)}
                    >
                      {(!draggedBlocksLines[lineIndex] || draggedBlocksLines[lineIndex].length === 0) ? (
                        <div className="drop-placeholder">Drag blocks here</div>
                      ) : (
                        draggedBlocksLines[lineIndex].map((block, index) => {
                          const lineCorrect = JSON.stringify(draggedBlocksLines[lineIndex]) === JSON.stringify(line.correctOrder);
                          return (
                            <React.Fragment key={index}>
                              <div
                                className={`code-block ${showResult ? (lineCorrect ? 'correct-block' : 'incorrect-block') : ''}`}
                                draggable={!showResult}
                                onDragStart={(e) => handleDragStartMultiLine(e, block, 'answer', lineIndex)}
                              >
                                {block}
                              </div>
                              <div
                                className="drop-between"
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDropToAnswerLine(e, lineIndex, index + 1)}
                              />
                            </React.Fragment>
                          );
                        })
                      )}
                    </div>
                    {draggedBlocksLines[lineIndex]?.length > 0 && (
                      <div className="result-code">
                        Result: <code>{draggedBlocksLines[lineIndex].join('')}</code>
                      </div>
                    )}
                    
                    {/* 每行独立的可用选项区 */}
                    {currentQuestion.sharedBlocks === false && (
                      <div className="line-available-area">
                        <div className="area-label-small">Available for this line:</div>
                        <div 
                          className="blocks-container-small"
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDropToAvailableFromLine(e, lineIndex)}
                        >
                          {availableBlocksLines[lineIndex]?.map((block, index) => (
                            <div
                              key={index}
                              className="code-block"
                              draggable
                              onDragStart={(e) => handleDragStartMultiLine(e, block, 'available', lineIndex)}
                            >
                              {block}
                            </div>
                          )) || null}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* 共享的可用选项区（仅在共享模式下显示） */}
                {currentQuestion.sharedBlocks !== false && (
                  <div className="available-area">
                    <div className="area-label">Available Blocks:</div>
                    <div 
                      className="blocks-container"
                      onDragOver={handleDragOver}
                      onDrop={handleDropToAvailableFromLine}
                    >
                      {availableBlocks.map((block, index) => (
                        <div
                          key={index}
                          className="code-block"
                          draggable
                          onDragStart={(e) => handleDragStartMultiLine(e, block, 'available')}
                        >
                          {block}
                        </div>
                      ))}
                      {availableBlocks.length === 0 && !showResult && (
                        <div className="empty-message">All blocks used</div>
                      )}
                    </div>
                  </div>
                )}

                {/* 操作按钮 */}
                {!showResult && draggedBlocksLines.some(line => line.length > 0) && (
                  <div className="action-buttons">
                    <button className="btn btn-check" onClick={handleCheckDragAnswer}>
                      ✓ Check Answer
                    </button>
                    <button className="btn btn-reset" onClick={handleResetDrag}>
                      ↻ Reset
                    </button>
                  </div>
                )}
              </div>
              
              {/* 结果显示 */}
              {showResult && (
                <div className={`result ${allCorrect ? 'correct' : 'incorrect'}`}>
                  <h3>{allCorrect ? '✅ Correct!' : '❌ Incorrect!'}</h3>
                  <p className="explanation">{currentQuestion.explanation}</p>
                  <div className="action-buttons">
                    <button className="btn btn-retry" onClick={handleResetDrag}>
                      Retry Question
                    </button>
                    {currentQuestionIndex < totalQuestions - 1 && (
                      <button className="btn btn-next" onClick={handleNextQuestion}>
                        Next Question →
                      </button>
                    )}
                    {currentQuestionIndex === totalQuestions - 1 && (
                      <button className="btn btn-practice" onClick={() => handleModeChange('practice')}>
                        💻 Start Practice
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              {!showResult && (
                <div className="question-navigation">
                  <button 
                    className="btn btn-prev" 
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    ← Previous
                  </button>
                  <button 
                    className="btn btn-next" 
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === totalQuestions - 1}
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          );
        }

        // Single-line drag-and-drop
        const isCorrect = JSON.stringify(draggedBlocks) === JSON.stringify(currentQuestion.correctOrder);
        const result = draggedBlocks.join('');

        return (
          <div className="test-content">
            <h2>📝 Test - Question {currentQuestionIndex + 1} of {totalQuestions}</h2>
            <div className="question-box">
              <p className="drag-question">{currentQuestion.question}</p>
              
              {/* 答案区 */}
              <div className="answer-area">
                <div className="area-label">Your Answer:</div>
                <div 
                  className="drop-zone"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropToAnswer(e, draggedBlocks.length)}
                >
                  {draggedBlocks.length === 0 ? (
                    <div className="drop-placeholder">Drag blocks here</div>
                  ) : (
                    draggedBlocks.map((block, index) => (
                      <React.Fragment key={index}>
                        <div
                          className={`code-block ${showResult ? (isCorrect ? 'correct-block' : 'incorrect-block') : ''}`}
                          draggable={!showResult}
                          onDragStart={(e) => handleDragStart(e, block, 'answer')}
                        >
                          {block}
                        </div>
                        <div
                          className="drop-between"
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDropToAnswer(e, index + 1)}
                        />
                      </React.Fragment>
                    ))
                  )}
                </div>
                {draggedBlocks.length > 0 && (
                  <div className="result-code">
                    Result: <code>{result}</code>
                  </div>
                )}
              </div>

              {/* 可用选项区 */}
              <div className="available-area">
                <div className="area-label">Available Blocks:</div>
                <div 
                  className="blocks-container"
                  onDragOver={handleDragOver}
                  onDrop={handleDropToAvailable}
                >
                  {availableBlocks.map((block, index) => (
                    <div
                      key={index}
                      className="code-block"
                      draggable
                      onDragStart={(e) => handleDragStart(e, block, 'available')}
                    >
                      {block}
                    </div>
                  ))}
                  {availableBlocks.length === 0 && !showResult && (
                    <div className="empty-message">All blocks used</div>
                  )}
                </div>
              </div>

              {/* 操作按钮 */}
              {!showResult && draggedBlocks.length > 0 && (
                <div className="action-buttons">
                  <button className="btn btn-check" onClick={handleCheckDragAnswer}>
                    ✓ Check Answer
                  </button>
                  <button className="btn btn-reset" onClick={handleResetDrag}>
                    ↻ Reset
                  </button>
                </div>
              )}
            </div>
            
            {/* 结果显示 */}
            {showResult && (
              <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
                <h3>{isCorrect ? '✅ Correct!' : '❌ Incorrect!'}</h3>
                <p className="explanation">{currentQuestion.explanation}</p>
                <div className="action-buttons">
                  <button className="btn btn-retry" onClick={handleResetDrag}>
                    Retry Question
                  </button>
                  {currentQuestionIndex < totalQuestions - 1 && (
                    <button className="btn btn-next" onClick={handleNextQuestion}>
                      Next Question →
                    </button>
                  )}
                  {currentQuestionIndex === totalQuestions - 1 && (
                    <button className="btn btn-practice" onClick={() => handleModeChange('practice')}>
                      💻 Start Practice
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            {!showResult && (
              <div className="question-navigation">
                <button 
                  className="btn btn-prev" 
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  ← Previous
                </button>
                <button 
                  className="btn btn-next" 
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === totalQuestions - 1}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        );
      }

      // Render multiple-choice question
      if (currentQuestion.type === 'multiple-choice') {
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

        return (
          <div className="test-content">
            <h2>📝 Test - Question {currentQuestionIndex + 1} of {totalQuestions}</h2>
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
                {currentQuestion.question}
              </ReactMarkdown>
              <div className="options">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`option ${
                      showResult
                        ? index === currentQuestion.correctAnswer
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
                <p className="explanation">{currentQuestion.explanation}</p>
                <div className="action-buttons">
                  <button className="btn btn-retry" onClick={() => handleModeChange('test')}>
                    Retry Question
                  </button>
                  {currentQuestionIndex < totalQuestions - 1 && (
                    <button className="btn btn-next" onClick={handleNextQuestion}>
                      Next Question →
                    </button>
                  )}
                  {currentQuestionIndex === totalQuestions - 1 && (
                    <button className="btn btn-practice" onClick={() => handleModeChange('practice')}>
                      💻 Start Practice
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            {!showResult && (
              <div className="question-navigation">
                <button 
                  className="btn btn-prev" 
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  ← Previous
                </button>
                <button 
                  className="btn btn-next" 
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === totalQuestions - 1}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        );
      }
    }

    // Old single-question format (backward compatibility)
    // 拖拽题型
    if (test.type === 'drag-and-drop') {
      const isCorrect = JSON.stringify(draggedBlocks) === JSON.stringify(test.correctOrder);
      const result = draggedBlocks.join('');

      return (
        <div className="test-content">
          <h2>📝 Test - Drag & Drop</h2>
          <div className="question-box">
            <p className="drag-question">{test.question}</p>
            
            {/* 答案区 */}
            <div className="answer-area">
              <div className="area-label">Your Answer:</div>
              <div 
                className="drop-zone"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropToAnswer(e, draggedBlocks.length)}
              >
                {draggedBlocks.length === 0 ? (
                  <div className="drop-placeholder">Drag blocks here</div>
                ) : (
                  draggedBlocks.map((block, index) => (
                    <React.Fragment key={index}>
                      <div
                        className={`code-block ${showResult ? (isCorrect ? 'correct-block' : 'incorrect-block') : ''}`}
                        draggable={!showResult}
                        onDragStart={(e) => handleDragStart(e, block, 'answer')}
                      >
                        {block}
                      </div>
                      <div
                        className="drop-between"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDropToAnswer(e, index + 1)}
                      />
                    </React.Fragment>
                  ))
                )}
              </div>
              {draggedBlocks.length > 0 && (
                <div className="result-code">
                  Result: <code>{result}</code>
                </div>
              )}
            </div>

            {/* 可用选项区 */}
            <div className="available-area">
              <div className="area-label">Available Blocks:</div>
              <div 
                className="blocks-container"
                onDragOver={handleDragOver}
                onDrop={handleDropToAvailable}
              >
                {availableBlocks.map((block, index) => (
                  <div
                    key={index}
                    className="code-block"
                    draggable
                    onDragStart={(e) => handleDragStart(e, block, 'available')}
                  >
                    {block}
                  </div>
                ))}
                {availableBlocks.length === 0 && !showResult && (
                  <div className="empty-message">All blocks used</div>
                )}
              </div>
            </div>

            {/* 操作按钮 */}
            {!showResult && draggedBlocks.length > 0 && (
              <div className="action-buttons">
                <button className="btn btn-check" onClick={handleCheckDragAnswer}>
                  ✓ Check Answer
                </button>
                <button className="btn btn-reset" onClick={handleResetDrag}>
                  ↻ Reset
                </button>
              </div>
            )}
          </div>
          
          {/* 结果显示 */}
          {showResult && (
            <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
              <h3>{isCorrect ? '✅ Correct!' : '❌ Incorrect!'}</h3>
              <p className="explanation">{test.explanation}</p>
              <div className="action-buttons">
                <button className="btn btn-retry" onClick={handleResetDrag}>
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
    }

    // 传统选择题型
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
    <div className={`content-panel ${theme} font-${fontSize}`}>
      <div className="panel-header">
        <div className="header-top">
          <h1>{lesson.title}</h1>
          <div className="header-controls">
            <button 
              className="font-size-btn"
              onClick={handleFontSizeChange}
              title={`Font Size: ${fontSize.charAt(0).toUpperCase() + fontSize.slice(1)}`}
            >
              <span className="font-icon">
                {fontSize === 'small' && <span style={{fontSize: '14px'}}>A</span>}
                {fontSize === 'medium' && <span style={{fontSize: '16px'}}>A</span>}
                {fontSize === 'large' && <span style={{fontSize: '18px'}}>A</span>}
              </span>
              <span className="font-label">
                {fontSize === 'small' ? 'Small' : fontSize === 'medium' ? 'Medium' : 'Large'}
              </span>
            </button>
            <button 
              className="theme-toggle-btn"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
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
