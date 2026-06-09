import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/barcelona/breakfast`;

export const metadata: Metadata = {
  title: "Best Breakfast in Barcelona — 10 Spots Locals Love (2025)",
  description: "The best breakfast spots in Barcelona from traditional pa amb tomàquet to brunch cafés in Sant Antoni and El Born. Updated 2025 local guide.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Best Breakfast in Barcelona — 10 Spots Locals Love (2025)",
    description: "The best breakfast spots in Barcelona from traditional pa amb tomàquet to brunch cafés in Sant Antoni and El Born. Updated 2025 local guide.",
    type: "website",
    url: CANONICAL,
  },
};

export default function BarcelonaBreakfastPage() {
  const breakfastPlaces = places.filter(
    (p) => p.citySlug === "barcelona" && (p.categories.includes("brunch") || p.categories.includes("cafes"))
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Breakfast in Barcelona",
    description: "The best breakfast spots in Barcelona from traditional pa amb tomàquet to brunch cafés in Sant Antoni and El Born.",
    url: CANONICAL,
    numberOfItems: breakfastPlaces.length,
    itemListElement: breakfastPlaces.map((p, i) => ({
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
      { "@type": "ListItem", position: 3, name: "Breakfast", item: CANONICAL },
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
              <span className="text-white/80">Breakfast</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Best Breakfast in Barcelona — 10 Spots Locals Love (2025)
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Breakfast in Barcelona means two completely different things depending on who you ask. The Catalan version is a tostada with tomato bread for €2.50. The international version is a brunch spread with avocado toast that takes an hour. Both are good — this guide covers the best of each.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Intro */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Breakfast in Barcelona means two completely different things depending on who you ask. The Catalan version is a tostada with tomato bread and olive oil at a marble counter for €2.50. The international version is a brunch spread with avocado toast and flat whites that takes an hour and costs €18. Both are good — this guide covers the best of each.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Whether you want a quick espresso and pa amb tomàquet before exploring or a leisurely Saturday brunch with friends, these are the spots worth your morning. {breakfastPlaces.length} cafés and brunch spots, all tested, all worth getting up for.
            </p>
          </div>

          {/* Place Cards */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            The Best Breakfast Spots in Barcelona ({breakfastPlaces.length} picks)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {breakfastPlaces.map((p) => (
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
              Local Tips for Breakfast in Barcelona
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Pa amb tomàquet (bread rubbed with tomato and olive oil) is the Catalan breakfast staple — try it at any local café.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Brunch queues are real on Saturday and Sunday from 10am — arrive before 10am or after 12:30pm.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Spanish breakfast culture means a café amb llet (coffee with milk) and a croissant is perfectly normal until noon.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Federal Café and Syra Coffee are the best for English-style brunch plates.</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              FAQ — Breakfast in Barcelona
            </h2>
            <div className="space-y-6">
              {[
                { q: "What do locals eat for breakfast in Barcelona?", a: "Pa amb tomàquet (tomato bread), croissants from patisseries, and a café amb llet at a bar counter. Traditional breakfast costs €2–5." },
                { q: "Best area for brunch in Barcelona?", a: "Sant Antoni for trendy café culture; El Born for artisan coffee and pastries. Both neighbourhoods have the best brunch scenes." },
                { q: "Do Barcelona cafés serve brunch on weekdays?", a: "Yes — Federal Café and Syra Coffee serve brunch daily, though the full menu is more available on weekends." },
                { q: "What time do Barcelona cafés open for breakfast?", a: "Traditional bars open at 7–8am; brunch cafés typically open at 9–10am. Weekend brunch is busiest 10am–1pm." },
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
                { href: "/cities/barcelona/coffee", label: "Coffee Shops" },
                { href: "/cities/barcelona/italian-restaurants", label: "Italian Restaurants" },
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
