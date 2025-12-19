import type { ReactNode } from "react";

import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/cn";

export function AppShell({
  children,
  className,
  hideNav
}: {
  children: ReactNode;
  className?: string;
  hideNav?: boolean;
}) {
  return (
    <div className={cn("min-h-screen pb-20", className)}>
      <Header />
      <main className="mx-auto w-full max-w-xl px-4 pb-6 pt-4">{children}</main>
      {!hideNav ? <BottomNav /> : null}
    </div>
  );
}

