#!/usr/bin/env tsx
/**
 * Mark a target's status in the CSV.
 *
 * Usage:
 *   npx tsx scripts/outreach/mark-status.ts --site moroccotourspost.com --status sent
 *   npx tsx scripts/outreach/mark-status.ts --site moroccotourspost.com --status published
 *
 * Valid statuses: draft ready, sent, published, rejected
 */

import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "../..");
const CSV_PATH = path.join(ROOT, "content/outreach/guest-post-targets.csv");

const VALID_STATUSES = ["draft ready", "sent", "published", "rejected"];

function main() {
  const args = process.argv.slice(2);
  const siteIdx = args.indexOf("--site");
  const statusIdx = args.indexOf("--status");

  if (siteIdx === -1 || !args[siteIdx + 1] || statusIdx === -1 || !args[statusIdx + 1]) {
    console.error("Usage: npx tsx scripts/outreach/mark-status.ts --site <domain> --status <status>");
    console.error(`Valid statuses: ${VALID_STATUSES.join(", ")}`);
    process.exit(1);
  }

  const siteName = args[siteIdx + 1].toLowerCase();
  const newStatus = args[statusIdx + 1].toLowerCase();

  if (!VALID_STATUSES.includes(newStatus)) {
    console.error(`Invalid status "${newStatus}". Valid: ${VALID_STATUSES.join(", ")}`);
    process.exit(1);
  }

  if (!fs.existsSync(CSV_PATH)) {
    console.error(`CSV not found: ${CSV_PATH}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(CSV_PATH, "utf-8");
  const lines = raw.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());

  const statusCol = headers.indexOf("status");
  const dateContactedCol = headers.indexOf("date_contacted");
  const articleSentCol = headers.indexOf("article_sent");
  const publishedCol = headers.indexOf("published");

  let found = false;
  const today = new Date().toISOString().split("T")[0];

  const updated = lines.map((line, i) => {
    if (i === 0) return line;
    const values = line.split(",");
    if (values[0]?.trim().toLowerCase() !== siteName) return line;

    found = true;
    values[statusCol] = newStatus;

    if (newStatus === "sent" || newStatus === "draft ready") {
      if (!values[dateContactedCol]?.trim()) values[dateContactedCol] = today;
    }
    if (newStatus === "sent") {
      values[articleSentCol] = today;
    }
    if (newStatus === "published") {
      if (!values[publishedCol]?.trim()) values[publishedCol] = today;
    }

    return values.join(",");
  });

  if (!found) {
    console.error(`Site "${siteName}" not found in CSV.`);
    process.exit(1);
  }

  fs.writeFileSync(CSV_PATH, updated.join("\n") + "\n", "utf-8");
  console.log(`✓ ${siteName} → status: "${newStatus}"`);
  if (newStatus === "sent") console.log(`  date_contacted: ${today}`);
  if (newStatus === "sent") console.log(`  article_sent: ${today}`);
  if (newStatus === "published") console.log(`  published: ${today}`);
}

main();
