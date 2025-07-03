import React, { useCallback, useEffect, useRef } from 'react';

interface ResizableHeaderProps {
  children: React.ReactNode;
  width: number;
  onResize: (newWidth: number) => void;
  onResizeStart: () => void;
  onResizeEnd: () => void;
  className?: string;
}

export const ResizableHeader: React.FC<ResizableHeaderProps> = ({
  children,
  width,
  onResize,
  onResizeStart,
  onResizeEnd,
  className = ''
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget.querySelector('.resize-handle')) {
      isResizing.current = true;
      startX.current = e.clientX;
      startWidth.current = width;
      onResizeStart();
      e.preventDefault();
    }
  }, [width, onResizeStart]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    
    const deltaX = e.clientX - startX.current;
    const newWidth = startWidth.current + deltaX;
    onResize(newWidth);
  }, [onResize]);

  const handleMouseUp = useCallback(() => {
    if (isResizing.current) {
      isResizing.current = false;
      onResizeEnd();
    }
  }, [onResizeEnd]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={headerRef}
      className={`relative ${className}`}
      style={{ width: `${width}px` }}
      onMouseDown={handleMouseDown}
    >
      {children}
      <div className="resize-handle absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 opacity-0 hover:opacity-100 transition-opacity" />
    </div>
  );
};