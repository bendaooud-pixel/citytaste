import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536],
    imageSizes: [80, 160, 320, 400, 640],
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
