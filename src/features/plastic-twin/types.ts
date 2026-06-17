import type { LucideIcon } from "lucide-react";

export type AppRouteKey =
  | "dashboard"
  | "digital-twin"
  | "waste-prediction"
  | "ai-recognition"
  | "scenario-simulation"
  | "circularity-assessment"
  | "explainable-ai"
  | "reports"
  | "data-management"
  | "users"
  | "settings";

export type MetricTone = "green" | "blue" | "amber" | "purple" | "red" | "slate";

export interface NavigationItem {
  key: AppRouteKey;
  label: string;
  href: string;
  icon: LucideIcon;
  children?: Array<{
    label: string;
    href: string;
  }>;
}

export interface StatMetric {
  label: string;
  value: string;
  unit?: string;
  helper?: string;
  trend?: string;
  tone: MetricTone;
  icon: LucideIcon;
}

export interface TrendPoint {
  label: string;
  value: number;
  secondary?: number;
  tertiary?: number;
  quaternary?: number;
}

export interface DonutSegment {
  name: string;
  value: number;
  color: string;
  meta?: string;
}

export interface HorizontalMetric {
  label: string;
  value: number;
  displayValue: string;
  tone?: MetricTone;
}

export interface ActivityItem {
  title: string;
  description: string;
  time: string;
  tone: MetricTone;
  icon: LucideIcon;
}

export interface MapLocation {
  id: string;
  name: string;
  shortName: string;
  position: [number, number];
  wasteKg: number;
  level: "high" | "medium" | "low";
  type: "building" | "hotspot" | "collection" | "recycling";
  recyclingRate?: number;
}

export interface WasteRecord {
  id: string;
  dateTime: string;
  location: string;
  plasticType: string;
  weightKg: number;
  source: string;
  uploadedBy: string;
}

export interface Recommendation {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: MetricTone;
}

export interface AiRecognitionResult {
  plasticType: string;
  material: string;
  confidence: number;
  recyclability: "Low" | "Medium" | "High";
  estimatedPurity: string;
  suggestedBin: string;
  environmentalImpact: string;
}

export interface AiRecognitionRequest {
  imageBase64: string;
  mimeType: string;
}

export interface ExplainabilityRequest {
  context: string;
}

export interface ExplainabilityResult {
  summary: string;
  recommendations: string[];
}
