import { Leaf } from "lucide-react";

import { cn } from "@/lib/utils";

type BrandProps = {
  compact?: boolean;
  inverted?: boolean;
};

export function Brand({ compact = false, inverted = false }: BrandProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "grid size-12 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-sm",
          compact && "size-10",
        )}
      >
        <Leaf className={cn("size-7", compact && "size-6")} strokeWidth={2.6} />
      </div>
      <div className={cn(compact && "hidden sm:block")}>
        <p
          className={cn(
            "text-xl font-bold leading-tight tracking-normal",
            inverted ? "text-white" : "text-slate-950",
            compact && "text-lg",
          )}
        >
          PlasticTwin-Campus
        </p>
        <p
          className={cn(
            "text-sm font-medium leading-tight",
            inverted ? "text-emerald-100" : "text-slate-600",
            compact && "text-xs",
          )}
        >
          Predict. Simulate. Circularize.
        </p>
      </div>
    </div>
  );
}
