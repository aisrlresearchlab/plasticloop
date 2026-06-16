import {
  Archive,
  BarChart3,
  Bell,
  Brain,
  CalendarDays,
  CircleDollarSign,
  Cloud,
  Database,
  Download,
  Eye,
  FileBarChart,
  FlaskConical,
  Folder,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  Leaf,
  LineChart,
  Map,
  MapPin,
  Megaphone,
  PackageCheck,
  Recycle,
  Route,
  Search,
  Settings,
  Shield,
  Sparkles,
  Target,
  Trash2,
  Truck,
  UploadCloud,
  Utensils,
  Users,
} from "lucide-react";

import type {
  ActivityItem,
  DonutSegment,
  HorizontalMetric,
  MapLocation,
  NavigationItem,
  Recommendation,
  StatMetric,
  TrendPoint,
  WasteRecord,
} from "@/features/plastic-twin/types";

export const appNavigation: NavigationItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "digital-twin",
    label: "Digital Twin",
    href: "/digital-twin",
    icon: Map,
    children: [
      { label: "Campus Map", href: "/digital-twin" },
      { label: "Waste Flow", href: "/digital-twin#waste-flow" },
      { label: "Hotspots", href: "/digital-twin#hotspots" },
    ],
  },
  {
    key: "waste-prediction",
    label: "Waste Prediction",
    href: "/waste-prediction",
    icon: FlaskConical,
  },
  {
    key: "ai-recognition",
    label: "AI Waste Recognition",
    href: "/ai-recognition",
    icon: Brain,
  },
  {
    key: "scenario-simulation",
    label: "Scenario Simulation",
    href: "/scenario-simulation",
    icon: Route,
  },
  {
    key: "circularity-assessment",
    label: "Circularity Assessment",
    href: "/circularity-assessment",
    icon: Gauge,
  },
  {
    key: "explainable-ai",
    label: "Explainable AI",
    href: "/explainable-ai",
    icon: Search,
  },
  {
    key: "reports",
    label: "Reports",
    href: "/reports",
    icon: FileBarChart,
  },
  {
    key: "data-management",
    label: "Data Management",
    href: "/data-management",
    icon: Database,
    children: [
      { label: "Waste Records", href: "/data-management" },
      { label: "Upload Datasets", href: "/data-management#upload" },
      { label: "Training Datasets", href: "/data-management#training" },
      { label: "Import / Export CSV", href: "/data-management#csv" },
      { label: "Sensor Integration", href: "/data-management#sensors" },
    ],
  },
  {
    key: "users",
    label: "Users & Roles",
    href: "/dashboard#users",
    icon: Users,
  },
  {
    key: "settings",
    label: "Settings",
    href: "/dashboard#settings",
    icon: Settings,
  },
];

export const dashboardStats: StatMetric[] = [
  {
    label: "Total Plastic Waste Today",
    value: "512",
    unit: "kg",
    trend: "12.5% vs yesterday",
    tone: "green",
    icon: Trash2,
  },
  {
    label: "Recycling Rate",
    value: "34.6",
    unit: "%",
    trend: "4.2% vs last week",
    tone: "green",
    icon: Recycle,
  },
  {
    label: "Circularity Score",
    value: "72",
    unit: "/100",
    helper: "Good",
    tone: "green",
    icon: Gauge,
  },
  {
    label: "CO2 Reduction",
    value: "1.25",
    unit: "ton",
    trend: "11% vs last week",
    tone: "blue",
    icon: Cloud,
  },
  {
    label: "Landfill Avoided",
    value: "890",
    unit: "kg",
    trend: "10% vs last week",
    tone: "green",
    icon: Truck,
  },
];

export const wasteTrend: TrendPoint[] = [
  { label: "May 6", value: 300 },
  { label: "May 7", value: 620 },
  { label: "May 8", value: 710 },
  { label: "May 9", value: 540 },
  { label: "May 10", value: 670 },
  { label: "May 11", value: 610 },
  { label: "May 12", value: 820 },
];

