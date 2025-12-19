"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

export type TabItem = { key: string; label: string };

export function Tabs({
  items,
  value,
  onValueChange
}: {
  items: TabItem[];
  value: string;
  onValueChange: (key: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map((t) => {
        const active = t.key === value;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onValueChange(t.key)}
            className={cn(
              "h-9 shrink-0 rounded-full px-4 text-sm font-extrabold ring-1 transition",
              active
                ? "bg-slate-900 text-white ring-slate-900"
                : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
            )}
            aria-label={t.label}
            aria-current={active ? "true" : undefined}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

