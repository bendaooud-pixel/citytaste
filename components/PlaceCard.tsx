"use client";
import Link from "next/link";
import type { Place } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";
import StarRating from "./StarRating";
import FavoriteButton from "./FavoriteButton";
import RatingsBar from "./ui/RatingsBar";
import PlaceBadge from "./ui/PlaceBadge";
import PlaceImage from "./PlaceImage";
import { getBadges } from "@/lib/badges";
import { useLocale } from "@/lib/i18n";

interface PlaceCardProps {
  place: Place;
  compact?: boolean;
}

const PRICE_LABEL = ["", "$", "$$", "$$$", "$$$$"];

export default function PlaceCard({ place, compact = false }: PlaceCardProps) {
  const { t } = useLocale();
  const primaryCategory = CATEGORIES.find((c) => c.id === place.categories[0]);
  const badges = getBadges(place);

  return (
    <Link
      href={`/${place.citySlug}/${place.slug}`}
      className="group block"
    >
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border border-slate-100">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <PlaceImage
            place={place}
            variant="thumb"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Category badge */}
          {primaryCategory && (
            <div className="absolute top-3 left-3">
              <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                {primaryCategory.emoji} {t("categories." + place.categories[0])}
              </span>
            </div>
          )}

          {/* Rating badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-brand-orange text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-sm flex items-center gap-1">
              ★ {place.rating}
            </span>
          </div>

          {/* Favorite */}
          <div className="absolute bottom-3 right-3">
            <FavoriteButton placeId={place.id} size="sm" />
          </div>

          {/* Halal badge */}
          {place.isHalal && (
            <div className="absolute bottom-3 left-3">
              <span className="bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                🌙 {t("labels.halal")}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-slate-900 text-base leading-snug group-hover:text-brand-orange transition-colors">
              {place.name}
            </h3>
            <span className="text-slate-500 text-sm font-medium shrink-0">
              {PRICE_LABEL[place.priceLevel]}
            </span>
          </div>

          {badges.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {badges.slice(0, 2).map((b) => (
                <PlaceBadge key={b.id} badge={b} size="sm" />
              ))}
            </div>
          )}

          <div className="mt-1.5 flex items-center gap-2 flex-wrap">
            <StarRating rating={place.rating} size="sm" />
            <span className="text-slate-500 text-xs">
              {place.rating} ({place.reviewCount.toLocaleString()})
            </span>
            {place.ratings && (
              <RatingsBar ratings={place.ratings} variant="compact" />
            )}
          </div>

          {!compact && (
            <>
              <p className="mt-2 text-slate-500 text-xs flex items-center gap-1">
                <span>📍</span>
                <span className="truncate">{place.neighborhood}</span>
              </p>

              {/* Feature badges */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {place.isFamilyFriendly && (
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100">
                    👨‍👩‍👧 {t("labels.family")}
                  </span>
                )}
                {place.hasTerrace && (
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">
                    🌿 {t("labels.terrace")}
                  </span>
                )}
                {place.categories.includes("romantic") && (
                  <span className="text-xs bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full border border-rose-100">
                    💑 {t("labels.romantic")}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </article>
    </Link>
  );
}
