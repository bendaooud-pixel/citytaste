import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/marrakech/rooftop`;
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Best Rooftop Bars in Marrakech ${YEAR} — Sunset Views & Cocktails`,
  description: `The ${YEAR} guide to rooftop bars in Marrakech: Kabana for the Koutoubia view, Sky Bar for 360° panoramas, Nomad for halal-friendly sunset drinks. Honest prices.`,
  alternates: {
    canonical: CANONICAL,
    languages: { fr: `${BASE}/cities/marrakech/meilleur-rooftop` },
  },
  openGraph: {
    title: `Best Rooftop Bars in Marrakech ${YEAR} — Sunset Views & Cocktails`,
    description: `The best rooftop bars in Marrakech with Atlas Mountain views and sunset cocktails. Our top picks for ${YEAR}.`,
    type: "website",
    url: CANONICAL,
  },
};

const FAQ_ITEMS = [
  {
    q: "What is the best rooftop bar in Marrakech?",
    a: "Kabana Rooftop for the closest Koutoubia view, Sky Bar at Es Saadi for the widest 360° panorama spanning the Atlas Mountains, and Nomad for a relaxed, halal-friendly rooftop with good food.",
  },
  {
    q: "Do rooftop bars in Marrakech serve alcohol?",
    a: "Yes — licensed rooftop bars like Kabana, Sky Bar, Kosybar and Le Salama serve cocktails, wine and beer. Mocktails and Moroccan mint tea are always available. Some medina terraces (Café des Épices, Terrasse des Épices) are non-alcoholic only.",
  },
  {
    q: "What time is sunset in Marrakech?",
    a: `Sunset in Marrakech falls between 5:30pm (December–January) and 8:30pm (June–July). The golden hour — when the Koutoubia turns amber and the Atlas Mountains go purple — starts about 30 minutes before. Arrive early in ${YEAR} peak season to get a view table.`,
  },
  {
    q: "Do I need to book rooftop bars in Marrakech?",
    a: "Kabana and Sky Bar: yes, book 24–48 hours ahead, especially Friday and Saturday evenings. Nomad and Beige Rooftop: generally walk-in before 6pm. After that, arrival time determines the table.",
  },
  {
    q: "How much do cocktails cost at Marrakech rooftop bars?",
    a: "Cocktails at rooftop bars run 80–180 MAD (€8–18). Nomad's mocktails and fresh juices are 40–70 MAD (€4–7). Budget for at least two drinks per person — most terraces expect a minimum order.",
  },
];

