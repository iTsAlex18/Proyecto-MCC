// app/auth/callback/page.tsx
"use client";

import { Suspense } from "react";
import AuthCallbackHandler from "./callback-handler";

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<p className="text-center mt-20 text-lg">Procesando... 🔄</p>}>
      <AuthCallbackHandler />
    </Suspense>
  );
}