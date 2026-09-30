import type { Metadata } from "next";
import FavoritesList from "@/components/favorites/FavoritesList";

export const metadata: Metadata = { title: "Mis Favoritos" };

export default function FavoritesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-1">★ Mis Favoritos</h1>
      <p className="text-gray-400 mb-8 text-sm">
        Los elementos que guardaste en tu navegador.
      </p>
      <FavoritesList />
    </div>
  );
}
