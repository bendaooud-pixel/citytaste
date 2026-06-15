import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/barcelona/tapas`;
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Best Tapas Bars in Barcelona — A Local's Guide (${YEAR})`,
  description: `The best tapas bars in Barcelona — from standing bars in El Born to century-old bodegas in Poble Sec. Updated ${YEAR} local guide.`,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: `Best Tapas Bars in Barcelona — A Local's Guide (${YEAR})`,
    description: `The best tapas bars in Barcelona — from standing bars in El Born to century-old bodegas in Poble Sec. Updated ${YEAR} local guide.`,
    type: "website",
    url: CANONICAL,
  },
};

export default function BarcelonaTapasPage() {
  const tapasPlaces = places.filter(
    (p) => p.citySlug === "barcelona" && p.categories.includes("tapas")
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Tapas Bars in Barcelona",
    description: "The best tapas bars in Barcelona — from standing bars in El Born to century-old bodegas in Poble Sec.",
    url: CANONICAL,
    numberOfItems: tapasPlaces.length,
    itemListElement: tapasPlaces.map((p, i) => ({
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
      { "@type": "ListItem", position: 3, name: "Tapas", item: CANONICAL },
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
              <span className="text-white/80">Tapas</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Best Tapas Bars in Barcelona — A Local&apos;s Guide ({YEAR})
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Tapas in Barcelona is not what most visitors expect. This is Catalonia, not Andalusia — what you will find are standing bars where you eat from the counter, century-old bodegas pouring house wine from the barrel, and legendary spots that have been feeding the neighbourhood since before the tourists arrived.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Intro */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Tapas in Barcelona is not what most visitors expect. This is Catalonia, not Andalusia — you won&apos;t find flamenco on every corner and the local tradition is more vermouth-and-small-plates than formal tapas service. What you will find: standing bars where you eat from the counter, century-old bodegas pouring house wine from the barrel, and a few legendary spots that have been feeding the neighbourhood since before the tourists arrived.
            </p>
            <p className="text-slate-600 leading-relaxed">
              This guide skips the tourist strips and goes straight to the places worth queuing for. {tapasPlaces.length} tapas bars, all tested, all the real thing.
            </p>
          </div>

          {/* Place Cards */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            The Best Tapas Bars in Barcelona ({tapasPlaces.length} picks)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tapasPlaces.map((p) => (
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
              Local Tips for Tapas in Barcelona
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>El Born and Barceloneta are the best neighbourhoods for tapas bars.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Order patatas bravas, pan con tomate and croquetas as your baseline trio at any tapas bar.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Standing bars (no seats) are almost always better quality and cheaper than sit-down tapas restaurants.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Tapas culture in Barcelona is strongest between 1–3pm (lunch) and 7–9pm (pre-dinner) — not late evening.</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              FAQ — Tapas in Barcelona
            </h2>
            <div className="space-y-6">
              {[
                { q: "What are the best tapas bars in Barcelona for locals?", a: "El Xampanyet, Quimet & Quimet and Bar Cañete are where locals eat tapas — all three have been going for decades." },
                { q: "Where is the best area for tapas in Barcelona?", a: "El Born, Barceloneta and Poble Sec for traditional tapas. Sant Antoni for modern pintxos bars." },
                { q: "How much do tapas cost in Barcelona?", a: "€2–6 per plate at traditional bars; €4–10 at sit-down tapas restaurants. A full meal of tapas runs €15–25pp." },
                { q: "Is it rude to eat tapas standing in Barcelona?", a: "Not at all — many of the best tapas bars are standing-only and that's considered the proper way to eat." },
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
