import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/marrakech/day-trips`;
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Best Day Trips from Marrakech ${YEAR} — Complete Guide`,
  description:
    `Discover the best day trips from Marrakech — Atlas Mountains, Agafay Desert, Essaouira coast & more. Prices, distances and booking tips for ${YEAR}.`,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: `Best Day Trips from Marrakech ${YEAR} — Complete Guide`,
    description:
      `Discover the best day trips from Marrakech — Atlas Mountains, Agafay Desert, Essaouira coast & more. Prices, distances and booking tips for ${YEAR}.`,
    type: "website",
    url: CANONICAL,
  },
};

const VIATOR_TOURS = [
  {
    title: "Atlas Mountains — 3 Valleys",
    price: "$93",
    duration: "7–8 hours",
    description:
      "Drive through three Atlas valleys and Berber villages with hotel pickup, traditional lunch included.",
    url: "https://www.viator.com/tours/Marrakech/Full-Day-Trip-from-Marrakech-to-the-Atlas-Mountains-3-Valleys-through-Berber-Villages/d5408-25014P1?pid=P00306218&mcid=42383&medium=link&medium_version=selector&campaign=citytaste-atla",
  },
  {
    title: "Atlas + Agafay Desert",
    price: "$26",
    duration: "5 hours",
    description:
      "Atlas foothills and the Agafay stone desert in a single half-day, Berber village visit included.",
    url: "https://www.viator.com/tours/Marrakech/Atlas-Mountains-and-Agafay-Desert-and-Berber-Village-Full-Day-Trip-From-Marrakech/d5408-261757P5?pid=P00306218&mcid=42383&medium=link&medium_version=selector&campaign=citytaste-agafa",
  },
  {
    title: "Agafay Quad + Camel + Dinner",
    price: "$35",
    duration: "6–7 hours",
    description:
      "Quad biking, camel ride and sunset dinner in the Agafay Desert — a full desert experience without the Sahara drive.",
    url: "https://www.viator.com/tours/Marrakech/Day-trip-from-Marrakech-to-berber-villages-and-UNESCO-Kasbahs-from-Marrakech/d5408-71659P5?pid=P00306218&mcid=42383&medium=link&medium_version=selector&campaign=citytaste-quad",
  },
];

const FAQ_ITEMS = [
  {
    q: "What are the best day trips from Marrakech?",
    a: "The top five day trips from Marrakech are the Atlas Mountains 3 Valleys tour (45 min), Agafay Desert quad and camel experience (40 min), Ourika Valley waterfalls (1 hour), Essaouira on the Atlantic coast (2.5 hours), and Ouzoud Falls (2.5 hours). Each can be done comfortably in a single day with a morning departure.",
  },
  {
    q: "How do I get to the Atlas Mountains from Marrakech?",
    a: "The easiest option is a guided day trip with hotel pickup — tours depart daily from 250 MAD (around $26). You can also hire a private driver for 600–800 MAD round-trip, or rent a car and take the R203 road toward Imlil. The drive to the first Berber villages takes about 45 minutes from central Marrakech.",
  },
  {
    q: "Is the Agafay Desert worth visiting?",
    a: "Absolutely. The Agafay is a dramatic stone desert just 40 minutes from Marrakech — no 10-hour drive to the Sahara required. The lunar landscape is stunning at sunset, and you can combine quad biking, camel rides, and a traditional Berber dinner in a single half-day trip. Budget 250–800 MAD per person depending on activities.",
  },
  {
    q: "Can I do Essaouira as a day trip from Marrakech?",
    a: "Yes, though it is a long day. Essaouira is 2.5 hours each way by car or Supratours bus (80 MAD one-way). Most day trips depart at 7–8am and return by 7pm, giving you about 5 hours in the city. If you can spare two days, an overnight stay lets you enjoy the evening fish grills at the port without rushing back.",
  },
  {
    q: "What should I wear for Atlas Mountains day trips?",
    a: "Wear comfortable hiking shoes or trainers with good grip — trails can be rocky and loose. In spring and autumn, bring a light fleece or jacket as mountain temperatures are 8–10 degrees cooler than Marrakech. In winter, a warm layer and waterproof jacket are essential. Always bring sunscreen and a hat regardless of season.",
  },
  {
    q: "Are day trips from Marrakech safe?",
    a: "Yes, day trips from Marrakech are very safe. The most popular routes (Atlas Mountains, Agafay, Ourika Valley) are well-traveled tourist corridors with established infrastructure. Guided tours include experienced local drivers. If driving yourself, roads are paved and well-signed on main routes. Exercise normal travel caution and carry water.",
  },
];

