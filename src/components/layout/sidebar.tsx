import Link from "next/link";

import { Brand } from "@/components/layout/brand";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { appNavigation } from "@/features/plastic-twin/data/plastic-twin-data";
import type { AppRouteKey } from "@/features/plastic-twin/types";
import { cn } from "@/lib/utils";

type SidebarProps = {
  activeKey: AppRouteKey;
  className?: string;
};

export function Sidebar({ activeKey, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full min-h-dvh w-72 shrink-0 flex-col overflow-hidden bg-[#002f25] px-4 py-6 text-white",
        className,
      )}
    >
      <Brand compact inverted />

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {appNavigation.map((item) => {
          const isActive = item.key === activeKey;
          const Icon = item.icon;

          return (
            <div key={item.key}>
              <Link
                href={item.href}
                className={cn(
                  "flex min-h-12 items-center gap-3 rounded-md px-4 py-3 text-sm font-semibold text-emerald-50/90 transition-colors hover:bg-white/10 hover:text-white",
                  isActive &&
                    "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-sm",
                )}
              >
                <Icon className="size-5" />
                <span className="min-w-0 truncate">{item.label}</span>
              </Link>

              {item.children ? (
                <div className={cn("ml-6 mt-1 grid gap-1", !isActive && "hidden")}>
                  {item.children.map((child) => (
                    <Link
                      href={child.href}
                      key={child.href}
                      className="flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium text-emerald-100/80 hover:bg-white/10 hover:text-white"
                    >
                      <span className="size-1.5 rounded-full bg-emerald-300" />
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 border border-white/20">
            <AvatarFallback className="bg-blue-700 text-xs text-white">HCM</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">HCM University</p>
            <p className="truncate text-xs text-emerald-100/80">
              Sustainability Office
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
