import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CityFilter from "./CityFilter";
import type { Country, City, Activity } from "@/lib/activities/types";
import { localized } from "@/lib/activities/types";

const PAGE_I18N: Record<string, { heading: string; subtitle: string; breadcrumbHome: string; breadcrumbActivities: string }> = {
  en: {
    heading: "Activities & Tours in {country}",
    subtitle: "Curated tours, day trips and experiences across {country}'s most beautiful cities.",
    breadcrumbHome: "Home",
    breadcrumbActivities: "Activities",
  },
  fr: {
    heading: "Activités & Excursions — {country}",
    subtitle: "Visites, excursions et expériences dans les plus belles villes du {country}.",
    breadcrumbHome: "Accueil",
    breadcrumbActivities: "Activités",
  },
  es: {
    heading: "Actividades y Tours en {country}",
    subtitle: "Tours, excursiones y experiencias en las ciudades más bonitas de {country}.",
    breadcrumbHome: "Inicio",
    breadcrumbActivities: "Actividades",
  },
  it: {
    heading: "Attività e Tour in {country}",
    subtitle: "Tour, escursioni ed esperienze nelle città più belle del {country}.",
    breadcrumbHome: "Home",
    breadcrumbActivities: "Attività",
  },
};

interface Props {
  country: Country;
  cities: City[];
  activities: Activity[];
  locale: string;
}

export default function CountryActivitiesPage({ country, cities, activities, locale }: Props) {
  const countryName = localized(country.name, country.nameI18n, locale);
  const i18n = PAGE_I18N[locale] ?? PAGE_I18N.en;
  const heading = i18n.heading.replace("{country}", countryName);
  const subtitle = i18n.subtitle.replace("{country}", countryName);

  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const BASE_URL = "https://www.citytaste.co";

  const heroCity = cities.find((c) => c.heroImage);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: i18n.breadcrumbHome, item: BASE_URL },
      { "@type": "ListItem", position: 2, name: countryName, item: `${BASE_URL}/${country.slug}${localePrefix ? `${localePrefix}` : ""}` },
      { "@type": "ListItem", position: 3, name: i18n.breadcrumbActivities, item: `${BASE_URL}/${country.slug}${localePrefix}/activities` },
    ],
  };

  const itemListLd = activities.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: heading,
    numberOfItems: activities.length,
    itemListElement: activities.map((a, i) => {
      const city = cities.find((c) => c.id === a.cityId);
      const articlePath = a.slug && city
        ? `${BASE_URL}/${country.slug}${localePrefix}/${city.slug}/experiences/${a.slug}`
        : a.affiliateUrl;
      return {
        "@type": "ListItem",
        position: i + 1,
        name: localized(a.title, a.titleI18n, locale),
        url: articlePath,
      };
    }),
  } : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FFF8F0]">
        {/* Hero */}
        <div className="relative h-72 md:h-[400px] overflow-hidden">
          <Image
            src={heroCity?.heroImage ?? "/images/morocco/morocco-hero.jpg"}
            alt={heading}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 max-w-5xl mx-auto w-full">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/60 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">{i18n.breadcrumbHome}</Link>
              <span>/</span>
              <Link href={`/${country.slug}${localePrefix}`} className="hover:text-white transition-colors">{countryName}</Link>
              <span>/</span>
              <span className="text-white/90">{i18n.breadcrumbActivities}</span>
            </nav>
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              {heading}
            </h1>
            <p className="text-white/70 mt-3 max-w-2xl text-lg">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 py-10">
          <CityFilter cities={cities} activities={activities} locale={locale} countrySlug={country.slug} />
        </div>
      </main>
      <Footer />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {itemListLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
        />
      )}
    </>
  );
}
