"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaTrendChart,
  DonutChartView,
} from "@/features/plastic-twin/components/analytics-charts";
import { MapView } from "@/features/plastic-twin/components/map-view";
import {
  MetricCard,
  PanelCard,
} from "@/features/plastic-twin/components/shared-widgets";
import { toneStyles } from "@/features/plastic-twin/components/tone";
import {
  dashboardStats,
  locationWasteSegments,
  plasticTypeSegments,
  recentActivity,
  wasteTrend,
} from "@/features/plastic-twin/data/plastic-twin-data";
import { cn } from "@/lib/utils";

export function DashboardOverviewView() {
  const [range, setRange] = React.useState("7");
  const [showAllActivity, setShowAllActivity] = React.useState(false);
  const trendScale = range === "14" ? 1.08 : range === "30" ? 1.18 : 1;
  const adjustedTrend = wasteTrend.map((point, index) => ({
    ...point,
    value: Math.round(point.value * trendScale + index * Number(range)),
  }));
  const visibleActivity = showAllActivity
    ? [
        ...recentActivity,
        ...recentActivity.map((activity) => ({
          ...activity,
          title: `${activity.title} (Earlier)`,
          time: "08:10 AM",
        })),
      ]
    : recentActivity;

  return (
    <AppShell
      activeKey="dashboard"
      subtitle="Real-time overview of campus plastic waste and circularity performance"
      title="Dashboard Overview"
    >
      <div className="grid gap-5">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {dashboardStats.map((metric) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              sparkline={metric.label === "Circularity Score" ? undefined : wasteTrend}
            />
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.05fr_0.75fr_1.45fr]">
          <PanelCard
            action={
              <Select value={range} onValueChange={setRange}>
                <SelectTrigger className="h-8 w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 Days</SelectItem>
                  <SelectItem value="14">14 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                </SelectContent>
              </Select>
            }
            title="Plastic Waste Trend"
          >
            <AreaTrendChart data={adjustedTrend} />
          </PanelCard>

          <PanelCard title="Waste by Location (Today)">
            <DonutChartView data={locationWasteSegments} />
          </PanelCard>

          <PanelCard
            action={
              <Button className="h-8 gap-2" size="sm" variant="outline">
                3D View
                <ChevronDown className="size-4" />
              </Button>
            }
            contentClassName="p-0"
            title="Campus Digital Twin"
          >
            <MapView className="min-h-[420px] rounded-none border-0" variant="dashboard" />
          </PanelCard>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.85fr_0.95fr_1.4fr]">
          <PanelCard title="Waste by Plastic Type (Today)">
            <DonutChartView data={plasticTypeSegments} />
          </PanelCard>

          <PanelCard
            action={
              <Button
                className="h-8 px-2 text-xs text-emerald-700"
                onClick={() => setShowAllActivity((value) => !value)}
                type="button"
                variant="ghost"
              >
                {showAllActivity ? "Show Less" : "View All"}
              </Button>
            }
            title="Recent Activity"
          >
            <div className="space-y-4">
              {visibleActivity.map((activity, index) => {
                const Icon = activity.icon;

                return (
                  <div className="flex items-start gap-4" key={`${activity.title}-${index}`}>
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-full",
                        toneStyles[activity.tone].iconSoft,
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900">
                        {activity.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </PanelCard>

          <PanelCard title="Campus Highlights">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Active Sensors", "42", "38 online"],
                ["Collection Points", "16", "4 high volume"],
                ["AI Confidence", "93.6%", "Latest scan"],
              ].map(([label, value, helper]) => (
                <div className="rounded-lg border bg-slate-50 p-4" key={label}>
                  <p className="text-sm font-semibold text-slate-700">{label}</p>
                  <p className="mt-3 text-3xl font-bold text-slate-950">{value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
                </div>
              ))}
            </div>
          </PanelCard>
        </section>
      </div>
    </AppShell>
  );
}
