import Link from "next/link";
import Image from "next/image";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Guide } from "@/lib/morocco/types";
import { getAllGuides } from "@/lib/morocco/content";

interface Props {
  guide: Guide;
  alternates: Record<string, string | null>;
}

export default function GuideTemplate({ guide, alternates }: Props) {
  const { frontmatter: fm, content } = guide;
  const localePrefix = fm.locale === "en" ? "/morocco" : `/morocco/${fm.locale}`;

  const breadcrumbItems = [
    { name: fm.locale === "fr" ? "Accueil" : "Home", href: "/" },
    { name: fm.locale === "fr" ? "Maroc" : "Morocco", href: localePrefix },
  ];
  breadcrumbItems.push({ name: fm.h1.split("—")[0].trim(), href: "" });

  const existingGuides = getAllGuides(fm.locale);
  const existingSlugs = new Set(existingGuides.map((g) => g.frontmatter.slug));
  const validRelatedGuides = fm.relatedGuides.filter((slug) => existingSlugs.has(slug));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FFF8F0]">
        {/* Hero */}
        <div className="relative h-80 md:h-[420px] overflow-hidden">
          <Image
            src={fm.heroImage}
            alt={fm.primaryKeyword}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 max-w-5xl mx-auto w-full">
            <nav className="flex items-center gap-2 text-white/50 text-xs mb-4">
              {breadcrumbItems.map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span>&rsaquo;</span>}
                  {item.href ? (
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  ) : (
                    <span className="text-white/80">{item.name}</span>
                  )}
                </span>
              ))}
            </nav>
            <h1
              className="text-white text-3xl md:text-5xl font-bold leading-tight max-w-3xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {fm.h1}
            </h1>
            <div className="flex items-center gap-4 mt-4 text-white/60 text-sm">
              <span>{new Date(fm.publishedAt).toLocaleDateString(fm.locale === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span>&middot;</span>
              <span className="capitalize">{fm.category}</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* Article body */}
          <article>
            <MarkdownRenderer body={content} className="mb-12" />
          </article>

          {/* FAQ */}
          {fm.faq && fm.faq.length > 0 && (
            <section className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                {fm.locale === "fr" ? "Questions fréquentes" : "Frequently Asked Questions"}
              </h2>
              <div className="space-y-6">
                {fm.faq.map((item) => (
                  <div key={item.q}>
                    <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Guides — only show links to guides that actually exist */}
          {validRelatedGuides.length > 0 && (
            <section className="bg-slate-50 rounded-2xl p-6 mb-10 border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-4">
                {fm.locale === "fr" ? "Guides associés" : "Related Guides"}
              </h3>
              <div className="flex flex-wrap gap-3">
                {validRelatedGuides.map((guideSlug) => (
                  <Link
                    key={guideSlug}
                    href={`${localePrefix}/${guideSlug}`}
                    className="text-sm bg-white border border-slate-200 rounded-full px-4 py-2 text-slate-700 hover:text-orange-500 hover:border-orange-200 transition-colors"
                  >
                    {guideSlug.split("/").pop()?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Explore Marrakech CTA */}
          {fm.citySlug === "marrakech" && (
            <section className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-8 mb-10">
              <h2 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                {fm.locale === "fr" ? "Explorer Marrakech" : "Explore Marrakech"}
              </h2>
              <p className="text-slate-600 text-sm mb-4">
                {fm.locale === "fr"
                  ? "Découvrez tous nos restaurants, hammams et bonnes adresses à Marrakech."
                  : "Discover all our curated restaurants, hammams and hidden gems in Marrakech."}
              </p>
              <Link
                href="/marrakech"
                className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
              >
                {fm.locale === "fr" ? "Voir Marrakech" : "Explore Marrakech"} &rarr;
              </Link>
            </section>
          )}

          {/* Back to Morocco hub */}
          <div className="text-center">
            <Link
              href={localePrefix}
              className="inline-flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-600"
            >
              &larr; {fm.locale === "fr" ? "Retour au guide Maroc" : "Back to Morocco guide"}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
