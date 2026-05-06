import type { MetadataRoute } from "next";
import { cities, places } from "@/lib/data";
import { getAllArticles } from "@/lib/blogData";

const BASE_URL = "https://www.citytaste.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/favorites`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const cityRoutes: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/cities/${city.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const placeRoutes: MetadataRoute.Sitemap = places.map((place) => ({
    url: `${BASE_URL}/cities/${place.citySlug}/places/${place.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...cityRoutes, ...placeRoutes, ...blogRoutes];
}
