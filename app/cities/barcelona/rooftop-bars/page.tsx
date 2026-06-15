import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/barcelona/rooftop-bars`;
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Best Rooftop Bars in Barcelona — Sunset Views & Cocktails (${YEAR})`,
  description: `The best rooftop bars in Barcelona for sunset cocktails — from the W hotel's Eclipse Bar to Mirablau on Tibidabo. Updated ${YEAR} local guide.`,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: `Best Rooftop Bars in Barcelona — Sunset Views & Cocktails (${YEAR})`,
    description: `The best rooftop bars in Barcelona for sunset cocktails — from the W hotel's Eclipse Bar to Mirablau on Tibidabo. Updated ${YEAR} local guide.`,
    type: "website",
    url: CANONICAL,
  },
};

export default function BarcelonaRooftopPage() {
  const rooftopPlaces = places.filter(
    (p) => p.citySlug === "barcelona" && p.categories.includes("rooftop")
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Rooftop Bars in Barcelona",
    description: "The best rooftop bars in Barcelona for sunset cocktails — from the W hotel's Eclipse Bar to Mirablau on Tibidabo.",
    url: CANONICAL,
    numberOfItems: rooftopPlaces.length,
    itemListElement: rooftopPlaces.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "BarOrPub",
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
      { "@type": "ListItem", position: 3, name: "Rooftop Bars", item: CANONICAL },
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
              <span className="text-white/80">Rooftop Bars</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Best Rooftop Bars in Barcelona — Sunset Views &amp; Cocktails ({YEAR})
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Barcelona is a rooftop city — the Eixample grid, Montjuïc, the sea, the distant outline of the Pyrenees — all of it visible from the right terrace. The golden rule: come at sunset (8:30–9:30pm in summer) and book ahead.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Intro */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Barcelona is a rooftop city — the Eixample grid, Montjuïc, the sea, the distant outline of the Pyrenees — all of it visible from the right terrace. The best rooftop bars span from the W hotel&apos;s 26-floor Eclipse Bar over the Mediterranean, to the more democratic terrace at Mirablau in Tibidabo where the whole city unfolds below you for the price of a gin and tonic.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The golden rule: come at sunset (8:30–9:30pm in summer) and book ahead. The best terraces fill up by 8pm every evening from May to October. {rooftopPlaces.length} rooftop bars, all with views worth the reservation.
            </p>
          </div>

          {/* Place Cards */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            The Best Rooftop Bars in Barcelona ({rooftopPlaces.length} picks)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {rooftopPlaces.map((p) => (
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
              Local Tips for Rooftop Bars in Barcelona
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Barcelona&apos;s best rooftop sunset time in summer is 9–9:30pm — plan your drink accordingly.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Book rooftop bar tables at least 48 hours ahead for weekends, especially May–September.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>The W hotel rooftop (Eclipse) requires smart casual — flip-flops and football shirts are turned away.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Mirablau and La Isabela are the best options if you want views without the luxury hotel price tag.</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              FAQ — Rooftop Bars in Barcelona
            </h2>
            <div className="space-y-6">
              {[
                { q: "What are the best rooftop bars in Barcelona?", a: "Eclipse Bar at the W for luxury views; Mirablau for the most complete panoramic view of the city; Terrazza Martini for Eixample elegance." },
                { q: "Do rooftop bars in Barcelona require reservations?", a: "Yes for premium bars (Eclipse, Terrazza Martini) — reserve 2–3 days ahead. Mirablau and La Isabela are more walk-in friendly." },
                { q: "What is the best rooftop bar in Barcelona for sunset?", a: "Mirablau on Tibidabo has the widest sunset panorama over the entire city; Eclipse has the best sea view." },
                { q: "How expensive are rooftop bars in Barcelona?", a: "Cocktails cost €12–20 at hotel rooftops; €7–12 at independent terraces. Mirablau is the most affordable option." },
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
                { href: "/cities/barcelona/bars", label: "Bars" },
                { href: "/cities/barcelona/tapas", label: "Tapas Bars" },
                { href: "/cities/barcelona/coffee", label: "Coffee Shops" },
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
