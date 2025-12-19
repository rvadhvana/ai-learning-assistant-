import type { Destination } from "@/lib/types";

// Mock data with API-ready shape. Images are remote (Unsplash) for zero assets.
export const destinations: Destination[] = [
  {
    id: "dest_bali",
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    category: "Beaches",
    rating: 4.7,
    reviewsCount: 18240,
    startingPriceUsd: 499,
    heroImageUrl:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=80",
    galleryImageUrls: [
      "https://images.unsplash.com/photo-1558005137-d9619a5c539f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1400&q=80"
    ],
    overview: "Tropical beaches, cliffside temples, and café culture—perfect for a relaxed escape.",
    about: [
      "Best time to visit: Apr–Oct (dry season).",
      "Great for: beach stays, short hikes, temple hopping, wellness."
    ],
    placesToVisit: [
      { name: "Uluwatu Temple", description: "Iconic clifftop temple with ocean views." },
      { name: "Tegallalang Rice Terraces", description: "Sunrise-friendly rice terrace walk." }
    ],
    activities: [
      { name: "Ubud day tour", description: "Markets, waterfalls, and rice terraces.", priceUsd: 45 },
      { name: "Surf lesson", description: "Beginner-friendly 2 hour lesson.", priceUsd: 30 }
    ],
    hotels: [
      { id: "h_bali_1", name: "Coastline Boutique Stay", rating: 4.6, pricePerNightUsd: 89 },
      { id: "h_bali_2", name: "Ubud Garden Resort", rating: 4.4, pricePerNightUsd: 72 }
    ],
    tags: ["Beach", "Wellness", "Food"]
  },
  {
    id: "dest_manali",
    slug: "manali",
    name: "Manali",
    country: "India",
    category: "Mountains",
    rating: 4.6,
    reviewsCount: 11320,
    startingPriceUsd: 199,
    heroImageUrl:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=80",
    galleryImageUrls: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1500043357865-c6b8827edf2b?auto=format&fit=crop&w=1400&q=80"
    ],
    overview: "Snow views, pine forests, and cozy cafés—ideal for a quick mountain reset.",
    about: ["Best time to visit: Oct–Feb (snow) or Mar–Jun (pleasant).", "Great for: hikes, drives."],
    placesToVisit: [
      { name: "Solang Valley", description: "Adventure sports + epic valley views." },
      { name: "Old Manali", description: "Cafés, river walks, and chill vibes." }
    ],
    activities: [
      { name: "Paragliding", description: "Tandem flight over the valley.", priceUsd: 55 },
      { name: "Local food crawl", description: "Street eats + cafés.", priceUsd: 20 }
    ],
    hotels: [
      { id: "h_manali_1", name: "Pineview Lodge", rating: 4.5, pricePerNightUsd: 48 },
      { id: "h_manali_2", name: "Riverside Retreat", rating: 4.3, pricePerNightUsd: 39 }
    ],
    tags: ["Snow", "Hiking", "Budget"]
  },
  {
    id: "dest_dubai",
    slug: "dubai",
    name: "Dubai",
    country: "UAE",
    category: "International",
    rating: 4.5,
    reviewsCount: 29410,
    startingPriceUsd: 799,
    heroImageUrl:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=80",
    galleryImageUrls: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=1400&q=80"
    ],
    overview: "Skyline icons, desert adventures, and world-class shopping.",
    about: ["Best time to visit: Nov–Mar (cooler).", "Great for: luxury stays, desert safari."],
    placesToVisit: [
      { name: "Burj Khalifa", description: "Observation decks + fountain views." },
      { name: "Dubai Marina", description: "Sunset stroll and dining." }
    ],
    activities: [
      { name: "Desert safari", description: "Dunes + dinner + shows.", priceUsd: 75 },
      { name: "City pass", description: "Bundle of top attractions.", priceUsd: 120 }
    ],
    hotels: [
      { id: "h_dubai_1", name: "Marina View Hotel", rating: 4.4, pricePerNightUsd: 140 },
      { id: "h_dubai_2", name: "Downtown Skyline Stay", rating: 4.6, pricePerNightUsd: 210 }
    ],
    tags: ["Luxury", "Shopping", "Desert"]
  },
  {
    id: "dest_jaipur",
    slug: "jaipur",
    name: "Jaipur",
    country: "India",
    category: "Cities",
    rating: 4.4,
    reviewsCount: 9020,
    startingPriceUsd: 149,
    heroImageUrl:
      "https://images.unsplash.com/photo-1548013146-3d2f522a9a12?auto=format&fit=crop&w=1400&q=80",
    galleryImageUrls: [
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1400&q=80"
    ],
    overview: "Forts, bazaars, and heritage stays—culture-heavy and easy to explore.",
    about: ["Best time to visit: Oct–Mar.", "Great for: history, food, shopping."],
    placesToVisit: [
      { name: "Amber Fort", description: "Hilltop fort complex with stunning courtyards." },
      { name: "Hawa Mahal", description: "Iconic ‘Palace of Winds’ facade." }
    ],
    activities: [
      { name: "Heritage walk", description: "Guided old-city exploration.", priceUsd: 18 },
      { name: "Craft market tour", description: "Textiles, jewelry, and local crafts.", priceUsd: 12 }
    ],
    hotels: [
      { id: "h_jaipur_1", name: "Pink City Inn", rating: 4.2, pricePerNightUsd: 34 },
      { id: "h_jaipur_2", name: "Heritage Haveli Stay", rating: 4.5, pricePerNightUsd: 58 }
    ],
    tags: ["Culture", "Food", "Weekend"]
  }
];

export function getDestinationBySlug(slug: string) {
  return destinations.find((d) => d.slug === slug);
}

