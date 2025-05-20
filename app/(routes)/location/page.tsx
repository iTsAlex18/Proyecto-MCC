import Image from "next/image";
import ContainerPage from "@/components/container-page";

export default function Page() {
  return (
    <ContainerPage>
      <div className="z-20 grid items-center h-full px-4 sm:px-6 lg:px-8 py-12 gap-10">
        {/* Título */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 leading-tight">
          ¡Prepara tu visita al corazón del cobre!
          <br />
          <span className="block mt-2 text-rose-600 text-xl sm:text-2xl">
            Nos encontramos en Cananea, Sonora
          </span>
        </h1>

        {/* Imagen destacada */}
        <div className="flex justify-center">
          <Image 
            src="/cananea.jpg" 
            alt="Cananea" 
            width={1000} 
            height={700} 
            className="rounded-3xl shadow-xl border border-gray-200"
          />
        </div>

        {/* Texto descriptivo */}
        <div className="mt-6">
          <p className="text-lg sm:text-xl text-gray-700 text-justify leading-relaxed max-w-4xl mx-auto">
            Te damos la bienvenida a la <strong>Heroica Ciudad de Cananea</strong>, ubicada al norte del estado de Sonora, en la majestuosa Sierra Madre Occidental. 
            Reconocida mundialmente como <em>“La Ciudad del Cobre”</em>, Cananea es un lugar donde la historia minera cobra vida entre montañas y memorias.
            <br /><br />
            Desde sus antiguas minas hasta su legado cultural, Cananea es mucho más que un destino: es una experiencia que conecta el pasado con el presente.
            <br /><br />
            <span className="font-semibold text-rose-600">
              ¡Te invitamos a conocer nuestra ubicación exacta en el mapa abajo!
            </span>
          </p>
        </div>

        {/* Mapa */}
        <div className="relative w-full h-0 pb-[56.25%] mt-10 rounded-xl shadow-lg overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5905.089449127749!2d-110.30884728933437!3d30.982727958144515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86d0e18a63fb3753%3A0x148763da181ecd77!2sMuseo%20%22La%20C%C3%A1rcel%20de%20Cananea%22!5e1!3m2!1ses!2smx!4v1744318429547!5m2!1ses!2smx"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </ContainerPage>
  );
}

