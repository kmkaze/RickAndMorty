import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold mb-3 text-lg">🧬 Rick &amp; Morty</h3>
            <p className="text-sm leading-relaxed">
              Explora el universo multidimensional de Rick and Morty.
              Personajes, episodios y localizaciones de la serie.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Secciones</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/characters" className="hover:text-green-400 transition-colors">
                  Personajes
                </Link>
              </li>
              <li>
                <Link href="/episodes" className="hover:text-green-400 transition-colors">
                  Episodios
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-green-400 transition-colors">
                  Localizaciones
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-green-400 transition-colors">
                  Favoritos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Datos</h4>
            <p className="text-sm">
              Proporcionados por{" "}
              <a
                href="https://rickandmortyapi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:underline"
              >
                rickandmortyapi.com
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>© 2025 Rick &amp; Morty Universe · Proyecto académico</p>
        </div>
      </div>
    </footer>
  );
}
