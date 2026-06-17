"use client";

import * as React from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  Recycle,
  ShieldCheck,
  Sprout,
  Trash2,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const roleOptions = [
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

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [role, setRole] = React.useState("student");
  const selectedRole =
    roleOptions.find((roleOption) => roleOption.value === role) ?? roleOptions[0];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form className="w-full max-w-xl" onSubmit={handleSubmit}>
      <div className="mb-8 flex items-center gap-5">
        <div className="grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-700">
          <Sprout className="size-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-normal text-slate-950">
            Login to Your Account
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Please enter your credentials to continue
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-12 pl-12"
              id="email"
              placeholder="Enter your email address"
              type="email"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-12 pl-12 pr-12"
              id="password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
            />
            <button
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              onClick={() => setShowPassword((value) => !value)}
              type="button"
            >
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800">Role</label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="h-12 border-emerald-400">
              <div className="flex items-center gap-3">
                <Users className="size-5 text-muted-foreground" />
                <SelectValue placeholder="Select your role">
                  {selectedRole.label}
                </SelectValue>
              </div>
            </SelectTrigger>
            <SelectContent className="w-[var(--radix-select-trigger-width)] p-0">
              {roleOptions.map((roleOption) => {
                const Icon = roleOption.icon;
                const selected = roleOption.value === role;

                return (
                  <SelectItem
                    className={cn(
                      "rounded-none py-3 pl-3 pr-4 focus:bg-emerald-50",
                      selected && "bg-emerald-50",
                    )}
                    key={roleOption.value}
                    value={roleOption.value}
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                        <Icon className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-slate-900">
                          {roleOption.label}
                        </span>
                        <span className="block whitespace-normal text-xs text-muted-foreground">
                          {roleOption.description}
                        </span>
                      </span>
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <Button className="h-12 w-full text-base" type="submit">
          Login
          <ArrowRight className="ml-auto size-5" />
        </Button>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          <span>or</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <p className="text-center text-sm font-medium text-slate-700">
          Don&apos;t have an account?{" "}
          <a className="font-bold text-emerald-700" href="/dashboard">
            Register here
          </a>
        </p>
      </div>
    </form>
  );
}
