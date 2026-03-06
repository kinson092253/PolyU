import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ContentPanel from './components/ContentPanel';
import CodeEditor from './components/CodeEditor';
import OutputPanel from './components/OutputPanel';
import ResizablePanel from './components/ResizablePanel';
import Dashboard from './components/Dashboard';
import FileManager from './components/FileManager';
import AIAssistantModal from './components/AIAssistantModal';
import learningTracker from './services/learningTracker';
import { lessons as pythonLessons } from './data/index';
import './App.css';

function App() {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [savedSelectedLesson, setSavedSelectedLesson] = useState(null); // 保存在Dashboard打开前的选择
  const [refreshEditorKey, setRefreshEditorKey] = useState(0); // 用来强制重新挂载编辑器
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);
  const [editorCode, setEditorCode] = useState(''); // 初始為空
  const [expectedOutput, setExpectedOutput] = useState(''); // 預期輸出
  const [showDashboard, setShowDashboard] = useState(false); // Dashboard 顯示狀態
  const [showSettings, setShowSettings] = useState(false); // Settings 顯示狀態
  const [showAIModal, setShowAIModal] = useState(false); // AI 助手 Modal 顯示狀態
  const [hint, setHint] = useState(null); // AI hint content
  const [hintLevel, setHintLevel] = useState(0); // AI hint level (0-3)
  const [loadingHint, setLoadingHint] = useState(false); // AI hint loading state
  const fileManagerRef = useRef(null); // Reference to FileManager
  const codeEditorRef = useRef(null); // Reference to CodeEditor for AI hints

  // 加载课程代码的函数
  const loadLessonCodeFromDatabase = async (lesson) => {
    if (!lesson || !lesson.content.practice) {
      setEditorCode('');
      setExpectedOutput('');
      return;
    }

    try {
      // 尝试从数据库加载保存的代码
      const result = await learningTracker.getCode(lesson.id);
      console.log('加载代码结果:', result); // 调试日志
      
      if (result.success && result.code) {
        // 有保存的代码，使用保存的代码
        console.log('使用数据库中的代码:', result.code);
        setEditorCode(result.code);
      } else {
        // 没有保存的代码，使用 starter code
        console.log('使用 starter code:', lesson.content.practice.starterCode);
        setEditorCode(lesson.content.practice.starterCode || '');
      }
      
      setExpectedOutput(lesson.content.practice.expectedOutput || '');
      setOutput(''); // Clear output
    } catch (error) {
      console.error('加载代码出错:', error);
      setEditorCode(lesson.content.practice.starterCode || '');
      setExpectedOutput(lesson.content.practice.expectedOutput || '');
    }
  };

  // Update editor initial code when selecting new lesson
  useEffect(() => {
    // Reset AI hints when lesson changes
    setHint(null);
    setHintLevel(0);
    setLoadingHint(false);
    
    loadLessonCodeFromDatabase(selectedLesson);
  }, [selectedLesson]);

  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
  };

  // 保存用户代码到数据库
  const handleCodeChange = (newCode) => {
    setEditorCode(newCode);
    
    // 使用防抖保存到数据库
    if (selectedLesson && newCode) {
      // 使用 setTimeout 防止频繁保存
      if (window.saveCodeTimeout) {
        clearTimeout(window.saveCodeTimeout);
      }
      
      window.saveCodeTimeout = setTimeout(() => {
        learningTracker.saveCode(selectedLesson.id, newCode);
      }, 1000); // 1秒后保存
    }
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Handle AI hint request
  const handleRequestHint = (level) => {
    if (codeEditorRef.current?.handleRequestHint) {
      codeEditorRef.current.handleRequestHint(level);
    }
  };

  // Handle code execution from Skulpt
  const handleRunCode = async (code, userInput = '', output = '') => {
    // Skulpt 直接返回输出结果
    setIsError(output.includes('❌') || output.includes('Error') || output.includes('Traceback'));
    setOutput(output);
  };

  // 计算是否完成练习（output与expected output一致）
  const isPracticeComplete = output && expectedOutput && 
    output.trim() === expectedOutput.trim() && 
    !isError;

  // 跳转到下一个lesson
  const handleNextLesson = () => {
    if (!selectedLesson) return;

    // 找到当前lesson所在的chapter和subsection索引
    let currentChapterIndex = -1;
    let currentSubsectionIndex = -1;

    for (let i = 0; i < pythonLessons.length; i++) {
      const subsectionIndex = pythonLessons[i].subsections.findIndex(
        sub => sub.id === selectedLesson.id
      );
      if (subsectionIndex !== -1) {
        currentChapterIndex = i;
        currentSubsectionIndex = subsectionIndex;
        break;
      }
    }

    if (currentChapterIndex === -1) return;

    const currentChapter = pythonLessons[currentChapterIndex];
    
    // 尝试跳到当前chapter的下一个subsection
    if (currentSubsectionIndex < currentChapter.subsections.length - 1) {
      const nextLesson = currentChapter.subsections[currentSubsectionIndex + 1];
      setSelectedLesson(nextLesson);
    } else if (currentChapterIndex < pythonLessons.length - 1) {
      // 跳到下一个chapter的第一个subsection
      const nextChapter = pythonLessons[currentChapterIndex + 1];
      if (nextChapter.subsections.length > 0) {
        setSelectedLesson(nextChapter.subsections[0]);
      }
    }
  };

  // 返回到学习界面的处理函数
  const handleReturnFromDashboard = async () => {
    setShowDashboard(false);
    
    // 如果有保存的课程，加载并恢复它
    if (savedSelectedLesson) {
      // 先加载数据库中的代码
      await loadLessonCodeFromDatabase(savedSelectedLesson);
      
      // 代码加载完成后，再增加 refreshKey 来强制重新挂载编辑器
      setRefreshEditorKey(prev => prev + 1);
      
      // 最后设置课程
      setSelectedLesson(savedSelectedLesson);
    }
  };

  // 如果顯示 Dashboard，則渲染 Dashboard 組件
  if (showDashboard) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Navbar 
          onDashboardClick={() => {
            handleReturnFromDashboard();
          }}
          onSettingsClick={() => {
            setShowDashboard(false);
            setShowSettings(true);
            handleReturnFromDashboard();
          }}
        />
        <Dashboard onBackToLearning={() => {
          handleReturnFromDashboard();
        }} />
      </div>
    );
  }

  // 如果顯示 Settings（暂时显示占位符）
  if (showSettings) {
    return (
      <>
        <Navbar 
          onDashboardClick={() => {
            setShowSettings(false);
            setShowDashboard(true);
          }}
          onSettingsClick={() => setShowSettings(false)}
        />
        <div style={{ marginTop: '60px', padding: '40px', textAlign: 'center' }}>
          <h1>⚙️ Settings</h1>
          <p>Settings page coming soon...</p>
          <button 
            onClick={() => setShowSettings(false)}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Back to Learning
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="app">
      <Navbar 
        onDashboardClick={() => {
          setSavedSelectedLesson(selectedLesson); // 保存当前选择的课程
          setShowDashboard(true);
        }}
        onSettingsClick={() => setShowSettings(true)}
      />
      
      <div className="app-content">
        {!isSidebarCollapsed && (
          <Sidebar
            lessons={pythonLessons}
            onSelectLesson={handleSelectLesson}
            selectedLessonId={selectedLesson?.id}
            isCollapsed={isSidebarCollapsed}
            onToggle={handleToggleSidebar}
          />
        )}
        
        {isSidebarCollapsed && (
          <div className="collapsed-sidebar-btn show" onClick={handleToggleSidebar}>
            ☰
          </div>
        )}

        <ResizablePanel>
          <ContentPanel 
            lesson={selectedLesson}
            isPracticeComplete={isPracticeComplete}
            onNextLesson={handleNextLesson}
          />
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CodeEditor 
              ref={codeEditorRef}
              initialCode={editorCode} 
              onRunCode={handleRunCode}
              onCodeChange={handleCodeChange}
              lessonId={selectedLesson?.id}
              expectedOutput={expectedOutput}
              fileManagerRef={fileManagerRef}
              lesson={selectedLesson}
              hint={hint}
              hintLevel={hintLevel}
              loadingHint={loadingHint}
              setHint={setHint}
              setHintLevel={setHintLevel}
              setLoadingHint={setLoadingHint}
              onAIAssistantClick={() => setShowAIModal(true)}
              key={`${selectedLesson?.id}-${refreshEditorKey}`}
            />
            <FileManager
              ref={fileManagerRef}
              userId={1}
              lessonId={selectedLesson?.id}
              onFileSelect={(file) => {
                console.log('Selected file:', file);
              }}
            />
          </div>
          <OutputPanel 
            output={output} 
            isError={isError} 
            expectedOutput={expectedOutput}
          />
        </ResizablePanel>
      </div>
      
      {/* AI Assistant Modal */}
      {selectedLesson?.content?.practice && (
        <AIAssistantModal
          isOpen={showAIModal}
          onClose={() => setShowAIModal(false)}
          hint={hint}
          hintLevel={hintLevel}
          loading={loadingHint}
          onRequestHint={handleRequestHint}
        />
      )}
    </div>
  );
}

export default App;
