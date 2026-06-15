import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuideBySlug, getAllGuides, getGuideAlternates, getGuidesByCity } from "@/lib/morocco/content";
import { BASE_URL, MOROCCO_CITIES } from "@/lib/morocco/types";
import GuideTemplate from "@/components/morocco/GuideTemplate";
import CityHubTemplate from "@/components/morocco/CityHubTemplate";

const CITY_IMAGES: Record<string, string> = {
  marrakech: "/images/morocco/marrakech.jpg",
  fes: "/images/morocco/fes.jpg",
  chefchaouen: "/images/morocco/chefchaouen.jpg",
  essaouira: "/images/morocco/essaouira.jpg",
  rabat: "/images/morocco/rabat.jpg",
  merzouga: "/images/morocco/sahara-desert.jpg",
};

const CITY_DESCRIPTIONS: Record<string, string> = {
  marrakech: "From the souks and rooftops of the medina to the serenity of Majorelle Garden — your complete guide to Marrakech.",
  fes: "The spiritual and cultural capital of Morocco. Ancient medina, master craftsmen, and the best food in the country.",
  chefchaouen: "The famous blue pearl of the Rif Mountains. Hiking, photography, and a pace of life that makes you forget your phone.",
  essaouira: "Atlantic winds, fresh seafood, and a laid-back medina. The perfect escape from Marrakech's heat.",
  rabat: "Morocco's capital. Clean, calm, and full of hidden gems most tourists miss entirely.",
  merzouga: "Gateway to Erg Chebbi and the Sahara. Dunes, starry nights, and camel treks into the golden desert.",
};

const YEAR = new Date().getFullYear();

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const guideParams = getAllGuides("en").map((g) => ({
    slug: g.frontmatter.slug.split("/"),
  }));

  const cityParams = MOROCCO_CITIES
    .filter((c) => getGuidesByCity(c.slug, "en").length > 0 || getGuidesByCity(c.slug).length > 0)
    .map((c) => ({ slug: [c.slug] }));

  return [...guideParams, ...cityParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (slug.length === 1) {
    const citySlug = slug[0];
    const city = MOROCCO_CITIES.find((c) => c.slug === citySlug);
    if (city) {
      return {
        title: `Things to Do in ${city.name.en} ${YEAR} — Morocco Guide | CityTaste`,
        description: CITY_DESCRIPTIONS[citySlug] || `Discover the best of ${city.name.en} with our curated travel guides.`,
        alternates: {
          canonical: `${BASE_URL}/morocco/${citySlug}`,
          languages: { fr: `${BASE_URL}/morocco/fr/${citySlug}` },
        },
      };
    }
  }

  const guide = getGuideBySlug(slug, "en");
  if (!guide) return {};

  const alternates = getGuideAlternates(guide);
  const canonical = `${BASE_URL}/morocco/${guide.frontmatter.slug}`;

  return {
    title: guide.frontmatter.metaTitle,
    description: guide.frontmatter.metaDescription,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        Object.entries(alternates).filter(([, v]) => v).map(([k, v]) => [k, `${BASE_URL}${v}`])
      ),
    },
    openGraph: {
      title: guide.frontmatter.metaTitle,
      description: guide.frontmatter.metaDescription,
      type: "article",
      url: canonical,
      images: [{ url: guide.frontmatter.heroImage, width: 1200, height: 630 }],
    },
  };
}

export default async function MoroccoPage({ params }: Props) {
  const { slug } = await params;

  if (slug.length === 1) {
    const citySlug = slug[0];
    const city = MOROCCO_CITIES.find((c) => c.slug === citySlug);
    if (city) {
      const guides = getGuidesByCity(citySlug, "en");
      return (
        <CityHubTemplate
          citySlug={citySlug}
          cityName={city.name.en}
          locale="en"
          guides={guides}
          heroImage={CITY_IMAGES[citySlug] || CITY_IMAGES.marrakech}
          description={CITY_DESCRIPTIONS[citySlug] || `Explore the best of ${city.name.en}.`}
        />
      );
    }
  }

  const guide = getGuideBySlug(slug, "en");
  if (!guide) notFound();

  const alternates = getGuideAlternates(guide);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.frontmatter.h1,
    description: guide.frontmatter.metaDescription,
    image: guide.frontmatter.heroImage,
    datePublished: guide.frontmatter.publishedAt,
    dateModified: guide.frontmatter.updatedAt || guide.frontmatter.publishedAt,
    author: { "@type": "Organization", name: "CityTaste" },
    publisher: { "@type": "Organization", name: "CityTaste", url: BASE_URL },
    mainEntityOfPage: `${BASE_URL}/morocco/${guide.frontmatter.slug}`,
    inLanguage: "en",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Morocco", item: `${BASE_URL}/morocco` },
      { "@type": "ListItem", position: 3, name: guide.frontmatter.h1.split("—")[0].trim(), item: `${BASE_URL}/morocco/${guide.frontmatter.slug}` },
    ],
  };

  const faqJsonLd = guide.frontmatter.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.frontmatter.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <GuideTemplate guide={guide} alternates={alternates} />
    </>
  );
}
