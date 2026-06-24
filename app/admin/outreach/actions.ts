"use server";

import { revalidatePath } from "next/cache";
import Anthropic from "@anthropic-ai/sdk";
import { createServerClient } from "@/lib/supabase-server";
import { pickBestGuide } from "@/lib/outreach";

const VALID_STATUSES = ["draft ready", "sent", "published", "rejected"];

export async function updateStatusAction(site: string, status: string) {
  if (!VALID_STATUSES.includes(status.toLowerCase())) {
    throw new Error(`Invalid status. Valid: ${VALID_STATUSES.join(", ")}`);
  }

  const supabase = createServerClient();
  const today = new Date().toISOString().split("T")[0];

  const updates: Record<string, string> = {
    status: status.toLowerCase(),
    updated_at: new Date().toISOString(),
  };

  if (["sent", "draft ready"].includes(status)) {
    const { data: current } = await supabase
      .from("outreach_targets")
      .select("date_contacted")
      .eq("site", site)
      .single();
    if (current && !current.date_contacted) {
      updates.date_contacted = today;
    }
  }
  if (status === "sent") {
    updates.article_sent = today;
  }
  if (status === "published") {
    const { data: current } = await supabase
      .from("outreach_targets")
      .select("published")
      .eq("site", site)
      .single();
    if (current && !current.published) {
      updates.published = today;
    }
  }

  const { error } = await supabase
    .from("outreach_targets")
    .update(updates)
    .eq("site", site);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/outreach");
  return { success: true };
}

// ─── Guide data for prompt generation ──────────────────────────────────────

const CITYTASTE_GUIDES: Record<string, { url: string; title: string }[]> = {
  morocco: [
    { url: "https://www.citytaste.co/cities/marrakech/things-to-do", title: "Best Things to Do in Marrakech" },
    { url: "https://www.citytaste.co/cities/marrakech/day-trips", title: "Day Trips from Marrakech" },
  ],
  food: [
    { url: "https://www.citytaste.co/blog/street-food-marrakech", title: "Street Food Marrakech Guide" },
    { url: "https://www.citytaste.co/blog/48-hours-food-guide-marrakech", title: "48 Hours Food Guide Marrakech" },
  ],
  honeymoon: [
    { url: "https://www.citytaste.co/cities/marrakech/rooftop", title: "Best Rooftop Bars in Marrakech" },
    { url: "https://www.citytaste.co/cities/marrakech/day-trips", title: "Day Trips from Marrakech" },
  ],
  backpacking: [
    { url: "https://www.citytaste.co/blog/street-food-marrakech", title: "Street Food Marrakech Guide" },
    { url: "https://www.citytaste.co/cities/marrakech/things-to-do", title: "Best Things to Do in Marrakech" },
  ],
  adventure: [
    { url: "https://www.citytaste.co/cities/marrakech/day-trips", title: "Day Trips from Marrakech" },
    { url: "https://www.citytaste.co/cities/marrakech/things-to-do", title: "Best Things to Do in Marrakech" },
  ],
  general: [
    { url: "https://www.citytaste.co/cities/marrakech/things-to-do", title: "Best Things to Do in Marrakech" },
    { url: "https://www.citytaste.co/cities/marrakech/day-trips", title: "Day Trips from Marrakech" },
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

export async function generateDraftAction(site: string) {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY environment variable is required");
  }

  const supabase = createServerClient();

  const { data: target, error: tErr } = await supabase
    .from("outreach_targets")
    .select("*")
    .eq("site", site)
    .single();

  if (tErr || !target) throw new Error(`Site "${site}" not found`);
  if (target.status === "published") throw new Error(`${site} is already published`);

  const wordTarget = parseWordCount(target.word_count);
  const linkCount = parseLinkCount(target.link_allowed);
  const cat = pickGuideCategory(target.niche);
  const guides = CITYTASTE_GUIDES[cat] ?? CITYTASTE_GUIDES.general;
  const guide = guides[0];

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // Generate draft
  const draftPrompt = `You are a senior travel writer. Write an ORIGINAL guest post article for the travel site "${target.site}" (niche: ${target.niche}).

REQUIREMENTS:
- Target word count: approximately ${wordTarget} words (never under ${Math.round(wordTarget * 0.85)}, never over ${Math.round(wordTarget * 1.15)})
- Write genuinely useful, specific, original content. No filler, no generic advice. Include real place names, real prices in MAD/EUR, real distances, real timing tips.
- Structure with clear H2 and H3 headings. Include an engaging intro paragraph and a conclusion.
- Write in first person ("I") as a traveller sharing personal experience. Warm but authoritative tone.
- The article should feel like it belongs on ${target.site} — match their ${target.niche} audience.

LINKING RULES:
- Include exactly ${Math.min(linkCount, 2)} contextual link(s) to CityTaste guides, placed naturally within the body text. Use markdown format.
- Primary link (MUST include): [relevant anchor text](${guide.url})
${linkCount >= 2 && guides.length > 1 ? `- Secondary link: [relevant anchor text](${guides[1].url})` : ""}
- The link must feel editorial and genuinely useful to the reader, not forced.
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

  const draftResponse = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    messages: [{ role: "user", content: draftPrompt }],
  });

  const draftText = draftResponse.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  const titleMatch = draftText.match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1].trim() : "Untitled Draft";
  const wordCount = draftText.split(/\s+/).length;

  // Generate pitch
  const pitchPrompt = `Write a short, human, professional pitch email for a guest post submission.

TARGET SITE: ${target.site}
SITE NICHE: ${target.niche}
PROPOSED ARTICLE TITLE: "${title}"
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

  const pitchResponse = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 500,
    messages: [{ role: "user", content: pitchPrompt }],
  });

  const pitchText = pitchResponse.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  const today = new Date().toISOString().split("T")[0];

  // Upsert draft + pitch into outreach_drafts
  const { error: draftErr } = await supabase
    .from("outreach_drafts")
    .upsert({
      site,
      draft_title: title,
      draft_content: draftText,
      draft_word_count: wordCount,
      draft_word_target: wordTarget,
      citytaste_link: guide.url,
      pitch_content: pitchText,
      niche: target.niche,
      generated_at: today,
      updated_at: new Date().toISOString(),
    }, { onConflict: "site" });

  if (draftErr) throw new Error(`Failed to save draft: ${draftErr.message}`);

  // Update target status to "draft ready"
  await supabase
    .from("outreach_targets")
    .update({ status: "draft ready", date_contacted: today, updated_at: new Date().toISOString() })
    .eq("site", site);

  revalidatePath("/admin/outreach");
  return { success: true };
}
