import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Guide, GuideFrontmatter, Tour, TourFrontmatter, MoroccoLocale } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content", "morocco");
const CURRENT_YEAR = new Date().getFullYear().toString();

function injectYear(val: unknown): unknown {
  if (typeof val === "string") return val.replace(/\{year\}/g, CURRENT_YEAR);
  if (Array.isArray(val)) return val.map(injectYear);
  if (val && typeof val === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(val)) out[k] = injectYear(v);
    return out;
  }
  return val;
}

function readMdxFiles(dir: string): { filePath: string; raw: string }[] {
  if (!fs.existsSync(dir)) return [];
  const results: { filePath: string; raw: string }[] = [];

  function walk(d: string) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".mdx")) {
        results.push({ filePath: full, raw: fs.readFileSync(full, "utf-8") });
      }
    }
  }

  walk(dir);
  return results;
}

export function getAllGuides(locale?: MoroccoLocale): Guide[] {
  const dir = locale
    ? path.join(CONTENT_DIR, "guides", locale)
    : path.join(CONTENT_DIR, "guides");
  return readMdxFiles(dir).map(({ filePath, raw }) => {
    const { data, content } = matter(raw);
    return { frontmatter: injectYear(data) as GuideFrontmatter, content, filePath };
  });
}

export function getGuideBySlug(slugParts: string[], locale: MoroccoLocale): Guide | undefined {
  const slug = slugParts.join("/");
  const guides = getAllGuides(locale);
  return guides.find((g) => g.frontmatter.slug === slug);
}

export function getGuidesByCity(citySlug: string, locale?: MoroccoLocale): Guide[] {
  return getAllGuides(locale).filter((g) => g.frontmatter.citySlug === citySlug);
}

export function getAllTours(locale?: MoroccoLocale): Tour[] {
  const dir = locale
    ? path.join(CONTENT_DIR, "tours", locale)
    : path.join(CONTENT_DIR, "tours");
  return readMdxFiles(dir).map(({ filePath, raw }) => {
    const { data, content } = matter(raw);
    return { frontmatter: injectYear(data) as TourFrontmatter, content, filePath };
  });
}

export function getTourBySlug(slug: string, locale: MoroccoLocale): Tour | undefined {
  const tours = getAllTours(locale);
  return tours.find((t) => t.frontmatter.slug === slug);
}

export function getGuideAlternates(guide: Guide): Record<MoroccoLocale, string | null> {
  const result: Record<string, string | null> = { en: null, fr: null, it: null, es: null };
  const { slug: currentSlug, hreflangGroup, primaryKeyword } = guide.frontmatter;

  for (const loc of ["en", "fr", "it", "es"] as MoroccoLocale[]) {
    const guides = getAllGuides(loc);
    const match = guides.find((g) =>
      (hreflangGroup && g.frontmatter.hreflangGroup === hreflangGroup) ||
      g.frontmatter.primaryKeyword === primaryKeyword ||
      g.frontmatter.slug === currentSlug
    );
    if (match) {
      const prefix = loc === "en" ? "/morocco" : `/morocco/${loc}`;
      result[loc] = `${prefix}/${match.frontmatter.slug}`;
    }
  }

  return result as Record<MoroccoLocale, string | null>;
}
