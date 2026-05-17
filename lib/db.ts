/**
 * Async Supabase-backed data access.
 * Used in Server Components. Falls back to static data if Supabase is
 * unreachable (e.g. env vars not set in a preview deploy).
 */
import { createServerClient } from "./supabase-server";
import {
  getCityBySlug as staticCity,
  getPlaceBySlug as staticPlace,
  getPlacesByCity as staticPlaces,
  getFeaturedPlaces as staticFeatured,
  places as staticPlacesData,
} from "./data";
import type { City, Place, Review } from "./types";

// O(1) lookups so rowToPlace can fall back to static data when Supabase
// rows predate newly added columns.
const staticRatingsMap = new Map(
  staticPlacesData.map((p) => [`${p.citySlug}|${p.slug}`, p.ratings])
);
const staticTheforkMap = new Map(
  staticPlacesData.map((p) => [`${p.citySlug}|${p.slug}`, p.theforkUrl])
);
const staticGygMap = new Map(
  staticPlacesData.map((p) => [`${p.citySlug}|${p.slug}`, p.getYourGuideUrl])
);

// ── Row → Type mappers ───────────────────────────────────────────────────────

function rowToCity(row: Record<string, unknown>): City {
  return {
    id: row.id as string,
    name: row.name as string,
    country: row.country as string,
    flag: row.flag as string,
    description: row.description as string,
    image: row.image as string,
    slug: row.slug as string,
    coordinates: {
      lat: row.lat as number,
      lng: row.lng as number,
    },
    placeCount: row.place_count as number,
    highlights: (row.highlights as string[]) ?? [],
  };
}

function rowToPlace(row: Record<string, unknown>): Place {
  return {
    id: row.id as string,
    citySlug: row.city_slug as string,
    name: row.name as string,
    slug: row.slug as string,
    categories: (row.categories as Place["categories"]) ?? [],
    address: row.address as string,
    neighborhood: row.neighborhood as string,
    rating: row.rating as number,
    reviewCount: row.review_count as number,
    priceLevel: row.price_level as 0 | 1 | 2 | 3 | 4,
    lat: row.lat as number,
    lng: row.lng as number,
    phone: (row.phone as string) ?? undefined,
    website: (row.website as string) ?? undefined,
    menuUrl: (row.menu_url as string) ?? undefined,
    bookingUrl: (row.booking_url as string) ?? undefined,
    googleMapsUrl: row.google_maps_url as string,
    photos: (row.photos as string[]) ?? [],
    openingHours: (row.opening_hours as Record<string, string>) ?? {},
    isHalal: row.is_halal as boolean,
    isFamilyFriendly: row.is_family_friendly as boolean,
    hasTerrace: row.has_terrace as boolean,
    description: row.description as string,
    reviewSummary: row.review_summary as string,
    reviews: (row.reviews as Review[]) ?? [],
    entryPrice: (row.entry_price as string) ?? undefined,
    duration: (row.duration as string) ?? undefined,
    featured: (row.featured as boolean) ?? false,
    ratings:
      (row.ratings as Place["ratings"] | null) ??
      staticRatingsMap.get(`${row.city_slug as string}|${row.slug as string}`),
    theforkUrl:
      (row.thefork_url as string | null) ??
      staticTheforkMap.get(`${row.city_slug as string}|${row.slug as string}`),
    getYourGuideUrl:
      (row.getyourguide_url as string | null) ??
      staticGygMap.get(`${row.city_slug as string}|${row.slug as string}`),
  };
}

// ── Public API ───────────────────────────────────────────────────────────────

export async function dbGetCityBySlug(slug: string): Promise<City | undefined> {
  try {
    const db = createServerClient();
    const { data, error } = await db
      .from("cities")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error || !data) return staticCity(slug);
    return rowToCity(data);
  } catch {
    return staticCity(slug);
  }
}

export async function dbGetPlacesByCity(citySlug: string): Promise<Place[]> {
  try {
    const db = createServerClient();
    const { data, error } = await db
      .from("places")
      .select("*")
      .eq("city_slug", citySlug)
      .order("rating", { ascending: false });
    if (error || !data?.length) return staticPlaces(citySlug);
    return data.map(rowToPlace);
  } catch {
    return staticPlaces(citySlug);
  }
}

export async function dbGetPlaceBySlug(
  citySlug: string,
  placeSlug: string
): Promise<Place | undefined> {
  try {
    const db = createServerClient();
    const { data, error } = await db
      .from("places")
      .select("*")
      .eq("city_slug", citySlug)
      .eq("slug", placeSlug)
      .single();
    if (error || !data) return staticPlace(citySlug, placeSlug);
    return rowToPlace(data);
  } catch {
    return staticPlace(citySlug, placeSlug);
  }
}

export async function dbGetFeaturedPlaces(citySlug: string): Promise<Place[]> {
  try {
    const db = createServerClient();
    const { data, error } = await db
      .from("places")
      .select("*")
      .eq("city_slug", citySlug)
      .eq("featured", true)
      .order("rating", { ascending: false });
    if (error || !data?.length) return staticFeatured(citySlug);
    return data.map(rowToPlace);
  } catch {
    return staticFeatured(citySlug);
  }
}

// ── Admin helpers (service-role, server-only) ────────────────────────────────

export async function dbUpsertPlace(place: Place): Promise<{ error: string | null }> {
  try {
    const db = createServerClient();
    const row = {
      id: place.id,
      city_slug: place.citySlug,
      name: place.name,
      slug: place.slug,
      categories: place.categories,
      address: place.address,
      neighborhood: place.neighborhood,
      rating: place.rating,
      review_count: place.reviewCount,
      price_level: place.priceLevel,
      lat: place.lat,
      lng: place.lng,
      phone: place.phone ?? null,
      website: place.website ?? null,
      menu_url: place.menuUrl ?? null,
      booking_url: place.bookingUrl ?? null,
      google_maps_url: place.googleMapsUrl,
      photos: place.photos,
      opening_hours: place.openingHours,
      is_halal: place.isHalal,
      is_family_friendly: place.isFamilyFriendly,
      has_terrace: place.hasTerrace,
      description: place.description,
      review_summary: place.reviewSummary,
      reviews: place.reviews,
      entry_price: place.entryPrice ?? null,
      duration: place.duration ?? null,
      featured: place.featured ?? false,
      ratings: place.ratings ?? null,
      thefork_url: place.theforkUrl ?? null,
      getyourguide_url: place.getYourGuideUrl ?? null,
    };
    const { error } = await db.from("places").upsert(row, { onConflict: "id" });
    return { error: error?.message ?? null };
  } catch (e) {
    return { error: String(e) };
  }
}

export async function dbDeletePlace(id: string): Promise<{ error: string | null }> {
  try {
    const db = createServerClient();
    const { error } = await db.from("places").delete().eq("id", id);
    return { error: error?.message ?? null };
  } catch (e) {
    return { error: String(e) };
  }
}

export async function dbUpsertCity(city: City): Promise<{ error: string | null }> {
  try {
    const db = createServerClient();
    const row = {
      id: city.id,
      name: city.name,
      country: city.country,
      flag: city.flag,
      description: city.description,
      image: city.image,
      slug: city.slug,
      lat: city.coordinates.lat,
      lng: city.coordinates.lng,
      place_count: city.placeCount,
      highlights: city.highlights,
    };
    const { error } = await db.from("cities").upsert(row, { onConflict: "id" });
    return { error: error?.message ?? null };
  } catch (e) {
    return { error: String(e) };
  }
}
