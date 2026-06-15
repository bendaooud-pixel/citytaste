import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/marrakech/meilleur-riad`;
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Meilleur Riad à Marrakech ${YEAR} — Hébergements de Charme`,
  description:
    "Les meilleurs riads de Marrakech : de la maison d'hôtes intimiste au palace. Sélection honnête avec prix et quartiers.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: `Meilleur Riad à Marrakech ${YEAR} — Hébergements de Charme`,
    description: "Les meilleurs riads de Marrakech : de la maison d'hôtes intimiste au palace.",
    type: "website",
    url: CANONICAL,
  },
};

export default function MeilleurRiadMarrakechPage() {
  const filteredPlaces = places.filter(
    (p) =>
      p.citySlug === "marrakech" &&
      (p.categories.includes("romantic") || p.slug.includes("riad") || p.slug.includes("mamounia") || p.slug.includes("mansour"))
  );

  const topPick = filteredPlaces.find((p) => p.featured) || filteredPlaces[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Meilleur Riad à Marrakech",
    description: "Les meilleurs riads de Marrakech : de la maison d'hôtes intimiste au palace.",
    url: CANONICAL,
    numberOfItems: filteredPlaces.length,
    itemListElement: filteredPlaces.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "LodgingBusiness",
        name: p.name,
        address: p.address,
        url: `${BASE}/marrakech/${p.slug}`,
        aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviewCount },
      },
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Quel est le meilleur riad de Marrakech ?", acceptedAnswer: { "@type": "Answer", text: "La Mamounia pour le palace légendaire, Riad Farnatchi pour l'intimité luxueuse, Royal Mansour pour le service le plus exclusif au monde, et Riad Kniza pour le charme authentique." } },
      { "@type": "Question", name: "Combien coûte un riad à Marrakech ?", acceptedAnswer: { "@type": "Answer", text: "Riad simple : 500–1000 DH/nuit. Riad de charme : 1000–3000 DH. Palace/luxe : 3000–15000 DH." } },
      { "@type": "Question", name: "Quel quartier pour un riad à Marrakech ?", acceptedAnswer: { "@type": "Answer", text: "La médina pour l'authenticité, le Mellah pour le calme, Guéliz pour le moderne, l'Hivernage pour le luxe." } },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE },
      { "@type": "ListItem", position: 2, name: "Marrakech", item: `${BASE}/marrakech` },
      { "@type": "ListItem", position: 3, name: "Meilleur Riad", item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-[#FFF8F0]">
        <div className="bg-[#1E293B] text-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 text-white/50 text-xs mb-6">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <span>&rsaquo;</span>
              <Link href="/marrakech" className="hover:text-white transition-colors">Marrakech</Link>
              <span>&rsaquo;</span>
              <span className="text-white/80">Meilleur Riad</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Meilleur Riad &agrave; Marrakech {YEAR} — H&eacute;bergements de Charme
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Dormir dans un riad, c&apos;est vivre Marrakech de l&apos;int&eacute;rieur — cours int&eacute;rieures plant&eacute;es d&apos;orangers, fontaines en zellige, terrasses avec vue sur l&apos;Atlas. Voici les meilleurs.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Le riad est bien plus qu&apos;un h&ocirc;tel — c&apos;est une maison traditionnelle marocaine organis&eacute;e autour d&apos;un patio central. &Agrave; Marrakech, ces demeures r&eacute;nov&eacute;es offrent une exp&eacute;rience d&apos;h&eacute;bergement unique, entre intimit&eacute; et luxe discret.
            </p>
            <p className="text-slate-600 leading-relaxed">
              {filteredPlaces.length} adresses s&eacute;lectionn&eacute;es — des riads de charme aux palaces l&eacute;gendaires.
            </p>
          </div>

          {topPick && (
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-6">
              <div className="relative w-full sm:w-48 h-48 sm:h-auto rounded-xl overflow-hidden flex-shrink-0">
                <Image src={topPick.photos[0]} alt={topPick.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 192px" />
              </div>
              <div>
                <span className="text-xs font-bold text-orange-500 uppercase tracking-wide">Notre Coup de C&oelig;ur</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1" style={{ fontFamily: "var(--font-playfair)" }}>{topPick.name}</h3>
                <p className="text-slate-500 text-xs mt-1">{topPick.neighborhood} &middot; {topPick.priceLevel > 0 ? "€".repeat(topPick.priceLevel) : "Gratuit"} &middot; &#9733; {topPick.rating.toFixed(1)}</p>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">{topPick.description}</p>
                <Link href={`/marrakech/${topPick.slug}`} className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-orange-500 hover:text-orange-600">Voir le profil complet &rarr;</Link>
              </div>
            </div>
          )}

          <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Les meilleurs riads de Marrakech ({filteredPlaces.length} adresses)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPlaces.map((p) => (
              <Link key={p.slug} href={`/marrakech/${p.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-slate-100">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={p.photos[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 text-lg leading-snug" style={{ fontFamily: "var(--font-playfair)" }}>{p.name}</h3>
                    <span className="text-amber-500 text-sm font-semibold flex-shrink-0 ml-2">&#9733; {p.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-slate-500 text-xs mb-3">{p.neighborhood} &middot; {p.priceLevel > 0 ? "€".repeat(p.priceLevel) : "Gratuit"}</p>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Conseils locaux</h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Les riads de la m&eacute;dina sont souvent difficiles &agrave; trouver — demandez au riad d&apos;envoyer quelqu&apos;un vous chercher.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>R&eacute;servez 2 &agrave; 3 mois &agrave; l&apos;avance pour la haute saison (octobre–avril et No&euml;l/Nouvel An).</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Le petit-d&eacute;jeuner est presque toujours inclus — et c&apos;est souvent le meilleur repas de la journ&eacute;e.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Demandez une chambre avec vue sur le patio plut&ocirc;t que sur la rue — c&apos;est plus calme et plus beau.</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>Questions fr&eacute;quentes</h2>
            <div className="space-y-6">
              {[
                { q: "Quel est le meilleur riad de Marrakech ?", a: "La Mamounia pour le palace légendaire, Riad Farnatchi pour l'intimité luxueuse, Royal Mansour pour le service le plus exclusif au monde, et Riad Kniza pour le charme authentique." },
                { q: "Combien coûte un riad à Marrakech ?", a: "Riad simple : 500–1000 DH/nuit. Riad de charme : 1000–3000 DH. Palace/luxe : 3000–15000 DH." },
                { q: "Quel quartier pour un riad à Marrakech ?", a: "La médina pour l'authenticité, le Mellah pour le calme, Guéliz pour le moderne, l'Hivernage pour le luxe." },
              ].map((item) => (
                <div key={item.q}>
                  <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">D&eacute;couvrir d&apos;autres guides Marrakech</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/cities/marrakech/meilleur-restaurant", label: "Meilleur Restaurant" },
                { href: "/cities/marrakech/meilleur-hammam", label: "Meilleur Hammam" },
                { href: "/cities/marrakech/meilleur-rooftop", label: "Meilleur Rooftop" },
                { href: "/marrakech", label: "Tout Marrakech" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-sm bg-white border border-slate-200 rounded-full px-4 py-2 text-slate-700 hover:text-orange-500 hover:border-orange-200 transition-colors">{link.label}</Link>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/marrakech" className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg">Explorer tout Marrakech &rarr;</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
