import React from "react";
import { DataRowSection } from "./sections/DataRowSection";
import { DataTableSection } from "./sections/DataTableSection/DataTableSection";
import { HeaderSection } from "./sections/HeaderSection";
import { NavigationBarSection } from "./sections/NavigationBarSection";

export const SpreadsheetStyle = (): JSX.Element => {
  return (
    <div className="flex w-full min-w-[1440px] bg-white">
      <div className="flex flex-col w-full items-start bg-slate-50">
        <NavigationBarSection />
        <DataRowSection />
        <DataTableSection />
        <HeaderSection />
      </div>
    </div>
  );
};
