import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/barcelona/paella`;
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Best Paella in Barcelona — Where to Eat the Real Thing (${YEAR})`,
  description: `Where to eat the best paella in Barcelona — with socarrat, bomba rice and no tourist traps. Updated ${YEAR} local guide.`,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: `Best Paella in Barcelona — Where to Eat the Real Thing (${YEAR})`,
    description: `Where to eat the best paella in Barcelona — with socarrat, bomba rice and no tourist traps. Updated ${YEAR} local guide.`,
    type: "website",
    url: CANONICAL,
  },
};

export default function BarcelonaPaellaPage() {
  const paellaPlaces = places.filter(
    (p) => p.citySlug === "barcelona" && p.categories.includes("seafood")
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Paella in Barcelona",
    description: "Where to eat the best paella in Barcelona — with socarrat, bomba rice and no tourist traps.",
    url: CANONICAL,
    numberOfItems: paellaPlaces.length,
    itemListElement: paellaPlaces.map((p, i) => ({
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
      { "@type": "ListItem", position: 3, name: "Paella", item: CANONICAL },
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
              <span className="text-white/80">Paella</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Best Paella in Barcelona — Where to Eat the Real Thing ({YEAR})
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Paella divides Barcelona. The tourist version is watery, under-seasoned rice with frozen prawns. The real version has socarrat, uses bomba rice and takes 45 minutes to cook properly. Finding the real thing requires knowing where not to go.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Intro */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Paella divides Barcelona. The tourist version — watery, under-seasoned rice with a few frozen prawns — is served on every seafront terrace at €25 a head. The real version has socarrat (the crispy caramelised rice crust on the bottom), uses bomba rice from the Valencia delta, and takes 45 minutes to cook properly.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Finding the real thing requires knowing where not to go. Avoid any restaurant with paella photos on a banner outside. Start with the places on this list instead — {paellaPlaces.length} restaurants where the paella is worth ordering.
            </p>
          </div>

          {/* Place Cards */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            The Best Paella Restaurants in Barcelona ({paellaPlaces.length} picks)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {paellaPlaces.map((p) => (
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
              Local Tips for Paella in Barcelona
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Paella is always a lunch dish in Barcelona — ordering it for dinner is the first tourist mistake.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>The socarrat (crispy rice crust) is the mark of a properly made paella — ask if they do it before ordering.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Fideuà (noodle version of paella) and arroz negro (squid ink) are the Catalan variations worth trying.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Paella is always minimum 2 portions — don&apos;t expect to order it solo.</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              FAQ — Paella in Barcelona
            </h2>
            <div className="space-y-6">
              {[
                { q: "Where is the best paella in Barcelona?", a: "7 Portes for the historic experience; Elche for the local's version; La Mar Salada for the best arroz negro." },
                { q: "How much does paella cost in Barcelona?", a: "Authentic paella at good restaurants costs €18–28 per person. Anything under €15 at a tourist restaurant is almost certainly frozen rice." },
                { q: "Is paella originally from Barcelona?", a: "No — paella is Valencian. But Barcelona has adapted it magnificently. Catalan variations include fideuà and arroz negro." },
                { q: "When should I eat paella in Barcelona?", a: "Always at lunch (1–3pm). Paella for dinner is rare and usually a tourist-menu compromise." },
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
                { href: "/cities/barcelona/seafood", label: "Seafood Restaurants" },
                { href: "/cities/barcelona/tapas", label: "Tapas Bars" },
                { href: "/cities/barcelona/bars", label: "Bars" },
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
