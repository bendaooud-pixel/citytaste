#!/usr/bin/env tsx
/**
 * Generates a new blog article using the Anthropic API and appends it to
 * lib/blogData.ts. Tracks used topics in scripts/used-topics.json so no
 * topic is ever repeated. When all 60+ predefined topics are exhausted,
 * Claude invents fresh ones automatically.
 *
 * Usage: npx tsx scripts/generate-article.ts
 * Requires: ANTHROPIC_API_KEY env var
 */

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

// ─── Topic pool (60 topics) ──────────────────────────────────────────────────

const TOPICS = [
  // ── Paris (20) ──
  { slug: "hidden-bistros-marais-paris",       city: "Paris",     citySlug: "paris",     category: "Restaurants", title: "Best Hidden Bistros in Le Marais Paris" },
  { slug: "natural-wine-bars-paris",           city: "Paris",     citySlug: "paris",     category: "Bars",        title: "Top 5 Natural Wine Bars in Paris 2025" },
  { slug: "street-food-paris-under-5",         city: "Paris",     citySlug: "paris",     category: "Street Food", title: "Best Street Food in Paris Under €5" },
  { slug: "cafe-terraces-paris",               city: "Paris",     citySlug: "paris",     category: "Cafés",       title: "Most Beautiful Café Terraces in Paris" },
  { slug: "japanese-restaurants-paris",        city: "Paris",     citySlug: "paris",     category: "Restaurants", title: "Best Japanese Restaurants in Paris" },
  { slug: "vegan-restaurants-paris",           city: "Paris",     citySlug: "paris",     category: "Restaurants", title: "Top Vegan Restaurants in Paris 2025" },
  { slug: "late-night-food-paris",             city: "Paris",     citySlug: "paris",     category: "Nightlife",   title: "Best Late Night Food in Paris" },
  { slug: "montmartre-food-hidden-gems",       city: "Paris",     citySlug: "paris",     category: "Restaurants", title: "Hidden Gems in Montmartre Food Scene" },
  { slug: "african-restaurants-paris",         city: "Paris",     citySlug: "paris",     category: "Restaurants", title: "Best African Restaurants in Paris" },
  { slug: "cheese-shops-paris",                city: "Paris",     citySlug: "paris",     category: "Markets",     title: "Top Cheese Shops in Paris" },
  { slug: "creperies-paris",                   city: "Paris",     citySlug: "paris",     category: "Street Food", title: "Best Crêperies in Paris" },
  { slug: "instagrammable-restaurants-paris",  city: "Paris",     citySlug: "paris",     category: "Restaurants", title: "Most Instagrammable Restaurants in Paris" },
  { slug: "lebanese-food-paris",               city: "Paris",     citySlug: "paris",     category: "Restaurants", title: "Best Lebanese Food in Paris" },
  { slug: "best-boulangeries-paris",           city: "Paris",     citySlug: "paris",     category: "Bakeries",    title: "Top Boulangeries in Paris Ranked 2025" },
  { slug: "food-markets-paris-neighbourhood",  city: "Paris",     citySlug: "paris",     category: "Markets",     title: "Best Food Markets in Paris by Neighbourhood" },
  { slug: "michelin-paris-worth-it",           city: "Paris",     citySlug: "paris",     category: "Fine Dining", title: "Michelin Star Restaurants in Paris Worth It" },
  { slug: "best-sushi-paris",                  city: "Paris",     citySlug: "paris",     category: "Restaurants", title: "Best Sushi in Paris 2025" },
  { slug: "cocktail-bars-paris",               city: "Paris",     citySlug: "paris",     category: "Bars",        title: "Top Cocktail Bars in Paris" },
  { slug: "vietnamese-food-paris",             city: "Paris",     citySlug: "paris",     category: "Restaurants", title: "Best Vietnamese Food in Paris" },
  { slug: "hidden-rooftop-bars-paris",         city: "Paris",     citySlug: "paris",     category: "Bars",        title: "Hidden Rooftop Bars in Paris" },

  // ── Barcelona (20) ──
  { slug: "pintxos-bars-barcelona",            city: "Barcelona", citySlug: "barcelona", category: "Tapas",       title: "Best Pintxos Bars in Barcelona" },
  { slug: "vermouth-bars-barcelona",           city: "Barcelona", citySlug: "barcelona", category: "Bars",        title: "Top Vermouth Bars in Barcelona" },
  { slug: "paella-restaurants-barcelona",      city: "Barcelona", citySlug: "barcelona", category: "Restaurants", title: "Best Paella Restaurants in Barcelona" },
  { slug: "hidden-restaurants-el-born",        city: "Barcelona", citySlug: "barcelona", category: "Restaurants", title: "Hidden Restaurants in El Born Barcelona" },
  { slug: "vegetarian-restaurants-barcelona",  city: "Barcelona", citySlug: "barcelona", category: "Restaurants", title: "Best Vegetarian Restaurants in Barcelona" },
  { slug: "gelato-spots-barcelona",            city: "Barcelona", citySlug: "barcelona", category: "Desserts",    title: "Top Gelato Spots in Barcelona" },
  { slug: "breakfast-spots-barcelona",         city: "Barcelona", citySlug: "barcelona", category: "Brunch",      title: "Best Breakfast Spots in Barcelona" },
  { slug: "romantic-restaurants-barcelona",    city: "Barcelona", citySlug: "barcelona", category: "Romantic",    title: "Most Romantic Restaurants in Barcelona" },
  { slug: "wine-bars-barcelona",               city: "Barcelona", citySlug: "barcelona", category: "Bars",        title: "Best Wine Bars in Barcelona" },
  { slug: "street-food-barceloneta",           city: "Barcelona", citySlug: "barcelona", category: "Street Food", title: "Top Street Food in La Barceloneta" },
  { slug: "catalan-cuisine-restaurants",       city: "Barcelona", citySlug: "barcelona", category: "Restaurants", title: "Best Catalan Cuisine Restaurants" },
  { slug: "hidden-cafes-gracia",               city: "Barcelona", citySlug: "barcelona", category: "Cafés",       title: "Hidden Cafés in Gràcia Barcelona" },
  { slug: "burger-restaurants-barcelona",      city: "Barcelona", citySlug: "barcelona", category: "Restaurants", title: "Best Burger Restaurants in Barcelona" },
  { slug: "cocktail-bars-barcelona",           city: "Barcelona", citySlug: "barcelona", category: "Bars",        title: "Top Cocktail Bars in Barcelona" },
  { slug: "lebanese-food-barcelona",           city: "Barcelona", citySlug: "barcelona", category: "Restaurants", title: "Best Lebanese Food in Barcelona" },
  { slug: "beautiful-restaurant-interiors-bcn",city: "Barcelona", citySlug: "barcelona", category: "Restaurants", title: "Most Beautiful Restaurant Interiors in Barcelona" },
  { slug: "best-sushi-barcelona",              city: "Barcelona", citySlug: "barcelona", category: "Restaurants", title: "Best Sushi in Barcelona 2025" },
  { slug: "natural-wine-bars-barcelona",       city: "Barcelona", citySlug: "barcelona", category: "Bars",        title: "Top Natural Wine Bars in Barcelona" },
  { slug: "brunch-spots-eixample",             city: "Barcelona", citySlug: "barcelona", category: "Brunch",      title: "Best Brunch Spots in Eixample Barcelona" },
  { slug: "hidden-gems-poble-sec",             city: "Barcelona", citySlug: "barcelona", category: "Restaurants", title: "Hidden Gems in Poble Sec Food Scene" },

  // ── Rome (20) ──
  { slug: "best-gelato-rome",                  city: "Rome",      citySlug: "rome",      category: "Desserts",    title: "Best Gelato in Rome Ranked 2025" },
  { slug: "pizza-al-taglio-rome",              city: "Rome",      citySlug: "rome",      category: "Street Food", title: "Top Pizza al Taglio Spots in Rome" },
  { slug: "aperitivo-bars-rome",               city: "Rome",      citySlug: "rome",      category: "Bars",        title: "Best Aperitivo Bars in Rome" },
  { slug: "hidden-trattorias-trastevere",      city: "Rome",      citySlug: "rome",      category: "Restaurants", title: "Hidden Trattorias in Trastevere Rome" },
  { slug: "best-carbonara-rome",               city: "Rome",      citySlug: "rome",      category: "Restaurants", title: "Best Carbonara in Rome 2025" },
  { slug: "street-food-rome",                  city: "Rome",      citySlug: "rome",      category: "Street Food", title: "Top Street Food in Rome" },
  { slug: "jewish-cuisine-rome-ghetto",        city: "Rome",      citySlug: "rome",      category: "Restaurants", title: "Best Jewish Cuisine in Rome's Ghetto" },
  { slug: "romantic-restaurants-rome",         city: "Rome",      citySlug: "rome",      category: "Romantic",    title: "Most Romantic Restaurants in Rome" },
  { slug: "coffee-bars-rome",                  city: "Rome",      citySlug: "rome",      category: "Cafés",       title: "Best Coffee Bars in Rome Ranked" },
  { slug: "wine-bars-rome",                    city: "Rome",      citySlug: "rome",      category: "Bars",        title: "Top Wine Bars in Rome" },
  { slug: "best-cacio-e-pepe-rome",            city: "Rome",      citySlug: "rome",      category: "Restaurants", title: "Best Cacio e Pepe Restaurants in Rome" },
  { slug: "restaurants-near-vatican",          city: "Rome",      citySlug: "rome",      category: "Restaurants", title: "Hidden Restaurants Near the Vatican Rome" },
  { slug: "best-seafood-rome",                 city: "Rome",      citySlug: "rome",      category: "Restaurants", title: "Best Seafood in Rome" },
  { slug: "rooftop-bars-rome",                 city: "Rome",      citySlug: "rome",      category: "Bars",        title: "Top Rooftop Bars in Rome" },
  { slug: "best-breakfast-rome",               city: "Rome",      citySlug: "rome",      category: "Cafés",       title: "Best Breakfast in Rome" },
  { slug: "beautiful-trattorias-rome",         city: "Rome",      citySlug: "rome",      category: "Restaurants", title: "Most Beautiful Trattorias in Rome" },
  { slug: "food-markets-rome",                 city: "Rome",      citySlug: "rome",      category: "Markets",     title: "Best Markets for Food Lovers in Rome" },
  { slug: "lebanese-food-rome",                city: "Rome",      citySlug: "rome",      category: "Restaurants", title: "Top Lebanese Food in Rome" },
  { slug: "vegetarian-restaurants-rome",       city: "Rome",      citySlug: "rome",      category: "Restaurants", title: "Best Vegetarian Restaurants in Rome" },
  { slug: "hidden-gems-pigneto-rome",          city: "Rome",      citySlug: "rome",      category: "Restaurants", title: "Hidden Gems in Pigneto Neighbourhood Rome" },
];

