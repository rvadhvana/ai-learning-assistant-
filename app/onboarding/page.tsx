"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { destinations } from "@/data/destinations";
import { usePreferencesStore } from "@/features/preferences/usePreferencesStore";
import type { BudgetRange, TravelType } from "@/lib/types";

const travelTypes: TravelType[] = ["Adventure", "Relax", "Business"];
const budgets: BudgetRange[] = ["Budget", "Mid", "Premium"];

export default function Page() {
  const router = useRouter();

  const travelType = usePreferencesStore((s) => s.travelType);
  const budgetRange = usePreferencesStore((s) => s.budgetRange);
  const preferred = usePreferencesStore((s) => s.preferredDestinationSlugs);
  const setTravelType = usePreferencesStore((s) => s.setTravelType);
  const setBudgetRange = usePreferencesStore((s) => s.setBudgetRange);
  const togglePreferred = usePreferencesStore((s) => s.togglePreferredDestination);

  const canContinue = Boolean(travelType && budgetRange);

  return (
    <AppShell hideNav>
      <div className="space-y-4">
        <div>
          <div className="text-lg font-extrabold text-slate-900">Quick onboarding</div>
          <div className="text-sm text-slate-600">Answer 3 questions to personalize your home feed.</div>
        </div>

        <Card className="space-y-3 p-5">
          <div>
            <div className="text-sm font-extrabold text-slate-900">Travel type</div>
            <div className="text-sm text-slate-600">What kind of trips do you prefer?</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {travelTypes.map((t) => (
              <Chip key={t} selected={travelType === t} onClick={() => setTravelType(t)}>
                {t}
              </Chip>
            ))}
          </div>
        </Card>

        <Card className="space-y-3 p-5">
          <div>
            <div className="text-sm font-extrabold text-slate-900">Budget range</div>
            <div className="text-sm text-slate-600">Pick a baseline (you can change per trip).</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {budgets.map((b) => (
              <Chip key={b} selected={budgetRange === b} onClick={() => setBudgetRange(b)}>
                {b}
              </Chip>
            ))}
          </div>
        </Card>

        <Card className="space-y-3 p-5">
          <div>
            <div className="text-sm font-extrabold text-slate-900">Preferred destinations</div>
            <div className="text-sm text-slate-600">Optional—helps recommendations.</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {destinations.map((d) => (
              <Chip
                key={d.slug}
                selected={preferred.includes(d.slug)}
                onClick={() => togglePreferred(d.slug)}
              >
                {d.name}
              </Chip>
            ))}
          </div>
        </Card>

        <div className="grid gap-3 pt-2">
          <Button
            size="lg"
            fullWidth
            disabled={!canContinue}
            onClick={() => {
              // Minimal validation: type + budget required.
              router.push("/");
            }}
            aria-label="Finish onboarding"
          >
            Continue
          </Button>

          <Button
            fullWidth
            variant="ghost"
            onClick={() => router.push("/")}
            aria-label="Skip onboarding"
          >
            Skip
          </Button>
        </div>
      </div>
    </AppShell>
  );
}

