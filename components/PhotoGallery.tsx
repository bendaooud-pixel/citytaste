"use client";
import Image from "next/image";
import { useState, useCallback } from "react";
import { getPlaceImages } from "@/lib/imageManifest";

interface PhotoGalleryProps {
  photos: string[];
  name: string;
  placeSlug?: string;
  citySlug?: string;
}

const FALLBACK =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80";

function SafeImage({
  src,
  alt,
  fill,
  sizes,
  className,
  priority,
  blurDataURL,
  onError,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  blurDataURL?: string;
  onError?: () => void;
}) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK);
  const handleError = useCallback(() => {
    setImgSrc(FALLBACK);
    onError?.();
  }, [onError]);

  const blurProps = blurDataURL
    ? { placeholder: "blur" as const, blurDataURL }
    : {};

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
        onError={handleError}
        {...blurProps}
      />
    );
  }
  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={80}
      height={64}
      className={className}
      onError={handleError}
    />
  );
}

export default function PhotoGallery({
  photos,
  name,
  placeSlug,
}: PhotoGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const manifest = placeSlug ? getPlaceImages(placeSlug) : null;

  const displayPhotos =
    manifest?.gallery?.length
      ? manifest.gallery
      : photos.length
      ? photos
      : [FALLBACK];

  const blurDataURL = manifest?.blurDataURL;

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setActive((p) => (p - 1 + displayPhotos.length) % displayPhotos.length);
    },
    [displayPhotos.length]
  );

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setActive((p) => (p + 1) % displayPhotos.length);
    },
    [displayPhotos.length]
  );

  return (
    <>
      <div className="space-y-2">
        {/* Main photo */}
        <div
          className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-zoom-in shadow-lg group"
          onClick={() => setLightbox(true)}
        >
          <SafeImage
            src={displayPhotos[active]}
            alt={`${name} — photo ${active + 1}`}
            fill
            priority={active === 0}
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            blurDataURL={active === 0 ? blurDataURL : undefined}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm font-medium">
            {active + 1} / {displayPhotos.length}
          </div>

          {displayPhotos.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 text-xl font-light"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 text-xl font-light"
                aria-label="Next photo"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {displayPhotos.length > 1 && (
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {displayPhotos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden transition-all duration-200 ${
                  active === i
                    ? "ring-2 ring-brand-orange ring-offset-1 scale-105"
                    : "opacity-60 hover:opacity-90 hover:scale-105"
                }`}
                aria-label={`View photo ${i + 1}`}
              >
                <SafeImage
                  src={photo}
                  alt={`${name} photo ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {manifest?.imageCredits && (
          <p className="text-xs text-slate-400 text-right pr-1">
            Photos: {manifest.imageCredits}
          </p>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/96 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightbox(false)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
              <SafeImage
                src={displayPhotos[active]}
                alt={`${name} — photo ${active + 1}`}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>

            <button
              onClick={() => setLightbox(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white text-3xl transition-colors w-10 h-10 flex items-center justify-center"
              aria-label="Close lightbox"
            >
              ✕
            </button>

            {displayPhotos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(
                      (p) =>
                        (p - 1 + displayPhotos.length) % displayPhotos.length
                    );
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center text-2xl backdrop-blur-sm transition-all"
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive((p) => (p + 1) % displayPhotos.length);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center text-2xl backdrop-blur-sm transition-all"
                  aria-label="Next"
                >
                  ›
                </button>
                <div className="flex justify-center gap-2 mt-4">
                  {displayPhotos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === active
                          ? "bg-white scale-125"
                          : "bg-white/40 hover:bg-white/70"
                      }`}
                      aria-label={`Go to photo ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
