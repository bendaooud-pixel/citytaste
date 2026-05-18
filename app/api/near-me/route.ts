import { NextResponse } from "next/server";

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

// ── Fallback Unsplash photos by amenity type ──────────────────────────────────
const FALLBACK_PHOTO: Record<string, string> = {
  restaurant:  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  fast_food:   "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
  food_court:  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
  cafe:        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80",
  bar:         "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
  pub:         "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
  nightclub:   "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
  biergarten:  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
  attraction:  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  museum:      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=80",
  gallery:     "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=80",
  monument:    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  castle:      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  _default:    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
};

// ── Overpass query builder ────────────────────────────────────────────────────
function buildQuery(lat: string, lng: string, type: string, radius: string): string {
  const a = `around:${radius},${lat},${lng}`;

  if (type === "tourist_attraction") {
    return (
      `[out:json][timeout:15];` +
      `(` +
      `node["tourism"~"^(attraction|museum|gallery|artwork|viewpoint)$"](${a});` +
      `way["tourism"~"^(attraction|museum|gallery|artwork|viewpoint)$"](${a});` +
      `node["historic"~"^(monument|memorial|castle|ruins|church)$"](${a});` +
      `way["historic"~"^(monument|memorial|castle|ruins|church)$"](${a});` +
      `);out body center 20;`
    );
  }

  const patterns: Record<string, string> = {
    restaurant: "restaurant|fast_food|food_court",
    cafe:       "cafe",
    bar:        "bar|pub|nightclub|biergarten",
  };
  const pattern = patterns[type] ?? "restaurant|fast_food";

  return (
    `[out:json][timeout:15];` +
    `(` +
    `node["amenity"~"^(${pattern})$"](${a});` +
    `way["amenity"~"^(${pattern})$"](${a});` +
    `);out body center 20;`
  );
}

// ── Basic OSM opening_hours → open now ────────────────────────────────────────
function parseOpenNow(oh: string | undefined): boolean | null {
  if (!oh) return null;
  const s = oh.trim();
  if (s === "24/7" || s === "yes" || s === "open") return true;
  if (s === "closed" || s === "no" || s === "off") return false;

  const now = new Date();
  const dow = now.getDay(); // 0=Sun … 6=Sat
  const cur = now.getHours() * 60 + now.getMinutes();

  const DAY: Record<string, number> = {
    Mo: 1, Tu: 2, We: 3, Th: 4, Fr: 5, Sa: 6, Su: 0,
  };

  function expandDays(token: string): number[] {
    const range = token.match(/^([A-Za-z]{2})-([A-Za-z]{2})$/);
    if (range) {
      const start = DAY[range[1]];
      const end = DAY[range[2]];
      if (start == null || end == null) return [];
      const out: number[] = [];
      let d = start;
      for (let i = 0; i <= 7; i++) {
        out.push(d);
        if (d === end) break;
        d = d === 6 ? 0 : d + 1;
      }
      return out;
    }
    return token.split(",").map((t) => DAY[t.trim()]).filter((n) => n != null) as number[];
  }

  function mins(t: string) {
    const [h, m = 0] = t.split(":").map(Number);
    return h * 60 + m;
  }

  let parsed = false;
  for (const rule of s.split(";")) {
    const r = rule.trim();
    if (!r || r === "off" || r === "closed") continue;

    // "Mo-Fr 09:00-22:00"
    const full = r.match(/^([A-Za-z,\-]+)\s+(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})$/);
    // "09:00-22:00" (every day)
    const timeOnly = r.match(/^(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})$/);

    if (full) {
      const days = expandDays(full[1]);
      if (!days.includes(dow)) continue;
      parsed = true;
      const start = mins(full[2]);
      let end = mins(full[3]);
      if (end === 0) end = 1440;
      if (end < start) end += 1440;
      if (cur >= start && cur < end) return true;
    } else if (timeOnly) {
      parsed = true;
      const start = mins(timeOnly[1]);
      let end = mins(timeOnly[2]);
      if (end === 0) end = 1440;
      if (end < start) end += 1440;
      if (cur >= start && cur < end) return true;
    }
  }

  return parsed ? false : null;
}

// ── Format address from OSM tags ──────────────────────────────────────────────
function formatAddress(tags: Record<string, string>): string {
  if (tags["addr:street"] && tags["addr:housenumber"])
    return `${tags["addr:street"]} ${tags["addr:housenumber"]}`;
  if (tags["addr:street"]) return tags["addr:street"];
  if (tags["addr:full"]) return tags["addr:full"];
  return "";
}

// ── Reverse geocode via Nominatim (free, no key needed) ───────────────────────
async function reverseGeocode(lat: string, lng: string): Promise<{ cityName: string; neighborhood: string }> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=12`,
      { headers: { "User-Agent": "CityTaste/1.0 (contact@citytaste.co)" }, cache: "no-store" }
    );
    const text = await res.text();
    if (!text.trim()) return { cityName: "your location", neighborhood: "" };
    const data = JSON.parse(text) as { address?: Record<string, string> };
    const addr = data.address ?? {};
    return {
      cityName:     addr.city || addr.town || addr.village || addr.county || "your location",
      neighborhood: addr.suburb || addr.neighbourhood || addr.quarter || "",
    };
  } catch {
    return { cityName: "your location", neighborhood: "" };
  }
}

// ── OSM element shape ─────────────────────────────────────────────────────────
interface OsmElement {
  type: "node" | "way";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags: Record<string, string>;
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

    const query = buildQuery(lat, lng, type, radius);

    const [osmRes, geoResult] = await Promise.all([
      fetch(
        "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query),
        {
          headers: {
            "User-Agent": "CityTaste/1.0 (contact@citytaste.co)",
            "Accept": "application/json",
          },
          cache: "no-store",
        }
      ),
      reverseGeocode(lat, lng),
    ]);

    if (!osmRes.ok) {
      const body = await osmRes.text();
      return NextResponse.json(
        { error: `Overpass API error ${osmRes.status}`, detail: body.slice(0, 300) },
        { status: 502 }
      );
    }

    const text = await osmRes.text();
    if (!text.trim()) {
      return NextResponse.json({ error: "Empty response from Overpass API" }, { status: 502 });
    }

    let data: { elements?: OsmElement[] };
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "Invalid JSON from Overpass API" }, { status: 502 });
    }

    const elements = (data.elements ?? []).filter((e) => e.tags?.name);

    const places: NearMePlace[] = elements.slice(0, 20).map((e) => {
      const elLat = e.lat ?? e.center?.lat ?? 0;
      const elLng = e.lon ?? e.center?.lon ?? 0;
      const amenity = e.tags.amenity || e.tags.tourism || e.tags.historic || type;

      return {
        placeId:          `${e.type}/${e.id}`,
        name:             e.tags.name,
        vicinity:         formatAddress(e.tags),
        lat:              elLat,
        lng:              elLng,
        rating:           e.tags.stars ? parseFloat(e.tags.stars) : null,
        userRatingsTotal: 0,
        priceLevel:       null,
        openNow:          parseOpenNow(e.tags.opening_hours),
        photoUrl:         FALLBACK_PHOTO[amenity] ?? FALLBACK_PHOTO._default,
        types:            [amenity],
      };
    });

    return NextResponse.json(
      { places, cityName: geoResult.cityName, neighborhood: geoResult.neighborhood },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[/api/near-me]", err);
    return NextResponse.json(
      { error: "Internal server error", detail: String(err) },
      { status: 500 }
    );
  }
}
