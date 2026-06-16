import { CircleDollarSign, Play, RotateCcw } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AreaTrendChart,
  BarComparisonChart,
  CircularGauge,
  DonutChartView,
} from "@/features/plastic-twin/components/analytics-charts";
import { CheckboxVisual } from "@/features/plastic-twin/components/map-widgets";
import {
  HorizontalBars,
  IconBubble,
  PanelCard,
  TipBar,
} from "@/features/plastic-twin/components/shared-widgets";
import {
  scenarioAreaImpact,
  scenarioOptions,
  simulationTrend,
} from "@/features/plastic-twin/data/plastic-twin-data";

const costSegments = [
  { name: "Refill Station", value: 38, color: "#16a34a", meta: "$7,000" },
  { name: "Awareness & Campaign", value: 24, color: "#2563eb", meta: "$4,500" },
  { name: "Recycling Improvement", value: 16, color: "#f59e0b", meta: "$3,000" },
  { name: "Training & Smart Bins", value: 14, color: "#7c3aed", meta: "$2,500" },
  { name: "Others", value: 8, color: "#94a3b8", meta: "$1,500" },
];

export function ScenarioSimulationView() {
  return (
    <AppShell
      activeKey="scenario-simulation"
      subtitle="Simulate and compare circular economy policies to evaluate their impact on campus"
      title="Scenario Simulation"
    >
      <div className="grid gap-5">
        <section className="grid gap-5 xl:grid-cols-[0.78fr_1.42fr]">
          <PanelCard title="1. Choose Scenario (Select one or more)">
            <div className="grid gap-3">
              {scenarioOptions.map((option) => {
                const Icon = option.icon;

                return (
                  <div
                    className="flex items-center gap-4 rounded-lg border bg-white p-4"
                    key={option.title}
                  >
                    <IconBubble icon={Icon} tone={option.selected ? "green" : "slate"} />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900">{option.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                    <CheckboxVisual checked={option.selected} />
                  </div>
                );
              })}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Button variant="outline">
                <RotateCcw className="size-4" />
                Reset
              </Button>
              <Button>
                <Play className="size-4" />
                Run Simulation
              </Button>
            </div>
          </PanelCard>

          <PanelCard title="2. Simulation Results (Compared to Baseline)">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <SimulationResultCard
                helper="-312 kg/week"
                label="Plastic Waste Reduction"
                value="-24.6%"
              />
              <SimulationResultCard
                helper="-1.24 ton CO2e/week"
                label="CO2 Reduction"
                value="-18.3%"
              />
              <SimulationResultCard
                helper="From 72.0 to 88.7 /100"
                label="Circularity Score Improvement"
                value="+16.7"
              />
              <SimulationResultCard
                helper="One-time investment"
                label="Estimated Cost"
                value="$18,500"
              />
            </div>
            <div className="mt-5 rounded-lg border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-slate-700">
              This scenario combination shows a high positive impact on campus
              sustainability.
            </div>
          </PanelCard>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.58fr_0.58fr_0.7fr_0.62fr]">
          <PanelCard title="Plastic Waste Reduction">
            <BarComparisonChart
              data={[
                { label: "Baseline", value: 1270 },
                { label: "After", value: 958 },
              ]}
              height={220}
            />
          </PanelCard>
          <PanelCard title="CO2 Reduction">
            <BarComparisonChart
              data={[
                { label: "Baseline", value: 2.32 },
                { label: "After", value: 1.08 },
              ]}
              height={220}
            />
          </PanelCard>
          <PanelCard title="Circularity Score">
            <div className="grid place-items-center">
              <CircularGauge label="After Simulation" value={89} />
              <p className="mt-3 text-sm text-muted-foreground">Baseline: 72.0</p>
            </div>
          </PanelCard>
          <PanelCard title="Cost Estimate">
            <DonutChartView
              centerLabel="Total"
              centerValue="$18,500"
              data={costSegments}
              height={190}
            />
            <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">
              Estimated payback period: 14.2 months
            </div>
          </PanelCard>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.62fr_1fr_0.88fr]">
          <PanelCard title="4. High-Impact Areas (Top 5)">
            <HorizontalBars items={scenarioAreaImpact} max={100} />
            <p className="mt-4 text-xs text-muted-foreground">
              Values represent weekly plastic waste reduction.
            </p>
          </PanelCard>

          <PanelCard title="5. Weekly Impact Trend">
            <AreaTrendChart data={simulationTrend} height={260} />
          </PanelCard>

          <PanelCard title="6. Scenario Summary">
            <div className="space-y-3 text-sm text-slate-700">
              {[
                "Implement refill stations in canteen, library, and sports complex.",
                "Ban single-use plastics in all university buildings and events.",
                "Increase recycling rate to 60% through education and better facilities.",
                "Improve sorting accuracy using smart bins and student training.",
              ].map((item) => (
                <div className="flex gap-3" key={item}>
                  <CheckboxVisual checked />
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900">
              This combination creates a strong circular impact and supports the
              university sustainability goals.
            </div>
          </PanelCard>
        </section>

        <TipBar
          action={
            <Button className="h-8 text-emerald-700" variant="ghost">
              Download Report
            </Button>
          }
        >
          Tip: Try different scenario combinations to find the most effective
          strategy for your campus.
        </TipBar>
      </div>
    </AppShell>
  );
}

function SimulationResultCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <Card className="p-5">
      <IconBubble icon={CircleDollarSign} tone="green" />
      <p className="mt-5 text-sm font-bold text-slate-900">{label}</p>
      <p className="mt-5 text-4xl font-bold text-emerald-800">{value}</p>
      <p className="mt-3 text-sm text-muted-foreground">{helper}</p>
    </Card>
  );
}