export const weeklyPredictionTrend: TrendPoint[] = [
  { label: "Mon", value: 120 },
  { label: "Tue", value: 150 },
  { label: "Wed", value: 180 },
  { label: "Thu", value: 210 },
  { label: "Fri", value: 250 },
  { label: "Sat", value: 190 },
  { label: "Sun", value: 145 },
];

export const monthlyCircularityTrend: TrendPoint[] = [
  { label: "Dec 2023", value: 58, secondary: 34, tertiary: 11, quaternary: 68 },
  { label: "Jan 2024", value: 64, secondary: 39, tertiary: 14, quaternary: 69 },
  { label: "Feb 2024", value: 67, secondary: 48, tertiary: 18, quaternary: 72 },
  { label: "Mar 2024", value: 72, secondary: 51, tertiary: 17, quaternary: 76 },
  { label: "Apr 2024", value: 70, secondary: 49, tertiary: 21, quaternary: 73 },
  { label: "May 2024", value: 68, secondary: 47, tertiary: 18, quaternary: 72 },
];

export const simulationTrend: TrendPoint[] = [
  { label: "Week 1", value: 220, secondary: 430 },
  { label: "Week 2", value: 340, secondary: 700 },
  { label: "Week 3", value: 410, secondary: 820 },
  { label: "Week 4", value: 590, secondary: 960 },
  { label: "Week 5", value: 640, secondary: 1120 },
  { label: "Week 6", value: 830, secondary: 1260 },
  { label: "Week 7", value: 760, secondary: 1180 },
  { label: "Week 8", value: 960, secondary: 1350 },
];

export const reportPerformanceTrend: TrendPoint[] = [
  { label: "Apr 28", value: 680, secondary: 62 },
  { label: "Apr 29", value: 720, secondary: 67 },
  { label: "Apr 30", value: 830, secondary: 66 },
  { label: "May 1", value: 910, secondary: 73 },
  { label: "May 2", value: 470, secondary: 70 },
  { label: "May 3", value: 850, secondary: 67 },
  { label: "May 4", value: 900, secondary: 72 },
  { label: "May 5", value: 620, secondary: 74 },
  { label: "May 6", value: 720, secondary: 71 },
  { label: "May 7", value: 820, secondary: 69 },
  { label: "May 8", value: 860, secondary: 79 },
  { label: "May 9", value: 850, secondary: 73 },
  { label: "May 10", value: 790, secondary: 71 },
  { label: "May 12", value: 700, secondary: 74 },
];

export const circularityScoreTrend: TrendPoint[] = [
  { label: "Apr 14", value: 62 },
  { label: "Apr 21", value: 66 },
  { label: "Apr 28", value: 67 },
  { label: "May 5", value: 72 },
  { label: "May 12", value: 72 },
];

export const locationWasteSegments: DonutSegment[] = [
  { name: "Canteen Area", value: 38, color: "#16a34a", meta: "194 kg" },
  { name: "Dormitory", value: 24, color: "#2563eb", meta: "123 kg" },
  { name: "Academic Building", value: 18, color: "#f59e0b", meta: "92 kg" },
  { name: "Library", value: 10, color: "#7c3aed", meta: "51 kg" },
  { name: "Faculty Building", value: 7, color: "#0ea5e9", meta: "36 kg" },
  { name: "Others", value: 3, color: "#94a3b8", meta: "16 kg" },
];

export const plasticTypeSegments: DonutSegment[] = [
  { name: "PET", value: 34, color: "#16a34a", meta: "174 kg" },
  { name: "PP", value: 24, color: "#2563eb", meta: "143 kg" },
  { name: "HDPE", value: 16, color: "#f59e0b", meta: "82 kg" },
  { name: "LDPE", value: 12, color: "#7c3aed", meta: "61 kg" },
  { name: "PS", value: 6, color: "#0ea5e9", meta: "31 kg" },
  { name: "Others", value: 4, color: "#94a3b8", meta: "21 kg" },
];

