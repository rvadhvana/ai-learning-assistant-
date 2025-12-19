"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CalendarCheck2, Heart, Home, User } from "lucide-react";

import { cn } from "@/lib/cn";

const items = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/wishlist", label: "Wishlist", Icon: Heart },
  { href: "/bookings", label: "Bookings", Icon: CalendarCheck2 },
  { href: "/profile", label: "Profile", Icon: User }
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/70 bg-background/90 backdrop-blur"
      aria-label="Bottom navigation"
    >
      <div className="mx-auto grid w-full max-w-xl grid-cols-4 px-2 py-2">
        {items.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "mx-1 flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-semibold transition",
                active ? "bg-brand-50 text-brand-800" : "text-slate-600 hover:bg-slate-100"
              )}
              aria-label={label}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="size-5" aria-hidden />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

