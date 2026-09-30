import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Inicio" };

const SECTIONS = [
  {
    href: "/characters",
    emoji: "🧑",
    title: "Personajes",
    description: "Más de 800 personajes del universo de Rick and Morty.",
    border: "hover:border-green-600 hover:shadow-green-900/30",
  },
  {
    href: "/episodes",
    emoji: "📺",
    title: "Episodios",
    description: "Todos los episodios de todas las temporadas de la serie.",
    border: "hover:border-blue-600 hover:shadow-blue-900/30",
  },
  {
    href: "/locations",
    emoji: "🌍",
    title: "Localizaciones",
    description: "Planetas, dimensiones y lugares del multiverso.",
    border: "hover:border-purple-600 hover:shadow-purple-900/30",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 py-24 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-5 tracking-tight">
          🧬 Rick &amp; Morty
          <br />
          <span className="text-green-400">Universe</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Explora el universo multidimensional de Rick and Morty.
          Descubre personajes, episodios y localizaciones.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/characters"
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-xl text-base transition-colors"
          >
            Explorar personajes →
          </Link>
          <Link
            href="/favorites"
            className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-3.5 rounded-xl text-base transition-colors"
          >
            ★ Mis favoritos
          </Link>
        </div>
      </section>

      {/* Secciones */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-white text-3xl font-bold text-center mb-12">
          ¿Qué quieres explorar?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`bg-gray-800 border border-gray-700 rounded-2xl p-10 text-center transition-all hover:shadow-2xl hover:-translate-y-1 ${s.border}`}
            >
              <div className="text-6xl mb-5">{s.emoji}</div>
              <h3 className="text-white text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {s.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Favoritos */}
      <section className="bg-gray-900 border-t border-gray-800 py-20 px-4 text-center">
        <h2 className="text-white text-2xl font-bold mb-3">
          ★ Sistema de Favoritos
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
          Guarda tus personajes, episodios y localizaciones favoritas.
          Se almacenan en tu navegador automáticamente.
        </p>
        <Link
          href="/favorites"
          className="border border-gray-600 hover:border-green-600 text-gray-300 hover:text-white px-6 py-3 rounded-xl transition-colors"
        >
          Ver mis favoritos →
        </Link>
      </section>
    </div>
  );
}
