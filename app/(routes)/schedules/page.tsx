import MuseoSchedule from "@/components/schedule";
import ContainerPage from "@/components/container-page";
import TicketPrice from "@/components/ui/ticket-prices";
import CarouselTextBanner from "@/components/ui/carousel-text-banner";

export default function Page() {

    return (
        <ContainerPage>
            <CarouselTextBanner/>
            <div className="z-20 grid items-center h-full p-6 py-20 md:py-0 gap-[2rem]">
                <h1 className="text-2xl leading-tight text-center md:text-left md:text-4xl md:mt-10">Nuestros {" "}
                    <span className="font-bold text-rose-600"> ⏰ Horarios.</span>
                    </h1>
                <MuseoSchedule/>
                <br/>
                <h3 className="text-2xl leading-tight text-center md:text-left md:text-4xl md:mb-5">Precio de{" "}
                    <span className="font-bold text-rose-600">nuestras 🎟️ Entradas.</span>
                </h3>
                <TicketPrice/>
            </div>
        </ContainerPage>
    )
}