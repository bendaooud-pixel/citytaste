#!/usr/bin/env tsx
/**
 * CityTaste Image Pipeline
 *
 * Downloads high-res images from Unsplash, converts to WebP (hero/gallery/thumb),
 * detects duplicates via MD5, generates blur placeholders, writes manifest.json.
 *
 * Storage: /public/images/places/[city]/[slug]/
 *   hero.webp      1200×800 q85
 *   thumb.webp     400×300  q75
 *   gallery-1.webp 800×600  q80  (same as hero source)
 *   gallery-2.webp 800×600  q80  (from photos[1])
 *   gallery-3.webp 800×600  q80  (from photos[2])
 *
 * Usage:
 *   npx tsx scripts/image-pipeline.ts              # all places
 *   npx tsx scripts/image-pipeline.ts --city paris # one city
 *   npx tsx scripts/image-pipeline.ts --slug septime
 *   npx tsx scripts/image-pipeline.ts --force       # re-download all
 *   npx tsx scripts/image-pipeline.ts --validate    # check only
 *
 * Optional env vars for search mode (not required):
 *   UNSPLASH_ACCESS_KEY=...
 *   PEXELS_API_KEY=...
 */

import {
  existsSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  readdirSync,
} from "fs";
import { join } from "path";
import { createHash } from "crypto";
import sharp from "sharp";
import { places } from "../lib/data";
import type { Place, PlaceImageData } from "../lib/types";

// ── Load .env.local ────────────────────────────────────────────────────────
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

// ── Config ────────────────────────────────────────────────────────────────

const ROOT = process.cwd();
const IMAGES_DIR = join(ROOT, "public", "images", "places");
const MANIFEST_JSON = join(IMAGES_DIR, "manifest.json");
const CONCURRENCY = 4;
const DELAY_MS = 120; // ms between Unsplash CDN requests

const HERO_W = 1200, HERO_H = 800;
const GALLERY_W = 800, GALLERY_H = 600;
const THUMB_W = 400, THUMB_H = 300;
const BLUR_W = 16, BLUR_H = 12;

// Parse CLI args
const args = process.argv.slice(2);
const filterCity = args.includes("--city")
  ? args[args.indexOf("--city") + 1]
  : null;
const filterSlug = args.includes("--slug")
  ? args[args.indexOf("--slug") + 1]
  : null;
const validateOnly = args.includes("--validate");
const forceRegen = args.includes("--force");

// ── Types ──────────────────────────────────────────────────────────────────

interface ProcessResult {
  slug: string;
  city: string;
  name: string;
  status: "ok" | "skipped" | "error" | "partial";
  message?: string;
  filesWritten: number;
  duplicatesDetected: number;
}

// ── Utilities ─────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function md5(buf: Buffer): string {
  return createHash("md5").update(buf).digest("hex");
}

function upgradeUnsplashUrl(url: string): string {
  const m = url.match(/photo-([a-zA-Z0-9_-]+)/);
  if (!m) return url;
  return `https://images.unsplash.com/photo-${m[1]}?w=1600&q=90&auto=format&fit=crop`;
}

