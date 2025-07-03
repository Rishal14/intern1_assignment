import { useCallback, useState } from 'react';

export interface ColumnWidth {
  [key: number]: number;
}

export const useColumnResize = (defaultWidth: number = 124) => {
  const [columnWidths, setColumnWidths] = useState<ColumnWidth>({});
  const [isResizing, setIsResizing] = useState<number | null>(null);

  const getColumnWidth = useCallback((columnIndex: number) => {
    return columnWidths[columnIndex] || defaultWidth;
  }, [columnWidths, defaultWidth]);

  const startResize = useCallback((columnIndex: number) => {
    setIsResizing(columnIndex);
  }, []);

  const handleResize = useCallback((columnIndex: number, newWidth: number) => {
    setColumnWidths(prev => ({
      ...prev,
      [columnIndex]: Math.max(80, newWidth) // Minimum width of 80px
    }));
  }, []);

  const stopResize = useCallback(() => {
    setIsResizing(null);
  }, []);

  return {
    columnWidths,
    getColumnWidth,
    isResizing,
    startResize,
    handleResize,
    stopResize
  };
};