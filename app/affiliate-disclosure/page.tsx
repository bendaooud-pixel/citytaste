import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — CityTaste",
  description: "How CityTaste earns revenue through affiliate partnerships while keeping recommendations honest.",
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#FFF8F0] min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-3">Legal</p>
          <h1
            className="text-4xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Affiliate Disclosure
          </h1>
          <p className="text-slate-400 text-sm mb-12">Last updated: June 2026</p>

          <div className="space-y-10 text-slate-600 leading-relaxed">

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">How CityTaste Earns Revenue</h2>
              <p className="text-sm mb-3">
                CityTaste is a free resource. To keep it running, some pages contain affiliate links to
                third-party booking platforms — primarily{" "}
                <a
                  href="https://www.getyourguide.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:underline font-medium"
                >
                  GetYourGuide
                </a>.
              </p>
              <p className="text-sm">
                When you click an affiliate link and make a purchase or booking, CityTaste may earn a
                small commission. This happens at <strong>no extra cost to you</strong> — the price you
                pay is exactly the same whether you use our link or go directly.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">Our Editorial Independence</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Affiliate partnerships <strong>never</strong> influence our recommendations. Every place we feature is one we genuinely believe in.</li>
                <li>We do not accept payment for positive reviews or rankings.</li>
                <li>We include affiliate links only where they add value — relevant tours, experiences, or activities related to the content you&apos;re reading.</li>
                <li>Not every page has affiliate links. We only include them when there&apos;s a natural fit.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">How to Identify Affiliate Links</h2>
              <p className="text-sm mb-3">
                Affiliate links on CityTaste are marked with <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">rel=&quot;sponsored&quot;</code> in
                the HTML. Pages containing affiliate content include a disclosure notice near the booking widgets.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">Partners</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>GetYourGuide</strong> — tours, activities, and experiences worldwide.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">Contact</h2>
              <p className="text-sm">
                Questions about our affiliate partnerships?{" "}
                <a
                  href="mailto:hello@citytaste.co"
                  className="text-orange-500 hover:underline font-medium"
                >
                  hello@citytaste.co
                </a>
              </p>
            </section>

          </div>

          <div className="mt-16 pt-8 border-t border-slate-200">
            <Link href="/" className="text-sm text-slate-400 hover:text-orange-500 transition-colors">
              ← Back to CityTaste
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
