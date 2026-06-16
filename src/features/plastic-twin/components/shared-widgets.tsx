import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Leaf, Lightbulb, Recycle, UploadCloud } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MiniSparkline } from "@/features/plastic-twin/components/analytics-charts";
import { toneStyles } from "@/features/plastic-twin/components/tone";
import type {
  HorizontalMetric,
  MetricTone,
  Recommendation,
  StatMetric,
  TrendPoint,
} from "@/features/plastic-twin/types";
import { cn } from "@/lib/utils";

type IconBubbleProps = {
  icon: LucideIcon;
  tone?: MetricTone;
  className?: string;
};

export function IconBubble({ icon: Icon, tone = "green", className }: IconBubbleProps) {
  return (
    <span
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full",
        toneStyles[tone].iconSoft,
        className,
      )}
    >
      <Icon className="size-5" />
    </span>
  );
}

export function MetricCard({
  metric,
  sparkline,
}: {
  metric: StatMetric;
  sparkline?: TrendPoint[];
}) {
  const Icon = metric.icon;

  return (
    <Card className="min-h-32 overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <IconBubble icon={Icon} tone={metric.tone} />
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-sm font-semibold text-slate-800">
              {metric.label}
            </p>
            <div className="mt-5 flex items-end gap-1">
              <span className="text-4xl font-bold leading-none text-slate-950">
                {metric.value}
              </span>
              {metric.unit ? (
                <span className="pb-1.5 text-sm font-semibold text-slate-700">
                  {metric.unit}
                </span>
              ) : null}
            </div>
            <div className="mt-3 flex items-center gap-2">
              {metric.trend ? (
                <span className="text-xs font-semibold text-emerald-700">
                  + {metric.trend}
                </span>
              ) : null}
              {metric.helper ? (
                <span className="text-xs font-medium text-muted-foreground">
                  {metric.helper}
                </span>
              ) : null}
            </div>
          </div>
        </div>
        {sparkline ? <MiniSparkline color={toneStyles[metric.tone].chart} data={sparkline} /> : null}
      </CardContent>
    </Card>
  );
}

