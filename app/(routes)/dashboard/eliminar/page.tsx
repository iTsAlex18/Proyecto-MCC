/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Articulo = {
  documentId: string;
  title?: string;
  [key: string]: any;
};

const EliminarPage = () => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [documentId, setDocumentId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/`)
      .then((res) => res.json())
      .then((data) => setArticulos(data.data))
      .catch((err) => console.error("❌ Error al cargar artículos:", err));
  }, []);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentId) return alert("Selecciona o escribe el Document ID del artículo.");

    const token = localStorage.getItem("token");
    if (!token) return alert("Inicia sesión para eliminar.");

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts${documentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert(`✅ Artículo con Document ID ${documentId} eliminado correctamente.`);
        setDocumentId("");
        const refresh = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`);
        const updated = await refresh.json();
        setArticulos(updated.data);
      } else {
        const error = await res.json();
        console.error("❌ Error al eliminar:", error);
        alert("❌ No se pudo eliminar el artículo.");
      }
    } catch (err) {
      console.error("❌ Error de red:", err);
      alert("❌ Error de conexión al servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-yellow-100 p-6">
      <form
        onSubmit={handleDelete}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl flex flex-col gap-6"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center">🗑️ Eliminar Artículo</h1>

        <select
          className="p-4 border rounded-md focus:ring-2 focus:ring-red-400 bg-white text-black"
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
        >
          <option value="">Selecciona un artículo por título</option>
          {articulos.map((art) => (
            <option key={art.documentId} value={art.documentId}>
              {art.title || "Sin título"} (Document ID: {art.documentId})
            </option>
          ))}
        </select>

        <p className="text-center text-gray-500">O escribe directamente el Document ID</p>

        <input
          type="text"
          placeholder="Document ID del artículo"
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
          className="p-4 border rounded-md focus:ring-2 focus:ring-red-400 bg-white "
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-red-400 to-pink-500 text-white py-3 rounded-md font-bold hover:scale-105 transition-all"
        >
          {loading ? "Eliminando..." : "Eliminar"}
        </button>
      </form>

      {/* Botón para volver al dashboard */}
      <button
        onClick={() => router.push("/dashboard")}
        className="mt-6 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
      >
        ⬅️ Volver al Dashboard
      </button>
    </div>
  );
};

export default EliminarPage;


