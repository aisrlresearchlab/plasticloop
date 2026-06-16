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

export function DigitalTwinView() {
  return (
    <AppShell
      activeKey="digital-twin"
      subtitle="Interactive 3D visualization of UNSRAT campus for plastic waste monitoring and management."
      timeLabel="10:30 AM"
      title="Campus Digital Twin"
    >
      <div className="grid gap-5">
        <section className="grid gap-4 xl:grid-cols-[240px_1fr_190px]">
          <Card className="p-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">View Mode</p>
            <Select defaultValue="waste">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="waste">Waste Overview</SelectItem>
                <SelectItem value="flow">Waste Flow</SelectItem>
                <SelectItem value="hotspots">Hotspots</SelectItem>
              </SelectContent>
            </Select>
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

          <Button className="h-full min-h-16" variant="outline">
            <BarChart3 className="size-5" />
            Compare Time
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
                10:30
              </span>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <Button size="icon">
                <Clock className="size-4" />
              </Button>
              <div className="h-2 flex-1 rounded-full bg-slate-200">
                <div className="relative h-2 w-3/5 rounded-full bg-emerald-700">
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
                  className={cn(item !== "Real-time" && "bg-white")}
                  key={item}
                  size="sm"
                  variant={item === "Real-time" ? "default" : "outline"}
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
