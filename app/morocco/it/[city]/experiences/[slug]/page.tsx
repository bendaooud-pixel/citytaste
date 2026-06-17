import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActivityBySlug, getCities, getActivities, getCityBySlug, getCountryBySlug } from "@/lib/activities/db";
import { getActivityArticle } from "@/lib/activities/content";
import { localized } from "@/lib/activities/types";
import ActivityArticlePage from "@/components/activities/ActivityArticlePage";

const BASE = "https://www.citytaste.co";
const LOCALE = "it";

interface Props {
  params: Promise<{ city: string; slug: string }>;
}

export async function generateStaticParams() {
  const activities = getActivities({ countrySlug: "morocco" });
  const cities = getCities("morocco");
  const cityById = Object.fromEntries(cities.map((c) => [c.id, c]));

  return activities
    .filter((a) => a.slug)
    .map((a) => ({ city: cityById[a.cityId]?.slug, slug: a.slug! }))
    .filter((p) => p.city);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, slug } = await params;
  const activity = getActivityBySlug("morocco", citySlug, slug);
  if (!activity) return {};

  const article = getActivityArticle(slug, LOCALE);
  const title = article?.metaTitle ?? `${localized(activity.title, activity.titleI18n, LOCALE)} | CityTaste`;
  const description = article?.metaDescription ?? localized(activity.title, activity.titleI18n, LOCALE);
  const url = `${BASE}/morocco/it/${citySlug}/experiences/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE}/morocco/${citySlug}/experiences/${slug}`,
        fr: `${BASE}/morocco/fr/${citySlug}/experiences/${slug}`,
        es: `${BASE}/morocco/es/${citySlug}/experiences/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      ...(activity.imageUrl && { images: [{ url: activity.imageUrl, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(activity.imageUrl && { images: [activity.imageUrl] }),
    },
  };
}

export default async function MoroccoExperienceItPage({ params }: Props) {
  const { city: citySlug, slug } = await params;
  const country = getCountryBySlug("morocco");
  const city = getCityBySlug("morocco", citySlug);
  const activity = getActivityBySlug("morocco", citySlug, slug);
  if (!country || !city || !activity) notFound();

  const article = getActivityArticle(slug, LOCALE);
  if (!article) notFound();

  const related = getActivities({ countrySlug: "morocco", citySlug })
    .filter((a) => a.id !== activity.id)
    .slice(0, 4);

  return (
    <ActivityArticlePage
      activity={activity}
      article={article}
      city={city}
      country={country}
      locale={LOCALE}
      relatedActivities={related}
    />
  );
}
