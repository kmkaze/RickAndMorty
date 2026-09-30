"use client";
import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/hooks/useFavorites";
import type { FavoriteItem } from "@/types";

const TYPE_PATH: Record<FavoriteItem["type"], string> = {
  character: "characters",
  episode: "episodes",
  location: "locations",
};

const TYPE_LABEL: Record<FavoriteItem["type"], string> = {
  character: "Personaje",
  episode: "Episodio",
  location: "Localización",
};

const TYPE_EMOJI: Record<FavoriteItem["type"], string> = {
  character: "🧑",
  episode: "📺",
  location: "🌍",
};

export default function FavoritesList() {
  const { favorites, toggleFavorite, isLoaded } = useFavorites();

  if (!isLoaded) {
    return (
      <div className="text-center py-20 text-gray-400">
        Cargando favoritos...
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-7xl mb-4">🤍</p>
        <h2 className="text-white text-2xl font-bold mb-2">No tienes favoritos</h2>
        <p className="text-gray-400 mb-8">
          Explora personajes, episodios y localizaciones para añadir a favoritos.
        </p>
        <Link
          href="/characters"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          Explorar personajes →
        </Link>
      </div>
    );
  }

  const grouped = favorites.reduce(
    (acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    },
    {} as Record<FavoriteItem["type"], FavoriteItem[]>
  );

  return (
    <div className="space-y-10">
      {(Object.keys(grouped) as FavoriteItem["type"][]).map((type) => (
        <section key={type}>
          <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            {TYPE_EMOJI[type]} {TYPE_LABEL[type]}s
            <span className="bg-gray-700 text-gray-400 rounded-full px-2 py-0.5 text-sm font-normal">
              {grouped[type].length}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {grouped[type].map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden flex flex-col hover:border-gray-600 transition-colors"
              >
                {item.image && (
                  <Link href={`/${TYPE_PATH[item.type]}/${item.id}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={200}
                      className="w-full aspect-video object-cover hover:opacity-90 transition-opacity"
                    />
                  </Link>
                )}
                <div className="p-3 flex flex-col flex-1 gap-2">
                  <Link href={`/${TYPE_PATH[item.type]}/${item.id}`}>
                    <p className="text-white font-semibold text-sm hover:text-green-400 transition-colors leading-tight">
                      {item.name}
                    </p>
                  </Link>
                  {item.subtitle && (
                    <p className="text-gray-500 text-xs">{item.subtitle}</p>
                  )}
                  <button
                    onClick={() => toggleFavorite(item)}
                    className="mt-auto text-xs text-red-400 hover:text-red-300 transition-colors text-left"
                  >
                    × Quitar de favoritos
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
