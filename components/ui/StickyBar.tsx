"use client";

import type { ReactNode } from "react";

export function StickyBar({ children }: { children: ReactNode }) {
  return (
    <div className="fixed bottom-16 left-0 right-0 z-30">
      <div className="mx-auto w-full max-w-xl px-4">
        <div className="rounded-2xl bg-white p-3 shadow-soft ring-1 ring-slate-200/70">
          {children}
        </div>
      </div>
    </div>
  );
}

