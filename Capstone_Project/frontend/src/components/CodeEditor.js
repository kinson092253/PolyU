import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Editor from '@monaco-editor/react';
import learningTracker from '../services/learningTracker';
import aiHelper from '../services/aiHelper';
import { API_BASE_URL } from '../config';
import './CodeEditor.css';

const CodeEditor = forwardRef(({ 
  initialCode, 
  onRunCode, 
  onCodeChange, 
  lessonId, 
  expectedOutput, 
  fileManagerRef, 
  lesson,
  hint,
  hintLevel,
  loadingHint,
  setHint,
  setHintLevel,
  setLoadingHint,
  onAIAssistantClick
}, ref) => {
  const editorRef = useRef(null);
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [output, setOutput] = useState(''); // Store latest output

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    handleRequestHint,
    handleResetHint
  }));

  // 當 initialCode 改變時，更新編輯器內容
  useEffect(() => {
    const newCode = initialCode !== undefined && initialCode !== null ? initialCode : '';
    setCode(newCode);
    if (editorRef.current) {
      const currentValue = editorRef.current.getValue();
      // 只有当内容真的不同时才更新
      if (currentValue !== newCode) {
        editorRef.current.setValue(newCode);
      }
    }
  }, [initialCode]);

  // 音效播放函数
  const playSound = (isCorrect) => {
    try {
      const soundFile = isCorrect ? '/correct_output.mp3' : '/wrong_output.mp3';
      const audio = new Audio(soundFile);
      audio.volume = 0.5; // 设置音量为50%
      audio.play().catch(err => {
        console.log('Audio playback failed:', err);
      });
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Sync editor content with initialCode prop.
    // This handles the re-mount case (e.g. switching stages in FinalTest) where
    // the useEffect ran before editorRef was set, so setValue() was never called.
    const initCode = initialCode !== undefined && initialCode !== null ? initialCode : '';
    if (initCode && editor.getValue() !== initCode) {
      editor.setValue(initCode);
    }
    
    // 設置編輯器主題和配置
    monaco.editor.defineTheme('customTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
      }
    });
    monaco.editor.setTheme('customTheme');
    
    // 确保编辑器使用 LTR 方向
    const model = editor.getModel();
    if (model) {
      model.setEOL(monaco.editor.EndOfLineSequence.LF);
    }
    
    // 更新编辑器选项
    editor.updateOptions({
      renderControlCharacters: false,
      renderWhitespace: 'none',
    });
  };

  const handleRunCode = async () => {
    if (isRunning) {
      onRunCode('', '', '⚠️ 代码正在运行中，请稍候...');
      return;
    }

    const currentCode = editorRef.current.getValue();
    
    // 检测是否包含交互式输入（必须在浏览器端执行）
    const hasInput = /input\s*\(/.test(currentCode);
    
    // 检测是否需要后端执行
    // 1. 包含文件操作或使用 json/datetime 等需要后端的模块
    const hasFileOperations = /open\s*\(|with\s+open|csv\.|json\./i.test(currentCode);
    // 2. 导入需要后端支持的模块（json, datetime, csv 等 Skulpt 不支持的模块）
    const hasBackendModules = /import\s+(json|datetime|csv)|from\s+(json|datetime|csv)\s+import/i.test(currentCode);
    // 3. 导入自定义模块（非标准库）- 检测 import 语句但排除常见标准库
    const hasCustomImport = /import\s+(?!math|random|datetime|re|sys|os|time|json|csv)[\w]+|from\s+(?!math|random|datetime|re|sys|os|time|json|csv)[\w]+\s+import/i.test(currentCode);
    // 3. FileManager 中有用户创建的文件
    const hasUserFiles = fileManagerRef?.current && lessonId;
    
    // 如果包含 input()，强制使用浏览器执行
    if (hasInput) {
      await executeCodeInBrowser(currentCode);
    } else if (hasFileOperations || hasBackendModules || hasCustomImport || hasUserFiles) {
      // 使用后端执行（支持文件操作、json/datetime 等模块和自定义模块）
      await executeCodeWithFiles(currentCode);
    } else {
      // 使用 Skulpt 在浏览器端执行
      await executeCodeInBrowser(currentCode);
    }
  };

  const executeCodeWithFiles = async (currentCode) => {
    setIsRunning(true);
    const execStartTime = Date.now();
    
    try {
      const response = await fetch(`${API_BASE_URL}/files/execute-with-files`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,
          lessonId: lessonId,
          code: currentCode
        })
      });

      const data = await response.json();
      
      if (data.success) {
        const output = data.output || '';
        const isSuccess = data.returnCode === 0;
        
        if (isSuccess) {
          wrappedOnRunCode(currentCode, '', output);
          
          // Refresh file manager if new files were created or existing files were modified
          if (fileManagerRef?.current && 
              ((data.newFiles && data.newFiles.length > 0) || 
               (data.modifiedFiles && data.modifiedFiles.length > 0))) {
            console.log('Files changed - New:', data.newFiles, 'Modified:', data.modifiedFiles);
            fileManagerRef.current.refreshFiles();
          }
          
          // Check if practice is completed correctly
          if (lessonId && expectedOutput && output.trim() === expectedOutput.trim()) {
            playSound(true); // Play correct sound
            const timeSpent = Math.floor((Date.now() - execStartTime) / 1000);
            
            try {
              await learningTracker.submitPractice(
                lessonId,
                currentCode,
                output,
                expectedOutput,
                true,
                timeSpent
              );
              console.log('✅ Practice completed and tracked!');
            } catch (error) {
              console.error('Failed to track practice:', error);
            }
          } else if (lessonId && expectedOutput) {
            playSound(false); // Play wrong sound when output doesn't match
          }
        } else {
          wrappedOnRunCode(currentCode, '', `❌ Execution Error\n${output}`);
          if (expectedOutput) playSound(false); // Play wrong sound on execution error
        }
      } else {
        wrappedOnRunCode(currentCode, '', `❌ ${data.error || 'Execution failed'}`);
        if (expectedOutput) playSound(false); // Play wrong sound on execution failure
      }
    } catch (error) {
      wrappedOnRunCode(currentCode, '', `❌ Network error: ${error.message}\nTip: Make sure the backend server is running`);
      if (expectedOutput) playSound(false); // Play wrong sound on network error
    } finally {
      setIsRunning(false);
    }
  };

  const executeCodeInBrowser = async (currentCode) => {
    if (!window.Sk) {
      wrappedOnRunCode('', '', '❌ Python 环境未加载，请刷新页面重试。');
      return;
    }

    const execStartTime = Date.now();
    if (!startTime) {
      setStartTime(execStartTime);
    }
    setIsRunning(true);

    try {
      let output = '';

      // 配置 Skulpt
      window.Sk.configure({
        output: (text) => {
          output += text;
        },
        read: (filename) => {
          // 处理模块导入
          if (window.Sk.builtinFiles === undefined || 
              window.Sk.builtinFiles["files"][filename] === undefined) {
            throw new Error("File not found: '" + filename + "'");
          }
          return window.Sk.builtinFiles["files"][filename];
        },
        inputfun: (prompt) => {
          // 交互式 input - 使用 window.prompt
          const value = window.prompt(prompt || '请输入:');
          return value !== null ? value : '';
        },
        inputfunTakesPrompt: true,
      });

      // 运行 Python 代码
      await window.Sk.misceval.asyncToPromise(() => {
        return window.Sk.importMainWithBody("<stdin>", false, currentCode, true);
      });

      const finalOutput = output || '';
      wrappedOnRunCode(currentCode, '', finalOutput);
      
      // 检查是否正确完成 practice
      if (lessonId && expectedOutput && finalOutput.trim() === expectedOutput.trim()) {
        playSound(true); // Play correct sound
        const timeSpent = Math.floor((Date.now() - (startTime || execStartTime)) / 1000);
        
        // 提交 practice 完成记录
        try {
          await learningTracker.submitPractice(
            lessonId,
            currentCode,
            finalOutput,
            expectedOutput,
            true,
            timeSpent
          );
          console.log('✅ Practice completed and tracked!');
        } catch (error) {
          console.error('Failed to track practice:', error);
        }
      } else if (lessonId && expectedOutput) {
        playSound(false); // Play wrong sound when output doesn't match
      }
    } catch (err) {
      let errorMessage = err.toString();
      
      // 格式化 Skulpt 错误信息
      if (!errorMessage.includes('Error:') && !errorMessage.includes('Traceback')) {
        errorMessage = `❌ Error: ${errorMessage}`;
      }
      
      wrappedOnRunCode(currentCode, '', errorMessage);
      if (expectedOutput) playSound(false); // Play wrong sound on execution error
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    // Reset to the original starter code from lesson definition, not saved code
    const resetCode = lesson?.content?.practice?.starterCode || initialCode || '';
    
    if (editorRef.current) {
      editorRef.current.setValue(resetCode);
    }
    setCode(resetCode);
    
    // 通知父组件代码已重置，这会保存新的代码到数据库
    if (onCodeChange) {
      onCodeChange(resetCode);
    }
  };

  const handleCodeChange = (value) => {
    setCode(value);
    // 调用父组件的 onCodeChange 保存到数据库
    if (onCodeChange) {
      onCodeChange(value);
    }
  };

  // Handle AI hint request
  const handleRequestHint = async (level) => {
    setLoadingHint(true);
    
    const currentCode = editorRef.current?.getValue() || code;
    const exerciseDesc = lesson?.content?.practice?.description || 'Complete the exercise';
    
    const result = await aiHelper.getHint(
      1, // userId
      lessonId,
      currentCode,
      exerciseDesc,
      expectedOutput || '',
      output || '',
      level
    );
    
    if (result.success) {
      setHint(result.hint);
      setHintLevel(result.hintLevel);
    } else {
      alert(`Failed to get hint: ${result.error}`);
    }
    
    setLoadingHint(false);
  };

  const handleResetHint = () => {
    // Reset hint states (passed from App.js)
    if (setHint) setHint(null);
    if (setHintLevel) setHintLevel(0);
    if (setLoadingHint) setLoadingHint(false);
  };

  // Update output when code runs
  const wrappedOnRunCode = (code, input, outputText) => {
    setOutput(outputText);
    if (onRunCode) {
      onRunCode(code, input, outputText);
    }
  };

  return (
    <div className="code-editor">
      <div className="editor-header">
        <div className="editor-title-section">
          <h3>Python</h3>
          <button 
            className="ask-ai-btn" 
            onClick={onAIAssistantClick}
            disabled={isRunning}
            title="Get AI assistance for this code"
          >
            🤖 Ask AI
          </button>
        </div>
        <div className="editor-controls">
          <button 
            className="control-btn reset-btn" 
            onClick={handleReset}
            disabled={isRunning}
          >
            ↻ Reset
          </button>
          <button 
            className="control-btn run-btn" 
            onClick={handleRunCode}
            disabled={isRunning}
          >
            {isRunning ? '⏳ Running...' : '▶ Run Code'}
          </button>
        </div>
      </div>
      
      <div className="editor-container">
        <Editor
          height="100%"
          defaultLanguage="python"
          defaultValue={code}
          onChange={handleCodeChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: 'on',
            theme: 'vs-dark',
            readOnly: isRunning,
            renderControlCharacters: false,
            renderWhitespace: 'none',
            unicodeHighlight: {
              ambiguousCharacters: false,
            },
          }}
        />
      </div>
    </div>
  );
});

export default CodeEditor;
