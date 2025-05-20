/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Registramos elementos para gráficas de barras
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const GraficasLikes = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [datosOriginales, setDatosOriginales] = useState<any>(null);
  const [mesSeleccionado, setMesSeleccionado] = useState("Todos");
  const [totalLikes, setTotalLikes] = useState(0);
  const [promedioMensual, setPromedioMensual] = useState(0);
  const [actualizado, setActualizado] = useState(false);
  const [key, setKey] = useState(0);
  const [error, setError] = useState("");
  const chartRef = useRef<HTMLDivElement>(null);

  const cargarDatos = () => {
    setError("");
    const token = localStorage.getItem("token");
    if (!token) {
      setError("❌ Acceso no autorizado. Inicia sesión para ver esta gráfica.");
      return;
    }

    fetch("http://localhost:1337/api/likes/resumen-mensual", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject("No autorizado")))
      .then((res) => {
        console.log("📦 Datos recibidos:", res);

        const resumen: Record<string, number> = {};
        res.months.forEach((mes: string, i: number) => {
          resumen[mes] = res.counts[i];
        });

        const labels = Object.keys(resumen);
        const data = Object.values(resumen);

        const dataset = {
          label: "Likes por mes",
          data,
          backgroundColor: "#FDBA74",
          borderColor: "#EA580C",
          borderWidth: 1,
        };

        setDatosOriginales({ labels, datasets: [dataset] });

        const total = data.reduce((acc, val) => acc + val, 0);
        const promedio = data.length ? Math.round(total / data.length) : 0;
        setTotalLikes(total);
        setPromedioMensual(promedio);

        if (mesSeleccionado !== "Todos") {
          const index = labels.indexOf(mesSeleccionado);
          setChartData({
            labels: [mesSeleccionado],
            datasets: [{ ...dataset, data: [data[index]] }],
          });
        } else {
          setChartData({ labels, datasets: [dataset] });
        }

        setActualizado(true);
        setKey((prev) => prev + 1);
        setTimeout(() => setActualizado(false), 3000);
      })
      .catch((err) => {
        console.error(err);
        setError("❌ No se pudieron cargar los datos. Verifica tu conexión o permisos.");
      });
  };

  useEffect(() => {
    cargarDatos();
    const intervalo = setInterval(cargarDatos, 60000);
    return () => clearInterval(intervalo);
  }, [mesSeleccionado]);

  const exportPDF = () => {
    if (!chartRef.current) return;
    const mes = mesSeleccionado !== "Todos" ? mesSeleccionado : "todos";
    const año = new Date().getFullYear();

    html2canvas(chartRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`likes-${mes}-${año}.pdf`);
    });
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user?.username || user?.documentId || "Usuario";

  if (username !== "Perlagabmerazc") {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-red-600">
        ⛔ Acceso restringido. Esta sección es solo para la dirección del museo.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">📊 Likes por Mes</h1>

      <div className="flex justify-center mb-6">
        <select
          value={mesSeleccionado}
          onChange={(e) => setMesSeleccionado(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="Todos">Todos los meses</option>
          {datosOriginales?.labels?.map((mes: string) => (
            <option key={mes} value={mes}>
              {mes}
            </option>
          ))}
        </select>
      </div>

      {actualizado && (
        <div className="text-center text-green-600 font-semibold mb-4 animate-pulse">
          📊 Datos actualizados
        </div>
      )}

      {error && (
        <div className="text-center text-red-600 font-semibold mb-4">{error}</div>
      )}

      <div
        className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg"
        ref={chartRef}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🏛️ Museo de la Lucha Obrera Cananea, Son.
        </h2>

        {chartData ? (
          chartData.datasets[0].data.length === 0 ? (
            <p className="text-center text-gray-400 mb-4">
              No hay likes registrados todavía.
            </p>
          ) : (
            <Bar key={key} data={chartData} />
          )
        ) : (
          <p className="text-center text-gray-500">Cargando datos...</p>
        )}

        <div className="text-center mt-4 text-gray-700 font-semibold">
          Total anual: {totalLikes} likes
        </div>
        <div className="text-center mt-1 text-gray-600">
          Promedio mensual: {promedioMensual} likes
        </div>
        <div className="text-center mt-4 text-gray-500 text-sm">
          Exportado por: {username}
          <br />
          Fecha:{" "}
          {new Date().toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={exportPDF}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Exportar a PDF
        </button>
      </div>
    </div>
  );
};

export default GraficasLikes;



