#!/usr/bin/env tsx
/**
 * Fetches real Google Places photos for every place in lib/data.ts,
 * updates the Supabase `places` table, and rewrites lib/data.ts.
 *
 * Usage:
 *   npx tsx scripts/fetch-photos.ts
 *
 * Required env vars (loaded from .env.local automatically):
 *   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { createClient } from "@supabase/supabase-js";
import { places } from "../lib/data";

// ── Load .env.local ──────────────────────────────────────────────────────────
const envPath = join(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    const v = t.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[k]) process.env[k] = v;
  }
}

// ── Validate env ─────────────────────────────────────────────────────────────
const GOOGLE_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!GOOGLE_KEY) {
  console.error("❌  Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local");
  process.exit(1);
}
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const db = createClient(SUPABASE_URL, SERVICE_KEY);

// ── City display names for better search accuracy ────────────────────────────
const CITY_LABEL: Record<string, string> = {
  paris: "Paris, France",
  barcelona: "Barcelona, Spain",
  rome: "Rome, Italy",
};

// ── Google Places API helpers ────────────────────────────────────────────────

interface PlaceCandidate {
  place_id: string;
  name?: string;
}

interface PlaceDetails {
  result?: {
    photos?: Array<{ photo_reference: string }>;
  };
  status: string;
}

async function findPlaceId(name: string, citySlug: string): Promise<string | null> {
  const city = CITY_LABEL[citySlug] ?? citySlug;
  const input = encodeURIComponent(`${name} ${city}`);
  const url =
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json` +
    `?input=${input}&inputtype=textquery&fields=place_id,name&key=${GOOGLE_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`findplace HTTP ${res.status}`);
  const json = (await res.json()) as { candidates?: PlaceCandidate[]; status: string };

  if (json.status !== "OK" && json.status !== "ZERO_RESULTS") {
    throw new Error(`findplace status: ${json.status}`);
  }
  return json.candidates?.[0]?.place_id ?? null;
}

async function getPhotoRefs(placeId: string): Promise<string[]> {
  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${placeId}&fields=photos&key=${GOOGLE_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`details HTTP ${res.status}`);
  const json = (await res.json()) as PlaceDetails;

  if (json.status !== "OK") throw new Error(`details status: ${json.status}`);
  return (json.result?.photos ?? []).slice(0, 3).map((p) => p.photo_reference);
}

async function resolvePhotoUrl(ref: string): Promise<string> {
  // The photo endpoint redirects to a stable lh3.googleusercontent.com CDN URL.
  // Following the redirect gives us a key-free, permanent URL.
  const refUrl =
    `https://maps.googleapis.com/maps/api/place/photo` +
    `?maxwidth=800&photo_reference=${ref}&key=${GOOGLE_KEY}`;
  try {
    const res = await fetch(refUrl, { redirect: "follow" });
    // res.url is the final CDN URL after redirect; fall back to reference URL on plain 200
    return res.url !== refUrl ? res.url : refUrl;
  } catch {
    return refUrl;
  }
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔍  Fetching photos for ${places.length} places...\n`);

  // slug → resolved photo URLs (falls back to existing on any failure)
  const photoMap: Record<string, string[]> = {};

  for (let i = 0; i < places.length; i++) {
    const place = places[i];
    const label = `[${i + 1}/${places.length}] [${place.citySlug}] ${place.name}`;
    process.stdout.write(`${label} ... `);

    try {
      const placeId = await findPlaceId(place.name, place.citySlug);
      if (!placeId) {
        console.log("⚠  no Place ID — keeping existing photos");
        photoMap[place.slug] = place.photos;
        await sleep(200);
        continue;
      }

      await sleep(100); // brief gap between calls

      const refs = await getPhotoRefs(placeId);
      if (!refs.length) {
        console.log("⚠  no photos available — keeping existing photos");
        photoMap[place.slug] = place.photos;
        await sleep(200);
        continue;
      }

      const urls = await Promise.all(refs.map(resolvePhotoUrl));
      photoMap[place.slug] = urls;
      console.log(`✓  ${urls.length} photo(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`✗  ${msg} — keeping existing photos`);
      photoMap[place.slug] = place.photos;
    }

    // ~4 requests per place at this cadence → well within QPM limits
    await sleep(300);
  }

  // ── Update Supabase ─────────────────────────────────────────────────────────
  console.log("\n📦  Updating Supabase...");
  let sbOk = 0;
  let sbErr = 0;

  for (const place of places) {
    const photos = photoMap[place.slug];
    if (!photos?.length) continue;

    const { error } = await db
      .from("places")
      .update({ photos })
      .eq("id", place.id);

    if (error) {
      console.log(`  ✗ ${place.slug}: ${error.message}`);
      sbErr++;
    } else {
      sbOk++;
    }
  }

  console.log(`  ✓ ${sbOk} updated, ${sbErr} errors`);

  // ── Rewrite lib/data.ts ─────────────────────────────────────────────────────
  console.log("\n📝  Updating lib/data.ts...");
  let src = readFileSync(join(process.cwd(), "lib/data.ts"), "utf8");

  let dataUpdated = 0;
  for (const place of places) {
    const photos = photoMap[place.slug];
    if (!photos?.length) continue;

    // Match the photos: [...] block that follows this place's slug field.
    // Using a two-step anchor: first find the slug, then replace the photos block.
    const slugAnchor = `slug: "${place.slug}"`;
    const slugIdx = src.indexOf(slugAnchor);
    if (slugIdx === -1) continue;

    // Find the photos: [...] block within ~3000 chars after the slug
    const searchWindow = src.slice(slugIdx, slugIdx + 3000);
    const photosMatch = searchWindow.match(/photos:\s*\[[\s\S]*?\]/);
    if (!photosMatch) continue;

    const newBlock =
      `photos: [\n      ` +
      photos.map((u) => `"${u}"`).join(`,\n      `) +
      `,\n    ]`;

    src =
      src.slice(0, slugIdx + photosMatch.index!) +
      newBlock +
      src.slice(slugIdx + photosMatch.index! + photosMatch[0].length);

    dataUpdated++;
  }

  writeFileSync(join(process.cwd(), "lib/data.ts"), src);
  console.log(`  ✓ ${dataUpdated} places updated in lib/data.ts`);

  console.log("\n✅  Done!\n");
  console.log('   git add . && git commit -m "feat: real Google Places photos" && git push\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
