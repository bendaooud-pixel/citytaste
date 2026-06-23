import fs from "fs";
import path from "path";

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

// ─── Paths ─────────────────────────────────────────────────────────────────

const CSV_REL = "content/outreach/guest-post-targets.csv";
const DRAFTS_REL = "content/outreach/drafts";
const PITCHES_REL = "content/outreach/pitches";

function csvPath() {
  return path.join(process.cwd(), CSV_REL);
}

// ─── CSV ───────────────────────────────────────────────────────────────────

export function parseTargets(): OutreachTarget[] {
  const p = csvPath();
  if (!fs.existsSync(p)) return [];
  const raw = fs.readFileSync(p, "utf-8");
  const lines = raw.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim());

  return lines
    .slice(1)
    .filter((l) => l.trim())
    .map((line) => {
      const vals = line.split(",").map((v) => v.trim());
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => (obj[h] = vals[i] ?? ""));
      return obj as unknown as OutreachTarget;
    });
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

export function sortByPriority(targets: OutreachTarget[]): OutreachTarget[] {
  return [...targets].sort((a, b) => {
    const pa = PRIORITY_RANK[a.priority.toLowerCase()] ?? 99;
    const pb = PRIORITY_RANK[b.priority.toLowerCase()] ?? 99;
    if (pa !== pb) return pa - pb;
    return (parseInt(b.da) || 0) - (parseInt(a.da) || 0);
  });
}

export function getTodaysTargets(
  targets: OutreachTarget[],
  count = 3,
): OutreachTarget[] {
  const sorted = sortByPriority(targets);
  return sorted
    .filter((t) => !["sent", "published"].includes(t.status.toLowerCase()))
    .slice(0, count);
}

// ─── Progress ──────────────────────────────────────────────────────────────

export function getProgress(targets: OutreachTarget[]): ProgressStats {
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

// ─── Frontmatter parser ────────────────────────────────────────────────────

function parseFrontmatter(raw: string): {
  meta: Record<string, string>;
  content: string;
} {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { meta: {}, content: raw };
  const meta: Record<string, string> = {};
  m[1].split("\n").forEach((line) => {
    const kv = line.match(/^(\w[\w_]*):\s*"?(.+?)"?\s*$/);
    if (kv) meta[kv[1]] = kv[2];
  });
  return { meta, content: m[2].trim() };
}

// ─── Draft / Pitch readers ─────────────────────────────────────────────────

export function getDraft(site: string): DraftInfo | null {
  const dir = path.join(process.cwd(), DRAFTS_REL);
  if (!fs.existsSync(dir)) return null;
  const prefix = site.replace(/\./g, "-");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.startsWith(prefix) && f.endsWith(".md"))
    .sort()
    .reverse();
  if (!files.length) return null;

  const { meta, content } = parseFrontmatter(
    fs.readFileSync(path.join(dir, files[0]), "utf-8"),
  );
  return {
    title: meta.proposed_title ?? "",
    wordCount: parseInt(meta.word_count) || 0,
    wordTarget: parseInt(meta.word_target) || 0,
    citytasteLink: meta.citytaste_link ?? "",
    niche: meta.niche ?? "",
    generated: meta.generated ?? "",
    content,
  };
}

export function getPitch(site: string): PitchInfo | null {
  const dir = path.join(process.cwd(), PITCHES_REL);
  if (!fs.existsSync(dir)) return null;
  const prefix = site.replace(/\./g, "-");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.startsWith(prefix) && f.endsWith(".md"))
    .sort()
    .reverse();
  if (!files.length) return null;

  const { meta, content } = parseFrontmatter(
    fs.readFileSync(path.join(dir, files[0]), "utf-8"),
  );
  return {
    articleTitle: meta.article_title ?? "",
    submissionPage: meta.submission_page ?? "",
    generated: meta.generated ?? "",
    content,
  };
}

// ─── Guide matching (mirrors prepare-guest-post.ts) ────────────────────────

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

// ─── Status update ─────────────────────────────────────────────────────────

const VALID_STATUSES = ["draft ready", "sent", "published", "rejected"];

export function updateTargetStatus(
  site: string,
  newStatus: string,
): { success: boolean; error?: string } {
  if (!VALID_STATUSES.includes(newStatus.toLowerCase())) {
    return { success: false, error: `Invalid status. Valid: ${VALID_STATUSES.join(", ")}` };
  }

  const p = csvPath();
  if (!fs.existsSync(p)) return { success: false, error: "CSV not found" };

  const raw = fs.readFileSync(p, "utf-8");
  const lines = raw.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());

  const col = (name: string) => headers.indexOf(name);
  const today = new Date().toISOString().split("T")[0];
  let found = false;

  const updated = lines.map((line, i) => {
    if (i === 0) return line;
    const vals = line.split(",");
    if (vals[0]?.trim().toLowerCase() !== site.toLowerCase()) return line;

    found = true;
    vals[col("status")] = newStatus.toLowerCase();

    if (["sent", "draft ready"].includes(newStatus)) {
      const dc = col("date_contacted");
      if (dc >= 0 && !vals[dc]?.trim()) vals[dc] = today;
    }
    if (newStatus === "sent") {
      const as = col("article_sent");
      if (as >= 0) vals[as] = today;
    }
    if (newStatus === "published") {
      const pb = col("published");
      if (pb >= 0 && !vals[pb]?.trim()) vals[pb] = today;
    }
    return vals.join(",");
  });

  if (!found) return { success: false, error: `Site "${site}" not found` };

  fs.writeFileSync(p, updated.join("\n") + "\n", "utf-8");
  return { success: true };
}

// ─── Composite loader ──────────────────────────────────────────────────────

export function loadOutreachData(): OutreachPageData {
  const raw = parseTargets();
  const sorted = sortByPriority(raw);
  const todays = getTodaysTargets(raw);

  const targets: EnrichedTarget[] = sorted.map((t) => ({
    ...t,
    draft: getDraft(t.site),
    pitch: getPitch(t.site),
    guide: pickBestGuide(t.niche),
  }));

  return {
    targets,
    todaysSites: todays.map((t) => t.site),
    progress: getProgress(raw),
  };
}
