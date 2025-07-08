import React, { useState, useRef, useEffect } from 'react';
import { TableCell } from '../ui/table';

interface SpreadsheetCellProps {
  value: string;
  isSelected: boolean;
  isEditing: boolean;
  onSelect: () => void;
  onEdit: (value: string) => void;
  onStopEdit: () => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const SpreadsheetCell: React.FC<SpreadsheetCellProps> = ({
  value,
  isSelected,
  isEditing,
  onSelect,
  onEdit,
  onStopEdit,
  className = '',
  style,
  children
}) => {
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState(false);
  const cellRef = useRef<HTMLTableCellElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
      console.log(`✏️ Started editing cell with value: "${value}"`);
    }
  }, [isEditing, value]);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (!isSelected) setExpanded(false);
  }, [isSelected]);

  // Close popover on outside click
  useEffect(() => {
    if (!expanded) return;
    function handleClick(e: MouseEvent) {
      if (cellRef.current && !cellRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [expanded]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onEdit(editValue);
      onStopEdit();
      console.log(`✅ Cell edit confirmed: "${editValue}"`);
    } else if (e.key === 'Escape') {
      setEditValue(value);
      onStopEdit();
      console.log(`❌ Cell edit cancelled, reverted to: "${value}"`);
    }
  };

  const handleBlur = () => {
    onEdit(editValue);
    onStopEdit();
    console.log(`💾 Cell edit saved on blur: "${editValue}"`);
  };

  const handleDoubleClick = () => {
    if (!isEditing) {
      console.log(`🖱️ Cell double-clicked, entering edit mode`);
    }
  };

  const handleCellClick = (e: React.MouseEvent) => {
    onSelect();
    if (children && React.Children.toArray(children).some(child => {
      if (React.isValidElement(child) && child.type === 'div') {
        return React.Children.toArray(child.props.children).some(grandchild => {
          return React.isValidElement(grandchild) && grandchild.props && grandchild.props.src === '/Shape (1).svg';
        });
      }
      return false;
    })) {
      setExpanded(exp => !exp);
    }
  };

  const cellClassName = `
    p-0 bg-white border-r border-b border-gray-200 relative cursor-pointer
    ${isSelected ? 'ring-2 ring-blue-500 ring-inset z-10' : ''}
    ${className}
  `;

  return (
    <TableCell 
      ref={cellRef}
      className={cellClassName} 
      style={style} 
      onClick={handleCellClick}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="w-full h-8 px-2 border-0 outline-0 bg-white text-xs"
        />
      ) : (
        <>
          {children || (
            <div className={`flex h-8 items-center px-2`}>
              {/* Only show truncated text if not expanded */}
              {!expanded && (
                <span className={`flex-1 font-paragraph-12-XS-regular-12-16 text-[#121212] truncate`}>
                  {value}
                </span>
              )}
            </div>
          )}
          {/* Popover for expanded Job Request cell */}
          {expanded && (
            <div
              style={{
                position: 'absolute',
                top: '-2.5rem',
                left: 0,
                zIndex: 50,
                minWidth: '200px',
                maxWidth: '400px',
                background: 'white',
                border: '1px solid #ccc',
                borderRadius: '0.375rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                padding: '0.5rem 1rem',
                whiteSpace: 'normal',
                overflowWrap: 'break-word',
              }}
            >
              {value}
            </div>
          )}
        </>
      )}
    </TableCell>
  );
};