import type { MetadataRoute } from "next";
import { cities, places } from "@/lib/data";
import { getAllArticles } from "@/lib/blogData";

const BASE_URL = "https://www.citytaste.co";

// Static pages last modified date — bump this when design changes
const SITE_UPDATED = new Date("2025-05-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,              lastModified: SITE_UPDATED, changeFrequency: "daily",   priority: 1   },
    { url: `${BASE_URL}/blog`,    lastModified: new Date(getAllArticles()[0]?.publishedAt ?? SITE_UPDATED), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/privacy`, lastModified: SITE_UPDATED, changeFrequency: "yearly",  priority: 0.2 },
  ];

  const cityRoutes: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/cities/${city.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const placeRoutes: MetadataRoute.Sitemap = places.map((place) => ({
    url: `${BASE_URL}/cities/${place.citySlug}/places/${place.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...cityRoutes, ...placeRoutes, ...blogRoutes];
}
