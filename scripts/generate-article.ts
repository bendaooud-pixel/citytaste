#!/usr/bin/env tsx
/**
 * Generates a new blog article using the Anthropic API and appends it to
 * lib/blogData.ts. Designed to be run daily via GitHub Actions.
 *
 * Usage: npx tsx scripts/generate-article.ts
 * Requires: ANTHROPIC_API_KEY env var
 */

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

// ─── Topic pool ────────────────────────────────────────────────────────────────
// Each entry defines a unique article. The script picks the first one whose
// slug isn't already present in blogData.ts, so new entries added here will be
// published on the next run.

const TOPICS = [
  // Rome
  { slug: "best-pasta-rome",           city: "Rome",      citySlug: "rome",      category: "Restaurants", title: "Best Pasta in Rome 2025" },
  { slug: "rome-coffee-guide",          city: "Rome",      citySlug: "rome",      category: "Cafés",       title: "The Ultimate Rome Coffee Guide" },
  { slug: "rome-street-food-guide",     city: "Rome",      citySlug: "rome",      category: "Street Food", title: "Best Street Food in Rome" },
  { slug: "rome-monuments-guide",       city: "Rome",      citySlug: "rome",      category: "Monuments",   title: "Top Ancient Monuments in Rome" },
  { slug: "rome-markets-guide",         city: "Rome",      citySlug: "rome",      category: "Markets",     title: "Best Markets in Rome" },
  { slug: "cheap-eats-rome",            city: "Rome",      citySlug: "rome",      category: "Budget",      title: "How to Eat Well in Rome on a Budget" },
  { slug: "romantic-rome",              city: "Rome",      citySlug: "rome",      category: "Romantic",    title: "Most Romantic Restaurants in Rome" },
  { slug: "best-gelato-rome",           city: "Rome",      citySlug: "rome",      category: "Desserts",    title: "Best Gelato in Rome 2025" },
  // Paris
  { slug: "best-wine-bars-paris",       city: "Paris",     citySlug: "paris",     category: "Bars",        title: "Best Natural Wine Bars in Paris" },
  { slug: "paris-street-food-guide",    city: "Paris",     citySlug: "paris",     category: "Street Food", title: "Best Street Food in Paris" },
  { slug: "paris-markets-guide",        city: "Paris",     citySlug: "paris",     category: "Markets",     title: "Best Food Markets in Paris" },
  { slug: "paris-vegetarian-guide",     city: "Paris",     citySlug: "paris",     category: "Restaurants", title: "Best Vegetarian Restaurants in Paris" },
  { slug: "paris-museums-guide",        city: "Paris",     citySlug: "paris",     category: "Monuments",   title: "Top Museums in Paris" },
  { slug: "best-boulangeries-paris",    city: "Paris",     citySlug: "paris",     category: "Bakeries",    title: "Best Boulangeries in Paris 2025" },
  { slug: "paris-halal-guide",          city: "Paris",     citySlug: "paris",     category: "Halal",       title: "Best Halal Food in Paris" },
  // Barcelona
  { slug: "best-seafood-barcelona",     city: "Barcelona", citySlug: "barcelona", category: "Restaurants", title: "Best Seafood Restaurants in Barcelona" },
  { slug: "barcelona-brunch-guide",     city: "Barcelona", citySlug: "barcelona", category: "Brunch",      title: "Best Brunch Spots in Barcelona" },
  { slug: "barcelona-coffee-guide",     city: "Barcelona", citySlug: "barcelona", category: "Cafés",       title: "Best Specialty Coffee in Barcelona" },
  { slug: "barcelona-street-food",      city: "Barcelona", citySlug: "barcelona", category: "Street Food", title: "Best Street Food in Barcelona" },
  { slug: "barcelona-tapas-guide",      city: "Barcelona", citySlug: "barcelona", category: "Tapas",       title: "Ultimate Tapas Guide: Barcelona 2025" },
  { slug: "barcelona-markets-guide",    city: "Barcelona", citySlug: "barcelona", category: "Markets",     title: "Best Markets in Barcelona" },
  { slug: "cheap-eats-barcelona",       city: "Barcelona", citySlug: "barcelona", category: "Budget",      title: "Best Cheap Eats in Barcelona" },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function getExistingSlugs(filePath: string): string[] {
  const content = readFileSync(filePath, "utf-8");
  return [...content.matchAll(/^\s+slug:\s+"([^"]+)"/gm)].map((m) => m[1]);
}

function pickTopic(existingSlugs: string[]) {
  return TOPICS.find((t) => !existingSlugs.includes(t.slug)) ?? null;
}

// Cover images matched to city/category
const COVER_IMAGES: Record<string, string> = {
  rome:      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80",
  paris:     "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
  barcelona: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&q=80",
};

// ─── Article generation ─────────────────────────────────────────────────────

async function generateArticle(topic: (typeof TOPICS)[0]): Promise<string> {
  const client = new Anthropic();

  const prompt = `You are a professional travel and food writer for CityTaste, a restaurant and travel guide.

Write a complete blog article about: "${topic.title}"
City: ${topic.city} | Category: ${topic.category}

Return ONLY a valid JSON object with exactly this structure (no markdown fences, no extra text):
{
  "title": "${topic.title}",
  "slug": "${topic.slug}",
  "city": "${topic.city}",
  "citySlug": "${topic.citySlug}",
  "category": "${topic.category}",
  "coverImage": "${COVER_IMAGES[topic.citySlug]}",
  "publishedAt": "${new Date().toISOString().split("T")[0]}",
  "readingTime": <number 4-8>,
  "metaDescription": "<compelling 155-character SEO description>",
  "intro": "<2-3 sentence engaging intro paragraph>",
  "body": "<3 solid paragraphs separated by \\n\\n, ~400 words total, rich food writing>",
  "places": [
    {
      "name": "<real place name in ${topic.city}>",
      "description": "<2 sentence description>",
      "address": "<real street address>",
      "rating": <4.4 to 4.9>,
      "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      "citySlug": "${topic.citySlug}",
      "placeSlug": null
    }
  ]
}

Requirements:
- Include exactly 4 places, all real well-known establishments in ${topic.city}
- Use different, real Unsplash photo IDs for each place image (format: https://images.unsplash.com/photo-TIMESTAMP-HASH?w=800&q=80)
- Body must be rich, evocative food writing — no bullet points, no headers
- metaDescription must be under 160 characters
- All place names and addresses must be real and accurate
- Return pure JSON only`;

  console.log(`  → model: claude-opus-4-7, max_tokens: 2048`);
  const message = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });
  console.log(`  → stop_reason: ${message.stop_reason}, usage: ${JSON.stringify(message.usage)}`);

  const text = message.content[0].type === "text" ? message.content[0].text : "";

  // Strip any accidental markdown fences
  return text.replace(/^```(?:json)?\n?/m, "").replace(/\n?```$/m, "").trim();
}

