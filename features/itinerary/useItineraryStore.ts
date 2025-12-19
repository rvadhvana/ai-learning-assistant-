"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ItineraryDay } from "@/lib/types";

type ItineraryState = {
  destinationSlug: string | null;
  itinerary: ItineraryDay[];
  setItinerary: (destinationSlug: string, itinerary: ItineraryDay[]) => void;
  updateItemLabel: (day: number, index: number, label: string) => void;
  addItem: (day: number) => void;
  removeItem: (day: number, index: number) => void;
  clear: () => void;
};

export const useItineraryStore = create<ItineraryState>()(
  persist(
    (set, get) => ({
      destinationSlug: null,
      itinerary: [],
      setItinerary: (destinationSlug, itinerary) => set({ destinationSlug, itinerary }),
      updateItemLabel: (day, index, label) =>
        set((s) => ({
          itinerary: s.itinerary.map((d) =>
            d.day !== day
              ? d
              : {
                  ...d,
                  items: d.items.map((it, i) => (i === index ? { ...it, label } : it))
                }
          )
        })),
      addItem: (day) =>
        set((s) => ({
          itinerary: s.itinerary.map((d) =>
            d.day !== day ? d : { ...d, items: [...d.items, { time: "19:00", label: "New item" }] }
          )
        })),
      removeItem: (day, index) =>
        set((s) => ({
          itinerary: s.itinerary.map((d) =>
            d.day !== day ? d : { ...d, items: d.items.filter((_, i) => i !== index) }
          )
        })),
      clear: () => set({ destinationSlug: null, itinerary: [] })
    }),
    { name: "travelease_itinerary_v1" }
  )
);

