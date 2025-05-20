"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BuscarPage = () => {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState<any[]>([]);
  const [buscando, setBuscando] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return alert("Escribe algo para buscar.");

    setBuscando(true);
    try {
      const res = await fetch(
        `http://localhost:1337/api/posts?filters[$or][0][title][$containsi]=${encodeURIComponent(query)}&filters[$or][1][content][$containsi]=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResultados(data.data || []);
    } catch (error) {
      console.error("❌ Error al buscar:", error);
      alert("❌ No se pudo realizar la búsqueda.");
    } finally {
      setBuscando(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-yellow-100 p-6">
      <form
        onSubmit={handleSearch}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl flex flex-col gap-6 mb-10"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center">🔍 Buscar Artículo</h1>

        <input
          type="text"
          placeholder="Buscar por título o contenido"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-4 border rounded-md focus:ring-2 focus:ring-purple-400 bg-white text-black"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-400 to-blue-500 text-white py-3 rounded-md font-bold hover:scale-105 transition-all"
        >
          {buscando ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {/* Resultados */}
      <div className="w-full max-w-2xl space-y-4 mb-10">
        {resultados.length > 0 ? (
          resultados.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-lg shadow-md border"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
              <p className="text-gray-600 whitespace-pre-line">
                {post.content || "Sin contenido."}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                ID: {post.id}
              </p>
            </div>
          ))
        ) : buscando ? null : (
          <p className="text-gray-600 text-center">No hay resultados todavía.</p>
        )}
      </div>

      {/* Botón para volver al dashboard */}
      <button
        onClick={() => router.push("/dashboard")}
        className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
      >
        ⬅️ Volver al Dashboard
      </button>
    </div>
  );
};

export default BuscarPage;