const DAY_TRIPS = [
  {
    title: "Atlas Mountains — 3 Valleys & Berber Villages",
    slug: "atlas-mountains",
    distance: "45 min from Marrakech",
    bestTime: "Year-round — spring and autumn are ideal",
    budget: "250–1,000 MAD / €25–100",
    internalLink: "/morocco/marrakech/experiences/marrakech-atlas-mountains-3-valleys",
    paragraphs: [
      `The High Atlas begins abruptly south of Marrakech — within 30 minutes of leaving the medina you are climbing switchbacks through juniper forests with snow-capped Jebel Toubkal (4,167 m) on the horizon. The classic "3 Valleys" route threads through the Asni, Ourika, and Imlil valleys, stopping at Berber villages where families still farm terraced plots of walnut, cherry, and almond trees.`,
      `Most tours include a guided walk through a village, mint tea with a local family, and a traditional tajine lunch cooked over charcoal. The Imlil valley — the trailhead for Toubkal — has become a trekking hub with small guesthouses and mountain cafes. Even a non-hiking day trip here feels worlds away from the Jemaa el-Fna chaos.`,
      `Budget tip: shared minibus tours start from 250 MAD ($26) per person including lunch. Private car hire with a driver runs 600–1,000 MAD for the day. If you want to hike, add a local mountain guide for 300 MAD. The best light for photos hits the valleys between 9–11am.`,
    ],
  },
  {
    title: "Agafay Desert — Quad, Camel & Sunset Dinner",
    slug: "agafay-desert",
    distance: "40 min from Marrakech",
    bestTime: "Late afternoon for the sunset — avoid midday heat in summer",
    budget: "250–800 MAD / €25–80",
    internalLink: "/morocco/marrakech/experiences/marrakech-agafay-quad-camel-dinner",
    paragraphs: [
      `The Agafay is not the Sahara — there are no towering sand dunes here. Instead, you get a stark, lunar stone desert that glows orange and pink at sunset, framed by the Atlas Mountains behind you and an infinite flat horizon ahead. It is 40 minutes from central Marrakech, making it the most accessible desert experience in Morocco.`,
      `The most popular format is a half-day or sunset package: quad biking across the rocky plateau, a 30–60 minute camel ride, and then a Berber dinner in a desert camp as the stars come out. Luxury camps like Scarabeo Camp and Inara Camp offer plunge pools, glamping tents, and candlelit dinners for those who want to stay overnight (2,000–5,000 MAD per night).`,
      `For day-trippers, the sweet spot is a late-afternoon departure (3–4pm) that catches the golden hour. Quad bike rental alone costs 250–400 MAD for an hour. Combined packages with camel ride and dinner start at 350 MAD per person through local operators, or $35 through Viator with hotel pickup included.`,
    ],
  },
  {
    title: "Ourika Valley — Waterfalls & Markets",
    slug: "ourika-valley",
    distance: "1 hour from Marrakech",
    bestTime: "Spring (March–May) for wildflowers — avoid late summer flash floods",
    budget: "150–500 MAD / €15–50",
    paragraphs: [
      `The Ourika Valley is the easiest Atlas escape from Marrakech — a straight 1-hour drive south along the P2017 road into a green river valley dotted with clay-walled Berber villages and terraced gardens. The valley is famous for its seven waterfalls (Setti Fatma), a tiered cascade that you can hike to in about 45 minutes from the trailhead village.`,
      `Beyond the waterfalls, the valley has several hidden attractions worth stopping for. The Safran de l'Ourika cooperative near Tnine Ourika grows high-altitude saffron and gives free tours of the fields (harvest is in November). The Berber Ecomuseum in Tafza is a restored village house showing traditional Atlas life. And on Mondays, the Tnine Ourika weekly market is a riot of color — locals sell produce, live chickens, pottery, and handwoven textiles at local prices.`,
      `Important safety note: the Ourika River floods during heavy rains, typically in August and September. Flash floods have been deadly here in past years. Stick to dry months or check conditions locally before hiking. During normal weather, the valley is perfectly safe and well-trafficked.`,
    ],
  },
  {
    title: "Essaouira — Atlantic Coast",
    slug: "essaouira",
    distance: "2.5 hours from Marrakech",
    bestTime: "April–June and September–October — avoid August crowds and winter wind",
    budget: "300–600 MAD / €30–60 (transport) + spending",
    paragraphs: [
      `Essaouira hits you with the Atlantic wind the moment you step out of the car — after Marrakech's landlocked heat, the cool salt air feels like another country. This 18th-century fortified port city has blue-and-white medina streets, a working fishing harbor where you can eat grilled sardines for 30 MAD, and a long Atlantic beach popular with kitesurfers and windsurfers.`,
      `The Essaouira medina is a UNESCO World Heritage Site and a fraction of the size of Marrakech's — you can explore comfortably in 3–4 hours. Key stops: the ramparts (the Skala de la Ville) used as a Game of Thrones filming location (Astapor), the fish market at the port where you pick your catch and have it grilled on the spot, and the galleries of Rue Sidi Mohammed Ben Abdallah, where Gnaoua artists and woodworkers sell directly.`,
      `Getting there: Supratours buses run 4–5 times daily from the Marrakech bus station (80 MAD one-way, 2.5 hours). A grand taxi costs around 500–600 MAD for the car. Organized day trips with hotel pickup start at 300 MAD per person. If you drive, the N8 highway is fast and well-paved, with argan tree forests along the way where goats famously climb the branches.`,
    ],
  },
  {
    title: "Ouzoud Falls — Morocco's Tallest Waterfall",
    slug: "ouzoud-falls",
    distance: "2.5 hours from Marrakech",
    bestTime: "Spring (March–June) when water flow peaks — impressive year-round",
    budget: "200–500 MAD / €20–50",
    paragraphs: [
      `Ouzoud Falls are 110 meters of thundering cascade surrounded by olive groves and red-rock gorges — the most dramatic natural sight within day-trip range of Marrakech. The falls are located in the Middle Atlas near the village of Tanaghmeilt, a 2.5-hour drive northeast of Marrakech through the Tadla plain.`,
      `A network of walking trails descends from the parking area to the base of the falls, where you can take a small boat ride (20 MAD) directly under the spray. Barbary macaques live in the cliffs around the falls — they are wild but accustomed to visitors, so keep food secured. The rainbow that forms in the mist at midday is genuinely spectacular. Allow 2–3 hours at the falls themselves.`,
      `The drive passes through agricultural countryside that most Marrakech visitors never see — olive groves, wheat fields, and small Berber towns. Shared day tours depart from Marrakech around 8am and return by 6pm, costing 200–350 MAD per person. A private taxi for the round trip costs 800–1,000 MAD. There are simple restaurants at the falls serving tajine and grilled meats for 40–80 MAD.`,
    ],
  },
];

