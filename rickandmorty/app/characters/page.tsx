import type { Metadata } from "next";
import { Suspense } from "react";
import { getCharacters } from "@/lib/api/characters";
import CharacterCard from "@/components/characters/CharacterCard";
import CharacterFilters from "@/components/characters/CharacterFilters";
import Pagination from "@/components/ui/Pagination";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export const metadata: Metadata = { title: "Personajes" };

interface Props {
  searchParams: Promise<{
    name?: string;
    status?: string;
    gender?: string;
    page?: string;
  }>;
}

export default async function CharactersPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const { info, results } = await getCharacters({
    name: params.name,
    status: params.status,
    gender: params.gender,
    page,
  });

  const spRecord: Record<string, string> = {};
  if (params.name) spRecord.name = params.name;
  if (params.status) spRecord.status = params.status;
  if (params.gender) spRecord.gender = params.gender;
  if (params.page) spRecord.page = params.page;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-1">Personajes</h1>
      <p className="text-gray-400 mb-6 text-sm">
        {info.count > 0 ? `${info.count} personajes encontrados` : "Sin resultados"}
      </p>

      <Suspense fallback={<LoadingSpinner text="Cargando filtros..." />}>
        <CharacterFilters />
      </Suspense>

      {results.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-6xl mb-4">🔍</p>
          <p className="text-gray-400 text-lg">
            No se encontraron personajes con esos filtros.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {results.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={info.pages}
        basePath="/characters"
        searchParams={spRecord}
      />
    </div>
  );
}
