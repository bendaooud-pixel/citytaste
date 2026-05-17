import type { Place } from "./types";

export type BadgeId =
  | "michelin-recommended"
  | "citytaste-pick"
  | "hidden-gem"
  | "best-value"
  | "most-romantic"
  | "halal-certified"
  | "family-favorite";

export interface Badge {
  id: BadgeId;
  label: string;
  icon: string;
  /** Tailwind classes applied to the pill */
  colorClass: string;
}

const DEFS: Record<BadgeId, Omit<Badge, "id">> = {
  "michelin-recommended": {
    label: "Michelin Recommended",
    icon: "⭐",
    colorClass: "bg-red-50 text-red-700 border-red-200",
  },
  "citytaste-pick": {
    label: "CityTaste Pick 2025",
    icon: "🏆",
    colorClass: "bg-amber-50 text-amber-700 border-amber-200",
  },
  "hidden-gem": {
    label: "Hidden Gem",
    icon: "💎",
    colorClass: "bg-purple-50 text-purple-700 border-purple-200",
  },
  "best-value": {
    label: "Best Value",
    icon: "💚",
    colorClass: "bg-green-50 text-green-700 border-green-200",
  },
  "most-romantic": {
    label: "Most Romantic",
    icon: "❤️",
    colorClass: "bg-pink-50 text-pink-700 border-pink-200",
  },
  "halal-certified": {
    label: "Halal Certified",
    icon: "🌙",
    colorClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  "family-favorite": {
    label: "Family Favorite",
    icon: "👨‍👩‍👧",
    colorClass: "bg-blue-50 text-blue-700 border-blue-200",
  },
};

function badge(id: BadgeId): Badge {
  return { id, ...DEFS[id] };
}

/**
 * Returns all badges that apply to a place, ordered from most to least prestigious.
 * Michelin is first; then CityTaste Pick; then discovery/feature badges.
 */
export function getBadges(place: Place): Badge[] {
  const result: Badge[] = [];

  if ((place.ratings?.michelin ?? 0) >= 1) {
    result.push(badge("michelin-recommended"));
  }
  if (place.rating >= 4.8) {
    result.push(badge("citytaste-pick"));
  }
  if (place.rating >= 4.6 && place.reviewCount < 1000) {
    result.push(badge("hidden-gem"));
  }
  if (place.rating >= 4.5 && place.priceLevel <= 1) {
    result.push(badge("best-value"));
  }
  if (place.categories.includes("romantic") && place.rating >= 4.5) {
    result.push(badge("most-romantic"));
  }
  if (place.isHalal) {
    result.push(badge("halal-certified"));
  }
  if (place.isFamilyFriendly && place.rating >= 4.4) {
    result.push(badge("family-favorite"));
  }

  return result;
}
