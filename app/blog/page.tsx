export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import BlogImage from "@/components/ui/BlogImage";
import { getAllArticles } from "@/lib/blogData";

const BASE = "https://www.citytaste.co";
const YEAR = new Date().getFullYear();
function injectYear(s: string): string {
  return s.replace(/\{year\}/g, String(YEAR)).replace(/\b20\d{2}\b/, String(YEAR));
}

export const metadata: Metadata = {
  title: "Food Guides & City Stories — CityTaste Blog",
  description:
    "In-depth food guides for Paris, Barcelona and Rome. Discover the best cafés, restaurants, bistros, brunch spots, rooftop bars and hidden gems.",
  alternates: { canonical: `${BASE}/blog` },
  openGraph: {
    title: "Food Guides & City Stories — CityTaste Blog",
    description:
      "In-depth food guides for Paris, Barcelona and Rome — updated daily.",
    type: "website",
    url: `${BASE}/blog`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Food Guides & City Stories — CityTaste Blog",
    description: "In-depth food guides for Paris, Barcelona and Rome — updated daily.",
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  Cafés: "bg-amber-100 text-amber-800",
  Halal: "bg-green-100 text-green-800",
  Brunch: "bg-pink-100 text-pink-800",
  Budget: "bg-blue-100 text-blue-800",
  Romantic: "bg-rose-100 text-rose-800",
  Patisseries: "bg-purple-100 text-purple-800",
  Sightseeing: "bg-slate-100 text-slate-700",
  Bars: "bg-orange-100 text-orange-800",
};

export default function BlogPage() {
  const articles = getAllArticles();
  const [featured, ...rest] = articles;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "CityTaste Food Guides & City Stories",
    description: "In-depth food guides for Paris, Barcelona and Rome.",
    url: `${BASE}/blog`,
    hasPart: articles.slice(0, 10).map((a) => ({
      "@type": "Article",
      headline: injectYear(a.title),
      url: `${BASE}/blog/${a.slug}`,
      datePublished: a.publishedAt,
      image: a.coverImage,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <main className="min-h-screen bg-[#FFF8F0]">
      {/* Hero */}
      <section className="bg-[#1E293B] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3">
            The CityTaste Journal
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Food Guides &amp; City Stories
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            In-depth guides to eating well in Paris and Barcelona — from
            hidden neighbourhood bistros to iconic patisseries.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Featured article */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group block mb-12 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white"
          >
            <div className="md:flex">
              <div className="relative md:w-1/2 h-64 md:h-auto min-h-[260px]">
                <BlogImage
                  src={featured.coverImage}
                  alt={featured.title}
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      CATEGORY_COLORS[featured.category] ??
                      "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {featured.category}
                  </span>
                  <span className="text-slate-400 text-xs">
                    {featured.city}
                  </span>
                </div>
                <h2
                  className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 group-hover:text-orange-500 transition-colors"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {injectYear(featured.title)}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {featured.intro}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>
                    {new Date(featured.publishedAt).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}
                  </span>
                  <span>{featured.readingTime} min read</span>
                  <span>{featured.places.length} places</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Article grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <BlogImage
                  src={article.coverImage}
                  alt={article.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      CATEGORY_COLORS[article.category] ??
                      "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {article.category}
                  </span>
                  <span className="text-slate-400 text-xs">{article.city}</span>
                </div>
                <h3
                  className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition-colors leading-snug"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {injectYear(article.title)}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 flex-1">
                  {article.intro}
                </p>
                <div className="flex items-center gap-3 mt-4 text-xs text-slate-400 border-t border-slate-100 pt-3">
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span>{article.readingTime} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </main>
    </>
  );
}
