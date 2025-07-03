import {
  BellIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
  SearchIcon,
} from "lucide-react";
import React, { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../../components/ui/breadcrumb";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

export const NavigationBarSection = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState("");
  const [notificationCount, setNotificationCount] = useState(2);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Navigation path data
  const navigationPath = [
    { label: "Workspace", href: "#workspace", active: false },
    { label: "Folder 2", href: "#folder2", active: false },
    { label: "Spreadsheet 3", href: "#spreadsheet3", active: true },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    console.log(`🔍 Search query updated: "${e.target.value}"`);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    console.log("🔍 Search input focused");
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    console.log("🔍 Search input blurred");
  };

  const handleBreadcrumbClick = (label: string, href: string) => {
    console.log(`🧭 Breadcrumb navigation: ${label} (${href})`);
  };

  const handleMoreOptions = () => {
    console.log("⚙️ More options menu opened");
  };

  const handleNotificationClick = () => {
    console.log(`🔔 Notifications clicked (${notificationCount} unread)`);
    setNotificationCount(0);
  };

  const handleProfileClick = () => {
    console.log("👤 User profile menu opened");
  };

  const handleLogoClick = () => {
    console.log("🏠 Logo clicked - Navigate to home");
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 relative self-stretch w-full flex-[0_0_auto] z-[3] bg-white border-b [border-bottom-style:solid] border-[#eeeeee]">
      {/* Left side - Logo and breadcrumb navigation */}
      <div className="flex items-center gap-4">
        <button 
          onClick={handleLogoClick}
          className="hover:opacity-80 transition-opacity"
        >
          <img className="w-6 h-6" alt="Panel" src="/Panel.svg" />
        </button>

        <Breadcrumb>
          <BreadcrumbList>
            {navigationPath.map((item, index) => (
              <React.Fragment key={item.label}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={item.href}
                    className={`font-paragraph-14-s-medium-14-20 text-${item.active ? "[#121212]" : "[#afafaf]"} text-[14px] leading-[20px] hover:text-[#121212] transition-colors`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleBreadcrumbClick(item.label, item.href);
                    }}
                  >
                    {item.label}
                  </BreadcrumbLink>
                  {item.active && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 p-0.5 ml-1 hover:bg-gray-100"
                      onClick={handleMoreOptions}
                    >
                      <MoreHorizontalIcon className="w-5 h-5" />
                    </Button>
                  )}
                </BreadcrumbItem>
                {index < navigationPath.length - 1 && (
                  <BreadcrumbSeparator>
                    <ChevronRightIcon className="w-3 h-3 text-[#afafaf]" />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right side - Search, notifications and user profile */}
      <div className="flex items-center gap-1">
        {/* Search box */}
        <div className={`flex items-center gap-2 p-3 rounded-md transition-colors ${
          isSearchFocused ? 'bg-[#e8f0e9] ring-2 ring-[#4b6a4f] ring-opacity-20' : 'bg-[#f6f6f6] hover:bg-[#f0f0f0]'
        }`}>
          <SearchIcon className="w-4 h-4 text-[#757575]" />
          <Input
            placeholder="Search within sheet"
            value={searchValue}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            className="border-0 bg-transparent p-0 h-auto text-[12px] font-paragraph-12-XS-regular-12-16 text-[#757575] focus-visible:ring-0 focus-visible:ring-offset-0 w-auto placeholder:text-[#757575]"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            onClick={handleNotificationClick}
          >
            <BellIcon className="w-6 h-6" />
            {notificationCount > 0 && (
              <Badge className="flex items-center justify-center w-5 h-5 absolute top-0 left-5 bg-[#4b6a4f] text-[#f6f6f6] rounded-full border-2 border-solid border-white p-0">
                <span className="font-paragraph-10-XXS-medium-10-16 text-[10px]">
                  {notificationCount}
                </span>
              </Badge>
            )}
          </Button>
        </div>

        {/* User profile */}
        <Button
          variant="ghost"
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-white rounded-lg hover:bg-gray-100 transition-colors h-auto"
          onClick={handleProfileClick}
        >
          <Avatar className="w-7 h-7">
            <AvatarImage src="/ellipse-1.png" alt="User avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>

          <div className="flex flex-col max-w-[120px] items-start">
            <span className="font-paragraph-12-XS-regular-12-16 text-[#121212] text-[12px] leading-[16px]">
              John Doe
            </span>
            <span className="font-label-10-XXS-regular text-[#757575] text-[10px] leading-[12px]">
              john.doe@companyname.com
            </span>
          </div>
        </Button>
      </div>
    </header>
  );
};