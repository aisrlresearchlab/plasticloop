"use client";

import * as React from "react";
import { CalendarDays, Search } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaTrendChart } from "@/features/plastic-twin/components/analytics-charts";
import {
  HorizontalBars,
  IconBubble,
  PanelCard,
  TipBar,
} from "@/features/plastic-twin/components/shared-widgets";
import {
  explainabilityReasons,
  shapImpacts,
} from "@/features/plastic-twin/data/plastic-twin-data";
import { explainWasteRequest } from "@/features/plastic-twin/services/explain-waste-request";
import { cn } from "@/lib/utils";

const summaryTrend = [
  { label: "May 5", value: 1080 },
  { label: "May 7", value: 1120 },
  { label: "May 9", value: 1188 },
  { label: "May 12", value: 1245 },
];

const whatIfInsights = [
  ["Increase recycling rate by 10%", "-46.2 kg"],
  ["Add 2 refill stations", "-28.5 kg"],
  ["Cancel campus event", "-61.3 kg"],
  ["Reduce cafeteria plastic packaging by 20%", "-31.7 kg"],
];

export function ExplainableAiView() {
  const [location, setLocation] = React.useState("overall");
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [aiSummary, setAiSummary] = React.useState(
    "The predicted increase of 165 kg (+15.3%) in plastic waste is mainly driven by campus events and high cafeteria activity, amplified by low recycling participation and insufficient refill stations. Environmental factors had a minor mitigating effect.",
  );
  const [aiRecommendations, setAiRecommendations] = React.useState<string[]>([
    "Add temporary collection points near event areas.",
    "Increase recycling participation reminders before peak hours.",
    "Prepare refill stations around the cafeteria and auditorium.",
  ]);
  const [aiError, setAiError] = React.useState<string | null>(null);

  async function handleAnalyze() {
    setIsAnalyzing(true);
    setAiError(null);

    try {
      const response = await explainWasteRequest({
        context: [
          `Location: ${location}`,
          "Predicted waste increased from 1,080 kg to 1,245 kg.",
          "Top factors: Sports Day, Food Festival, high cafeteria activity, low recycling participation, lack of refill stations.",
          "Goal: explain this in concise operational language and suggest next actions.",
        ].join("\n"),
      });

      setAiSummary(response.summary);
      setAiRecommendations(response.recommendations);
    } catch (error) {
      setAiError(
        error instanceof Error
          ? error.message
          : "Failed to generate explanation with Gemini.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <AppShell
      activeKey="explainable-ai"
      subtitle="Understand and explain the factors behind plastic waste changes using AI"
      title="Explainable AI"
    >
      <div className="grid gap-5">
        <Tabs defaultValue="dashboard">
          <TabsList className="h-auto flex-wrap justify-start bg-transparent p-0">
            {["Explanation Dashboard", "SHAP Explanation", "Feature Impact", "Historical Explanations"].map(
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

        <section className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
          <PanelCard title="1. Select Analysis">
            <div className="grid gap-4 sm:grid-cols-2">
              <DateField label="Prediction Date" value="May 12, 2024" />
              <DateField label="Comparison Date (Baseline)" value="May 5, 2024" />
            </div>
            <div className="mt-4 grid gap-2">
              <label className="text-sm font-semibold">Location (Optional)</label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overall">Campus Overall</SelectItem>
                  <SelectItem value="canteen">Canteen Area</SelectItem>
                  <SelectItem value="engineering">Engineering Faculty</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="mt-5 w-full"
              disabled={isAnalyzing}
              onClick={handleAnalyze}
              type="button"
            >
              <Search className="size-4" />
              {isAnalyzing ? "Analyzing..." : "Analyze"}
            </Button>
            {aiError ? (
              <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                {aiError}
              </p>
            ) : null}
          </PanelCard>

          <PanelCard className="border-red-100 bg-red-50/40" title="2. Summary">
            <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
              <div className="flex items-center gap-5">
                <IconBubble icon={CalendarDays} tone="red" />
                <div>
                  <p className="text-sm text-slate-700">Plastic waste is predicted to</p>
                  <p className="mt-2 text-3xl font-bold text-red-700">INCREASE</p>
                  <p className="mt-2 text-sm text-slate-700">
                    from 1,080 kg to 1,245 kg
                  </p>
                  <p className="mt-4 inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                    +165 kg (+15.3%)
                  </p>
                </div>
              </div>
              <AreaTrendChart color="#dc2626" data={summaryTrend} height={190} />
            </div>
          </PanelCard>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.95fr_0.95fr_0.52fr]">
          <PanelCard title="3. SHAP Explanation (Global)">
            <p className="mb-4 text-sm text-muted-foreground">
              Feature impact on the prediction
            </p>
            <HorizontalBars items={shapImpacts} max={100} />
            <div className="mt-5 flex gap-5 text-xs">
              <span className="flex items-center gap-2">
                <span className="size-3 rounded-sm bg-red-500" />
                Increase Waste
              </span>
              <span className="flex items-center gap-2">
                <span className="size-3 rounded-sm bg-blue-500" />
                Decrease Waste
              </span>
            </div>
          </PanelCard>

          <PanelCard title="4. Top Reasons (Why Waste Increased)">
            <p className="mb-4 text-sm text-muted-foreground">
              These are the key factors that contributed to the increase in plastic waste.
            </p>
            <div className="space-y-4">
              {explainabilityReasons.map((reason) => (
                <Card className="p-4" key={reason.title}>
                  <div className="flex gap-4">
                    <IconBubble icon={reason.icon} tone={reason.tone} />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900">{reason.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {reason.description}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-lg px-3 py-2 text-sm font-bold",
                        reason.tone === "red" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700",
                      )}
                    >
                      {reason.value}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </PanelCard>

          <div className="grid gap-5">
            <PanelCard title="5. What-If Insights">
              <p className="mb-4 text-sm text-muted-foreground">
                How changes in key factors may impact plastic waste.
              </p>
              <div className="space-y-4 text-sm">
                {whatIfInsights.map(([label, value]) => (
                  <div className="flex items-center justify-between gap-3" key={label}>
                    <span className="text-slate-700">{label}</span>
                    <span className="font-bold text-emerald-700">{value}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-5 w-full" variant="outline">
                Explore Scenarios
              </Button>
            </PanelCard>

            <PanelCard title="6. Model Information">
              <div className="space-y-3 text-sm">
                {[
                  ["Model Used", "XGBoost Regressor"],
                  ["Explainer", "SHAP (TreeExplainer)"],
                  ["Data Period", "Apr 28 - May 12, 2024"],
                  ["Prediction Horizon", "7 Days"],
                ].map(([label, value]) => (
                  <div className="flex justify-between gap-3" key={label}>
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-semibold text-slate-900">{value}</span>
                  </div>
                ))}
              </div>
            </PanelCard>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.5fr_0.5fr]">
          <PanelCard title="7. Explanation Summary">
            <p className="text-sm leading-7 text-slate-700">
              {aiSummary}
            </p>
            <div className="mt-4 grid gap-2">
              {aiRecommendations.map((recommendation) => (
                <div
                  className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
                  key={recommendation}
                >
                  {recommendation}
                </div>
              ))}
            </div>
          </PanelCard>
          <PanelCard title="AI Confidence">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>High</span>
              <span className="text-emerald-700">92.4%</span>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[92.4%] rounded-full bg-emerald-600" />
            </div>
          </PanelCard>
        </section>

        <TipBar
          action={
            <Button className="h-8 text-emerald-700" variant="ghost">
              Learn more about SHAP
            </Button>
          }
        >
          Tip: SHAP values show how much each factor contributes to increasing
          or decreasing the predicted plastic waste.
        </TipBar>
      </div>
    </AppShell>
  );
}

function DateField({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold">{label}</label>
      <div className="relative">
        <Input readOnly value={value} />
        <CalendarDays className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
}
