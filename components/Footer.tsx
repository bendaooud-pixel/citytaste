import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍽️</span>
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                City<span className="text-brand-orange">Taste</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Your curated guide to the world's best restaurants, cafés and food
              experiences. Honest, passionate, always hungry.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Cities</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cities/paris" className="hover:text-white transition-colors">
                  🇫🇷 Paris
                </Link>
              </li>
              <li>
                <Link href="/cities/barcelona" className="hover:text-white transition-colors">
                  🇪🇸 Barcelona
                </Link>
              </li>
              <li className="text-slate-600 cursor-default">🇮🇹 Rome — coming soon</li>
              <li className="text-slate-600 cursor-default">🇯🇵 Tokyo — coming soon</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/favorites" className="hover:text-white transition-colors">
                  My Favourites
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2025 CityTaste. Built with ♥ for food lovers everywhere.</p>
          <p>Powered by Next.js · Tailwind CSS · Supabase · Google Places</p>
        </div>
      </div>
    </footer>
  );
}