export default function MarrakechRooftopPage() {
  const filteredPlaces = places.filter(
    (p) => p.citySlug === "marrakech" && p.categories.includes("bars")
  );

  const topPick = filteredPlaces.find((p) => p.featured) || filteredPlaces[0];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best Rooftop Bars in Marrakech ${YEAR}`,
    description:
      "The best rooftop bars in Marrakech with Atlas Mountain views and stunning sunset cocktails.",
    url: CANONICAL,
    numberOfItems: filteredPlaces.length,
    itemListElement: filteredPlaces.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "BarOrPub",
        name: p.name,
        address: p.address,
        url: `${BASE}/marrakech/${p.slug}`,
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Marrakech",
        item: `${BASE}/marrakech`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Rooftop Bars",
        item: CANONICAL,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen bg-[#FFF8F0]">
        {/* Hero */}
        <div className="bg-[#1E293B] text-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 text-white/50 text-xs mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>&rsaquo;</span>
              <Link
                href="/marrakech"
                className="hover:text-white transition-colors"
              >
                Marrakech
              </Link>
              <span>&rsaquo;</span>
              <span className="text-white/80">Rooftop Bars</span>
            </nav>
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Best Rooftop Bars in Marrakech {YEAR} — Sunset Views
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Marrakech at sunset from a rooftop is one of the great travel
              moments — the Koutoubia minaret turning gold, the Atlas Mountains
              going purple, a hundred mosque calls layering across the medina.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Intro */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              The city has a dozen rooftop bars and most of them know exactly how
              good the view is. Eclipse and{" "}
              <Link href="/marrakech/kabana-rooftop" className="text-orange-500 hover:text-orange-600 font-medium">Kabana</Link>{" "}
              are the headline names, but the quieter terraces at{" "}
              <Link href="/marrakech/rooftop-nomad" className="text-orange-500 hover:text-orange-600 font-medium">Nomad</Link>{" "}
              and{" "}
              <Link href="/marrakech/le-jardin" className="text-orange-500 hover:text-orange-600 font-medium">Le Jardin</Link>{" "}
              offer the same sky with less crowd and half the bill.
            </p>
            <p className="text-slate-600 leading-relaxed">
              {filteredPlaces.length} rooftop bars and terraces in Marrakech, all
              tested, all worth the sunset. For the deeper ranking with detailed
              reviews and honest prices, read our{" "}
              <Link href="/blog/best-sunset-terraces-marrakech" className="text-orange-500 hover:text-orange-600 font-medium">
                sunset terraces guide
              </Link>.
            </p>
          </div>

          {/* Sunset Timing Guide */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mb-10">
            <h2
              className="text-xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              When to Go — Sunset Times in Marrakech
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { season: "Spring (Mar–May)", time: "6:45–7:45 pm" },
                { season: "Summer (Jun–Aug)", time: "7:45–8:30 pm" },
                { season: "Autumn (Sep–Nov)", time: "5:45–7:00 pm" },
                { season: "Winter (Dec–Feb)", time: "5:30–6:15 pm" },
              ].map((s) => (
                <div key={s.season} className="bg-white rounded-xl p-4 text-center">
                  <p className="text-xs text-slate-500 mb-1">{s.season}</p>
                  <p className="font-bold text-slate-900 text-lg">{s.time}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Arrive 30 minutes before sunset for the best light and table. The
              Koutoubia minaret lights up at dusk — the illuminated tower against
              the dark sky is the classic Marrakech evening image.
            </p>
          </div>

          {/* Venue Mini-Reviews */}
          <div className="mb-12">
            <h2
              className="text-2xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Best Rooftop Bars — Our Picks
            </h2>
            <div className="space-y-4">
              {[
                {
                  name: "Kabana Rooftop",
                  slug: "kabana-rooftop",
                  vibe: "Casual, accessible",
                  price: "80–120 MAD",
                  view: "Koutoubia close-up",
                  review: "The most accessible rooftop for a Koutoubia view — the minaret is close enough to photograph without a telephoto lens. Less fashionable than Sky Bar but half the price and no dress code. Food menu runs until late.",
                },
                {
                  name: "Sky Bar at Es Saadi",
                  slug: "sky-bar-es-saadi",
                  vibe: "Smart, DJ evenings",
                  price: "140–180 MAD",
                  view: "360° panorama",
                  review: "The highest rooftop bar in Marrakech, on top of the Es Saadi hotel in Hivernage. The 360° sweep takes in the Atlas Mountains south, Koutoubia east and Menara Gardens west. Dress code enforced after 9pm.",
                },
                {
                  name: "Kosybar",
                  slug: "kosybar",
                  vibe: "Jazz nights, character",
                  price: "90–130 MAD",
                  view: "El Badi Palace + stork nests",
                  review: "On Place des Ferblantiers, overlooking the El Badi Palace ruins with real storks nesting on the ancient walls. Thursday jazz evenings draw a local crowd. The most characterful rooftop in the city.",
                },
                {
                  name: "Nomad Rooftop",
                  slug: "rooftop-nomad",
                  vibe: "Relaxed, halal-friendly",
                  price: "40–70 MAD",
                  view: "Medina roofscape",
                  review: "The best halal-friendly rooftop in the medina — excellent mocktails, genuine views, and a kitchen that stays open for dinner. Less dramatic than Es Saadi but far more convenient and honest on price.",
                },
                {
                  name: "Le Salama Rooftop",
                  slug: "le-salama",
                  vibe: "Elegant, cocktail-forward",
                  price: "100–140 MAD",
                  view: "Jemaa el-Fna from above",
                  review: "Three floors above Rue des Banques with a clear sightline over Jemaa el-Fna. Watching the square come alive — food stalls assembling, smoke rising — while drinking a cocktail is one of the best Marrakech moments.",
                },
              ].map((venue) => (
                <div
                  key={venue.slug}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-lg mb-1">
                      <Link
                        href={`/marrakech/${venue.slug}`}
                        className="hover:text-orange-500 transition-colors"
                      >
                        {venue.name}
                      </Link>
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full">
                        {venue.view}
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                        {venue.vibe}
                      </span>
                      <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
                        {venue.price}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {venue.review}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Affiliate CTA */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-2xl p-8 mb-10">
            <h2
              className="text-xl font-bold text-slate-900 mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Combine Sunset with an Experience
            </h2>
            <p className="text-slate-600 mb-4">
              The Agafay desert sunset is even more dramatic than the medina
              rooftops — stone desert, Atlas Mountains, and a Berber dinner under
              the stars.
            </p>
            <a
              href="https://www.viator.com/tours/Marrakech/Day-trip-from-Marrakech-to-berber-villages-and-UNESCO-Kasbahs-from-Marrakech/d5408-71659P5?pid=P00306218&mcid=42383&medium=link&medium_version=selector&campaign=citytaste-quad"
              target="_blank"
              rel="sponsored nofollow noopener"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Agafay Sunset Quad + Camel + Dinner — from $35 &rarr;
            </a>
            <p className="text-xs text-slate-400 mt-3">
              We earn a small commission when you book through our links — at no
              extra cost to you.
            </p>
          </div>

          {/* Top Pick */}
          {topPick && (
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-6">
              <div className="relative w-full sm:w-48 h-48 sm:h-auto rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={topPick.photos[0]}
                  alt={topPick.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 192px"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-orange-500 uppercase tracking-wide">
                  Our Top Pick
                </span>
                <h3
                  className="text-xl font-bold text-slate-900 mt-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {topPick.name}
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  {topPick.neighborhood} &middot;{" "}
                  {topPick.priceLevel > 0
                    ? "€".repeat(topPick.priceLevel)
                    : "Free"}{" "}
                  &middot; &#9733; {topPick.rating.toFixed(1)}
                </p>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  {topPick.description}
                </p>
                <Link
                  href={`/marrakech/${topPick.slug}`}
                  className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-orange-500 hover:text-orange-600"
                >
                  View full profile &rarr;
                </Link>
              </div>
            </div>
          )}

          {/* Place Cards */}
          <h2
            className="text-2xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            All Rooftop Bars in Marrakech ({filteredPlaces.length} picks)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPlaces.map((p) => (
              <Link
                key={p.slug}
                href={`/marrakech/${p.slug}`}
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
                    <h3
                      className="font-bold text-slate-900 text-lg leading-snug"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {p.name}
                    </h3>
                    <span className="text-amber-500 text-sm font-semibold flex-shrink-0 ml-2">
                      &#9733; {p.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs mb-3">
                    {p.neighborhood} &middot;{" "}
                    {p.priceLevel > 0 ? "€".repeat(p.priceLevel) : "Free"}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {p.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Local Tips */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 mb-10">
            <h2
              className="text-xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Local Tips for Rooftop Bars in Marrakech
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Arrive 30 minutes before sunset for the best light and table.
                The golden hour is when the Koutoubia turns amber.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Kabana has the best Koutoubia view; Sky Bar at Es Saadi has the
                widest panorama over the Hivernage gardens and Atlas Mountains.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Cocktails run 80–180 MAD (€8–18). Non-alcoholic mocktails and
                Moroccan mint tea are always available at every rooftop.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Dress smart casual for hotel rooftops (Sky Bar, La Mamounia).
                Medina rooftops (Kabana, Nomad) are relaxed — no dress code.
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2
              className="text-xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              FAQ — Rooftop Bars in Marrakech
            </h2>
            <div className="space-y-6">
              {FAQ_ITEMS.map((item) => (
                <div key={item.q}>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {item.q}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cluster Spoke Links */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">
              Explore more Marrakech guides
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/cities/marrakech/things-to-do", label: "Things to Do" },
                { href: "/cities/marrakech/day-trips", label: "Day Trips" },
                { href: "/cities/marrakech/bars", label: "Bars" },
                { href: "/cities/marrakech/restaurants", label: "Restaurants" },
                { href: "/cities/marrakech/hammam", label: "Hammams" },
                { href: "/blog/best-sunset-terraces-marrakech", label: "Sunset Terraces" },
                { href: "/blog/48-hours-food-guide-marrakech", label: "48h Food Guide" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm bg-white border border-slate-200 rounded-full px-4 py-2 text-slate-700 hover:text-orange-500 hover:border-orange-200 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/marrakech"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              Explore all Marrakech places &rarr;
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
