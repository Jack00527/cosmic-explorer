// app/blog/page.tsx
import { fetchNASAFeed } from "@/lib/fetchNASAFeed";

export default async function BlogPage() {
  const posts = await fetchNASAFeed();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center">Blog</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 9).map((post, index) => (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="group relative block rounded-2xl bg-white/5 p-4 shadow-xl backdrop-blur transition hover:scale-[1.015] hover:shadow-2xl"
          >
            <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
              {post.categories?.[0] || "NASA News"}
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold leading-snug group-hover:underline">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-gray-300 line-clamp-3">
                {post.contentSnippet}
              </p>
              <p className="mt-4 text-xs text-gray-500">
                {new Date(post.pubDate).toLocaleDateString()}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
