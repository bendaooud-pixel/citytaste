import offersData from "@/content/affiliate-offers.json";

export interface AffiliateOffer {
  id: string;
  title: string;
  platform: string;
  affiliateUrl: string;
  city: string;
  category: string;
  priceFrom: number;
  currency: string;
  locales: string[];
  priority: number;
  active: boolean;
}

const offers: AffiliateOffer[] = offersData as AffiliateOffer[];

export function getOffersByCity(citySlug: string): AffiliateOffer[] {
  return offers
    .filter((o) => o.active && o.city === citySlug)
    .sort((a, b) => a.priority - b.priority);
}

export function getOffersByCategory(citySlug: string, category: string): AffiliateOffer[] {
  return getOffersByCity(citySlug).filter((o) => o.category === category);
}

export function getAllActiveOffers(): AffiliateOffer[] {
  return offers.filter((o) => o.active).sort((a, b) => a.priority - b.priority);
}
