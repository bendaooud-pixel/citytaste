"use client";
import Image from "next/image";

const FALLBACK =
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80";

interface BlogImageProps {
  src: string;
  alt: string;
}

export default function BlogImage({ src, alt }: BlogImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 640px) 100vw, 192px"
      onError={(e) => {
        (e.target as HTMLImageElement).src = FALLBACK;
      }}
    />
  );
}
