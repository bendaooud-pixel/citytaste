import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // 301 redirects for old /cities/... URLs — preserves SEO equity
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
    ];
  },
};

export default nextConfig;
