"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sprout,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage("Login successful. Redirecting to dashboard...");
    router.push("/dashboard");
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
              required
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
              required
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

        <Button className="h-12 w-full text-base" type="submit">
          Login
          <ArrowRight className="ml-auto size-5" />
        </Button>
        {statusMessage ? (
          <p className="rounded-md bg-emerald-50 px-3 py-2 text-center text-xs font-medium text-emerald-700">
            {statusMessage}
          </p>
        ) : null}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          <span>or</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <p className="text-center text-sm font-medium text-slate-700">
          Don&apos;t have an account?{" "}
          <Link className="font-bold text-emerald-700" href="/sign-up">
            Register here
          </Link>
        </p>
      </div>
    </form>
  );
}
