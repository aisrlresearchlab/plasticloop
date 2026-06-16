"use client";

import * as React from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import type { AppRouteKey } from "@/features/plastic-twin/types";

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

  return (
    <div className="min-h-dvh bg-[#f6faf8] text-foreground">
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block">
        <Sidebar activeKey={activeKey} />
      </div>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent className="w-72 border-0 bg-[#002f25] p-0" side="left">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Sidebar activeKey={activeKey} className="min-h-full" />
        </SheetContent>
      </Sheet>

      <div className="lg:pl-72">
        <Topbar
          dateLabel={dateLabel}
          onOpenSidebar={() => setSidebarOpen(true)}
          subtitle={subtitle}
          timeLabel={timeLabel}
          title={title}
        />
        <main className="mx-auto w-full max-w-[1680px] px-4 py-5 sm:px-6">
          {children}
        </main>
        <footer className="mx-auto flex w-full max-w-[1680px] flex-col items-center gap-2 px-4 pb-4 text-xs text-muted-foreground sm:flex-row sm:justify-center sm:gap-8 sm:px-6">
          <span>(c) 2024 PlasticTwin-Campus. All rights reserved.</span>
          <span className="text-emerald-700">Privacy Policy</span>
          <span className="text-emerald-700">Terms of Use</span>
        </footer>
      </div>
    </div>
  );
}
