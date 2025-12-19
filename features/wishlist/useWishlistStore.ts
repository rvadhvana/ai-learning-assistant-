"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  destinationIds: string[];
  toggleDestination: (id: string) => void;
  isSaved: (id: string) => boolean;
  clear: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      destinationIds: [],
      toggleDestination: (id) =>
        set((s) => ({
          destinationIds: s.destinationIds.includes(id)
            ? s.destinationIds.filter((x) => x !== id)
            : [...s.destinationIds, id]
        })),
      isSaved: (id) => get().destinationIds.includes(id),
      clear: () => set({ destinationIds: [] })
    }),
    { name: "travelease_wishlist_v1" }
  )
);

