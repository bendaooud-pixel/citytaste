#!/usr/bin/env tsx
/**
 * Seeds outreach_targets and outreach_drafts tables in Supabase
 * from local CSV + draft/pitch files.
 *
 * Prerequisites: tables must exist (run 002_outreach_schema.sql in Supabase SQL Editor first)
 *
 * Usage: npx tsx scripts/seed-outreach.ts
 */

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CSV_PATH = path.join(ROOT, "content/outreach/guest-post-targets.csv");
const DRAFTS_DIR = path.join(ROOT, "content/outreach/drafts");
const PITCHES_DIR = path.join(ROOT, "content/outreach/pitches");

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.");
  console.error("Run: source .env.local && npx tsx scripts/seed-outreach.ts");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function parseFrontmatter(raw: string): { meta: Record<string, string>; content: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { meta: {}, content: raw };
  const meta: Record<string, string> = {};
  m[1].split("\n").forEach((line) => {
    const kv = line.match(/^(\w[\w_]*):\s*"?(.+?)"?\s*$/);
    if (kv) meta[kv[1]] = kv[2];
  });
  return { meta, content: m[2].trim() };
}

async function main() {
  // 1. Parse CSV
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`CSV not found: ${CSV_PATH}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(CSV_PATH, "utf-8");
  const lines = raw.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());

  const targets = lines.slice(1).filter((l) => l.trim()).map((line) => {
    const vals = line.split(",").map((v) => v.trim());
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => (obj[h] = vals[i] ?? ""));
    return obj;
  });

  console.log(`Found ${targets.length} targets in CSV`);

  // 2. Upsert targets
  const targetRows = targets.map((t) => ({
    site: t.site,
    da: t.da || "",
    niche: t.niche || "",
    link_allowed: t.link_allowed || "",
    word_count: t.word_count || "",
    submission_page: t.submission_page || "",
    priority: t.priority || "",
    status: t.status || "",
    date_contacted: t.date_contacted || "",
    article_sent: t.article_sent || "",
    published: t.published || "",
    link_obtained: t.link_obtained || "",
  }));

  const { error: targetsError } = await supabase
    .from("outreach_targets")
    .upsert(targetRows, { onConflict: "site" });

  if (targetsError) {
    console.error("Failed to upsert targets:", targetsError.message);
    process.exit(1);
  }
  console.log(`Upserted ${targetRows.length} targets`);

  // 3. Find and seed drafts
  if (!fs.existsSync(DRAFTS_DIR)) {
    console.log("No drafts directory — skipping draft seeding");
    return;
  }

  const draftFiles = fs.readdirSync(DRAFTS_DIR).filter((f) => f.endsWith(".md"));
  console.log(`Found ${draftFiles.length} draft files`);

  for (const draftFile of draftFiles) {
    const draftRaw = fs.readFileSync(path.join(DRAFTS_DIR, draftFile), "utf-8");
    const { meta: draftMeta, content: draftContent } = parseFrontmatter(draftRaw);
    const site = draftMeta.target_site;
    if (!site) {
      console.warn(`  Skipping ${draftFile} — no target_site in frontmatter`);
      continue;
    }

    // Find matching pitch
    let pitchContent = "";
    if (fs.existsSync(PITCHES_DIR)) {
      const prefix = site.replace(/\./g, "-");
      const pitchFiles = fs.readdirSync(PITCHES_DIR)
        .filter((f) => f.startsWith(prefix) && f.endsWith(".md"))
        .sort().reverse();
      if (pitchFiles.length > 0) {
        const pitchRaw = fs.readFileSync(path.join(PITCHES_DIR, pitchFiles[0]), "utf-8");
        const { content } = parseFrontmatter(pitchRaw);
        pitchContent = content;
      }
    }

    const draftRow = {
      site,
      draft_title: draftMeta.proposed_title || "",
      draft_content: draftContent,
      draft_word_count: parseInt(draftMeta.word_count) || 0,
      draft_word_target: parseInt(draftMeta.word_target) || 0,
      citytaste_link: draftMeta.citytaste_link || "",
      pitch_content: pitchContent,
      niche: draftMeta.niche || "",
      generated_at: draftMeta.generated || "",
    };

    const { error: draftError } = await supabase
      .from("outreach_drafts")
      .upsert(draftRow, { onConflict: "site" });

    if (draftError) {
      console.error(`  Failed to upsert draft for ${site}:`, draftError.message);
    } else {
      console.log(`  Upserted draft for ${site} (${draftRow.draft_word_count} words)`);
    }
  }

  console.log("\nSeed complete!");
}

main().catch((err) => {
  console.error("Error:", err.message ?? err);
  process.exit(1);
});
