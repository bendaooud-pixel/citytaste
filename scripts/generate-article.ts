#!/usr/bin/env tsx
/**
 * SEO-driven article generator for CityTaste.
 *
 * Consumes the next queued keyword from content/keyword-queue.json,
 * checks for cannibalization against existing content, generates a
 * rank-ready article via Claude, injects internal links, and appends
 * it to lib/blogData.ts.
 *
 * Usage:
 *   npx tsx scripts/generate-article.ts                # next from queue
 *   npx tsx scripts/generate-article.ts --keyword "best pizza rome"  # specific keyword
 *
 * Requires: ANTHROPIC_API_KEY env var
 */

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

// ─── Paths ──────────────────────────────────────────────────────────────────

const ROOT = process.cwd();
const DATA_PATH = join(ROOT, "lib", "blogData.ts");
const QUEUE_PATH = join(ROOT, "content", "keyword-queue.json");
const TRACKER_PATH = join(ROOT, "scripts", "used-topics.json");

const YEAR = new Date().getFullYear();

// ─── Types ──────────────────────────────────────────────────────────────────

interface QueueEntry {
  keyword: string;
  secondaryKeywords: string[];
  city: string;
  citySlug: string;
  locale: string;
  intent: string;
  suggestedSlug: string;
  suggestedTitle: string;
  category: string;
  status: "queued" | "published" | "skip";
  notes?: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getExistingSlugs(): string[] {
  const content = readFileSync(DATA_PATH, "utf-8");
  return [...content.matchAll(/^\s+slug:\s+"([^"]+)"/gm)].map((m) => m[1]);
}

function getExistingTitles(): string[] {
  const content = readFileSync(DATA_PATH, "utf-8");
  return [...content.matchAll(/^\s+title:\s+"([^"]+)"/gm)].map((m) => m[1].toLowerCase());
}

function getExistingKeywords(): string[] {
  const content = readFileSync(DATA_PATH, "utf-8");
  return [...content.matchAll(/^\s+primaryKeyword:\s+"([^"]+)"/gm)].map((m) => m[1].toLowerCase());
}

function getUsedSlugs(): string[] {
  if (!existsSync(TRACKER_PATH)) return [];
  try {
    return JSON.parse(readFileSync(TRACKER_PATH, "utf-8")) as string[];
  } catch {
    return [];
  }
}

function markSlugUsed(slug: string): void {
  const used = getUsedSlugs();
  if (!used.includes(slug)) used.push(slug);
  writeFileSync(TRACKER_PATH, JSON.stringify(used, null, 2), "utf-8");
}

function readQueue(): QueueEntry[] {
  if (!existsSync(QUEUE_PATH)) return [];
  return JSON.parse(readFileSync(QUEUE_PATH, "utf-8")) as QueueEntry[];
}

function writeQueue(queue: QueueEntry[]): void {
  writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2), "utf-8");
}

// ─── Anti-cannibalization check ─────────────────────────────────────────────

function normalizeKeyword(kw: string): string {
  return kw.toLowerCase().replace(/[^a-z0-9àâäéèêëïîôùûüÿçœæ ]/g, "").trim();
}

function keywordOverlaps(newKeyword: string, existing: string[]): string | null {
  const normalized = normalizeKeyword(newKeyword);
  const newWords = new Set(normalized.split(/\s+/));

  for (const ex of existing) {
    const exNorm = normalizeKeyword(ex);
    const exWords = new Set(exNorm.split(/\s+/));
    const overlap = [...newWords].filter((w) => exWords.has(w) && w.length > 2);
    if (overlap.length >= 3 || exNorm === normalized) {
      return ex;
    }
  }
  return null;
}

function checkCannibalization(keyword: string, slug: string): string | null {
  const existingSlugs = getExistingSlugs();
  if (existingSlugs.includes(slug)) {
    return `Slug "${slug}" already exists in blogData.ts`;
  }

  const existingKeywords = getExistingKeywords();
  const overlap = keywordOverlaps(keyword, existingKeywords);
  if (overlap) {
    return `Keyword "${keyword}" overlaps with existing keyword "${overlap}"`;
  }

  const existingTitles = getExistingTitles();
  const titleOverlap = keywordOverlaps(keyword, existingTitles);
  if (titleOverlap) {
    return `Keyword "${keyword}" overlaps with existing title "${titleOverlap}"`;
  }

  return null;
}

// ─── Internal link builder ──────────────────────────────────────────────────

