"use client";
import { useFavorites } from "@/hooks/useFavorites";
import type { FavoriteItem } from "@/types";

export default function FavoriteButton({ item }: { item: FavoriteItem }) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  if (!isLoaded) return null;

  const active = isFavorite(item.id, item.type);

  return (
    <button
      onClick={() => toggleFavorite(item)}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all w-full justify-center ${
        active
          ? "bg-pink-700 text-white hover:bg-pink-800"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}
      aria-label={active ? "Quitar de favoritos" : "Añadir a favoritos"}
    >
      {active ? "♥ Guardado" : "♡ Favorito"}
    </button>
  );
}
