import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/barcelona/bars`;
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Best Bars in Barcelona — Where Locals Actually Drink (${YEAR})`,
  description: `Discover the best bars in Barcelona from vermouth bars in El Born to rooftop cocktail bars in Eixample. Updated ${YEAR} local guide.`,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: `Best Bars in Barcelona — Where Locals Actually Drink (${YEAR})`,
    description: `Discover the best bars in Barcelona from vermouth bars in El Born to rooftop cocktail bars in Eixample. Updated ${YEAR} local guide.`,
    type: "website",
    url: CANONICAL,
  },
};

export default function BarcelonaBarPage() {
  const barPlaces = places.filter(
    (p) => p.citySlug === "barcelona" && p.categories.includes("bars")
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Bars in Barcelona",
    description: "Discover the best bars in Barcelona from vermouth bars in El Born to rooftop cocktail bars in Eixample.",
    url: CANONICAL,
    numberOfItems: barPlaces.length,
    itemListElement: barPlaces.map((p, i) => ({
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
      { "@type": "ListItem", position: 3, name: "Bars", item: CANONICAL },
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
              <span className="text-white/80">Bars</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Best Bars in Barcelona — Where Locals Actually Drink ({YEAR})
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Barcelona&apos;s bar scene operates on its own timezone — nobody orders a drink before 9pm and the best conversations happen after midnight. From absinthe rituals at Bar Marsella to theatrical cocktails at Paradiso, a night out here is unlike anywhere in Europe.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Intro */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Barcelona&apos;s bar scene operates on its own timezone — nobody orders a drink before 9pm and the best conversations happen after midnight. From the absinthe rituals at Bar Marsella to the theatrical cocktails at Paradiso, a night out here is unlike anywhere in Europe.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The neighbourhoods that matter: El Born for hidden speakeasies, Sant Antoni for vermouth on a Sunday, and Eixample for elegant classics. This is your local&apos;s guide to drinking in Barcelona without ordering a sangria bucket. {barPlaces.length} bars, all tested, all worth the cab home.
            </p>
          </div>

          {/* Place Cards */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            The Best Bars in Barcelona ({barPlaces.length} picks)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {barPlaces.map((p) => (
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
              Local Tips for Bars in Barcelona
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Barcelona bars don&apos;t fill up until 10pm — arrive at 9pm if you want a table without a wait.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Sant Antoni neighbourhood (around Carrer del Parlament) is the best bar-hopping street in the city.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Order vermut (vermouth) before dinner — it&apos;s the Barcelona pre-dinner ritual locals swear by.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>El Born has the highest concentration of cocktail bars per block in the city.</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              FAQ — Bars in Barcelona
            </h2>
            <div className="space-y-6">
              {[
                { q: "What are the best bars in Barcelona for locals?", a: "El Xampanyet for cava, Paradiso for cocktails, and Bar Marsella for absinthe history. Quimet & Quimet in Poble Sec is another local classic." },
                { q: "Where to drink in Barcelona without tourist traps?", a: "Stick to Sant Antoni, El Born and Poble Sec — avoid anything on Las Ramblas. The best bars are always a street or two away from the main tourist thoroughfares." },
                { q: "Best area for bars in Barcelona?", a: "Sant Antoni and El Born for an evening circuit; Barceloneta for beach bars in summer. Eixample has the most elegant cocktail bars." },
                { q: "What time do bars open in Barcelona?", a: "Most bars open at 8–9pm; cocktail bars peak after 10pm. Don't arrive before 9:30pm if you want the authentic Barcelona bar atmosphere." },
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
                { href: "/cities/barcelona/rooftop-bars", label: "Rooftop Bars" },
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
