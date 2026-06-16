import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export function CheckboxVisual({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "grid size-4 shrink-0 place-items-center rounded border text-white",
        checked ? "border-emerald-600 bg-emerald-600" : "border-slate-300 bg-white",
      )}
    >
      {checked ? <Check className="size-3" /> : null}
    </span>
  );
}
