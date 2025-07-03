import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

export const HeaderSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("all");

  // Define tab data for easy mapping
  const tabItems = [
    { id: "all", label: "All Orders", count: 125 },
    { id: "pending", label: "Pending", count: 23 },
    { id: "reviewed", label: "Reviewed", count: 45 },
    { id: "arrived", label: "Arrived", count: 57 },
  ];

  const handleTabChange = (value: string) => {
    const previousTab = activeTab;
    setActiveTab(value);
    const selectedTab = tabItems.find(tab => tab.id === value);
    console.log(`📑 Tab changed from "${previousTab}" to "${value}" (${selectedTab?.count} items)`);
  };

  const handleAddTab = () => {
    console.log("➕ Add new tab clicked - Opening tab creation dialog");
  };

  return (
    <header className="flex items-center gap-6 pl-8 pr-4 pt-1 pb-0 relative w-full bg-white border-t border-[#eeeeee]">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex items-start">
        <TabsList className="bg-transparent p-0 h-auto">
          {tabItems.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={`gap-2 px-4 py-2.5 rounded-none transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[#e8f0e9] border-t-2 border-[#4b6a4f] text-[#3e5741] font-paragraph-16-m-semi-bold-16-24"
                  : "bg-transparent text-[#757575] font-paragraph-16-m-medium-16-24 hover:bg-gray-50 hover:text-[#121212]"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="ml-1 px-2 py-0.5 bg-[#4b6a4f] text-white text-xs rounded-full">
                  {tab.count}
                </span>
              )}
            </TabsTrigger>
          ))}
          <div className="gap-1 px-1 py-2 self-stretch inline-flex items-center justify-center">
            <button 
              className="inline-flex items-center gap-2 p-1 bg-white rounded hover:bg-gray-100 transition-colors"
              onClick={handleAddTab}
            >
              <PlusIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </TabsList>
      </Tabs>
    </header>
  );
};