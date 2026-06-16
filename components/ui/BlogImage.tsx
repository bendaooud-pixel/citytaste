"use client";
import { useState } from "react";
import Image from "next/image";

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
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
        <span className="text-slate-400 text-sm font-medium">CityTaste</span>
      </div>
    );
  }

  const blurProps = blurDataURL
    ? { placeholder: "blur" as const, blurDataURL }
    : {};

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes ?? "(max-width: 640px) 100vw, 192px"}
      priority={priority}
      onError={() => setFailed(true)}
      {...blurProps}
    />
  );
}
