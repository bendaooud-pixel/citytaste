#!/usr/bin/env tsx
/**
 * Fetches real Google Places photos for every place in lib/data.ts,
 * then rewrites lib/data.ts with the resolved photo URLs.
 *
 * Usage:
 *   npx tsx scripts/fetch-real-photos.ts
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<your key>
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
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

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
if (!KEY) {
  console.error(
    "\n❌  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY not set in .env.local\n" +
    "   Add it then re-run: npx tsx scripts/fetch-real-photos.ts\n"
  );
  process.exit(1);
}

// ── City labels for accurate search ─────────────────────────────────────────
const CITY_LABEL: Record<string, string> = {
  paris:     "Paris, France",
  barcelona: "Barcelona, Spain",
  rome:      "Rome, Italy",
  marrakech: "Marrakech, Morocco",
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

/** STEP 1 — find the Google place_id for a place */
async function findPlaceId(name: string, citySlug: string): Promise<string | null> {
  const city = CITY_LABEL[citySlug] ?? citySlug;
  const input = encodeURIComponent(`${name} ${city}`);
  const url =
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json` +
    `?input=${input}&inputtype=textquery&fields=place_id,photos&key=${KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`findplace HTTP ${res.status}`);

  const json = await res.json() as {
    candidates?: Array<{ place_id: string }>;
    status: string;
    error_message?: string;
  };

  if (json.status === "REQUEST_DENIED")
    throw new Error(`API denied: ${json.error_message ?? "check API key / billing"}`);
  if (json.status !== "OK" && json.status !== "ZERO_RESULTS")
    throw new Error(`findplace status: ${json.status}`);

  return json.candidates?.[0]?.place_id ?? null;
}

/** STEP 2 — get up to 3 photo_references from place details */
async function getPhotoRefs(placeId: string): Promise<string[]> {
  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${placeId}&fields=photos&key=${KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`details HTTP ${res.status}`);

  const json = await res.json() as {
    result?: { photos?: Array<{ photo_reference: string }> };
    status: string;
  };

  if (json.status !== "OK") throw new Error(`details status: ${json.status}`);
  return (json.result?.photos ?? []).slice(0, 3).map((p) => p.photo_reference);
}

/** STEP 3 — resolve photo_reference to a stable CDN URL by following the redirect */
async function resolvePhotoUrl(ref: string): Promise<string> {
  const refUrl =
    `https://maps.googleapis.com/maps/api/place/photo` +
    `?maxwidth=800&photo_reference=${ref}&key=${KEY}`;
  try {
    const res = await fetch(refUrl, { redirect: "follow" });
    // The redirect lands on a key-free lh3.googleusercontent.com CDN URL
    return res.url !== refUrl ? res.url : refUrl;
  } catch {
    return refUrl;
  }
}

// ── Rewrite lib/data.ts ───────────────────────────────────────────────────────
function patchDataTs(photoMap: Record<string, string[]>) {
  let src = readFileSync(join(process.cwd(), "lib/data.ts"), "utf8");
  let updated = 0;

  for (const place of places) {
    const photos = photoMap[place.slug];
    if (!photos?.length) continue;

    const slugAnchor = `slug: "${place.slug}"`;
    const slugIdx = src.indexOf(slugAnchor);
    if (slugIdx === -1) continue;

    const window = src.slice(slugIdx, slugIdx + 3000);
    const match = window.match(/photos:\s*\[[\s\S]*?\]/);
    if (!match) continue;

    const newBlock =
      `photos: [\n      ` +
      photos.map((u) => `"${u}"`).join(`,\n      `) +
      `,\n    ]`;

    src =
      src.slice(0, slugIdx + match.index!) +
      newBlock +
      src.slice(slugIdx + match.index! + match[0].length);

    updated++;
  }

  writeFileSync(join(process.cwd(), "lib/data.ts"), src);
  return updated;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n📸  Fetching real Google Places photos for ${places.length} places…\n`);

  const photoMap: Record<string, string[]> = {};
  let ok = 0;
  let skipped = 0;

  for (let i = 0; i < places.length; i++) {
    const place = places[i];
    const prefix = `[${String(i + 1).padStart(3, " ")}/${places.length}]`;

    try {
      // STEP 1
      const placeId = await findPlaceId(place.name, place.citySlug);
      if (!placeId) {
        console.log(`${prefix} ⚠  ${place.name} — no Place ID found, keeping existing`);
        photoMap[place.slug] = place.photos;
        skipped++;
        await sleep(2000);
        continue;
      }

      // STEP 2
      const refs = await getPhotoRefs(placeId);
      if (!refs.length) {
        console.log(`${prefix} ⚠  ${place.name} — no photos available, keeping existing`);
        photoMap[place.slug] = place.photos;
        skipped++;
        await sleep(2000);
        continue;
      }

      // STEP 3
      const urls = await Promise.all(refs.map(resolvePhotoUrl));
      photoMap[place.slug] = urls;
      console.log(`${prefix} ✅ ${place.name} — ${urls.length} photos found`);
      ok++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`${prefix} ❌ ${place.name} — ${msg}`);
      photoMap[place.slug] = place.photos;
      skipped++;
    }

    // 2-second delay between places to avoid rate limiting
    await sleep(2000);
  }

  console.log(`\n📝  Rewriting lib/data.ts…`);
  const count = patchDataTs(photoMap);
  console.log(`   ✓ ${count} places updated`);

  console.log(`\n✅  Done — ${ok} fetched, ${skipped} kept original\n`);
  console.log(`   Next step:`);
  console.log(`   git add lib/data.ts && git commit -m "fix: real Google Places photos for all places" && git push\n`);
}

main().catch((e) => {
  console.error("\n💥 Fatal:", e instanceof Error ? e.message : e);
  process.exit(1);
});
