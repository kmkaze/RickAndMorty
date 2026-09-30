import type { Metadata } from "next";
import { Suspense } from "react";
import { getLocations } from "@/lib/api/locations";
import LocationCard from "@/components/locations/LocationCard";
import LocationFilters from "@/components/locations/LocationFilters";
import Pagination from "@/components/ui/Pagination";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export const metadata: Metadata = { title: "Localizaciones" };

interface Props {
  searchParams: Promise<{ name?: string; page?: string }>;
}

export default async function LocationsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const { info, results } = await getLocations({ name: params.name, page });

  const spRecord: Record<string, string> = {};
  if (params.name) spRecord.name = params.name;
  if (params.page) spRecord.page = params.page;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-1">Localizaciones</h1>
      <p className="text-gray-400 mb-6 text-sm">
        {info.count > 0
          ? `${info.count} localizaciones encontradas`
          : "Sin resultados"}
      </p>

      <Suspense fallback={<LoadingSpinner text="Cargando filtros..." />}>
        <LocationFilters />
      </Suspense>

      {results.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-6xl mb-4">🔍</p>
          <p className="text-gray-400 text-lg">No se encontraron localizaciones.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {results.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={info.pages}
        basePath="/locations"
        searchParams={spRecord}
      />
    </div>
  );
}
