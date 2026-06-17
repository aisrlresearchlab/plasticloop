"use client";

import * as React from "react";
import { BarChart3, Clock, Recycle, Trash2 } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapView } from "@/features/plastic-twin/components/map-view";
import { IconBubble, TipBar } from "@/features/plastic-twin/components/shared-widgets";
import { cn } from "@/lib/utils";

const digitalTwinMetrics = [
  { label: "Total Plastic Waste (Today)", value: "2,845 kg", helper: "+ 12.6%", icon: Trash2 },
  { label: "Recycling Rate (Today)", value: "58.4%", helper: "+ 6.2%", icon: Recycle },
  { label: "CO2 Reduced (Today)", value: "1.24 ton", helper: "+ 18.3%", icon: BarChart3 },
  { label: "Circularity Score", value: "72 /100", helper: "+ 5.8 pts", icon: Clock },
];

const viewModeLabels: Record<string, string> = {
  waste: "Waste Overview layer is active.",
  flow: "Waste Flow layer is active.",
  hotspots: "Hotspot analysis layer is active.",
};

const timePresets = [
  { label: "Real-time", time: "10:30", progress: 60 },
  { label: "Morning", time: "08:00", progress: 32 },
  { label: "Afternoon", time: "13:00", progress: 68 },
  { label: "Evening", time: "18:00", progress: 82 },
  { label: "Night", time: "22:00", progress: 94 },
];

export function DigitalTwinView() {
  const [viewMode, setViewMode] = React.useState("waste");
  const [compareTime, setCompareTime] = React.useState(false);
  const [activePreset, setActivePreset] = React.useState(timePresets[0]);
  const activePresetIndex = timePresets.findIndex(
    (preset) => preset.label === activePreset.label,
  );

  function advanceTimePreset() {
    const nextPreset = timePresets[(activePresetIndex + 1) % timePresets.length];
    setActivePreset(nextPreset);
  }

  return (
    <AppShell
      activeKey="digital-twin"
      subtitle="Interactive 3D visualization of UNSRAT campus for plastic waste monitoring and management."
      timeLabel={`${activePreset.time} ${compareTime ? "Compare" : "Live"}`}
      title="Campus Digital Twin"
    >
      <div className="grid gap-5">
        <section className="grid gap-4 xl:grid-cols-[240px_1fr_190px]">
          <Card className="p-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">View Mode</p>
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="waste">Waste Overview</SelectItem>
                <SelectItem value="flow">Waste Flow</SelectItem>
                <SelectItem value="hotspots">Hotspots</SelectItem>
              </SelectContent>
            </Select>
            <p className="mt-3 text-xs font-medium text-emerald-700">
              {viewModeLabels[viewMode]}
            </p>
          </Card>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {digitalTwinMetrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <Card className="p-4" key={metric.label}>
                  <div className="flex items-center gap-3">
                    <IconBubble className="size-10" icon={Icon} />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-muted-foreground">
                        {metric.label}
                      </p>
                      <p className="mt-1 text-xl font-bold text-slate-950">
                        {metric.value}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-emerald-700">
                        {metric.helper}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <Button
            className="h-full min-h-16"
            onClick={() => setCompareTime((value) => !value)}
            type="button"
            variant={compareTime ? "default" : "outline"}
          >
            <BarChart3 className="size-5" />
            {compareTime ? "Live View" : "Compare Time"}
          </Button>
        </section>

        <MapView variant="digital-twin" />

        <section className="grid gap-5 lg:grid-cols-[1fr_300px]">
          <Card className="p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-950">Time Slider Simulation</p>
                <p className="text-sm text-muted-foreground">
                  Simulate waste distribution at different times
                </p>
              </div>
              <span className="rounded-md bg-emerald-700 px-3 py-1 text-sm font-bold text-white">
                {activePreset.time}
              </span>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <Button onClick={advanceTimePreset} size="icon" type="button">
                <Clock className="size-4" />
              </Button>
              <div className="h-2 flex-1 rounded-full bg-slate-200">
                <div
                  className="relative h-2 rounded-full bg-emerald-700"
                  style={{ width: `${activePreset.progress}%` }}
                >
                  <span className="absolute right-0 top-1/2 size-5 -translate-y-1/2 rounded-full border-4 border-white bg-emerald-700 shadow" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <p className="font-bold text-slate-950">Time Presets</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {["Real-time", "Morning", "Afternoon", "Evening", "Night"].map((item) => (
                <Button
                  className={cn(item !== activePreset.label && "bg-white")}
                  key={item}
                  onClick={() =>
                    setActivePreset(
                      timePresets.find((preset) => preset.label === item) ??
                        timePresets[0],
                    )
                  }
                  size="sm"
                  type="button"
                  variant={item === activePreset.label ? "default" : "outline"}
                >
                  {item}
                </Button>
              ))}
            </div>
          </Card>
        </section>

        <TipBar>
          Tip: Use layer controls to compare hotspots, waste flow, collection
          points, and recycling centers on the same campus map.
        </TipBar>
      </div>
    </AppShell>
  );
}
