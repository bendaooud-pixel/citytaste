import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/marrakech/meilleure-patisserie`;

export const metadata: Metadata = {
  title: "Meilleure Pâtisserie à Marrakech 2025 — Guide Gourmand",
  description:
    "Les meilleures pâtisseries de Marrakech : cornes de gazelle, chebakia, pastilla sucrée et pâtisseries françaises. Guide local.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Meilleure Pâtisserie à Marrakech 2025 — Guide Gourmand",
    description: "Les meilleures pâtisseries de Marrakech : cornes de gazelle, chebakia et pâtisseries françaises.",
    type: "website",
    url: CANONICAL,
  },
};

export default function MeilleurePatisserieMarrakechPage() {
  const filteredPlaces = places.filter(
    (p) => p.citySlug === "marrakech" && p.categories.includes("patisseries")
  );

  const topPick = filteredPlaces.find((p) => p.featured) || filteredPlaces[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Meilleure Pâtisserie à Marrakech",
    description: "Les meilleures pâtisseries de Marrakech.",
    url: CANONICAL,
    numberOfItems: filteredPlaces.length,
    itemListElement: filteredPlaces.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Bakery",
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
      { "@type": "Question", name: "Quelle est la meilleure pâtisserie de Marrakech ?", acceptedAnswer: { "@type": "Answer", text: "Pâtisserie des Princes pour les classiques marocains, et Bacha Coffee pour les pâtisseries françaises dans un cadre raffiné." } },
      { "@type": "Question", name: "Quelles pâtisseries marocaines goûter ?", acceptedAnswer: { "@type": "Answer", text: "Les cornes de gazelle (kaab el ghzal), la chebakia au miel et sésame, les briouates aux amandes, et la pastilla sucrée au lait." } },
      { "@type": "Question", name: "Combien coûtent les pâtisseries à Marrakech ?", acceptedAnswer: { "@type": "Answer", text: "Pâtisseries marocaines : 5–15 DH pièce. Assortiment : 50–100 DH le kilo. Pâtisserie française : 30–60 DH pièce." } },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE },
      { "@type": "ListItem", position: 2, name: "Marrakech", item: `${BASE}/marrakech` },
      { "@type": "ListItem", position: 3, name: "Meilleure Pâtisserie", item: CANONICAL },
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
              <span className="text-white/80">Meilleure P&acirc;tisserie</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Meilleure P&acirc;tisserie &agrave; Marrakech 2025 — Guide Gourmand
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              La p&acirc;tisserie marocaine est un art ancestral — cornes de gazelle, chebakia au miel, briouates aux amandes. &Agrave; Marrakech, ces d&eacute;lices c&ocirc;toient les meilleures p&acirc;tisseries fran&ccedil;aises.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              La p&acirc;tisserie est une institution &agrave; Marrakech. Chaque f&ecirc;te, chaque occasion a ses douceurs — les cornes de gazelle parfum&eacute;es &agrave; la fleur d&apos;oranger, les chebakias dor&eacute;es au miel, les briouates croustillantes. Et l&apos;h&eacute;ritage fran&ccedil;ais a ajout&eacute; croissants et mille-feuilles au r&eacute;pertoire local.
            </p>
            <p className="text-slate-600 leading-relaxed">
              {filteredPlaces.length} p&acirc;tisseries test&eacute;es — des boutiques traditionnelles aux adresses contemporaines.
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
            Les meilleures p&acirc;tisseries de Marrakech ({filteredPlaces.length} adresses)
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
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Achetez les p&acirc;tisseries marocaines au poids (50–100 DH/kg) plut&ocirc;t qu&apos;&agrave; la pi&egrave;ce — c&apos;est moins cher.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Les meilleures cornes de gazelle sont fra&icirc;ches et moelleuses, pas s&egrave;ches — go&ucirc;tez avant d&apos;acheter.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>La chebakia est la p&acirc;tisserie du Ramadan — vous en trouverez partout pendant le mois sacr&eacute;.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Accompagnez vos p&acirc;tisseries d&apos;un th&eacute; &agrave; la menthe — le combo parfait.</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>Questions fr&eacute;quentes</h2>
            <div className="space-y-6">
              {[
                { q: "Quelle est la meilleure pâtisserie de Marrakech ?", a: "Pâtisserie des Princes pour les classiques marocains, et Bacha Coffee pour les pâtisseries françaises dans un cadre raffiné." },
                { q: "Quelles pâtisseries marocaines goûter ?", a: "Les cornes de gazelle (kaab el ghzal), la chebakia au miel et sésame, les briouates aux amandes, et la pastilla sucrée au lait." },
                { q: "Combien coûtent les pâtisseries à Marrakech ?", a: "Pâtisseries marocaines : 5–15 DH pièce. Assortiment : 50–100 DH le kilo. Pâtisserie française : 30–60 DH pièce." },
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
                { href: "/cities/marrakech/meilleur-couscous", label: "Meilleur Couscous" },
                { href: "/cities/marrakech/meilleur-tajine", label: "Meilleur Tajine" },
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
