"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  user: null | { email: string };
  login: (email: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email) => set({ user: { email } }),
      logout: () => set({ user: null })
    }),
    { name: "travelease_auth_v1" }
  )
);

