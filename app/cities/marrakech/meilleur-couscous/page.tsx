import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/marrakech/meilleur-couscous`;

export const metadata: Metadata = {
  title: "Meilleur Couscous à Marrakech 2025 — Guide Local",
  description:
    "Où manger le meilleur couscous à Marrakech ? Des adresses authentiques du vendredi aux restaurants gastronomiques. Guide honnête.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Meilleur Couscous à Marrakech 2025 — Guide Local",
    description: "Où manger le meilleur couscous à Marrakech ? Des adresses authentiques du vendredi aux restaurants gastronomiques.",
    type: "website",
    url: CANONICAL,
  },
};

export default function MeilleurCouscousMarrakechPage() {
  const filteredPlaces = places.filter(
    (p) => p.citySlug === "marrakech" && p.categories.includes("restaurants")
  );

  const topPick = filteredPlaces.find((p) => p.featured) || filteredPlaces[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Meilleur Couscous à Marrakech",
    description: "Où manger le meilleur couscous à Marrakech.",
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
        aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviewCount },
      },
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Où manger le meilleur couscous à Marrakech ?", acceptedAnswer: { "@type": "Answer", text: "Al Fassia pour le couscous royal familial, Dar Yacout pour l'expérience palatiale, et Hadj Mustapha pour le couscous authentique à prix local." } },
      { "@type": "Question", name: "Quel jour manger le couscous à Marrakech ?", acceptedAnswer: { "@type": "Answer", text: "Le vendredi est le jour traditionnel du couscous au Maroc. La plupart des restaurants proposent un menu spécial couscous le vendredi midi." } },
      { "@type": "Question", name: "Combien coûte un couscous à Marrakech ?", acceptedAnswer: { "@type": "Answer", text: "Couscous de rue : 30–50 DH. Restaurant local : 60–120 DH. Restaurant gastronomique : 150–400 DH." } },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE },
      { "@type": "ListItem", position: 2, name: "Marrakech", item: `${BASE}/marrakech` },
      { "@type": "ListItem", position: 3, name: "Meilleur Couscous", item: CANONICAL },
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
              <span className="text-white/80">Meilleur Couscous</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Meilleur Couscous &agrave; Marrakech 2025 — Guide Local
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Le couscous du vendredi est une institution au Maroc. &Agrave; Marrakech, ce plat sacr&eacute; se d&eacute;cline du couscous familial g&eacute;n&eacute;reux au couscous royal dress&eacute; dans un riad palatial.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Le couscous est bien plus qu&apos;un plat au Maroc — c&apos;est un rituel familial du vendredi. La semoule roul&eacute;e &agrave; la main, le bouillon parfum&eacute; aux l&eacute;gumes de saison, l&apos;agneau fondant ou le poulet aux oignons confits. &Agrave; Marrakech, chaque restaurant a sa recette et son secret.
            </p>
            <p className="text-slate-600 leading-relaxed">
              {filteredPlaces.length} restaurants o&ugrave; manger un excellent couscous — des adresses locales aux tables gastronomiques.
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
            Les meilleurs restaurants pour le couscous ({filteredPlaces.length} adresses)
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
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Le vendredi est LE jour du couscous — beaucoup de restaurants ne le servent que ce jour-l&agrave;.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Le couscous se mange &agrave; la main traditionnellement, mais les couverts sont toujours disponibles.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Commandez le couscous royal pour go&ucirc;ter plusieurs viandes (agneau, poulet, merguez) en une fois.</li>
              <li className="flex gap-3"><span className="text-amber-500 flex-shrink-0">&rarr;</span>Le lben (lait ferment&eacute;) est la boisson traditionnelle avec le couscous — essayez-le.</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>Questions fr&eacute;quentes</h2>
            <div className="space-y-6">
              {[
                { q: "Où manger le meilleur couscous à Marrakech ?", a: "Al Fassia pour le couscous royal familial, Dar Yacout pour l'expérience palatiale, et Hadj Mustapha pour le couscous authentique à prix local." },
                { q: "Quel jour manger le couscous à Marrakech ?", a: "Le vendredi est le jour traditionnel du couscous au Maroc. La plupart des restaurants proposent un menu spécial couscous le vendredi midi." },
                { q: "Combien coûte un couscous à Marrakech ?", a: "Couscous de rue : 30–50 DH. Restaurant local : 60–120 DH. Restaurant gastronomique : 150–400 DH." },
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
                { href: "/cities/marrakech/meilleur-tajine", label: "Meilleur Tajine" },
                { href: "/cities/marrakech/meilleur-restaurant", label: "Meilleur Restaurant" },
                { href: "/cities/marrakech/meilleure-patisserie", label: "Meilleure Pâtisserie" },
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
