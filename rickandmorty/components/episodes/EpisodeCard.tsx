import Link from "next/link";
import type { Episode } from "@/types";
import FavoriteButton from "@/components/ui/FavoriteButton";

export default function EpisodeCard({ episode }: { episode: Episode }) {
  const parts = episode.episode.match(/S(\d+)E(\d+)/);
  const season = parts ? `T${parseInt(parts[1], 10)}` : episode.episode;
  const epNum = parts ? `E${parseInt(parts[2], 10)}` : "";

  return (
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-600 transition-all hover:shadow-xl hover:shadow-blue-900/20 flex flex-col gap-3">
      <Link href={`/episodes/${episode.id}`} className="flex items-start gap-4">
        <div className="bg-blue-700 text-white rounded-lg px-3 py-2 text-center min-w-[56px] shrink-0">
          <div className="text-xs opacity-75">{season}</div>
          <div className="font-bold text-lg leading-tight">{epNum}</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-sm leading-snug hover:text-blue-400 transition-colors line-clamp-2">
            {episode.name}
          </h3>
          <p className="text-gray-400 text-xs mt-1">{episode.air_date}</p>
          <p className="text-gray-500 text-xs mt-1">
            👥 {episode.characters.length} personajes
          </p>
        </div>
      </Link>
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
  );
}
