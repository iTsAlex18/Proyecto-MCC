/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { registrarClic } from "@/lib/registrarClic";

const BlogPage = () => {
  type SelectedPost = {
    id: number;
    title: string;
    content: string;
    imageUrl: string | null;
    formattedDate: string;
  } | null;

  type Post = {
    id: number;
    title: string;
    content: string;
    media: Array<{
      url: string;
      formats?: {
        medium?: { url: string };
      };
    }>;
    createdAt: string;
    likes?: number;
  };

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<SelectedPost>(null);
  const [likedPostId, setLikedPostId] = useState<number | null>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [visitorName, setVisitorName] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("visitante_token");
    const user = localStorage.getItem("visitante_user");

    if (!token || !user) {
      router.replace("/login");
    } else {
      try {
        const parsed = JSON.parse(user);
        setVisitorName(parsed.username || "");
        setAuthorized(true);
        // ✅ Aquí registramos el clic
      registrarClic("Blog del museo");
        const liked = JSON.parse(localStorage.getItem("likedPosts") || "[]");
        setLikedPosts(liked);
      } catch (e) {
        console.error("Error leyendo usuario:", e);
        router.replace("/login");
      }
    }

    setCheckingAuth(false);
  }, []);

  const fetchPosts = () => {
    fetch("http://localhost:1337/api/posts-con-likes")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data || []);
      })
      .catch((err) => console.error("Error al cargar posts:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (authorized) fetchPosts();
  }, [authorized]);

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPost(null);
    };
    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, []);

const handleToggleLike = async (postId: number) => {
  const token = localStorage.getItem("visitante_token");
  if (!token) {
    alert("Debes iniciar sesión para dar like.");
    router.push("/login");
    return;
  }

  try {
    const res = await fetch(`http://localhost:1337/api/likes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("❌ Error al hacer like:", error);
      alert("No se pudo procesar el like.");
      return;
    }

    const nuevosLikes = likedPosts.includes(postId)
      ? likedPosts.filter((id) => id !== postId)
      : [...likedPosts, postId];

    setLikedPosts(nuevosLikes);
    localStorage.setItem("likedPosts", JSON.stringify(nuevosLikes));
    setLikedPostId(postId);
    setTimeout(() => setLikedPostId(null), 300);
    fetchPosts();
  } catch (err) {
    console.error("❌ Error:", err);
    alert("No se pudo procesar el like.");
  }
};

  if (checkingAuth || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 via-pink-100 to-yellow-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-pink-100 to-yellow-100 px-4 py-6">
      <div className="bg-white/80 backdrop-blur-md shadow px-4 py-3 mb-6 rounded-lg flex justify-between items-center max-w-7xl mx-auto">
        <span className="text-gray-800 font-semibold text-sm sm:text-base">
          👋 Bienvenid@, <strong>{visitorName}</strong>
        </span>
        <button
          onClick={() => {
            localStorage.removeItem("visitante_token");
            localStorage.removeItem("visitante_user");
            localStorage.removeItem("likedPosts");
            router.push("/login");
          }}
          className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm px-3 py-1 rounded font-semibold transition"
        >
          Cerrar sesión
        </button>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-800">
        🏛️ Blog del Museo
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {posts.map((post) => {
          const { id, title, content, media, createdAt, likes } = post;

          const imageUrl =
            media && media.length > 0
              ? `http://localhost:1337${media[0].formats?.medium?.url || media[0].url}`
              : null;

          const formattedDate = new Date(createdAt).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          const isLiked = likedPosts.includes(id);

          return (
            <div
              key={id}
              className="bg-white shadow-lg rounded-xl overflow-hidden transition-all hover:scale-[1.02] duration-300 flex flex-col relative"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Imagen del post"
                  className="w-full h-48 sm:h-64 object-cover"
                />
              ) : (
                <div className="w-full h-48 sm:h-64 flex items-center justify-center bg-gray-200 italic text-gray-500">
                  Sin imagen
                </div>
              )}

              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg sm:text-xl font-semibold mb-1 text-gray-800 truncate">{title}</h2>
                <p className="text-sm text-gray-500 mb-2">📅 {formattedDate}</p>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">{content || "Sin contenido."}</p>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedPost({ id, title, content, imageUrl, formattedDate })}
                    className="text-sm text-indigo-600 font-semibold hover:underline hover:scale-105 transition"
                  >
                    📖 Leer artículo completo
                  </button>

                  <button
                    onClick={() => handleToggleLike(id)}
                    className={`flex items-center gap-1 text-sm transition-transform ${
                      isLiked
                        ? "text-red-600 font-semibold"
                        : "text-gray-500 hover:text-red-500"
                    } ${likedPostId === id ? "animate-bump" : ""}`}
                  >
                    {isLiked ? "💖" : "🤍"} {typeof likes === "number" ? likes : 0}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white max-w-2xl w-full rounded-lg shadow-xl overflow-y-auto max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedPost.imageUrl && (
              <img
                src={selectedPost.imageUrl}
                alt="Imagen del post"
                className="w-full h-64 object-cover rounded-t-lg"
              />
            )}

            <div className="p-6 flex flex-col">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{selectedPost.title}</h2>
              <p className="text-sm text-gray-500 mb-4">📅 {selectedPost.formattedDate}</p>
              <p className="text-gray-700 text-base whitespace-pre-line mb-6">{selectedPost.content}</p>
              <button
                onClick={() => setSelectedPost(null)}
                className="self-end bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;


