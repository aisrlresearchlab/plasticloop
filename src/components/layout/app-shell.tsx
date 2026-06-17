"use client";

import * as React from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import type { AppRouteKey } from "@/features/plastic-twin/types";
import { cn } from "@/lib/utils";

type AppShellProps = {
  activeKey: AppRouteKey;
  title: string;
  subtitle: string;
  dateLabel?: string;
  timeLabel?: string;
  children: React.ReactNode;
};

export function AppShell({
  activeKey,
  title,
  subtitle,
  dateLabel,
  timeLabel,
  children,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const openSidebar = React.useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = React.useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="min-h-dvh bg-[#f6faf8] text-foreground">
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block">
        <Sidebar activeKey={activeKey} />
      </div>

      <div
        aria-hidden={!sidebarOpen}
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/40 opacity-0 backdrop-blur-sm transition-opacity duration-150 lg:hidden",
          sidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none",
        )}
        onClick={closeSidebar}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 -translate-x-full transform-gpu transition-transform duration-150 ease-out lg:hidden",
          sidebarOpen && "translate-x-0",
        )}
      >
        <Sidebar activeKey={activeKey} className="min-h-full" onNavigate={closeSidebar} />
      </div>

      <div className="lg:pl-72">
        <Topbar
          dateLabel={dateLabel}
          onOpenSidebar={openSidebar}
          subtitle={subtitle}
          timeLabel={timeLabel}
          title={title}
        />
        <main className="mx-auto w-full max-w-[1680px] px-4 py-5 sm:px-6">
          {children}
        </main>
        <footer className="mx-auto flex w-full max-w-[1680px] flex-col items-center gap-2 px-4 pb-4 text-xs text-muted-foreground sm:flex-row sm:justify-center sm:gap-8 sm:px-6">
          <span>(c) 2026 PlasticTwin-Campus. All rights reserved.</span>
          <span className="text-emerald-700">Privacy Policy</span>
          <span className="text-emerald-700">Terms of Use</span>
        </footer>
      </div>
    </div>
  );
}
