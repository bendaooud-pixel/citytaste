import type { MetadataRoute } from "next";
import { cities, places } from "@/lib/data";
import { getAllArticles } from "@/lib/blogData";
import { getAllGuides, getGuidesByCity } from "@/lib/morocco/content";
import { MOROCCO_CITIES } from "@/lib/morocco/types";
import { getAllActivitiesWithSlugs } from "@/lib/activities/db";

const BASE_URL = "https://www.citytaste.co";

// Static pages last modified date — bump this when design changes
const SITE_UPDATED = new Date("2026-06-15");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,              lastModified: SITE_UPDATED, changeFrequency: "daily",   priority: 1   },
    { url: `${BASE_URL}/blog`,    lastModified: new Date(getAllArticles()[0]?.publishedAt ?? SITE_UPDATED), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/privacy`, lastModified: SITE_UPDATED, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE_URL}/affiliate-disclosure`, lastModified: SITE_UPDATED, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/near-me`,   lastModified: SITE_UPDATED, changeFrequency: "daily",   priority: 0.7 },
    { url: `${BASE_URL}/plan`,      lastModified: SITE_UPDATED, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE_URL}/favorites`, lastModified: SITE_UPDATED, changeFrequency: "weekly",  priority: 0.5 },
  ];

  const cityRoutes: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/${city.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const placeRoutes: MetadataRoute.Sitemap = places.map((place) => ({
    url: `${BASE_URL}/${place.citySlug}/${place.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const seenSlugs = new Set<string>();
  const blogRoutes: MetadataRoute.Sitemap = getAllArticles()
    .filter((article) => {
      if (seenSlugs.has(article.slug)) return false;
      seenSlugs.add(article.slug);
      return true;
    })
    .map((article) => ({
      url: `${BASE_URL}/blog/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const BARCELONA_SEO_PAGES = [
    "bars", "breakfast", "italian-restaurants", "seafood",
    "tapas", "rooftop-bars", "paella", "coffee",
  ];

  const barcelonaCategoryRoutes: MetadataRoute.Sitemap = BARCELONA_SEO_PAGES.map((slug) => ({
    url: `${BASE_URL}/cities/barcelona/${slug}`,
    lastModified: new Date("2026-06-15"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const MARRAKECH_SEO_EN = [
    "restaurants", "hammam", "rooftop", "things-to-do", "places",
    "bars", "breakfast", "spa", "souks", "street-food",
  ];

  const MARRAKECH_SEO_FR = [
    "meilleur-restaurant", "meilleurs-restaurants", "meilleur-hammam",
    "meilleur-rooftop", "meilleure-patisserie", "meilleur-couscous",
    "meilleur-tajine", "meilleur-riad", "meilleur-spa", "meilleur-brunch",
  ];

  const marrakechCategoryRoutes: MetadataRoute.Sitemap = [
    ...MARRAKECH_SEO_EN.map((slug) => ({
      url: `${BASE_URL}/cities/marrakech/${slug}`,
      lastModified: new Date("2026-06-09"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...MARRAKECH_SEO_FR.map((slug) => ({
      url: `${BASE_URL}/cities/marrakech/${slug}`,
      lastModified: new Date("2026-06-09"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];

  const moroccoHubRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/morocco`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/morocco/fr`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.9 },
  ];

  const moroccoActivitiesRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/morocco/activities`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/morocco/fr/activities`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/morocco/es/activities`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/morocco/it/activities`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.8 },
  ];

  const moroccoCityHubRoutes: MetadataRoute.Sitemap = MOROCCO_CITIES
    .filter((c) => getGuidesByCity(c.slug, "en").length > 0 || getGuidesByCity(c.slug, "fr").length > 0)
    .flatMap((c) => {
      const routes: MetadataRoute.Sitemap = [];
      if (getGuidesByCity(c.slug, "en").length > 0) {
        routes.push({ url: `${BASE_URL}/morocco/${c.slug}`, lastModified: SITE_UPDATED, changeFrequency: "weekly" as const, priority: 0.8 });
      }
      if (getGuidesByCity(c.slug, "fr").length > 0) {
        routes.push({ url: `${BASE_URL}/morocco/fr/${c.slug}`, lastModified: SITE_UPDATED, changeFrequency: "weekly" as const, priority: 0.8 });
      }
      return routes;
    });

  const moroccoGuideRoutes: MetadataRoute.Sitemap = getAllGuides().map((g) => {
    const prefix = g.frontmatter.locale === "en" ? "/morocco" : `/morocco/${g.frontmatter.locale}`;
    return {
      url: `${BASE_URL}${prefix}/${g.frontmatter.slug}`,
      lastModified: new Date(g.frontmatter.updatedAt || g.frontmatter.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  const activityArticleRoutes: MetadataRoute.Sitemap = getAllActivitiesWithSlugs().flatMap(({ activity, citySlug, countrySlug }) =>
    ["", "/fr", "/es", "/it"].map((localePrefix) => ({
      url: `${BASE_URL}/${countrySlug}${localePrefix}/${citySlug}/experiences/${activity.slug}`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...cityRoutes, ...placeRoutes, ...blogRoutes, ...barcelonaCategoryRoutes, ...marrakechCategoryRoutes, ...moroccoHubRoutes, ...moroccoActivitiesRoutes, ...moroccoCityHubRoutes, ...moroccoGuideRoutes, ...activityArticleRoutes];
}
