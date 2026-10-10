/**
 * Shared SEO helpers.
 *
 * - `withYear`  replaces the `{year}` template token. It never rewrites real
 *   years written in the text (e.g. "Grand Prix 2024"), so facts stay correct.
 * - `isThinAttractionPlace` flags place pages for famous monuments, museums
 *   and bookable activities. Those pages can't beat official sites/OTAs and
 *   Google reports them as "Crawled – currently not indexed", which drags the
 *   site-wide quality signal down. They are kept for users but set to
 *   `noindex, follow` and left out of the sitemap.
 */

export const SITE_URL = "https://www.citytaste.co";
export const CURRENT_YEAR = new Date().getFullYear();

export function withYear<T extends string | undefined>(s: T): T {
  if (typeof s !== "string") return s;
  return s.replace(/\{year\}/g, String(CURRENT_YEAR)) as T;
}

const ATTRACTION_CATEGORIES = new Set(["monuments", "museums", "activities"]);
const SECONDARY_TAGS = new Set(["family-friendly", "romantic"]);

export function isThinAttractionPlace(categories: string[]): boolean {
  const hasAttraction = categories.some((c) => ATTRACTION_CATEGORIES.has(c));
  const onlyAttractionOrTags = categories.every(
    (c) => ATTRACTION_CATEGORIES.has(c) || SECONDARY_TAGS.has(c),
  );
  return hasAttraction && onlyAttractionOrTags;
}

/** Sitewide Organization + WebSite entity (helps Google tie "citytaste" to this site). */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "CityTaste",
      alternateName: "City Taste",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/apple-icon`,
      email: "hello@citytaste.co",
      // TODO(owner): add a `sameAs: [...]` array with your real social profile
      // URLs (Instagram, TikTok, Pinterest…) once they exist.
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "CityTaste",
      alternateName: "City Taste",
      url: `${SITE_URL}/`,
      inLanguage: "en",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};
