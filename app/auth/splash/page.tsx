"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";

export default function Page() {
  return (
    <div className="relative min-h-screen">
      <Image
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80"
        alt="Travel mountains splash"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-slate-950/20" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-xl flex-col justify-end px-4 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl bg-white/95 p-5 shadow-soft ring-1 ring-white/40 backdrop-blur"
        >
          <div className="text-sm font-extrabold text-brand-800">TravelEase</div>
          <div className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
            Discover trips you’ll actually enjoy.
          </div>
          <div className="mt-2 text-sm text-slate-600">
            A cleaner way to search, plan, and book—mobile-first.
          </div>

          <div className="mt-5 grid gap-3">
            <Button asChild size="lg" fullWidth>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" fullWidth>
              <Link href="/auth/signup">Create account</Link>
            </Button>
            <Button asChild variant="ghost" fullWidth>
              <Link href="/">Continue as guest</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