function buildInternalLinks(citySlug: string, currentSlug: string): string {
  const existingSlugs = getExistingSlugs();
  const content = readFileSync(DATA_PATH, "utf-8");

  const sameCityArticles = existingSlugs
    .filter((s) => s !== currentSlug)
    .filter((s) => {
      const re = new RegExp(`slug:\\s+"${s}"[\\s\\S]{0,300}citySlug:\\s+"${citySlug}"`);
      return re.test(content);
    })
    .slice(0, 4);

  const otherCityArticles = existingSlugs
    .filter((s) => s !== currentSlug && !sameCityArticles.includes(s))
    .slice(0, 2);

  const links = [
    ...sameCityArticles.map((s) => `/blog/${s}`),
    ...otherCityArticles.map((s) => `/blog/${s}`),
    `/${citySlug}`,
  ];

  return JSON.stringify(links);
}

// ─── Topic selection ────────────────────────────────────────────────────────

// Legacy topic pool — used as fallback when keyword queue is empty
const LEGACY_TOPICS = [
  { slug: "lebanese-food-barcelona", city: "Barcelona", citySlug: "barcelona", category: "Restaurants", title: "Best Lebanese Food in Barcelona" },
  { slug: "beautiful-restaurant-interiors-bcn", city: "Barcelona", citySlug: "barcelona", category: "Restaurants", title: "Most Beautiful Restaurant Interiors in Barcelona" },
  { slug: "best-sushi-barcelona", city: "Barcelona", citySlug: "barcelona", category: "Restaurants", title: "Best Sushi in Barcelona" },
  { slug: "natural-wine-bars-barcelona", city: "Barcelona", citySlug: "barcelona", category: "Bars", title: "Top Natural Wine Bars in Barcelona" },
  { slug: "brunch-spots-eixample", city: "Barcelona", citySlug: "barcelona", category: "Brunch", title: "Best Brunch Spots in Eixample Barcelona" },
  { slug: "hidden-gems-poble-sec", city: "Barcelona", citySlug: "barcelona", category: "Restaurants", title: "Hidden Gems in Poble Sec Food Scene" },
  { slug: "best-gelato-rome", city: "Rome", citySlug: "rome", category: "Desserts", title: "Best Gelato in Rome" },
  { slug: "pizza-al-taglio-rome", city: "Rome", citySlug: "rome", category: "Street Food", title: "Top Pizza al Taglio Spots in Rome" },
  { slug: "aperitivo-bars-rome", city: "Rome", citySlug: "rome", category: "Bars", title: "Best Aperitivo Bars in Rome" },
  { slug: "hidden-trattorias-trastevere", city: "Rome", citySlug: "rome", category: "Restaurants", title: "Hidden Trattorias in Trastevere Rome" },
  { slug: "best-carbonara-rome", city: "Rome", citySlug: "rome", category: "Restaurants", title: "Best Carbonara in Rome" },
  { slug: "street-food-rome", city: "Rome", citySlug: "rome", category: "Street Food", title: "Top Street Food in Rome" },
  { slug: "jewish-cuisine-rome-ghetto", city: "Rome", citySlug: "rome", category: "Restaurants", title: "Best Jewish Cuisine in Rome's Ghetto" },
  { slug: "romantic-restaurants-rome", city: "Rome", citySlug: "rome", category: "Romantic", title: "Most Romantic Restaurants in Rome" },
  { slug: "coffee-bars-rome", city: "Rome", citySlug: "rome", category: "Cafés", title: "Best Coffee Bars in Rome" },
  { slug: "wine-bars-rome", city: "Rome", citySlug: "rome", category: "Bars", title: "Top Wine Bars in Rome" },
  { slug: "best-cacio-e-pepe-rome", city: "Rome", citySlug: "rome", category: "Restaurants", title: "Best Cacio e Pepe Restaurants in Rome" },
  { slug: "restaurants-near-vatican", city: "Rome", citySlug: "rome", category: "Restaurants", title: "Hidden Restaurants Near the Vatican Rome" },
  { slug: "best-seafood-rome", city: "Rome", citySlug: "rome", category: "Restaurants", title: "Best Seafood in Rome" },
  { slug: "rooftop-bars-rome", city: "Rome", citySlug: "rome", category: "Bars", title: "Top Rooftop Bars in Rome" },
  { slug: "best-riads-eat-marrakech", city: "Marrakech", citySlug: "marrakech", category: "Restaurants", title: "Best Riads to Eat in Marrakech" },
  { slug: "top-rooftop-bars-marrakech", city: "Marrakech", citySlug: "marrakech", category: "Bars", title: "Top Rooftop Bars in Marrakech" },
  { slug: "best-hammam-marrakech", city: "Marrakech", citySlug: "marrakech", category: "Activities", title: "Best Hammam Experiences in Marrakech" },
  { slug: "hidden-restaurants-medina", city: "Marrakech", citySlug: "marrakech", category: "Restaurants", title: "Hidden Restaurants in Marrakech Medina" },
];

