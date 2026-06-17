export type MoroccoLocale = "en" | "fr" | "it" | "es";

export type GuideType = "guide" | "attraction" | "practical" | "itinerary" | "roundup";

export interface GuideFrontmatter {
  slug: string;
  locale: MoroccoLocale;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroImage: string;
  category: string;
  citySlug?: string;
  type: GuideType;
  relatedTours: string[];
  relatedGuides: string[];
  hreflangGroup?: string;
  gygLocationId?: string;
  gygActivityIds?: string[];
  faq: { q: string; a: string }[];
  publishedAt: string;
  updatedAt?: string;
}

export interface Guide {
  frontmatter: GuideFrontmatter;
  content: string;
  filePath: string;
}

export interface TourDay {
  day: number;
  title: string;
  description: string;
  meals?: string;
  accommodation?: string;
}

export interface TourFrontmatter {
  slug: string;
  locale: MoroccoLocale;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroImages: string[];
  tourType: "classic" | "exclusive" | "sahara" | "day";
  duration: number;
  highlights: string[];
  itinerary: TourDay[];
  includes: string[];
  excludes: string[];
  priceFrom: number;
  currency: string;
  departureCities: string[];
  relatedGuides: string[];
  faq: { q: string; a: string }[];
  publishedAt: string;
}

export interface Tour {
  frontmatter: TourFrontmatter;
  content: string;
  filePath: string;
}

export const MOROCCO_LOCALES: MoroccoLocale[] = ["en", "fr", "it", "es"];

export const MOROCCO_CITIES = [
  { slug: "marrakech", name: { en: "Marrakech", fr: "Marrakech", it: "Marrakech", es: "Marrakech" } },
  { slug: "fes", name: { en: "Fès", fr: "Fès", it: "Fès", es: "Fez" } },
  { slug: "chefchaouen", name: { en: "Chefchaouen", fr: "Chefchaouen", it: "Chefchaouen", es: "Chefchaouen" } },
  { slug: "casablanca", name: { en: "Casablanca", fr: "Casablanca", it: "Casablanca", es: "Casablanca" } },
  { slug: "rabat", name: { en: "Rabat", fr: "Rabat", it: "Rabat", es: "Rabat" } },
  { slug: "essaouira", name: { en: "Essaouira", fr: "Essaouira", it: "Essaouira", es: "Esauira" } },
  { slug: "tangier", name: { en: "Tangier", fr: "Tanger", it: "Tangeri", es: "Tánger" } },
  { slug: "agadir", name: { en: "Agadir", fr: "Agadir", it: "Agadir", es: "Agadir" } },
  { slug: "ouarzazate", name: { en: "Ouarzazate", fr: "Ouarzazate", it: "Ouarzazate", es: "Uarzazat" } },
  { slug: "merzouga", name: { en: "Merzouga", fr: "Merzouga", it: "Merzouga", es: "Merzouga" } },
] as const;

export const BASE_URL = "https://www.citytaste.co";
