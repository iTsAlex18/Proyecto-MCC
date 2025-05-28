// lib/registrarClic.ts
export async function registrarClic(section: string) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/section-clicks/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section }),
    });
  } catch (error) {
    console.error("❌ Error al registrar clic:", error);
  }
}