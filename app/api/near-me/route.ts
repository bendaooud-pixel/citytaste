import { NextResponse } from "next/server";

const GKEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const PLACES_BASE = "https://maps.googleapis.com/maps/api/place";

// ── Types ────────────────────────────────────────────────────────────────────
interface GNearbyResult {
  place_id: string;
  name: string;
  vicinity: string;
  geometry: { location: { lat: number; lng: number } };
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  opening_hours?: { open_now: boolean };
  photos?: { photo_reference: string }[];
  types: string[];
}

export interface NearMePlace {
  placeId: string;
  name: string;
  vicinity: string;
  lat: number;
  lng: number;
  rating: number | null;
  userRatingsTotal: number;
  priceLevel: number | null;
  openNow: boolean | null;
  photoRef: string | null;
  types: string[];
}

export interface NearMeResponse {
  places: NearMePlace[];
  cityName: string;
  neighborhood: string;
}

// ── Reverse geocode: extract locality + sublocality from latlng ───────────────
async function reverseGeocode(lat: string, lng: string): Promise<{ cityName: string; neighborhood: string }> {
  try {
    const url =
      `${PLACES_BASE.replace("/place", "")}/geocode/json` +
      `?latlng=${lat},${lng}&key=${GKEY}&result_type=locality|sublocality|neighborhood`;
    const res = await fetch(url, { next: { revalidate: 0 } });
    const data = await res.json();

    let cityName = "";
    let neighborhood = "";

    for (const result of data.results ?? []) {
      for (const component of result.address_components ?? []) {
        if (!cityName && component.types.includes("locality")) cityName = component.long_name;
        if (!neighborhood && component.types.includes("sublocality_level_1")) neighborhood = component.long_name;
        if (!neighborhood && component.types.includes("neighborhood")) neighborhood = component.long_name;
      }
      if (cityName) break;
    }

    return { cityName: cityName || "your location", neighborhood };
  } catch {
    return { cityName: "your location", neighborhood: "" };
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const type = searchParams.get("type") ?? "restaurant";
  const radius = searchParams.get("radius") ?? "1500";

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });
  }

  if (!GKEY) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not configured" },
      { status: 500 }
    );
  }

  // Nearby Search + Reverse geocode in parallel
  const nearbyUrl =
    `${PLACES_BASE}/nearbysearch/json` +
    `?location=${lat},${lng}&radius=${radius}&type=${type}&rankby=prominence&key=${GKEY}`;

  const [nearbyRes, geoResult] = await Promise.all([
    fetch(nearbyUrl, { next: { revalidate: 0 } }),
    reverseGeocode(lat, lng),
  ]);

  const nearbyData = await nearbyRes.json();

  if (nearbyData.status !== "OK" && nearbyData.status !== "ZERO_RESULTS") {
    return NextResponse.json(
      { error: `Google Places API: ${nearbyData.status}`, detail: nearbyData.error_message ?? null },
      { status: 502 }
    );
  }

  const raw: GNearbyResult[] = nearbyData.results ?? [];

  const places: NearMePlace[] = raw.slice(0, 20).map((r) => ({
    placeId: r.place_id,
    name: r.name,
    vicinity: r.vicinity,
    lat: r.geometry.location.lat,
    lng: r.geometry.location.lng,
    rating: r.rating ?? null,
    userRatingsTotal: r.user_ratings_total ?? 0,
    priceLevel: r.price_level ?? null,
    openNow: r.opening_hours?.open_now ?? null,
    photoRef: r.photos?.[0]?.photo_reference ?? null,
    types: r.types ?? [],
  }));

  const response: NearMeResponse = {
    places,
    cityName: geoResult.cityName,
    neighborhood: geoResult.neighborhood,
  };

  return NextResponse.json(response, {
    headers: { "Cache-Control": "no-store" },
  });
}
