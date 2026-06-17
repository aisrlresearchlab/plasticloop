"use client";

import Link from "next/link";
import * as React from "react";
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

const dateOptions = [
  "Today",
  "Last 7 Days",
  "June 17, 2026",
  "June 11, 2026 - June 17, 2026",
  "June 3 - June 17, 2026",
];

export function Topbar({
  title,
  subtitle,
  dateLabel = "June 17, 2026",
  timeLabel,
  onOpenSidebar,
}: TopbarProps) {
  const [selectedDateLabel, setSelectedDateLabel] = React.useState(dateLabel);

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-10 gap-2 border-slate-200" type="button" variant="outline">
                <CalendarDays className="size-4" />
                <span>{selectedDateLabel}</span>
                <ChevronDown className="size-4 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Date Range</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {dateOptions.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onSelect={() => setSelectedDateLabel(option)}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {timeLabel ? (
            <div className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-background px-4 py-2 text-sm font-semibold shadow-sm">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span>{timeLabel}</span>
            </div>
          ) : null}
        </div>

        <DropdownMenu>
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
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
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sensor update received from Canteen Area</DropdownMenuItem>
            <DropdownMenuItem>Weekly report is ready to download</DropdownMenuItem>
            <DropdownMenuItem>Recycling rate improved by 6.2%</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
            <DropdownMenuItem asChild>
              <Link href="/dashboard#users">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard#settings">System Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
