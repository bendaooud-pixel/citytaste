import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/barcelona/italian-restaurants`;
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Best Italian Restaurants in Barcelona — Tested & Approved (${YEAR})`,
  description: `The best Italian restaurants in Barcelona — from fresh pasta in Eixample to Neapolitan pizza in Gràcia. Updated ${YEAR} local guide.`,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: `Best Italian Restaurants in Barcelona — Tested & Approved (${YEAR})`,
    description: `The best Italian restaurants in Barcelona — from fresh pasta in Eixample to Neapolitan pizza in Gràcia. Updated ${YEAR} local guide.`,
    type: "website",
    url: CANONICAL,
  },
};

export default function BarcelonaItalianPage() {
  const italianPlaces = places.filter(
    (p) => p.citySlug === "barcelona" && p.categories.includes("italian")
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Italian Restaurants in Barcelona",
    description: "The best Italian restaurants in Barcelona — from fresh pasta in Eixample to Neapolitan pizza in Gràcia.",
    url: CANONICAL,
    numberOfItems: italianPlaces.length,
    itemListElement: italianPlaces.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Restaurant",
        name: p.name,
        address: p.address,
        url: `${BASE}/barcelona/${p.slug}`,
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
      { "@type": "ListItem", position: 2, name: "Barcelona", item: `${BASE}/barcelona` },
      { "@type": "ListItem", position: 3, name: "Italian Restaurants", item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-[#FFF8F0]">
        {/* Hero */}
        <div className="bg-[#1E293B] text-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 text-white/50 text-xs mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>›</span>
              <Link href="/barcelona" className="hover:text-white transition-colors">Barcelona</Link>
              <span>›</span>
              <span className="text-white/80">Italian Restaurants</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Best Italian Restaurants in Barcelona — Tested &amp; Approved ({YEAR})
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Barcelona has a long Italian immigrant history going back to the 19th century, and the city&apos;s Italian restaurant scene is more serious than most visitors expect. The best pasta is homemade fresh daily and a few spots are regularly visited by Italian expats — the highest endorsement possible.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Intro */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Barcelona has a long Italian immigrant history going back to the 19th century, and the city&apos;s Italian restaurant scene is more serious than most visitors expect. The best pasta in town is homemade fresh daily, the wood-fired pizzas have a proper Neapolitan char, and a few spots are regularly visited by Italian expats — the highest endorsement possible.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Forget the tourist-menu Italian restaurants near the Gothic Quarter. These are the places where the dough is made with imported 00 flour and the carbonara uses guanciale. {italianPlaces.length} restaurants, all verified, all worth the reservation.
            </p>
          </div>

          {/* Place Cards */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            The Best Italian Restaurants in Barcelona ({italianPlaces.length} picks)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {italianPlaces.map((p) => (
              <Link
                key={p.slug}
                href={`/barcelona/${p.slug}`}
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
                    <h3 className="font-bold text-slate-900 text-lg leading-snug" style={{ fontFamily: "var(--font-playfair)" }}>
                      {p.name}
                    </h3>
                    <span className="text-amber-500 text-sm font-semibold flex-shrink-0 ml-2">★ {p.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-slate-500 text-xs mb-3">{p.neighborhood} · {"€".repeat(p.priceLevel || 1)}</p>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Local Tips */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Local Tips for Italian Restaurants in Barcelona
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>The best Italian restaurants in Barcelona are in Eixample and Gràcia, not the Gothic Quarter.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Fresh pasta places tend to book out 5–7 days ahead — plan accordingly.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Lunch menus (menú del día) at Italian restaurants offer 3 courses plus wine for €14–18 — exceptional value.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Thursday evenings are the best time for a last-minute walk-in at most Italian places.</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              FAQ — Italian Restaurants in Barcelona
            </h2>
            <div className="space-y-6">
              {[
                { q: "Is there good Italian food in Barcelona?", a: "Yes — Barcelona has a strong Italian culinary tradition with excellent fresh pasta, Neapolitan pizza and quality wine lists." },
                { q: "What is the best Italian restaurant in Barcelona?", a: "Celeri for pasta, Bosco di Piero for pizza, and La Pepita for budget Italian in Gràcia." },
                { q: "Do Italian restaurants in Barcelona take reservations?", a: "The best ones require reservations 5–7 days ahead for evenings. Lunch is easier to walk in." },
                { q: "How much does dinner at an Italian restaurant in Barcelona cost?", a: "€20–35 per person at mid-range; €40–60 at upscale Italian spots with wine." },
              ].map((item) => (
                <div key={item.q}>
                  <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Internal links */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Explore more Barcelona guides</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/cities/barcelona/tapas", label: "Tapas Bars" },
                { href: "/cities/barcelona/seafood", label: "Seafood Restaurants" },
                { href: "/cities/barcelona/breakfast", label: "Breakfast & Brunch" },
                { href: "/barcelona", label: "All Barcelona Places" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-sm bg-white border border-slate-200 rounded-full px-4 py-2 text-slate-700 hover:text-orange-500 hover:border-orange-200 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/barcelona" className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg">
              Explore all Barcelona places →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
