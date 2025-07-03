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

  const cellClassName = `
    p-0 bg-white border-r border-b border-gray-200 relative cursor-pointer
    ${isSelected ? 'ring-2 ring-blue-500 ring-inset z-10' : ''}
    ${className}
  `;

  return (
    <TableCell 
      className={cellClassName} 
      style={style} 
      onClick={onSelect}
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
        children || (
          <div className="flex h-8 items-center px-2">
            <span className="flex-1 font-paragraph-12-XS-regular-12-16 text-[#121212] truncate">
              {value}
            </span>
          </div>
        )
      )}
    </TableCell>
  );
};