type PanelCardProps = {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function PanelCard({
  title,
  children,
  action,
  className,
  contentClassName,
}: PanelCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex-row items-center justify-between space-y-0 p-5 pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent className={cn("p-5 pt-0", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}

export function TipBar({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-emerald-100 bg-emerald-50/70 px-5 py-3 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Lightbulb className="size-5 shrink-0 text-emerald-700" />
        <p>{children}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function HorizontalBars({
  items,
  max = 100,
}: {
  items: HorizontalMetric[];
  max?: number;
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const tone = item.tone ?? "green";

        return (
          <div className="grid gap-1.5" key={item.label}>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="truncate font-medium text-slate-700">{item.label}</span>
              <span className={cn("shrink-0 text-xs font-semibold", toneStyles[tone].text)}>
                {item.displayValue}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={cn("h-full rounded-full", toneStyles[tone].bg)}
                style={{ width: `${Math.min((item.value / max) * 100, 100)}%` }}
              >
                <div
                  className={cn(
                    "h-full rounded-full",
                    tone === "red"
                      ? "bg-red-500"
                      : tone === "blue"
                        ? "bg-blue-500"
                        : tone === "amber"
                          ? "bg-amber-500"
                          : tone === "purple"
                            ? "bg-violet-500"
                            : tone === "slate"
                              ? "bg-slate-500"
                              : "bg-emerald-600",
                  )}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function RecommendationList({
  items,
  compact = false,
}: {
  items: Recommendation[];
  compact?: boolean;
}) {
  return (
    <div className={cn("grid gap-3", compact && "sm:grid-cols-2 xl:grid-cols-4")}>
      {items.map((item) => (
        <div
          className={cn(
            "rounded-lg border border-slate-100 bg-white p-4",
            compact && "bg-slate-50/70",
          )}
          key={item.title}
        >
          <div className="flex gap-3">
            <IconBubble className="size-10" icon={item.icon} tone={item.tone} />
            <div className="min-w-0">
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function StatusBadge({
  tone = "green",
  children,
}: {
  tone?: MetricTone;
  children: React.ReactNode;
}) {
  const variant =
    tone === "red"
      ? "danger"
      : tone === "amber"
        ? "warning"
        : tone === "blue"
          ? "info"
          : tone === "purple"
            ? "secondary"
            : "success";

  return <Badge variant={variant}>{children}</Badge>;
}

export function UploadDropzone({
  title = "Drag and drop files here",
  action = "Choose Files",
  helper,
}: {
  title?: string;
  action?: string;
  helper?: string;
}) {
  return (
    <div className="grid min-h-44 place-items-center rounded-lg border border-dashed border-emerald-300 bg-emerald-50/20 p-6 text-center">
      <div>
        <UploadCloud className="mx-auto size-10 text-emerald-700" />
        <p className="mt-4 text-sm font-medium text-slate-700">{title}</p>
        <Button className="mt-4">{action}</Button>
        {helper ? <p className="mt-3 text-xs text-muted-foreground">{helper}</p> : null}
      </div>
    </div>
  );
}

export function CampusIllustration({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-none bg-gradient-to-b from-sky-50 via-emerald-50 to-emerald-200",
        compact ? "h-44 rounded-lg" : "h-full min-h-80",
      )}
    >
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-emerald-400/55 to-transparent" />
      <div className="absolute bottom-0 left-0 h-28 w-44 rounded-tr-full bg-emerald-700/30" />
      <div className="absolute bottom-0 right-0 h-36 w-64 rounded-tl-full bg-lime-500/35" />
      <div className="absolute bottom-16 left-12 h-28 w-36 rounded-t-full bg-white shadow-sm" />
      <div className="absolute bottom-16 left-[4.5rem] h-36 w-24 rounded-t-lg bg-slate-100 shadow-md" />
      <div className="absolute bottom-16 left-28 h-44 w-28 rounded-t-md bg-white shadow-lg" />
      <div className="absolute bottom-16 left-56 h-28 w-32 rounded-t-md bg-slate-50 shadow-md" />
      <div className="absolute bottom-16 left-[4.5rem] grid h-24 w-24 grid-cols-3 gap-2 p-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <span className="rounded-sm bg-sky-100" key={index} />
        ))}
      </div>
      <div className="absolute bottom-16 left-32 grid h-32 w-20 grid-cols-2 gap-2 p-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <span className="rounded-sm bg-sky-100" key={index} />
        ))}
      </div>
      <div className="absolute bottom-0 left-1/2 h-40 w-28 -translate-x-1/2 rounded-t-full border-x-8 border-white/80 bg-emerald-100/50" />
      <div className="absolute bottom-12 right-16 grid size-24 place-items-center rounded-md bg-emerald-700 text-white shadow-xl">
        <Recycle className="size-12" />
      </div>
      <div className="absolute bottom-14 left-4 right-4 h-10 rounded-full bg-white/70 blur-sm" />
      <Leaf className="absolute right-10 top-16 size-16 text-emerald-600/20" />
    </div>
  );
}

export function BottleVisual() {
  return (
    <div className="relative grid min-h-[480px] place-items-center overflow-hidden rounded-lg bg-[radial-gradient(circle_at_30%_20%,#e7f8ef,transparent_34%),linear-gradient(135deg,#d8eadc,#8fb99c)]">
      <div className="absolute inset-x-0 bottom-0 h-24 bg-amber-900/25" />
      <div className="relative h-96 w-40">
        <div className="absolute left-1/2 top-0 h-10 w-20 -translate-x-1/2 rounded-t-md bg-blue-600 shadow-lg" />
        <div className="absolute left-1/2 top-8 h-8 w-16 -translate-x-1/2 rounded-b-lg bg-blue-500" />
        <div className="absolute left-1/2 top-16 h-72 w-32 -translate-x-1/2 rounded-[2rem] border-4 border-blue-100/80 bg-white/35 shadow-2xl backdrop-blur-sm" />
        <div className="absolute left-1/2 top-28 h-8 w-36 -translate-x-1/2 rounded-full border-y-4 border-blue-100/90 bg-white/20" />
        <div className="absolute left-1/2 top-40 h-8 w-36 -translate-x-1/2 rounded-full border-y-4 border-blue-100/90 bg-white/20" />
        <div className="absolute left-1/2 top-56 h-8 w-36 -translate-x-1/2 rounded-full border-y-4 border-blue-100/90 bg-white/20" />
        <div className="absolute left-1/2 bottom-8 h-10 w-24 -translate-x-1/2 rounded-b-full bg-blue-300/55" />
      </div>
      <Badge className="absolute bottom-8 left-1/2 -translate-x-1/2" variant="success">
        High Confidence
      </Badge>
    </div>
  );
}

export function SectionActionLink({ children }: { children: React.ReactNode }) {
  return (
    <Button className="h-8 gap-1 px-2 text-xs text-emerald-700" variant="ghost">
      {children}
      <ArrowUpRight className="size-3.5" />
    </Button>
  );
}
