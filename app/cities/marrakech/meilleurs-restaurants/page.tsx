import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/marrakech/meilleurs-restaurants`;

export const metadata: Metadata = {
  title: "Meilleurs Restaurants à Marrakech 2025 — Sélection CityTaste",
  description:
    "Notre sélection des meilleurs restaurants de Marrakech testés et approuvés. De la street food aux tables gastronomiques.",
  alternates: {
    canonical: CANONICAL,
    languages: { en: `${BASE}/cities/marrakech/restaurants` },
  },
  openGraph: {
    title: "Meilleurs Restaurants à Marrakech 2025 — Sélection CityTaste",
    description:
      "Notre sélection des meilleurs restaurants de Marrakech testés et approuvés. De la street food aux tables gastronomiques.",
    type: "website",
    url: CANONICAL,
  },
};

export default function MeilleursRestaurantsMarrakechPage() {
  const filteredPlaces = places.filter(
    (p) => p.citySlug === "marrakech" && p.categories.includes("restaurants")
  );

  const topPick = filteredPlaces.find((p) => p.featured) || filteredPlaces[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Meilleurs Restaurants à Marrakech",
    description:
      "Notre sélection des meilleurs restaurants de Marrakech testés et approuvés.",
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
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: p.rating,
          reviewCount: p.reviewCount,
        },
      },
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quels sont les meilleurs restaurants de Marrakech ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le Jardin pour son cadre enchanteur, Nomad pour la terrasse, Dar Yacout pour le festin traditionnel, et Al Fassia pour la cuisine familiale marocaine.",
        },
      },
      {
        "@type": "Question",
        name: "Combien coûte un bon restaurant à Marrakech ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Entre 200 et 500 DH par personne pour un très bon restaurant. Les palaces dépassent 800 DH.",
        },
      },
      {
        "@type": "Question",
        name: "Faut-il réserver les restaurants à Marrakech ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, surtout pour les riads-restaurants et les tables gastronomiques. Les restaurants de Guéliz sont plus flexibles.",
        },
      },
      {
        "@type": "Question",
        name: "Quel type de cuisine trouve-t-on à Marrakech ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tajines, couscous, pastilla, méchoui, grillades, pâtisseries marocaines, et de plus en plus de cuisine fusion et internationale.",
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Marrakech",
        item: `${BASE}/marrakech`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Meilleurs Restaurants",
        item: CANONICAL,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen bg-[#FFF8F0]">
        {/* Hero */}
        <div className="bg-[#1E293B] text-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 text-white/50 text-xs mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Accueil
              </Link>
              <span>&rsaquo;</span>
              <Link
                href="/marrakech"
                className="hover:text-white transition-colors"
              >
                Marrakech
              </Link>
              <span>&rsaquo;</span>
              <span className="text-white/80">Meilleurs Restaurants</span>
            </nav>
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Meilleurs Restaurants &agrave; Marrakech 2025 — S&eacute;lection
              CityTaste
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Des meilleurs restaurants de Marrakech, voici notre
              s&eacute;lection compl&egrave;te et test&eacute;e. De la cuisine
              de rue authentique aux grandes tables gastronomiques, chaque
              adresse a &eacute;t&eacute; visit&eacute;e et approuv&eacute;e.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Intro */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Des meilleurs restaurants de Marrakech, voici notre
              s&eacute;lection compl&egrave;te et test&eacute;e. De la cuisine
              de rue authentique aux grandes tables gastronomiques, chaque
              adresse a &eacute;t&eacute; visit&eacute;e et approuv&eacute;e.
              Pas de compromis sur la qualit&eacute;, pas de restaurants
              sponsoris&eacute;s — juste les bonnes adresses que les locaux
              recommandent vraiment.
            </p>
            <p className="text-slate-600 leading-relaxed">
              {filteredPlaces.length} restaurants s&eacute;lectionn&eacute;s —
              tous test&eacute;s, tous approuv&eacute;s.
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
                  Notre Coup de C&oelig;ur
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
                    : "Gratuit"}{" "}
                  &middot; &#9733; {topPick.rating.toFixed(1)}
                </p>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  {topPick.description}
                </p>
                <Link
                  href={`/marrakech/${topPick.slug}`}
                  className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-orange-500 hover:text-orange-600"
                >
                  Voir le profil complet &rarr;
                </Link>
              </div>
            </div>
          )}

          {/* Place Cards */}
          <h2
            className="text-2xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Les meilleurs restaurants de Marrakech ({filteredPlaces.length}{" "}
            adresses)
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
                    {p.priceLevel > 0
                      ? "€".repeat(p.priceLevel)
                      : "Gratuit"}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {p.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Conseils locaux */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 mb-10">
            <h2
              className="text-xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Conseils locaux
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Les meilleurs restaurants sont souvent cach&eacute;s dans des
                riads sans enseigne visible — utilisez Google Maps en mode hors
                ligne.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Le vendredi, le couscous royal est servi dans la plupart des
                bons restaurants — ne ratez pas cette tradition.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Pour les restaurants gastronomiques, r&eacute;servez au minimum
                48h &agrave; l&apos;avance, surtout en haute saison
                (octobre–avril).
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Gu&eacute;liz offre un excellent rapport qualit&eacute;-prix
                compar&eacute; aux restaurants touristiques de la m&eacute;dina.
              </li>
            </ul>
          </div>

          {/* Questions fréquentes */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2
              className="text-xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Questions fr&eacute;quentes
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "Quels sont les meilleurs restaurants de Marrakech ?",
                  a: "Le Jardin pour son cadre enchanteur, Nomad pour la terrasse, Dar Yacout pour le festin traditionnel, et Al Fassia pour la cuisine familiale marocaine.",
                },
                {
                  q: "Combien coûte un bon restaurant à Marrakech ?",
                  a: "Entre 200 et 500 DH par personne pour un très bon restaurant. Les palaces dépassent 800 DH.",
                },
                {
                  q: "Faut-il réserver les restaurants à Marrakech ?",
                  a: "Oui, surtout pour les riads-restaurants et les tables gastronomiques. Les restaurants de Guéliz sont plus flexibles.",
                },
                {
                  q: "Quel type de cuisine trouve-t-on à Marrakech ?",
                  a: "Tajines, couscous, pastilla, méchoui, grillades, pâtisseries marocaines, et de plus en plus de cuisine fusion et internationale.",
                },
              ].map((item) => (
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

          {/* Internal links */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">
              D&eacute;couvrir d&apos;autres guides Marrakech
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                {
                  href: "/cities/marrakech/meilleur-restaurant",
                  label: "Meilleur Restaurant",
                },
                {
                  href: "/cities/marrakech/meilleur-tajine",
                  label: "Meilleur Tajine",
                },
                {
                  href: "/cities/marrakech/meilleur-couscous",
                  label: "Meilleur Couscous",
                },
                {
                  href: "/cities/marrakech/meilleure-patisserie",
                  label: "Meilleure Pâtisserie",
                },
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
              Explorer tout Marrakech &rarr;
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
