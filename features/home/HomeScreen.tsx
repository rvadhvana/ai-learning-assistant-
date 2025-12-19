"use client";

import * as React from "react";

import { DestinationCard } from "@/components/destinations/DestinationCard";
import { AppShell } from "@/components/layout/AppShell";
import { Chip } from "@/components/ui/Chip";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { categories } from "@/data/categories";
import { destinations } from "@/data/destinations";
import type { DestinationCategory } from "@/lib/types";
import { useWishlistStore } from "@/features/wishlist/useWishlistStore";

export function HomeScreen() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<DestinationCategory | "All">("All");

  const toggleDestination = useWishlistStore((s) => s.toggleDestination);
  const isSaved = useWishlistStore((s) => s.isSaved);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations.filter((d) => {
      const categoryMatch = category === "All" ? true : d.category === category;
      if (!categoryMatch) return false;
      if (!q) return true;
      const hay = `${d.name} ${d.country} ${d.tags.join(" ")} ${d.overview}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, category]);

  const trending = React.useMemo(() => {
    return [...destinations].sort((a, b) => b.rating - a.rating).slice(0, 3);
  }, []);

  return (
    <AppShell>
      <div className="space-y-6">
        <section className="space-y-3">
          <div className="space-y-1">
            <div className="text-lg font-extrabold text-slate-900">Where do you want to go?</div>
            <div className="text-sm text-slate-600">Search destinations, vibes, and tags.</div>
          </div>

          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: Bali, beaches, food…"
            aria-label="Search destinations"
          />

          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Chip selected={category === "All"} onClick={() => setCategory("All")}>
              All
            </Chip>
            {categories.map((c) => (
              <Chip key={c.key} selected={category === c.key} onClick={() => setCategory(c.key)}>
                {c.emoji} {c.key}
              </Chip>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-base font-extrabold text-slate-900">Trending trips</div>
              <div className="text-sm text-slate-600">High-rated picks right now.</div>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {trending.map((d) => (
              <div key={d.id} className="w-[280px] shrink-0">
                <DestinationCard
                  destination={d}
                  saved={isSaved(d.id)}
                  onToggleSave={(id) => toggleDestination(id)}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-base font-extrabold text-slate-900">Featured destinations</div>
              <div className="text-sm text-slate-600">Start with a simple, solid plan.</div>
            </div>
            <div className="text-xs font-semibold text-slate-500">{filtered.length} results</div>
          </div>

          {!destinations.length ? (
            <div className="grid grid-cols-1 gap-4">
              <Skeleton className="h-56 w-full" />
              <Skeleton className="h-56 w-full" />
            </div>
          ) : filtered.length ? (
            <div className="grid grid-cols-1 gap-4">
              {filtered.map((d) => (
                <DestinationCard
                  key={d.id}
                  destination={d}
                  saved={isSaved(d.id)}
                  onToggleSave={(id) => toggleDestination(id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No matches"
              description="Try a different search, or reset filters."
              action={
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="h-11 rounded-xl bg-slate-900 px-4 text-sm font-extrabold text-white"
                    onClick={() => {
                      setQuery("");
                      setCategory("All");
                    }}
                    aria-label="Reset search and filters"
                  >
                    Reset
                  </button>
                </div>
              }
            />
          )}
        </section>
      </div>
    </AppShell>
  );
}

