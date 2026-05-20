#!/usr/bin/env tsx
/**
 * CityTaste Image Report Generator
 * Outputs a markdown report to ./image-report.md
 *
 * Usage: npx tsx scripts/image-report.ts
 */

import { existsSync, readFileSync, writeFileSync, statSync } from "fs";
import { join } from "path";
import { places, cities } from "../lib/data";
import type { PlaceImageData } from "../lib/types";

const ROOT = process.cwd();
const MANIFEST_JSON = join(ROOT, "public", "images", "places", "manifest.json");
const REPORT_OUT = join(ROOT, "image-report.md");

async function main() {
  const ts = new Date().toISOString();
  let manifest: Record<string, PlaceImageData> = {};
  try {
    manifest = JSON.parse(readFileSync(MANIFEST_JSON, "utf8"));
  } catch { /* no manifest */ }

  const covered = places.filter((p) => manifest[p.slug]).length;

  // Storage stats
  let totalBytes = 0, totalFiles = 0;
  for (const entry of Object.values(manifest)) {
    for (const path of [entry.heroImage, entry.thumbnail, ...(entry.gallery ?? [])]) {
      const fp = join(ROOT, "public", path);
      if (existsSync(fp)) {
        totalBytes += statSync(fp).size;
        totalFiles++;
      }
    }
  }

  const lines: string[] = [
    `# CityTaste — Image System Report`,
    ``,
    `_Generated: ${ts}_`,
    ``,
    `## Summary`,
    ``,
    `| Metric | Value |`,
    `|--------|-------|`,
    `| Total places | ${places.length} |`,
    `| Manifest entries | Object.keys(manifest).length} |`,
    `| Coverage | ${Math.round((covered / places.length) * 100)}% |`,
    `| WebP files | ${totalFiles} |`,
    `| Total storage | ${(totalBytes / 1024 / 1024).toFixed(1)} MB |`,
    `| Avg per place | ${covered > 0 ? Math.round(totalBytes / 1024 / covered) : 0} KB |`,
    ``,
    `## By City`,
    ``,
    `| City | Places | Covered | Hero ✓ | Thumb ✓ | Gallery avg |`,
    `|------|--------|---------|--------|---------|-------------|`,
  ];

  for (const city of cities) {
    const cp = places.filter((p) => p.citySlug === city.slug);
    const cov = cp.filter((p) => manifest[p.slug]).length;
    const heroOk = cp.filter((p) => {
      const e = manifest[p.slug];
      return e && existsSync(join(ROOT, "public", e.heroImage));
    }).length;
    const thumbOk = cp.filter((p) => {
      const e = manifest[p.slug];
      return e && existsSync(join(ROOT, "public", e.thumbnail));
    }).length;
    const avgG =
      cov > 0
        ? Math.round(
            (cp.reduce(
              (s, p) => s + (manifest[p.slug]?.gallery?.length ?? 0),
              0
            ) /
              cov) *
              10
          ) / 10
        : 0;
    lines.push(
      `| ${city.name} | ${cp.length} | ${cov}/${cp.length} | ${heroOk} | ${thumbOk} | ${avgG} |`
    );
  }

  // Missing places
  const missing = places.filter((p) => !manifest[p.slug]);
  lines.push(``, `## Missing Places`, ``);
  if (missing.length === 0) {
    lines.push(`All ${places.length} places have local images. ✅`);
  } else {
    lines.push(`${missing.length} places need images:\n`);
    for (const p of missing) {
      lines.push(`- \`${p.citySlug}/${p.slug}\` — ${p.name}`);
    }
  }

  // Sources breakdown
  const src: Record<string, number> = {};
  for (const e of Object.values(manifest)) {
    src[e.imageSource] = (src[e.imageSource] ?? 0) + 1;
  }
  lines.push(``, `## Image Sources`, ``);
  for (const [s, n] of Object.entries(src)) {
    lines.push(`- **${s}**: ${n} places`);
  }

  lines.push(
    ``,
    `## Commands`,
    ``,
    `\`\`\`bash`,
    `# Process all places`,
    `npx tsx scripts/image-pipeline.ts`,
    ``,
    `# Validate`,
    `npx tsx scripts/image-validate.ts`,
    ``,
    `# Re-run single city`,
    `npx tsx scripts/image-pipeline.ts --city paris`,
    `\`\`\``,
    ``
  );

  const report = lines.join("\n").replace(
    "Object.keys(manifest).length}",
    `${Object.keys(manifest).length}`
  );
  writeFileSync(REPORT_OUT, report);
  console.log(`\n📊  Report written: ${REPORT_OUT}\n`);
  console.log(report);
}

main().catch(console.error);
