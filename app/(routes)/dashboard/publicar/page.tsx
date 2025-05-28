/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // 👈 Importa router

const PublicarPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const router = useRouter(); // 👈 Usa router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Inicia sesión para publicar");

    try {
      let mediaId = null;
      if (media) {
        const form = new FormData();
        form.append("files", media);
        const upload = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        });
        const result = await upload.json();
        mediaId = result?.[0]?.id;
      }

      const post = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            title,
            content,
            media: mediaId ? [mediaId] : [],
          },
        }),
      });

      if (post.ok) {
        alert("✅ Artículo publicado");
        setTitle("");
        setContent("");
        setMedia(null);
      } else {
        const err = await post.json();
        alert("❌ Error: " + err?.error?.message || "Error desconocido");
      }
    } catch (err) {
      alert("❌ Error al conectar con el servidor.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xl flex flex-col gap-4"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">➕ Publicar Artículo</h1>

        <input
          type="text"
          placeholder="Título del artículo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 text-gray-700 bg-white"
          required
        />

        <textarea
          placeholder="Contenido del artículo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border rounded-md h-40 resize-none focus:ring-2 focus:ring-blue-400 text-gray-700 bg-white"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setMedia(e.target.files?.[0] || null)}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-400 text-gray-900"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-md font-bold hover:scale-105 transition-all"
        >
          Publicar
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

export default PublicarPage;
