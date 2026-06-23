import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/marrakech/breakfast`;
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Best Breakfast & Brunch in Marrakech ${YEAR} — Local Guide`,
  description:
    "The best breakfast and brunch spots in Marrakech from rooftop terraces to hidden riad courtyards. Honest prices and local tips.",
  alternates: {
    canonical: CANONICAL,
    languages: { fr: `${BASE}/cities/marrakech/meilleur-brunch` },
  },
  openGraph: {
    title: `Best Breakfast & Brunch in Marrakech ${YEAR} — Local Guide`,
    description:
      "The best breakfast and brunch spots in Marrakech from rooftop terraces to hidden riad courtyards.",
    type: "website",
    url: CANONICAL,
  },
};

export default function MarrakechBreakfastPage() {
  const filteredPlaces = places.filter(
    (p) =>
      p.citySlug === "marrakech" &&
      (p.categories.includes("brunch") || p.slug.includes("brunch"))
  );

  const topPick = filteredPlaces.find((p) => p.featured) || filteredPlaces[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Breakfast & Brunch in Marrakech",
    description: "The best breakfast and brunch spots in Marrakech from rooftop terraces to hidden riad courtyards.",
    url: CANONICAL,
    numberOfItems: filteredPlaces.length,
    itemListElement: filteredPlaces.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Restaurant",
        name: p.name,
        address: p.address,
        url: `${BASE}/marrakech/${p.slug}`,
        aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviewCount },
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Marrakech", item: `${BASE}/marrakech` },
      { "@type": "ListItem", position: 3, name: "Breakfast", item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-[#FFF8F0]">
        <div className="bg-[#1E293B] text-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 text-white/50 text-xs mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>&rsaquo;</span>
              <Link href="/marrakech" className="hover:text-white transition-colors">Marrakech</Link>
              <span>&rsaquo;</span>
              <span className="text-white/80">Breakfast</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Best Breakfast &amp; Brunch in Marrakech {YEAR} — Local Guide
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Moroccan breakfast is an art form — freshly baked msemen, amlou dip, mint tea, and olives laid out on a sunlit riad terrace. Skip the hotel buffet and eat where Marrakchis do.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Moroccan breakfast is an art form — freshly baked msemen, amlou dip, mint tea, and olives laid out on a sunlit riad terrace. The best brunch spots in Marrakech blend this tradition with contemporary twists, from shakshuka at Caf&eacute; Clock to the legendary spread at La Mamounia.
            </p>
            <p className="text-slate-600 leading-relaxed">
              {filteredPlaces.length} brunch spots tested — from budget-friendly medina caf&eacute;s to palace-level spreads worth every dirham.
            </p>
          </div>

          {topPick && (
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-6">
              <div className="relative w-full sm:w-48 h-48 sm:h-auto rounded-xl overflow-hidden flex-shrink-0">
                <Image src={topPick.photos[0]} alt={topPick.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 192px" />
              </div>
              <div>
                <span className="text-xs font-bold text-orange-500 uppercase tracking-wide">Our Top Pick</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1" style={{ fontFamily: "var(--font-playfair)" }}>{topPick.name}</h3>
                <p className="text-slate-500 text-xs mt-1">{topPick.neighborhood} &middot; {topPick.priceLevel > 0 ? "€".repeat(topPick.priceLevel) : "Free"} &middot; &#9733; {topPick.rating.toFixed(1)}</p>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">{topPick.description}</p>
                <Link href={`/marrakech/${topPick.slug}`} className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-orange-500 hover:text-orange-600">View full profile &rarr;</Link>
              </div>
            </div>
          )}

          <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            The Best Breakfast Spots in Marrakech ({filteredPlaces.length} picks)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPlaces.map((p) => (
              <Link key={p.slug} href={`/marrakech/${p.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-slate-100">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={p.photos[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 text-lg leading-snug" style={{ fontFamily: "var(--font-playfair)" }}>{p.name}</h3>
                    <span className="text-amber-500 text-sm font-semibold flex-shrink-0 ml-2">&#9733; {p.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-slate-500 text-xs mb-3">{p.neighborhood} &middot; {p.priceLevel > 0 ? "€".repeat(p.priceLevel) : "Free"}</p>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Local Tips for Breakfast in Marrakech</h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Most riads include breakfast — check before booking a separate brunch. Riad breakfasts are often the best meal of the day.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>For street-level Moroccan breakfast, look for stalls selling msemen (flatbread) and harcha (semolina bread) — usually 5–10 DH each.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Weekend brunch at luxury hotels (La Mamounia, Royal Mansour) requires reservation — book 48 hours ahead.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Mint tea is the default breakfast drink. Ask for &ldquo;nous nous&rdquo; (half-half) if you want it less sweet.</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>FAQ — Breakfast in Marrakech</h2>
            <div className="space-y-6">
              {[
                { q: "What is a typical Moroccan breakfast?", a: "Msemen (flatbread), baghrir (spongy pancakes), amlou (almond butter), honey, olives, cheese, and mint tea. Simple, generous, and always shared." },
                { q: "Best brunch spots in Marrakech?", a: "La Mamounia for the ultimate palace brunch, Nomad for rooftop views, Café Clock for cultural brunch with live music, and Le Jardin for a garden setting." },
                { q: "How much does brunch cost in Marrakech?", a: "Street breakfast: 20–40 DH. Café brunch: 80–150 DH. Hotel brunch: 300–600 DH. Palace brunch: 600–1200 DH." },
                { q: "What time is breakfast in Marrakech?", a: "Street stalls open at 7am. Cafés serve from 8–9am. Weekend brunch is typically 10am–1pm at most places." },
              ].map((item) => (
                <div key={item.q}>
                  <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Explore more Marrakech guides</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/cities/marrakech/things-to-do", label: "Things to Do" },
                { href: "/cities/marrakech/restaurants", label: "Restaurants" },
                { href: "/cities/marrakech/street-food", label: "Street Food" },
                { href: "/cities/marrakech/rooftop", label: "Rooftop Bars" },
                { href: "/cities/marrakech/day-trips", label: "Day Trips" },
                { href: "/blog/48-hours-food-guide-marrakech", label: "48h Food Guide" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-sm bg-white border border-slate-200 rounded-full px-4 py-2 text-slate-700 hover:text-orange-500 hover:border-orange-200 transition-colors">{link.label}</Link>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/marrakech" className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg">Explore all Marrakech places &rarr;</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
