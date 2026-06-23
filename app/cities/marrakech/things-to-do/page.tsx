import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { places } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE = "https://www.citytaste.co";
const CANONICAL = `${BASE}/cities/marrakech/things-to-do`;
const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Best Things to Do in Marrakech ${YEAR} — Complete Guide`,
  description: `The ${YEAR} guide to Marrakech: Jemaa el-Fna, souks, Jardin Majorelle, hammams, rooftop bars, day trips to the Atlas Mountains, and honest prices for every budget.`,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: `Best Things to Do in Marrakech ${YEAR} — Complete Guide`,
    description: `From hot air balloons at sunrise to souk haggling at noon — every activity worth your time in Marrakech in ${YEAR}.`,
    type: "website",
    url: CANONICAL,
  },
};

const FAQ_ITEMS = [
  {
    q: "What are the best things to do in Marrakech?",
    a: `The top experiences in Marrakech in ${YEAR}: a hot air balloon at sunrise over the Palmeraie, Bahia Palace and the Saadian Tombs before lunch, shopping in Souk Semmarine, a traditional hammam scrub at Hammam Dar el-Bacha, sunset cocktails at Kabana Rooftop overlooking the Koutoubia, and the Jemaa el-Fna night market after 8pm.`,
  },
  {
    q: "How many days do you need in Marrakech?",
    a: "3–4 days is ideal. Day 1: Jemaa el-Fna and the medina souks. Day 2: Jardin Majorelle, Bahia Palace and the Saadian Tombs. Day 3: hammam, cooking class and rooftop sunset. Day 4: Atlas Mountains day trip or Agafay Desert excursion. With only 2 days, prioritize the square, Majorelle Garden and one day trip.",
  },
  {
    q: "Is Marrakech safe for tourists?",
    a: "Yes — Marrakech is very safe for tourists. The main annoyances are touts near Jemaa el-Fna and unofficial guides who steer you to carpet shops. Petty theft is rare but keep bags closed in crowded souks. Solo female travellers should dress modestly in the medina. Morocco sees 14+ million tourists annually with minimal serious incidents.",
  },
  {
    q: "What should I not miss in Marrakech?",
    a: "The Jemaa el-Fna night market after 8pm, a rooftop sunset overlooking the Koutoubia minaret, a traditional hammam scrub, shopping in Souk Semmarine, Jardin Majorelle, and a hot air balloon flight at sunrise. If you have a fourth day, the Atlas Mountains day trip is unforgettable.",
  },
  {
    q: "What is the best time to visit Marrakech?",
    a: "March to May and September to November. Spring brings 20–28°C, blooming gardens and manageable crowds. Autumn offers similar conditions. Summer (June–August) hits 38–42°C. Winter (December–February) is cool (10–18°C), occasionally rainy, but far less crowded.",
  },
  {
    q: "How much does a day trip from Marrakech cost?",
    a: "Atlas Mountains group day trips start from $26–93 per person including hotel pickup and lunch. Agafay Desert quad + camel + dinner packages cost $35–80. Private transfers to Essaouira or Ourika Valley run €60–120 for the car. Budget 150–1,500 MAD per person depending on the trip.",
  },
];

const AFFILIATE_TOURS = [
  {
    title: "Hot Air Balloon at Sunrise",
    price: 106,
    duration: "4–5 hours",
    desc: "Sunrise flight over the Palmeraie with Berber breakfast and certificate.",
    url: "https://www.viator.com/tours/Marrakech/Hot-Air-Balloon-Flight-over-Marrakech-with-Traditional-Breakfast/d5408-104348P1?pid=P00306218&mcid=42383&medium=link&medium_version=selector&campaign=citytaste-minta",
    experienceUrl: "/morocco/marrakech/experiences/marrakech-hot-air-balloon",
  },
  {
    title: "Atlas Mountains Day Trip",
    price: 93,
    duration: "7–8 hours",
    desc: "3 valleys, Berber villages, waterfalls and traditional lunch included.",
    url: "https://www.viator.com/tours/Marrakech/Full-Day-Trip-from-Marrakech-to-the-Atlas-Mountains-3-Valleys-through-Berber-Villages/d5408-25014P1?pid=P00306218&mcid=42383&medium=link&medium_version=selector&campaign=citytaste-atla",
    experienceUrl: "/morocco/marrakech/experiences/marrakech-atlas-mountains-3-valleys",
  },
  {
    title: "Agafay Desert Quad + Camel + Dinner",
    price: 35,
    duration: "6–7 hours",
    desc: "Quad biking, camel ride and Berber dinner show at sunset.",
    url: "https://www.viator.com/tours/Marrakech/Day-trip-from-Marrakech-to-berber-villages-and-UNESCO-Kasbahs-from-Marrakech/d5408-71659P5?pid=P00306218&mcid=42383&medium=link&medium_version=selector&campaign=citytaste-quad",
    experienceUrl: "/morocco/marrakech/experiences/marrakech-agafay-quad-camel-dinner",
  },
  {
    title: "Moroccan Cooking Class + Market Tour",
    price: 44,
    duration: "3–4 hours",
    desc: "Souk shopping for ingredients then cook 3 Moroccan dishes with a local chef.",
    url: "https://www.viator.com/tours/Marrakech/Cooking-class-with-chef-Leila/d5408-112810P1?pid=P00306218&mcid=42383&medium=link&medium_version=selector&campaign=citytaste-cui",
    experienceUrl: "/morocco/marrakech/experiences/marrakech-cooking-class",
  },
];

export default function MarrakechThingsToDoPage() {
  const filteredPlaces = places.filter(
    (p) =>
      p.citySlug === "marrakech" &&
      (p.categories.includes("activities") ||
        p.categories.includes("monuments"))
  );

  const topPick = filteredPlaces.find((p) => p.featured) || filteredPlaces[0];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best Things to Do in Marrakech ${YEAR}`,
    description: `The complete guide to things to do in Marrakech — souks, palaces, hammams, rooftop bars, day trips and street food.`,
    url: CANONICAL,
    numberOfItems: filteredPlaces.length,
    itemListElement: filteredPlaces.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristAttraction",
        name: p.name,
        address: p.address,
        url: `${BASE}/marrakech/${p.slug}`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: p.rating,
          reviewCount: p.reviewCount,
        },
      },
    })),
  };

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
        name: "Things to Do",
        item: CANONICAL,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
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
              <span className="text-white/80">Things to Do</span>
            </nav>
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Best Things to Do in Marrakech {YEAR} — Complete Guide
            </h1>
            <p className="text-slate-300 text-lg max-w-3xl">
              Marrakech hits differently than most cities — the medina walls, the
              desert heat, the call to prayer at dawn. This is every activity
              worth your time, from Jemaa el-Fna to the Atlas Mountains.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Intro */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Marrakech is a city built for exploring. The medina — a UNESCO World
              Heritage Site — hides palaces, souks, hammams and rooftop bars inside
              its 19km of ancient walls. Outside the walls, the Atlas Mountains rise
              to 4,000m an hour south, the Agafay stone desert stretches west, and
              the Palmeraie palm groves glow at sunrise under a hot air balloon. You
              need 3–4 days minimum, and you will fill every one of them.
            </p>
            <p className="text-slate-600 leading-relaxed">
              This guide covers {filteredPlaces.length} things to do in Marrakech —
              from iconic monuments to hidden local experiences. Every price, every
              distance and every timing tip comes from visits in {YEAR}. Budget
              300–1,500 MAD per day (€30–150) depending on how deep you want to go.
            </p>
          </div>

          {/* Affiliate Activity Block */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-2xl p-8 mb-10">
            <h2
              className="text-2xl font-bold text-slate-900 mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Book Marrakech Experiences
            </h2>
            <p className="text-slate-600 mb-6">
              The highest-rated Marrakech activities — all include hotel pickup and
              sell out days ahead in peak season.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {AFFILIATE_TOURS.map((tour) => (
                <div
                  key={tour.title}
                  className="bg-white rounded-xl p-5 border border-slate-100 flex flex-col"
                >
                  <h3 className="font-bold text-slate-900 text-sm mb-1">
                    {tour.title}
                  </h3>
                  <p className="text-slate-500 text-xs mb-2">
                    {tour.duration} &middot; From ${tour.price}
                  </p>
                  <p className="text-slate-600 text-xs leading-relaxed flex-1 mb-3">
                    {tour.desc}
                  </p>
                  <a
                    href={tour.url}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="block text-center bg-[#F97316] hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
                  >
                    Book Now
                  </a>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-4">
              We earn a small commission when you book through our links — at no
              extra cost to you. This supports CityTaste.
            </p>
          </div>

          {/* ============ EDITORIAL SECTIONS ============ */}

          {/* Section 1: Jemaa el-Fna */}
          <div className="mb-12">
            <h2
              className="text-2xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Jemaa el-Fna — The Heart of Marrakech
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <p className="text-slate-700 leading-relaxed mb-4">
                <Link href="/marrakech/jemaa-el-fna" className="text-orange-500 hover:text-orange-600 font-medium">Jemaa el-Fna</Link> is
                one of the great public spaces of the world. By day it&apos;s a market
                of fresh orange juice stalls (4–5 MAD a glass), henna artists, snake
                charmers and acrobats. As the sun sets, it transforms entirely —
                around 100 numbered food stalls materialise from nowhere, smoke fills
                the air, and the square becomes an open-air festival of grilled
                merguez, lamb brochettes, harira soup and sheep&apos;s head.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                A full dinner at the stalls costs 40–80 MAD (€4–8) per person.
                Stalls 14–20 are consistently recommended by locals for their kefta.
                Come at 8pm when the grills are hottest. Read our{" "}
                <Link href="/blog/street-food-marrakech" className="text-orange-500 hover:text-orange-600 font-medium">
                  street food Marrakech guide
                </Link>{" "}
                for the full breakdown of what to eat and where.
              </p>
              <div className="flex gap-2">
                <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full">Free entry</span>
                <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Open daily</span>
                <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Best at sunset</span>
              </div>
            </div>
          </div>

          {/* Section 2: Souks & Shopping */}
          <div className="mb-12">
            <h2
              className="text-2xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Souks — Shopping in the Medina
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <p className="text-slate-700 leading-relaxed mb-4">
                Marrakech&apos;s souks are the largest traditional market in Morocco —
                a labyrinth of narrow covered lanes where each alley specialises in a
                different craft.{" "}
                <Link href="/marrakech/souk-semmarine" className="text-orange-500 hover:text-orange-600 font-medium">Souk Semmarine</Link> is
                the main artery: textiles, slippers and lanterns. Souk des Teinturiers
                is where dyers hang skeins of coloured wool from the walls. Souk
                Haddadine rings with the sound of metalworkers hammering iron lanterns.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The best time for{" "}
                <Link href="/cities/marrakech/souks" className="text-orange-500 hover:text-orange-600 font-medium">
                  souk shopping
                </Link>{" "}
                is morning (9–11am) before the heat and crowds peak. Haggle to
                50–60% of the first price offered — it&apos;s expected and part of
                the experience. The spice stalls at{" "}
                <Link href="/marrakech/rahba-lakdima" className="text-orange-500 hover:text-orange-600 font-medium">Rahba Lakdima</Link>{" "}
                are genuine; the &quot;saffron&quot; at tourist stalls near Jemaa el-Fna
                is usually safflower.
              </p>
              <div className="flex gap-2">
                <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full">Free to browse</span>
                <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Mon–Sat 9am–7pm</span>
              </div>
            </div>
          </div>

          {/* Section 3: Gardens & Palaces */}
          <div className="mb-12">
            <h2
              className="text-2xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Gardens &amp; Palaces
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2">
                  <Link href="/marrakech/majorelle-garden" className="hover:text-orange-500 transition-colors">
                    Jardin Majorelle
                  </Link>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  Created by Jacques Majorelle in 1924 and rescued by Yves Saint
                  Laurent in 1980, the garden is a riot of cobalt blue, bougainvillea
                  and towering bamboo. The Berber Museum inside is excellent. Entry:
                  70 MAD garden + 30 MAD museum. Go at 9am opening to avoid
                  crowds — by 11am the paths are shoulder-to-shoulder.
                </p>
                <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">70–150 MAD</span>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2">
                  <Link href="/marrakech/bahia-palace" className="hover:text-orange-500 transition-colors">
                    Bahia Palace
                  </Link>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  An 8,000 m² 19th-century palace with gardens, courtyards and some
                  of the most intricate zellige tilework and carved cedar ceilings in
                  Morocco. It&apos;s one of the most photographed sites in Marrakech.
                  Entry: 70 MAD. Visit before noon — the morning light through the
                  courtyard windows is the best.
                </p>
                <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">70 MAD</span>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2">
                  <Link href="/marrakech/saadian-tombs" className="hover:text-orange-500 transition-colors">
                    Saadian Tombs
                  </Link>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  Hidden for centuries behind a sealed wall, the Saadian Tombs were
                  rediscovered in 1917. The Hall of Twelve Columns contains some of
                  the finest decorative work in North Africa — Italian Carrara marble,
                  muqarnas stucco and carved cedar. Entry: 70 MAD. Arrive at 9am.
                </p>
                <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">70 MAD</span>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2">
                  <Link href="/marrakech/medersa-ben-youssef" className="hover:text-orange-500 transition-colors">
                    Medersa Ben Youssef
                  </Link>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  The largest medersa (Islamic school) in Morocco, dating to the 14th
                  century. The central courtyard — marble, carved stucco and an
                  ablutions pool — is architecturally perfect. Recently reopened after
                  a 5-year restoration. Entry: 50 MAD.
                </p>
                <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">50 MAD</span>
              </div>
            </div>
          </div>

          {/* Section 4: Hammams & Wellness */}
          <div className="mb-12">
            <h2
              className="text-2xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Hammams &amp; Wellness
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <p className="text-slate-700 leading-relaxed mb-4">
                A hammam scrub is not optional in Marrakech — it&apos;s the single
                most Moroccan thing you can do. Traditional hammams (public
                bathhouses) cost 10–20 MAD entry plus 50–80 MAD for a gommage
                (black soap scrub). Tourist-oriented hammams like{" "}
                <Link href="/marrakech/hammam-dar-el-bacha" className="text-orange-500 hover:text-orange-600 font-medium">
                  Hammam Dar el-Bacha
                </Link>{" "}
                and{" "}
                <Link href="/marrakech/hammam-mouassine" className="text-orange-500 hover:text-orange-600 font-medium">
                  Hammam Mouassine
                </Link>{" "}
                offer the full experience with English-speaking staff for 200–500 MAD.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                For luxury spa treatments,{" "}
                <Link href="/marrakech/les-bains-de-marrakech" className="text-orange-500 hover:text-orange-600 font-medium">
                  Les Bains de Marrakech
                </Link>{" "}
                and the{" "}
                <Link href="/marrakech/spa-royal-mansour" className="text-orange-500 hover:text-orange-600 font-medium">
                  Royal Mansour Spa
                </Link>{" "}
                are world-class. See our full{" "}
                <Link href="/cities/marrakech/hammam" className="text-orange-500 hover:text-orange-600 font-medium">
                  hammam guide
                </Link>{" "}
                and{" "}
                <Link href="/cities/marrakech/spa" className="text-orange-500 hover:text-orange-600 font-medium">
                  spa guide
                </Link>{" "}
                for the complete ranking.
              </p>
            </div>
          </div>

          {/* Section 5: Rooftops & Sunset */}
          <div className="mb-12">
            <h2
              className="text-2xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Rooftop Bars &amp; Sunset Terraces
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <p className="text-slate-700 leading-relaxed mb-4">
                Marrakech at sunset from a rooftop is one of the great travel
                moments — the Koutoubia minaret turning gold, the Atlas Mountains
                going purple, the call to prayer echoing across the medina.{" "}
                <Link href="/marrakech/kabana-rooftop" className="text-orange-500 hover:text-orange-600 font-medium">
                  Kabana Rooftop
                </Link>{" "}
                has the best close-up Koutoubia view;{" "}
                <Link href="/marrakech/sky-bar-es-saadi" className="text-orange-500 hover:text-orange-600 font-medium">
                  Sky Bar at Es Saadi
                </Link>{" "}
                has the widest 360° panorama;{" "}
                <Link href="/marrakech/kosybar" className="text-orange-500 hover:text-orange-600 font-medium">
                  Kosybar
                </Link>{" "}
                overlooks El Badi Palace with stork nests on the ancient walls.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Cocktails run 80–180 MAD (€8–18). Arrive 30 minutes before sunset
                for the best table. Read our{" "}
                <Link href="/cities/marrakech/rooftop" className="text-orange-500 hover:text-orange-600 font-medium">
                  rooftop bars guide
                </Link>{" "}
                and{" "}
                <Link href="/blog/best-sunset-terraces-marrakech" className="text-orange-500 hover:text-orange-600 font-medium">
                  sunset terraces ranking
                </Link>{" "}
                for the full breakdown with timings and honest prices.
              </p>
            </div>
          </div>

          {/* Section 6: Day Trips */}
          <div className="mb-12">
            <h2
              className="text-2xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Day Trips from Marrakech
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <p className="text-slate-700 leading-relaxed mb-4">
                The landscape around Marrakech is extraordinary. The Atlas Mountains
                rise to over 4,000m just 45 minutes south — the 3 Valleys day trip
                through Berber villages is the most popular excursion and costs from
                $93 with hotel pickup. The Agafay stone desert (40 minutes west)
                offers quad biking, camel rides and sunset dinner packages from $26–35.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Essaouira on the Atlantic coast (2.5 hours) is worth the drive for
                its fishing harbour and Gnaoua music scene. Ouzoud Falls (2.5 hours
                northeast) drops 110m into a gorge with Barbary macaques swinging
                through the spray. See our full{" "}
                <Link href="/cities/marrakech/day-trips" className="text-orange-500 hover:text-orange-600 font-medium">
                  day trips from Marrakech guide
                </Link>{" "}
                for distances, prices and booking links.
              </p>
            </div>
          </div>

          {/* Section 7: Food & Restaurants */}
          <div className="mb-12">
            <h2
              className="text-2xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Food &amp; Restaurants
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <p className="text-slate-700 leading-relaxed mb-4">
                Marrakech operates on two food tracks: the medina, where everything
                from a dirham pastry to a €200 tasting menu exists within a ten-minute
                walk, and Gueliz, the French-built new city.{" "}
                <Link href="/marrakech/nomad" className="text-orange-500 hover:text-orange-600 font-medium">
                  Nomad
                </Link>{" "}
                is the best all-round dinner;{" "}
                <Link href="/marrakech/le-jardin" className="text-orange-500 hover:text-orange-600 font-medium">
                  Le Jardin
                </Link>{" "}
                is the romantic garden lunch;{" "}
                <Link href="/marrakech/dar-yacout" className="text-orange-500 hover:text-orange-600 font-medium">
                  Dar Yacout
                </Link>{" "}
                is the theatrical palace feast (€60–80 per person).
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                For street food, start at{" "}
                <Link href="/marrakech/hadj-mustapha" className="text-orange-500 hover:text-orange-600 font-medium">
                  Hadj Mustapha
                </Link>{" "}
                for the best harira in the city (€1.50), then work through our{" "}
                <Link href="/blog/48-hours-food-guide-marrakech" className="text-orange-500 hover:text-orange-600 font-medium">
                  48-hour Marrakech food guide
                </Link>
                . Full restaurant rankings in our{" "}
                <Link href="/cities/marrakech/restaurants" className="text-orange-500 hover:text-orange-600 font-medium">
                  restaurants guide
                </Link>{" "}
                and{" "}
                <Link href="/cities/marrakech/street-food" className="text-orange-500 hover:text-orange-600 font-medium">
                  street food directory
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Top Pick */}
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

          {/* Place Cards */}
          <h2
            className="text-2xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            All Things to Do in Marrakech ({filteredPlaces.length} picks)
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
              Local Tips for Things to Do in Marrakech
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Book the hot air balloon for sunrise — it&apos;s the single most
                spectacular activity in Marrakech and sells out weeks ahead in
                spring and autumn.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Monuments close earlier than you&apos;d expect (5–6pm). Visit
                Bahia Palace and the Saadian Tombs before lunch. Buy the
                Marrakech Museum Pass (200 MAD) to cover most entries.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                The best souk shopping is 9–11am before the heat and crowds.
                Haggle to 50–60% of the first price — it&apos;s expected.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Don&apos;t skip the hammam. Even if you&apos;re not a spa
                person, a traditional gommage (black soap scrub) is the most
                Moroccan experience you can have.
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0">&rarr;</span>
                Carry small change (10–20 MAD notes). Orange juice stalls,
                public toilets and small tips for directions all require it.
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-slate-100">
            <h2
              className="text-xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              FAQ — Things to Do in Marrakech
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

          {/* Cluster Spoke Links */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">
              Explore more Marrakech guides
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/cities/marrakech/rooftop", label: "Rooftop Bars" },
                { href: "/cities/marrakech/day-trips", label: "Day Trips" },
                { href: "/cities/marrakech/restaurants", label: "Restaurants" },
                { href: "/cities/marrakech/hammam", label: "Hammams" },
                { href: "/cities/marrakech/souks", label: "Souks" },
                { href: "/cities/marrakech/street-food", label: "Street Food" },
                { href: "/cities/marrakech/bars", label: "Bars" },
                { href: "/cities/marrakech/spa", label: "Spas" },
                { href: "/cities/marrakech/breakfast", label: "Breakfast" },
                { href: "/blog/best-sunset-terraces-marrakech", label: "Sunset Terraces" },
                { href: "/blog/48-hours-food-guide-marrakech", label: "48h Food Guide" },
                { href: "/blog/street-food-marrakech", label: "Street Food Guide" },
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
