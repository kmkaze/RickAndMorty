import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "404 · Página no encontrada" };

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <p className="text-8xl mb-6">🧬</p>
      <h1 className="text-4xl font-bold text-white mb-3">
        404 · Dimensión no encontrada
      </h1>
      <p className="text-gray-400 mb-10 text-lg max-w-md mx-auto">
        Esta página no existe en ninguna dimensión conocida del multiverso.
      </p>
      <Link
        href="/"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
