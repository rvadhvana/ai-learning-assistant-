"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { DestinationCard } from "@/components/destinations/DestinationCard";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { StickyBar } from "@/components/ui/StickyBar";
import { destinations } from "@/data/destinations";
import { useBookingsStore } from "@/features/bookings/useBookingsStore";
import { generateItinerary } from "@/features/itinerary/generateItinerary";
import { useItineraryStore } from "@/features/itinerary/useItineraryStore";
import { usePreferencesStore } from "@/features/preferences/usePreferencesStore";
import { daysBetween, todayIsoDate } from "@/lib/date";
import { formatUsd } from "@/lib/format";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const destinationSlug = params.get("destination");

  const destination = destinations.find((d) => d.slug === destinationSlug) ?? null;

  const travelType = usePreferencesStore((s) => s.travelType) ?? "Relax";
  const budgetRange = usePreferencesStore((s) => s.budgetRange);

  const itinerary = useItineraryStore((s) => s.itinerary);
  const setItinerary = useItineraryStore((s) => s.setItinerary);
  const updateItemLabel = useItineraryStore((s) => s.updateItemLabel);
  const addItem = useItineraryStore((s) => s.addItem);
  const removeItem = useItineraryStore((s) => s.removeItem);

  const createBooking = useBookingsStore((s) => s.createBooking);

  const [startDate, setStartDate] = React.useState(todayIsoDate());
  const [endDate, setEndDate] = React.useState(todayIsoDate());
  const [travelers, setTravelers] = React.useState(2);
  const [budget, setBudget] = React.useState(50);

  const tripDays = React.useMemo(() => {
    if (!startDate || !endDate) return 1;
    const diff = daysBetween(startDate, endDate);
    return Math.max(1, Math.min(10, diff + 1));
  }, [startDate, endDate]);

  const estimatedTotal = React.useMemo(() => {
    if (!destination) return 0;
    const hotel = destination.hotels[0];
    const nights = Math.max(1, daysBetween(startDate, endDate));
    const base = hotel ? hotel.pricePerNightUsd * nights : destination.startingPriceUsd;
    const multiplier = 0.75 + budget / 100; // cheap approximation for demo
    return Math.round(base * travelers * multiplier);
  }, [destination, startDate, endDate, travelers, budget]);

  if (!destination) {
    return (
      <AppShell>
        <div className="space-y-4">
          <div>
            <div className="text-lg font-extrabold text-slate-900">Trip planner</div>
            <div className="text-sm text-slate-600">Pick a destination to start planning.</div>
          </div>
          <div className="grid gap-4">
            {destinations.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-4 pb-24">
        <div>
          <div className="text-lg font-extrabold text-slate-900">Plan your trip</div>
          <div className="text-sm text-slate-600">
            {destination.name}, {destination.country} · {travelType}
            {budgetRange ? ` · ${budgetRange}` : ""}
          </div>
        </div>

        <Card className="space-y-4 p-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600" htmlFor="start">
                Start date
              </label>
              <Input
                id="start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                aria-label="Start date"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600" htmlFor="end">
                End date
              </label>
              <Input
                id="end"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                aria-label="End date"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600" htmlFor="travelers">
                Travelers
              </label>
              <Input
                id="travelers"
                type="number"
                min={1}
                max={12}
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value || 1))}
                aria-label="Number of travelers"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600" htmlFor="budget">
                Budget slider
              </label>
              <input
                id="budget"
                type="range"
                min={0}
                max={100}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="h-11 w-full"
                aria-label="Budget slider"
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
            <div className="text-sm text-slate-600">
              Trip length: <span className="font-extrabold text-slate-900">{tripDays}</span> days
            </div>
            <div className="text-sm text-slate-600">
              Est: <span className="font-extrabold text-slate-900">{formatUsd(estimatedTotal)}</span>
            </div>
          </div>

          <Button
            size="lg"
            fullWidth
            onClick={() => {
              // "AI" itinerary suggestion (mock): deterministic generator for now.
              const generated = generateItinerary({ destination, days: tripDays, travelType });
              setItinerary(destination.slug, generated);
            }}
            aria-label="Generate itinerary"
          >
            Generate itinerary
          </Button>
        </Card>

        {itinerary.length ? (
          <div className="space-y-3">
            <div>
              <div className="text-base font-extrabold text-slate-900">Editable itinerary</div>
              <div className="text-sm text-slate-600">Tap an item and change it.</div>
            </div>

            {itinerary.map((d) => (
              <Card key={d.day} className="space-y-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-extrabold text-slate-900">{d.title}</div>
                  <Button variant="secondary" size="sm" onClick={() => addItem(d.day)} aria-label="Add item">
                    Add
                  </Button>
                </div>
                <div className="grid gap-2">
                  {d.items.map((it, idx) => (
                    <div key={`${it.time}_${idx}`} className="flex items-center gap-2">
                      <div className="w-14 shrink-0 text-xs font-semibold text-slate-500">{it.time}</div>
                      <Input
                        value={it.label}
                        onChange={(e) => updateItemLabel(d.day, idx, e.target.value)}
                        aria-label={`Edit day ${d.day} item ${idx + 1}`}
                        className="h-10"
                      />
                      <button
                        type="button"
                        className="h-10 rounded-xl bg-slate-100 px-3 text-xs font-extrabold text-slate-700 hover:bg-slate-200"
                        onClick={() => removeItem(d.day, idx)}
                        aria-label="Remove item"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No itinerary yet"
            description="Generate an itinerary to get a day-wise plan."
            action={
              <Button
                onClick={() => {
                  const generated = generateItinerary({ destination, days: tripDays, travelType });
                  setItinerary(destination.slug, generated);
                }}
              >
                Generate now
              </Button>
            }
          />
        )}

        <StickyBar>
          <div className="flex items-center gap-3">
            <Button asChild variant="secondary" className="h-12 w-28">
              <Link href={`/destinations/${destination.slug}`}>Back</Link>
            </Button>
            <Button
              fullWidth
              size="lg"
              onClick={() => {
                const booking = createBooking({
                  type: "Hotel",
                  destinationId: destination.id,
                  title: `Hotel booking · ${destination.name}`,
                  startDate,
                  endDate,
                  travelers,
                  totalUsd: estimatedTotal
                });
                router.push(`/bookings/confirm?id=${encodeURIComponent(booking.id)}`);
              }}
              aria-label="Confirm booking"
            >
              Confirm booking
            </Button>
          </div>
        </StickyBar>
      </div>
    </AppShell>
  );
}

