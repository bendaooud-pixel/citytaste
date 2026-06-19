import type { Metadata } from "next";
import Link from "next/link";
import BlogImage from "@/components/ui/BlogImage";
import { getArticlesByCategory } from "@/lib/blogData";

const BASE = "https://www.citytaste.co";
const YEAR = new Date().getFullYear();
function injectYear(s: string): string {
  return s.replace(/\{year\}/g, String(YEAR)).replace(/\b20\d{2}\b/, String(YEAR));
}

export const metadata: Metadata = {
  title: "Recettes Authentiques — CityTaste",
  description:
    "Recettes authentiques du monde entier : tajine marocain, carbonara romaine, crème catalane, pinsa et plus. Directement des cuisines locales.",
  alternates: { canonical: `${BASE}/recettes` },
  openGraph: {
    title: "Recettes Authentiques — CityTaste",
    description:
      "Recettes authentiques du monde entier, directement des cuisines locales.",
    type: "website",
    url: `${BASE}/recettes`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Recettes Authentiques — CityTaste",
    description: "Recettes authentiques du monde entier, directement des cuisines locales.",
  },
};

const CITY_FLAGS: Record<string, string> = {
  rome: "🇮🇹",
  marrakech: "🇲🇦",
  paris: "🇫🇷",
  barcelona: "🇪🇸",
};

export default function RecettesPage() {
  const recipes = getArticlesByCategory("Recettes");
  const [featured, ...rest] = recipes;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Recettes Authentiques — CityTaste",
    description: "Recettes authentiques du monde entier, directement des cuisines locales.",
    url: `${BASE}/recettes`,
    hasPart: recipes.map((a) => ({
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
              CityTaste Kitchen
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Recettes Authentiques
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Des recettes traditionnelles venues des cuisines de Rome, Marrakech,
              Barcelone et Paris — testées sur place, avec les vrais ingrédients
              et les astuces des chefs locaux.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Featured recipe */}
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
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      Recette
                    </span>
                    <span className="text-slate-400 text-xs">
                      {CITY_FLAGS[featured.citySlug] ?? ""} {featured.city}
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
                      {new Date(featured.publishedAt).toLocaleDateString("fr-FR", {
                        day: "numeric", month: "long", year: "numeric",
                      })}
                    </span>
                    <span>{featured.readingTime} min</span>
                    <span>{featured.places.length} adresses</span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Recipe grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((recipe) => (
                <Link
                  key={recipe.slug}
                  href={`/blog/${recipe.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <BlogImage
                      src={recipe.coverImage}
                      alt={recipe.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Recette
                      </span>
                      <span className="text-slate-400 text-xs">
                        {CITY_FLAGS[recipe.citySlug] ?? ""} {recipe.city}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition-colors leading-snug"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {injectYear(recipe.title)}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 flex-1">
                      {recipe.intro}
                    </p>
                    <div className="flex items-center gap-3 mt-4 text-xs text-slate-400 border-t border-slate-100 pt-3">
                      <span>
                        {new Date(recipe.publishedAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span>{recipe.readingTime} min</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty state */}
          {recipes.length === 0 && (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🍳</p>
              <p className="text-slate-500 text-lg">Les recettes arrivent bientôt !</p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-[#1E293B] rounded-2xl p-8 text-center text-white">
            <h3
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Envie de goûter sur place ?
            </h3>
            <p className="text-slate-300 text-sm mb-6">
              Découvrez les restaurants, cours de cuisine et expériences culinaires dans chaque ville.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/morocco/activities"
                className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Activités au Maroc
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Tous les guides
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
