"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  DonutSegment,
  MetricTone,
  TrendPoint,
} from "@/features/plastic-twin/types";
import { cn } from "@/lib/utils";

const axisStyle = {
  fontSize: 11,
  fill: "#64748b",
};

function useMounted() {
  return React.useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
}

function ChartPlaceholder({
  height,
  className,
}: {
  height: number;
  className?: string;
}) {
  return (
    <div
      className={cn("w-full animate-pulse rounded-md bg-slate-100", className)}
      style={{ height }}
    />
  );
}

type TrendChartProps = {
  data: TrendPoint[];
  color?: string;
  height?: number;
  showGrid?: boolean;
  compact?: boolean;
  secondaryColor?: string;
  tertiaryColor?: string;
  quaternaryColor?: string;
};

export function MiniSparkline({
  data,
  color = "#109252",
}: {
  data: TrendPoint[];
  color?: string;
}) {
  const mounted = useMounted();

  if (!mounted) {
    return <ChartPlaceholder className="h-10" height={40} />;
  }

  return (
    <div className="h-10 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`spark-${color.replace("#", "")}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.28} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            dataKey="value"
            fill={`url(#spark-${color.replace("#", "")})`}
            isAnimationActive={false}
            stroke={color}
            strokeWidth={2}
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AreaTrendChart({
  data,
  color = "#109252",
  height = 260,
  showGrid = true,
  compact = false,
}: TrendChartProps) {
  const mounted = useMounted();

  if (!mounted) {
    return <ChartPlaceholder height={height} />;
  }

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: compact ? -28 : -12, right: 12, top: 10 }}>
          <defs>
            <linearGradient id={`area-${color.replace("#", "")}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.26} />
              <stop offset="95%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          {showGrid ? <CartesianGrid stroke="#e5eee9" strokeDasharray="3 3" /> : null}
          <XAxis dataKey="label" tick={axisStyle} tickLine={false} />
          <YAxis tick={axisStyle} tickLine={false} width={compact ? 28 : 40} />
          <ChartTooltip
            contentStyle={{
              borderRadius: 8,
              borderColor: "#dfe8e2",
              boxShadow: "0 10px 30px rgb(15 23 42 / 0.12)",
            }}
          />
          <Area
            dataKey="value"
            fill={`url(#area-${color.replace("#", "")})`}
            isAnimationActive={false}
            name="Plastic Waste"
            stroke={color}
            strokeWidth={3}
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MultiLineTrendChart({
  data,
  color = "#109252",
  secondaryColor = "#2563eb",
  tertiaryColor = "#f59e0b",
  quaternaryColor = "#7c3aed",
  height = 260,
}: TrendChartProps) {
  const mounted = useMounted();

  if (!mounted) {
    return <ChartPlaceholder height={height} />;
  }

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: -12, right: 16, top: 10 }}>
          <CartesianGrid stroke="#e5eee9" strokeDasharray="3 3" />
          <XAxis dataKey="label" tick={axisStyle} tickLine={false} />
          <YAxis tick={axisStyle} tickLine={false} width={40} />
          <ChartTooltip
            contentStyle={{
              borderRadius: 8,
              borderColor: "#dfe8e2",
              boxShadow: "0 10px 30px rgb(15 23 42 / 0.12)",
            }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
          <Line
            dataKey="value"
            dot={{ r: 3 }}
            isAnimationActive={false}
            name="Recycling Rate"
            stroke={color}
            strokeWidth={2.5}
            type="monotone"
          />
          <Line
            dataKey="secondary"
            dot={{ r: 3 }}
            isAnimationActive={false}
            name="Reuse Rate"
            stroke={secondaryColor}
            strokeWidth={2.5}
            type="monotone"
          />
          <Line
            dataKey="tertiary"
            dot={{ r: 3 }}
            isAnimationActive={false}
            name="Plastic Reduction"
            stroke={quaternaryColor}
            strokeWidth={2.5}
            type="monotone"
          />
          <Line
            dataKey="quaternary"
            dot={{ r: 3 }}
            isAnimationActive={false}
            name="Landfill Diversion"
            stroke={tertiaryColor}
            strokeWidth={2.5}
            type="monotone"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DonutChartView({
  data,
  centerLabel,
  centerValue,
  height = 220,
  showLegend = true,
}: {
  data: DonutSegment[];
  centerLabel?: string;
  centerValue?: string;
  height?: number;
  showLegend?: boolean;
}) {
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div className={cn("grid items-center gap-4", showLegend && "sm:grid-cols-[minmax(0,1fr)_1fr]")}>
        <ChartPlaceholder height={height} />
        {showLegend ? (
          <div className="space-y-3">
            {data.map((segment) => (
              <div className="flex items-center justify-between gap-3 text-sm" key={segment.name}>
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  <span className="truncate font-medium text-slate-700">{segment.name}</span>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {segment.value}% {segment.meta ? `(${segment.meta})` : ""}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("grid items-center gap-4", showLegend && "sm:grid-cols-[minmax(0,1fr)_1fr]")}>
      <div className="relative" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius="56%"
              isAnimationActive={false}
              nameKey="name"
              outerRadius="82%"
              paddingAngle={1}
            >
              {data.map((entry) => (
                <Cell fill={entry.color} key={entry.name} />
              ))}
            </Pie>
            <ChartTooltip
              contentStyle={{
                borderRadius: 8,
                borderColor: "#dfe8e2",
                boxShadow: "0 10px 30px rgb(15 23 42 / 0.12)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        {centerValue ? (
          <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
            <div>
              <p className="text-2xl font-bold text-slate-950">{centerValue}</p>
              {centerLabel ? (
                <p className="text-xs font-medium text-muted-foreground">{centerLabel}</p>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      {showLegend ? (
        <div className="space-y-3">
          {data.map((segment) => (
            <div className="flex items-center justify-between gap-3 text-sm" key={segment.name}>
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="truncate font-medium text-slate-700">{segment.name}</span>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {segment.value}% {segment.meta ? `(${segment.meta})` : ""}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function CircularGauge({
  value,
  label,
  tone = "green",
  size = "lg",
}: {
  value: number;
  label?: string;
  tone?: MetricTone;
  size?: "sm" | "lg";
}) {
  const color =
    tone === "blue"
      ? "#2563eb"
      : tone === "amber"
        ? "#f59e0b"
        : tone === "purple"
          ? "#7c3aed"
          : tone === "red"
            ? "#dc2626"
            : "#109252";

  return (
    <div
      className={cn(
        "relative grid place-items-center rounded-full",
        size === "lg" ? "size-36" : "size-24",
      )}
      style={{
        background: `conic-gradient(${color} ${value * 3.6}deg, #e5e7eb 0deg)`,
      }}
    >
      <div
        className={cn(
          "grid place-items-center rounded-full bg-white text-center",
          size === "lg" ? "size-28" : "size-20",
        )}
      >
        <div>
          <p className={cn("font-bold text-emerald-700", size === "lg" ? "text-5xl" : "text-2xl")}>
            {value}
          </p>
          {label ? <p className="text-xs font-semibold text-slate-700">{label}</p> : null}
        </div>
      </div>
    </div>
  );
}

export function RadialScoreGauge({
  value,
  label,
}: {
  value: number;
  label?: string;
}) {
  const mounted = useMounted();

  if (!mounted) {
    return <ChartPlaceholder height={128} />;
  }

  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          barSize={14}
          data={[{ name: label ?? "Score", value, fill: "#109252" }]}
          endAngle={0}
          innerRadius="72%"
          outerRadius="100%"
          startAngle={180}
        >
          <RadialBar background dataKey="value" cornerRadius={999} isAnimationActive={false} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BarComparisonChart({
  data,
  height = 210,
}: {
  data: Array<{ label: string; value: number; secondary?: number }>;
  height?: number;
}) {
  const mounted = useMounted();

  if (!mounted) {
    return <ChartPlaceholder height={height} />;
  }

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: -14, right: 10, top: 10 }}>
          <CartesianGrid stroke="#e5eee9" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" tick={axisStyle} tickLine={false} />
          <YAxis tick={axisStyle} tickLine={false} width={42} />
          <ChartTooltip
            contentStyle={{
              borderRadius: 8,
              borderColor: "#dfe8e2",
              boxShadow: "0 10px 30px rgb(15 23 42 / 0.12)",
            }}
          />
          <Bar dataKey="value" fill="#16a34a" isAnimationActive={false} radius={[6, 6, 0, 0]} />
          {data.some((item) => typeof item.secondary === "number") ? (
            <Bar dataKey="secondary" fill="#94a3b8" isAnimationActive={false} radius={[6, 6, 0, 0]} />
          ) : null}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RadarScoreChart({
  data,
}: {
  data: Array<{ label: string; value: number; target: number }>;
}) {
  const mounted = useMounted();

  if (!mounted) {
    return <ChartPlaceholder height={288} />;
  }

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#dfe8e2" />
          <PolarAngleAxis dataKey="label" tick={{ fill: "#334155", fontSize: 11 }} />
          <Radar
            dataKey="value"
            fill="#109252"
            fillOpacity={0.18}
            isAnimationActive={false}
            name="Your Campus"
            stroke="#109252"
            strokeWidth={2}
          />
          <Radar
            dataKey="target"
            fill="#94a3b8"
            fillOpacity={0.08}
            isAnimationActive={false}
            name="Target"
            stroke="#94a3b8"
            strokeDasharray="4 4"
            strokeWidth={1.5}
          />
          <Legend iconType="line" wrapperStyle={{ fontSize: 12 }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
