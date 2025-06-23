'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PostAttributes {
  title: string;
  createdAt: string;
  // add other attributes as needed
}

interface Post {
  id: string | number;
  attributes: PostAttributes;
}

export default function AlertaNuevoPost() {
  const [latestPost, setLatestPost] = useState<Post | null>(null);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        const res = await fetch("https://proyecto-mcc-backend.onrender.com/api/posts?sort=createdAt:desc&pagination[limit]=1&populate=*");
        const data = await res.json();
        const post = data?.data?.[0];

        if (post) {
          const createdAt = new Date(post.attributes.createdAt);
          const now = new Date();
          const diffInHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

          if (diffInHours <= 24) {
            setLatestPost(post);
            setShouldShow(true);
          }
        }
      } catch (err) {
        console.error("Error al obtener el post:", err);
      }
    };

    fetchLatestPost();
  }, []);

  if (!shouldShow || !latestPost) return null;

  return (
    <div
      className="flex items-start gap-4 p-4 mb-6 rounded border border-yellow-400 bg-yellow-100 text-yellow-900 shadow-md animate-fade-in"
      role="alert"
    >
      {/* Icono */}
      <div className="text-3xl">📢</div>

      {/* Contenido */}
      <div>
        <p className="font-bold text-lg">Nuevo artículo publicado por la directora</p>
        <p className="text-sm">{latestPost.attributes.title}</p>
        <Link
          href={`/blog/${latestPost.id}`}
          className="inline-block mt-2 text-blue-700 font-medium hover:underline"
        >
          Leer artículo →
        </Link>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}