export const reportWasteSegments: DonutSegment[] = [
  { name: "PET", value: 42.4, color: "#2563eb", meta: "1,205 kg" },
  { name: "HDPE", value: 22.7, color: "#16a34a", meta: "645 kg" },
  { name: "PP", value: 18, color: "#f59e0b", meta: "512 kg" },
  { name: "LDPE", value: 10.5, color: "#7c3aed", meta: "298 kg" },
  { name: "Others", value: 6.4, color: "#94a3b8", meta: "185 kg" },
];

export const dataTrainingSegments: DonutSegment[] = [
  { name: "Waste Classification", value: 5, color: "#16a34a", meta: "33.3%" },
  { name: "Waste Prediction", value: 4, color: "#2563eb", meta: "26.7%" },
  { name: "Circularity Scoring", value: 3, color: "#7c3aed", meta: "20.0%" },
  { name: "Anomaly Detection", value: 2, color: "#f59e0b", meta: "13.3%" },
  { name: "Other Models", value: 1, color: "#94a3b8", meta: "6.7%" },
];

export const recentActivity: ActivityItem[] = [
  {
    title: "Waste reported at Canteen Area",
    description: "PET Bottle - 2.5 kg",
    time: "10:30 AM",
    tone: "green",
    icon: Trash2,
  },
  {
    title: "AI recognition completed",
    description: "Plastic type: PP (Confidence: 93.6%)",
    time: "10:15 AM",
    tone: "green",
    icon: Brain,
  },
  {
    title: "Waste collected from Dormitory",
    description: "Total: 18.6 kg",
    time: "09:45 AM",
    tone: "blue",
    icon: Archive,
  },
  {
    title: "New recycling data updated",
    description: "Recycling rate: 34.6%",
    time: "09:20 AM",
    tone: "amber",
    icon: Recycle,
  },
];

export const campusLocations: MapLocation[] = [
  {
    id: "rectorate",
    name: "Rectorate Building",
    shortName: "Rectorate",
    position: [-1.456, 124.826],
    wasteKg: 32,
    level: "high",
    type: "hotspot",
    recyclingRate: 49,
  },
  {
    id: "engineering",
    name: "Engineering Faculty",
    shortName: "Engineering",
    position: [-1.459, 124.831],
    wasteKg: 45,
    level: "high",
    type: "hotspot",
    recyclingRate: 52.3,
  },
  {
    id: "canteen",
    name: "Canteen Area",
    shortName: "Canteen",
    position: [-1.4576, 124.8227],
    wasteKg: 41,
    level: "high",
    type: "hotspot",
    recyclingRate: 47,
  },
  {
    id: "dormitory",
    name: "Dormitory",
    shortName: "Dormitory",
    position: [-1.4542, 124.8289],
    wasteKg: 28,
    level: "medium",
    type: "hotspot",
    recyclingRate: 39,
  },
  {
    id: "library",
    name: "Campus Library",
    shortName: "Library",
    position: [-1.4608, 124.8249],
    wasteKg: 12,
    level: "low",
    type: "collection",
    recyclingRate: 61,
  },
  {
    id: "auditorium",
    name: "Auditorium",
    shortName: "Auditorium",
    position: [-1.4569, 124.8253],
    wasteKg: 18,
    level: "medium",
    type: "hotspot",
    recyclingRate: 43,
  },
  {
    id: "agriculture",
    name: "Faculty of Agriculture",
    shortName: "Agriculture",
    position: [-1.4557, 124.8244],
    wasteKg: 19,
    level: "medium",
    type: "collection",
    recyclingRate: 57,
  },
  {
    id: "social",
    name: "Faculty of Social and Political Sciences",
    shortName: "Social Sciences",
    position: [-1.4617, 124.8266],
    wasteKg: 38,
    level: "high",
    type: "hotspot",
    recyclingRate: 46,
  },
  {
    id: "medicine",
    name: "Medicine Faculty",
    shortName: "Medicine",
    position: [-1.4579, 124.8292],
    wasteKg: 22,
    level: "medium",
    type: "collection",
    recyclingRate: 55,
  },
  {
    id: "recycling",
    name: "Recycling Center",
    shortName: "Recycling",
    position: [-1.4627, 124.8222],
    wasteKg: 8,
    level: "low",
    type: "recycling",
    recyclingRate: 76,
  },
];

