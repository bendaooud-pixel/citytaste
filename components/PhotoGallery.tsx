"use client";
import Image from "next/image";
import { useState } from "react";

interface PhotoGalleryProps {
  photos: string[];
  name: string;
}

const FALLBACK_PHOTO = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80";

export default function PhotoGallery({ photos, name }: PhotoGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const displayPhotos = photos.length > 0 ? photos : [FALLBACK_PHOTO];

  return (
    <>
      <div className="space-y-2">
        {/* Main photo */}
        <div
          className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-zoom-in shadow-lg"
          onClick={() => setLightbox(true)}
        >
          <Image
            src={displayPhotos[active]}
            alt={`${name} — photo ${active + 1}`}
            fill
            priority={active === 0}
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover transition-opacity duration-300"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80'; }}
          />
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {active + 1} / {displayPhotos.length}
          </div>

          {/* Prev/Next */}
          {displayPhotos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setActive((p) => (p - 1 + displayPhotos.length) % displayPhotos.length); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setActive((p) => (p + 1) % displayPhotos.length); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {displayPhotos.length > 1 && (
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {displayPhotos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden transition-all ${
                  active === i
                    ? "ring-2 ring-brand-orange ring-offset-1 opacity-100"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={photo}
                  alt={`${name} photo ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80'; }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <div className="relative max-w-5xl w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src={displayPhotos[active]}
                alt={`${name} — photo ${active + 1}`}
                fill
                sizes="90vw"
                className="object-contain"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80'; }}
              />
            </div>
            <button
              onClick={() => setLightbox(false)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-slate-300"
            >
              ✕
            </button>
            {displayPhotos.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {displayPhotos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === active ? "bg-white" : "bg-white/40"}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
