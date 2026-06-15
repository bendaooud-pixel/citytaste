import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/marrakech/places`;
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Best Places in Marrakech ${YEAR} — Hidden Gems & Classics`,
  description:
    "The best places to visit in Marrakech from the iconic Jemaa el-Fna to hidden medina gems locals love.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: `Best Places in Marrakech ${YEAR} — Hidden Gems & Classics`,
    description:
      "The best places to visit in Marrakech from the iconic Jemaa el-Fna to hidden medina gems locals love.",
    type: "website",
    url: CANONICAL,
  },
};

export default function MarrakechPlacesPage() {
  const filteredPlaces = places.filter(
    (p) =>
      p.citySlug === "marrakech" &&
      (p.categories.includes("monuments") ||
        p.categories.includes("museums") ||
        p.categories.includes("markets"))
  );

  const topPick = filteredPlaces.find((p) => p.featured) || filteredPlaces[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Places in Marrakech",
    description:
      "The best places to visit in Marrakech from the iconic Jemaa el-Fna to hidden medina gems locals love.",
    url: CANONICAL,
    numberOfItems: filteredPlaces.length,
    itemListElement: filteredPlaces.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristAttraction",
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
        name: "Places",
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
              <span className="text-white/80">Places</span>
            </nav>
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Best Places in Marrakech {YEAR} — Hidden Gems &amp; Classics
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Marrakech is a city of layers — behind every unmarked door,
              there&apos;s a courtyard garden; above every narrow alley,
              there&apos;s a rooftop with an Atlas Mountain view.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Intro */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Marrakech is a city of layers — behind every unmarked door,
              there&apos;s a courtyard garden; above every narrow alley,
              there&apos;s a rooftop with an Atlas Mountain view. The places that
              matter aren&apos;t always the ones with the longest queues.
            </p>
            <p className="text-slate-600 leading-relaxed">
              This guide covers the essentials — Bahia Palace, the Majorelle
              Garden, Jemaa el-Fna — alongside the hidden gems that most
              visitors miss entirely. {filteredPlaces.length} places, all
              visited, all worth your time.
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
            The Best Places in Marrakech ({filteredPlaces.length} picks)
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
              Local Tips for Visiting Places in Marrakech
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Visit Bahia Palace first thing in the morning (8:30am) — the
                light in the courtyard is magical and the crowds are thin.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                The Majorelle Garden gets uncomfortably packed after 10am. Buy
                tickets online in advance and arrive at opening.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Medersa Ben Youssef is the most photogenic building in
                Marrakech — go on a weekday morning for empty corridors.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Jemaa el-Fna is two different places: a quiet square by day and
                an electrifying night market by 8pm.
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2
              className="text-xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              FAQ — Places to Visit in Marrakech
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What are the best places to visit in Marrakech?",
                  a: "Bahia Palace, Majorelle Garden, Saadian Tombs, Medersa Ben Youssef and Jemaa el-Fna square are the must-sees.",
                },
                {
                  q: "Are there hidden gems in Marrakech?",
                  a: "Yes — El Badi Palace is less crowded than Bahia, the Mellah (Jewish quarter) market is fascinating, and the Musée de Marrakech is often empty.",
                },
                {
                  q: "How much do Marrakech attractions cost?",
                  a: "Most monuments cost 50–100 dirhams (€5–10). The Majorelle Garden is 150 dirhams (€15). Jemaa el-Fna is free.",
                },
                {
                  q: "Best time to visit Marrakech monuments?",
                  a: "Early morning (8:30–10am) for palaces and gardens. Evening (7–10pm) for Jemaa el-Fna night market.",
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
                { href: "/cities/marrakech/souks", label: "Souks" },
                {
                  href: "/cities/marrakech/things-to-do",
                  label: "Things to Do",
                },
                {
                  href: "/cities/marrakech/restaurants",
                  label: "Restaurants",
                },
                {
                  href: "/cities/marrakech/rooftop",
                  label: "Rooftop Bars",
                },
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