export const aiRecentScans = [
  {
    name: "PET Bottle",
    score: "94.8%",
    date: "May 12, 2024",
    time: "10:24 AM",
    tone: "green" as const,
  },
  {
    name: "PP Cup",
    score: "92.1%",
    date: "May 12, 2024",
    time: "10:15 AM",
    tone: "blue" as const,
  },
  {
    name: "Snack Wrapper",
    score: "86.3%",
    date: "May 12, 2024",
    time: "09:58 AM",
    tone: "amber" as const,
  },
  {
    name: "Straw (PP)",
    score: "90.7%",
    date: "May 12, 2024",
    time: "09:45 AM",
    tone: "slate" as const,
  },
];

export const predictionRecommendations: Recommendation[] = [
  {
    title: "Increase Waste Collection Frequency",
    description:
      "Increase collection frequency in Canteen Area and Dormitory during high waste days.",
    icon: Trash2,
    tone: "green",
  },
  {
    title: "Prepare More Recycling Bins",
    description:
      "Add more recycling bins in Canteen Area and Auditorium for expected traffic.",
    icon: Users,
    tone: "green",
  },
  {
    title: "Awareness Campaign",
    description:
      "Run a short campaign before Sports Day and Food Festival to improve sorting.",
    icon: Megaphone,
    tone: "blue",
  },
  {
    title: "Event Waste Management Plan",
    description:
      "Implement a dedicated collection plan including sorting stations.",
    icon: CalendarDays,
    tone: "slate",
  },
];

export const factorImpact: HorizontalMetric[] = [
  { label: "Event Schedule (Sports Day, Food Festival)", value: 40, displayValue: "+40%" },
  { label: "Student Activity Level (High)", value: 30, displayValue: "+30%" },
  { label: "Weather Condition (Sunny)", value: 15, displayValue: "+15%" },
  { label: "Day of Week (Weekend Effect)", value: 10, displayValue: "+10%" },
  { label: "Others", value: 5, displayValue: "+5%", tone: "slate" },
];

export const scenarioOptions = [
  {
    title: "Add Refill Station",
    description: "Add more water refill stations across campus.",
    selected: true,
    icon: PackageCheck,
  },
  {
    title: "Ban Single-use Plastics",
    description: "Implement a ban on single-use plastic items.",
    selected: true,
    icon: Shield,
  },
  {
    title: "Increase Recycling Rate",
    description: "Improve recycling rate through awareness and facilities.",
    selected: true,
    icon: Recycle,
  },
  {
    title: "Add Waste Collection Point",
    description: "Add collection points in high-traffic areas.",
    selected: false,
    icon: Trash2,
  },
  {
    title: "Improve Sorting Accuracy",
    description: "Enhance sorting accuracy using smart bins and training.",
    selected: true,
    icon: Target,
  },
];

export const scenarioAreaImpact: HorizontalMetric[] = [
  { label: "Canteen Area", value: 98, displayValue: "-98 kg (-28%)" },
  { label: "Dormitory", value: 76, displayValue: "-76 kg (-25%)" },
  { label: "Auditorium", value: 54, displayValue: "-54 kg (-23%)" },
  { label: "Library", value: 42, displayValue: "-42 kg (-21%)" },
  { label: "Engineering Building", value: 36, displayValue: "-36 kg (-19%)" },
];

export const circularityLocationScores: HorizontalMetric[] = [
  { label: "Canteen Area", value: 78, displayValue: "78/100" },
  { label: "Academic Buildings", value: 73, displayValue: "73/100" },
  { label: "Dormitory", value: 65, displayValue: "65/100" },
  { label: "Sports Complex", value: 62, displayValue: "62/100" },
  { label: "Library", value: 58, displayValue: "58/100" },
];

