import { useCallback, useEffect, useState } from 'react';

export interface CellPosition {
  row: number;
  col: number;
}

export const useSpreadsheetNavigation = (totalRows: number, totalCols: number) => {
  const [selectedCell, setSelectedCell] = useState<CellPosition>({ row: 1, col: 1 });
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (isEditing) return;

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        setSelectedCell(prev => ({
          ...prev,
          row: Math.max(1, prev.row - 1)
        }));
        break;
      case 'ArrowDown':
        event.preventDefault();
        setSelectedCell(prev => ({
          ...prev,
          row: Math.min(totalRows, prev.row + 1)
        }));
        break;
      case 'ArrowLeft':
        event.preventDefault();
        setSelectedCell(prev => ({
          ...prev,
          col: Math.max(1, prev.col - 1)
        }));
        break;
      case 'ArrowRight':
        event.preventDefault();
        setSelectedCell(prev => ({
          ...prev,
          col: Math.min(totalCols, prev.col + 1)
        }));
        break;
      case 'Enter':
        event.preventDefault();
        setIsEditing(true);
        break;
      case 'Escape':
        event.preventDefault();
        setIsEditing(false);
        break;
      case 'Tab':
        event.preventDefault();
        setSelectedCell(prev => ({
          ...prev,
          col: prev.col < totalCols ? prev.col + 1 : 1,
          row: prev.col < totalCols ? prev.row : Math.min(totalRows, prev.row + 1)
        }));
        break;
    }
  }, [isEditing, totalRows, totalCols]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    selectedCell,
    setSelectedCell,
    isEditing,
    setIsEditing
  };
};