import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import BlogImage from "@/components/ui/BlogImage";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Newsletter from "@/components/Newsletter";
import { getAllArticles, getArticleBySlug } from "@/lib/blogData";

const BASE = "https://www.citytaste.co";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.metaDescription,
    alternates: { canonical: `${BASE}/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: "article",
      url: `${BASE}/blog/${article.slug}`,
      publishedTime: article.publishedAt,
      authors: ["CityTaste"],
      tags: [article.category, article.city, "food guide", "travel"],
      images: [{ url: article.coverImage, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription,
      images: [article.coverImage],
    },
  };
}

// Extract FAQ Q&A pairs from article body for FAQPage schema
function extractFAQ(body: string): Array<{ question: string; answer: string }> {
  const faqSection = body.match(/## (?:FAQ|Frequently Asked Questions)([\s\S]*?)(?:##|$)/i)?.[1] ?? "";
  if (!faqSection) return [];

  const pairs: Array<{ question: string; answer: string }> = [];
  const qPattern = /###?\s*(?:Q:|Question:)?\s*(.+?)\n+A:\s*([\s\S]+?)(?=###?|$)/gi;
  let match;
  while ((match = qPattern.exec(faqSection)) !== null) {
    pairs.push({
      question: match[1].replace(/\*\*/g, "").trim(),
      answer: match[2].replace(/\*\*/g, "").trim().slice(0, 400),
    });
    if (pairs.length >= 5) break;
  }
  return pairs;
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug && a.citySlug === article.citySlug)
    .slice(0, 3);

  const faqItems = extractFAQ(article.body);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: article.coverImage,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    url: `${BASE}/blog/${article.slug}`,
    articleSection: article.category,
    keywords: [article.category, article.city, "food guide", "travel guide"].join(", "),
    author: {
      "@type": "Organization",
      name: "CityTaste",
      url: BASE,
    },
    publisher: {
      "@type": "Organization",
      name: "CityTaste",
      url: BASE,
      logo: { "@type": "ImageObject", url: `${BASE}/favicon.ico` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/blog/${article.slug}` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",    item: BASE },
      { "@type": "ListItem", position: 2, name: "Blog",    item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${BASE}/blog/${article.slug}` },
    ],
  };

  const faqJsonLd = faqItems.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <main className="min-h-screen bg-[#FFF8F0]">
        {/* Hero */}
        <div className="relative h-72 md:h-96 w-full">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/80 via-[#1E293B]/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 max-w-3xl mx-auto w-full">
            <nav aria-label="breadcrumb" className="flex items-center gap-2 text-white/60 text-xs mb-3">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span aria-hidden="true">›</span>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span aria-hidden="true">›</span>
              <span className="text-white/80 truncate max-w-[200px]" aria-current="page">{article.title}</span>
            </nav>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#F97316] text-white text-xs font-semibold px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span className="text-white/80 text-sm">{article.city}</span>
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {article.title}
            </h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-8 pb-6 border-b border-slate-200">
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </time>
            <span>{article.readingTime} min read</span>
            <span>{article.places.length} places featured</span>
            <Link
              href={`/cities/${article.citySlug}`}
              className="ml-auto text-orange-500 hover:text-orange-600 font-medium text-xs border border-orange-200 px-3 py-1 rounded-full transition-colors"
            >
              Explore {article.city} →
            </Link>
          </div>

          {/* Intro */}
          <p className="text-lg text-slate-700 leading-relaxed mb-8 font-medium">
            {article.intro}
          </p>

          {/* Body — properly rendered markdown */}
          <MarkdownRenderer body={article.body} className="mb-12" />

          {/* Newsletter mid-article */}
          <div className="my-10">
            <Newsletter city={article.city} compact />
          </div>

          {/* Featured Places */}
          <h2
            className="text-2xl font-bold text-slate-900 mb-6 mt-10"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Featured Places
          </h2>

          <div className="space-y-6 mb-12">
            {article.places.map((place, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="relative sm:w-48 h-48 sm:h-auto flex-shrink-0">
                  <BlogImage src={place.image} alt={place.name} />
                </div>
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3
                        className="text-lg font-bold text-slate-900"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {place.name}
                      </h3>
                      <div className="flex items-center gap-1 flex-shrink-0 bg-amber-50 px-2 py-0.5 rounded-full">
                        <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs font-semibold text-slate-700">{place.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs mb-3 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {place.address}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">{place.description}</p>
                  </div>
                  {place.placeSlug ? (
                    <Link
                      href={`/cities/${place.citySlug}/places/${place.placeSlug}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#F97316] hover:text-orange-600 transition-colors"
                    >
                      View full profile on CityTaste
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  ) : (
                    <Link
                      href={`/cities/${place.citySlug}`}
                      className="mt-4 inline-flex items-center gap-2 text-xs text-slate-400 hover:text-orange-500 transition-colors"
                    >
                      Browse all {article.city} spots →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* City CTA */}
          <div className="bg-[#1E293B] rounded-2xl p-8 text-center text-white mb-10">
            <h3
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Explore {article.city} on CityTaste
            </h3>
            <p className="text-slate-300 text-sm mb-6">
              Browse all restaurants, cafés and attractions with reviews, maps and filters.
            </p>
            <Link
              href={`/cities/${article.citySlug}`}
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Explore {article.city}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Newsletter full */}
          <div className="mb-10">
            <Newsletter city={article.city} />
          </div>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <div className="mb-10">
              <h2
                className="text-xl font-bold text-slate-900 mb-5"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                More from {article.city}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-32 w-full">
                      <Image
                        src={rel.coverImage}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-3">
                      <span className="text-orange-500 text-xs font-semibold">{rel.category}</span>
                      <p className="text-slate-800 text-sm font-semibold mt-1 leading-snug line-clamp-2">
                        {rel.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            All articles
          </Link>
        </div>
      </main>
    </>
  );
}
