#!/usr/bin/env tsx
/**
 * Guest-post draft + pitch generator.
 *
 * Usage:
 *   npx tsx scripts/outreach/prepare-guest-post.ts --site moroccotourspost.com
 *
 * Reads content/outreach/guest-post-targets.csv, generates:
 *   - content/outreach/drafts/{site}-{date}.md   (article draft)
 *   - content/outreach/pitches/{site}-{date}.md  (pitch email)
 *
 * NEVER contacts external sites. All output is local files.
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

// ─── Paths ──────────────────────────────────────────────────────────────────

const ROOT = path.resolve(import.meta.dirname, "../..");
const CSV_PATH = path.join(ROOT, "content/outreach/guest-post-targets.csv");
const DRAFTS_DIR = path.join(ROOT, "content/outreach/drafts");
const PITCHES_DIR = path.join(ROOT, "content/outreach/pitches");

// ─── CSV parser ─────────────────────────────────────────────────────────────

interface Target {
  site: string;
  da: string;
  niche: string;
  link_allowed: string;
  word_count: string;
  submission_page: string;
  priority: string;
  status: string;
  date_contacted: string;
  article_sent: string;
  published: string;
  link_obtained: string;
}

function parseCSV(csvPath: string): Target[] {
  const raw = fs.readFileSync(csvPath, "utf-8");
  const lines = raw.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim());
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] ?? "";
    });
    return obj as unknown as Target;
  });
}

function findTarget(targets: Target[], site: string): Target | undefined {
  return targets.find(
    (t) => t.site.toLowerCase() === site.toLowerCase()
  );
}

// ─── Angle picker ───────────────────────────────────────────────────────────

const CITYTASTE_GUIDES: Record<string, { url: string; title: string }[]> = {
  morocco: [
    { url: "https://www.citytaste.co/cities/marrakech/things-to-do", title: "Best Things to Do in Marrakech" },
    { url: "https://www.citytaste.co/cities/marrakech/day-trips", title: "Day Trips from Marrakech" },
    { url: "https://www.citytaste.co/cities/marrakech/rooftop", title: "Best Rooftop Bars in Marrakech" },
    { url: "https://www.citytaste.co/blog/best-sunset-terraces-marrakech", title: "Best Sunset Terraces in Marrakech" },
    { url: "https://www.citytaste.co/blog/48-hours-food-guide-marrakech", title: "48 Hours Food Guide Marrakech" },
    { url: "https://www.citytaste.co/blog/street-food-marrakech", title: "Street Food Marrakech Guide" },
    { url: "https://www.citytaste.co/cities/marrakech/hammam", title: "Best Hammams in Marrakech" },
    { url: "https://www.citytaste.co/cities/marrakech/souks", title: "Best Souks in Marrakech" },
    { url: "https://www.citytaste.co/cities/marrakech/restaurants", title: "Best Restaurants in Marrakech" },
  ],
  food: [
    { url: "https://www.citytaste.co/blog/street-food-marrakech", title: "Street Food Marrakech Guide" },
    { url: "https://www.citytaste.co/blog/48-hours-food-guide-marrakech", title: "48 Hours Food Guide Marrakech" },
    { url: "https://www.citytaste.co/cities/marrakech/restaurants", title: "Best Restaurants in Marrakech" },
    { url: "https://www.citytaste.co/recettes", title: "Moroccan Recipes" },
  ],
  honeymoon: [
    { url: "https://www.citytaste.co/cities/marrakech/rooftop", title: "Best Rooftop Bars in Marrakech" },
    { url: "https://www.citytaste.co/cities/marrakech/day-trips", title: "Day Trips from Marrakech" },
    { url: "https://www.citytaste.co/cities/marrakech/hammam", title: "Best Hammams in Marrakech" },
    { url: "https://www.citytaste.co/blog/best-sunset-terraces-marrakech", title: "Best Sunset Terraces in Marrakech" },
  ],
  backpacking: [
    { url: "https://www.citytaste.co/blog/street-food-marrakech", title: "Street Food Marrakech Guide" },
    { url: "https://www.citytaste.co/cities/marrakech/things-to-do", title: "Best Things to Do in Marrakech" },
    { url: "https://www.citytaste.co/cities/marrakech/day-trips", title: "Day Trips from Marrakech" },
    { url: "https://www.citytaste.co/cities/marrakech/souks", title: "Best Souks in Marrakech" },
  ],
  adventure: [
    { url: "https://www.citytaste.co/cities/marrakech/day-trips", title: "Day Trips from Marrakech" },
    { url: "https://www.citytaste.co/cities/marrakech/things-to-do", title: "Best Things to Do in Marrakech" },
    { url: "https://www.citytaste.co/blog/street-food-marrakech", title: "Street Food Marrakech Guide" },
  ],
  general: [
    { url: "https://www.citytaste.co/cities/marrakech/things-to-do", title: "Best Things to Do in Marrakech" },
    { url: "https://www.citytaste.co/cities/marrakech/day-trips", title: "Day Trips from Marrakech" },
    { url: "https://www.citytaste.co/blog/48-hours-food-guide-marrakech", title: "48 Hours Food Guide Marrakech" },
  ],
};

function pickGuideCategory(niche: string): string {
  const lower = niche.toLowerCase();
  if (lower.includes("miel") || lower.includes("couple") || lower.includes("honeymoon") || lower.includes("romantic")) return "honeymoon";
  if (lower.includes("food") || lower.includes("cuisine") || lower.includes("epicur")) return "food";
  if (lower.includes("backpack") || lower.includes("hostel") || lower.includes("budget")) return "backpacking";
  if (lower.includes("aventure") || lower.includes("adventure") || lower.includes("experience")) return "adventure";
  if (lower.includes("maroc") || lower.includes("morocco")) return "morocco";
  return "general";
}

function pickBestGuide(niche: string): { url: string; title: string } {
  const cat = pickGuideCategory(niche);
  const guides = CITYTASTE_GUIDES[cat] ?? CITYTASTE_GUIDES.general;
  return guides[0];
}

// ─── Word count parser ──────────────────────────────────────────────────────

function parseWordCount(raw: string): number {
  if (!raw) return 1000;
  const match = raw.match(/(\d+)/);
  if (!match) return 1000;
  const n = parseInt(match[1], 10);
  if (raw.includes("-")) {
    const parts = raw.match(/(\d+)\s*-\s*(\d+)/);
    if (parts) return Math.round((parseInt(parts[1], 10) + parseInt(parts[2], 10)) / 2);
  }
  if (raw.includes("+")) return Math.max(n, 800);
  if (raw.startsWith("~")) return n;
  return n;
}

function parseLinkCount(raw: string): number {
  if (!raw) return 1;
  const match = raw.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

// ─── Draft generation ───────────────────────────────────────────────────────

async function generateDraft(
  client: Anthropic,
  target: Target,
): Promise<{ draft: string; title: string; citytasteUrl: string; wordTarget: number }> {
  const wordTarget = parseWordCount(target.word_count);
  const linkCount = parseLinkCount(target.link_allowed);
  const guide = pickBestGuide(target.niche);
  const cat = pickGuideCategory(target.niche);
  const allGuides = CITYTASTE_GUIDES[cat] ?? CITYTASTE_GUIDES.general;

  const prompt = `You are a senior travel writer. Write an ORIGINAL guest post article for the travel site "${target.site}" (niche: ${target.niche}).

REQUIREMENTS:
- Target word count: approximately ${wordTarget} words (never under ${Math.round(wordTarget * 0.85)}, never over ${Math.round(wordTarget * 1.15)})
- Write genuinely useful, specific, original content. No filler, no generic advice. Include real place names, real prices in MAD/EUR, real distances, real timing tips.
- Structure with clear H2 and H3 headings. Include an engaging intro paragraph and a conclusion.
- Write in first person ("I") as a traveller sharing personal experience. Warm but authoritative tone.
- The article should feel like it belongs on ${target.site} — match their ${target.niche} audience.

LINKING RULES:
- Include exactly ${Math.min(linkCount, 2)} contextual link(s) to CityTaste guides, placed naturally within the body text. Use markdown format.
- Primary link (MUST include): [relevant anchor text](${guide.url})
${linkCount >= 2 && allGuides.length > 1 ? `- Secondary link: [relevant anchor text](${allGuides[1].url})` : ""}
- The link must feel editorial and genuinely useful to the reader, not forced. Place it where a reader would naturally want more detail.
- Do NOT include any other external links.

TOPIC GUIDANCE based on niche "${target.niche}":
${cat === "honeymoon" ? "Write about a romantic Morocco itinerary for couples — Marrakech riads, sunset rooftops, hammam experiences, desert stargazing." : ""}
${cat === "food" ? "Write about Moroccan food culture — street food markets, traditional dishes, cooking classes, the food scene in Marrakech." : ""}
${cat === "backpacking" ? "Write about Morocco on a budget — cheap eats, free activities, budget riads, navigating the souks, day trips." : ""}
${cat === "adventure" ? "Write about Morocco's adventure side — Atlas Mountains trekking, desert experiences, hot air balloons, quad biking." : ""}
${cat === "morocco" ? "Write a comprehensive insider guide to Marrakech — the things most guides miss, honest tips, real experiences." : ""}
${cat === "general" ? "Write about why Marrakech deserves more than 2 days — a deeper travel guide covering food, culture, and day trips." : ""}

OUTPUT FORMAT:
Return ONLY the article in markdown. Start with a compelling title as an H1 (# Title). Do not include any meta-commentary or notes.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  const titleMatch = text.match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1].trim() : "Untitled Draft";

  return { draft: text, title, citytasteUrl: guide.url, wordTarget };
}

// ─── Pitch generation ───────────────────────────────────────────────────────

async function generatePitch(
  client: Anthropic,
  target: Target,
  articleTitle: string,
): Promise<string> {
  const prompt = `Write a short, human, professional pitch email for a guest post submission.

TARGET SITE: ${target.site}
SITE NICHE: ${target.niche}
PROPOSED ARTICLE TITLE: "${articleTitle}"
SUBMISSION PAGE: ${target.submission_page}

RULES:
- 4-6 sentences maximum. No fluff.
- Mention their specific niche/audience to show you know the site.
- Briefly describe the article and why it would be valuable to their readers.
- Mention you have a ready draft attached/available.
- Professional but warm tone. Not corporate, not spammy.
- Sign off with "[Your Name]" as placeholder.
- Do NOT include a subject line — just the email body.

OUTPUT: Return ONLY the email text, nothing else.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 500,
    messages: [{ role: "user", content: prompt }],
  });

  return response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const siteIdx = args.indexOf("--site");
  const dryRun = args.includes("--dry-run");

  if (siteIdx === -1 || !args[siteIdx + 1]) {
    console.error("Usage: npx tsx scripts/outreach/prepare-guest-post.ts --site <domain> [--dry-run]");
    console.error("Example: npx tsx scripts/outreach/prepare-guest-post.ts --site moroccotourspost.com");
    process.exit(1);
  }
  const siteName = args[siteIdx + 1];

  if (!fs.existsSync(CSV_PATH)) {
    console.error(`CSV not found: ${CSV_PATH}`);
    process.exit(1);
  }

  const targets = parseCSV(CSV_PATH);
  const target = findTarget(targets, siteName);
  if (!target) {
    console.error(`Site "${siteName}" not found in CSV. Available sites:`);
    targets.forEach((t) => console.error(`  - ${t.site}`));
    process.exit(1);
  }

  if (target.status === "published") {
    console.log(`⚠ ${target.site} is already marked as "published". Skipping.`);
    process.exit(0);
  }

  const wordTarget = parseWordCount(target.word_count);
  const linkCount = parseLinkCount(target.link_allowed);
  const guide = pickBestGuide(target.niche);

  console.log(`\n━━ Preparing guest post for: ${target.site} ━━\n`);
  console.log(`  Niche:          ${target.niche}`);
  console.log(`  DA:             ${target.da || "unknown"}`);
  console.log(`  Word count:     ${target.word_count || "~1000 (default)"} → target ${wordTarget}`);
  console.log(`  Links allowed:  ${target.link_allowed || "1 (default)"} → ${linkCount} link(s)`);
  console.log(`  Priority:       ${target.priority}`);
  console.log(`  Guide match:    ${guide.title}`);
  console.log(`  CityTaste URL:  ${guide.url}`);

  const today = new Date().toISOString().split("T")[0];
  const safeSite = target.site.replace(/\./g, "-");

  if (dryRun) {
    console.log("\n  [DRY RUN — skipping API call]\n");
    console.log("━━ CHECKLIST — before you send ━━\n");
    console.log(`  📌 Target site:      ${target.site}`);
    console.log(`  📌 Submission page:  ${target.submission_page}`);
    console.log(`  📌 Word target:      ${wordTarget} words (required: ${target.word_count || "not specified"})`);
    console.log(`  📌 Links allowed:    ${target.link_allowed || "not specified"}`);
    console.log(`  📌 CityTaste link:   ${guide.url}`);
    console.log(`  📌 Priority:         ${target.priority}`);
    console.log(`\n  Draft would be saved to:  content/outreach/drafts/${safeSite}-${today}.md`);
    console.log(`  Pitch would be saved to:  content/outreach/pitches/${safeSite}-${today}.md`);
    console.log("");
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("\nError: ANTHROPIC_API_KEY environment variable required.");
    console.error("Set it with: export ANTHROPIC_API_KEY=sk-...");
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  // Generate draft
  console.log("\n📝 Generating article draft...");
  const { draft, title, citytasteUrl } = await generateDraft(client, target);
  const wordCount = draft.split(/\s+/).length;

  const draftFrontmatter = `---
target_site: ${target.site}
proposed_title: "${title}"
word_count: ${wordCount}
word_target: ${wordTarget}
citytaste_link: ${citytasteUrl}
niche: ${target.niche}
generated: ${today}
status: draft
---

`;

  const draftPath = path.join(DRAFTS_DIR, `${safeSite}-${today}.md`);
  fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  fs.writeFileSync(draftPath, draftFrontmatter + draft, "utf-8");
  console.log(`  ✓ Draft saved: ${path.relative(ROOT, draftPath)}`);
  console.log(`  ✓ Word count: ${wordCount} (target: ${wordTarget})`);

  // Generate pitch
  console.log("\n✉️  Generating pitch email...");
  const pitch = await generatePitch(client, target, title);

  const pitchFrontmatter = `---
target_site: ${target.site}
article_title: "${title}"
submission_page: ${target.submission_page}
generated: ${today}
---

`;

  const pitchPath = path.join(PITCHES_DIR, `${safeSite}-${today}.md`);
  fs.mkdirSync(PITCHES_DIR, { recursive: true });
  fs.writeFileSync(pitchPath, pitchFrontmatter + pitch, "utf-8");
  console.log(`  ✓ Pitch saved: ${path.relative(ROOT, pitchPath)}`);

  // Print checklist
  console.log("\n━━ CHECKLIST — before you send ━━\n");
  console.log(`  📌 Target site:      ${target.site}`);
  console.log(`  📌 Submission page:  ${target.submission_page}`);
  console.log(`  📌 Word count:       ${wordCount} words (required: ${target.word_count || "not specified"})`);
  console.log(`  📌 Links allowed:    ${target.link_allowed || "not specified"}`);
  console.log(`  📌 CityTaste link:   ${citytasteUrl}`);
  console.log(`  📌 Priority:         ${target.priority}`);
  console.log("");
  console.log("  ☐ Review and EDIT the draft — make it yours");
  console.log("  ☐ Personalize the pitch email");
  console.log("  ☐ Submit manually via the submission page");
  console.log("  ☐ After sending: npm run outreach:mark -- --site " + target.site + " --status sent");
  console.log("");
}

main().catch((err) => {
  console.error("Error:", err.message ?? err);
  process.exit(1);
});
