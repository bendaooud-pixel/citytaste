"use client";
import Image from "next/image";
import { useState, useCallback } from "react";
import { getPlaceImages } from "@/lib/imageManifest";
import type { Place } from "@/lib/types";

interface PlaceImageProps {
  place: Pick<Place, "slug" | "photos" | "name" | "citySlug" | "categories">;
  variant?: "hero" | "gallery" | "thumb";
  galleryIndex?: number;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  onClick?: () => void;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  restaurants: "from-orange-400 via-rose-400 to-pink-500",
  cafes: "from-amber-400 via-orange-400 to-yellow-500",
  bars: "from-purple-500 via-indigo-500 to-blue-600",
  brunch: "from-emerald-400 via-teal-400 to-cyan-500",
  patisseries: "from-pink-400 via-rose-400 to-red-400",
  markets: "from-lime-400 via-green-500 to-emerald-600",
  monuments: "from-slate-500 via-zinc-500 to-stone-600",
  museums: "from-violet-500 via-purple-500 to-indigo-600",
  activities: "from-cyan-400 via-sky-400 to-blue-500",
  desserts: "from-rose-300 via-pink-400 to-fuchsia-500",
  halal: "from-emerald-500 via-green-500 to-teal-600",
  romantic: "from-rose-400 via-pink-500 to-purple-500",
  "cheap-eats": "from-yellow-400 via-amber-400 to-orange-500",
  "family-friendly": "from-sky-400 via-blue-400 to-indigo-500",
};

export default function PlaceImage({
  place,
  variant = "hero",
  galleryIndex = 0,
  fill = true,
  width,
  height,
  className = "object-cover",
  sizes,
  priority = false,
  onClick,
}: PlaceImageProps) {
  const [imgError, setImgError] = useState(false);
  const handleError = useCallback(() => setImgError(true), []);

  if (imgError) {
    const cat = place.categories?.[0] ?? "restaurants";
    const gradient =
      CATEGORY_GRADIENTS[cat] ?? "from-orange-400 via-rose-400 to-pink-500";
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-end p-4`}
        onClick={onClick}
      >
        <span className="text-white/90 font-semibold text-base leading-tight drop-shadow-lg">
          {place.name}
        </span>
      </div>
    );
  }

  const manifest = getPlaceImages(place.slug);
  let src: string;

  if (manifest) {
    if (variant === "thumb") {
      src = manifest.thumbnail;
    } else if (variant === "gallery") {
      src = manifest.gallery[galleryIndex] ?? manifest.heroImage;
    } else {
      src = manifest.heroImage;
    }
  } else {
    const idx = galleryIndex < place.photos.length ? galleryIndex : 0;
    src = place.photos[idx] ?? place.photos[0] ?? "";
  }

  if (!src) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-rose-500 flex items-end p-4">
        <span className="text-white/90 font-semibold text-base leading-tight">
          {place.name}
        </span>
      </div>
    );
  }

  const blurProps =
    manifest?.blurDataURL && variant !== "gallery"
      ? { placeholder: "blur" as const, blurDataURL: manifest.blurDataURL }
      : {};

  if (fill) {
    return (
      <Image
        src={src}
        alt={manifest?.imageAlt ?? place.name}
        fill
        sizes={
          sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        }
        className={className}
        priority={priority}
        onError={handleError}
        onClick={onClick}
        {...blurProps}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={manifest?.imageAlt ?? place.name}
      width={width ?? 800}
      height={height ?? 600}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={handleError}
      onClick={onClick}
      {...blurProps}
    />
  );
}
