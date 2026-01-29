import React, { useState } from 'react';
import FileManager from './FileManager';
import './FileDemo.css';

// 这是一个示例组件，展示如何将 FileManager 集成到你的应用中

const FileDemo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    // 可以显示文件内容或在编辑器中使用
    console.log('Selected file:', file);
  };

  const handleRunCode = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/files/execute-with-files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,
          lessonId: '1.1',
          code: code
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setOutput(data.output);
      } else {
        setOutput(`错误: ${data.error}`);
      }
    } catch (error) {
      setOutput(`执行失败: ${error.message}`);
    }
  };

  return (
    <div className="file-demo">
      <div className="demo-layout">
        {/* 文件管理器 */}
        <div className="file-manager-panel">
          <FileManager
            userId={1}
            lessonId="1.1"
            onFileSelect={handleFileSelect}
          />
        </div>

        {/* 代码编辑器 */}
        <div className="code-panel">
          <h3>Python 编辑器</h3>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="输入 Python 代码...&#10;例如:&#10;with open('data.txt', 'r') as f:&#10;    print(f.read())"
            rows="15"
          />
          <button onClick={handleRunCode}>▶ 运行代码</button>

          {/* 输出区域 */}
          <div className="output-panel">
            <h4>输出：</h4>
            <pre>{output || '等待运行...'}</pre>
          </div>

          {/* 选中的文件信息 */}
          {selectedFile && (
            <div className="selected-file-info">
              <h4>已选择文件：</h4>
              <p><strong>文件名：</strong>{selectedFile.file_name}</p>
              <p><strong>类型：</strong>{selectedFile.file_type}</p>
              <details>
                <summary>查看内容</summary>
                <pre>{selectedFile.file_content}</pre>
              </details>
            </div>
          )}
        </div>
      </div>

      {/* 使用示例 */}
      <div className="examples">
        <h3>📚 使用示例</h3>
        
        <div className="example-card">
          <h4>1. 创建文本文件</h4>
          <p>点击 ➕ 创建文件 <code>hello.txt</code>，内容：<code>Hello, Python!</code></p>
          <pre>{`with open('hello.txt', 'r') as f:
    content = f.read()
    print(content)`}</pre>
        </div>

        <div className="example-card">
          <h4>2. 创建 CSV 文件</h4>
          <p>创建 <code>students.csv</code>：</p>
          <pre>{`name,age,score
Alice,20,95
Bob,21,87
Charlie,19,92`}</pre>
          <p>然后运行：</p>
          <pre>{`import csv
with open('students.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"{row['name']}: {row['score']}分")`}</pre>
        </div>

        <div className="example-card">
          <h4>3. 写入新文件</h4>
          <pre>{`# 创建新文件
with open('output.txt', 'w') as f:
    f.write('这是自动生成的内容\\n')
    f.write('Python 文件操作真方便！')

# 读取刚创建的文件
with open('output.txt', 'r') as f:
    print(f.read())`}</pre>
        </div>
      </div>
    </div>
  );
};

export default FileDemo;
