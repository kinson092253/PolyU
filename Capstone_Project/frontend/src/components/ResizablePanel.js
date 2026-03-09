import React, { useState, useCallback } from 'react';
import './ResizablePanel.css';

const ResizablePanel = ({ children, minWidth = 200 }) => {
  const [leftWidth, setLeftWidth] = useState(50); // 百分比
  const [codeHeight, setCodeHeight] = useState(60); // 代码编辑器高度百分比
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
  const [isDraggingVertical, setIsDraggingVertical] = useState(false);

  const startDrag = useCallback((direction) => {
    if (direction === 'horizontal') {
      setIsDraggingHorizontal(true);
    } else {
      setIsDraggingVertical(true);
    }
  }, []);

  const stopDrag = useCallback(() => {
    setIsDraggingHorizontal(false);
    setIsDraggingVertical(false);
  }, []);

  const onMouseMove = useCallback((e) => {
    if (isDraggingHorizontal) {
      const container = document.querySelector('.resizable-container');
      const containerRect = container.getBoundingClientRect();
      const percentage = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      
      if (percentage > 15 && percentage < 70) {
        setLeftWidth(percentage);
      }
    } else if (isDraggingVertical) {
      const rightPanel = document.querySelector('.right-panel');
      const rightRect = rightPanel.getBoundingClientRect();
      const percentage = ((e.clientY - rightRect.top) / rightRect.height) * 100;
      
      if (percentage > 30 && percentage < 80) {
        setCodeHeight(percentage);
      }
    }
  }, [isDraggingHorizontal, isDraggingVertical]);

  React.useEffect(() => {
    if (isDraggingHorizontal || isDraggingVertical) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', stopDrag);
      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', stopDrag);
      };
    }
  }, [isDraggingHorizontal, isDraggingVertical, onMouseMove, stopDrag]);

  const rightWidth = 100 - leftWidth;

  // 如果只有一个children（没有选择课程时），只显示左侧面板
  const childrenArray = React.Children.toArray(children);
  if (childrenArray.length === 1) {
    return (
      <div className="resizable-container">
        <div className="left-panel" style={{ width: '100%' }}>
          {childrenArray[0]}
        </div>
      </div>
    );
  }

  return (
    <div className="resizable-container">
      <div className="left-panel" style={{ width: `${leftWidth}%` }}>
        {childrenArray[0]}
      </div>
      
      <div 
        className="resizer horizontal"
        onMouseDown={() => startDrag('horizontal')}
      >
        <div className="resizer-line"></div>
      </div>
      
      <div className="right-panel" style={{ width: `${rightWidth}%` }}>
        <div className="code-section" style={{ height: `${codeHeight}%` }}>
          {childrenArray[1]}
        </div>
        
        <div 
          className="resizer vertical"
          onMouseDown={() => startDrag('vertical')}
        >
          <div className="resizer-line"></div>
        </div>
        
        <div className="output-section" style={{ height: `${100 - codeHeight}%` }}>
          {childrenArray[2]}
        </div>
      </div>
    </div>
  );
};

export default ResizablePanel;
