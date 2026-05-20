#!/usr/bin/env tsx
/**
 * CityTaste Image Validator
 * Reports: missing manifest entries, broken file references, duplicate hashes,
 * remote URLs still in manifest, storage totals.
 *
 * Usage: npx tsx scripts/image-validate.ts
 */

import { existsSync, readFileSync, statSync } from "fs";
import { join } from "path";
import { places } from "../lib/data";
import type { PlaceImageData } from "../lib/types";

const ROOT = process.cwd();
const MANIFEST_JSON = join(ROOT, "public", "images", "places", "manifest.json");

interface PlaceReport {
  slug: string;
  city: string;
  name: string;
  inManifest: boolean;
  heroOk: boolean;
  thumbOk: boolean;
  galleryCount: number;
  sizeKB: number;
  issues: string[];
}

function fileSize(path: string): number {
  try { return statSync(path).size; } catch { return 0; }
}

async function main() {
  console.log("\n🔍  CityTaste Image Validator\n");

  let manifest: Record<string, PlaceImageData> = {};
  try {
    manifest = JSON.parse(readFileSync(MANIFEST_JSON, "utf8"));
    console.log(`   Manifest: ${Object.keys(manifest).length} entries\n`);
  } catch {
    console.log("   ⚠  manifest.json not found. Run image-pipeline first.\n");
  }

  const reports: PlaceReport[] = [];
  const hashCount = new Map<string, string[]>();

  for (const place of places) {
    const entry = manifest[place.slug];
    const issues: string[] = [];
    let heroOk = false, thumbOk = false, galleryCount = 0, sizeKB = 0;

    if (!entry) {
      issues.push("not in manifest");
    } else {
      const heroPath = join(ROOT, "public", entry.heroImage);
      const thumbPath = join(ROOT, "public", entry.thumbnail);
      heroOk = existsSync(heroPath);
      thumbOk = existsSync(thumbPath);
      if (!heroOk) issues.push("hero.webp missing");
      if (!thumbOk) issues.push("thumb.webp missing");
      sizeKB += Math.round((fileSize(heroPath) + fileSize(thumbPath)) / 1024);

      for (const g of entry.gallery ?? []) {
        const gp = join(ROOT, "public", g);
        if (existsSync(gp)) { galleryCount++; sizeKB += Math.round(fileSize(gp) / 1024); }
        else issues.push(`${g.split("/").pop()} missing`);
      }

      if (entry.heroImage.startsWith("http")) issues.push("heroImage is remote URL");

      if (entry.imageHash) {
        const existing = hashCount.get(entry.imageHash) ?? [];
        existing.push(place.slug);
        hashCount.set(entry.imageHash, existing);
      }
    }

    // Check photos[] for empty entries
    const emptyPhotos = place.photos.filter((u) => !u || !u.trim()).length;
    if (emptyPhotos) issues.push(`${emptyPhotos} empty photos[] entries`);

    reports.push({
      slug: place.slug,
      city: place.citySlug,
      name: place.name,
      inManifest: !!entry,
      heroOk,
      thumbOk,
      galleryCount,
      sizeKB,
      issues,
    });
  }

  const dupeHashes = [...hashCount.entries()].filter(([, v]) => v.length > 1);
  const withIssues = reports.filter((r) => r.issues.length > 0);
  const okReports = reports.filter((r) => r.issues.length === 0 && r.inManifest);
  const totalKB = reports.reduce((s, r) => s + r.sizeKB, 0);

  console.log("━".repeat(58));
  console.log(`  ✅  ${okReports.length} places fully OK`);
  console.log(`  ⚠   ${reports.filter((r) => !r.inManifest).length} not in manifest`);
  console.log(`  ❌  ${withIssues.filter((r) => r.inManifest).length} with broken files`);
  console.log(`  🔁  ${dupeHashes.length} duplicate image hashes`);
  console.log(`  💾  ${(totalKB / 1024).toFixed(1)} MB total local storage`);
  console.log("━".repeat(58));

  if (withIssues.length > 0) {
    console.log("\n📋  Issues detected:\n");
    for (const r of withIssues) {
      console.log(`  [${r.city}] ${r.name} (${r.slug})`);
      r.issues.forEach((i) => console.log(`    → ${i}`));
    }
  }

  if (dupeHashes.length > 0) {
    console.log("\n🔁  Duplicate hashes:\n");
    for (const [hash, slugs] of dupeHashes) {
      console.log(`  ${hash.slice(0, 8)}… → ${slugs.join(", ")}`);
    }
  }

  if (withIssues.length > 0 || dupeHashes.length > 0) {
    console.log("\n💡  To fix: npx tsx scripts/image-pipeline.ts --force\n");
  } else {
    console.log("\n✅  All images validated — no issues found.\n");
  }
}

main().catch(console.error);
