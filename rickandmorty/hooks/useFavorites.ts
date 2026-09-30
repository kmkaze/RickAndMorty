"use client";
import { useState, useEffect, useCallback } from "react";
import type { FavoriteItem } from "@/types";

const STORAGE_KEY = "rm-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
      // ignore corrupted data
    }
    setIsLoaded(true);
  }, []);

  const toggleFavorite = useCallback((item: FavoriteItem) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id && f.type === item.type);
      const updated = exists
        ? prev.filter((f) => !(f.id === item.id && f.type === item.type))
        : [...prev, item];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isFavorite = useCallback(
    (id: number, type: FavoriteItem["type"]) =>
      favorites.some((f) => f.id === id && f.type === type),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}
