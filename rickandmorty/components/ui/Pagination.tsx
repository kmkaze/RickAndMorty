import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
}

function href(
  basePath: string,
  page: number,
  searchParams: Record<string, string>
): string {
  const params = new URLSearchParams({ ...searchParams, page: String(page) });
  return `${basePath}?${params.toString()}`;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
}: Props) {
  if (totalPages <= 1) return null;

  const rest = Object.fromEntries(
    Object.entries(searchParams).filter(([k]) => k !== "page")
  );

  const pages: (number | "…")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 2 && i <= currentPage + 2)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  const linkCls =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors select-none";

  return (
    <nav
      className="flex items-center justify-center gap-1 mt-10 flex-wrap"
      aria-label="Paginación"
    >
      <Link
        href={href(basePath, Math.max(1, currentPage - 1), rest)}
        aria-disabled={currentPage === 1}
        className={`${linkCls} ${
          currentPage === 1
            ? "bg-gray-800 text-gray-600 pointer-events-none"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        ← Anterior
      </Link>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-2 py-2 text-gray-500 text-sm">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={href(basePath, p, rest)}
            className={`${linkCls} ${
              p === currentPage
                ? "bg-green-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {p}
          </Link>
        )
      )}

      <Link
        href={href(basePath, Math.min(totalPages, currentPage + 1), rest)}
        aria-disabled={currentPage === totalPages}
        className={`${linkCls} ${
          currentPage === totalPages
            ? "bg-gray-800 text-gray-600 pointer-events-none"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        Siguiente →
      </Link>
    </nav>
  );
}
