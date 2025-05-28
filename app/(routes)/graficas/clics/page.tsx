"use client";
import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartData,
} from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const GraficasClics = () => {
  const [chartData, setChartData] = useState<ChartData<"bar"> | null>(null);
  const [error, setError] = useState("");
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/section-clicks/resumen`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Datos inválidos");

        const labels = data.map((item) => item.section);
        const clicks = data.map((item) => item.clicks);

        const dataset = {
          label: "Clics por sección",
          data: clicks,
          backgroundColor: "#93C5FD",
          borderColor: "#3B82F6",
          borderWidth: 1,
        };

        setChartData({ labels, datasets: [dataset] });
      })
      .catch((err) => {
        console.error("❌ Error al cargar clics:", err);
        setError("No se pudieron cargar los clics.");
      });
  }, []);

  const exportarPDF = () => {
    if (!chartRef.current) return;

    html2canvas(chartRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`clics-${new Date().toISOString().slice(0, 10)}.pdf`);
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {error && (
        <p className="text-center text-red-500 font-semibold mb-4">{error}</p>
      )}

      <div ref={chartRef}>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🖱️ Clics por Sección
        </h2>

        {chartData ? (
          chartData.datasets[0].data.length === 0 ? (
            <p className="text-center text-gray-400 mb-4">
              No hay clics registrados todavía.
            </p>
          ) : (
            <Bar data={chartData} />
          )
        ) : (
          <p className="text-center text-gray-500">Cargando datos...</p>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={exportarPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Exportar a PDF
        </button>
      </div>
    </div>
  );
};

export default GraficasClics;
