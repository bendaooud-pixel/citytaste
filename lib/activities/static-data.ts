import type { Country, City, Activity } from "./types";

export const COUNTRIES: Country[] = [
  {
    id: "c-morocco",
    slug: "morocco",
    name: "Morocco",
    nameI18n: { fr: "Maroc", es: "Marruecos", it: "Marocco" },
    flag: "🇲🇦",
    displayOrder: 1,
  },
];

export const CITIES: City[] = [
  { id: "ci-marrakech",   countryId: "c-morocco", slug: "marrakech",   name: "Marrakech",   nameI18n: { fr: "Marrakech", es: "Marrakech", it: "Marrakech" },       heroImage: "/images/morocco/marrakech.jpg",     displayOrder: 1 },
  { id: "ci-fes",         countryId: "c-morocco", slug: "fes",         name: "Fès",         nameI18n: { fr: "Fès", es: "Fez", it: "Fès" },                         heroImage: "/images/morocco/fes.jpg",           displayOrder: 2 },
  { id: "ci-chefchaouen", countryId: "c-morocco", slug: "chefchaouen", name: "Chefchaouen", nameI18n: { fr: "Chefchaouen", es: "Chefchaouen", it: "Chefchaouen" }, heroImage: "/images/morocco/chefchaouen.jpg",   displayOrder: 3 },
  { id: "ci-casablanca",  countryId: "c-morocco", slug: "casablanca",  name: "Casablanca",  nameI18n: { fr: "Casablanca", es: "Casablanca", it: "Casablanca" },                                                    displayOrder: 4 },
  { id: "ci-rabat",       countryId: "c-morocco", slug: "rabat",       name: "Rabat",       nameI18n: { fr: "Rabat", es: "Rabat", it: "Rabat" },                   heroImage: "/images/morocco/rabat.jpg",         displayOrder: 5 },
  { id: "ci-tangier",     countryId: "c-morocco", slug: "tangier",     name: "Tangier",     nameI18n: { fr: "Tanger", es: "Tánger", it: "Tangeri" },                                                               displayOrder: 6 },
  { id: "ci-agadir",      countryId: "c-morocco", slug: "agadir",      name: "Agadir",      nameI18n: { fr: "Agadir", es: "Agadir", it: "Agadir" },                                                                displayOrder: 7 },
  { id: "ci-essaouira",   countryId: "c-morocco", slug: "essaouira",   name: "Essaouira",   nameI18n: { fr: "Essaouira", es: "Esauira", it: "Essaouira" },         heroImage: "/images/morocco/essaouira.jpg",     displayOrder: 8 },
  { id: "ci-merzouga",    countryId: "c-morocco", slug: "merzouga",    name: "Merzouga",    nameI18n: { fr: "Merzouga", es: "Merzouga", it: "Merzouga" },           heroImage: "/images/morocco/sahara-desert.jpg", displayOrder: 9 },
  { id: "ci-ouarzazate",  countryId: "c-morocco", slug: "ouarzazate",  name: "Ouarzazate",  nameI18n: { fr: "Ouarzazate", es: "Uarzazat", it: "Ouarzazate" },                                                      displayOrder: 10 },
];

export const ACTIVITIES: Activity[] = [
  {
    id: "viator-fes-115777P9",
    cityId: "ci-fes",
    title: "Best Fez to Marrakech via Merzouga Desert Dunes, 3 Days Tour",
    titleI18n: {},
    descI18n: {},
    category: "day-trip",
    platform: "viator",
    affiliateUrl: "https://www.viator.com/Fez/d22151-ttd/p-115777P9?pid=P00306218&mcid=42383&medium=link&medium_version=selector&campaign=citytaste-mer&source=shortlink&localeSwitch=1",
    imageUrl: "/images/offers/viator-fes-115777P9.jpg",
    priceFrom: 244,
    currency: "USD",
    duration: "3 days",
    priority: 1,
  },
  {
    id: "viator-fes-463193P2",
    cityId: "ci-fes",
    title: "Exclusive Fez Medina Walking Tour with Private Guide",
    titleI18n: {},
    descI18n: {},
    category: "medina-tour",
    platform: "viator",
    affiliateUrl: "https://www.viator.com/Fez/d22151-ttd/p-463193P2?pid=P00306218&mcid=42383&medium=link&medium_version=selector&campaign=citytaste-dbgh&source=shortlink&localeSwitch=1",
    imageUrl: "/images/offers/viator-fes-463193P2.jpg",
    priceFrom: 36,
    currency: "USD",
    duration: "4 hours",
    priority: 1,
  },
  {
    id: "viator-fes-459799P6",
    cityId: "ci-fes",
    title: "Pottery and Mosaic Workshop in Fes Led by Local Artisans",
    titleI18n: {},
    descI18n: {},
    category: "activity",
    platform: "viator",
    affiliateUrl: "https://www.viator.com/Fez/d22151-ttd/p-459799P6?pid=P00306218&mcid=42383&medium=link&medium_version=selector&campaign=citytaste-tin&source=shortlink&localeSwitch=1",
    imageUrl: "/images/offers/viator-fes-459799P6.jpg",
    priceFrom: 45,
    currency: "USD",
    duration: "2 hours",
    priority: 1,
  },
];
