import Link from "next/link";
import type { Location } from "@/types";
import FavoriteButton from "@/components/ui/FavoriteButton";

export default function LocationCard({ location }: { location: Location }) {
  return (
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-600 transition-all hover:shadow-xl hover:shadow-purple-900/20 flex flex-col gap-3">
      <Link href={`/locations/${location.id}`}>
        <h3 className="text-white font-bold text-lg hover:text-purple-400 transition-colors line-clamp-1 mb-2">
          {location.name}
        </h3>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="bg-purple-950 text-purple-300 border border-purple-800 rounded-full px-2.5 py-0.5 text-xs">
            {location.type || "Sin tipo"}
          </span>
          <span className="bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-full px-2.5 py-0.5 text-xs line-clamp-1">
            {location.dimension || "Dimensión desconocida"}
          </span>
        </div>
        <p className="text-gray-500 text-xs">👤 {location.residents.length} residentes</p>
      </Link>
      <FavoriteButton
        item={{
          id: location.id,
          name: location.name,
          image: "",
          type: "location",
          subtitle: location.type,
        }}
      />
    </div>
  );
}
