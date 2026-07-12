#!/usr/bin/env tsx
/**
 * Checks all content for missing/broken images.
 * Usage: npx tsx scripts/check-images.ts
 */

import { existsSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const PUBLIC = join(ROOT, "public");

interface Issue {
  type: "blog" | "place" | "activity" | "morocco-guide" | "morocco-city";
  label: string;
  field: string;
  value: string;
  reason: string;
}

const issues: Issue[] = [];

function checkUrl(url: string): string | null {
  if (!url || url.trim() === "") return "empty";
  if (url.startsWith("/")) {
    const filePath = join(PUBLIC, url);
    if (!existsSync(filePath)) return `file missing: ${url}`;
    return null;
  }
  if (url.startsWith("https://images.unsplash.com/")) return null;
  if (url.startsWith("https://images.pexels.com/")) return null;
  if (url.startsWith("https://lh3.googleusercontent.com/")) return null;
  return `unwhitelisted remote URL: ${url}`;
}

// 1. Blog articles
// eslint-disable-next-line @typescript-eslint/no-require-imports
const blogMod = require("../lib/blogData");
const articles = blogMod.getAllArticles();
for (const a of articles) {
  const coverIssue = checkUrl(a.coverImage);
  if (coverIssue) {
    issues.push({ type: "blog", label: a.slug, field: "coverImage", value: a.coverImage ?? "", reason: coverIssue });
  }
  for (const p of a.places ?? []) {
    const placeIssue = checkUrl(p.image);
    if (placeIssue) {
      issues.push({ type: "place", label: `${a.slug} → ${p.name}`, field: "image", value: p.image ?? "", reason: placeIssue });
    }
  }
}

// 2. Activity images
// eslint-disable-next-line @typescript-eslint/no-require-imports
const actMod = require("../lib/activities/static-data");
for (const act of actMod.ACTIVITIES) {
  if (act.imageUrl) {
    const issue = checkUrl(act.imageUrl);
    if (issue) {
      issues.push({ type: "activity", label: act.slug ?? act.id, field: "imageUrl", value: act.imageUrl, reason: issue });
    }
  }
}

// 3. Morocco city hero images
for (const city of actMod.CITIES) {
  if (city.heroImage) {
    const issue = checkUrl(city.heroImage);
    if (issue) {
      issues.push({ type: "morocco-city", label: city.slug, field: "heroImage", value: city.heroImage, reason: issue });
    }
  }
}

// 4. Morocco guide hero images
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const moroccoMod = require("../lib/morocco/content");
  const guides = moroccoMod.getAllGuides();
  for (const g of guides) {
    if (g.frontmatter.heroImage) {
      const issue = checkUrl(g.frontmatter.heroImage);
      if (issue) {
        issues.push({ type: "morocco-guide", label: g.frontmatter.slug, field: "heroImage", value: g.frontmatter.heroImage, reason: issue });
      }
    }
  }
} catch {
  // Morocco content may not be importable via require
}

// Report
if (issues.length === 0) {
  console.log("✅ All images OK — no missing or broken images found.");
  process.exit(0);
} else {
  console.log(`\n❌ Found ${issues.length} image issue(s):\n`);
  for (const issue of issues) {
    console.log(`  [${issue.type}] ${issue.label}`);
    console.log(`    ${issue.field}: ${issue.value || "(empty)"}`);
    console.log(`    Reason: ${issue.reason}\n`);
  }
  process.exit(1);
}
