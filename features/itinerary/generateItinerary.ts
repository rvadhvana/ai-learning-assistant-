import type { Destination, ItineraryDay, TravelType } from "@/lib/types";

export function generateItinerary({
  destination,
  days,
  travelType
}: {
  destination: Destination;
  days: number;
  travelType: TravelType;
}): ItineraryDay[] {
  const safeDays = Math.max(1, Math.min(10, Math.floor(days)));

  const vibe =
    travelType === "Adventure"
      ? ["Sunrise start", "Outdoor activity", "Local street food", "Scenic viewpoint"]
      : travelType === "Business"
        ? ["Easy morning", "Work block", "Quick lunch", "Evening landmark"]
        : ["Slow morning", "Beach / wellness", "Cafe time", "Sunset spot"];

  const place = destination.placesToVisit[0]?.name ?? destination.name;
  const activity = destination.activities[0]?.name ?? "Local exploration";

  return Array.from({ length: safeDays }).map((_, i) => {
    const day = i + 1;
    return {
      day,
      title: `Day ${day} · ${day === 1 ? "Arrival" : day === safeDays ? "Wrap-up" : "Explore"}`,
      items: [
        { time: "09:00", label: vibe[0] },
        { time: "11:00", label: `Visit ${place}` },
        { time: "14:00", label: vibe[2] },
        { time: "16:30", label: `Try ${activity}` }
      ]
    };
  });
}

