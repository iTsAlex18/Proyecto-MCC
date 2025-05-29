'use client';

import Image from "next/image";
import ClientTypeAnimation from "./ClientTypeAnimation";

const Introduction = () => {
  return (
    <div className="z-20 grid items-center h-full p-6 py-20 md:py-0 md:grid-cols-2 gap-[3rem]">
      <Image
        src="/header-img.jpg"
        priority
        width="800"
        height="500"
        alt="museo"
        style={{ borderRadius: '50px' }}
      />
      <div className="flex flex-col justify-center max-w-md">
        <h1 className="mb-5 text-xl leading-tight md:text-left md:text-xl md:mb-10 text-white" style={{ textAlign: 'justify' }}>
          Bienvenidos al Museo de la Lucha Obrera. Que es un lugar donde convergen{' '}
          <ClientTypeAnimation />
        </h1>

        <p className="mx-auto mb-2 text-xl md:mx-0 md:mb-8 text-white" style={{ textAlign: 'justify' }}>
          El edificio que aloja al museo fue originalmente la Cárcel de Cananea de 1903 a 1979. En 19 de noviembre de 1980 es inaugurado y en 1981 es declarado Monumento Histórico Nacional por el INAH.
        </p>

        <div className="flex sticky z-[1000] items-center justify-center gap-3 md:justify-start md:gap-10">
          <a href="/location" className="px-3 py-2 my-2 transition-all border-2 cursor-pointer text-md w-fit border-white rounded-xl hover:shadow-xl hover:shadow-white/50 text-white">
            Ven a visitarnos
          </a>
          <a href="/catalog" className="px-3 py-2 my-5 transition-all border-2 cursor-pointer text-md w-fit border-secondary rounded-xl hover:shadow-xl hover:shadow-secondary text-white">
            Conocer más
          </a>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
