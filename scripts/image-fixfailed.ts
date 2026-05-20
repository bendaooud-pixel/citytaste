#!/usr/bin/env tsx
/**
 * Fix failed places from image-pipeline run.
 * Downloads images without cross-place dedup so each place
 * gets its own copy even if other places use the same source IDs.
 *
 * Usage: npx tsx scripts/image-fixfailed.ts
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";
import { createHash } from "crypto";
import sharp from "sharp";
import { places } from "../lib/data";
import type { PlaceImageData } from "../lib/types";

const ROOT = process.cwd();
const IMAGES_DIR = join(ROOT, "public", "images", "places");
const MANIFEST_JSON = join(IMAGES_DIR, "manifest.json");

function md5(buf: Buffer) {
  return createHash("md5").update(buf).digest("hex");
}

function upgradeUnsplashUrl(url: string): string {
  const m = url.match(/photo-([a-zA-Z0-9_-]+)/);
  if (!m) return url;
  return `https://images.unsplash.com/photo-${m[1]}?w=1600&q=90&auto=format&fit=crop`;
}

async function download(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(upgradeUnsplashUrl(url), {
      headers: { Accept: "image/*", "User-Agent": "CityTaste/1.0" },
      signal: AbortSignal.timeout(30_000),
      redirect: "follow",
    });
    if (!res.ok) return null;
    if (!(res.headers.get("content-type") ?? "").startsWith("image/")) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch { return null; }
}

async function processToWebP(buf: Buffer, destDir: string): Promise<PlaceImageData | null> {
  try {
    const meta = await sharp(buf).metadata();
    if (!meta.width || meta.width < 200) return null;

    const base = { fit: "cover" as const, position: "centre" as const };

    await sharp(buf).rotate().resize(1200, 800, base).webp({ quality: 85 }).toFile(join(destDir, "hero.webp"));
    await sharp(buf).rotate().resize(400, 300, base).webp({ quality: 75 }).toFile(join(destDir, "thumb.webp"));

    // Try to get gallery shots from remaining photos
    return null; // signal: do gallery separately
  } catch { return null; }
}

async function main() {
  console.log("\n🔧  Image Fix — Failed Places\n");

  let manifest: Record<string, PlaceImageData> = {};
  try { manifest = JSON.parse(readFileSync(MANIFEST_JSON, "utf8")); } catch {}

  // Find places not in manifest
  const failed = places.filter((p) => !manifest[p.slug]);
  console.log(`   Found ${failed.length} places without manifest entries\n`);

  if (failed.length === 0) {
    console.log("   All places have images! ✅\n");
    return;
  }

  let fixed = 0;
  let stillFailed = 0;

  for (const place of failed) {
    const destDir = join(IMAGES_DIR, place.citySlug, place.slug);
    mkdirSync(destDir, { recursive: true });

    const galleryPaths: string[] = [];
    let heroBlur: string | undefined;
    let heroHash = "";
    let heroOk = false;

    // Try each photo independently (no global dedup — per-place only)
    const seenLocal = new Set<string>();

    for (let i = 0; i < place.photos.length; i++) {
      const url = place.photos[i];
      if (!url) continue;

      const buf = await download(url);
      if (!buf) { await new Promise(r => setTimeout(r, 200)); continue; }

      const hash = md5(buf);
      if (seenLocal.has(hash)) continue;
      seenLocal.add(hash);

      try {
        const meta = await sharp(buf).metadata();
        if (!meta.width || meta.width < 200) continue;

        const base = { fit: "cover" as const, position: "centre" as const };

        if (!heroOk) {
          await sharp(buf).rotate().resize(1200, 800, base).webp({ quality: 85, effort: 4 }).toFile(join(destDir, "hero.webp"));
          await sharp(buf).rotate().resize(400, 300, base).webp({ quality: 75, effort: 4 }).toFile(join(destDir, "thumb.webp"));
          const blurBuf = await sharp(buf).rotate().resize(16, 12).webp({ quality: 20 }).toBuffer();
          heroBlur = `data:image/webp;base64,${blurBuf.toString("base64")}`;
          heroHash = hash;
          heroOk = true;
          galleryPaths.push(`/images/places/${place.citySlug}/${place.slug}/hero.webp`);
        }

        const gIdx = galleryPaths.length;
        if (gIdx < 4) {
          await sharp(buf).rotate().resize(800, 600, base).webp({ quality: 80, effort: 4 }).toFile(join(destDir, `gallery-${gIdx}.webp`));
          galleryPaths.push(`/images/places/${place.citySlug}/${place.slug}/gallery-${gIdx}.webp`);
        }
      } catch { continue; }

      await new Promise(r => setTimeout(r, 150));
    }

    if (!heroOk) {
      console.log(`  ❌  ${place.citySlug}/${place.slug} — still failed`);
      stillFailed++;
      continue;
    }

    manifest[place.slug] = {
      heroImage: `/images/places/${place.citySlug}/${place.slug}/hero.webp`,
      thumbnail: `/images/places/${place.citySlug}/${place.slug}/thumb.webp`,
      gallery: galleryPaths,
      imageAlt: `${place.name} — ${place.citySlug}`,
      imageCredits: "Unsplash",
      imageHash: heroHash,
      imageSource: "unsplash",
      imageVerified: true,
      blurDataURL: heroBlur,
    };

    console.log(`  ✅  ${place.citySlug}/${place.slug}  (${galleryPaths.length} gallery)`);
    fixed++;
  }

  writeFileSync(MANIFEST_JSON, JSON.stringify(manifest, null, 2));

  console.log(`\n  ✅  Fixed: ${fixed}`);
  console.log(`  ❌  Still failed: ${stillFailed}`);
  console.log(`  📋  Manifest entries: ${Object.keys(manifest).length}\n`);
}

main().catch(console.error);
