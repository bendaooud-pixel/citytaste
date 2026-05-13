import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — CityTaste",
  description: "How CityTaste collects and uses your data.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm mb-12">Last updated: May 2025</p>

          <div className="space-y-10 text-slate-600 leading-relaxed">

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">1. Data We Collect</h2>
              <p className="mb-3">
                CityTaste collects only the minimum data needed to provide the service:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>Usage data</strong> — pages visited, search queries, filters used. Collected anonymously via analytics.</li>
                <li><strong>Favourites</strong> — places you save are stored locally in your browser (localStorage). We do not send this data to our servers.</li>
                <li><strong>Cookies</strong> — we use a session cookie only if you access the admin area. No advertising or tracking cookies.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">2. How We Use It</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>To improve content and fix broken features based on anonymous usage patterns.</li>
                <li>To remember your saved places across sessions (browser-only, never uploaded).</li>
                <li>We do not sell, share, or rent your data to third parties.</li>
                <li>We do not run retargeting ads or build advertising profiles.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">3. Third-Party Services</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>Unsplash</strong> — photos are served directly from Unsplash CDN. Their privacy policy applies.</li>
                <li><strong>OpenStreetMap / Leaflet</strong> — map tiles may log your IP address per OpenStreetMap&apos;s policy.</li>
                <li><strong>Vercel</strong> — our hosting provider. Server logs (IP, user-agent) are retained for up to 30 days per Vercel&apos;s policy.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">4. Your Rights</h2>
              <p className="text-sm">
                Since we do not collect personal accounts or identifiable data, there is nothing to delete or export.
                If you believe we hold data about you, contact us and we will investigate within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">5. Contact</h2>
              <p className="text-sm">
                Questions about this policy?{" "}
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
