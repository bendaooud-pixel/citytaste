import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/components/I18nProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const BASE = "https://www.citytaste.co";
const OG_IMAGE = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "CityTaste — Best Restaurants & Cafés in Paris, Barcelona & Rome",
    template: "%s | CityTaste",
  },
  description:
    "Discover the best restaurants, cafés, bistros and hidden food gems in Paris, Barcelona and Rome. Curated by locals — with maps, reviews and insider tips.",
  keywords: [
    "restaurants Paris", "cafés Barcelona", "food guide Rome",
    "best bistros Paris", "where to eat Europe", "travel food guide",
    "hidden restaurants Europe", "local food tips",
  ],
  authors: [{ name: "CityTaste", url: BASE }],
  creator: "CityTaste",
  publisher: "CityTaste",
  verification: {
    google: "bAdWgCdwPszPBtcVYnJI04_kD_kRitX7aYsfLzpTaXw",
  },
  openGraph: {
    siteName: "CityTaste",
    type: "website",
    locale: "en_US",
    url: BASE,
    title: "CityTaste — Best Restaurants & Cafés in Paris, Barcelona & Rome",
    description:
      "Discover the best restaurants, cafés and hidden food gems in Paris, Barcelona and Rome.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "CityTaste — Best Restaurants in Europe" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@citytaste",
    creator: "@citytaste",
    title: "CityTaste — Best Restaurants & Cafés in Paris, Barcelona & Rome",
    description:
      "Discover the best restaurants, cafés and hidden food gems in Paris, Barcelona and Rome.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
          <I18nProvider>{children}</I18nProvider>
        </body>
    </html>
  );
}