export const shapImpacts: HorizontalMetric[] = [
  {
    label: "Campus Event (Sports Day)",
    value: 78.6,
    displayValue: "+78.6 kg",
    tone: "red",
  },
  {
    label: "Cafeteria Activity (High)",
    value: 52.3,
    displayValue: "+52.3 kg",
    tone: "red",
  },
  {
    label: "Low Recycling Participation",
    value: 34.1,
    displayValue: "+34.1 kg",
    tone: "red",
  },
  {
    label: "Lack of Refill Stations",
    value: 21.7,
    displayValue: "+21.7 kg",
    tone: "red",
  },
  {
    label: "Temperature (Higher)",
    value: 12.4,
    displayValue: "-12.4 kg",
    tone: "blue",
  },
  {
    label: "Rainfall (Moderate)",
    value: 7.8,
    displayValue: "-7.8 kg",
    tone: "blue",
  },
];

export const reportLocationWaste: HorizontalMetric[] = [
  { label: "Canteen Area", value: 100, displayValue: "682 kg (24.0%)" },
  { label: "Dormitory", value: 79, displayValue: "541 kg (19.0%)" },
  { label: "Auditorium", value: 64, displayValue: "438 kg (15.4%)" },
  { label: "Library", value: 60, displayValue: "412 kg (14.5%)" },
  { label: "Engineering Building", value: 58, displayValue: "398 kg (14.0%)" },
];

export const dataManagementStats: StatMetric[] = [
  {
    label: "Total Waste Records",
    value: "12,458",
    helper: "12.6% vs last 7 days",
    tone: "green",
    icon: Trash2,
  },
  {
    label: "Datasets",
    value: "28",
    helper: "3 new datasets",
    tone: "blue",
    icon: Folder,
  },
  {
    label: "Training Datasets",
    value: "15",
    helper: "2 updated",
    tone: "purple",
    icon: Brain,
  },
  {
    label: "Connected Sensors",
    value: "42",
    helper: "2 offline",
    tone: "amber",
    icon: Bell,
  },
  {
    label: "Data Storage Used",
    value: "64.8",
    unit: "GB",
    helper: "of 150 GB used",
    tone: "slate",
    icon: Database,
  },
];

export const wasteRecords: WasteRecord[] = [
  {
    id: "WR-12458",
    dateTime: "May 18, 2024 09:15 AM",
    location: "Cafeteria Area",
    plasticType: "PET",
    weightKg: 12.45,
    source: "Manual Entry",
    uploadedBy: "John Doe",
  },
  {
    id: "WR-12457",
    dateTime: "May 18, 2024 08:45 AM",
    location: "Library",
    plasticType: "HDPE",
    weightKg: 7.3,
    source: "Smart Bin S12",
    uploadedBy: "System",
  },
  {
    id: "WR-12456",
    dateTime: "May 18, 2024 08:30 AM",
    location: "Engineering Bldg.",
    plasticType: "PP",
    weightKg: 5.2,
    source: "Manual Entry",
    uploadedBy: "Jane Smith",
  },
  {
    id: "WR-12455",
    dateTime: "May 17, 2024 05:10 PM",
    location: "Sports Complex",
    plasticType: "LDPE",
    weightKg: 3.8,
    source: "Smart Bin S05",
    uploadedBy: "System",
  },
  {
    id: "WR-12454",
    dateTime: "May 17, 2024 04:45 PM",
    location: "Dormitory Area",
    plasticType: "PET",
    weightKg: 6.1,
    source: "Manual Entry",
    uploadedBy: "Michael Tan",
  },
  {
    id: "WR-12453",
    dateTime: "May 17, 2024 03:20 PM",
    location: "Auditorium",
    plasticType: "Others",
    weightKg: 2.15,
    source: "Smart Bin S08",
    uploadedBy: "System",
  },
  {
    id: "WR-12452",
    dateTime: "May 17, 2024 02:05 PM",
    location: "Faculty of Science",
    plasticType: "HDPE",
    weightKg: 4.75,
    source: "Manual Entry",
    uploadedBy: "Emily Lim",
  },
  {
    id: "WR-12451",
    dateTime: "May 17, 2024 01:30 PM",
    location: "Canteen Area",
    plasticType: "PP",
    weightKg: 9.6,
    source: "Smart Bin S03",
    uploadedBy: "System",
  },
];

