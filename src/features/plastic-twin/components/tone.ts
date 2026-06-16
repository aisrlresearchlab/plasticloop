import type { MetricTone } from "@/features/plastic-twin/types";

export const toneStyles: Record<
  MetricTone,
  {
    icon: string;
    iconSoft: string;
    text: string;
    bg: string;
    border: string;
    chart: string;
  }
> = {
  green: {
    icon: "text-emerald-700",
    iconSoft: "bg-emerald-50 text-emerald-700",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    chart: "#109252",
  },
  blue: {
    icon: "text-blue-700",
    iconSoft: "bg-blue-50 text-blue-700",
    text: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    chart: "#2563eb",
  },
  amber: {
    icon: "text-amber-700",
    iconSoft: "bg-amber-50 text-amber-700",
    text: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    chart: "#f59e0b",
  },
  purple: {
    icon: "text-violet-700",
    iconSoft: "bg-violet-50 text-violet-700",
    text: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
    chart: "#7c3aed",
  },
  red: {
    icon: "text-red-700",
    iconSoft: "bg-red-50 text-red-700",
    text: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    chart: "#dc2626",
  },
  slate: {
    icon: "text-slate-700",
    iconSoft: "bg-slate-100 text-slate-700",
    text: "text-slate-700",
    bg: "bg-slate-50",
    border: "border-slate-200",
    chart: "#64748b",
  },
};
