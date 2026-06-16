"use client";

import { Bell, CalendarDays, ChevronDown, Menu } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TopbarProps = {
  title: string;
  subtitle: string;
  dateLabel?: string;
  timeLabel?: string;
  onOpenSidebar?: () => void;
};

export function Topbar({
  title,
  subtitle,
  dateLabel = "May 12, 2024",
  timeLabel,
  onOpenSidebar,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
      <div className="flex min-h-20 items-center gap-4 px-4 sm:px-6">
        <Button
          aria-label="Open navigation"
          className="lg:hidden"
          onClick={onOpenSidebar}
          size="icon"
          type="button"
          variant="ghost"
        >
          <Menu className="size-5" />
        </Button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-2xl font-bold tracking-normal text-slate-950">
            {title}
          </h1>
          <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button className="h-10 gap-2 border-slate-200" variant="outline">
            <CalendarDays className="size-4" />
            <span>{dateLabel}</span>
            <ChevronDown className="size-4 opacity-60" />
          </Button>
          {timeLabel ? (
            <Button className="h-10 gap-2 border-slate-200" variant="outline">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span>{timeLabel}</span>
            </Button>
          ) : null}
        </div>

        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Notifications"
                className="relative"
                size="icon"
                type="button"
                variant="ghost"
              >
                <Bell className="size-5" />
                <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  3
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-10 gap-2 px-2" variant="ghost">
              <Avatar className="size-9">
                <AvatarFallback className="bg-slate-900 text-white">AD</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-semibold lg:inline">Admin</span>
              <ChevronDown className="hidden size-4 opacity-60 lg:inline" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>System Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