interface TopicInput {
  slug: string;
  city: string;
  citySlug: string;
  category: string;
  title: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  locale: string;
}

function pickFromQueue(): { topic: TopicInput; queueIndex: number } | null {
  const queue = readQueue();
  const existingSlugs = getExistingSlugs();
  const usedSlugs = getUsedSlugs();
  const already = new Set([...existingSlugs, ...usedSlugs]);

  for (let i = 0; i < queue.length; i++) {
    const entry = queue[i];
    if (entry.status !== "queued") continue;
    if (already.has(entry.suggestedSlug)) continue;

    const cannibal = checkCannibalization(entry.keyword, entry.suggestedSlug);
    if (cannibal) {
      console.log(`⚠ Skipping "${entry.keyword}": ${cannibal}`);
      continue;
    }

    return {
      topic: {
        slug: entry.suggestedSlug,
        city: entry.city,
        citySlug: entry.citySlug,
        category: entry.category,
        title: entry.suggestedTitle.replace("{year}", String(YEAR)),
        primaryKeyword: entry.keyword,
        secondaryKeywords: entry.secondaryKeywords,
        locale: entry.locale,
      },
      queueIndex: i,
    };
  }
  return null;
}

function pickFromLegacy(): TopicInput | null {
  const existingSlugs = getExistingSlugs();
  const usedSlugs = getUsedSlugs();
  const already = new Set([...existingSlugs, ...usedSlugs]);

  const topic = LEGACY_TOPICS.find((t) => !already.has(t.slug));
  if (!topic) return null;

  return {
    ...topic,
    title: topic.title.replace(/\b20\d{2}\b/, String(YEAR)),
    primaryKeyword: topic.title.toLowerCase().replace(/^(best|top|most|hidden)\s+/i, ""),
    secondaryKeywords: [],
    locale: "en",
  };
}

// ─── Article generation ─────────────────────────────────────────────────────

