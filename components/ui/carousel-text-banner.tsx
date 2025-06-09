"use client";
import { useRouter } from 'next/navigation';
import { Carousel,CarouselContent,CarouselItem } from './carousel';
import { Card, CardContent } from './card';
import Autoplay from 'embla-carousel-autoplay'

export const dataCarouselTop = [
    {
        id: 1,
        title: "Primera Pagina web de Museo",
        description: "Nuestra primera pagina web, conoce todas las novedades.",
        link: "#",
    },
    {
        id: 2,
        title: "Redes Sociales",
        description: "Ven a Visitar nuestras redes sociales y enterate de todas las novedades.",
        link: "#",
    },
    {
        id: 3,
        title: "Lo Nuevo que agregamos es el blog",
        description: "Nuestro blog conoceras todas las novedades y eventos de nuestro museo.",
        link: "#",
    },
]

const CarouselTextBanner = () => {
    const router = useRouter();

    return ( 
        <div className='bg-gray-200 dark:bg-primary'>
            <Carousel className='w-full max-w-4xl mx-auto'
            plugins={[
                Autoplay({
                    delay:2500, //ms
                })
            ]}
            >
                <CarouselContent>
                    {dataCarouselTop.map(({id, title, description, link}) => (
                        <CarouselItem key={id} onClick={() => router.push(link)} className='cursor-pointer'>
                            <div>
                                <Card className='shadow-none border-none bg-transparent'>
                                    <CardContent className='flex flex-col justify-center p-2 items-center text-center'>
                                        <p className='sm:text-lg text-wrap dark:text-white'>{title}</p>
                                        <p className='text-xs sm:text-sm text-wrap dark:text-black'>{description}</p>
                                        </CardContent>
                                        </Card>
                                        </div>
                        </CarouselItem>
                                    ))}
                </CarouselContent>
            </Carousel>
        </div>
     );
}
 
export default CarouselTextBanner;