"use client";
import { useEffect, useState } from "react";

type Seccion = {
  section: string;
  clicks: number;
};

const TopSecciones = () => {
  const [secciones, setSecciones] = useState<Seccion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/section-clicks/top5`)
      .then((res) => res.json())
      .then((data) => {
        setSecciones(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar el Top 5:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto mt-10 border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-rose-700 mb-6">
        🏆 Top 5 Secciones Más Vistas
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Cargando...</p>
      ) : secciones.length === 0 ? (
        <p className="text-center text-gray-400 italic">No hay datos todavía.</p>
      ) : (
        <ol className="list-decimal list-inside space-y-3">
          {secciones.map((item, index) => (
            <li key={index} className="text-lg text-gray-800">
              <span className="font-semibold">{item.section}</span>{" "}
              — <span className="text-rose-600 font-medium">{item.clicks} clics</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default TopSecciones;