type Topic = typeof TOPICS[0];

// ─── Used-topics tracker ─────────────────────────────────────────────────────

function getUsedSlugs(trackerPath: string): string[] {
  if (!existsSync(trackerPath)) return [];
  try {
    return JSON.parse(readFileSync(trackerPath, "utf-8")) as string[];
  } catch {
    return [];
  }
}

function markSlugUsed(trackerPath: string, slug: string): void {
  const used = getUsedSlugs(trackerPath);
  if (!used.includes(slug)) used.push(slug);
  writeFileSync(trackerPath, JSON.stringify(used, null, 2), "utf-8");
}

// ─── Topic selection ─────────────────────────────────────────────────────────

function getExistingSlugs(filePath: string): string[] {
  const content = readFileSync(filePath, "utf-8");
  return [...content.matchAll(/^\s+slug:\s+"([^"]+)"/gm)].map((m) => m[1]);
}

function pickTopic(existingSlugs: string[], usedSlugs: string[]): Topic | null {
  const already = new Set([...existingSlugs, ...usedSlugs]);
  return TOPICS.find((t) => !already.has(t.slug)) ?? null;
}

// ─── AI-invented fallback topic ──────────────────────────────────────────────

async function inventNewTopic(client: Anthropic, existingSlugs: string[]): Promise<Topic> {
  console.log("All predefined topics exhausted — asking Claude to invent a new one...");
  const cities = ["Paris", "Barcelona", "Rome"];
  const city = cities[existingSlugs.length % 3];
  const citySlug = city.toLowerCase();

  const res = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 256,
    messages: [{
      role: "user",
      content: `You are a content strategist for CityTaste, a food & travel guide covering ${city}.
Return ONLY a JSON object (no markdown) with a brand-new, unique food/travel article topic for ${city} that has NOT been covered by any of these slugs: ${existingSlugs.join(", ")}.

{
  "slug": "kebab-shops-${citySlug}",
  "title": "Best Kebab Shops in ${city}",
  "category": "Street Food"
}

Rules: slug must be lowercase-hyphenated, unique, never in the list above. Return pure JSON only.`,
    }],
  });

  const raw = res.content[0].type === "text" ? res.content[0].text : "{}";
  const parsed = JSON.parse(raw.replace(/^```(?:json)?\n?/m, "").replace(/\n?```$/m, "").trim());
  return {
    slug: parsed.slug,
    city,
    citySlug,
    category: parsed.category ?? "Restaurants",
    title: parsed.title,
  };
}

