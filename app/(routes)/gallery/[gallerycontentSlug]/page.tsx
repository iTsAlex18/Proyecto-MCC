/* eslint-disable @next/next/no-img-element */
"use client"
import { useGetGalleriesRooms } from "@/api/getGalleriesRooms"
import { Separator } from "@/components/ui/separator"
import { ResponseType } from "@/types/response"
import { useParams } from "next/navigation"
import ContainerPage from "@/components/container-page"
import { registrarClic } from "@/lib/registrarClic";
import { useEffect } from "react";
import { useState, useRef } from "react"
import StrapiImage from "@/components/StrapiImage";

export default function Page() {
const params = useParams()
const { gallerycontentSlug } = params
const { result, loading }: ResponseType = useGetGalleriesRooms(gallerycontentSlug ?? "")

const [selectedImage, setSelectedImage] = useState<string | null>(null)
const dialogRef = useRef<HTMLDialogElement | null>(null)

useEffect(() => {
  if (gallerycontentSlug) {
    registrarClic(`Sala - ${gallerycontentSlug}`);
  }
}, [gallerycontentSlug]);

const openModal = (imgUrl: string) => {
    setSelectedImage(imgUrl)
    dialogRef.current?.showModal()
}

const closeModal = () => {
    dialogRef.current?.close()
    setSelectedImage(null)
}

if (loading || !result) return <p className="text-center py-10">Cargando sala...</p>

return (
    <ContainerPage>
        <div className="max-w-6xl py-8 mx-auto sm:py-16 sm:px-6 md:px-12">
            {result.map((room: {
                id: string | number
                headerImage?: { url?: string }
                image?: { url?: string }[]
                roomTitle?: string
                contentTitle?: string
                description?: string
                images?: { url: string }[]
            }) => {
                const headerImageUrl = `${room.headerImage?.url}`
                const sideImageUrl = room.image?.[0]?.url
                    ? `${room.image[0].url}`
                    : null

                return (
                    <div key={room.id} className="py-10">
                        {room.headerImage?.url && (
                            <StrapiImage
                                src={headerImageUrl}
                                alt="Imagen de encabezado"
                                className="w-full max-h-[500px] sm:max-h-[700px] object-cover rounded-lg mb-10 shadow-xl"
                            />
                        )}

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-rose-600 mb-4">
                            {room.roomTitle}
                        </h2>

                        <Separator className="my-4" />

                        <div className={`grid grid-cols-1 gap-6 items-center mt-10 md:grid-cols-${sideImageUrl ? '2' : '1'}`}>
                            {sideImageUrl && (
                                <StrapiImage
                                    src={sideImageUrl}
                                    alt="Imagen lateral"
                                    className="w-full max-h-[1200px] object-cover rounded-xl overflow-hidden shadow-lg"
                                />
                            )}

                            <div className={`px-4 sm:px-6 lg:px-12 ${!sideImageUrl ? 'md:col-span-2' : ''}`}>
                                {room.contentTitle && (
                                    <h3 className="text-xl sm:text-2xl font-semibold text-rose-900 mb-4 text-center md:text-left">
                                        {room.contentTitle}
                                    </h3>
                                )}
                                <pre className=" text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed text-center font-serif bg-gradient-to-br from-amber-200 to-rose-100 px-6 py-8 rounded-xl shadow-inner">
                                    {room.description}
                                </pre>
                            </div>
                        </div>

                        {/* Galería individual para cada sala */}
                        {room.images && room.images.length > 0 && (
                            <div className="mt-12">
                                <h3 className="text-xl sm:text-2xl font-bold text-center text-red-900 mb-8">
                                    Galería
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {room.images.map((img: { url: string }, index: number) => (
                                        <div
                                            key={index}
                                            className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-[1.03] cursor-pointer"
                                            onClick={() => openModal(`${img.url}`)}
                                        >
                                            <div className="aspect-[1] bg-gray-100">
                                                <StrapiImage
                                                    src={`${img.url}`}
                                                    alt={`Imagen ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <Separator className="my-6" />
                    </div>
                )
            })}
        </div>
        
        {/* Modal de imagen */}
        <dialog
        ref={dialogRef}
        className="rounded-lg max-w-4xl w-full p-4 bg-white shadow-xl backdrop:bg-black/70 backdrop-blur-sm relative"
        onClick={(e) => {
            // Cierra si se hace clic fuera del contenido del dialog
            if (e.target === dialogRef.current) {
                closeModal()
            }
        }}
        onKeyDown={(e) => {
            if (e.key === "Escape") {
                closeModal()
            }
            }}>
                <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold z-50">
                    &times;
                </button>
                {selectedImage && (
                    <StrapiImage
                    src={selectedImage}
                    alt="Imagen ampliada"
                    className="w-full h-auto max-h-[80vh] object-contain mx-auto rounded-md"/>
                    )}
        </dialog>
        </ContainerPage>
    )
}


