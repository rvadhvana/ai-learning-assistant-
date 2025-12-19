"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { destinations } from "@/data/destinations";
import { useBookingsStore } from "@/features/bookings/useBookingsStore";
import { formatUsd } from "@/lib/format";

export default function Page() {
  const params = useSearchParams();
  const id = params.get("id");

  const getBooking = useBookingsStore((s) => s.getBooking);
  const booking = id ? getBooking(id) : undefined;

  if (!id || !booking) {
    return (
      <AppShell>
        <EmptyState
          title="Booking not found"
          description="That confirmation link is invalid (or the booking was cleared)."
          action={
            <Button asChild>
              <Link href="/bookings">Back to bookings</Link>
            </Button>
          }
        />
      </AppShell>
    );
  }

  const d = destinations.find((x) => x.id === booking.destinationId);

  return (
    <AppShell>
      <div className="space-y-4">
        <div>
          <div className="text-lg font-extrabold text-slate-900">Booking confirmed</div>
          <div className="text-sm text-slate-600">Your trip is saved in Bookings.</div>
        </div>

        <Card className="space-y-2 p-5">
          <div className="text-sm font-extrabold text-slate-900">{booking.title}</div>
          <div className="text-sm text-slate-600">
            {booking.type} · {d ? `${d.name}, ${d.country}` : "Destination"}
          </div>
          <div className="text-sm text-slate-600">Travelers: {booking.travelers}</div>
          <div className="text-sm text-slate-600">Start: {booking.startDate}</div>
          {booking.endDate ? <div className="text-sm text-slate-600">End: {booking.endDate}</div> : null}
          <div className="pt-2 text-base font-extrabold text-slate-900">{formatUsd(booking.totalUsd)}</div>
          <div className="text-xs text-slate-500">Booking ID: {booking.id}</div>
        </Card>

        <div className="grid gap-3">
          <Button asChild fullWidth>
            <Link href="/bookings">View all bookings</Link>
          </Button>
          <Button asChild variant="secondary" fullWidth>
            <Link href="/">Plan another trip</Link>
          </Button>
        </div>
      </div>
    </AppShell>
  );
}