// ─── Inject into blogData.ts ─────────────────────────────────────────────────

function injectArticle(filePath: string, articleJson: string): void {
  const content = readFileSync(filePath, "utf-8");

  // Find the closing of the articles array: last `];` before the export functions
  const insertionMarker = "\n];\n\nexport function getAllArticles";
  const insertionIndex = content.indexOf(insertionMarker);
  if (insertionIndex === -1) {
    throw new Error("Could not locate insertion point in blogData.ts");
  }

  // Pretty-print the article as a TS-compatible object (JSON is valid TS)
  const parsed = JSON.parse(articleJson);
  const formatted = JSON.stringify(parsed, null, 2)
    .split("\n")
    .map((line) => "  " + line)   // indent 2 spaces to match file style
    .join("\n");

  const updated =
    content.slice(0, insertionIndex) +
    ",\n" +
    formatted +
    content.slice(insertionIndex);

  writeFileSync(filePath, updated, "utf-8");
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=== generate-article.ts starting ===");
  console.log(`Node version: ${process.version}`);
  console.log(`Working directory: ${process.cwd()}`);
  console.log(`ANTHROPIC_API_KEY set: ${!!process.env.ANTHROPIC_API_KEY}`);
  if (process.env.ANTHROPIC_API_KEY) {
    console.log(`ANTHROPIC_API_KEY length: ${process.env.ANTHROPIC_API_KEY.length}`);
    console.log(`ANTHROPIC_API_KEY prefix: ${process.env.ANTHROPIC_API_KEY.slice(0, 7)}...`);
  }

  const dataPath = join(process.cwd(), "lib", "blogData.ts");
  console.log(`\nData file path: ${dataPath}`);

  const existingSlugs = getExistingSlugs(dataPath);
  console.log(`Existing articles: ${existingSlugs.length}`);
  console.log(`Existing slugs: ${existingSlugs.join(", ")}`);

  const topic = pickTopic(existingSlugs);
  if (!topic) {
    console.log("All topics have been published — nothing to generate.");
    process.exit(0);
  }

  console.log(`\nSelected topic: "${topic.title}" (${topic.slug})`);
  console.log(`City: ${topic.city} | Category: ${topic.category}`);

  console.log("\nCalling Anthropic API...");
  const raw = await generateArticle(topic);
  console.log(`API response received (${raw.length} chars)`);
  console.log(`Response preview: ${raw.slice(0, 200)}...`);

  console.log("\nParsing JSON response...");
  const parsed = JSON.parse(raw);
  console.log(`Parsed article title: ${parsed.title}`);
  console.log(`Places count: ${parsed.places?.length ?? 0}`);

  console.log("\nInjecting into blogData.ts...");
  injectArticle(dataPath, raw);
  console.log(`✓ Article "${topic.title}" injected into lib/blogData.ts`);
  console.log("=== Done ===");
}

main().catch((err) => {
  console.error("Fatal error:", err.message);
  console.error("Stack:", err.stack);
  process.exit(1);
});
