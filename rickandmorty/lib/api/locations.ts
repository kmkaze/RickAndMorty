import type { ApiResponse, Location, LocationFilters } from "@/types";

const BASE = "https://rickandmortyapi.com/api";

export async function getLocations(
  filters: LocationFilters = {}
): Promise<ApiResponse<Location>> {
  const params = new URLSearchParams();
  if (filters.name) params.set("name", filters.name);
  if (filters.type) params.set("type", filters.type);
  if (filters.dimension) params.set("dimension", filters.dimension);
  if (filters.page && filters.page > 1) params.set("page", String(filters.page));

  const qs = params.toString();
  const url = `${BASE}/location${qs ? `?${qs}` : ""}`;
  const res = await fetch(url, { cache: "no-store" });

  if (res.status === 404) {
    return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
  }
  if (!res.ok) throw new Error(`Error fetching locations: ${res.status}`);
  return res.json();
}

export async function getLocationById(id: string | number): Promise<Location> {
  const res = await fetch(`${BASE}/location/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Location not found: ${id}`);
  return res.json();
}
