import type { MetadataRoute } from "next";
import { cities, places } from "@/lib/data";
import { getAllArticles } from "@/lib/blogData";
import { getAllGuides, getGuidesByCity } from "@/lib/morocco/content";
import { MOROCCO_CITIES } from "@/lib/morocco/types";

const BASE_URL = "https://www.citytaste.co";

// Static pages last modified date — bump this when design changes
const SITE_UPDATED = new Date("2026-06-15");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,              lastModified: SITE_UPDATED, changeFrequency: "daily",   priority: 1   },
    { url: `${BASE_URL}/blog`,    lastModified: new Date(getAllArticles()[0]?.publishedAt ?? SITE_UPDATED), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/privacy`, lastModified: SITE_UPDATED, changeFrequency: "yearly",  priority: 0.2 },
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

  const blogRoutes: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
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

  return [...staticRoutes, ...cityRoutes, ...placeRoutes, ...blogRoutes, ...barcelonaCategoryRoutes, ...marrakechCategoryRoutes, ...moroccoHubRoutes, ...moroccoCityHubRoutes, ...moroccoGuideRoutes];
}
