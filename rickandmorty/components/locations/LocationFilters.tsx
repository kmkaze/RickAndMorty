"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SearchBox from "@/components/ui/SearchBox";

export default function LocationFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasFilters = searchParams.toString().length > 0;

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBox placeholder="Buscar localización..." paramKey="name" />
        </div>
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
