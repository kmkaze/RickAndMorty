import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/types";
import StatusBadge from "@/components/ui/StatusBadge";
import FavoriteButton from "@/components/ui/FavoriteButton";

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-green-600 transition-all hover:shadow-xl hover:shadow-green-900/20 hover:-translate-y-0.5 flex flex-col group">
      <Link href={`/characters/${character.id}`} className="block relative overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <StatusBadge status={character.status} />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <Link href={`/characters/${character.id}`}>
          <h3 className="text-white font-bold text-base leading-tight group-hover:text-green-400 transition-colors line-clamp-1">
            {character.name}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm">{character.species}</p>
        <p className="text-gray-500 text-xs truncate">📍 {character.location.name}</p>
        <div className="mt-auto pt-2">
          <FavoriteButton
            item={{
              id: character.id,
              name: character.name,
              image: character.image,
              type: "character",
              subtitle: character.species,
            }}
          />
        </div>
      </div>
    </div>
  );
}
