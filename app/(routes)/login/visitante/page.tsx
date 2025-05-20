"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginVisitante() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const endpoint = isRegistering ? "register" : "";
    const body = isRegistering
      ? { username, email, password }
      : { identifier: email, password };

    try {
      const res = await fetch(`http://localhost:1337/api/auth/local/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error?.message || "Error inesperado");
        return;
      }

      localStorage.setItem("visitante_token", data.jwt);
      localStorage.setItem("visitante_user", JSON.stringify(data.user));
      router.push("/blog");
    } catch {
      setError("Error de conexión");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-yellow-200 via-pink-100 to-orange-100">
      {/* Lado izquierdo con imagen */}
      <div
        className="hidden md:flex md:w-1/2 items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/museum-visitor.jpg')" }}
      >
        <div className="bg-black/50 backdrop-blur-md text-white text-center p-10 rounded-xl shadow-lg max-w-md">
          <h1 className="text-4xl font-bold mb-4">Bienvenidos al Blog del Museo</h1>
          <p className="text-lg">Explora, comenta y deja tu huella.</p>
        </div>
      </div>

      {/* Formulario */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white/60 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {isRegistering ? "Crear cuenta 🧑‍🎨" : "Iniciar sesión 🖐️"}
          </h2>

          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            {isRegistering && (
              <input
                type="text"
                placeholder="Nombre"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-3 rounded-lg border border-gray-300 bg-white"
                required
              />
            )}
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 bg-white"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 bg-white"
              required
            />

            {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-semibold transition"
            >
              {isRegistering ? "Registrarse" : "Entrar"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-700">
            {isRegistering ? "¿Ya tienes cuenta?" : "¿Aún no tienes cuenta?"}{" "}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-orange-600 font-bold hover:underline"
            >
              {isRegistering ? "Inicia sesión" : "Regístrate"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

