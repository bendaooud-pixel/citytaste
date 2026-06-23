import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/marrakech/street-food`;
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Best Street Food in Marrakech ${YEAR} — Cheap Eats Guide`,
  description:
    "The best street food in Marrakech from Jemaa el-Fna stalls to hidden medina gems. What to eat, where to find it, and how much to pay.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: `Best Street Food in Marrakech ${YEAR} — Cheap Eats Guide`,
    description: "The best street food in Marrakech from Jemaa el-Fna stalls to hidden medina gems.",
    type: "website",
    url: CANONICAL,
  },
};

export default function MarrakechStreetFoodPage() {
  const filteredPlaces = places.filter(
    (p) => p.citySlug === "marrakech" && p.categories.includes("cheap-eats")
  );

  const topPick = filteredPlaces.find((p) => p.featured) || filteredPlaces[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Street Food in Marrakech",
    description: "The best street food in Marrakech from Jemaa el-Fna stalls to hidden medina gems.",
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
      { "@type": "ListItem", position: 3, name: "Street Food", item: CANONICAL },
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
              <span className="text-white/80">Street Food</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Best Street Food in Marrakech {YEAR} — Cheap Eats Guide
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Marrakech&apos;s street food scene is legendary — from the smoky grills of Jemaa el-Fna to the hole-in-the-wall tangia specialists in the medina. Eat like a local for under &euro;5.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              The best food in Marrakech often costs the least. A bowl of harira soup (10 DH), a lamb tangia slow-cooked since dawn (40 DH), msemen with honey from a street cart (5 DH) — these are the meals you&apos;ll remember. The trick is knowing which stalls to trust.
            </p>
            <p className="text-slate-600 leading-relaxed">
              {filteredPlaces.length} cheap eats tested — from 5-dirham street snacks to proper sit-down meals under 100 DH.
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
            The Best Street Food in Marrakech ({filteredPlaces.length} picks)
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
            <h2 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Local Tips for Street Food in Marrakech</h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Eat where locals queue. If a stall has a line of Marrakchis, the food is good and the hygiene is fine.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Jemaa el-Fna food stalls are pricier than medina alternatives — but stall #1 (Chez Aicha) and stall #14 are consistently good.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Try tangia (slow-cooked meat in a clay pot) at lunch — it&apos;s a Marrakech-only dish you won&apos;t find elsewhere in Morocco.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Fresh orange juice on Jemaa el-Fna costs 4 DH — don&apos;t pay more. Walk past the first row of stalls for better prices.</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>FAQ — Street Food in Marrakech</h2>
            <div className="space-y-6">
              {[
                { q: "Is street food safe in Marrakech?", a: "Yes — stick to busy stalls with high turnover. Avoid pre-cut fruit and go for freshly cooked dishes. Most visitors eat street food without issues." },
                { q: "What street food to try in Marrakech?", a: "Harira (soup), tangia (slow-cooked meat), msemen (flatbread), merguez (spicy sausage), brochettes (kebabs), snail soup, and fresh orange juice." },
                { q: "How much does street food cost in Marrakech?", a: "Most items cost 5–40 DH. A full street food meal with a drink rarely exceeds 60 DH." },
                { q: "Best time for street food on Jemaa el-Fna?", a: "The food stalls set up around 5pm and peak at 8–10pm. Go early (6pm) to watch setup and get the freshest food." },
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
                { href: "/cities/marrakech/souks", label: "Souks & Markets" },
                { href: "/cities/marrakech/day-trips", label: "Day Trips" },
                { href: "/cities/marrakech/rooftop", label: "Rooftop Bars" },
                { href: "/blog/street-food-marrakech", label: "Street Food Deep Guide" },
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
