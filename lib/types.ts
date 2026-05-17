export type Category =
  | "restaurants"
  | "cafes"
  | "brunch"
  | "halal"
  | "cheap-eats"
  | "romantic"
  | "family-friendly"
  | "patisseries"
  | "monuments"
  | "activities"
  | "markets"
  | "desserts"
  | "bars"
  | "museums";

export const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: "restaurants", label: "Restaurants", emoji: "🍽️" },
  { id: "cafes", label: "Cafés", emoji: "☕" },
  { id: "brunch", label: "Brunch", emoji: "🥞" },
  { id: "halal", label: "Halal", emoji: "🌙" },
  { id: "cheap-eats", label: "Cheap Eats", emoji: "💰" },
  { id: "romantic", label: "Romantic", emoji: "💑" },
  { id: "family-friendly", label: "Family", emoji: "👨‍👩‍👧" },
  { id: "patisseries", label: "Pâtisseries", emoji: "🥐" },
  { id: "monuments", label: "Monuments", emoji: "🏛️" },
  { id: "activities", label: "Activities", emoji: "🎭" },
  { id: "markets", label: "Markets", emoji: "🛍️" },
  { id: "desserts", label: "Desserts", emoji: "🍦" },
  { id: "bars", label: "Bars & Rooftops", emoji: "🍸" },
  { id: "museums", label: "Museums", emoji: "🎨" },
];

export const PRICE_LABEL = ["Free", "€", "€€", "€€€", "€€€€"] as const;
export const PRICE_DESC = [
  "Free entry",
  "Budget-friendly",
  "Moderate",
  "Upscale",
  "Fine dining / Premium",
] as const;

export interface City {
  id: string;
  name: string;
  country: string;
  flag: string;
  description: string;
  image: string;
  slug: string;
  coordinates: { lat: number; lng: number };
  placeCount: number;
  highlights: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  initials: string;
}

export interface Place {
  id: string;
  citySlug: string;
  name: string;
  slug: string;
  categories: Category[];
  address: string;
  neighborhood: string;
  rating: number;
  reviewCount: number;
  /** 0=Free 1=€ 2=€€ 3=€€€ 4=€€€€ */
  priceLevel: 0 | 1 | 2 | 3 | 4;
  lat: number;
  lng: number;
  phone?: string;
  website?: string;
  menuUrl?: string;
  bookingUrl?: string;
  googleMapsUrl: string;
  photos: string[];
  openingHours: Record<string, string>;
  isHalal: boolean;
  isFamilyFriendly: boolean;
  hasTerrace: boolean;
  description: string;
  reviewSummary: string;
  reviews: Review[];
  /** Displayed ticket / entry price e.g. "Free", "€29.40", "€10–€26" */
  entryPrice?: string;
  /** Typical visit duration e.g. "1–2 hours" */
  duration?: string;
  featured?: boolean;
  /** Multi-source ratings. michelin: 0 = none, 1–3 = stars */
  ratings?: {
    google: number;
    tripadvisor: number;
    michelin: 0 | 1 | 2 | 3;
  };
}

export interface FilterState {
  category: Category | "all";
  minRating: number;
  maxPrice: number;
  halal: boolean;
  family: boolean;
  terrace: boolean;
  sortBy: "rating" | "price-low" | "price-high" | "reviews";
}
