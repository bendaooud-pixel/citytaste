import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/marrakech/meilleur-restaurant`;

export const metadata: Metadata = {
  title: "Meilleur Restaurant à Marrakech 2025 — Guide Local",
  description:
    "Découvrez les meilleurs restaurants de Marrakech, de la médina aux palaces luxueux. Guide honnête mis à jour 2025.",
  alternates: {
    canonical: CANONICAL,
    languages: { en: `${BASE}/cities/marrakech/restaurants` },
  },
  openGraph: {
    title: "Meilleur Restaurant à Marrakech 2025 — Guide Local",
    description:
      "Découvrez les meilleurs restaurants de Marrakech, de la médina aux palaces luxueux. Guide honnête mis à jour 2025.",
    type: "website",
    url: CANONICAL,
  },
};

export default function MeilleurRestaurantMarrakechPage() {
  const filteredPlaces = places.filter(
    (p) => p.citySlug === "marrakech" && p.categories.includes("restaurants")
  );

  const topPick = filteredPlaces.find((p) => p.featured) || filteredPlaces[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Meilleur Restaurant à Marrakech",
    description:
      "Découvrez les meilleurs restaurants de Marrakech, de la médina aux palaces luxueux.",
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
        name: "Quel est le meilleur restaurant de Marrakech ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dar Yacout pour l’expérience palatiale, Nomad pour la cuisine marocaine moderne avec vue, et Al Fassia pour la cuisine traditionnelle familiale à Guéliz.",
        },
      },
      {
        "@type": "Question",
        name: "Où manger à Marrakech sans se faire arnaquer ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Privilégiez Guéliz pour des prix honnêtes, ou dans la médina, choisissez les restaurants sans rabatteurs. Hadj Mustapha et Terrasse des Épices sont fiables.",
        },
      },
      {
        "@type": "Question",
        name: "Quel budget pour un restaurant à Marrakech ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Street food : 30–80 DH. Restaurant correct : 150–300 DH. Riad/palace : 400–800 DH. Gastronomique : 800–2000 DH.",
        },
      },
      {
        "@type": "Question",
        name: "Meilleur quartier pour manger à Marrakech ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La médina autour de Jemaa el-Fna pour l’ambiance, Guéliz pour les restaurants modernes, l’Hivernage pour le luxe.",
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
        name: "Meilleur Restaurant",
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
              <span className="text-white/80">Meilleur Restaurant</span>
            </nav>
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Meilleur Restaurant &agrave; Marrakech 2025 — Guide Local
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Manger &agrave; Marrakech, c&apos;est une aventure sensorielle
              &agrave; chaque coin de rue. De la harira &agrave; 20 dirhams sur
              Jemaa el-Fna au d&icirc;ner de palace &agrave; 2000 dirhams chez
              Dar Yacout, la ville offre une gamme culinaire que peu de
              destinations peuvent &eacute;galer.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Intro */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Manger &agrave; Marrakech, c&apos;est une aventure sensorielle
              &agrave; chaque coin de rue. De la harira &agrave; 20 dirhams sur
              Jemaa el-Fna au d&icirc;ner de palace &agrave; 2000 dirhams chez
              Dar Yacout, la ville offre une gamme culinaire que peu de
              destinations peuvent &eacute;galer. Le pi&egrave;ge ? Les
              restaurants avec rabatteurs &agrave; l&apos;entr&eacute;e. Ce
              guide vous emm&egrave;ne aux vraies bonnes adresses — celles
              o&ugrave; les Marrakchis eux-m&ecirc;mes vont d&icirc;ner.
            </p>
            <p className="text-slate-600 leading-relaxed">
              {filteredPlaces.length} restaurants test&eacute;s et
              approuv&eacute;s — des adresses o&ugrave; la qualit&eacute; parle
              d&apos;elle-m&ecirc;me.
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
                Le d&icirc;ner commence tard &agrave; Marrakech — r&eacute;servez
                pour 20h30 pour avoir la meilleure table.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Les restaurants de riad n&eacute;cessitent une r&eacute;servation
                24 &agrave; 72 heures &agrave; l&apos;avance et
                n&apos;apparaissent pas sur Google Maps.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                &Eacute;vitez les restaurants sur Jemaa el-Fna avec des photos
                plastifi&eacute;es et des rabatteurs. Prenez une ruelle
                adjacente.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Le couscous du vendredi est une tradition — beaucoup de
                restaurants proposent un menu sp&eacute;cial uniquement le
                vendredi.
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
                  q: "Quel est le meilleur restaurant de Marrakech ?",
                  a: "Dar Yacout pour l’expérience palatiale, Nomad pour la cuisine marocaine moderne avec vue, et Al Fassia pour la cuisine traditionnelle familiale à Guéliz.",
                },
                {
                  q: "Où manger à Marrakech sans se faire arnaquer ?",
                  a: "Privilégiez Guéliz pour des prix honnêtes, ou dans la médina, choisissez les restaurants sans rabatteurs. Hadj Mustapha et Terrasse des Épices sont fiables.",
                },
                {
                  q: "Quel budget pour un restaurant à Marrakech ?",
                  a: "Street food : 30–80 DH. Restaurant correct : 150–300 DH. Riad/palace : 400–800 DH. Gastronomique : 800–2000 DH.",
                },
                {
                  q: "Meilleur quartier pour manger à Marrakech ?",
                  a: "La médina autour de Jemaa el-Fna pour l’ambiance, Guéliz pour les restaurants modernes, l’Hivernage pour le luxe.",
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
                  href: "/cities/marrakech/meilleur-rooftop",
                  label: "Meilleur Rooftop",
                },
                {
                  href: "/cities/marrakech/meilleur-couscous",
                  label: "Meilleur Couscous",
                },
                {
                  href: "/cities/marrakech/meilleur-tajine",
                  label: "Meilleur Tajine",
                },
                {
                  href: "/cities/marrakech/meilleur-brunch",
                  label: "Meilleur Brunch",
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
