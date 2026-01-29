import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import './FileManager.css';

const FileManager = forwardRef(({ userId, lessonId, onFileSelect, onFilesChange }, ref) => {
  const [files, setFiles] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadMode, setUploadMode] = useState('manual'); // 'manual' or 'upload'
  const [isExpanded, setIsExpanded] = useState(false); // Collapse state

  useEffect(() => {
    loadFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, lessonId]);

  // Expose loadFiles method to parent via ref
  useImperativeHandle(ref, () => ({
    refreshFiles: loadFiles
  }));

  const loadFiles = async () => {
    try {
      setLoading(true);
      const url = lessonId 
        ? `http://localhost:5000/api/files/list/${userId}?lessonId=${lessonId}`
        : `http://localhost:5000/api/files/list/${userId}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setFiles(data.files);
        if (onFilesChange) onFilesChange(data.files);
      }
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFile = async () => {
    if (!newFileName.trim()) {
      alert('Please enter a file name');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/files/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          lessonId,
          fileName: newFileName,
          fileContent: newFileContent,
          fileType: getFileType(newFileName)
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setShowCreateModal(false);
        setNewFileName('');
        setNewFileContent('');
        setUploadMode('manual');
        loadFiles();
      }
    } catch (error) {
      console.error('Error creating file:', error);
      alert('Failed to create file');
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file extension
    const fileName = file.name;
    const ext = fileName.split('.').pop().toLowerCase();
    if (!['txt', 'csv', 'json', 'py'].includes(ext)) {
      alert('Unsupported file type! Only supports: .txt, .csv, .json, .py');
      return;
    }

    // Read file content
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setNewFileName(fileName);
      setNewFileContent(content);
    };
    reader.onerror = () => {
      alert('Failed to read file');
    };
    reader.readAsText(file);
  };

  const handleDeleteFile = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/files/delete/${fileId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      
      if (data.success) {
        loadFiles();
        if (selectedFileId === fileId) {
          setSelectedFileId(null);
        }
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file');
    }
  };

  const handleFileClick = async (file) => {
    setSelectedFileId(file.file_id);
    
    try {
      const response = await fetch(`http://localhost:5000/api/files/read/${file.file_id}`);
      const data = await response.json();
      
      if (data.success && onFileSelect) {
        onFileSelect(data.file);
      }
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  const getFileType = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    const typeMap = {
      'txt': 'text',
      'csv': 'csv',
      'json': 'json',
      'py': 'python'
    };
    return typeMap[ext] || 'text';
  };

  const getFileIcon = (fileType) => {
    const iconMap = {
      'text': '📄',
      'csv': '📊',
      'json': '{ }',
      'python': '🐍'
    };
    return iconMap[fileType] || '📄';
  };

  return (
    <div className={`file-manager ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="file-manager-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="header-left">
          <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
          <h3>📁 File Manager</h3>
          {!isExpanded && files.length > 0 && (
            <span className="file-count">({files.length})</span>
          )}
        </div>
        {isExpanded && (
          <button 
            className="btn-create-file"
            onClick={(e) => {
              e.stopPropagation();
              setShowCreateModal(true);
            }}
            title="Create New File"
          >
            ➕
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="file-list">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : files.length === 0 ? (
          <div className="empty-state">
            <p>No files yet</p>
            <p className="hint">Click ➕ to create a file</p>
          </div>
        ) : (
          files.map(file => (
            <div 
              key={file.file_id}
              className={`file-item ${selectedFileId === file.file_id ? 'selected' : ''}`}
              onClick={() => handleFileClick(file)}
            >
              <span className="file-icon">{getFileIcon(file.file_type)}</span>
              <span className="file-name">{file.file_name}</span>
              <button
                className="btn-delete-file"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFile(file.file_id);
                }}
                title="Delete File"
              >
                🗑️
              </button>
            </div>
          ))
        )}
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Create New File</h3>
            
            {/* Upload mode toggle */}
            <div className="upload-mode-toggle">
              <button
                className={`mode-btn ${uploadMode === 'manual' ? 'active' : ''}`}
                onClick={() => setUploadMode('manual')}
              >
                ✍️ Manual Input
              </button>
              <button
                className={`mode-btn ${uploadMode === 'upload' ? 'active' : ''}`}
                onClick={() => setUploadMode('upload')}
              >
                📤 Upload File
              </button>
            </div>

            {uploadMode === 'upload' ? (
              /* Upload mode */
              <div className="form-group">
                <label>Select File:</label>
                <input
                  type="file"
                  accept=".txt,.csv,.json,.py"
                  onChange={handleFileUpload}
                  className="file-input"
                />
                <small className="hint">
                  Supported file types: .txt, .csv, .json, .py
                </small>
                
                {newFileName && (
                  <div className="upload-preview">
                    <p><strong>File Name:</strong> {newFileName}</p>
                    <p><strong>Content Preview:</strong></p>
                    <pre className="content-preview">
                      {newFileContent.substring(0, 200)}
                      {newFileContent.length > 200 ? '...' : ''}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              /* Manual mode */
              <>
                <div className="form-group">
                  <label>File Name:</label>
                  <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="e.g., data.txt, students.csv"
                    autoFocus
                  />
                  <small className="hint">
                    Supported file types: .txt, .csv, .json, .py
                  </small>
                </div>

                <div className="form-group">
                  <label>Initial Content (Optional):</label>
                  <textarea
                    value={newFileContent}
                    onChange={(e) => setNewFileContent(e.target.value)}
                    placeholder="Enter the initial content..."
                    rows="6"
                  />
                </div>
              </>
            )}

            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={() => {
                  setShowCreateModal(false);
                  setNewFileName('');
                  setNewFileContent('');
                  setUploadMode('manual');
                }}
              >
                Cancel
              </button>
              <button 
                className="btn-confirm"
                onClick={handleCreateFile}
                disabled={!newFileName.trim()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default FileManager;
