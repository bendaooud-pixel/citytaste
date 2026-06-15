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
    ];
  },
};

export default nextConfig;
