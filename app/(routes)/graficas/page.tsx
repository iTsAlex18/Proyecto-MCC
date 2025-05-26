"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GraficasLikes from "./likes/page";
import GraficasClics from "./clics/page";
import TopSecciones from "./top5/TopSecciones";

const GraficasMuseo = () => {
  const router = useRouter();
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para ver las gráficas");
      router.push("/login/director@");
    } else {
      setAutenticado(true);
    }
  }, [router]);

  if (!autenticado) return null;

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100">
      <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800">📊 Estadísticas del Museo</h1>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
        >
          ⬅️ Volver al Dashboard
        </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        <GraficasLikes />
        <GraficasClics />
        <TopSecciones />
      </div>
    </div>
  );
};

export default GraficasMuseo;