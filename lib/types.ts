export type DestinationCategory = "Beaches" | "Mountains" | "Cities" | "International";

export type TravelType = "Adventure" | "Relax" | "Business";

export type BudgetRange = "Budget" | "Mid" | "Premium";

export type Destination = {
  id: string;
  slug: string;
  name: string;
  country: string;
  category: DestinationCategory;
  rating: number; // 0-5
  reviewsCount: number;
  startingPriceUsd: number;
  heroImageUrl: string;
  galleryImageUrls: string[];
  overview: string;
  about: string[];
  placesToVisit: { name: string; description: string }[];
  activities: { name: string; description: string; priceUsd: number }[];
  hotels: { id: string; name: string; rating: number; pricePerNightUsd: number }[];
  tags: string[];
};

export type ItineraryDay = {
  day: number;
  title: string;
  items: { time: string; label: string }[];
};

export type BookingType = "Hotel" | "Activity" | "Transport";

export type Booking = {
  id: string;
  type: BookingType;
  destinationId: string;
  title: string;
  startDate: string; // ISO
  endDate?: string; // ISO (optional for activities)
  travelers: number;
  totalUsd: number;
  createdAt: string; // ISO
};

