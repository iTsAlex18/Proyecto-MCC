"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-pink-100 to-yellow-200">
        <h1 className="text-2xl font-semibold animate-pulse text-gray-800">Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-200 via-pink-100 to-yellow-200 px-4 py-6">
  {/* Navbar */}
  <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 text-center sm:text-left">
      🏛️ Panel del Museo
    </h1>
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
      <p className="text-md md:text-lg font-semibold text-gray-800 text-center sm:text-left">
        👩‍💼 {user?.username}
      </p>
      <button
        onClick={handleLogout}
        className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-bold rounded-lg hover:scale-105 transform transition-all duration-300"
      >
        Cerrar sesión
      </button>
    </div>
  </div>

  {/* Contenido principal */}
  <div className="flex flex-col items-center justify-center text-center flex-grow">
    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4">
      ¡Bienvenid@, {user.username}!
    </h2>
    <p className="text-base md:text-xl text-gray-700 max-w-2xl mb-10 px-2">
      Administra el museo, exposiciones y artistas desde tu panel personalizado.
    </p>

    {/* Botones de acción */}
    <div className="flex flex-wrap justify-center gap-4 w-full">
    {[
      { text: "➕ Publicar Artículo", href: "/dashboard/publicar", bg: "bg-green-500", hover: "hover:bg-green-600" },
      { text: "✏️ Editar Artículo", href: "/dashboard/editar", bg: "bg-blue-500", hover: "hover:bg-blue-600" },
      { text: "🗑️ Eliminar Artículo", href: "/dashboard/eliminar", bg: "bg-red-500", hover: "hover:bg-red-600" },
      { text: "🔍 Buscar Artículo", href: "/dashboard/buscar", bg: "bg-purple-500", hover: "hover:bg-purple-600" },
      { text: "📊 Ver Gráficas", href: "/graficas", bg: "bg-indigo-500", hover: "hover:bg-indigo-600" },
    ].map(({ text, href, bg, hover }) => (
    <button
    key={href}
    onClick={() => router.push(href)}
    className={`w-full sm:w-auto px-6 py-3 ${bg} ${hover} text-white font-bold rounded-lg transition text-sm sm:text-base`}
    >
    {text}
    </button>
  ))}
    </div>
  </div>
</div>
  );
};

export default Dashboard;


