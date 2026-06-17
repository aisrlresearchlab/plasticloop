"use client";

import * as React from "react";
import {
  CalendarDays,
  Download,
  PackageMinus,
  Recycle,
  Repeat2,
  Truck,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CircularGauge,
  DonutChartView,
  MiniSparkline,
  MultiLineTrendChart,
  RadarScoreChart,
} from "@/features/plastic-twin/components/analytics-charts";
import {
  HorizontalBars,
  IconBubble,
  PanelCard,
  TipBar,
} from "@/features/plastic-twin/components/shared-widgets";
import {
  circularityLocationScores,
  locationWasteSegments,
  monthlyCircularityTrend,
  wasteTrend,
} from "@/features/plastic-twin/data/plastic-twin-data";
import type { MetricTone } from "@/features/plastic-twin/types";

const keyIndicators = [
  { label: "Recycling Rate", value: "58.4%", helper: "6.2% vs last month", icon: Recycle, tone: "green" as MetricTone },
  { label: "Reuse Rate", value: "21.7%", helper: "3.1% vs last month", icon: Repeat2, tone: "blue" as MetricTone },
  { label: "Landfill Diversion Rate", value: "68.9%", helper: "7.8% vs last month", icon: Truck, tone: "amber" as MetricTone },
  { label: "Plastic Reduction Rate", value: "31.6%", helper: "4.5% vs last month", icon: PackageMinus, tone: "purple" as MetricTone },
  { label: "Circularity Index", value: "0.72", helper: "0.08 vs last month", icon: Recycle, tone: "green" as MetricTone },
];

const radarData = [
  { label: "Recycling Rate", value: 78, target: 88 },
  { label: "Reuse Rate", value: 67, target: 78 },
  { label: "Landfill Diversion Rate", value: 72, target: 82 },
  { label: "Plastic Reduction Rate", value: 61, target: 75 },
  { label: "Circularity Index", value: 69, target: 84 },
];

const scoreInterpretations = [
  ["80 - 100", "Excellent", "Leading the way in circularity."],
  ["60 - 79", "Good", "You are on the right track."],
  ["40 - 59", "Average", "There is room for improvement."],
  ["20 - 39", "Poor", "Immediate action required."],
  ["0 - 19", "Very Poor", "Critical situation."],
];

