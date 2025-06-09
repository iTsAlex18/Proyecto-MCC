// components/LoginSelector.jsx
"use client";
import { useRouter } from "next/navigation";
import { ShieldCheck, Users } from "lucide-react";


export default function LoginSelector() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-rose-100 via-orange-100 to-yellow-100 p-8">
      <div className="bg-white/60 backdrop-blur-lg shadow-xl rounded-3xl p-10 max-w-xl w-full text-center space-y-8 border border-orange-200">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">Accede al sistema del Museo</h1>
        <p className="text-lg text-gray-600">Selecciona tu tipo de acceso para continuar</p>

        <div className="flex flex-col gap-6 mt-6">
          <button
            onClick={() => router.push("/login/director@")}
            className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg text-lg font-semibold transition"
          >
            <ShieldCheck className="w-6 h-6" />
            Iniciar sesión como Director@ del Museo
          </button>

          <button
            onClick={() => router.push("/login/visitante")}
            className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-lg text-lg font-semibold transition"
          >
            <Users className="w-6 h-6" />
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