export default function MarrakechDayTripsPage() {
  const filteredPlaces = places.filter(
    (p) =>
      p.citySlug === "marrakech" &&
      (p.categories.includes("activities") ||
        p.categories.includes("monuments"))
  );

  const topPick = filteredPlaces.find((p) => p.featured) || filteredPlaces[0];

  /* ---------- JSON-LD: ItemList ---------- */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Day Trips from Marrakech",
    description:
      "The best day trips from Marrakech including Atlas Mountains, Agafay Desert, Ourika Valley, Essaouira and Ouzoud Falls.",
    url: CANONICAL,
    numberOfItems: DAY_TRIPS.length,
    itemListElement: DAY_TRIPS.map((trip, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristTrip",
        name: trip.title,
        description: trip.paragraphs[0].slice(0, 200),
      },
    })),
  };

  /* ---------- JSON-LD: BreadcrumbList ---------- */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Marrakech",
        item: `${BASE}/marrakech`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Day Trips",
        item: CANONICAL,
      },
    ],
  };

  /* ---------- JSON-LD: FAQPage ---------- */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen bg-[#FFF8F0]">
        {/* Hero */}
        <div className="bg-[#1E293B] text-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 text-white/50 text-xs mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>&rsaquo;</span>
              <Link
                href="/marrakech"
                className="hover:text-white transition-colors"
              >
                Marrakech
              </Link>
              <span>&rsaquo;</span>
              <span className="text-white/80">Day Trips</span>
            </nav>
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Best Day Trips from Marrakech {YEAR} — Atlas, Desert & Coast
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Marrakech is surrounded by some of Morocco&apos;s most spectacular
              landscapes — the High Atlas Mountains, the Agafay stone desert,
              the Atlantic coast, and waterfalls that plunge over 100 meters.
              All within a half-day drive.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Intro */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Marrakech is the perfect base for day trips because the geography
              changes dramatically in every direction. Drive 45 minutes south
              and you are in the High Atlas Mountains, standing at 2,000 meters
              in a Berber village where the air smells like juniper and wood
              smoke. Head 40 minutes west and the Agafay stone desert stretches
              to the horizon — a lunar landscape that glows orange at sunset.
              The Atlantic coast at Essaouira is 2.5 hours away, and the Ourika
              Valley waterfalls are just an hour from the medina.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Budget anywhere from 150 to 1,500 MAD (&euro;15&ndash;150) per
              day trip depending on distance and activity. Most organized tours
              include hotel pickup, a driver, and lunch. This guide covers the
              five best day trips from Marrakech with real prices, distances,
              and honest recommendations based on our own experience.
            </p>
          </div>

          {/* Affiliate Activity Block */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-2xl p-8 mb-10">
            <h2
              className="text-2xl font-bold text-slate-900 mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Book a Marrakech Day Trip
            </h2>
            <p className="text-slate-600 mb-6">
              These are the highest-rated day trips from Marrakech — all include
              hotel pickup and an English-speaking guide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VIATOR_TOURS.map((tour) => (
                <div
                  key={tour.title}
                  className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm flex flex-col"
                >
                  <h3 className="font-bold text-slate-900 text-base mb-1">
                    {tour.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-3">
                    From{" "}
                    <span className="font-semibold text-slate-900">
                      {tour.price}
                    </span>{" "}
                    &middot; {tour.duration}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                    {tour.description}
                  </p>
                  <a
                    href={tour.url}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-lg transition-colors text-sm"
                  >
                    Book Now &rarr;
                  </a>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3">
              We earn a small commission when you book through our links — at no
              extra cost to you. This supports CityTaste.
            </p>
          </div>

          {/* Editorial Day Trip Sections */}
          {DAY_TRIPS.map((trip, index) => (
            <div
              key={trip.slug}
              className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-slate-100"
            >
              <h2
                className="text-2xl font-bold text-slate-900 mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {index + 1}. {trip.title}
              </h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 mb-5">
                <span className="flex items-center gap-1.5">
                  <span className="text-orange-400">&#9673;</span>
                  {trip.distance}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-orange-400">&#9673;</span>
                  Best time: {trip.bestTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-orange-400">&#9673;</span>
                  Budget: {trip.budget}
                </span>
              </div>
              {trip.paragraphs.map((para, pIdx) => (
                <p
                  key={pIdx}
                  className="text-slate-600 leading-relaxed mb-4 last:mb-0"
                >
                  {para}
                </p>
              ))}
              {trip.internalLink && (
                <Link
                  href={trip.internalLink}
                  className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-orange-500 hover:text-orange-600"
                >
                  View full experience details &rarr;
                </Link>
              )}
            </div>
          ))}

          {/* Top Pick from Data */}
          {topPick && (
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-6">
              <div className="relative w-full sm:w-48 h-48 sm:h-auto rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={topPick.photos[0]}
                  alt={topPick.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 192px"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-orange-500 uppercase tracking-wide">
                  Our Top Pick
                </span>
                <h3
                  className="text-xl font-bold text-slate-900 mt-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {topPick.name}
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  {topPick.neighborhood} &middot;{" "}
                  {topPick.priceLevel > 0
                    ? "€".repeat(topPick.priceLevel)
                    : "Free"}{" "}
                  &middot; &#9733; {topPick.rating.toFixed(1)}
                </p>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  {topPick.description}
                </p>
                <Link
                  href={`/marrakech/${topPick.slug}`}
                  className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-orange-500 hover:text-orange-600"
                >
                  View full profile &rarr;
                </Link>
              </div>
            </div>
          )}

          {/* Place Cards Grid */}
          <h2
            className="text-2xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Marrakech Activities & Monuments ({filteredPlaces.length} picks)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPlaces.map((p) => (
              <Link
                key={p.slug}
                href={`/marrakech/${p.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-slate-100"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={p.photos[0]}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3
                      className="font-bold text-slate-900 text-lg leading-snug"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {p.name}
                    </h3>
                    <span className="text-amber-500 text-sm font-semibold flex-shrink-0 ml-2">
                      &#9733; {p.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs mb-3">
                    {p.neighborhood} &middot;{" "}
                    {p.priceLevel > 0
                      ? "€".repeat(p.priceLevel)
                      : "Free"}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {p.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Local Tips */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 mb-10">
            <h2
              className="text-xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Local Tips for Day Trips from Marrakech
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Depart early — most day trips leave between 7:30&ndash;9:00am.
                The Atlas Mountains and Ourika Valley are coolest in the
                morning, and Essaouira needs an early start to allow enough
                time in the city.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Carry cash in small denominations (20 and 50 MAD notes). Many
                Berber villages, roadside stops, and waterfall guides only
                accept cash. ATMs are scarce outside Marrakech.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                For the Atlas Mountains, pack a light jacket even in summer —
                temperatures at altitude are 8&ndash;12&deg;C cooler than
                Marrakech. In winter, expect near-freezing mornings above
                2,000m.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Negotiate taxi prices before departing, or book a tour with
                fixed pricing. A grand taxi to Ourika Valley should cost
                300&ndash;400 MAD round-trip with waiting time. Essaouira is
                500&ndash;600 MAD. Never pay without agreeing on the return
                fare first.
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2
              className="text-xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              FAQ — Day Trips from Marrakech
            </h2>
            <div className="space-y-6">
              {FAQ_ITEMS.map((item) => (
                <div key={item.q}>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {item.q}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Internal links */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">
              Explore more Marrakech guides
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                {
                  href: "/cities/marrakech/things-to-do",
                  label: "Things to Do",
                },
                {
                  href: "/cities/marrakech/rooftop",
                  label: "Rooftop Bars",
                },
                {
                  href: "/cities/marrakech/street-food",
                  label: "Street Food",
                },
                {
                  href: "/cities/marrakech/restaurants",
                  label: "Restaurants",
                },
                {
                  href: "/cities/marrakech/hammam",
                  label: "Hammams",
                },
                {
                  href: "/cities/marrakech/souks",
                  label: "Souks",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm bg-white border border-slate-200 rounded-full px-4 py-2 text-slate-700 hover:text-orange-500 hover:border-orange-200 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/marrakech"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              Explore all Marrakech places &rarr;
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
