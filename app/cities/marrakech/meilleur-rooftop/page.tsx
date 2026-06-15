import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/marrakech/meilleur-rooftop`;
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Meilleur Rooftop à Marrakech ${YEAR} — Bars & Terrasses`,
  description:
    "Les meilleurs rooftops de Marrakech avec vue sur l'Atlas et la Koutoubia. Cocktails, couchers de soleil et ambiance — guide local.",
  alternates: {
    canonical: CANONICAL,
    languages: { en: `${BASE}/cities/marrakech/rooftop` },
  },
  openGraph: {
    title: `Meilleur Rooftop à Marrakech ${YEAR} — Bars & Terrasses`,
    description: "Les meilleurs rooftops de Marrakech avec vue sur l'Atlas et la Koutoubia.",
    type: "website",
    url: CANONICAL,
  },
};

export default function MeilleurRooftopMarrakechPage() {
  const filteredPlaces = places.filter(
    (p) =>
      p.citySlug === "marrakech" &&
      (p.categories.includes("rooftop") || (p.categories.includes("bars") && p.hasTerrace))
  );

  const topPick = filteredPlaces.find((p) => p.featured) || filteredPlaces[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Meilleur Rooftop à Marrakech",
    description: "Les meilleurs rooftops de Marrakech avec vue sur l'Atlas et la Koutoubia.",
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
        aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviewCount },
      },
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Quel est le meilleur rooftop de Marrakech ?", acceptedAnswer: { "@type": "Answer", text: "Sky Bar à l'Es Saadi pour le luxe, Kabana pour l'ambiance festive, et le rooftop du Nomad pour la vue sur la médina." } },
      { "@type": "Question", name: "Peut-on boire de l'alcool sur les rooftops à Marrakech ?", acceptedAnswer: { "@type": "Answer", text: "Oui, les bars des hôtels et les rooftops licenciés servent de l'alcool. Les cafés de la médina servent généralement uniquement du thé et des jus." } },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE },
      { "@type": "ListItem", position: 2, name: "Marrakech", item: `${BASE}/marrakech` },
      { "@type": "ListItem", position: 3, name: "Meilleur Rooftop", item: CANONICAL },
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
              <span className="text-white/80">Meilleur Rooftop</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Meilleur Rooftop &agrave; Marrakech {YEAR} — Bars &amp; Terrasses
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Marrakech se vit d&apos;en haut. Cocktail &agrave; la main, vue sur la Koutoubia et les montagnes de l&apos;Atlas au coucher du soleil — voici les rooftops qui valent vraiment le d&eacute;tour.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Les rooftops de Marrakech offrent une perspective unique sur la ville — des terrasses intimes de la m&eacute;dina aux bars panoramiques des grands h&ocirc;tels. Le coucher de soleil sur l&apos;Atlas depuis un rooftop est l&apos;un des moments les plus magiques de Marrakech.
            </p>
            <p className="text-slate-600 leading-relaxed">
              {filteredPlaces.length} rooftops test&eacute;s — des terrasses de riad aux bars de palace.
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
            Les meilleurs rooftops de Marrakech ({filteredPlaces.length} adresses)
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
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Arrivez 30 minutes avant le coucher du soleil pour avoir la meilleure table — les rooftops se remplissent vite.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Les rooftops de la m&eacute;dina (Nomad, Caf&eacute; des &Eacute;pices) ferment plus t&ocirc;t que ceux des h&ocirc;tels.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Pr&eacute;voyez une veste l&eacute;g&egrave;re — les soir&eacute;es en altitude peuvent &ecirc;tre fra&icirc;ches, m&ecirc;me en &eacute;t&eacute;.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>R&eacute;servez pour les rooftops d&apos;h&ocirc;tels (Sky Bar, Kabana) — l&apos;acc&egrave;s n&apos;est pas garanti sans r&eacute;servation.</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>Questions fr&eacute;quentes</h2>
            <div className="space-y-6">
              {[
                { q: "Quel est le meilleur rooftop de Marrakech ?", a: "Sky Bar à l'Es Saadi pour le luxe, Kabana pour l'ambiance festive, et le rooftop du Nomad pour la vue sur la médina." },
                { q: "Peut-on boire de l'alcool sur les rooftops à Marrakech ?", a: "Oui, les bars des hôtels et les rooftops licenciés servent de l'alcool. Les cafés de la médina servent généralement uniquement du thé et des jus." },
                { q: "Quel budget pour un rooftop à Marrakech ?", a: "Thé à la menthe : 30–50 DH. Cocktail : 100–180 DH. Dîner rooftop : 300–800 DH par personne." },
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
                { href: "/cities/marrakech/meilleur-riad", label: "Meilleur Riad" },
                { href: "/cities/marrakech/meilleur-brunch", label: "Meilleur Brunch" },
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
