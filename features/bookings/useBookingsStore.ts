"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Booking, BookingType } from "@/lib/types";
import { newId } from "@/lib/id";

type CreateBookingInput = Omit<Booking, "id" | "createdAt">;

type BookingsState = {
  bookings: Booking[];
  createBooking: (input: CreateBookingInput) => Booking;
  getBooking: (id: string) => Booking | undefined;
  clear: () => void;
};

export const useBookingsStore = create<BookingsState>()(
  persist(
    (set, get) => ({
      bookings: [],
      createBooking: (input) => {
        const booking: Booking = {
          ...input,
          id: newId("bk"),
          createdAt: new Date().toISOString()
        };
        set((s) => ({ bookings: [booking, ...s.bookings] }));
        return booking;
      },
      getBooking: (id) => get().bookings.find((b) => b.id === id),
      clear: () => set({ bookings: [] })
    }),
    { name: "travelease_bookings_v1" }
  )
);

export type { BookingType };

