"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Heart } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Rating } from "@/components/ui/Rating";
import { formatUsd } from "@/lib/format";
import type { Destination } from "@/lib/types";

export function DestinationCard({
  destination,
  saved,
  onToggleSave
}: {
  destination: Destination;
  saved?: boolean;
  onToggleSave?: (id: string) => void;
}) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }} transition={{ duration: 0.15 }}>
      <Card className="overflow-hidden">
        <div className="relative h-40 w-full">
          <Image
            src={destination.heroImageUrl}
            alt={`${destination.name} destination`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 480px"
            priority={false}
          />
          {onToggleSave ? (
            <button
              type="button"
              onClick={() => onToggleSave(destination.id)}
              className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white/90 ring-1 ring-slate-200 transition hover:bg-white"
              aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
            >
              <Heart className={saved ? "size-5 fill-cta-500 text-cta-500" : "size-5 text-slate-700"} />
            </button>
          ) : null}
        </div>

        <div className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-base font-extrabold text-slate-900">{destination.name}</div>
              <div className="text-sm text-slate-600">{destination.country}</div>
            </div>
            <Rating value={destination.rating} count={destination.reviewsCount} className="shrink-0" />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              From <span className="font-extrabold text-slate-900">{formatUsd(destination.startingPriceUsd)}</span>
            </div>
            <Link
              href={`/destinations/${destination.slug}`}
              className="text-sm font-extrabold text-brand-800 hover:underline"
              aria-label={`Open details for ${destination.name}`}
            >
              View
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

