"use client";

import Link from "next/link";

import { DestinationCard } from "@/components/destinations/DestinationCard";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { destinations } from "@/data/destinations";
import { useWishlistStore } from "@/features/wishlist/useWishlistStore";

export default function Page() {
  const ids = useWishlistStore((s) => s.destinationIds);
  const toggle = useWishlistStore((s) => s.toggleDestination);

  const saved = destinations.filter((d) => ids.includes(d.id));

  return (
    <AppShell>
      <div className="space-y-4">
        <div>
          <div className="text-lg font-extrabold text-slate-900">Wishlist</div>
          <div className="text-sm text-slate-600">Saved destinations for later.</div>
        </div>

        {saved.length ? (
          <div className="grid grid-cols-1 gap-4">
            {saved.map((d) => (
              <DestinationCard
                key={d.id}
                destination={d}
                saved
                onToggleSave={(id) => toggle(id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No saved trips yet"
            description="Tap the heart on a destination to save it here."
            action={
              <Button asChild>
                <Link href="/">Browse destinations</Link>
              </Button>
            }
          />
        )}
      </div>
    </AppShell>
  );
}

