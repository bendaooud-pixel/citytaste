export interface Country {
  id: string;
  slug: string;
  name: string;
  nameI18n: Record<string, string>;
  flag?: string;
  displayOrder: number;
}

export interface City {
  id: string;
  countryId: string;
  slug: string;
  name: string;
  nameI18n: Record<string, string>;
  region?: string;
  heroImage?: string;
  displayOrder: number;
}

export interface Activity {
  id: string;
  cityId: string;
  slug?: string;
  title: string;
  titleI18n: Record<string, string>;
  description?: string;
  descI18n: Record<string, string>;
  category: string;
  platform: string;
  affiliateUrl: string;
  imageUrl?: string;
  priceFrom?: number;
  currency: string;
  duration?: string;
  rating?: number;
  priority: number;
}

export interface ActivityArticle {
  body: string;
  faq: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export type ActivityCategory =
  | "food"
  | "medina-tour"
  | "desert"
  | "attraction"
  | "day-trip"
  | "cooking-class"
  | "activity";

export interface GetActivitiesParams {
  countrySlug: string;
  citySlug?: string;
  category?: string;
  locale?: string;
  limit?: number;
}

export function localized(
  defaultValue: string,
  i18n: Record<string, string>,
  locale: string
): string {
  if (locale === "en") return defaultValue;
  return i18n[locale] ?? defaultValue;
}
