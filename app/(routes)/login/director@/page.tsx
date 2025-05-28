"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ContainerPage from "@/components/container-page";

const LoginDirectora = () => {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.jwt);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("¡Bienvenida directora!");
        router.push("/dashboard");
      } else {
        setError(data.error?.message || "Error de autenticación");
      }
    } catch {
      setError("Error de conexión");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password: regPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.jwt);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("🎉 Registro exitoso");
        router.push("/dashboard");
      } else {
        setError(data.error?.message || "Error al registrarse");
      }
    } catch {
      setError("Error de conexión");
    }
  };

  return (
    <ContainerPage>
      <div className="flex items-center justify-center min-h-[100vh] bg-gradient-to-tr from-purple-200 via-pink-100 to-yellow-100 p-8 animate-fadeIn">
        <div className="bg-white/50 backdrop-blur-lg p-10 rounded-2xl shadow-2xl text-center w-full max-w-md transition-all duration-500 hover:scale-105">
          <h1 className="text-4xl font-extrabold font-serif text-gray-800 mb-8 drop-shadow-lg">
            {isRegistering ? "Crea tu cuenta" : "Bienvenido al Museo"}
          </h1>

          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="flex flex-col gap-6">
            {isRegistering ? (
              <>
                <input
                  type="text"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="p-4 border border-gray-300 rounded-lg bg-white/70"
                  required
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-4 border border-gray-300 rounded-lg bg-white/70"
                  required
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="p-4 border border-gray-300 rounded-lg bg-white/70"
                  required
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Nombre de usuario o correo"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="p-4 border border-gray-300 rounded-lg bg-white/70 text-black"
                  required
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-4 border border-gray-300 rounded-lg bg-white/70 text-black"
                  required
                />
              </>
            )}

            {error && <p className="text-red-500 font-semibold">{error}</p>}

            <button
              type="submit"
              className="p-4 bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 text-white rounded-lg font-bold text-lg hover:scale-110 transition-all"
            >
              {isRegistering ? "Registrarse" : "Ingresar"}
            </button>
          </form>

          <button
            type="button"
            className="mt-4 text-blue-600 underline hover:text-blue-800 transition"
            onClick={() => setIsRegistering((prev) => !prev)}
          >
            {isRegistering
              ? "¿Ya tienes cuenta? Inicia sesión"
              : "¿No tienes cuenta? Regístrate"}
          </button>
        </div>
      </div>
    </ContainerPage>
  );
};

export default LoginDirectora;



