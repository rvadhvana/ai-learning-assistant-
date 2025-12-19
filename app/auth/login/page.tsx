"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/features/auth/useAuthStore";
import { usePreferencesStore } from "@/features/preferences/usePreferencesStore";

export default function Page() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const travelType = usePreferencesStore((s) => s.travelType);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className="mx-auto min-h-screen w-full max-w-xl px-4 py-10">
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="text-2xl font-extrabold text-slate-900">Welcome back</div>
          <div className="text-sm text-slate-600">Login to sync your trips.</div>
        </div>

        <Card className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              autoComplete="email"
              inputMode="email"
              aria-label="Email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
              aria-label="Password"
            />
          </div>

          <div className="grid gap-3">
            <Button
              size="lg"
              fullWidth
              onClick={() => {
                // Mock login: only stores email locally (no backend).
                login(email || "guest@travelease.app");
                router.push(travelType ? "/" : "/onboarding");
              }}
              aria-label="Login"
            >
              Login
            </Button>

            <Button
              size="lg"
              variant="secondary"
              fullWidth
              onClick={() => {
                // Mock Google login.
                login(email || "google.user@travelease.app");
                router.push(travelType ? "/" : "/onboarding");
              }}
              aria-label="Continue with Google"
            >
              Continue with Google
            </Button>
          </div>

          <div className="text-sm text-slate-600">
            New here?{" "}
            <Link href="/auth/signup" className="font-extrabold text-brand-800 hover:underline">
              Create an account
            </Link>
          </div>
        </Card>

        <Button asChild variant="ghost" fullWidth>
          <Link href="/auth/splash">Back</Link>
        </Button>
      </div>
    </div>
  );
}

