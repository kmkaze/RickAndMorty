import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCharacterById } from "@/lib/api/characters";
import { getEpisodeById } from "@/lib/api/episodes";
import StatusBadge from "@/components/ui/StatusBadge";
import FavoriteButton from "@/components/ui/FavoriteButton";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const character = await getCharacterById(id);
    return { title: character.name };
  } catch {
    return { title: "Personaje no encontrado" };
  }
}

function extractId(url: string): number {
  const parts = url.split("/");
  return Number(parts[parts.length - 1]);
}

export default async function CharacterDetailPage({ params }: Props) {
  const { id } = await params;
  let character;
  try {
    character = await getCharacterById(id);
  } catch {
    notFound();
  }

  const episodeIds = character.episode.slice(0, 6).map(extractId);
  const episodeResults = await Promise.allSettled(
    episodeIds.map((eid) => getEpisodeById(eid))
  );

  const INFO_ROWS = [
    { label: "Estado", value: character.status === "Alive" ? "Vivo" : character.status === "Dead" ? "Muerto" : "Desconocido" },
    { label: "Especie", value: character.species || "Desconocida" },
    { label: "Tipo", value: character.type || "Sin tipo" },
    { label: "Género", value: character.gender },
    { label: "Origen", value: character.origin.name },
    { label: "Última ubicación", value: character.location.name },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/characters"
        className="text-gray-400 hover:text-green-400 transition-colors text-sm mb-6 inline-flex items-center gap-1"
      >
        ← Volver a personajes
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        {/* Imagen */}
        <div className="md:col-span-1">
          <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 sticky top-24">
            <Image
              src={character.image}
              alt={character.name}
              width={400}
              height={400}
              className="w-full"
              priority
            />
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <StatusBadge status={character.status} />
                <span className="text-gray-500 text-sm">#{character.id}</span>
              </div>
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

        {/* Información */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-1">
              {character.name}
            </h1>
            <p className="text-gray-400 text-lg">
              {character.species} · {character.gender}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INFO_ROWS.map(({ label, value }) => (
              <div
                key={label}
                className="bg-gray-800 rounded-xl p-4 border border-gray-700"
              >
                <p className="text-gray-500 text-xs mb-1">{label}</p>
                <p className="text-white font-semibold">{value}</p>
              </div>
            ))}
          </div>

          {/* Episodios */}
          <div>
            <h2 className="text-white font-bold text-xl mb-4">
              Episodios
              <span className="text-gray-500 font-normal text-sm ml-2">
                ({character.episode.length} en total · mostrando 6)
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {episodeResults.map((result) => {
                if (result.status !== "fulfilled") return null;
                const ep = result.value;
                return (
                  <Link
                    key={ep.id}
                    href={`/episodes/${ep.id}`}
                    className="bg-gray-800 rounded-xl p-3 border border-gray-700 hover:border-blue-600 transition-colors"
                  >
                    <p className="text-blue-400 text-xs font-mono">{ep.episode}</p>
                    <p className="text-white text-sm font-semibold">{ep.name}</p>
                    <p className="text-gray-500 text-xs">{ep.air_date}</p>
                  </Link>
                );
              })}
            </div>
            {character.episode.length > 6 && (
              <p className="text-gray-500 text-sm mt-3">
                ... y {character.episode.length - 6} episodios más.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