export const datasetFiles = [
  {
    name: "unsrat_waste_dataset_2024.csv",
    meta: "2.4 MB - Uploaded: May 17, 2024",
    badge: "Training",
    tone: "purple" as const,
    icon: Download,
  },
  {
    name: "campus_survey_data.xlsx",
    meta: "1.1 MB - Uploaded: May 16, 2024",
    badge: "Survey",
    tone: "blue" as const,
    icon: Download,
  },
  {
    name: "sensor_readings_may.csv",
    meta: "5.6 MB - Uploaded: May 15, 2024",
    badge: "Sensor",
    tone: "green" as const,
    icon: Download,
  },
  {
    name: "event_calendar_2024.csv",
    meta: "0.8 MB - Uploaded: May 14, 2024",
    badge: "Event",
    tone: "amber" as const,
    icon: Download,
  },
];

export const reportRecommendations: Recommendation[] = [
  {
    title: "Improve Recycling Participation",
    description: "Increase awareness campaigns and incentives to boost participation.",
    icon: Users,
    tone: "green",
  },
  {
    title: "Add More Refill Stations",
    description: "Install more refill stations in high-traffic areas.",
    icon: PackageCheck,
    tone: "green",
  },
  {
    title: "Optimize Waste Collection",
    description: "Increase collection frequency in canteen and dormitory during peaks.",
    icon: Trash2,
    tone: "green",
  },
  {
    title: "Improve Sorting Accuracy",
    description: "Provide more bin training and smart labels to reduce contamination.",
    icon: Target,
    tone: "green",
  },
];

export const loginFeatures = [
  {
    title: "Data-Driven Decisions",
    description: "Leverage AI and analytics to make smarter waste decisions.",
    icon: Leaf,
  },
  {
    title: "Digital Twin Technology",
    description: "Visualize and simulate campus waste systems in a virtual environment.",
    icon: GraduationCap,
  },
  {
    title: "Circularity Impact",
    description: "Measure, evaluate, and improve campus sustainability.",
    icon: Recycle,
  },
];

export const recognitionDetails = [
  { label: "Plastic Type", value: "PET Bottle", icon: PackageCheck, tone: "blue" as const },
  {
    label: "Material",
    value: "Polyethylene Terephthalate",
    icon: Archive,
    tone: "purple" as const,
  },
  { label: "Confidence", value: "94.8%", icon: LineChart, tone: "green" as const },
  { label: "Recyclability", value: "High", icon: Recycle, tone: "green" as const },
  { label: "Estimated Purity", value: "Clean", icon: Sparkles, tone: "green" as const },
];

export const explainabilityReasons = [
  {
    title: "Campus Event",
    description: "Sports Day and Food Festival increased footfall and consumption.",
    value: "+78.6 kg",
    icon: CalendarDays,
    tone: "red" as const,
  },
  {
    title: "High Cafeteria Activity",
    description: "More students on campus led to higher beverage consumption.",
    value: "+52.3 kg",
    icon: Utensils,
    tone: "amber" as const,
  },
  {
    title: "Low Recycling Participation",
    description: "Recycling rate dropped by 8.2% compared to last week.",
    value: "+34.1 kg",
    icon: Recycle,
    tone: "purple" as const,
  },
  {
    title: "Lack of Refill Stations",
    description: "Limited refill access increased single-use plastic bottles.",
    value: "+21.7 kg",
    icon: PackageCheck,
    tone: "blue" as const,
  },
];

export const layoutActions = {
  dateIcon: CalendarDays,
  notificationIcon: Bell,
  profileIcon: Users,
  exportIcon: Download,
  viewIcon: Eye,
  uploadIcon: UploadCloud,
  trashIcon: Trash2,
  recycleIcon: Recycle,
  routeIcon: Route,
  targetIcon: Target,
  chartIcon: BarChart3,
  circleCostIcon: CircleDollarSign,
  mapPinIcon: MapPin,
};
