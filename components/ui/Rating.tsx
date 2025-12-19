import { Star } from "lucide-react";

import { cn } from "@/lib/cn";

export function Rating({
  value,
  count,
  className
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1 text-sm", className)} aria-label={`Rating ${value}`}>
      <Star className="size-4 fill-cta-500 text-cta-500" aria-hidden />
      <span className="font-semibold text-slate-900">{value.toFixed(1)}</span>
      {typeof count === "number" ? <span className="text-slate-500">({count})</span> : null}
    </div>
  );
}

