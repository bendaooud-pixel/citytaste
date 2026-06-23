#!/usr/bin/env tsx
/**
 * Outreach status dashboard.
 *
 * Usage: npx tsx scripts/outreach/status.ts
 *
 * Reads the CSV and shows a summary of outreach progress.
 */

import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "../..");
const CSV_PATH = path.join(ROOT, "content/outreach/guest-post-targets.csv");
const DRAFTS_DIR = path.join(ROOT, "content/outreach/drafts");

interface Target {
  site: string;
  da: string;
  niche: string;
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
  return lines.slice(1).filter((l) => l.trim()).map((line) => {
    const values = line.split(",").map((v) => v.trim());
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = values[i] ?? ""; });
    return obj as unknown as Target;
  });
}

function hasDraft(site: string): boolean {
  if (!fs.existsSync(DRAFTS_DIR)) return false;
  const safeSite = site.replace(/\./g, "-");
  return fs.readdirSync(DRAFTS_DIR).some((f) => f.startsWith(safeSite));
}

function main() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`CSV not found: ${CSV_PATH}`);
    process.exit(1);
  }

  const targets = parseCSV(CSV_PATH);

  const counts = {
    total: targets.length,
    toContact: 0,
    draftReady: 0,
    sent: 0,
    published: 0,
    linkObtained: 0,
  };

  console.log("\n━━ OUTREACH STATUS ━━\n");
  console.log("  Site                          DA    Priority         Status");
  console.log("  " + "─".repeat(70));

  for (const t of targets) {
    const status = t.status || (hasDraft(t.site) ? "draft ready" : "to contact");
    const da = t.da ? `DA ${t.da}` : "DA ?";
    const line = `  ${t.site.padEnd(30)} ${da.padEnd(6)} ${t.priority.padEnd(16)} ${status}`;
    console.log(line);

    if (status === "published" || t.published) counts.published++;
    else if (status === "sent" || t.article_sent) counts.sent++;
    else if (status === "draft ready" || hasDraft(t.site)) counts.draftReady++;
    else counts.toContact++;

    if (t.link_obtained) counts.linkObtained++;
  }

  console.log("  " + "─".repeat(70));
  console.log(`\n  📊 Summary:`);
  console.log(`     Total targets:    ${counts.total}`);
  console.log(`     To contact:       ${counts.toContact}`);
  console.log(`     Draft ready:      ${counts.draftReady}`);
  console.log(`     Sent:             ${counts.sent}`);
  console.log(`     Published:        ${counts.published}`);
  console.log(`     Links obtained:   ${counts.linkObtained}`);
  console.log("");
}

main();