async function downloadImage(url: string): Promise<Buffer | null> {
  const fetchUrl = url.includes("unsplash.com")
    ? upgradeUnsplashUrl(url)
    : url;
  try {
    const res = await fetch(fetchUrl, {
      headers: {
        "User-Agent":
          "CityTaste/1.0 image-pipeline (https://citytaste.co)",
        Accept: "image/webp,image/*",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") ?? "";
    if (!ct.startsWith("image/")) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

// ── Image processing ───────────────────────────────────────────────────────

interface ProcessedImage {
  hash: string;
  blurDataURL?: string;
}

async function writeHeroAndThumb(
  buf: Buffer,
  destDir: string
): Promise<ProcessedImage | null> {
  try {
    const base = sharp(buf).rotate(); // respect EXIF rotation
    const meta = await base.metadata();
    if (!meta.width || meta.width < 300) return null;

    await sharp(buf)
      .rotate()
      .resize(HERO_W, HERO_H, { fit: "cover", position: "centre" })
      .webp({ quality: 85, effort: 4 })
      .toFile(join(destDir, "hero.webp"));

    await sharp(buf)
      .rotate()
      .resize(THUMB_W, THUMB_H, { fit: "cover", position: "centre" })
      .webp({ quality: 75, effort: 4 })
      .toFile(join(destDir, "thumb.webp"));

    const blurBuf = await sharp(buf)
      .rotate()
      .resize(BLUR_W, BLUR_H, { fit: "cover" })
      .webp({ quality: 20 })
      .toBuffer();

    return {
      hash: md5(buf),
      blurDataURL: `data:image/webp;base64,${blurBuf.toString("base64")}`,
    };
  } catch {
    return null;
  }
}

async function writeGalleryImage(
  buf: Buffer,
  destDir: string,
  idx: number
): Promise<string | null> {
  try {
    const meta = await sharp(buf).metadata();
    if (!meta.width || meta.width < 300) return null;
    const outPath = join(destDir, `gallery-${idx}.webp`);
    await sharp(buf)
      .rotate()
      .resize(GALLERY_W, GALLERY_H, { fit: "cover", position: "centre" })
      .webp({ quality: 80, effort: 4 })
      .toFile(outPath);
    return outPath;
  } catch {
    return null;
  }
}

// ── Optional: Unsplash/Pexels search ──────────────────────────────────────

async function searchUnsplash(query: string): Promise<string[]> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return [];
  try {
    const url =
      `https://api.unsplash.com/search/photos` +
      `?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape&content_filter=high`;
    const res = await fetch(url, {
      headers: { Authorization: `Client-ID ${key}` },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as {
      results?: Array<{ urls: { regular: string } }>;
    };
    return data.results?.map((r) => r.urls.regular) ?? [];
  } catch {
    return [];
  }
}

async function searchPexels(query: string): Promise<string[]> {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return [];
  try {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`;
    const res = await fetch(url, {
      headers: { Authorization: key },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as {
      photos?: Array<{ src: { large2x: string } }>;
    };
    return data.photos?.map((p) => p.src.large2x) ?? [];
  } catch {
    return [];
  }
}

function buildSearchQueries(place: Place): string[] {
  const catMap: Record<string, string> = {
    restaurants: "restaurant fine dining interior",
    cafes: "cafe coffee shop cozy",
    bars: "rooftop bar cocktail city view",
    brunch: "brunch cafe morning food",
    patisseries: "patisserie bakery pastry",
    markets: "food market street vendors",
    halal: "halal restaurant food",
    romantic: "romantic restaurant candlelit dinner",
    activities: "city cultural activity",
    monuments: "historic monument landmark",
    museums: "museum interior gallery",
    "cheap-eats": "casual restaurant street food",
    desserts: "dessert sweets cafe",
    "family-friendly": "family restaurant casual dining",
  };
  const cat = place.categories[0];
  const catDesc = catMap[cat] ?? "restaurant food";
  return [
    `${place.citySlug} ${catDesc} luxury cinematic`,
    `${catDesc} editorial photography`,
    `${place.citySlug} food dining premium`,
  ];
}

// ── Process one place ──────────────────────────────────────────────────────

async function processPlace(
  place: Place,
  seenHashes: Set<string>,
  manifest: Record<string, PlaceImageData>
): Promise<{ result: ProcessResult; entry?: PlaceImageData }> {
  const destDir = join(IMAGES_DIR, place.citySlug, place.slug);
  const heroPath = join(destDir, "hero.webp");
  const thumbPath = join(destDir, "thumb.webp");

  if (!forceRegen && existsSync(heroPath) && existsSync(thumbPath)) {
    return {
      result: {
        slug: place.slug,
        city: place.citySlug,
        name: place.name,
        status: "skipped",
        message: "already exists",
        filesWritten: 0,
        duplicatesDetected: 0,
      },
      entry: manifest[place.slug],
    };
  }

  mkdirSync(destDir, { recursive: true });

  // Build candidate URL list
  let candidates = [...place.photos].filter(Boolean);

  if (process.env.UNSPLASH_ACCESS_KEY || process.env.PEXELS_API_KEY) {
    const queries = buildSearchQueries(place);
    for (const q of queries.slice(0, 2)) {
      const [ua, pa] = await Promise.all([
        searchUnsplash(q),
        searchPexels(q),
      ]);
      candidates = [...ua, ...pa, ...candidates];
      if (candidates.length >= 6) break;
      await sleep(300);
    }
  }

  if (!candidates.length) {
    return {
      result: {
        slug: place.slug,
        city: place.citySlug,
        name: place.name,
        status: "error",
        message: "no candidates",
        filesWritten: 0,
        duplicatesDetected: 0,
      },
    };
  }

  let heroResult: ProcessedImage | null = null;
  const galleryLocalPaths: string[] = [];
  let galleryIdx = 1;
  let filesWritten = 0;
  let dupes = 0;

  for (const url of candidates.slice(0, 5)) {
    if (heroResult && galleryIdx > 3) break;

    const buf = await downloadImage(url);
    if (!buf) continue;

    const hash = md5(buf);
    if (seenHashes.has(hash)) {
      dupes++;
      continue;
    }
    seenHashes.add(hash);

    if (!heroResult) {
      heroResult = await writeHeroAndThumb(buf, destDir);
      if (heroResult) {
        filesWritten += 2;
        // gallery-1 is the hero source at gallery size
        const g1 = await writeGalleryImage(buf, destDir, 1);
        if (g1) {
          galleryLocalPaths.push(
            `/images/places/${place.citySlug}/${place.slug}/gallery-1.webp`
          );
          filesWritten++;
          galleryIdx = 2;
        }
      }
    } else {
      const g = await writeGalleryImage(buf, destDir, galleryIdx);
      if (g) {
        galleryLocalPaths.push(
          `/images/places/${place.citySlug}/${place.slug}/gallery-${galleryIdx}.webp`
        );
        filesWritten++;
        galleryIdx++;
      }
    }

    await sleep(DELAY_MS);
  }

  if (!heroResult) {
    return {
      result: {
        slug: place.slug,
        city: place.citySlug,
        name: place.name,
        status: "error",
        message: "all downloads failed",
        filesWritten: 0,
        duplicatesDetected: dupes,
      },
    };
  }

  const firstUrl = candidates[0] ?? "";
  const source: PlaceImageData["imageSource"] = firstUrl.includes("unsplash")
    ? "unsplash"
    : firstUrl.includes("pexels")
    ? "pexels"
    : "local";

  const allGallery = [
    `/images/places/${place.citySlug}/${place.slug}/hero.webp`,
    ...galleryLocalPaths.filter(
      (p) => !p.endsWith("gallery-1.webp") || galleryLocalPaths.includes(p)
    ),
  ];

  // Deduplicate gallery list
  const seen = new Set<string>();
  const gallery = allGallery.filter((p) => {
    if (seen.has(p)) return false;
    seen.add(p);
    return true;
  });

  const entry: PlaceImageData = {
    heroImage: `/images/places/${place.citySlug}/${place.slug}/hero.webp`,
    thumbnail: `/images/places/${place.citySlug}/${place.slug}/thumb.webp`,
    gallery,
    imageAlt: `${place.name} — ${place.citySlug}`,
    imageCredits: source === "unsplash" ? "Unsplash" : source === "pexels" ? "Pexels" : "CityTaste",
    imageHash: heroResult.hash,
    imageSource: source,
    imageVerified: true,
    blurDataURL: heroResult.blurDataURL,
  };

  return {
    result: {
      slug: place.slug,
      city: place.citySlug,
      name: place.name,
      status: "ok",
      filesWritten,
      duplicatesDetected: dupes,
    },
    entry,
  };
}

// ── Validate mode ─────────────────────────────────────────────────────────

function runValidation(): void {
  console.log("\n🔍  Validating manifest...\n");
  let m: Record<string, PlaceImageData> = {};
  try {
    m = JSON.parse(readFileSync(MANIFEST_JSON, "utf8"));
  } catch {
    console.log("❌  manifest.json not found.\n");
    return;
  }
  let ok = 0, broken = 0, missing = 0;
  for (const p of places) {
    if (!m[p.slug]) { missing++; continue; }
    const e = m[p.slug];
    const heroOk = existsSync(join(ROOT, "public", e.heroImage));
    const thumbOk = existsSync(join(ROOT, "public", e.thumbnail));
    if (heroOk && thumbOk) ok++;
    else { console.log(`  ❌  ${p.slug} — files missing`); broken++; }
  }
  console.log(`  ✅  ${ok} OK  ⚠ ${missing} missing  ❌ ${broken} broken\n`);
}

// ── Concurrency runner ────────────────────────────────────────────────────

async function runConcurrent<T>(
  tasks: Array<() => Promise<T>>,
  limit: number,
  onDone: (r: T, i: number, n: number) => void
): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let cur = 0;
  async function worker() {
    while (cur < tasks.length) {
      const i = cur++;
      results[i] = await tasks[i]();
      onDone(results[i], i + 1, tasks.length);
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
  return results;
}

// ── Main ──────────────────────────────────────────────────────────────────

async function main() {
  if (validateOnly) { runValidation(); return; }

  let targets = [...places];
  if (filterCity) targets = targets.filter((p) => p.citySlug === filterCity);
  if (filterSlug) targets = targets.filter((p) => p.slug === filterSlug);

  const hasSearchKeys = !!(process.env.UNSPLASH_ACCESS_KEY || process.env.PEXELS_API_KEY);
  const mode = hasSearchKeys ? "search+harvest" : "harvest (existing URLs)";

  console.log(`\n🖼   CityTaste Image Pipeline`);
  console.log(`    Mode      : ${mode}`);
  console.log(`    Places    : ${targets.length}`);
  console.log(`    Concurrency: ${CONCURRENCY}`);
  if (filterCity) console.log(`    City filter: ${filterCity}`);
  if (forceRegen) console.log(`    Force regen: yes`);
  console.log();

  mkdirSync(IMAGES_DIR, { recursive: true });

  let existingManifest: Record<string, PlaceImageData> = {};
  try {
    existingManifest = JSON.parse(readFileSync(MANIFEST_JSON, "utf8"));
  } catch { /* fresh start */ }

  const seenHashes = new Set<string>(
    Object.values(existingManifest)
      .map((e) => e.imageHash)
      .filter(Boolean)
  );

  const updatedEntries: Record<string, PlaceImageData> = {};
  const stats = { ok: 0, skipped: 0, error: 0, partial: 0, dupes: 0, files: 0 };

  type TaskOutput = { result: ProcessResult; entry?: PlaceImageData };

  const tasks = targets.map((place) => async (): Promise<TaskOutput> => {
    return processPlace(place, seenHashes, existingManifest);
  });

  await runConcurrent<TaskOutput>(tasks, CONCURRENCY, ({ result, entry }, idx, total) => {
    const icon =
      result.status === "ok" ? "✅" :
      result.status === "skipped" ? "⏭ " :
      result.status === "partial" ? "⚠ " : "❌";
    const pad = String(idx).padStart(3, " ");
    console.log(
      `  [${pad}/${total}] ${icon} ${result.city.padEnd(12)} ${result.slug}` +
      (result.message ? `  — ${result.message}` : "") +
      (result.filesWritten > 0 ? `  (${result.filesWritten} files)` : "")
    );
    stats[result.status]++;
    stats.dupes += result.duplicatesDetected;
    stats.files += result.filesWritten;
    if (entry) updatedEntries[result.slug] = entry;
    else if (result.status === "skipped" && existingManifest[result.slug]) {
      updatedEntries[result.slug] = existingManifest[result.slug];
    }
  });

  const finalManifest = { ...existingManifest, ...updatedEntries };
  writeFileSync(MANIFEST_JSON, JSON.stringify(finalManifest, null, 2));

  console.log(`\n${"─".repeat(55)}`);
  console.log(`  ✅  ${stats.ok} processed`);
  console.log(`  ⏭   ${stats.skipped} skipped (already exist)`);
  console.log(`  ❌  ${stats.error} errors`);
  console.log(`  🔁  ${stats.dupes} duplicates detected`);
  console.log(`  📁  ${stats.files} WebP files written`);
  console.log(`  📋  ${Object.keys(finalManifest).length} manifest entries`);
  console.log(`\n  manifest → ${MANIFEST_JSON}`);
  console.log(`\n  Next: git add public/images lib/imageManifest.ts`);
  console.log(`        git commit -m "feat: local WebP image pipeline"\n`);
}

main().catch((e) => {
  console.error("\n💥", e instanceof Error ? e.message : e);
  process.exit(1);
});
