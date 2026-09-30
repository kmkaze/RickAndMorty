import type { Metadata } from "next";
import { Suspense } from "react";
import { getEpisodes } from "@/lib/api/episodes";
import EpisodeCard from "@/components/episodes/EpisodeCard";
import EpisodeFilters from "@/components/episodes/EpisodeFilters";
import Pagination from "@/components/ui/Pagination";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export const metadata: Metadata = { title: "Episodios" };

interface Props {
  searchParams: Promise<{ name?: string; page?: string }>;
}

export default async function EpisodesPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const { info, results } = await getEpisodes({ name: params.name, page });

  const spRecord: Record<string, string> = {};
  if (params.name) spRecord.name = params.name;
  if (params.page) spRecord.page = params.page;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-1">Episodios</h1>
      <p className="text-gray-400 mb-6 text-sm">
        {info.count > 0 ? `${info.count} episodios encontrados` : "Sin resultados"}
      </p>

      <Suspense fallback={<LoadingSpinner text="Cargando filtros..." />}>
        <EpisodeFilters />
      </Suspense>

      {results.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-6xl mb-4">🔍</p>
          <p className="text-gray-400 text-lg">
            No se encontraron episodios con esos filtros.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {results.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={info.pages}
        basePath="/episodes"
        searchParams={spRecord}
      />
    </div>
  );
}
