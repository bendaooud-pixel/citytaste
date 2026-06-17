#!/usr/bin/env tsx
/**
 * Generate SEO article content for activities that don't have it yet.
 *
 * For each activity with a slug but no content file, this script:
 * 1. Uses the activity data (title, city, category, price, duration) as context
 * 2. Generates an original article via Claude (body + FAQ + meta)
 * 3. Saves to content/activities/{slug}.json
 *
 * Re-runnable: skips activities that already have a content file.
 *
 * Usage:
 *   npx tsx scripts/generate-activity-articles.ts           # all missing
 *   npx tsx scripts/generate-activity-articles.ts --slug fez-medina-walking-tour  # specific
 *   npx tsx scripts/generate-activity-articles.ts --locale fr  # add FR to existing
 *
 * Requires: ANTHROPIC_API_KEY env var
 */

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const CONTENT_DIR = join(ROOT, "content", "activities");

// Import activity data
const STATIC_DATA_PATH = join(ROOT, "lib", "activities", "static-data.ts");

interface Activity {
  id: string;
  cityId: string;
  slug?: string;
  title: string;
  category: string;
  platform: string;
  priceFrom?: number;
  currency: string;
  duration?: string;
}

interface City {
  id: string;
  slug: string;
  name: string;
}

interface ArticleContent {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  body: string;
  faq: { q: string; a: string }[];
}

function parseStaticData(): { activities: Activity[]; cities: City[] } {
  const content = readFileSync(STATIC_DATA_PATH, "utf-8");

  const activityMatches = [...content.matchAll(/\{[^}]*id:\s*"([^"]+)"[^}]*cityId:\s*"([^"]+)"[^}]*(?:slug:\s*"([^"]+)")?[^}]*title:\s*"([^"]+)"[^}]*category:\s*"([^"]+)"[^}]*platform:\s*"([^"]+)"[^}]*(?:priceFrom:\s*(\d+))?[^}]*currency:\s*"([^"]+)"[^}]*(?:duration:\s*"([^"]+)")?/gs)];

  const activities: Activity[] = activityMatches.map((m) => ({
    id: m[1],
    cityId: m[2],
    slug: m[3],
    title: m[4],
    category: m[5],
    platform: m[6],
    priceFrom: m[7] ? parseInt(m[7]) : undefined,
    currency: m[8],
    duration: m[9],
  }));

  const cityMatches = [...content.matchAll(/\{\s*id:\s*"(ci-[^"]+)"[^}]*slug:\s*"([^"]+)"[^}]*name:\s*"([^"]+)"/gs)];
  const cities: City[] = cityMatches.map((m) => ({
    id: m[1],
    slug: m[2],
    name: m[3],
  }));

  return { activities, cities };
}

async function generateArticle(
  client: Anthropic,
  activity: Activity,
  cityName: string,
  locale: string
): Promise<ArticleContent> {
  const langMap: Record<string, string> = {
    en: "English",
    fr: "French",
    es: "Spanish",
    it: "Italian",
  };

  const prompt = `You are an expert travel content writer for CityTaste, a travel guide website. Write an original, SEO-optimized article for the following activity:

**Activity:** ${activity.title}
**City:** ${cityName}, Morocco
**Category:** ${activity.category}
**Price:** From $${activity.priceFrom ?? "N/A"} ${activity.currency}
**Duration:** ${activity.duration ?? "N/A"}
**Platform:** ${activity.platform}

Write in ${langMap[locale] ?? "English"}.

Requirements:
1. h1: A concise, keyword-rich H1 (not the same as the original title — write something SEO-optimized)
2. metaTitle: Under 60 characters, includes the keyword + city + "| CityTaste"
3. metaDescription: 150-160 characters, includes the keyword, compelling
4. body: 400-700 words of ORIGINAL content (DO NOT copy supplier descriptions). Use markdown with ## H2 and ### H3. Include:
   - What to expect / overview
   - Detailed breakdown of what you'll see/do
   - Who it's best for
   - Practical tips
5. faq: 4-5 Q&A pairs relevant to someone considering this activity

The content must be genuinely useful, informative, and written in a natural, expert voice. Focus on practical details a traveler needs to decide and prepare.

Return ONLY valid JSON in this exact format (no markdown fences):
{
  "h1": "...",
  "metaTitle": "...",
  "metaDescription": "...",
  "body": "...",
  "faq": [{"q": "...", "a": "..."}, ...]
}`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => (b as Anthropic.TextBlock).text)
    .join("");

  return JSON.parse(text);
}

async function main() {
  const args = process.argv.slice(2);
  const slugArg = args.find((a, i) => args[i - 1] === "--slug") ?? null;
  const localeArg = args.find((a, i) => args[i - 1] === "--locale") ?? "en";

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("Error: ANTHROPIC_API_KEY env var is required");
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });
  const { activities, cities } = parseStaticData();
  const cityMap = Object.fromEntries(cities.map((c) => [c.id, c]));

  const targets = activities.filter((a) => {
    if (!a.slug) return false;
    if (slugArg && a.slug !== slugArg) return false;
    return true;
  });

  if (targets.length === 0) {
    console.log("No activities to process.");
    return;
  }

  for (const activity of targets) {
    const slug = activity.slug!;
    const filePath = join(CONTENT_DIR, `${slug}.json`);
    const city = cityMap[activity.cityId];
    const cityName = city?.name ?? "Unknown";

    let existing: Record<string, ArticleContent> = {};
    if (existsSync(filePath)) {
      existing = JSON.parse(readFileSync(filePath, "utf-8"));
      if (existing[localeArg] && !slugArg) {
        console.log(`  ⏭  ${slug} [${localeArg}] — already has content, skipping`);
        continue;
      }
    }

    console.log(`  ✏️  Generating ${slug} [${localeArg}] — "${activity.title}" in ${cityName}...`);

    try {
      const article = await generateArticle(client, activity, cityName, localeArg);
      existing[localeArg] = article;
      writeFileSync(filePath, JSON.stringify(existing, null, 2) + "\n");
      console.log(`  ✅  Saved ${filePath}`);
    } catch (err) {
      console.error(`  ❌  Failed for ${slug}: ${err}`);
    }
  }

  console.log("\nDone.");
}

main();
