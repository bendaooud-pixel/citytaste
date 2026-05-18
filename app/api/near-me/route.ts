import { NextResponse } from "next/server";

const FSQ_KEY = process.env.FOURSQUARE_API_KEY;
const FSQ_BASE = "https://api.foursquare.com/v3/places/search";

// ── Foursquare category IDs ───────────────────────────────────────────────────
const CATEGORY_IDS: Record<string, string> = {
  restaurant:         "13065",
  cafe:               "13032",
  bar:                "13003",
  tourist_attraction: "16019",
};

// ── Foursquare raw result shape ───────────────────────────────────────────────
interface FsqPhoto {
  prefix: string;
  suffix: string;
  width: number;
  height: number;
}

interface FsqResult {
  fsq_id: string;
  name: string;
  location: { formatted_address?: string; address?: string };
  geocodes: { main: { latitude: number; longitude: number } };
  rating?: number;
  stats?: { total_ratings?: number };
  price?: number;
  hours?: { open_now?: boolean };
  photos?: FsqPhoto[];
  categories?: { name: string }[];
}

// ── Public types consumed by the page ─────────────────────────────────────────
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
  photoUrl: string | null;
  types: string[];
}

export interface NearMeResponse {
  places: NearMePlace[];
  cityName: string;
  neighborhood: string;
}

// ── Safe JSON helper — never throws on empty / HTML bodies ────────────────────
async function safeJson(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text.trim()) throw new Error(`Empty body (HTTP ${res.status})`);
  return JSON.parse(text);
}

// ── Reverse geocode via Nominatim (free, no API key) ─────────────────────────
async function reverseGeocode(
  lat: string,
  lng: string
): Promise<{ cityName: string; neighborhood: string }> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=12`,
      {
        headers: { "User-Agent": "CityTaste/1.0 (contact@citytaste.co)" },
        // "next" cache hints are only valid in Server Components — use standard fetch options here
        cache: "no-store",
      }
    );
    const data = (await safeJson(res)) as {
      address?: Record<string, string>;
    };
    const addr = data.address ?? {};
    const cityName =
      addr.city || addr.town || addr.village || addr.county || addr.state || "your location";
    const neighborhood =
      addr.suburb || addr.neighbourhood || addr.quarter || addr.district || "";
    return { cityName, neighborhood };
  } catch {
    return { cityName: "your location", neighborhood: "" };
  }
}

// ── Photo URL builder ─────────────────────────────────────────────────────────
function buildPhotoUrl(photo: FsqPhoto | undefined): string | null {
  if (!photo?.prefix || !photo?.suffix) return null;
  const w = Math.min(photo.width || 800, 800);
  const h = Math.round((w / (photo.width || w)) * (photo.height || w));
  return `${photo.prefix}${w}x${h}${photo.suffix}`;
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const type = searchParams.get("type") ?? "restaurant";
    const radius = searchParams.get("radius") ?? "1500";

    if (!lat || !lng) {
      return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });
    }

    if (!FSQ_KEY) {
      return NextResponse.json(
        { error: "FOURSQUARE_API_KEY is not configured in .env.local" },
        { status: 500 }
      );
    }

    const categoryId = CATEGORY_IDS[type] ?? CATEGORY_IDS.restaurant;
    const url =
      `${FSQ_BASE}` +
      `?ll=${lat},${lng}` +
      `&radius=${radius}` +
      `&categories=${categoryId}` +
      `&limit=20` +
      `&sort=RELEVANCE` +
      `&fields=fsq_id,name,location,geocodes,rating,stats,photos,hours,price,categories`;

    const [placesRes, geoResult] = await Promise.all([
      fetch(url, {
        headers: { Authorization: FSQ_KEY, Accept: "application/json" },
        cache: "no-store",
      }),
      reverseGeocode(lat, lng),
    ]);

    if (!placesRes.ok) {
      const body = await placesRes.text();
      return NextResponse.json(
        { error: `Foursquare API returned ${placesRes.status}`, detail: body.slice(0, 300) },
        { status: 502 }
      );
    }

    const data = (await safeJson(placesRes)) as { results?: FsqResult[] };
    const raw: FsqResult[] = data.results ?? [];

    const places: NearMePlace[] = raw.map((r) => ({
      placeId: r.fsq_id,
      name: r.name,
      vicinity: r.location?.formatted_address || r.location?.address || "",
      lat: r.geocodes?.main?.latitude ?? 0,
      lng: r.geocodes?.main?.longitude ?? 0,
      rating: r.rating != null ? parseFloat((r.rating / 2).toFixed(1)) : null,
      userRatingsTotal: r.stats?.total_ratings ?? 0,
      priceLevel: r.price ?? null,
      openNow: r.hours?.open_now ?? null,
      photoUrl: buildPhotoUrl(r.photos?.[0]),
      types: r.categories?.map((c) => c.name) ?? [],
    }));

    const response: NearMeResponse = {
      places,
      cityName: geoResult.cityName,
      neighborhood: geoResult.neighborhood,
    };

    return NextResponse.json(response, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("[/api/near-me]", err);
    return NextResponse.json(
      { error: "Internal server error", detail: String(err) },
      { status: 500 }
    );
  }
}