async function generateArticle(client: Anthropic, topic: TopicInput): Promise<string> {
  const today = new Date().toISOString().split("T")[0];
  const internalLinks = buildInternalLinks(topic.citySlug, topic.slug);

  const keywordBlock = topic.secondaryKeywords.length > 0
    ? `Secondary keywords to work in naturally: ${topic.secondaryKeywords.join(", ")}`
    : "";

  const prompt = `You are a senior travel writer for CityTaste, a premium food and city guide.

MISSION: Write a deeply useful, SEO-optimized article targeting the keyword "${topic.primaryKeyword}" for ${topic.city}.

━━ SEO REQUIREMENTS ━━
- Primary keyword: "${topic.primaryKeyword}" — use it in the first paragraph, at least one H2, and naturally 3-5 more times
- ${keywordBlock}
- The title must contain the primary keyword
- Every H2 should address a search intent related to this keyword

━━ INTERNAL LINKS (CRITICAL FOR SEO) ━━
You MUST include 3-6 internal links in the body using markdown format: [anchor text](/path)
Available internal pages to link to: ${internalLinks}
Also link to the city hub: [Explore ${topic.city}](/${topic.citySlug})
Place links where they add context — within paragraphs, not as a separate section.

━━ WRITING RULES ━━
- Sound like a local friend — not a tourist brochure
- Short paragraphs (2-3 sentences max)
- Vary sentence length. Never use: "amazing", "must-visit", "hidden gem", "culinary journey", "vibrant"
- Add real friction: what's annoying, what's overpriced, what's worth it
- One concrete detail per place (a dish name, a price, a specific table)

━━ BODY MARKDOWN FORMAT ━━
- ## Heading (H2) — use primary keyword in at least one H2
- ### Sub-heading (H3) — for each place or sub-section
- **bold** for place names, dish names
- - bullet points for lists
- | col | col | for tables
- [link text](/path) for internal links

━━ REQUIRED BODY STRUCTURE ━━
## Why ${topic.city} for ${topic.primaryKeyword.replace(/\b(best|top|most)\s+/i, "")}
(2-3 sentences — context, budget range, best season. Include 1 internal link.)

| Place | Price | Best For | Vibe |
|-------|-------|----------|------|
(comparison table with all 5 places)

## Detailed Reviews

### 1. [Place Name]
(3-4 sentences with honest observations. Include an internal link in at least 2 of the 5 reviews.)
**Best for:** [type]
**Local tip:** [specific insider detail]

(repeat for all 5 places)

## Tips for ${topic.primaryKeyword}
- [Tip 1 — specific, actionable]
- [Tip 2 — timing/reservation]
- [Tip 3 — what to order/avoid]
- [Tip 4 — nearby attraction worth combining. Include an internal link.]

## FAQ

### Q: [Question a traveler would Google]
A: [2-3 sentence specific answer]

### Q: [Practical question about price/hours/booking]
A: [Answer]

### Q: [Best option for a specific type of traveler]
A: [Answer]

## The Verdict
(Best for couples, budget, first-timers, locals — name specific places)

━━ OUTPUT FORMAT ━━
Return ONLY valid JSON (no markdown fences):

{
  "title": "${topic.title}",
  "slug": "${topic.slug}",
  "city": "${topic.city}",
  "citySlug": "${topic.citySlug}",
  "category": "${topic.category}",
  "coverImage": "/images/blog/${topic.slug}.jpg",
  "publishedAt": "${today}",
  "readingTime": 8,
  "primaryKeyword": "${topic.primaryKeyword}",
  "metaDescription": "<SEO description under 155 chars with primary keyword and city, compelling click-through>",
  "intro": "<3-4 sentence hook with the primary keyword in the first sentence>",
  "body": "<full article, 900-1100 words, includes 3-6 internal links as [text](/path)>",
  "places": [
    {
      "name": "<real place name>",
      "description": "<3 sentences: atmosphere, what's special, honest observation>",
      "address": "<real street address>",
      "rating": 4.7,
      "image": "/images/blog/${topic.slug}.jpg",
      "citySlug": "${topic.citySlug}",
      "placeSlug": null
    }
  ]
}

STRICT RULES:
- 5 real places with real addresses in ${topic.city}
- Use "/images/blog/${topic.slug}.jpg" for coverImage and all place images (we'll replace with real images later)
- metaDescription under 155 characters, includes primary keyword
- Body MUST include the FAQ section
- Body MUST include 3-6 internal links using [text](/path) format
- Return pure JSON only`;

  console.log(`  → model: claude-sonnet-4-6, max_tokens: 8000`);
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8000,
    messages: [{ role: "user", content: prompt }],
  });
  console.log(`  → stop_reason: ${message.stop_reason}, usage: ${JSON.stringify(message.usage)}`);

  if (message.stop_reason === "max_tokens") {
    throw new Error("Response truncated — article too long");
  }

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  return text.replace(/^```(?:json)?\n?/m, "").replace(/\n?```$/m, "").trim();
}

// ─── Inject into blogData.ts ────────────────────────────────────────────────

