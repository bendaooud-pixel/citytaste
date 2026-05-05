import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import BlogImage from "@/components/ui/BlogImage";
import { getAllArticles, getArticleBySlug } from "@/lib/blogData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} — CityTaste`,
    description: article.metaDescription,
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.publishedAt,
      images: [{ url: article.coverImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription,
      images: [article.coverImage],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: article.coverImage,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: "CityTaste" },
    publisher: {
      "@type": "Organization",
      name: "CityTaste",
      logo: { "@type": "ImageObject", url: "/favicon.ico" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
          <div className="flex items-center gap-6 text-sm text-slate-500 mb-8 pb-6 border-b border-slate-200">
            <span>
              {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>{article.readingTime} min read</span>
            <span>{article.places.length} places featured</span>
          </div>

          {/* Intro */}
          <p className="text-lg text-slate-700 leading-relaxed mb-8 font-medium">
            {article.intro}
          </p>

          {/* Body text */}
          <div className="prose prose-slate max-w-none mb-12">
            {article.body.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-slate-600 leading-relaxed mb-5"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>

          {/* Places */}
          <h2
            className="text-2xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Featured Places
          </h2>

          <div className="space-y-6 mb-12">
            {article.places.map((place, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row"
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
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-semibold text-slate-700">
                          {place.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-500 text-xs mb-2 flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {place.address}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {place.description}
                    </p>
                  </div>
                  {place.placeSlug && (
                    <Link
                      href={`/cities/${place.citySlug}/places/${place.placeSlug}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#F97316] hover:text-orange-600 transition-colors"
                    >
                      View on CityTaste
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
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
              Browse all restaurants, cafés, and attractions with reviews,
              maps, and filters.
            </p>
            <Link
              href={`/cities/${article.citySlug}`}
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Explore {article.city}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            All articles
          </Link>
        </div>
      </main>
    </>
  );
}
