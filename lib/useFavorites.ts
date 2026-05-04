"use client";
import { useState, useEffect, useCallback } from "react";

const KEY = "citytaste-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  const toggleFavorite = useCallback((placeId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(placeId)
        ? prev.filter((id) => id !== placeId)
        : [...prev, placeId];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (placeId: string) => favorites.includes(placeId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite, hydrated };
}
