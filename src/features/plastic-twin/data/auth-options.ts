import {
  GraduationCap,
  Recycle,
  ShieldCheck,
  Trash2,
  type LucideIcon,
} from "lucide-react";

export type UserRole = "student" | "admin" | "officer" | "researcher";

export type RoleOption = {
  value: UserRole;
  label: string;
  description: string;
  icon: LucideIcon;
};

export const roleOptions: RoleOption[] = [
  {
    value: "student",
    label: "Student",
    description: "Access campus data and report waste",
    icon: GraduationCap,
  },
  {
    value: "admin",
    label: "Admin",
    description: "Manage system, users, and configurations",
    icon: ShieldCheck,
  },
  {
    value: "officer",
    label: "Waste Management Officer",
    description: "Manage waste data and operations",
    icon: Trash2,
  },
  {
    value: "researcher",
    label: "Researcher",
    description: "Access data for research and analysis",
    icon: Recycle,
  },
];