// ─── Article generation ──────────────────────────────────────────────────────

async function generateArticle(client: Anthropic, topic: Topic): Promise<string> {
  const today = new Date().toISOString().split("T")[0];

  const prompt = `You are an expert food and travel writer for CityTaste magazine. Write a vivid, personal, and engaging blog article about: "${topic.title}"
City: ${topic.city} | Category: ${topic.category}

Use a unique angle or story hook in the intro. Include insider tips, sensory language (taste, smell, atmosphere), and vary the writing style — sometimes poetic, sometimes practical.

Return ONLY a valid JSON object with exactly this structure (no markdown fences, no extra text):
{
  "title": "${topic.title}",
  "slug": "${topic.slug}",
  "city": "${topic.city}",
  "citySlug": "${topic.citySlug}",
  "category": "${topic.category}",
  "coverImage": "<a real Unsplash photo URL matching the article topic — format: https://images.unsplash.com/photo-TIMESTAMP-RANDOMHASH?w=1200&q=80>",
  "publishedAt": "${today}",
  "readingTime": <number 5-8>,
  "metaDescription": "<compelling SEO description under 155 characters>",
  "intro": "<3-4 sentence engaging intro with a unique hook or personal angle>",
  "body": "<3 rich paragraphs separated by \\n\\n, ~500 words total, evocative food writing with sensory detail>",
  "places": [
    {
      "name": "<real place name in ${topic.city}>",
      "description": "<3 sentence description with sensory detail, atmosphere, and a must-order dish>",
      "address": "<real full street address>",
      "rating": <4.3 to 4.9>,
      "image": "<a real Unsplash photo URL relevant to this specific place — format: https://images.unsplash.com/photo-TIMESTAMP-RANDOMHASH?w=800&q=80>",
      "citySlug": "${topic.citySlug}",
      "placeSlug": null
    }
  ]
}

Requirements:
- Include exactly 5 places, all real well-known establishments in ${topic.city}
- Every image URL (cover + all places) must use a DIFFERENT Unsplash photo ID — no repeats
- Each photo ID must be a real Unsplash photo ID (format: photo-DIGITS-ALPHANUMERIC)
- Photo IDs must be relevant to the place type (restaurant interior, food, street scene, etc.)
- Body must be rich prose — no bullet points, no headers
- metaDescription must be under 155 characters
- All place names and addresses must be real and accurate
- Return pure JSON only`;

  console.log(`  → model: claude-opus-4-7, max_tokens: 3000`);
  const message = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 3000,
    messages: [{ role: "user", content: prompt }],
  });
  console.log(`  → stop_reason: ${message.stop_reason}, usage: ${JSON.stringify(message.usage)}`);

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  return text.replace(/^```(?:json)?\n?/m, "").replace(/\n?```$/m, "").trim();
}

