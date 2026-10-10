import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/cities/:city",
        destination: "/:city",
        permanent: true,
      },
      {
        source: "/cities/:city/places/:place",
        destination: "/:city/:place",
        permanent: true,
      },
      {
        source: "/blog/breakfast-spots-barcelona",
        destination: "/blog/best-brunch-barcelona",
        permanent: true,
      },
      {
        source: "/morocco/marrakech/things-to-do",
        destination: "/cities/marrakech/things-to-do",
        permanent: true,
      },
      {
        // Merged into the 12-bakery guide (Oct 2026): two pages were splitting rankings.
        source: "/blog/best-boulangeries-paris",
        destination: "/blog/best-bakeries-paris",
        permanent: true,
      },
      {
        source: "/cities/barcelona/breakfast",
        destination: "/blog/best-brunch-barcelona",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
