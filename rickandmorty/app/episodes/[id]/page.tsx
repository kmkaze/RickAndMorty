import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getEpisodeById } from "@/lib/api/episodes";
import { getMultipleCharacters } from "@/lib/api/characters";
import FavoriteButton from "@/components/ui/FavoriteButton";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const episode = await getEpisodeById(id);
    return { title: `${episode.episode} · ${episode.name}` };
  } catch {
    return { title: "Episodio no encontrado" };
  }
}

function extractId(url: string): number {
  const parts = url.split("/");
  return Number(parts[parts.length - 1]);
}

export default async function EpisodeDetailPage({ params }: Props) {
  const { id } = await params;
  let episode;
  try {
    episode = await getEpisodeById(id);
  } catch {
    notFound();
  }

  const charIds = episode.characters.slice(0, 12).map(extractId);
  const characters = await getMultipleCharacters(charIds);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/episodes"
        className="text-gray-400 hover:text-blue-400 transition-colors text-sm mb-6 inline-flex items-center gap-1"
      >
        ← Volver a episodios
      </Link>

      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 mt-4 mb-8">
        <span className="text-blue-400 font-mono text-sm block mb-2">
          {episode.episode}
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          {episode.name}
        </h1>
        <p className="text-gray-400 mb-4">📅 {episode.air_date}</p>
        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-gray-400 text-sm">
            👥 {episode.characters.length} personajes
          </span>
          <FavoriteButton
            item={{
              id: episode.id,
              name: episode.name,
              image: "",
              type: "episode",
              subtitle: episode.episode,
            }}
          />
        </div>
      </div>

      {characters.length > 0 && (
        <>
          <h2 className="text-white font-bold text-xl mb-4">
            Personajes
            <span className="text-gray-500 font-normal text-sm ml-2">
              ({episode.characters.length} total · mostrando {characters.length})
            </span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {characters.map((c) => (
              <Link key={c.id} href={`/characters/${c.id}`} className="group text-center">
                <Image
                  src={c.image}
                  alt={c.name}
                  width={150}
                  height={150}
                  className="rounded-xl w-full aspect-square object-cover mb-2 group-hover:ring-2 ring-blue-500 transition-all"
                />
                <p className="text-white text-xs font-semibold group-hover:text-blue-400 transition-colors leading-tight">
                  {c.name}
                </p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
