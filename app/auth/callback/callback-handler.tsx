// app/auth/callback/callback-handler.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AuthCallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("access_token");

    const fetchUser = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://localhost:1337/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = await res.json();

        localStorage.setItem("visitante_token", token);
        localStorage.setItem("visitante_user", JSON.stringify(user));

        router.push("/blog");
      } catch (err) {
        console.error("Error obteniendo el usuario", err);
        router.push("/login");
      }
    };

    fetchUser();
  }, [searchParams, router]);

  return null;
}