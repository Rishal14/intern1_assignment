import React, { useState, useCallback } from "react";
import { Badge } from "../../../../components/ui/badge";
import { ResizableHeader } from "../../../../components/ui/resizable-header";
import { SpreadsheetCell } from "../../../../components/spreadsheet/SpreadsheetCell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { useSpreadsheetNavigation } from "../../../../hooks/useSpreadsheetNavigation";
import { useColumnResize } from "../../../../hooks/useColumnResize";

export const DataTableSection = (): JSX.Element => {
  // Row numbers data
  const rowNumbers = Array.from({ length: 25 }, (_, i) => i + 1);
  
  // Spreadsheet navigation
  const { selectedCell, setSelectedCell, isEditing, setIsEditing } = 
    useSpreadsheetNavigation(25, 10);
  
  // Column resizing
  const { getColumnWidth, startResize, handleResize, stopResize } = 
    useColumnResize(124);

  // Cell data state
  const [cellData, setCellData] = useState<{[key: string]: string}>({});

  // Job request data
  const jobRequests = [
    {
      id: 1,
      title: "Launch social media campaign for product XYZ",
      submittedDate: "15-11-2024",
      status: "In-process",
      statusColor: "bg-[#fff3d6] text-[#84640a]",
      submitter: "Aisha Patel",
      url: "www.aishapatel.com",
      assigned: "Sophie Choudhury",
      priority: "Medium",
      priorityColor: "text-[#c1920f]",
      dueDate: "20-11-2024",
      estValue: "6,200,000",
    },
    {
      id: 2,
      title: "Update press kit for company redesign",
      submittedDate: "28-10-2024",
      status: "Need to start",
      statusColor: "bg-slate-200 text-slate-600",
      submitter: "Irfan Khan",
      url: "www.irfankhanportfolio.com",
      assigned: "Tejas Pandey",
      priority: "High",
      priorityColor: "text-[#ef4c43]",
      dueDate: "30-10-2024",
      estValue: "3,500,000",
    },
    {
      id: 3,
      title: "Finalize user testing feedback for app update",
      submittedDate: "05-12-2024",
      status: "In-process",
      statusColor: "bg-[#fff3d6] text-[#84640a]",
      submitter: "Mark Johnson",
      url: "www.markjohnsondesigns.com",
      assigned: "Rachel Lee",
      priority: "Medium",
      priorityColor: "text-[#c1920f]",
      dueDate: "10-12-2024",
      estValue: "4,750,000",
    },
    {
      id: 4,
      title: "Design new features for the website",
      submittedDate: "10-01-2025",
      status: "Complete",
      statusColor: "bg-[#d2f2e2] text-[#0a6d3c]",
      submitter: "Emily Green",
      url: "www.emilygreenart.com",
      assigned: "Tom Wright",
      priority: "Low",
      priorityColor: "text-[#1a8cff]",
      dueDate: "15-01-2025",
      estValue: "5,900,000",
    },
    {
      id: 5,
      title: "Prepare financial report for Q4",
      submittedDate: "25-01-2025",
      status: "Blocked",
      statusColor: "bg-[#ffe1dd] text-[#c12119]",
      submitter: "Jessica Brown",
      url: "www.jessicabrowncreative.com",
      assigned: "Kevin Smith",
      priority: "Low",
      priorityColor: "text-[#1a8cff]",
      dueDate: "30-01-2025",
      estValue: "2,800,000",
    },
  ];

  // Column header data
  const columnHeaders = [
    {
      title: "Job Request",
      icon: "/briefcase.svg",
      bgColor: "bg-[#eeeeee]",
      textColor: "text-[#757575]",
    },
    {
      title: "Submitted",
      icon: "/calendar.svg",
      bgColor: "bg-[#eeeeee]",
      textColor: "text-[#757575]",
    },
    {
      title: "Status",
      icon: "/chevron-circle.svg",
      bgColor: "bg-[#eeeeee]",
      textColor: "text-[#757575]",
    },
    {
      title: "Submitter",
      icon: "/person.svg",
      bgColor: "bg-[#eeeeee]",
      textColor: "text-[#757575]",
    },
    {
      title: "URL",
      icon: "/globe.svg",
      bgColor: "bg-[#eeeeee]",
      textColor: "text-[#757575]",
    },
    {
      title: "Assigned",
      icon: "/emoji.svg",
      bgColor: "bg-[#e8f0e9]",
      textColor: "text-[#666c66]",
      headerBg: "bg-[#d2e0d4]",
      headerText: "ABC",
    },
    {
      title: "Priority",
      icon: null,
      bgColor: "bg-[#eae3fc]",
      textColor: "text-[#645c7f]",
      headerBg: "bg-[#dccffc]",
      headerText: "Answer a question",
    },
    {
      title: "Due Date",
      icon: null,
      bgColor: "bg-[#eae3fc]",
      textColor: "text-[#645c7f]",
      headerBg: "bg-[#dccffc]",
      headerText: "Answer a question",
    },
    {
      title: "Est. Value",
      icon: null,
      bgColor: "bg-[#ffe9e0]",
      textColor: "text-[#8c6b61]",
      headerBg: "bg-[#fac2af]",
      headerText: "Extract",
    },
  ];

  const handleCellSelect = useCallback((row: number, col: number) => {
    setSelectedCell({ row, col });
    setIsEditing(false);
    console.log(`📊 Cell selected: Row ${row}, Column ${col}`);
  }, [setSelectedCell, setIsEditing]);

  const handleCellEdit = useCallback((row: number, col: number, value: string) => {
    const key = `${row}-${col}`;
    setCellData(prev => ({ ...prev, [key]: value }));
    console.log(`✏️ Cell ${row}-${col} updated to: "${value}"`);
  }, []);

  const handleDocumentClick = () => {
    console.log("📄 Document header clicked - Q3 Financial Overview");
  };

  const handleRefreshClick = () => {
    console.log("🔄 Refresh button clicked - Syncing data");
  };

  const handleAddColumnClick = () => {
    console.log("➕ Add column button clicked - Creating new column");
  };

  const handleColumnHeaderClick = (header: any, index: number) => {
    console.log(`📋 Column header clicked: ${header.title} (Column ${index + 1})`);
  };

  const handleColumnMenuClick = (header: any, index: number) => {
    console.log(`⚙️ Column menu clicked for: ${header.title} (Column ${index + 1})`);
  };

  const handleGroupHeaderClick = (groupName: string) => {
    console.log(`📁 Column group header clicked: ${groupName}`);
  };

  const getCellValue = useCallback((row: number, col: number) => {
    const key = `${row}-${col}`;
    if (cellData[key]) return cellData[key];
    
    // Return original data for first 5 rows
    if (row <= 5) {
      const jobRequest = jobRequests[row - 1];
      switch (col) {
        case 1: return jobRequest.title;
        case 2: return jobRequest.submittedDate;
        case 3: return jobRequest.status;
        case 4: return jobRequest.submitter;
        case 5: return jobRequest.url;
        case 6: return jobRequest.assigned;
        case 7: return jobRequest.priority;
        case 8: return jobRequest.dueDate;
        case 9: return jobRequest.estValue;
        default: return '';
      }
    }
    return '';
  }, [cellData, jobRequests]);

  return (
    <div className="flex flex-col h-[872px] w-full bg-[#f6f6f6] overflow-hidden">
      
      {/* Main table */}
      <div className="flex-1 overflow-auto" tabIndex={0}>
        <Table className="border-collapse">
          {/* Column group headers */}
          <TableHeader>
            <TableRow className="h-8">
              {/* Empty cell for row numbers column */}
              <TableHead className="p-0 w-8 bg-white"></TableHead>
              {/* Q3 Financial Overview group header (spans Job Request, Submitted, Status, Submitter, URL) */}
              <TableHead className="p-0 bg-white border-r border-[#ccc]" colSpan={5}>
                <div className="relative flex h-8 items-center pl-4" style={{ minWidth: getColumnWidth(1) + getColumnWidth(2) + getColumnWidth(3) + getColumnWidth(4) + getColumnWidth(5) }}>
                  {/* Outer box spanning Job Request to Submitter (first 5 columns only) */}
                  <div className="absolute left-0 top-0 h-full rounded-md border border-[#e0e0e0] bg-[#e5e7eb] z-0"
                    style={{ left: 0, width: `${getColumnWidth(1) + getColumnWidth(2) + getColumnWidth(3) + getColumnWidth(4) + getColumnWidth(5)}px` }}></div>
                  {/* Q3 Financial Overview box */}
                  <div className="relative z-10 flex items-center px-3 py-1 rounded bg-white border border-[#e0e0e0] shadow-sm mr-3 cursor-pointer hover:underline" onClick={handleDocumentClick}>
                    <img src="/google-doc-icon.svg" alt="Doc Icon" className="w-4 h-4 mr-2" />
                    <span className="text-sm font-semibold text-[#4a4a4a]">Q3 Financial Overview</span>
                  </div>
                </div>
              </TableHead>
              {/* ABC group header above Assigned */}
              <TableHead className="p-0 bg-[#d2e0d4] text-center" colSpan={1} style={{ width: getColumnWidth(6) }}>
                <span className="font-paragraph-14-s-medium-14-20 text-[#505450] whitespace-nowrap">ABC</span>
              </TableHead>
              {/* Answer a question group header above Priority and Due Date */}
              <TableHead className="p-0 bg-[#dccffc] text-center" colSpan={2} style={{ width: getColumnWidth(7) + getColumnWidth(8) }}>
                <span className="font-paragraph-14-s-medium-14-20 text-[#463e59] whitespace-nowrap">Answer a question</span>
              </TableHead>
              {/* Extract group header above Est. Value */}
              <TableHead className="p-0 bg-[#fac2af] text-center" colSpan={1} style={{ width: getColumnWidth(9) }}>
                <span className="font-paragraph-14-s-medium-14-20 text-[#695149] whitespace-nowrap">Extract</span>
              </TableHead>
              {/* Add column button */}
              <TableHead className="p-0 w-[126px] border border-dashed border-[#cbcbcb]"></TableHead>
            </TableRow>

            {/* Column headers */}
            <TableRow className="h-8">
              {/* Row numbers column header */}
              <TableHead className="p-0 w-8">
                <div className="flex h-8 items-center gap-1 pl-2 pr-1 bg-[#eeeeee]">
                  <div className="flex-1 flex items-center gap-1">
                    <img
                      className="w-4 h-4"
                      alt="Number symbol"
                      src="/number-symbol.svg"
                    />
                  </div>
                </div>
              </TableHead>

              {/* Regular column headers with resize capability */}
              {columnHeaders.map((header, index) => (
                <TableHead key={index} className="p-0">
                  <ResizableHeader
                    width={getColumnWidth(index)}
                    onResize={(newWidth) => {
                      handleResize(index, newWidth);
                      console.log(`📏 Column ${index + 1} (${header.title}) resized to ${newWidth}px`);
                    }}
                    onResizeStart={() => {
                      startResize(index);
                      console.log(`📏 Started resizing column ${index + 1} (${header.title})`);
                    }}
                    onResizeEnd={() => {
                      stopResize();
                      console.log(`📏 Finished resizing column ${index + 1} (${header.title})`);
                    }}
                    className={`flex h-8 items-center gap-1 pl-2 pr-1 ${header.bgColor}`}
                  >
                    <button 
                      onClick={() => handleColumnHeaderClick(header, index)}
                      className="flex-1 flex items-center gap-1 hover:bg-black hover:bg-opacity-5 rounded px-1 transition-colors"
                    >
                      {header.icon && (
                        <img
                          className="w-4 h-4"
                          alt={header.title}
                          src={header.icon}
                        />
                      )}
                      <span
                        className={`flex-1 mt-[-1.00px] font-paragraph-12-XS-semi-bold-12-16 ${header.textColor} truncate`}
                      >
                        {header.title}
                      </span>
                    </button>
                    {index !== 7 && index !== 8 && index !== 9 && (
                      <button 
                        onClick={() => handleColumnMenuClick(header, index)}
                        className="inline-flex items-center gap-2 p-1 rounded hover:bg-black hover:bg-opacity-10 transition-colors"
                      >
                        <img
                          className="w-3 h-3"
                          alt="Chevron"
                          src="/chevron-2.svg"
                        />
                      </button>
                    )}
                  </ResizableHeader>
                </TableHead>
              ))}

              {/* Empty header for add column */}
              <TableHead className="p-0"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Map through row numbers */}
            {rowNumbers.map((rowNum) => (
              <TableRow key={rowNum} className="h-8">
                {/* Row number cell */}
                <TableCell className="p-0 bg-white">
                  <button 
                    onClick={() => console.log(`📊 Row ${rowNum} selected`)}
                    className="relative h-8 w-8 hover:bg-gray-100 transition-colors"
                  >
                    <div
                      className={`absolute h-5 top-[5px] ${rowNum < 10 ? "left-3" : rowNum < 20 ? "left-[9px]" : "left-2"} font-paragraph-14-s-regular-14-20 text-[#757575] text-center whitespace-nowrap`}
                    >
                      {rowNum}
                    </div>
                  </button>
                </TableCell>

                {/* Data cells */}
                {Array.from({ length: 10 }, (_, colIndex) => {
                  const colNum = colIndex + 1;
                  const isSelected = selectedCell.row === rowNum && selectedCell.col === colNum;
                  const isCurrentlyEditing = isSelected && isEditing;
                  
                  // Special handling for status column
                  if (colNum === 3 && rowNum <= 5) {
                    const jobRequest = jobRequests[rowNum - 1];
                    return (
                      <SpreadsheetCell
                        key={colNum}
                        value={getCellValue(rowNum, colNum)}
                        isSelected={isSelected}
                        isEditing={isCurrentlyEditing}
                        onSelect={() => handleCellSelect(rowNum, colNum)}
                        onEdit={(value) => handleCellEdit(rowNum, colNum, value)}
                        onStopEdit={() => setIsEditing(false)}
                        style={{ width: getColumnWidth(colIndex) }}
                      >
                        <div className="flex h-8 items-center justify-center px-2">
                          <Badge
                            className={`${jobRequest.statusColor} font-paragraph-12-XS-medium-12-16 px-2 py-1 rounded-[100px] cursor-pointer hover:opacity-80 transition-opacity`}
                            onClick={() => console.log(`🏷️ Status badge clicked: ${jobRequest.status}`)}
                          >
                            {jobRequest.status}
                          </Badge>
                        </div>
                      </SpreadsheetCell>
                    );
                  }

                  // Special handling for priority column
                  if (colNum === 7 && rowNum <= 5) {
                    const jobRequest = jobRequests[rowNum - 1];
                    return (
                      <SpreadsheetCell
                        key={colNum}
                        value={getCellValue(rowNum, colNum)}
                        isSelected={isSelected}
                        isEditing={isCurrentlyEditing}
                        onSelect={() => handleCellSelect(rowNum, colNum)}
                        onEdit={(value) => handleCellEdit(rowNum, colNum, value)}
                        onStopEdit={() => setIsEditing(false)}
                        style={{ width: getColumnWidth(colIndex) }}
                      >
                        <div className="flex h-8 items-center justify-center px-2">
                          <span
                            className={`font-paragraph-12-XS-semi-bold-12-16 ${jobRequest.priorityColor} text-center whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity`}
                            onClick={() => console.log(`⚡ Priority clicked: ${jobRequest.priority}`)}
                          >
                            {jobRequest.priority}
                          </span>
                        </div>
                      </SpreadsheetCell>
                    );
                  }

                  // Special handling for URL column
                  if (colNum === 5 && rowNum <= 5) {
                    const jobRequest = jobRequests[rowNum - 1];
                    return (
                      <SpreadsheetCell
                        key={colNum}
                        value={getCellValue(rowNum, colNum)}
                        isSelected={isSelected}
                        isEditing={isCurrentlyEditing}
                        onSelect={() => handleCellSelect(rowNum, colNum)}
                        onEdit={(value) => handleCellEdit(rowNum, colNum, value)}
                        onStopEdit={() => setIsEditing(false)}
                        style={{ width: getColumnWidth(colIndex) }}
                      >
                        <div className="flex h-8 items-center px-2">
                          <a 
                            href={`https://${jobRequest.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log(`🔗 URL clicked: ${jobRequest.url}`);
                            }}
                            className="flex-1 font-normal text-[#121212] text-xs leading-4 underline truncate hover:text-blue-600 transition-colors"
                          >
                            {jobRequest.url}
                          </a>
                        </div>
                      </SpreadsheetCell>
                    );
                  }

                  // Special handling for Est. Value column
                  if (colNum === 9 && rowNum <= 5) {
                    const jobRequest = jobRequests[rowNum - 1];
                    return (
                      <SpreadsheetCell
                        key={colNum}
                        value={getCellValue(rowNum, colNum)}
                        isSelected={isSelected}
                        isEditing={isCurrentlyEditing}
                        onSelect={() => handleCellSelect(rowNum, colNum)}
                        onEdit={(value) => handleCellEdit(rowNum, colNum, value)}
                        onStopEdit={() => setIsEditing(false)}
                        style={{ width: getColumnWidth(colIndex) }}
                      >
                        <div className="flex h-8 items-center justify-end gap-1 px-2">
                          <span className="flex-1 font-paragraph-12-XS-regular-12-16 text-[#121212] text-right truncate">
                            {jobRequest.estValue}
                          </span>
                          <span className="font-paragraph-12-XS-medium-12-16 text-[#afafaf] text-right whitespace-nowrap">
                            ₹
                          </span>
                        </div>
                      </SpreadsheetCell>
                    );
                  }

                  // Regular cells
                  return (
                    <SpreadsheetCell
                      key={colNum}
                      value={getCellValue(rowNum, colNum)}
                      isSelected={isSelected}
                      isEditing={isCurrentlyEditing}
                      onSelect={() => handleCellSelect(rowNum, colNum)}
                      onEdit={(value) => handleCellEdit(rowNum, colNum, value)}
                      onStopEdit={() => setIsEditing(false)}
                      style={{ width: getColumnWidth(colIndex) }}
                    />
                  );
                })}

                {/* Empty cell for add column */}
                <TableCell className="p-0 bg-white"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};