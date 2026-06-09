import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/barcelona/coffee`;

export const metadata: Metadata = {
  title: "Best Coffee Shops in Barcelona — From Espresso to Flat White (2025)",
  description: "The best coffee shops in Barcelona — from traditional espresso at marble bars to specialty flat whites in El Born and Eixample. Updated 2025 local guide.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Best Coffee Shops in Barcelona — From Espresso to Flat White (2025)",
    description: "The best coffee shops in Barcelona — from traditional espresso at marble bars to specialty flat whites in El Born and Eixample. Updated 2025 local guide.",
    type: "website",
    url: CANONICAL,
  },
};

export default function BarcelonaCoffeePage() {
  const coffeePlaces = places.filter(
    (p) => p.citySlug === "barcelona" && p.categories.includes("cafes")
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Coffee Shops in Barcelona",
    description: "The best coffee shops in Barcelona — from traditional espresso at marble bars to specialty flat whites in El Born and Eixample.",
    url: CANONICAL,
    numberOfItems: coffeePlaces.length,
    itemListElement: coffeePlaces.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CafeOrCoffeeShop",
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
      { "@type": "ListItem", position: 3, name: "Coffee", item: CANONICAL },
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
              <span className="text-white/80">Coffee</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Best Coffee Shops in Barcelona — From Espresso to Flat White (2025)
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Barcelona&apos;s coffee scene exists on two parallel tracks. The traditional track is the espresso at the marble bar for €1.20. The specialty track is the Australian-influenced flat white culture that arrived in the 2010s. Both are excellent — this guide covers the best of each.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Intro */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Barcelona&apos;s coffee scene exists on two parallel tracks. The traditional track is the espresso at the marble bar — a café solo for €1.20, drunk standing up, finished in two minutes. The specialty track is the Australian-influenced flat white culture that arrived in the 2010s, bringing single-origin pour-overs and latte art to El Born and Eixample.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Both are excellent in this city and both are worth seeking out. This guide covers the best of the traditional and the specialty, with exact addresses and what to order at each. {coffeePlaces.length} coffee shops, all verified.
            </p>
          </div>

          {/* Place Cards */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            The Best Coffee Shops in Barcelona ({coffeePlaces.length} picks)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {coffeePlaces.map((p) => (
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
              Local Tips for Coffee in Barcelona
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>A café amb llet is the Catalan version of a flat white — milkier than a cortado but smaller than a latte.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Nomad Coffee Lab in El Born is where most Barcelona cafés get their beans — the espresso bar is exceptional.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Traditional Barcelona espresso culture is standing at a zinc bar — this is the cheapest (€1–1.50) and fastest option.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Avoid ordering a &apos;latte&apos; at traditional Spanish bars — ask for a café amb llet (amb = with in Catalan).</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              FAQ — Coffee in Barcelona
            </h2>
            <div className="space-y-6">
              {[
                { q: "What is the best coffee shop in Barcelona?", a: "Nomad Coffee Lab for specialty coffee; Cafés El Magnífico for the best traditional espresso; Syra Coffee for Australian brunch culture." },
                { q: "Is coffee expensive in Barcelona?", a: "Traditional espresso is €1–1.50 at a bar counter. Specialty coffee at modern cafés runs €3–5. Still cheaper than Paris or London." },
                { q: "What do locals drink for coffee in Barcelona?", a: "Café solo (espresso), café amb llet (coffee with milk) or cortado (espresso with a small amount of milk)." },
                { q: "Does Barcelona have good specialty coffee?", a: "Yes — Nomad Coffee Lab is Spain's most awarded roaster. El Born and Eixample have the best specialty cafés." },
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
                { href: "/cities/barcelona/breakfast", label: "Breakfast & Brunch" },
                { href: "/cities/barcelona/bars", label: "Bars" },
                { href: "/cities/barcelona/tapas", label: "Tapas Bars" },
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
