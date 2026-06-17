import { readFileSync } from "fs";
import { join } from "path";
import type { ActivityArticle } from "./types";

const CONTENT_DIR = join(process.cwd(), "content", "activities");

export function getActivityArticle(
  slug: string,
  locale: string
): ActivityArticle | null {
  try {
    const raw = readFileSync(join(CONTENT_DIR, `${slug}.json`), "utf-8");
    const data = JSON.parse(raw) as Record<string, ActivityArticle>;
    return data[locale] ?? data["en"] ?? null;
  } catch {
    return null;
  }
}
