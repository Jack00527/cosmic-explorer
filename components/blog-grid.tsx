import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"

const blogPosts = [
  {
    title: "James Webb Telescope Discovers Ancient Galaxies",
    excerpt:
      "New observations reveal galaxies that formed just 400 million years after the Big Bang, reshaping our understanding of early cosmic evolution.",
    author: "Jack",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Discoveries",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "The Great Conjunction: When Planets Align",
    excerpt:
      "Explore the rare celestial event where Jupiter and Saturn appeared closer than they have in centuries, creating a spectacular sight in our night sky.",
    author: "Jack",
    date: "2024-01-10",
    readTime: "3 min read",
    category: "Events",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Exoplanet Atmospheres: Windows to Other Worlds",
    excerpt:
      "Scientists are analyzing the atmospheres of distant exoplanets, searching for signs of habitability and potentially even life beyond our solar system.",
    author: "Jack",
    date: "2024-01-05",
    readTime: "7 min read",
    category: "Research",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Perseverance Rover: Latest Martian Discoveries",
    excerpt:
      "The Mars rover continues to make groundbreaking discoveries about the Red Planet's past, including evidence of ancient water activity.",
    author: "Jack",
    date: "2024-01-01",
    readTime: "4 min read",
    category: "Mars",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Black Holes: The Universe's Most Mysterious Objects",
    excerpt:
      "Dive deep into the physics of black holes, from event horizons to Hawking radiation, and discover how they shape the cosmos around them.",
    author: "Jack",
    date: "2023-12-28",
    readTime: "8 min read",
    category: "Physics",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Asteroid Mining: The Future of Space Resources",
    excerpt:
      "Explore how asteroid mining could revolutionize space exploration and provide valuable resources for future missions and Earth-based industries.",
    author: "Jack",
    date: "2023-12-25",
    readTime: "6 min read",
    category: "Future",
    image: "/placeholder.svg?height=200&width=400",
  },
]

const categories = ["All", "Discoveries", "Events", "Research", "Mars", "Physics", "Future"]

export function BlogGrid() {
  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <Badge
            key={category}
            variant="secondary"
            className="bg-white/10 text-white border-white/20 hover:bg-white/20 cursor-pointer transition-all duration-300 px-4 py-2"
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <Card
            key={index}
            className="backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden"
          >
            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative overflow-hidden">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-black/50 text-white border-white/20">
                  {post.category}
                </Badge>
              </div>
            </div>

            <CardHeader>
              <h3 className="text-xl font-bold text-white leading-tight hover:text-blue-300 transition-colors duration-300">
                {post.title}
              </h3>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-gray-300 mb-4 leading-relaxed">{post.excerpt}</p>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
