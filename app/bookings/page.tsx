"use client";

import Link from "next/link";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { destinations } from "@/data/destinations";
import { formatUsd } from "@/lib/format";
import { useBookingsStore } from "@/features/bookings/useBookingsStore";

export default function Page() {
  const bookings = useBookingsStore((s) => s.bookings);

  return (
    <AppShell>
      <div className="space-y-4">
        <div>
          <div className="text-lg font-extrabold text-slate-900">Bookings</div>
          <div className="text-sm text-slate-600">Manage hotels, activities, and transport.</div>
        </div>

        {bookings.length ? (
          <div className="grid gap-3">
            {bookings.map((b) => {
              const d = destinations.find((x) => x.id === b.destinationId);
              return (
                <Card key={b.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{b.title}</div>
                      <div className="mt-1 text-sm text-slate-600">
                        {b.type} · {d ? `${d.name}, ${d.country}` : "Destination"} · {b.travelers}{" "}
                        travelers
                      </div>
                      <div className="mt-1 text-xs text-slate-500">Booking ID: {b.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-slate-900">{formatUsd(b.totalUsd)}</div>
                      <Link
                        href={`/bookings/confirm?id=${encodeURIComponent(b.id)}`}
                        className="mt-1 inline-block text-sm font-extrabold text-brand-800 hover:underline"
                        aria-label="View booking confirmation"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="No bookings yet"
            description="Book a hotel or activity to see it here."
            action={
              <Button asChild>
                <Link href="/">Explore trips</Link>
              </Button>
            }
          />
        )}
      </div>
    </AppShell>
  );
}

