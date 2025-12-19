"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Heart } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Rating } from "@/components/ui/Rating";
import { StickyBar } from "@/components/ui/StickyBar";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { formatUsd } from "@/lib/format";
import type { Destination } from "@/lib/types";
import { useWishlistStore } from "@/features/wishlist/useWishlistStore";

const tabItems = [
  { key: "about", label: "About" },
  { key: "places", label: "Places to visit" },
  { key: "hotels", label: "Hotels" },
  { key: "activities", label: "Activities" }
] as const;

export function DestinationDetails({ destination }: { destination: Destination }) {
  const [tab, setTab] = React.useState<(typeof tabItems)[number]["key"]>("about");

  const toggle = useWishlistStore((s) => s.toggleDestination);
  const saved = useWishlistStore((s) => s.isSaved(destination.id));

  return (
    <div className="space-y-4 pb-24">
      <Card className="overflow-hidden">
        <div className="relative h-56 w-full">
          <Image
            src={destination.heroImageUrl}
            alt={`${destination.name} hero image`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 480px"
            priority
          />
          <button
            type="button"
            onClick={() => toggle(destination.id)}
            className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-white/90 ring-1 ring-slate-200 transition hover:bg-white"
            aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          >
            <Heart className={saved ? "size-5 fill-cta-500 text-cta-500" : "size-5 text-slate-700"} />
          </button>
        </div>

        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xl font-extrabold text-slate-900">{destination.name}</div>
              <div className="text-sm text-slate-600">{destination.country}</div>
            </div>
            <Rating value={destination.rating} count={destination.reviewsCount} />
          </div>

          <div className="text-sm text-slate-700">{destination.overview}</div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
            <div className="text-sm text-slate-600">
              Starting from{" "}
              <span className="font-extrabold text-slate-900">{formatUsd(destination.startingPriceUsd)}</span>
            </div>
            <Link
              href={`/trip-planner?destination=${encodeURIComponent(destination.slug)}`}
              className="text-sm font-extrabold text-brand-800 hover:underline"
              aria-label="Plan this trip"
            >
              Plan
            </Link>
          </div>
        </div>
      </Card>

      <Tabs items={[...tabItems]} value={tab} onValueChange={(k) => setTab(k as any)} />

      {tab === "about" ? (
        <div className="space-y-3">
          {destination.about.map((line) => (
            <Card key={line} className="p-4">
              <div className="text-sm text-slate-700">{line}</div>
            </Card>
          ))}
        </div>
      ) : null}

      {tab === "places" ? (
        <div className="space-y-3">
          {destination.placesToVisit.map((p) => (
            <Card key={p.name} className="p-4">
              <div className="text-sm font-extrabold text-slate-900">{p.name}</div>
              <div className="mt-1 text-sm text-slate-600">{p.description}</div>
            </Card>
          ))}
        </div>
      ) : null}

      {tab === "hotels" ? (
        <div className="space-y-3">
          {destination.hotels.map((h) => (
            <Card key={h.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-extrabold text-slate-900">{h.name}</div>
                  <div className="mt-1 text-sm text-slate-600">Rating {h.rating.toFixed(1)} · per night</div>
                </div>
                <div className="text-sm font-extrabold text-slate-900">{formatUsd(h.pricePerNightUsd)}</div>
              </div>
            </Card>
          ))}
        </div>
      ) : null}

      {tab === "activities" ? (
        <div className="space-y-3">
          {destination.activities.map((a) => (
            <Card key={a.name} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-extrabold text-slate-900">{a.name}</div>
                  <div className="mt-1 text-sm text-slate-600">{a.description}</div>
                </div>
                <div className="text-sm font-extrabold text-slate-900">{formatUsd(a.priceUsd)}</div>
              </div>
            </Card>
          ))}
        </div>
      ) : null}

      <StickyBar>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            className="h-12 w-12 rounded-2xl p-0"
            onClick={() => toggle(destination.id)}
            aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          >
            <Heart className={saved ? "size-5 fill-cta-500 text-cta-500" : "size-5 text-slate-700"} />
          </Button>

          <Button asChild fullWidth size="lg">
            <Link href={`/trip-planner?destination=${encodeURIComponent(destination.slug)}`}>Book now</Link>
          </Button>
        </div>
      </StickyBar>
    </div>
  );
}