export function CircularityAssessmentView() {
  const [exportStatus, setExportStatus] = React.useState("Assessment ready");
  const [trendRange, setTrendRange] = React.useState("6 Months");
  const [showAllLocations, setShowAllLocations] = React.useState(false);
  const visibleLocationScores = showAllLocations
    ? circularityLocationScores
    : circularityLocationScores.slice(0, 5);

  function cycleTrendRange() {
    setTrendRange((currentRange) =>
      currentRange === "6 Months"
        ? "12 Months"
        : currentRange === "12 Months"
          ? "Quarterly"
          : "6 Months",
    );
  }

  return (
    <AppShell
      activeKey="circularity-assessment"
      subtitle="Evaluate and monitor campus sustainability and circular economy performance"
      title="Circularity Assessment"
    >
      <div className="grid gap-5">
        <div className="flex flex-col gap-4 border-b pb-4 lg:flex-row lg:items-center lg:justify-between">
          <Tabs defaultValue="overview">
            <TabsList className="h-auto flex-wrap justify-start bg-transparent p-0">
              {["Overview", "Indicators", "Trend Analysis", "Benchmarking", "Recommendations"].map(
                (tab) => (
                  <TabsTrigger
                    className="rounded-none border-b-2 border-transparent bg-transparent px-4 py-3 data-[state=active]:border-emerald-700 data-[state=active]:bg-transparent data-[state=active]:text-emerald-800 data-[state=active]:shadow-none"
                    key={tab}
                    value={tab.toLowerCase().replaceAll(" ", "-")}
                  >
                    {tab}
                  </TabsTrigger>
                ),
              )}
            </TabsList>
          </Tabs>
          <div className="flex flex-col gap-2 sm:items-end">
            <Button
              className="gap-2"
              onClick={() => setExportStatus("Circularity report exported.")}
              type="button"
              variant="outline"
            >
              <Download className="size-4" />
              Export Report
            </Button>
            <p className="text-xs font-medium text-emerald-700">{exportStatus}</p>
          </div>
        </div>

        <section className="grid gap-5 xl:grid-cols-[0.62fr_1.88fr]">
          <PanelCard title="Campus Circularity Score">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              <CircularGauge label="/100" value={72} />
              <div>
                <p className="text-xl font-bold text-emerald-800">Good</p>
                <p className="mt-2 max-w-64 text-sm leading-6 text-slate-700">
                  Your campus is performing well. Keep improving!
                </p>
                <p className="mt-4 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  + 8 pts vs last month
                </p>
              </div>
            </div>
          </PanelCard>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {keyIndicators.map((metric) => {
              const Icon = metric.icon;

              return (
                <Card className="p-5" key={metric.label}>
                  <IconBubble icon={Icon} tone={metric.tone} />
                  <p className="mt-5 text-sm font-bold text-slate-900">{metric.label}</p>
                  <p className="mt-5 text-4xl font-bold text-slate-950">{metric.value}</p>
                  <p className="mt-3 text-xs font-semibold text-emerald-700">
                    + {metric.helper}
                  </p>
                  <MiniSparkline data={wasteTrend} />
                </Card>
              );
            })}
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.86fr_1.06fr_0.58fr]">
          <PanelCard title="Indicator Performance Overview">
            <RadarScoreChart data={radarData} />
          </PanelCard>

          <PanelCard
            action={
              <Button
                className="h-8"
                onClick={cycleTrendRange}
                size="sm"
                type="button"
                variant="outline"
              >
                {trendRange}
              </Button>
            }
            title="Trend Over Time"
          >
            <MultiLineTrendChart data={monthlyCircularityTrend} height={300} />
          </PanelCard>

          <PanelCard title="Score Interpretation">
            <div className="space-y-4">
              {scoreInterpretations.map(([range, label, description]) => (
                <div className="grid grid-cols-[72px_1fr] gap-3 text-sm" key={range}>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-center text-xs font-bold text-emerald-700">
                    {range}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">{label}</p>
                    <p className="text-xs leading-5 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </PanelCard>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.85fr_0.8fr_0.65fr]">
          <PanelCard title="Performance by Location">
            <HorizontalBars items={visibleLocationScores} />
            <Button
              className="mt-4 h-8 px-0 text-emerald-700"
              onClick={() => setShowAllLocations((value) => !value)}
              type="button"
              variant="ghost"
            >
              {showAllLocations ? "Show Fewer Locations" : "View All Locations"}
            </Button>
          </PanelCard>

          <PanelCard title="Contribution to Circularity Index">
            <DonutChartView
              centerLabel="Index"
              centerValue="0.72"
              data={locationWasteSegments}
              height={210}
            />
            <p className="mt-4 rounded-lg bg-emerald-50 py-2 text-center text-xs font-semibold text-emerald-800">
              Total Weight: 100%
            </p>
          </PanelCard>

          <PanelCard title="Recent Assessments">
            <div className="space-y-4">
              {[
                ["June 17, 2026", "Circularity Score: 72/100", "+ 8 pts"],
                ["May 17, 2026", "Circularity Score: 64/100", "+ 6 pts"],
                ["April 17, 2026", "Circularity Score: 58/100", "+ 5 pts"],
                ["March 17, 2026", "Circularity Score: 53/100", "+ 4 pts"],
              ].map(([date, score, change]) => (
                <div className="flex items-center gap-3 border-b pb-3 last:border-b-0 last:pb-0" key={date}>
                  <IconBubble className="size-9" icon={CalendarDays} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900">{date}</p>
                    <p className="text-xs text-muted-foreground">{score}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">{change}</span>
                </div>
              ))}
            </div>
          </PanelCard>
        </section>

        <TipBar>
          Tip: Improve recycling infrastructure and promote reuse initiatives to
          increase your circularity score.
        </TipBar>
      </div>
    </AppShell>
  );
}
