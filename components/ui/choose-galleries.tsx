/* eslint-disable @next/next/no-img-element */
"use client";
import { useGetGalleries } from "@/api/getGalleries";
import Link from "next/link";
import { ResponseType } from "@/types/response";
import { GalleryType } from "@/types/gallery";

// ✅ Función para manejar URLs absolutas o relativas
function getImageUrl(url?: string): string {
  if (!url) return "";
  return url.startsWith("http") ? url : `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`;
}

const ChooseGallery = () => {
  const { result, loading }: ResponseType = useGetGalleries();

  return (
    <div className="max-w-7xl py-12 mx-auto px-6 sm:px-12 lg:px-24">
      <h3 className="mb-10 text-4xl font-extrabold text-center text-gray-800 sm:text-left">
        Elige tu sala
        <span className="text-rose-600"> favorita</span>
      </h3>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {!loading &&
          result?.map((gallery: GalleryType) => {
            const imageUrl = getImageUrl(gallery.mainImage?.url); // ✅ Si es plana, esto es correcto
            console.log("mainImage URL:", imageUrl);
            return (
              <Link
                key={gallery.documentId || gallery.id}
                href={`/gallery/${gallery.slug}`}
                className="relative block overflow-hidden transition-transform duration-300 transform bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1"
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={gallery.galleryName}
                    className="object-cover w-full h-64 transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-lg font-semibold text-white text-center drop-shadow">
                    {gallery.galleryName}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default ChooseGallery;

