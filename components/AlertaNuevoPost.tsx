'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Post {
  id: number
  title: string
  content: string
  createdAt: string
}

export default function AlertaNuevoPost() {
  const [latestPost, setLatestPost] = useState<Post | null>(null)
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts?sort=createdAt:desc&pagination[limit]=1`
        )
        const data = await res.json()
        const post = data?.data?.[0]

        if (post) {
          const createdAt = new Date(post.createdAt)
          const now = new Date()
          const diffInHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60)

          if (diffInHours <= 24) {
            setLatestPost(post)
            setShouldShow(true)
          }
        }
      } catch (err) {
        console.error("Error al obtener el post más reciente:", err)
      }
    }

    fetchLatestPost()
  }, [])

  if (!shouldShow || !latestPost) return null

  return (
    <div
      className="flex items-start gap-4 p-4 mb-6 rounded border border-yellow-400 bg-yellow-100 text-yellow-900 shadow-md animate-fade-in"
      role="alert"
    >
      <div className="text-3xl">📢</div>

      <div>
        <p className="font-bold text-lg">Nuevo artículo publicado por la directora</p>
        <p className="text-sm">{latestPost.title}</p>
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
  )
}


