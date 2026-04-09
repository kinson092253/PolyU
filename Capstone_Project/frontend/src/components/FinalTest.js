import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CodeEditor from './CodeEditor';
import OutputPanel from './OutputPanel';
import ResizablePanel from './ResizablePanel';
import AIAssistantModal from './AIAssistantModal';
import CongratulationsModal from './CongratulationsModal';
import { API_BASE_URL } from '../config';
import './FinalTest.css';

const FinalTest = ({ lesson, fileManagerRef }) => {
  // Stage: 1=MC, 2=Dropdown, 3=Coding
  const [currentStage, setCurrentStage] = useState(1);
  // Track the furthest stage the user has reached so navigation stays unlocked
  const [maxStageReached, setMaxStageReached] = useState(1);
  
  // Stage 1: Multiple Choice
  const [mcCurrentQuestion, setMcCurrentQuestion] = useState(0);
  const [mcAnswers, setMcAnswers] = useState({});
  const [mcShowResult, setMcShowResult] = useState(false);
  
  // Stage 2: Dropdown Questions
  const [dropdownCurrentQuestion, setDropdownCurrentQuestion] = useState(0);
  const [dropdownAnswers, setDropdownAnswers] = useState({});
  const [dropdownShowResult, setDropdownShowResult] = useState(false);
  
  // Stage 3: Coding Challenge
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);
  const [expectedOutput, setExpectedOutput] = useState('');
  
  // AI Assistant
  const [showAIModal, setShowAIModal] = useState(false);
  const [hint, setHint] = useState(null);
  const [hintLevel, setHintLevel] = useState(0);
  const [loadingHint, setLoadingHint] = useState(false);
  const codeEditorRef = useRef(null);
  // Debounce timer for saving code to DB
  const codeSaveTimerRef = useRef(null);

  // Congratulations Modal
  const [showCongrats, setShowCongrats] = useState(false);

  // Loading state
  const [isLoadingAnswers, setIsLoadingAnswers] = useState(true);

  const { multipleChoice, dropdownQuestions, codingChallenge } = lesson.content;
  const userId = 1; // Default user ID

  // Load saved answers on mount
  useEffect(() => {
    const loadSavedAnswers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/final-test/answers/${userId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.answers) {
            const mcAnswersObj = {};
            const dropdownAnswersObj = {};

            // Load MC answers
            Object.keys(data.answers.mc || {}).forEach(index => {
              mcAnswersObj[parseInt(index)] = data.answers.mc[index];
            });

            // Load Dropdown answers
            Object.keys(data.answers.dropdown || {}).forEach(index => {
              dropdownAnswersObj[parseInt(index)] = data.answers.dropdown[index];
            });

            setMcAnswers(mcAnswersObj);
            setDropdownAnswers(dropdownAnswersObj);

            // Load Coding answer
            if (data.answers.coding && data.answers.coding[0] !== undefined) {
              setCode(data.answers.coding[0]);
            }

            // Restore stage: advance based on how many answers are completed
            const mcTotal = multipleChoice ? multipleChoice.length : 0;
            const dropTotal = dropdownQuestions ? dropdownQuestions.length : 0;
            const mcDone = Object.keys(mcAnswersObj).length;

            // Check if all blanks are filled for each dropdown question
            const dropDone = dropdownQuestions
              ? dropdownQuestions.filter((q, i) => {
                  const saved = dropdownAnswersObj[i] || {};
                  return q.blanks && q.blanks.every(b => saved[b.id]);
                }).length
              : 0;

            if (mcTotal > 0 && mcDone >= mcTotal && dropTotal > 0 && dropDone >= dropTotal) {
              // All stages done — go to coding challenge
              setCurrentStage(3);
              setMaxStageReached(3);
            } else if (mcTotal > 0 && mcDone >= mcTotal) {
              // MC done — go to dropdown, navigate to first unanswered
              setCurrentStage(2);
              setMaxStageReached(2);
              for (let i = 0; i < dropTotal; i++) {
                const saved = dropdownAnswersObj[i] || {};
                const q = dropdownQuestions[i];
                if (!q.blanks || !q.blanks.every(b => saved[b.id])) {
                  setDropdownCurrentQuestion(i);
                  break;
                }
              }
            } else if (mcDone > 0) {
              // Partial MC — navigate to first unanswered MC question
              for (let i = 0; i < mcTotal; i++) {
                if (mcAnswersObj[i] === undefined) {
                  setMcCurrentQuestion(i);
                  break;
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Failed to load saved answers:', error);
      } finally {
        setIsLoadingAnswers(false);
      }
    };

    loadSavedAnswers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Save answer to backend
  const saveAnswer = async (questionType, questionIndex, answerData) => {
    try {
      await fetch(`${API_BASE_URL}/final-test/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          questionType,
          questionIndex,
          answerData
        })
      });
    } catch (error) {
      console.error('Failed to save answer:', error);
    }
  };

  // Clear all saved answers (Restart)
  const handleRestart = async () => {
    if (window.confirm('Are you sure you want to restart the Final Test? All your answers will be cleared.')) {
      try {
        const response = await fetch(`${API_BASE_URL}/final-test/answers/${userId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          // Reset all state
          setMcAnswers({});
          setMcCurrentQuestion(0);
          setMcShowResult(false);
          setDropdownAnswers({});
          setDropdownCurrentQuestion(0);
          setDropdownShowResult(false);
          setCurrentStage(1);
          setMaxStageReached(1);
          setCode('');
          setOutput('');
          alert('Final Test has been restarted. All answers cleared.');
        }
      } catch (error) {
        console.error('Failed to restart:', error);
        alert('Failed to restart. Please try again.');
      }
    }
  };

  // Initialize coding challenge when entering stage 3
  useEffect(() => {
    if (currentStage === 3 && codingChallenge) {
      // Only set starter code if no code has been loaded yet (avoid overwriting DB-loaded code)
      setCode(prev => prev || codingChallenge.starterCode || '');
      setExpectedOutput(codingChallenge.expectedOutput || '');
      setOutput('');
      // Reset AI hint state
      setHint(null);
      setHintLevel(0);
    }
  }, [currentStage, codingChallenge]);

  // ===================== Stage 1: Multiple Choice =====================
  const handleMcAnswer = (optionIndex) => {
    const newAnswers = {
      ...mcAnswers,
      [mcCurrentQuestion]: optionIndex
    };
    setMcAnswers(newAnswers);
    // Save to backend
    saveAnswer('mc', mcCurrentQuestion, optionIndex);
  };

  const handleMcSubmit = () => {
    setMcShowResult(true);
  };

  const handleMcNext = () => {
    if (mcCurrentQuestion < multipleChoice.length - 1) {
      setMcCurrentQuestion(mcCurrentQuestion + 1);
      setMcShowResult(false);
    } else {
      // All MC questions completed, move to stage 2
      setCurrentStage(2);
      setMaxStageReached(prev => Math.max(prev, 2));
    }
  };

  // ===================== Stage 2: Dropdown Questions =====================
  const handleDropdownChange = (questionIndex, blankId, value) => {
    const newAnswers = {
      ...dropdownAnswers,
      [questionIndex]: {
        ...(dropdownAnswers[questionIndex] || {}),
        [blankId]: value
      }
    };
    setDropdownAnswers(newAnswers);
    // Save to backend
    saveAnswer('dropdown', questionIndex, newAnswers[questionIndex]);
  };

  const handleDropdownSubmit = () => {
    setDropdownShowResult(true);
  };

  const handleDropdownNext = () => {
    if (dropdownCurrentQuestion < dropdownQuestions.length - 1) {
      setDropdownCurrentQuestion(dropdownCurrentQuestion + 1);
      setDropdownShowResult(false);
    } else {
      // All dropdown questions completed, move to stage 3
      setCurrentStage(3);
      setMaxStageReached(prev => Math.max(prev, 3));
    }
  };

  const isDropdownQuestionCorrect = (questionIndex) => {
    const question = dropdownQuestions[questionIndex];
    const userAnswers = dropdownAnswers[questionIndex] || {};
    
    return question.blanks.every(blank => 
      userAnswers[blank.id] === blank.correctAnswer
    );
  };

  // ===================== Stage 3: Coding Challenge =====================
  const handleRunCode = (code, error, output) => {
    setOutput(output);
    setIsError(!!error);
    
    // Check if coding challenge is completed successfully
    if (!error && expectedOutput && output.trim() === expectedOutput.trim()) {
      // Show congratulations modal after a short delay
      setTimeout(() => {
        setShowCongrats(true);
      }, 500);
    }
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    // Debounced save to DB (wait 1s after user stops typing)
    if (codeSaveTimerRef.current) clearTimeout(codeSaveTimerRef.current);
    codeSaveTimerRef.current = setTimeout(() => {
      saveAnswer('coding', 0, newCode);
    }, 1000);
  };

  const handleReset = () => {
    setCode(codingChallenge.starterCode || '');
    setOutput('');
  };

  // ===================== AI Assistant =====================
  const handleRequestHint = (level) => {
    if (codeEditorRef.current?.handleRequestHint) {
      codeEditorRef.current.handleRequestHint(level);
    }
  };

  // ===================== Stage Navigation =====================
  const handleStageClick = (stageNum) => {
    if (stageNum === currentStage) return;
    // Only allow navigating to stages the user has already reached
    if (stageNum > maxStageReached) return;

    if (stageNum === 1) {
      setMcShowResult(false);
      setMcCurrentQuestion(0);
    } else if (stageNum === 2) {
      setDropdownShowResult(false);
      setDropdownCurrentQuestion(0);
    }
    setCurrentStage(stageNum);
  };

  // ===================== Render Functions =====================
  const renderProgressBar = () => {
    const stages = ['Multiple Choice', 'Fill in the Blanks', 'Coding Challenge'];
    return (
      <div className="final-test-progress">
        {stages.map((stage, index) => {
          const stageNum = index + 1;
          const isActive = currentStage === stageNum;
          const isReached = stageNum <= maxStageReached;
          const isClickable = isReached && !isActive;
          return (
            <div
              key={index}
              className={`progress-stage ${
                isReached && !isActive ? 'completed' : ''
              } ${
                isActive ? 'active' : ''
              } ${
                isClickable ? 'clickable' : ''
              }`}
              onClick={() => isClickable && handleStageClick(stageNum)}
              title={isClickable ? `Go to ${stage}` : ''}
            >
              <div className="progress-circle">{stageNum}</div>
              <div className="progress-label">{stage}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderStage1 = () => {
    const question = multipleChoice[mcCurrentQuestion];
    const isAnswered = mcAnswers[mcCurrentQuestion] !== undefined;
    // Review mode: user has already completed MC and advanced to stage 2+
    const isReviewMode = maxStageReached >= 2;
    const showResult = mcShowResult || isReviewMode;
    const userChoice = mcAnswers[mcCurrentQuestion];
    const isCorrect = userChoice === question.correctAnswer;

    return (
      <div className="final-test-stage stage-mc">
        <div className="question-container">
          {/* Question counter + arrow navigation */}
          <div className="question-nav">
            <button
              className="nav-arrow-btn"
              onClick={() => { setMcCurrentQuestion(q => q - 1); setMcShowResult(false); }}
              disabled={mcCurrentQuestion === 0}
            >&#8592;</button>
            <span className="question-counter">
              Question {mcCurrentQuestion + 1} / {multipleChoice.length}
            </span>
            <button
              className="nav-arrow-btn"
              onClick={() => { setMcCurrentQuestion(q => q + 1); setMcShowResult(false); }}
              disabled={mcCurrentQuestion === multipleChoice.length - 1}
            >&#8594;</button>
          </div>

          <h3 className="question-text">{question.question}</h3>
          
          <div className="options-list">
            {question.options.map((option, index) => {
              let cls = '';
              if (showResult) {
                if (index === question.correctAnswer) cls = 'correct';
                else if (index === userChoice) cls = 'incorrect';
              } else {
                if (index === userChoice) cls = 'selected';
              }
              return (
                <div
                  key={index}
                  className={`option-item ${cls}`}
                  onClick={() => !showResult && handleMcAnswer(index)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                  {showResult && index === question.correctAnswer && (
                    <span className="correct-badge">✓ Correct Answer</span>
                  )}
                </div>
              );
            })}
          </div>

          {showResult && (
            <div className={`explanation ${isCorrect ? 'correct' : 'incorrect'}`}>
              <strong>{isCorrect ? '✅ Correct!' : '❌ Incorrect'}</strong>
              <p>{question.explanation}</p>
            </div>
          )}

          <div className="question-actions">
            {/* Show Submit when in normal flow (not review mode, not yet submitted) */}
            {!isReviewMode && !mcShowResult && (
              <button
                className="btn-submit"
                onClick={handleMcSubmit}
                disabled={!isAnswered}
              >
                Submit Answer
              </button>
            )}
            {mcShowResult && (
              <button
                className="btn-next"
                onClick={handleMcNext}
              >
                {mcCurrentQuestion < multipleChoice.length - 1 ? 'Next Question' : 'Continue to Fill in the Blanks →'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderStage2 = () => {
    const question = dropdownQuestions[dropdownCurrentQuestion];
    const userAnswers = dropdownAnswers[dropdownCurrentQuestion] || {};
    const allAnswered = question.blanks.every(blank => userAnswers[blank.id]);
    // Review mode: user has already completed dropdown and advanced to stage 3
    const isReviewMode = maxStageReached >= 3;
    const showResult = dropdownShowResult || isReviewMode;

    // Render template with dropdowns
    const renderTemplate = () => {
      let template = question.template;
      const parts = [];
      
      question.blanks.forEach((blank, index) => {
        const splitParts = template.split(`___${blank.id}___`);
        if (splitParts.length >= 2) {
          parts.push(
            <span key={`text-${index}`}>{splitParts[0]}</span>
          );
          const isBlankCorrect = userAnswers[blank.id] === blank.correctAnswer;
          parts.push(
            <span key={`wrap-${index}`} className="blank-wrapper">
              <select
                key={`select-${index}`}
                className={`blank-select ${
                  showResult
                    ? (isBlankCorrect ? 'correct' : 'incorrect')
                    : ''
                }`}
                value={userAnswers[blank.id] || ''}
                onChange={(e) => !showResult && handleDropdownChange(dropdownCurrentQuestion, blank.id, e.target.value)}
                disabled={showResult}
              >
                <option value="">___</option>
                {blank.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
              {showResult && !isBlankCorrect && (
                <span className="correct-answer-hint">→ {blank.correctAnswer}</span>
              )}
            </span>
          );
          template = splitParts.slice(1).join(`___${blank.id}___`);
        }
      });
      
      // Add remaining text
      if (template) {
        parts.push(<span key="text-final">{template}</span>);
      }
      
      return parts;
    };
    
    return (
      <div className="final-test-stage stage-dropdown">
        <div className="question-container">
          {/* Question counter + arrow navigation */}
          <div className="question-nav">
            <button
              className="nav-arrow-btn"
              onClick={() => { setDropdownCurrentQuestion(q => q - 1); setDropdownShowResult(false); }}
              disabled={dropdownCurrentQuestion === 0}
            >&#8592;</button>
            <span className="question-counter">
              Question {dropdownCurrentQuestion + 1} / {dropdownQuestions.length}
            </span>
            <button
              className="nav-arrow-btn"
              onClick={() => { setDropdownCurrentQuestion(q => q + 1); setDropdownShowResult(false); }}
              disabled={dropdownCurrentQuestion === dropdownQuestions.length - 1}
            >&#8594;</button>
          </div>

          <h3 className="question-text">{question.question}</h3>
          
          <div className="code-template">
            <pre>{renderTemplate()}</pre>
          </div>

          {showResult && (
            <div className={`explanation ${isDropdownQuestionCorrect(dropdownCurrentQuestion) ? 'correct' : 'incorrect'}`}>
              <strong>{isDropdownQuestionCorrect(dropdownCurrentQuestion) ? '✅ All Correct!' : '❌ Some answers are incorrect'}</strong>
              <p>{question.explanation}</p>
            </div>
          )}

          <div className="question-actions">
            {/* Only show Submit when in normal flow (not review mode, not yet submitted) */}
            {!isReviewMode && !dropdownShowResult && (
              <button
                className="btn-submit"
                onClick={handleDropdownSubmit}
                disabled={!allAnswered}
              >
                Submit Answer
              </button>
            )}
            {dropdownShowResult && (
              <button
                className="btn-next"
                onClick={handleDropdownNext}
              >
                {dropdownCurrentQuestion < dropdownQuestions.length - 1 ? 'Next Question' : 'Continue to Coding Challenge →'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderStage3 = () => {
    // Debug: Check if codingChallenge exists
    if (!codingChallenge) {
      return (
        <div className="final-test-stage stage-coding">
          <div style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
            <h2>⚠️ Coding Challenge data not found</h2>
            <p>Please check the finalTest.js data file.</p>
          </div>
        </div>
      );
    }

    // Create adapted lesson object for CodeEditor to find starterCode
    const adaptedLesson = {
      ...lesson,
      content: {
        ...lesson.content,
        practice: {
          starterCode: codingChallenge.starterCode
        }
      }
    };

    return (
      <div className="final-test-stage stage-coding">
        <ResizablePanel>
          {/* Left Panel - Description */}
          <div className="coding-description">
            <div className="description-content">
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
                {codingChallenge.description}
              </ReactMarkdown>
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <CodeEditor
            ref={codeEditorRef}
            lesson={adaptedLesson}
            initialCode={code}
            code={code}
            onCodeChange={handleCodeChange}
            onRunCode={handleRunCode}
            onReset={handleReset}
            lessonId={lesson?.id}
            expectedOutput={expectedOutput}
            fileManagerRef={fileManagerRef}
            onAIAssistantClick={() => setShowAIModal(true)}
            hint={hint}
            hintLevel={hintLevel}
            loadingHint={loadingHint}
            setHint={setHint}
            setHintLevel={setHintLevel}
            setLoadingHint={setLoadingHint}
          />

          {/* Right Panel - Output */}
          <OutputPanel
            output={output}
            isError={isError}
            expectedOutput={expectedOutput}
            code={code}
          />
        </ResizablePanel>
      </div>
    );
  };

  return (
    <div className="final-test-container">
      <div className="final-test-header">
        {renderProgressBar()}
        <button className="restart-button" onClick={handleRestart} title="Restart Final Test">
          🔄 Restart
        </button>
      </div>
      
      {isLoadingAnswers ? (
        <div className="loading-container">
          <p>Loading your previous answers...</p>
        </div>
      ) : (
        <div className="final-test-content">
          {currentStage === 1 && renderStage1()}
          {currentStage === 2 && renderStage2()}
          {currentStage === 3 && renderStage3()}
        </div>
      )}

      {currentStage < 3 && (
        <div className="final-test-footer">
          <p>💡 Tip: Take your time and read each question carefully!</p>
        </div>
      )}

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        hint={hint}
        hintLevel={hintLevel}
        loading={loadingHint}
        onRequestHint={handleRequestHint}
      />

      {/* Congratulations Modal */}
      <CongratulationsModal
        show={showCongrats}
        onClose={() => setShowCongrats(false)}
      />
    </div>
  );
};

export default FinalTest;