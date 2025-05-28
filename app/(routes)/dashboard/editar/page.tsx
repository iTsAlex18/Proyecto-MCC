/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // 👈 Importa useRouter

type Articulo = {
  documentId: string;
  title?: string;
  // agrega otros campos si es necesario
};

const EditarArticulo = () => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [documentId, setDocumentId] = useState("");
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevoContenido, setNuevoContenido] = useState("");
  const [nuevaMedia, setNuevaMedia] = useState<File | null>(null);
  const router = useRouter(); // 👈 Usa useRouter

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts?populate=*`)
      .then((res) => res.json())
      .then((data) => setArticulos(data.data))
      .catch((err) => console.error("❌ Error al cargar artículos:", err));
  }, []);

  const handleEditar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentId) return alert("Selecciona un artículo.");
    const token = localStorage.getItem("token");
    if (!token) return alert("Inicia sesión.");

    try {
      let mediaId = null;
      if (nuevaMedia) {
        const formData = new FormData();
        formData.append("files", nuevaMedia);

        const upload = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts?populate=*`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const result = await upload.json();
        mediaId = result[0]?.id;
      }

      const camposActualizados: any = {};
      if (nuevoTitulo) camposActualizados.title = nuevoTitulo;
      if (nuevoContenido) camposActualizados.content = nuevoContenido;
      if (mediaId) camposActualizados.media = [mediaId];

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: camposActualizados }),
      });

      if (res.ok) {
        alert("✅ Artículo actualizado");
        setDocumentId("");
        setNuevoTitulo("");
        setNuevoContenido("");
        setNuevaMedia(null);
      } else {
        const error = await res.json();
        console.error("❌ Error al actualizar:", error);
        alert("❌ No se pudo actualizar.");
      }
    } catch (error) {
      console.error("❌ Error de red:", error);
      alert("❌ Error de conexión al servidor.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-blue-100 via-pink-100 to-yellow-100 flex flex-col items-center justify-center">
      <form
        onSubmit={handleEditar}
        className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-xl flex flex-col gap-4"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">✏️ Editar Artículo</h1>

        <select
        value={documentId}
        onChange={(e) => setDocumentId(e.target.value)}
        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-400 bg-white text-black"
        >
          <option value="">Selecciona un artículo</option>
          {articulos.map((post) => (
            <option key={post.documentId} value={post.documentId}>
              {post.title || "Sin título"} (ID: {post.documentId})
            </option>
          ))}
          </select>

        <input
          type="text"
          placeholder="Nuevo título (opcional)"
          value={nuevoTitulo}
          onChange={(e) => setNuevoTitulo(e.target.value)}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-400 bg-white text-black"
        />

        <textarea
          placeholder="Nuevo contenido (opcional)"
          value={nuevoContenido}
          onChange={(e) => setNuevoContenido(e.target.value)}
          className="w-full p-3 border rounded-md h-40 resize-none focus:ring-2 focus:ring-indigo-400 bg-white text-black"
        />

        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setNuevaMedia(e.target.files?.[0] || null)}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-400 text-black"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-md font-bold hover:scale-105 transition-all"
        >
          Guardar Cambios
        </button>
      </form>

      {/* Botón para volver al dashboard */}
      <button
        onClick={() => router.push("/dashboard")}
        className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
      >
        ⬅️ Volver al Dashboard
      </button>
    </div>
  );
};

export default EditarArticulo;


