"use client";
import { useState } from "react";
import Image from "next/image";

const FALLBACK =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80";

interface BlogImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  blurDataURL?: string;
}

export default function BlogImage({
  src,
  alt,
  className = "object-cover",
  sizes,
  priority = false,
  blurDataURL,
}: BlogImageProps) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK);

  const blurProps = blurDataURL
    ? { placeholder: "blur" as const, blurDataURL }
    : {};

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={className}
      sizes={sizes ?? "(max-width: 640px) 100vw, 192px"}
      priority={priority}
      onError={() => setImgSrc(FALLBACK)}
      {...blurProps}
    />
  );
}
