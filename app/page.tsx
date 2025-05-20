'use client';

import ClientOnly from "@/components/ClientOnly";
import { CoverParticles } from "@/components/cover-particles";
import Introduction from "@/components/introduction";

export default function Home() {
  return (
    <main>
      <div className="flex min-h-[100vh] h-full bg-no-repeat bg-gradient-cover">
        <ClientOnly>
          <CoverParticles />
          <Introduction />
        </ClientOnly>
      </div>
    </main>
  );
}

