"use client";

import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";
import { campusLocations } from "@/features/plastic-twin/data/plastic-twin-data";
import type { MapLocation } from "@/features/plastic-twin/types";
import { cn } from "@/lib/utils";

const InteractiveCampusMap = dynamic(
  () =>
    import("@/features/plastic-twin/components/interactive-campus-map").then(
      (module) => module.InteractiveCampusMap,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-full min-h-80 w-full rounded-lg" />,
  },
);

export type MapVariant = "dashboard" | "prediction" | "digital-twin";

type MapViewProps = {
  variant?: MapVariant;
  locations?: MapLocation[];
  className?: string;
};

export function MapView({
  variant = "dashboard",
  locations = campusLocations,
  className,
}: MapViewProps) {
  return (
    <div
      className={cn(
        "relative min-h-[360px] overflow-hidden rounded-lg border bg-slate-100",
        variant === "digital-twin" && "min-h-[640px]",
        variant === "prediction" && "min-h-[320px]",
        className,
      )}
    >
      <InteractiveCampusMap locations={locations} variant={variant} />
    </div>
  );
}
