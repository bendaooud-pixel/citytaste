import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuideBySlug, getAllGuides, getGuideAlternates } from "@/lib/morocco/content";
import { BASE_URL } from "@/lib/morocco/types";
import GuideTemplate from "@/components/morocco/GuideTemplate";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  return getAllGuides("en").map((g) => ({
    slug: g.frontmatter.slug.split("/"),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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

export default async function MoroccoGuidePage({ params }: Props) {
  const { slug } = await params;
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
