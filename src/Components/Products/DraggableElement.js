import React, { useState, useRef, useEffect } from 'react';

const DraggableElement = ({ type, src, position, size, shape, onUpdate }) => {
  const elementRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('resize-handle')) {
      setIsResizing(true);
      setInitialSize({
        width: elementRef.current.offsetWidth,
        height: elementRef.current.offsetHeight
      });
    } else {
      setIsDragging(true);
      setDragStart({
        x: e.clientX,
        y: e.clientY
      });
      setInitialPosition({
        x: position.x,
        y: position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      
      const containerRect = elementRef.current.parentElement.getBoundingClientRect();
      const elementRect = elementRef.current.getBoundingClientRect();
      
      const newX = Math.min(Math.max(initialPosition.x + dx, 0), containerRect.width - elementRect.width);
      const newY = Math.min(Math.max(initialPosition.y + dy, 0), containerRect.height - elementRect.height);
      
      onUpdate({
        position: { x: newX, y: newY },
        size: { width: size.width, height: size.height }
      });
    } else if (isResizing) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      
      const newWidth = Math.max(50, initialSize.width + dx);
      const newHeight = Math.max(50, initialSize.height + dy);
      
      onUpdate({
        position: { x: position.x, y: position.y },
        size: { width: newWidth, height: newHeight }
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing]);

  const getShapeStyle = () => {
    switch (shape) {
      case 'circle':
        return { borderRadius: '50%' };
      case 'square':
        return { aspectRatio: '1' };
      case 'oval':
        return { borderRadius: '50%', aspectRatio: '1.5' };
      default:
        return {};
    }
  };

  return (
    <div
      ref={elementRef}
      className={`draggable-element ${type} ${isDragging ? 'dragging' : ''}`}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        ...getShapeStyle()
      }}
      onMouseDown={handleMouseDown}
    >
      <img
        src={src}
        alt={type}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          ...getShapeStyle()
        }}
      />
      <div className="resize-handle"></div>
    </div>
  );
};

export default DraggableElement;