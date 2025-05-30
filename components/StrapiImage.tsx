// components/StrapiImage.tsx
import React from "react";

type StrapiImageProps = {
  src: string;              // La URL de la imagen (puede ser relativa o absoluta)
  alt: string;              // Descripción alternativa
  className?: string;       // Estilos personalizados
  fallback?: string;        // Imagen por defecto si falla la carga
};

const StrapiImage: React.FC<StrapiImageProps> = ({
  src,
  alt,
  className = "",
  fallback = "/fallback.jpg", // Imagen que mostrar si falla la original
}) => {
  // Si la URL no empieza con http, se asume que es una ruta relativa y se antepone el dominio del backend
  const finalSrc = src.startsWith("http")
    ? src
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}${src}`;

  // Manejador si la imagen falla
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = fallback;
  };

  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export default StrapiImage;
