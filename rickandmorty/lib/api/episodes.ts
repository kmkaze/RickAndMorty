import type { ApiResponse, Episode, EpisodeFilters } from "@/types";

const BASE = "https://rickandmortyapi.com/api";

export async function getEpisodes(
  filters: EpisodeFilters = {}
): Promise<ApiResponse<Episode>> {
  const params = new URLSearchParams();
  if (filters.name) params.set("name", filters.name);
  if (filters.episode) params.set("episode", filters.episode);
  if (filters.page && filters.page > 1) params.set("page", String(filters.page));

  const qs = params.toString();
  const url = `${BASE}/episode${qs ? `?${qs}` : ""}`;
  const res = await fetch(url, { cache: "no-store" });

  if (res.status === 404) {
    return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
  }
  if (!res.ok) throw new Error(`Error fetching episodes: ${res.status}`);
  return res.json();
}

export async function getEpisodeById(id: string | number): Promise<Episode> {
  const res = await fetch(`${BASE}/episode/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Episode not found: ${id}`);
  return res.json();
}
