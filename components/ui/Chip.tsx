"use client";

import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export function Chip({
  selected,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "h-9 shrink-0 rounded-full px-4 text-sm font-semibold ring-1 transition",
        selected
          ? "bg-brand-700 text-white ring-brand-700"
          : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50",
        className
      )}
      {...props}
    />
  );
}

