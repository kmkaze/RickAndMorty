import type { ApiResponse, Character, CharacterFilters } from "@/types";

const BASE = "https://rickandmortyapi.com/api";

export async function getCharacters(
  filters: CharacterFilters = {}
): Promise<ApiResponse<Character>> {
  const params = new URLSearchParams();
  if (filters.name) params.set("name", filters.name);
  if (filters.status) params.set("status", filters.status);
  if (filters.species) params.set("species", filters.species);
  if (filters.gender) params.set("gender", filters.gender);
  if (filters.page && filters.page > 1) params.set("page", String(filters.page));

  const qs = params.toString();
  const url = `${BASE}/character${qs ? `?${qs}` : ""}`;
  const res = await fetch(url, { cache: "no-store" });

  if (res.status === 404) {
    return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
  }
  if (!res.ok) throw new Error(`Error fetching characters: ${res.status}`);
  return res.json();
}

export async function getCharacterById(id: string | number): Promise<Character> {
  const res = await fetch(`${BASE}/character/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Character not found: ${id}`);
  return res.json();
}

export async function getMultipleCharacters(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) return [];
  const res = await fetch(`${BASE}/character/${ids.join(",")}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}
