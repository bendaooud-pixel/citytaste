"use client";
import { useState } from "react";
import Image from "next/image";

const FALLBACK =
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80";

interface BlogImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export default function BlogImage({ src, alt, className = "object-cover", sizes }: BlogImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={className}
      sizes={sizes ?? "(max-width: 640px) 100vw, 192px"}
      onError={() => setImgSrc(FALLBACK)}
    />
  );
}
