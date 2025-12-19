"use client";

import Link from "next/link";
import * as React from "react";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <AppShell>
      <EmptyState
        title="Something went wrong"
        description="Try again, or go back home."
        action={
          <div className="flex gap-2">
            <Button onClick={() => reset()}>Retry</Button>
            <Button asChild variant="secondary">
              <Link href="/">Home</Link>
            </Button>
          </div>
        }
      />
    </AppShell>
  );
}

