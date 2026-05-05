import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";
import { cities, places } from "@/lib/data";

// One-time seed endpoint — protected by SEED_SECRET env var.
// Call as: GET /api/seed?secret=<SEED_SECRET>
export async function GET(req: Request) {
  const secret = process.env.SEED_SECRET;
  const provided = new URL(req.url).searchParams.get("secret");
  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = createServerClient();

  // ── Upsert cities ──────────────────────────────────────────────────────────
  const cityRows = cities.map((c) => ({
    id: c.id,
    name: c.name,
    country: c.country,
    flag: c.flag,
    description: c.description,
    image: c.image,
    slug: c.slug,
    lat: c.coordinates.lat,
    lng: c.coordinates.lng,
    place_count: c.placeCount,
    highlights: c.highlights,
  }));

  const { error: cityError } = await db
    .from("cities")
    .upsert(cityRows, { onConflict: "id" });

  if (cityError) {
    return NextResponse.json({ error: `Cities: ${cityError.message}` }, { status: 500 });
  }

  // ── Upsert places ──────────────────────────────────────────────────────────
  const placeRows = places.map((p) => ({
    id: p.id,
    city_slug: p.citySlug,
    name: p.name,
    slug: p.slug,
    categories: p.categories,
    address: p.address,
    neighborhood: p.neighborhood,
    rating: p.rating,
    review_count: p.reviewCount,
    price_level: p.priceLevel,
    lat: p.lat,
    lng: p.lng,
    phone: p.phone ?? null,
    website: p.website ?? null,
    menu_url: p.menuUrl ?? null,
    booking_url: p.bookingUrl ?? null,
    google_maps_url: p.googleMapsUrl,
    photos: p.photos,
    opening_hours: p.openingHours,
    is_halal: p.isHalal,
    is_family_friendly: p.isFamilyFriendly,
    has_terrace: p.hasTerrace,
    description: p.description,
    review_summary: p.reviewSummary,
    reviews: p.reviews,
    entry_price: p.entryPrice ?? null,
    duration: p.duration ?? null,
    featured: p.featured ?? false,
  }));

  const { error: placeError } = await db
    .from("places")
    .upsert(placeRows, { onConflict: "id" });

  if (placeError) {
    return NextResponse.json({ error: `Places: ${placeError.message}` }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    seeded: { cities: cityRows.length, places: placeRows.length },
  });
}
