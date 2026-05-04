"use client";
import { useFavorites } from "@/lib/useFavorites";

interface FavoriteButtonProps {
  placeId: string;
  className?: string;
  size?: "sm" | "md";
}

export default function FavoriteButton({
  placeId,
  className = "",
  size = "md",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, hydrated } = useFavorites();
  const active = hydrated && isFavorite(placeId);

  const sizeClass = size === "sm" ? "w-8 h-8 text-base" : "w-10 h-10 text-lg";

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(placeId);
      }}
      aria-label={active ? "Remove from favourites" : "Add to favourites"}
      className={`${sizeClass} rounded-full flex items-center justify-center
        backdrop-blur-sm transition-all duration-200 active:scale-90
        ${active
          ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
          : "bg-white/80 text-slate-400 hover:text-rose-400 hover:bg-white shadow-md"
        } ${className}`}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}
