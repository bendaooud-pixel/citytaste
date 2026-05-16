import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityBySlug, getPlacesByCity } from "@/lib/data";
import CityPageClient from "./CityPageClient";

const BASE = "https://www.citytaste.co";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const ogImage = city.image.includes("?")
    ? city.image.replace(/w=\d+/, "w=1200").replace(/q=\d+/, "q=80")
    : `${city.image}?w=1200&q=80`;

  return {
    title: `Best Restaurants & Cafés in ${city.name} — ${city.placeCount}+ Curated Spots`,
    description: `Discover the best restaurants, cafés and hidden gems in ${city.name}. ${city.placeCount}+ curated places with interactive map, reviews and local tips — updated regularly.`,
    alternates: { canonical: `${BASE}/cities/${slug}` },
    openGraph: {
      title: `Best Restaurants & Cafés in ${city.name}`,
      description: `Discover ${city.placeCount}+ curated restaurants, cafés and attractions in ${city.name}.`,
      type: "website",
      url: `${BASE}/cities/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `Best places to eat in ${city.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Best Restaurants & Cafés in ${city.name}`,
      description: `Discover ${city.placeCount}+ curated restaurants, cafés and attractions in ${city.name}.`,
      images: [ogImage],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const places = getPlacesByCity(slug);

  const cityJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: city.name,
    description: city.description,
    image: city.image,
    url: `${BASE}/cities/${city.slug}`,
    touristType: { "@type": "Audience", audienceType: "Food lovers and travellers" },
    includesAttraction: places.slice(0, 12).map((p) => ({
      "@type": "TouristAttraction",
      name: p.name,
      url: `${BASE}/cities/${p.citySlug}/places/${p.slug}`,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",     item: BASE },
      { "@type": "ListItem", position: 2, name: city.name,  item: `${BASE}/cities/${city.slug}` },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best Restaurants & Cafés in ${city.name}`,
    description: `Top-rated restaurants, cafés and attractions in ${city.name}, curated by CityTaste.`,
    numberOfItems: places.length,
    itemListElement: places.slice(0, 10).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Restaurant",
        name: p.name,
        url: `${BASE}/cities/${p.citySlug}/places/${p.slug}`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: p.rating,
          bestRating: 5,
          reviewCount: p.reviewCount,
        },
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cityJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <CityPageClient city={city} places={places} />
    </>
  );
}
