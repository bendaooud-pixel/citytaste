import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/marrakech/hammam`;
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Best Hammams in Marrakech ${YEAR} — Complete Guide`,
  description:
    "Find the best hammams in Marrakech from traditional public baths to luxury spa experiences. Prices and honest tips.",
  alternates: {
    canonical: CANONICAL,
    languages: { fr: `${BASE}/cities/marrakech/meilleur-hammam` },
  },
  openGraph: {
    title: `Best Hammams in Marrakech ${YEAR} — Complete Guide`,
    description:
      "Find the best hammams in Marrakech from traditional public baths to luxury spa experiences. Prices and honest tips.",
    type: "website",
    url: CANONICAL,
  },
};

export default function MarrakechHammamPage() {
  const filteredPlaces = places.filter(
    (p) =>
      p.citySlug === "marrakech" &&
      (p.slug.includes("hammam") || p.slug.includes("bains"))
  );

  const topPick = filteredPlaces.find((p) => p.featured) || filteredPlaces[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Hammams in Marrakech",
    description:
      "Find the best hammams in Marrakech from traditional public baths to luxury spa experiences.",
    url: CANONICAL,
    numberOfItems: filteredPlaces.length,
    itemListElement: filteredPlaces.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "HealthAndBeautyBusiness",
        name: p.name,
        address: p.address,
        url: `${BASE}/marrakech/${p.slug}`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: p.rating,
          reviewCount: p.reviewCount,
        },
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Marrakech",
        item: `${BASE}/marrakech`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Hammams",
        item: CANONICAL,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen bg-[#FFF8F0]">
        {/* Hero */}
        <div className="bg-[#1E293B] text-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 text-white/50 text-xs mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>&rsaquo;</span>
              <Link
                href="/marrakech"
                className="hover:text-white transition-colors"
              >
                Marrakech
              </Link>
              <span>&rsaquo;</span>
              <span className="text-white/80">Hammams</span>
            </nav>
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Best Hammams in Marrakech {YEAR} — Complete Guide
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              The hammam is the most Moroccan experience you&apos;ll have in
              Marrakech — and it&apos;s the one most visitors get wrong.
              Traditional public hammams cost &euro;2 and are where locals
              actually go; tourist hammams cost &euro;40–80 and wrap you in rose
              petals.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Intro */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              The hammam is the most Moroccan experience you&apos;ll have in
              Marrakech — and it&apos;s the one most visitors get wrong.
              Traditional public hammams cost &euro;2 and are where locals
              actually go; tourist hammams cost &euro;40–80 and wrap you in rose
              petals. Both are worth doing, but they&apos;re completely different
              experiences.
            </p>
            <p className="text-slate-600 leading-relaxed">
              This guide covers the full spectrum — from the neighbourhood
              hammam where you bring your own bucket to the spa-grade rituals at
              Les Bains de Marrakech. {filteredPlaces.length} hammams, all
              tested, all worth the steam.
            </p>
          </div>

          {/* Top Pick */}
          {topPick && (
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-6">
              <div className="relative w-full sm:w-48 h-48 sm:h-auto rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={topPick.photos[0]}
                  alt={topPick.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 192px"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-orange-500 uppercase tracking-wide">
                  Our Top Pick
                </span>
                <h3
                  className="text-xl font-bold text-slate-900 mt-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {topPick.name}
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  {topPick.neighborhood} &middot;{" "}
                  {topPick.priceLevel > 0
                    ? "€".repeat(topPick.priceLevel)
                    : "Free"}{" "}
                  &middot; &#9733; {topPick.rating.toFixed(1)}
                </p>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  {topPick.description}
                </p>
                <Link
                  href={`/marrakech/${topPick.slug}`}
                  className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-orange-500 hover:text-orange-600"
                >
                  View full profile &rarr;
                </Link>
              </div>
            </div>
          )}

          {/* Place Cards */}
          <h2
            className="text-2xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            The Best Hammams in Marrakech ({filteredPlaces.length} picks)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPlaces.map((p) => (
              <Link
                key={p.slug}
                href={`/marrakech/${p.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-slate-100"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={p.photos[0]}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3
                      className="font-bold text-slate-900 text-lg leading-snug"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {p.name}
                    </h3>
                    <span className="text-amber-500 text-sm font-semibold flex-shrink-0 ml-2">
                      &#9733; {p.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs mb-3">
                    {p.neighborhood} &middot;{" "}
                    {p.priceLevel > 0
                      ? "€".repeat(p.priceLevel)
                      : "Free"}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {p.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Local Tips */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 mb-10">
            <h2
              className="text-xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Local Tips for Hammams in Marrakech
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Traditional public hammams are gender-segregated. Women go in
                the morning, men in the afternoon — check times before going.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Bring your own flip-flops, towel and underwear to a public
                hammam. Soap and scrub gloves can be bought at the door for a
                few dirhams.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Tip the person who scrubs you 20–50 dirhams (&euro;2–5). This is
                expected, not optional.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Book tourist hammams 48 hours ahead — popular ones like Hammam
                de la Rose fill up especially on weekends.
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2
              className="text-xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              FAQ — Hammams in Marrakech
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What is the best hammam in Marrakech?",
                  a: "Hammam de la Rose for luxury, Les Bains de Marrakech for the most refined experience, and Hammam Mouassine for authentic tradition.",
                },
                {
                  q: "How much does a hammam cost in Marrakech?",
                  a: "Public hammams: 10–20 dirhams (€1–2). Tourist hammams: 200–800 dirhams (€20–80). Luxury spa hammams: 800–2000 dirhams (€80–200).",
                },
                {
                  q: "What should I expect at a Marrakech hammam?",
                  a: "Steam room, black soap scrub, ghassoul clay mask, and an argan oil massage. The full ritual takes 60–90 minutes.",
                },
                {
                  q: "Is hammam suitable for first-time visitors?",
                  a: "Yes — tourist-oriented hammams like Hammam de la Rose cater specifically to visitors with English-speaking staff and private rooms.",
                },
              ].map((item) => (
                <div key={item.q}>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {item.q}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Internal links */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">
              Explore more Marrakech guides
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/cities/marrakech/things-to-do", label: "Things to Do" },
                { href: "/cities/marrakech/spa", label: "Spas" },
                { href: "/cities/marrakech/restaurants", label: "Restaurants" },
                { href: "/cities/marrakech/rooftop", label: "Rooftop Bars" },
                { href: "/cities/marrakech/day-trips", label: "Day Trips" },
                { href: "/cities/marrakech/souks", label: "Souks" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm bg-white border border-slate-200 rounded-full px-4 py-2 text-slate-700 hover:text-orange-500 hover:border-orange-200 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/marrakech"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              Explore all Marrakech places &rarr;
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
