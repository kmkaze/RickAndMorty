import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getLocationById } from "@/lib/api/locations";
import { getMultipleCharacters } from "@/lib/api/characters";
import FavoriteButton from "@/components/ui/FavoriteButton";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const location = await getLocationById(id);
    return { title: location.name };
  } catch {
    return { title: "Localización no encontrada" };
  }
}

function extractId(url: string): number {
  const parts = url.split("/");
  return Number(parts[parts.length - 1]);
}

export default async function LocationDetailPage({ params }: Props) {
  const { id } = await params;
  let location;
  try {
    location = await getLocationById(id);
  } catch {
    notFound();
  }

  const residentIds = location.residents.slice(0, 12).map(extractId);
  const residents = await getMultipleCharacters(residentIds);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/locations"
        className="text-gray-400 hover:text-purple-400 transition-colors text-sm mb-6 inline-flex items-center gap-1"
      >
        ← Volver a localizaciones
      </Link>

      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 mt-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          {location.name}
        </h1>
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="bg-purple-950 text-purple-300 border border-purple-800 rounded-full px-3 py-1 text-sm">
            📍 {location.type || "Sin tipo"}
          </span>
          <span className="bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-full px-3 py-1 text-sm">
            🌌 {location.dimension || "Dimensión desconocida"}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          👤 {location.residents.length} residentes registrados
        </p>
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

      {residents.length > 0 && (
        <>
          <h2 className="text-white font-bold text-xl mb-4">
            Residentes
            <span className="text-gray-500 font-normal text-sm ml-2">
              ({location.residents.length} total · mostrando {residents.length})
            </span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {residents.map((c) => (
              <Link
                key={c.id}
                href={`/characters/${c.id}`}
                className="group text-center"
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  width={150}
                  height={150}
                  className="rounded-xl w-full aspect-square object-cover mb-2 group-hover:ring-2 ring-purple-500 transition-all"
                />
                <p className="text-white text-xs font-semibold group-hover:text-purple-400 transition-colors leading-tight">
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
