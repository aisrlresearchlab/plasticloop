"use client";

import * as React from "react";
import {
  CalendarDays,
  ChevronDown,
  CloudSun,
  LineChart,
  MapPin,
  Users,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AreaTrendChart } from "@/features/plastic-twin/components/analytics-charts";
import { MapView } from "@/features/plastic-twin/components/map-view";
import {
  HorizontalBars,
  IconBubble,
  PanelCard,
  RecommendationList,
  TipBar,
} from "@/features/plastic-twin/components/shared-widgets";
import {
  factorImpact,
  predictionRecommendations,
  weeklyPredictionTrend,
} from "@/features/plastic-twin/data/plastic-twin-data";

const locationBaseWaste: Record<string, number> = {
  canteen: 1245,
  dormitory: 980,
  auditorium: 830,
};

const activityMultiplier: Record<string, number> = {
  low: 0.82,
  medium: 1,
  high: 1.16,
};

const weatherMultiplier: Record<string, number> = {
  sunny: 1,
  rainy: 0.9,
  cloudy: 0.96,
};

export function WastePredictionView() {
  const [location, setLocation] = React.useState("canteen");
  const [activityLevel, setActivityLevel] = React.useState("high");
  const [weather, setWeather] = React.useState("sunny");
  const [events, setEvents] = React.useState(["Sports Day", "Food Festival"]);
  const [trendView, setTrendView] = React.useState("daily");
  const [predictedWaste, setPredictedWaste] = React.useState(1245);
  const [lastUpdated, setLastUpdated] = React.useState("Ready");

  const averageDailyWaste = Math.round(predictedWaste / 7);
  const predictionAccuracy =
    91.2 + (activityLevel === "medium" ? 1.1 : 0) + (weather === "sunny" ? 1 : 0);
  const eventMultiplier = events.length > 0 ? 1 + events.length * 0.045 : 0.94;
  const adjustedTrend = weeklyPredictionTrend.map((point, index) => ({
    ...point,
    value: Math.round((predictedWaste / 1245) * point.value + index * 3),
  }));

  function handlePredictWaste() {
    const nextWaste = Math.round(
      locationBaseWaste[location] *
        activityMultiplier[activityLevel] *
        weatherMultiplier[weather] *
        eventMultiplier,
    );

    setPredictedWaste(nextWaste);
    setLastUpdated("Prediction updated using dummy model");
  }

  function handleToggleEvent() {
    setEvents((currentEvents) =>
      currentEvents.includes("Open Campus")
        ? currentEvents.filter((event) => event !== "Open Campus")
        : [...currentEvents, "Open Campus"],
    );
  }

  return (
    <AppShell
      activeKey="waste-prediction"
      subtitle="Predict future plastic waste generation based on campus activities and environmental factors"
      title="Waste Prediction"
    >
      <div className="grid gap-5 xl:grid-cols-[0.56fr_1.44fr]">
        <aside className="grid content-start gap-5">
          <PanelCard title="1. Prediction Inputs">
            <div className="grid gap-5">
              <PredictionInput icon={MapPin} label="Location">
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="canteen">Canteen Area</SelectItem>
                    <SelectItem value="dormitory">Dormitory</SelectItem>
                    <SelectItem value="auditorium">Auditorium</SelectItem>
                  </SelectContent>
                </Select>
              </PredictionInput>

              <PredictionInput icon={CalendarDays} label="Date Range">
                <Button className="w-full justify-between" variant="outline">
                  May 13, 2024 - May 19, 2024
                  <CalendarDays className="size-4" />
                </Button>
              </PredictionInput>

              <PredictionInput
                helper="High activity level will increase waste generation."
                icon={Users}
                label="Student Activity Level"
              >
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </PredictionInput>

              <PredictionInput icon={CalendarDays} label="Event Schedule">
                <div className="flex min-h-10 items-center justify-between rounded-md border bg-white px-3">
                  <div className="flex flex-wrap gap-2">
                    {events.map((event) => (
                      <span
                        className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium"
                        key={event}
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </div>
                <Button
                  className="h-7 px-0 text-xs text-emerald-700"
                  onClick={handleToggleEvent}
                  type="button"
                  variant="ghost"
                >
                  {events.includes("Open Campus") ? "- Remove Open Campus" : "+ Add Event"}
                </Button>
              </PredictionInput>

              <PredictionInput
                helper="Weather can impact plastic waste generation."
                icon={CloudSun}
                label="Weather Condition"
              >
                <Select value={weather} onValueChange={setWeather}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunny">Sunny (28C)</SelectItem>
                    <SelectItem value="rainy">Rainy (24C)</SelectItem>
                    <SelectItem value="cloudy">Cloudy (26C)</SelectItem>
                  </SelectContent>
                </Select>
              </PredictionInput>

              <Button className="h-11 w-full" onClick={handlePredictWaste} type="button">
                Predict Waste
                <LineChart className="ml-auto size-4" />
              </Button>
            </div>
          </PanelCard>

          <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
            <div className="flex gap-4">
              <IconBubble icon={LineChart} />
              <div>
                <p className="font-bold text-emerald-900">About Prediction Model</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Our AI model uses historical data, campus activity, events,
                  and weather to predict plastic waste generation with high
                  accuracy.
                </p>
                <Button className="mt-3 h-8 px-0 text-emerald-700" variant="ghost">
                  Learn more about our model
                </Button>
              </div>
            </div>
          </div>
        </aside>

        <section className="grid gap-5">
          <PanelCard title="2. Prediction Results">
            <div className="grid gap-4 lg:grid-cols-[1.35fr_0.75fr_0.75fr]">
              <div className="rounded-lg border border-emerald-100 bg-emerald-50/70 p-5">
                <p className="text-sm font-bold text-slate-900">
                  Predicted Waste Volume
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Total predicted plastic waste
                </p>
                <div className="mt-5 flex items-end gap-2">
                  <span className="text-5xl font-bold text-emerald-800">
                    {predictedWaste.toLocaleString("en-US")}
                  </span>
                  <span className="pb-1 text-lg font-semibold">kg</span>
                </div>
                <p className="mt-2 text-xs font-medium text-muted-foreground">
                  May 13 - May 19, 2024
                </p>
                <p className="mt-4 text-xs font-semibold text-emerald-700">
                  + {Math.max(4, Math.round((predictedWaste / 1245) * 18.6))}% vs previous 7 days
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{lastUpdated}</p>
              </div>

              <SmallPredictionMetric
                helper="+ 18.6% vs previous 7 days"
                label="Average Daily Waste"
                unit="kg/day"
                value={String(averageDailyWaste)}
              />
              <SmallPredictionMetric
                helper="Model accuracy"
                label="Prediction Accuracy"
                unit="%"
                value={predictionAccuracy.toFixed(1)}
              />
            </div>
          </PanelCard>

          <div className="grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
            <PanelCard
              action={
                <Select value={trendView} onValueChange={setTrendView}>
                  <SelectTrigger className="h-8 w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily View</SelectItem>
                    <SelectItem value="weekly">Weekly View</SelectItem>
                  </SelectContent>
                </Select>
              }
              title="3. Weekly Trend"
            >
              <AreaTrendChart data={adjustedTrend} height={280} />
            </PanelCard>

            <PanelCard contentClassName="p-0" title="4. High-Risk Locations (May 13 - May 19)">
              <MapView className="min-h-[360px] rounded-none border-0" variant="prediction" />
            </PanelCard>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            <PanelCard title="5. Recommendations">
              <RecommendationList items={predictionRecommendations} />
            </PanelCard>

            <PanelCard title="6. Contributing Factors (Impact)">
              <HorizontalBars items={factorImpact} />
            </PanelCard>
          </div>

          <TipBar
            action={
              <Button className="h-8 text-emerald-700" variant="ghost">
                View Model Details
              </Button>
            }
          >
            Tip: Update event schedules and activity levels regularly for more
            accurate predictions.
          </TipBar>
        </section>
      </div>
    </AppShell>
  );
}

function PredictionInput({
  icon: Icon,
  label,
  helper,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <Icon className="size-4 text-emerald-700" />
        {label}
      </div>
      {children}
      {helper ? <p className="text-xs text-muted-foreground">{helper}</p> : null}
    </div>
  );
}

function SmallPredictionMetric({
  label,
  value,
  unit,
  helper,
}: {
  label: string;
  value: string;
  unit: string;
  helper: string;
}) {
  return (
    <div className="rounded-lg border bg-white p-5">
      <p className="text-sm font-bold text-slate-900">{label}</p>
      <div className="mt-6 flex items-end gap-1">
        <span className="text-4xl font-bold text-emerald-800">{value}</span>
        <span className="pb-1 text-sm font-semibold text-slate-700">{unit}</span>
      </div>
      <p className="mt-4 text-xs font-medium text-muted-foreground">{helper}</p>
    </div>
  );
}
