"use client";

import { useState } from "react";
import {
  Plus,
  Settings,
  History,
  LogOut,
  User,
  Shield,
  MessageSquare,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockHistory } from "@/lib/mock-data";
import Image from "next/image";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobile?: boolean;
  className?: string;
  onNewChat?: () => void;
  onSelectHistory?: (id: string) => void;
  activeChatId?: string | null;
}

export function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isMobile,
  className,
  onNewChat,
  onSelectHistory,
  activeChatId,
}: SidebarProps) {
  const [showHistory, setShowHistory] = useState(false);

  // Group history by date
  const groupedHistory = mockHistory.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, typeof mockHistory>);

  return (
    <div
      className={cn(
        "relative flex flex-col h-full bg-muted/30 border-r transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
      onMouseEnter={() => !isMobile && setIsCollapsed(false)}
      onMouseLeave={() => !isMobile && setIsCollapsed(true)}
    >
      <div className="flex items-center justify-center h-16 border-b overflow-hidden shrink-0 px-3 bg-card">
        {isCollapsed ? (
          <div className="relative h-10 w-10">
            <Image
              src="/arcutis-icon.png"
              alt="Arcutis"
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="relative w-full h-10">
            <Image
              src="/arcutis-logo.png"
              alt="Arcutis Biotherapeutics"
              fill
              className="object-contain"
              priority
            />
          </div>
        )}
      </div>

      <div className="flex-1 py-4 flex flex-col gap-2 px-2 overflow-hidden">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={onNewChat}
                className={cn(
                  "w-full justify-start mb-2 bg-background shadow-sm hover:bg-background/80 shrink-0",
                  isCollapsed ? "px-2 justify-center" : "px-4"
                )}
              >
                <Plus className="h-4 w-4" />
                {!isCollapsed && <span className="ml-2">New Chat</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">New Chat</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        {/* hiding history for now */}

        {/* <div className="flex-1 flex flex-col min-h-0">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  onClick={() => !isCollapsed && setShowHistory(!showHistory)}
                  className={cn(
                    "w-full justify-start mb-2 shrink-0",
                    isCollapsed ? "px-2 justify-center" : "px-4 justify-between"
                  )}
                >
                  <div className="flex items-center">
                    <History className="h-4 w-4" />
                    {!isCollapsed && <span className="ml-2">History</span>}
                  </div>
                  {!isCollapsed &&
                    (showHistory ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    ))}
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">History</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          {!isCollapsed && showHistory && (
            <ScrollArea className="flex-1 -mx-2 px-2">
              <div className="space-y-6 pb-4">
                {Object.entries(groupedHistory).map(([date, items]) => (
                  <div key={date}>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2 px-2 sticky top-0 bg-muted/30 backdrop-blur-sm py-1 z-10">
                      {date}
                    </h4>
                    <div className="space-y-1">
                      {items.map((item) => (
                        <Button
                          key={item.id}
                          variant="ghost"
                          onClick={() => onSelectHistory?.(item.id)}
                          className={cn(
                            "w-full justify-start h-auto py-2 px-2 text-sm font-normal group transition-colors",
                            activeChatId === item.id
                              ? "bg-muted text-foreground font-medium"
                              : "text-foreground/80 hover:text-foreground hover:bg-muted"
                          )}
                        >
                          <MessageSquare
                            className={cn(
                              "h-3 w-3 mr-2 transition-colors shrink-0",
                              activeChatId === item.id
                                ? "text-primary"
                                : "text-muted-foreground group-hover:text-primary"
                            )}
                          />
                          <span className="truncate text-left flex-1">
                            {item.title}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div> */}
      </div>

      <div className="p-2 border-t mt-auto shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                isCollapsed ? "px-2 justify-center" : "px-4"
              )}
            >
              <Settings className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Settings</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="right" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Shield className="mr-2 h-4 w-4" />
              <span>Admin Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
