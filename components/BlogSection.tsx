"use client";
import { useEffect, useState } from "react";

interface Post {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage?: string;
  published: boolean;
  createdAt: string;
}

export default function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data.filter((p: Post) => p.published)))
      .catch(err => console.error("Failed to load posts", err));
  }, []);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="bg-white py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center">
          <span className="text-red-600">LA</span><span className="text-black">ST</span>{" "}
          <span className="text-red-600">PRO</span><span className="text-black">JECTS</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map(post => (
            <div key={post._id} className="bg-zinc-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
              {post.coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <span className="text-xs font-semibold text-sky-500 uppercase tracking-widest">
                  {post.category}
                </span>
                <h3 className="text-lg font-bold mt-2 mb-3 text-black">{post.title}</h3>
                <p className="text-zinc-500 text-sm">{post.excerpt}</p>
                <p className="text-zinc-400 text-xs mt-3">
                  {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
