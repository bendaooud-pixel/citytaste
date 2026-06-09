import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/barcelona/seafood`;

export const metadata: Metadata = {
  title: "Best Seafood Restaurants in Barcelona — Fresh from the Port (2025)",
  description: "The best seafood restaurants in Barcelona — arroz negro, fideuà and the freshest fish from the port. Updated 2025 local guide.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Best Seafood Restaurants in Barcelona — Fresh from the Port (2025)",
    description: "The best seafood restaurants in Barcelona — arroz negro, fideuà and the freshest fish from the port. Updated 2025 local guide.",
    type: "website",
    url: CANONICAL,
  },
};

export default function BarcelonaSeafoodPage() {
  const seafoodPlaces = places.filter(
    (p) => p.citySlug === "barcelona" && p.categories.includes("seafood")
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Seafood Restaurants in Barcelona",
    description: "The best seafood restaurants in Barcelona — arroz negro, fideuà and the freshest fish from the port.",
    url: CANONICAL,
    numberOfItems: seafoodPlaces.length,
    itemListElement: seafoodPlaces.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SeafoodRestaurant",
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
      { "@type": "ListItem", position: 3, name: "Seafood", item: CANONICAL },
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
              <span className="text-white/80">Seafood</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Best Seafood Restaurants in Barcelona — Fresh from the Port (2025)
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Barcelona is 20 minutes from the Mediterranean and the fishing boats still come in at the port every morning. The city&apos;s seafood restaurants range from legendary dining rooms serving arroz negro since 1836, to no-sign counter bars where the razor clams were alive an hour ago.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Intro */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Barcelona is 20 minutes from the Mediterranean and the fishing boats still come in at the port every morning. The city&apos;s seafood restaurants range from legendary institutional dining rooms serving arroz negro since 1836, to no-sign counter bars inside La Boqueria where the razor clams were alive an hour ago.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The key local knowledge: avoid the seafront restaurants that show photos of dishes on laminated menus. The good ones are harder to find and don&apos;t need the tourist trade. {seafoodPlaces.length} restaurants, all verified, all serving the real thing.
            </p>
          </div>

          {/* Place Cards */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            The Best Seafood Restaurants in Barcelona ({seafoodPlaces.length} picks)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {seafoodPlaces.map((p) => (
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
              Local Tips for Seafood in Barcelona
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Barceloneta seafood is best at lunch (1–3pm) when the fish is fresh off the morning market.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Arroz negro (squid ink rice) and fideuà (noodle paella) are the Catalan seafood specialities — both different from Valencian paella.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Counter bars inside markets (La Boqueria, Mercat de Santa Caterina) offer the freshest and cheapest seafood in the city.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">→</span>Monday is the weakest day for seafood — fish markets are closed Sunday so Monday stock is older.</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              FAQ — Seafood in Barcelona
            </h2>
            <div className="space-y-6">
              {[
                { q: "What is the best seafood restaurant in Barcelona?", a: "La Mar Salada for arroz negro; Can Solé for a heritage dining experience; La Cova Fumada for the most authentic market experience." },
                { q: "Is Barcelona seafood expensive?", a: "Counter bars and market restaurants cost €15–25pp. Sit-down seafood restaurants in Barceloneta run €35–60pp." },
                { q: "What seafood is typical in Barcelona?", a: "Gambas a la plancha, razor clams, arroz negro, fideuà, boquerones and grilled fish of the day." },
                { q: "Where is the best seafood market in Barcelona?", a: "La Boqueria has the best selection; arrive before 11am for the freshest produce and counter restaurants." },
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
                { href: "/cities/barcelona/paella", label: "Best Paella" },
                { href: "/cities/barcelona/tapas", label: "Tapas Bars" },
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
