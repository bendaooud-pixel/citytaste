import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuideBySlug, getAllGuides, getGuideAlternates, getGuidesByCity } from "@/lib/morocco/content";
import { BASE_URL, MOROCCO_CITIES } from "@/lib/morocco/types";
import GuideTemplate from "@/components/morocco/GuideTemplate";
import CityHubTemplate from "@/components/morocco/CityHubTemplate";

const CITY_IMAGES: Record<string, string> = {
  marrakech: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
  fes: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200&q=80",
  chefchaouen: "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=1200&q=80",
  essaouira: "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=1200&q=80",
  rabat: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80",
  merzouga: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1200&q=80",
};

const CITY_DESCRIPTIONS_FR: Record<string, string> = {
  marrakech: "Des souks de la médina aux rooftops en passant par le jardin Majorelle — votre guide complet de Marrakech.",
  fes: "Capitale spirituelle et culturelle du Maroc. Médina ancestrale, artisans et la meilleure gastronomie du pays.",
  chefchaouen: "La perle bleue du Rif. Randonnées, photographie et un rythme de vie qui fait oublier le téléphone.",
  essaouira: "Alizés, poisson frais et une médina décontractée. L'échappée idéale loin de la chaleur de Marrakech.",
  rabat: "La capitale du Maroc. Propre, calme et pleine de pépites que la plupart des touristes ignorent.",
  merzouga: "Porte d'entrée de l'Erg Chebbi et du Sahara. Dunes, nuits étoilées et méharées dans le désert doré.",
};

const YEAR = new Date().getFullYear();

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const guideParams = getAllGuides("fr").map((g) => ({
    slug: g.frontmatter.slug.split("/"),
  }));

  const cityParams = MOROCCO_CITIES
    .filter((c) => getGuidesByCity(c.slug, "fr").length > 0)
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
        title: `Que Faire à ${city.name.fr} ${YEAR} — Guide Maroc | CityTaste`,
        description: CITY_DESCRIPTIONS_FR[citySlug] || `Découvrez le meilleur de ${city.name.fr} avec nos guides de voyage.`,
        alternates: {
          canonical: `${BASE_URL}/morocco/fr/${citySlug}`,
          languages: { en: `${BASE_URL}/morocco/${citySlug}` },
        },
      };
    }
  }

  const guide = getGuideBySlug(slug, "fr");
  if (!guide) return {};

  const alternates = getGuideAlternates(guide);
  const canonical = `${BASE_URL}/morocco/fr/${guide.frontmatter.slug}`;

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

export default async function MoroccoFrPage({ params }: Props) {
  const { slug } = await params;

  if (slug.length === 1) {
    const citySlug = slug[0];
    const city = MOROCCO_CITIES.find((c) => c.slug === citySlug);
    if (city) {
      const guides = getGuidesByCity(citySlug, "fr");
      return (
        <CityHubTemplate
          citySlug={citySlug}
          cityName={city.name.fr}
          locale="fr"
          guides={guides}
          heroImage={CITY_IMAGES[citySlug] || CITY_IMAGES.marrakech}
          description={CITY_DESCRIPTIONS_FR[citySlug] || `Explorez le meilleur de ${city.name.fr}.`}
        />
      );
    }
  }

  const guide = getGuideBySlug(slug, "fr");
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
    mainEntityOfPage: `${BASE_URL}/morocco/fr/${guide.frontmatter.slug}`,
    inLanguage: "fr",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Maroc", item: `${BASE_URL}/morocco/fr` },
      { "@type": "ListItem", position: 3, name: guide.frontmatter.h1.split("—")[0].trim(), item: `${BASE_URL}/morocco/fr/${guide.frontmatter.slug}` },
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
