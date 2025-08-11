import { Hero } from "@/components/hero"
import { FeaturedSections } from "@/components/featured-sections"
import { Stats } from "@/components/stats"
import IntroRoot from "@/components/intro-root"

type NASAFeedItem = {
  title: string
  link: string
  pubDate: string
  contentSnippet: string
  categories?: string[]
  image?: string
}

async function getNASAFeed(): Promise<NASAFeedItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://cosmic-explorers.vercel.app'}/api/nasa-feed`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch NASA feed")
  return res.json()
}

export default async function Home() {
  const posts = await getNASAFeed()

  return (
    <>
      {/* Intro overlay rendered above the homepage content; unmounts after launch */}
      <IntroRoot />
      <Hero />
      <Stats />
      <FeaturedSections />

      <section className="min-h-screen pt-24 pb-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center">Latest Cosmic News</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 6).map((post, index) => (
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

              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-40 bg-gray-800 rounded-lg flex items-center justify-center text-sm text-gray-400">
                  No preview image available
                </div>
              )}

              <div className="mt-4">
                <h3 className="text-lg font-semibold group-hover:underline">
                  {post.title}
                </h3>
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
      </section>
    </>
  )
}
