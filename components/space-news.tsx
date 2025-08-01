"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, Clock } from "lucide-react"

// Mock space news data (in a real app, this would come from APIs)
const spaceNews = [
  {
    id: 1,
    title: "James Webb Telescope Discovers Most Distant Galaxy Ever Observed",
    excerpt:
      "Astronomers using the James Webb Space Telescope have identified a galaxy that formed just 325 million years after the Big Bang, breaking previous distance records.",
    source: "NASA",
    date: "2024-01-20",
    readTime: "4 min read",
    category: "Discovery",
    image: "/placeholder.svg?height=200&width=400&text=JWST+Galaxy",
    url: "https://nasa.gov/news/jwst-distant-galaxy",
  },
  {
    id: 2,
    title: "Mars Perseverance Rover Finds Evidence of Ancient Microbial Life",
    excerpt:
      "NASA's Perseverance rover has discovered compelling evidence of ancient microbial life in rock samples from Mars' Jezero Crater.",
    source: "NASA JPL",
    date: "2024-01-18",
    readTime: "6 min read",
    category: "Mars",
    image: "/placeholder.svg?height=200&width=400&text=Mars+Perseverance",
    url: "https://jpl.nasa.gov/news/mars-life-evidence",
  },
  {
    id: 3,
    title: "ESA's Euclid Mission Reveals Dark Matter's Hidden Structure",
    excerpt:
      "The European Space Agency's Euclid telescope has captured unprecedented images showing the distribution of dark matter across cosmic web filaments.",
    source: "ESA",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Cosmology",
    image: "/placeholder.svg?height=200&width=400&text=Dark+Matter+Web",
    url: "https://esa.int/news/euclid-dark-matter",
  },
  {
    id: 4,
    title: "SpaceX Starship Successfully Completes Orbital Refueling Test",
    excerpt:
      "SpaceX has achieved a major milestone in space exploration by successfully demonstrating orbital propellant transfer between two Starship vehicles.",
    source: "SpaceX",
    date: "2024-01-12",
    readTime: "3 min read",
    category: "Technology",
    image: "/placeholder.svg?height=200&width=400&text=Starship+Refueling",
    url: "https://spacex.com/news/starship-refueling",
  },
  {
    id: 5,
    title: "Breakthrough: Scientists Detect Gravitational Waves from Neutron Star Collision",
    excerpt:
      "LIGO and Virgo observatories have detected gravitational waves from a neutron star merger, providing new insights into the creation of heavy elements.",
    source: "LIGO Scientific Collaboration",
    date: "2024-01-10",
    readTime: "7 min read",
    category: "Physics",
    image: "/placeholder.svg?height=200&width=400&text=Neutron+Star+Merger",
    url: "https://ligo.org/news/neutron-star-collision",
  },
  {
    id: 6,
    title: "China's Chang'e 6 Returns with First-Ever Far Side Moon Samples",
    excerpt:
      "China's Chang'e 6 mission has successfully returned to Earth with the first samples ever collected from the far side of the Moon.",
    source: "CNSA",
    date: "2024-01-08",
    readTime: "4 min read",
    category: "Exploration",
    image: "/placeholder.svg?height=200&width=400&text=Chang'e+6+Moon",
    url: "https://cnsa.gov.cn/news/change6-samples",
  },
]

const categories = ["All", "Discovery", "Mars", "Cosmology", "Technology", "Physics", "Exploration"]

export function SpaceNews() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredNews, setFilteredNews] = useState(spaceNews)

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredNews(spaceNews)
    } else {
      setFilteredNews(spaceNews.filter((news) => news.category === selectedCategory))
    }
  }, [selectedCategory])

  const getCategoryColor = (category: string) => {
    const colors = {
      Discovery: "from-blue-500 to-cyan-500",
      Mars: "from-red-500 to-orange-500",
      Cosmology: "from-purple-500 to-pink-500",
      Technology: "from-green-500 to-teal-500",
      Physics: "from-yellow-500 to-orange-500",
      Exploration: "from-indigo-500 to-blue-500",
    }
    return colors[category] || "from-gray-500 to-gray-600"
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Latest Cosmic News
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest discoveries, missions, and breakthroughs from the frontiers of space
            exploration and astronomy.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-xl transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news, index) => (
            <Card
              key={news.id}
              className="backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden group"
            >
              {/* News Image */}
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={news.image || "/placeholder.svg"}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    className={`bg-gradient-to-r ${getCategoryColor(news.category)} text-white border-0`}
                  >
                    {news.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-black/50 text-white border-white/20">
                    {news.source}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white leading-tight mb-3 group-hover:text-blue-300 transition-colors duration-300">
                  {news.title}
                </h3>

                <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">{news.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(news.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{news.readTime}</span>
                    </div>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white border-0 rounded-xl transition-all duration-300"
                >
                  <a href={news.url} target="_blank" rel="noopener noreferrer">
                    Read Full Article
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl backdrop-blur-sm transition-all duration-300 bg-transparent"
          >
            Load More News
          </Button>
        </div>
      </div>
    </section>
  )
}
