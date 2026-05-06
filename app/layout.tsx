import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CityTaste — Discover the World's Best Restaurants & Cafés",
    template: "%s | CityTaste",
  },
  description:
    "Your guide to the best restaurants, cafés and food spots in the world's greatest cities. Curated picks for every taste and budget.",
  keywords: ["restaurants", "cafés", "food guide", "travel", "Paris", "Barcelona"],
  verification: {
    google: "bAdWgCdwPszPBtcVYnJI04_kD_kRitX7aYsfLzpTaXw",
  },
  openGraph: {
    siteName: "CityTaste",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