// ─── Inject into blogData.ts ──────────────────────────────────────────────────

function injectArticle(filePath: string, articleJson: string): void {
  const content = readFileSync(filePath, "utf-8");

  const insertionMarker = "\n];\n\nexport function getAllArticles";
  const insertionIndex = content.indexOf(insertionMarker);
  if (insertionIndex === -1) {
    throw new Error("Could not locate insertion point in blogData.ts");
  }

  const parsed = JSON.parse(articleJson);
  const formatted = JSON.stringify(parsed, null, 2)
    .replace(/"placeSlug": null/g, '"placeSlug": undefined')
    .split("\n")
    .map((line) => "  " + line)
    .join("\n");

  const before = content.slice(0, insertionIndex).replace(/,\s*$/, "");
  const updated = before + ",\n" + formatted + content.slice(insertionIndex);

  writeFileSync(filePath, updated, "utf-8");
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=== generate-article.ts starting ===");
  console.log(`Node version: ${process.version}`);
  console.log(`Working directory: ${process.cwd()}`);
  console.log(`ANTHROPIC_API_KEY set: ${!!process.env.ANTHROPIC_API_KEY}`);

  const dataPath    = join(process.cwd(), "lib", "blogData.ts");
  const trackerPath = join(process.cwd(), "scripts", "used-topics.json");

  const existingSlugs = getExistingSlugs(dataPath);
  const usedSlugs     = getUsedSlugs(trackerPath);
  console.log(`\nExisting articles in blogData: ${existingSlugs.length}`);
  console.log(`Tracked used slugs: ${usedSlugs.length}`);

  const client = new Anthropic();

  let topic = pickTopic(existingSlugs, usedSlugs);
  if (!topic) {
    topic = await inventNewTopic(client, existingSlugs);
  }

  console.log(`\nSelected topic: "${topic.title}" (${topic.slug})`);
  console.log(`City: ${topic.city} | Category: ${topic.category}`);

  console.log("\nCalling Anthropic API...");
  const raw = await generateArticle(client, topic);
  console.log(`API response received (${raw.length} chars)`);
  console.log(`Response preview: ${raw.slice(0, 200)}...`);

  console.log("\nParsing JSON response...");
  const parsed = JSON.parse(raw);
  console.log(`Parsed article title: ${parsed.title}`);
  console.log(`Places count: ${parsed.places?.length ?? 0}`);
  console.log(`Cover image: ${parsed.coverImage}`);

  console.log("\nInjecting into blogData.ts...");
  injectArticle(dataPath, raw);
  console.log(`✓ Article "${topic.title}" injected into lib/blogData.ts`);

  markSlugUsed(trackerPath, topic.slug);
  console.log(`✓ Slug "${topic.slug}" recorded in used-topics.json`);
  console.log("=== Done ===");
}

main().catch((err) => {
  console.error("Fatal error:", err.message);
  console.error("Stack:", err.stack);
  process.exit(1);
});
