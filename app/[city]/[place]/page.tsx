import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { dbGetCityBySlug, dbGetPlaceBySlug, dbGetPlacesByCity } from "@/lib/db";
import { CATEGORIES } from "@/lib/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhotoGallery from "@/components/PhotoGallery";
import FavoriteButton from "@/components/FavoriteButton";
import PlaceCard from "@/components/PlaceCard";
import MapClient from "@/components/MapClient";
import RatingsBar from "@/components/ui/RatingsBar";
import PlaceBadge from "@/components/ui/PlaceBadge";
import BookingButtons from "@/components/ui/BookingButtons";
import { getBadges } from "@/lib/badges";
import UserReviews from "@/components/UserReviews";
import ReviewForm from "@/components/ReviewForm";
import { getTranslations } from "@/lib/getTranslations";
import { isThinAttractionPlace } from "@/lib/seo";

const PRICE_LABEL = ["", "$", "$$", "$$$", "$$$$"];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const BASE = "https://www.citytaste.co";
const YEAR = new Date().getFullYear();

function injectYear(s: string): string {
  return s.replace(/\{year\}/g, String(YEAR));
}

type Props = { params: Promise<{ city: string; place: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, place: placeSlug } = await params;
  const [place, city] = await Promise.all([
    dbGetPlaceBySlug(citySlug, placeSlug),
    dbGetCityBySlug(citySlug),
  ]);
  if (!place || !city) return {};
  const title = place.metaTitle ? injectYear(place.metaTitle) : `${place.name}, ${city.name}`;
  const description = place.metaDescription ? injectYear(place.metaDescription) : place.description;
  return {
    title,
    description,
    alternates: { canonical: `${BASE}/${citySlug}/${placeSlug}` },
    // Famous monuments / bookable activities: useful for visitors, but not pages
    // we can rank with. Keep them out of the index so they don't weigh on site quality.
    ...(isThinAttractionPlace(place.categories) && { robots: { index: false, follow: true } }),
    openGraph: {
      title,
      description,
      url: `${BASE}/${citySlug}/${placeSlug}`,
      images: [{ url: place.photos[0], width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [place.photos[0]],
    },
  };
}

export default async function PlaceDetailPage({ params }: Props) {
  const { city: citySlug, place: placeSlug } = await params;
  const [place, city, allCityPlaces] = await Promise.all([
    dbGetPlaceBySlug(citySlug, placeSlug),
    dbGetCityBySlug(citySlug),
    dbGetPlacesByCity(citySlug),
  ]);
  if (!place || !city) notFound();

  const { t } = await getTranslations();

  const today = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const todayHours = place.openingHours[today];
  const isOpen = todayHours !== "Closed";

  const relatedPlaces = allCityPlaces
    .filter((p) => p.id !== place.id && p.categories.some((c) => place.categories.includes(c)))
    .slice(0, 3);

  const badges = getBadges(place);

  function placeSchemaType(categories: string[]): string {
    if (categories.some((c) => ["monuments", "museums", "activities"].includes(c))) return "TouristAttraction";
    if (categories.includes("markets")) return "ShoppingCenter";
    if (categories.some((c) => ["cafes", "brunch"].includes(c))) return "CafeOrCoffeeShop";
    if (categories.some((c) => ["patisseries", "desserts"].includes(c))) return "Bakery";
    if (categories.includes("bars")) return "BarOrPub";
    return "Restaurant";
  }

  const PRICE_RANGE = ["", "€", "€€", "€€€", "€€€€"];

  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": placeSchemaType(place.categories),
    name: place.name,
    description: place.description,
    image: place.photos,
    url: `${BASE}/${place.citySlug}/${place.slug}`,
    ...(place.website && { sameAs: place.website }),
    address: {
      "@type": "PostalAddress",
      streetAddress: place.address,
      addressLocality: city.name,
      addressCountry: city.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: place.lat,
      longitude: place.lng,
    },
    ...(place.phone && { telephone: place.phone }),
    priceRange: PRICE_RANGE[place.priceLevel],
    // No AggregateRating / Review markup: the ratings and sample reviews stored in
    // lib/data.ts are not collected from real visitors on this site, and Google's
    // review-snippet policy forbids marking them up (risk of a manual action).
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",       item: BASE },
      { "@type": "ListItem", position: 2, name: city.name,    item: `${BASE}/${city.slug}` },
      { "@type": "ListItem", position: 3, name: place.name,   item: `${BASE}/${place.citySlug}/${place.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />
      <main className="flex-1 bg-brand-cream">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
            <Link href="/" className="hover:text-brand-orange transition-colors">{t("city.home")}</Link>
            <span aria-hidden="true">›</span>
            <Link href={`/${city.slug}`} className="hover:text-brand-orange transition-colors">{city.name}</Link>
            <span aria-hidden="true">›</span>
            <span className="text-slate-800 font-medium" aria-current="page">{place.name}</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            {/* ── Left column ── */}
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {place.categories.map((catId) => {
                      const cat = CATEGORIES.find((c) => c.id === catId);
                      return cat ? (
                        <span
                          key={catId}
                          className="text-xs bg-orange-100 text-orange-700 font-semibold px-3 py-1 rounded-full border border-orange-200"
                        >
                          {cat.emoji} {cat.label}
                        </span>
                      ) : null;
                    })}
                    {place.isHalal && (
                      <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-3 py-1 rounded-full border border-emerald-200">
                        🌙 Halal
                      </span>
                    )}
                  </div>

                  <h1
                    className="text-3xl md:text-4xl font-bold text-slate-900"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {place.name}
                  </h1>

                  <div className="flex items-center flex-wrap gap-3 mt-3">
                    <span className="font-semibold text-slate-700">{PRICE_LABEL[place.priceLevel]}</span>
                    <span className="text-slate-300">·</span>
                    <span className={`text-sm font-semibold ${isOpen ? "text-emerald-600" : "text-red-500"}`}>
                      {isOpen ? `● ${t("labels.openNow")}` : `● ${t("labels.closed")}`}
                    </span>
                  </div>

                  {place.ratings && (
                    <div className="mt-3">
                      <RatingsBar ratings={place.ratings} variant="full" />
                    </div>
                  )}

                  {badges.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {badges.map((b) => (
                        <PlaceBadge key={b.id} badge={b} size="md" />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <FavoriteButton placeId={place.id} />
                </div>
              </div>

              <PhotoGallery photos={place.photos} name={place.name} placeSlug={place.slug} citySlug={place.citySlug} />

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h2 className="font-semibold text-slate-800 mb-3">{t("place.about")}</h2>
                <p className="text-slate-600 leading-relaxed">{place.description}</p>
              </div>

              {/* Hard-coded "guest reviews", review counts and the "AI review summary"
                  were removed (Oct 2026): they were not written by real visitors.
                  Only reviews submitted through the form below are shown. */}
              <UserReviews placeSlug={placeSlug} />
              <ReviewForm placeSlug={placeSlug} />
            </div>

            {/* ── Right column ── */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
                <h2 className="font-semibold text-slate-800">{t("place.info")}</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <span className="text-lg shrink-0">📍</span>
                    <div>
                      <p className="font-medium text-slate-800">{place.address}</p>
                      <p className="text-slate-500">{place.neighborhood}, {city.name}</p>
                    </div>
                  </div>
                  {place.phone && (
                    <div className="flex gap-3 items-center">
                      <span className="text-lg shrink-0">📞</span>
                      <a href={`tel:${place.phone}`} className="text-orange-500 hover:underline font-medium">
                        {place.phone}
                      </a>
                    </div>
                  )}
                  {place.website && (
                    <div className="flex gap-3 items-center">
                      <span className="text-lg shrink-0">🌐</span>
                      <a href={place.website} target="_blank" rel="noopener noreferrer"
                        className="text-orange-500 hover:underline font-medium truncate">
                        {t("place.officialWebsite")}
                      </a>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <span className="text-lg shrink-0">💰</span>
                    <div>
                      <p className="font-medium text-slate-800">{PRICE_LABEL[place.priceLevel]}</p>
                      <p className="text-slate-500">
                        {["", t("place.budgetFriendly"), t("place.moderate"), t("place.upscale"), t("place.fineDining")][place.priceLevel]}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-2 flex flex-wrap gap-2 border-t border-slate-100">
                  {place.hasTerrace && <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-100 font-medium">🌿 {t("labels.terrace")}</span>}
                  {place.isFamilyFriendly && <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-100 font-medium">👨‍👩‍👧 {t("labels.family")}</span>}
                  {place.isHalal && <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100 font-medium">🌙 {t("labels.halal")}</span>}
                  {place.categories.includes("romantic") && <span className="text-xs bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full border border-rose-100 font-medium">💑 {t("labels.romantic")}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a href={place.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-2xl transition-colors shadow-md shadow-orange-200 active:scale-[0.98]">
                  <span>📍</span> {t("buttons.openMaps")}
                </a>
                <BookingButtons
                  theforkUrl={place.theforkUrl}
                  getYourGuideUrl={place.getYourGuideUrl}
                  menuUrl={place.menuUrl}
                />
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h2 className="font-semibold text-slate-800 mb-4">{t("place.openingHours")}</h2>
                <div className="space-y-2">
                  {DAYS.map((day) => {
                    const hours = place.openingHours[day];
                    const isToday = day === today;
                    return (
                      <div key={day}
                        className={`flex justify-between items-center text-sm py-1.5 px-2 rounded-lg ${isToday ? "bg-orange-50 font-semibold" : ""}`}>
                        <span className={isToday ? "text-orange-700" : "text-slate-600"}>
                          {isToday && "▸ "}{day}
                        </span>
                        <span className={hours === "Closed" ? "text-red-400 font-medium" : isToday ? "text-orange-700" : "text-slate-800"}>
                          {hours}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="h-56 rounded-2xl overflow-hidden shadow-sm">
                <MapClient
                  places={[place]}
                  center={{ lat: place.lat, lng: place.lng }}
                  zoom={15}
                  singlePlace
                  activeId={place.id}
                />
              </div>
            </aside>
          </div>

          {relatedPlaces.length > 0 && (
            <section className="mt-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                {t("place.relatedPlaces")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {relatedPlaces.map((p) => (
                  <PlaceCard key={p.id} place={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
