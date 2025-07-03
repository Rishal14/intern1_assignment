import {
  ArrowUpDownIcon,
  ChevronDownIcon,
  DownloadIcon,
  EyeIcon,
  FilterIcon,
  LayoutIcon,
  ShareIcon,
  SplitIcon,
  UploadIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";

export const DataRowSection = (): JSX.Element => {
  const [activeStates, setActiveStates] = useState<{[key: string]: boolean}>({});
  const [toolbarExpanded, setToolbarExpanded] = useState(true);

  // Define toolbar actions for mapping
  const toolbarActions = [
    { icon: <EyeIcon className="w-5 h-5" />, label: "Hide fields", key: "hide" },
    { icon: <ArrowUpDownIcon className="w-5 h-5" />, label: "Sort", key: "sort" },
    { icon: <FilterIcon className="w-5 h-5" />, label: "Filter", key: "filter" },
    { icon: <LayoutIcon className="w-5 h-5" />, label: "Cell view", key: "cellview" },
  ];

  // Define right side actions
  const rightActions = [
    { icon: <DownloadIcon className="w-5 h-5" />, label: "Import", key: "import" },
    { icon: <UploadIcon className="w-5 h-5" />, label: "Export", key: "export" },
    { icon: <ShareIcon className="w-5 h-5" />, label: "Share", key: "share" },
  ];

  const handleActionClick = (key: string, label: string) => {
    const wasActive = activeStates[key];
    setActiveStates(prev => ({ ...prev, [key]: !prev[key] }));
    console.log(`🔧 ${label} ${wasActive ? 'deactivated' : 'activated'}`);
  };

  const handleToolbarToggle = () => {
    setToolbarExpanded(!toolbarExpanded);
    console.log(`📋 Toolbar ${toolbarExpanded ? 'collapsed' : 'expanded'}`);
  };

  const handleNewAction = () => {
    console.log("✨ New Action button clicked - Creating new action");
  };

  return (
    <header className="flex items-center gap-2 px-2 py-1.5 w-full bg-white border-b border-[#eeeeee] z-[2]">
      {/* Tool bar toggle button */}
      <Button
        variant="ghost"
        className={`flex items-center justify-center gap-1 p-2 rounded transition-colors ${
          toolbarExpanded ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'
        }`}
        onClick={handleToolbarToggle}
      >
        <span className="font-paragraph-14-s-regular-14-20 text-[#121212]">
          Tool bar
        </span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${toolbarExpanded ? 'rotate-180' : ''}`} />
      </Button>

      <Separator orientation="vertical" className="h-6 bg-[#eeeeee]" />

      {/* Left side toolbar actions */}
      {toolbarExpanded && (
        <div className="flex items-center gap-1 flex-1">
          {toolbarActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`flex items-center gap-1 pl-2 pr-3 py-2 rounded-md transition-colors ${
                activeStates[action.key] 
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => handleActionClick(action.key, action.label)}
            >
              {action.icon}
              <span className="font-paragraph-14-s-regular-14-20 text-[#121212]">
                {action.label}
              </span>
            </Button>
          ))}
        </div>
      )}

      {/* Right side actions */}
      <div className="flex items-center justify-end gap-2">
        <div className="flex items-start gap-2">
          {rightActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`flex items-center gap-1 pl-2 pr-3 py-2 rounded-md border-[#eeeeee] transition-colors ${
                activeStates[action.key] 
                  ? 'bg-blue-50 border-blue-300 text-blue-700' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleActionClick(action.key, action.label)}
            >
              {action.icon}
              <span className="font-paragraph-14-s-regular-14-20 text-[#545454]">
                {action.label}
              </span>
            </Button>
          ))}
        </div>

        {/* New Action button */}
        <Button 
          className="flex items-center justify-center gap-1 px-6 py-2 bg-[#4b6a4f] text-white rounded-md hover:bg-[#3e5741] transition-colors"
          onClick={handleNewAction}
        >
          <SplitIcon className="w-5 h-5" />
          <span className="font-paragraph-14-s-medium-14-20">New Action</span>
        </Button>
      </div>
    </header>
  );
};