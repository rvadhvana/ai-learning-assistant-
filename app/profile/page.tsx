"use client";

import Link from "next/link";

import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/features/auth/useAuthStore";
import { useBookingsStore } from "@/features/bookings/useBookingsStore";

export default function Page() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const bookings = useBookingsStore((s) => s.bookings);

  return (
    <AppShell>
      <div className="space-y-4">
        <div>
          <div className="text-lg font-extrabold text-slate-900">Profile</div>
          <div className="text-sm text-slate-600">Your trips, preferences, and settings.</div>
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-extrabold text-slate-900">{user ? user.email : "Guest"}</div>
              <div className="text-sm text-slate-600">
                {user ? "Signed in (mock local auth)." : "Sign in to sync across devices."}
              </div>
            </div>
            {user ? (
              <Button variant="secondary" onClick={() => logout()} aria-label="Logout">
                Logout
              </Button>
            ) : (
              <Button asChild variant="secondary">
                <Link href="/auth/login">Login</Link>
              </Button>
            )}
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-sm font-extrabold text-slate-900">Trips</div>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
              <div className="text-xs font-semibold text-slate-500">Upcoming</div>
              <div className="text-lg font-extrabold text-slate-900">{bookings.length}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
              <div className="text-xs font-semibold text-slate-500">Past</div>
              <div className="text-lg font-extrabold text-slate-900">0</div>
            </div>
          </div>
        </Card>

        <div className="grid gap-3">
          <Button asChild variant="secondary" fullWidth>
            <Link href="/onboarding">Preferences</Link>
          </Button>
          <Button asChild variant="ghost" fullWidth>
            <Link href="/auth/splash">Splash / Onboarding</Link>
          </Button>
        </div>
      </div>
    </AppShell>
  );
}