function injectArticle(articleJson: string): void {
  const content = readFileSync(DATA_PATH, "utf-8");

  const insertionMarker = "\n];\n\nexport function getAllArticles";
  const insertionIndex = content.indexOf(insertionMarker);
  if (insertionIndex === -1) {
    throw new Error("Could not locate insertion point in blogData.ts");
  }

  const parsed = JSON.parse(articleJson);

  const PLACE_KEYS = new Set(["name", "description", "address", "rating", "image", "citySlug", "placeSlug"]);
  if (Array.isArray(parsed.places)) {
    parsed.places = parsed.places.map((p: Record<string, unknown>) =>
      Object.fromEntries(Object.entries(p).filter(([k]) => PLACE_KEYS.has(k)))
    );
  }

  const ARTICLE_KEYS = new Set([
    "title", "slug", "city", "citySlug", "category", "coverImage",
    "publishedAt", "readingTime", "intro", "body", "places",
    "metaDescription", "primaryKeyword",
  ]);
  const cleaned = Object.fromEntries(
    Object.entries(parsed).filter(([k]) => ARTICLE_KEYS.has(k))
  );

  const formatted = JSON.stringify(cleaned, null, 2)
    .replace(/"placeSlug": null/g, '"placeSlug": undefined')
    .split("\n")
    .map((line) => "  " + line)
    .join("\n");

  const before = content.slice(0, insertionIndex).replace(/,\s*$/, "");
  const updated = before + ",\n" + formatted + content.slice(insertionIndex);

  writeFileSync(DATA_PATH, updated, "utf-8");
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("=== generate-article.ts (SEO-driven) ===");
  console.log(`Working directory: ${ROOT}`);
  console.log(`ANTHROPIC_API_KEY set: ${!!process.env.ANTHROPIC_API_KEY}`);

  const existingSlugs = getExistingSlugs();
  console.log(`\nExisting articles: ${existingSlugs.length}`);

  // Check for --keyword override
  const kwArg = process.argv.indexOf("--keyword");
  let topic: TopicInput;
  let queueIndex = -1;

  if (kwArg !== -1 && process.argv[kwArg + 1]) {
    const kw = process.argv[kwArg + 1];
    const queue = readQueue();
    const match = queue.findIndex((e) => e.keyword.toLowerCase() === kw.toLowerCase());
    if (match === -1) {
      console.error(`Keyword "${kw}" not found in queue. Add it first.`);
      process.exit(1);
    }
    const entry = queue[match];
    const cannibal = checkCannibalization(entry.keyword, entry.suggestedSlug);
    if (cannibal) {
      console.error(`⚠ CANNIBALIZATION BLOCKED: ${cannibal}`);
      console.error("Update the existing article instead, or remove the conflicting entry.");
      process.exit(1);
    }
    topic = {
      slug: entry.suggestedSlug,
      city: entry.city,
      citySlug: entry.citySlug,
      category: entry.category,
      title: entry.suggestedTitle.replace("{year}", String(YEAR)),
      primaryKeyword: entry.keyword,
      secondaryKeywords: entry.secondaryKeywords,
      locale: entry.locale,
    };
    queueIndex = match;
  } else {
    // Try keyword queue first, then fall back to legacy topics
    const fromQueue = pickFromQueue();
    if (fromQueue) {
      topic = fromQueue.topic;
      queueIndex = fromQueue.queueIndex;
      console.log(`📋 Using keyword queue entry #${queueIndex}`);
    } else {
      const legacy = pickFromLegacy();
      if (!legacy) {
        console.log("No available topics in queue or legacy pool. Add more keywords to content/keyword-queue.json");
        process.exit(0);
      }
      topic = legacy;
      console.log("📋 Using legacy topic (keyword queue empty/exhausted)");
    }
  }

  console.log(`\n🎯 Target keyword: "${topic.primaryKeyword}"`);
  console.log(`   Title: "${topic.title}"`);
  console.log(`   Slug: ${topic.slug}`);
  console.log(`   City: ${topic.city} | Category: ${topic.category} | Locale: ${topic.locale}`);

  // Anti-cannibalization final check
  const cannibal = checkCannibalization(topic.primaryKeyword, topic.slug);
  if (cannibal) {
    console.error(`\n⚠ CANNIBALIZATION BLOCKED: ${cannibal}`);
    process.exit(1);
  }
  console.log("✓ Anti-cannibalization check passed");

  const client = new Anthropic();
  console.log("\nCalling Anthropic API...");
  const raw = await generateArticle(client, topic);
  console.log(`API response received (${raw.length} chars)`);

  const parsed = JSON.parse(raw);
  console.log(`Title: ${parsed.title}`);
  console.log(`Places: ${parsed.places?.length ?? 0}`);
  console.log(`Primary keyword: ${parsed.primaryKeyword}`);

  // Validate internal links exist in body
  const linkCount = (parsed.body?.match(/\[([^\]]+)\]\(\/[^\)]+\)/g) || []).length;
  console.log(`Internal links in body: ${linkCount}`);
  if (linkCount < 2) {
    console.warn("⚠ Fewer than 2 internal links — article may underperform on SEO");
  }

  console.log("\nInjecting into blogData.ts...");
  injectArticle(raw);
  console.log(`✓ Article "${topic.slug}" injected`);

  markSlugUsed(topic.slug);

  // Update queue status
  if (queueIndex >= 0) {
    const queue = readQueue();
    queue[queueIndex].status = "published";
    writeQueue(queue);
    console.log(`✓ Queue entry #${queueIndex} marked as published`);
  }

  console.log("=== Done ===");
}

main().catch((err) => {
  console.error("Fatal error:", err.message);
  console.error("Stack:", err.stack);
  process.exit(1);
});
