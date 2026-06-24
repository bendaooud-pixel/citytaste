import { createServerClient } from "@/lib/supabase-server";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface OutreachTarget {
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

export interface DraftInfo {
  title: string;
  wordCount: number;
  wordTarget: number;
  citytasteLink: string;
  niche: string;
  generated: string;
  content: string;
}

export interface PitchInfo {
  articleTitle: string;
  submissionPage: string;
  generated: string;
  content: string;
}

export interface ProgressStats {
  total: number;
  sent: number;
  published: number;
  rejected: number;
  draftReady: number;
  remaining: number;
}

export interface EnrichedTarget extends OutreachTarget {
  draft: DraftInfo | null;
  pitch: PitchInfo | null;
  guide: { url: string; title: string };
}

export interface OutreachPageData {
  targets: EnrichedTarget[];
  todaysSites: string[];
  progress: ProgressStats;
}

// ─── Priority sorting ──────────────────────────────────────────────────────

const PRIORITY_RANK: Record<string, number> = {
  maroc: 1,
  "maroc honeymoon": 2,
  food: 3,
  "gros poisson": 4,
  gros: 5,
  bon: 6,
  facile: 7,
};

function sortByPriority(targets: OutreachTarget[]): OutreachTarget[] {
  return [...targets].sort((a, b) => {
    const pa = PRIORITY_RANK[a.priority.toLowerCase()] ?? 99;
    const pb = PRIORITY_RANK[b.priority.toLowerCase()] ?? 99;
    if (pa !== pb) return pa - pb;
    return (parseInt(b.da) || 0) - (parseInt(a.da) || 0);
  });
}

function getTodaysTargets(
  targets: OutreachTarget[],
  count = 3,
): OutreachTarget[] {
  const sorted = sortByPriority(targets);
  return sorted
    .filter((t) => !["sent", "published"].includes(t.status.toLowerCase()))
    .slice(0, count);
}

// ─── Progress ──────────────────────────────────────────────────────────────

function getProgress(targets: OutreachTarget[]): ProgressStats {
  const total = targets.length;
  const sent = targets.filter((t) => t.status.toLowerCase() === "sent").length;
  const published = targets.filter(
    (t) => t.status.toLowerCase() === "published",
  ).length;
  const rejected = targets.filter(
    (t) => t.status.toLowerCase() === "rejected",
  ).length;
  const draftReady = targets.filter(
    (t) => t.status.toLowerCase() === "draft ready",
  ).length;
  return { total, sent, published, rejected, draftReady, remaining: total - sent - published };
}

// ─── Guide matching ──────────────────────────────────────────────────────

function guideCategory(niche: string): string {
  const l = niche.toLowerCase();
  if (l.includes("miel") || l.includes("couple") || l.includes("honeymoon")) return "honeymoon";
  if (l.includes("food") || l.includes("cuisine") || l.includes("epicur")) return "food";
  if (l.includes("backpack") || l.includes("hostel") || l.includes("budget")) return "backpacking";
  if (l.includes("aventure") || l.includes("adventure") || l.includes("experience")) return "adventure";
  if (l.includes("maroc") || l.includes("morocco")) return "morocco";
  return "general";
}

const GUIDE_FIRST: Record<string, { url: string; title: string }> = {
  morocco: { url: "https://www.citytaste.co/cities/marrakech/things-to-do", title: "Best Things to Do in Marrakech" },
  food: { url: "https://www.citytaste.co/blog/street-food-marrakech", title: "Street Food Marrakech Guide" },
  honeymoon: { url: "https://www.citytaste.co/cities/marrakech/rooftop", title: "Best Rooftop Bars in Marrakech" },
  backpacking: { url: "https://www.citytaste.co/blog/street-food-marrakech", title: "Street Food Marrakech Guide" },
  adventure: { url: "https://www.citytaste.co/cities/marrakech/day-trips", title: "Day Trips from Marrakech" },
  general: { url: "https://www.citytaste.co/cities/marrakech/things-to-do", title: "Best Things to Do in Marrakech" },
};

export function pickBestGuide(niche: string): { url: string; title: string } {
  return GUIDE_FIRST[guideCategory(niche)] ?? GUIDE_FIRST.general;
}

// ─── Supabase loader ──────────────────────────────────────────────────────

interface DbTarget {
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

interface DbDraft {
  site: string;
  draft_title: string;
  draft_content: string;
  draft_word_count: number;
  draft_word_target: number;
  citytaste_link: string;
  pitch_content: string;
  niche: string;
  generated_at: string;
}

const EMPTY_DATA: OutreachPageData = {
  targets: [],
  todaysSites: [],
  progress: { total: 0, sent: 0, published: 0, rejected: 0, draftReady: 0, remaining: 0 },
};

export async function loadOutreachData(): Promise<OutreachPageData> {
  try {
    const supabase = createServerClient();

    const { data: rawTargets, error: tErr } = await supabase
      .from("outreach_targets")
      .select("site, da, niche, link_allowed, word_count, submission_page, priority, status, date_contacted, article_sent, published, link_obtained");

    if (tErr || !rawTargets?.length) return EMPTY_DATA;

    const targets = rawTargets as DbTarget[];

    const { data: rawDrafts } = await supabase
      .from("outreach_drafts")
      .select("site, draft_title, draft_content, draft_word_count, draft_word_target, citytaste_link, pitch_content, niche, generated_at");

    const draftsMap = new Map<string, DbDraft>();
    if (rawDrafts) {
      for (const d of rawDrafts as DbDraft[]) {
        draftsMap.set(d.site, d);
      }
    }

    const sorted = sortByPriority(targets);
    const todays = getTodaysTargets(targets);

    const enriched: EnrichedTarget[] = sorted.map((t) => {
      const d = draftsMap.get(t.site);
      const draft: DraftInfo | null = d
        ? {
            title: d.draft_title,
            wordCount: d.draft_word_count,
            wordTarget: d.draft_word_target,
            citytasteLink: d.citytaste_link,
            niche: d.niche,
            generated: d.generated_at,
            content: d.draft_content,
          }
        : null;

      const pitch: PitchInfo | null = d?.pitch_content
        ? {
            articleTitle: d.draft_title,
            submissionPage: t.submission_page,
            generated: d.generated_at,
            content: d.pitch_content,
          }
        : null;

      return {
        ...t,
        draft,
        pitch,
        guide: pickBestGuide(t.niche),
      };
    });

    return {
      targets: enriched,
      todaysSites: todays.map((t) => t.site),
      progress: getProgress(targets),
    };
  } catch {
    return EMPTY_DATA;
  }
}
