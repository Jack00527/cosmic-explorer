import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Star, Clock, BookOpen } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Explore Planets",
    description:
      "Discover the unique characteristics of all planets in our solar system, from rocky Mercury to gas giant Jupiter.",
    href: "/planets",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Star,
    title: "Stellar Phenomena",
    description: "Learn about star formation, lifecycles, supernovas, and the incredible variety of stellar objects.",
    href: "/stars",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Clock,
    title: "Universe Timeline",
    description: "Journey through 13.8 billion years of cosmic history from the Big Bang to the present day.",
    href: "/timeline",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: BookOpen,
    title: "Cosmic Updates",
    description: "Stay informed with the latest space discoveries, celestial events, and astronomical breakthroughs.",
    href: "/blog",
    gradient: "from-green-500 to-teal-500",
  },
]

export function FeaturedSections() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Begin Your Cosmic Journey
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Dive deep into the mysteries of space with our comprehensive educational sections designed to make astronomy
            accessible and engaging.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>

              <Link href={feature.href}>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 p-0 h-auto group-hover:translate-x-1 transition-transform duration-300"
                >
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
