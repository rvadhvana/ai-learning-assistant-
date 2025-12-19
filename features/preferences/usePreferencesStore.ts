"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { BudgetRange, TravelType } from "@/lib/types";

type PreferencesState = {
  travelType: TravelType | null;
  budgetRange: BudgetRange | null;
  preferredDestinationSlugs: string[];
  setTravelType: (t: TravelType) => void;
  setBudgetRange: (b: BudgetRange) => void;
  togglePreferredDestination: (slug: string) => void;
  reset: () => void;
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set, get) => ({
      travelType: null,
      budgetRange: null,
      preferredDestinationSlugs: [],
      setTravelType: (t) => set({ travelType: t }),
      setBudgetRange: (b) => set({ budgetRange: b }),
      togglePreferredDestination: (slug) =>
        set((s) => ({
          preferredDestinationSlugs: s.preferredDestinationSlugs.includes(slug)
            ? s.preferredDestinationSlugs.filter((x) => x !== slug)
            : [...s.preferredDestinationSlugs, slug]
        })),
      reset: () =>
        set({
          travelType: null,
          budgetRange: null,
          preferredDestinationSlugs: []
        })
    }),
    { name: "travelease_preferences_v1" }
  )
);

