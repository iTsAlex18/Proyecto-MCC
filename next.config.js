// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Para permitir imágenes externas
  },
};

module.exports = nextConfig;
