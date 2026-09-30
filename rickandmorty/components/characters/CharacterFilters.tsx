"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SearchBox from "@/components/ui/SearchBox";

export default function CharacterFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") ?? "";
  const currentGender = searchParams.get("gender") ?? "";
  const hasFilters = searchParams.toString().length > 0;

  const set = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mb-6">
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="flex-1 min-w-48">
          <SearchBox placeholder="Buscar personaje..." paramKey="name" />
        </div>

        <select
          value={currentStatus}
          onChange={(e) => set("status", e.target.value)}
          className="bg-gray-700 text-gray-300 border border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500"
        >
          <option value="">Estado</option>
          <option value="alive">Vivo</option>
          <option value="dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>

        <select
          value={currentGender}
          onChange={(e) => set("gender", e.target.value)}
          className="bg-gray-700 text-gray-300 border border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-500"
        >
          <option value="">Género</option>
          <option value="female">Femenino</option>
          <option value="male">Masculino</option>
          <option value="genderless">Sin género</option>
          <option value="unknown">Desconocido</option>
        </select>

        {hasFilters && (
          <button
            onClick={() => router.push(pathname)}
            className="bg-gray-700 text-gray-400 border border-gray-600 rounded-lg px-3 py-2.5 text-sm hover:bg-gray-600 hover:text-white transition-colors"
          >
            × Limpiar
          </button>
        )}
      </div>
    </div>
  );
}
