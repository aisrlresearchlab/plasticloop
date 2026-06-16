import {
  CalendarDays,
  Cloud,
  Download,
  FileSpreadsheet,
  FileText,
  Gauge,
  MapPin,
  Recycle,
  Send,
  Trash2,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaTrendChart,
  BarComparisonChart,
  DonutChartView,
} from "@/features/plastic-twin/components/analytics-charts";
import {
  CampusIllustration,
  HorizontalBars,
  IconBubble,
  MetricCard,
  PanelCard,
  RecommendationList,
  TipBar,
} from "@/features/plastic-twin/components/shared-widgets";
import {
  circularityScoreTrend,
  reportLocationWaste,
  reportPerformanceTrend,
  reportRecommendations,
  reportWasteSegments,
} from "@/features/plastic-twin/data/plastic-twin-data";
import type { StatMetric } from "@/features/plastic-twin/types";

const reportSummary: StatMetric[] = [
  {
    label: "Total Plastic Waste",
    value: "2,845",
    unit: "kg",
    trend: "12.6% vs previous 2 weeks",
    tone: "green",
    icon: Trash2,
  },
  {
    label: "Recycling Rate",
    value: "58.4",
    unit: "%",
    trend: "6.2% vs previous 2 weeks",
    tone: "green",
    icon: Recycle,
  },
  {
    label: "CO2 Reduction",
    value: "1.24",
    unit: "ton",
    trend: "18.3% vs previous 2 weeks",
    tone: "blue",
    icon: Cloud,
  },
  {
    label: "Circularity Score",
    value: "72",
    unit: "/100",
    trend: "5.8 pts vs previous 2 weeks",
    tone: "purple",
    icon: Gauge,
  },
];

export function ReportsView() {
  return (
    <AppShell
      activeKey="reports"
      dateLabel="Apr 28 - May 12, 2024"
      subtitle="Generate and download sustainability reports for your campus."
      title="Reports"
    >
      <div className="grid gap-5">
        <Tabs defaultValue="overview">
          <TabsList className="h-auto flex-wrap justify-start bg-transparent p-0">
            {["Overview", "Custom Report", "Scheduled Reports", "Report History"].map((tab) => (
              <TabsTrigger
                className="rounded-none border-b-2 border-transparent bg-transparent px-4 py-3 data-[state=active]:border-emerald-700 data-[state=active]:bg-transparent data-[state=active]:text-emerald-800 data-[state=active]:shadow-none"
                key={tab}
                value={tab.toLowerCase().replaceAll(" ", "-")}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Card className="p-5">
          <div className="grid gap-5 lg:grid-cols-[220px_1fr_260px]">
            <CampusIllustration compact />
            <div>
              <h2 className="text-3xl font-bold text-slate-950">
                Sustainability Report
              </h2>
              <p className="mt-2 text-xl font-bold text-emerald-700">HCM University</p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
                Comprehensive overview of plastic waste management performance
                and circular economy progress.
              </p>
              <div className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
                <ReportMeta icon={CalendarDays} label="Date Range" value="Apr 28 - May 12, 2024" />
                <ReportMeta icon={MapPin} label="Location" value="Campus Overall" />
                <ReportMeta icon={FileText} label="Generated on" value="May 12, 2024 10:24 AM" />
              </div>
            </div>
            <div className="grid content-center gap-3">
              <Button className="h-12">
                <Download className="size-5" />
                Download PDF
              </Button>
              <Button className="h-12" variant="outline">
                <FileSpreadsheet className="size-5" />
                Export Excel
              </Button>
              <Button className="h-12" variant="outline">
                <Send className="size-5" />
                Send to Admin
              </Button>
            </div>
          </div>
        </Card>

        <PanelCard title="1. Key Summary">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {reportSummary.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
        </PanelCard>

        <section className="grid gap-5 xl:grid-cols-[0.7fr_1.3fr]">
          <PanelCard title="2. Waste Summary">
            <DonutChartView
              centerLabel="kg"
              centerValue="2,845"
              data={reportWasteSegments}
              height={250}
            />
            <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800">
              Total waste increased by 12.6% compared to Apr 14 - Apr 27, 2024.
            </div>
          </PanelCard>

          <PanelCard title="3. Recycling Performance">
            <BarComparisonChart data={reportPerformanceTrend} height={330} />
            <div className="mt-4 flex flex-wrap justify-between gap-3 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800">
              <span>Average recycling rate: 58.4%</span>
              <span>+ 6.2% vs previous 2 weeks</span>
            </div>
          </PanelCard>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.55fr_0.8fr_0.65fr]">
          <PanelCard title="4. CO2 Reduction">
            <div className="grid place-items-center rounded-lg bg-slate-50 p-8 text-center">
              <IconBubble icon={Cloud} tone="blue" />
              <p className="mt-5 text-4xl font-bold text-slate-950">1.24 ton</p>
              <p className="mt-2 text-sm text-muted-foreground">CO2 reduced</p>
              <p className="mt-4 text-xs font-bold text-emerald-700">
                + 18.3% vs previous 2 weeks
              </p>
            </div>
            <div className="mt-4 rounded-lg bg-emerald-50 p-4 text-sm text-slate-700">
              This is equivalent to 222 trees planted or 6,210 km driven by an
              average passenger car.
            </div>
          </PanelCard>

          <PanelCard title="5. Circularity Score Trend">
            <AreaTrendChart data={circularityScoreTrend} height={280} />
            <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800">
              Overall circularity score improved by 5.8 points.
            </div>
          </PanelCard>

          <PanelCard title="6. Waste by Location (Top 5)">
            <HorizontalBars items={reportLocationWaste} />
            <div className="mt-8 flex items-center justify-between border-t pt-4">
              <span className="font-bold">Total</span>
              <span className="font-bold">2,845 kg</span>
            </div>
          </PanelCard>
        </section>

        <PanelCard title="7. Recommendations">
          <RecommendationList compact items={reportRecommendations} />
        </PanelCard>

        <TipBar>
          Tip: Schedule this report monthly to track long-term sustainability
          progress.
        </TipBar>
      </div>
    </AppShell>
  );
}

function ReportMeta({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="size-5 shrink-0 text-slate-700" />
      <div>
        <p className="font-semibold text-slate-900">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
