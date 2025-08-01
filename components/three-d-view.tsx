"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CuboidIcon as Cube, Sparkles, Sun, Moon, Zap, Globe } from "lucide-react"

const celestialObjects = [
  // Planets
  {
    name: "Mercury",
    type: "Planet",
    category: "Terrestrial",
    color: "from-gray-400 to-gray-600",
    icon: Globe,
    description: "The smallest and innermost planet in our Solar System",
  },
  {
    name: "Venus",
    type: "Planet",
    category: "Terrestrial",
    color: "from-yellow-400 to-orange-500",
    icon: Globe,
    description: "The hottest planet with a thick, toxic atmosphere",
  },
  {
    name: "Earth",
    type: "Planet",
    category: "Terrestrial",
    color: "from-blue-400 to-green-500",
    icon: Globe,
    description: "Our home planet, the only known world with life",
  },
  {
    name: "Mars",
    type: "Planet",
    category: "Terrestrial",
    color: "from-red-500 to-orange-600",
    icon: Globe,
    description: "The Red Planet with the largest volcano in the Solar System",
  },
  {
    name: "Jupiter",
    type: "Planet",
    category: "Gas Giant",
    color: "from-orange-400 to-yellow-600",
    icon: Globe,
    description: "The largest planet with over 80 known moons",
  },
  {
    name: "Saturn",
    type: "Planet",
    category: "Gas Giant",
    color: "from-yellow-300 to-amber-500",
    icon: Globe,
    description: "Famous for its spectacular ring system",
  },
  {
    name: "Uranus",
    type: "Planet",
    category: "Ice Giant",
    color: "from-cyan-400 to-blue-500",
    icon: Globe,
    description: "An ice giant that rotates on its side",
  },
  {
    name: "Neptune",
    type: "Planet",
    category: "Ice Giant",
    color: "from-blue-500 to-indigo-600",
    icon: Globe,
    description: "The windiest planet in our Solar System",
  },
  // Stars
  {
    name: "Main Sequence Star",
    type: "Star",
    category: "Stellar Object",
    color: "from-yellow-400 to-orange-500",
    icon: Sun,
    description: "Stars in their stable hydrogen-burning phase",
  },
  {
    name: "Red Giant",
    type: "Star",
    category: "Stellar Object",
    color: "from-red-400 to-orange-600",
    icon: Sparkles,
    description: "Evolved stars that have expanded and cooled",
  },
  {
    name: "White Dwarf",
    type: "Star",
    category: "Stellar Object",
    color: "from-white to-blue-200",
    icon: Moon,
    description: "Dense remnants of low to medium mass stars",
  },
  {
    name: "Neutron Star",
    type: "Star",
    category: "Stellar Object",
    color: "from-purple-400 to-blue-600",
    icon: Zap,
    description: "Extremely dense stellar remnants from massive star collapse",
  },
]

export function ThreeDView() {
  return (
    <div className="space-y-12">
      {/* Planets Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Interactive Planets
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {celestialObjects
            .filter((obj) => obj.type === "Planet")
            .map((planet, index) => (
              <Card
                key={index}
                className="backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-white text-lg">{planet.name}</CardTitle>
                    <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-xs">
                      {planet.category}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* 3D Model Placeholder Container */}
                  <div className="relative mb-4">
                    <div
                      className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${planet.color} flex items-center justify-center relative overflow-hidden`}
                    >
                      {/* 3D Model Placeholder */}
                      <div className="absolute inset-4 border-2 border-white/30 border-dashed rounded-xl flex flex-col items-center justify-center">
                        <Cube className="h-12 w-12 text-white/60 mb-2" />
                        <span className="text-white/60 text-sm font-medium">3D Model</span>
                        <span className="text-white/40 text-xs">Coming Soon</span>
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute top-2 right-2">
                        <planet.icon className="h-6 w-6 text-white/40" />
                      </div>

                      {/* Animated Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{planet.description}</p>

                  {/* Placeholder Controls */}
                  <div className="flex justify-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white/40 rounded-full" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white/40 rounded-full" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white/40 rounded-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </section>

      {/* Stars Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Interactive Stars
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {celestialObjects
            .filter((obj) => obj.type === "Star")
            .map((star, index) => (
              <Card
                key={index}
                className="backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-white text-lg">{star.name}</CardTitle>
                    <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-xs">
                      {star.category}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* 3D Model Placeholder Container */}
                  <div className="relative mb-4">
                    <div
                      className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${star.color} flex items-center justify-center relative overflow-hidden animate-pulse-glow`}
                    >
                      {/* 3D Model Placeholder */}
                      <div className="absolute inset-4 border-2 border-white/30 border-dashed rounded-xl flex flex-col items-center justify-center">
                        <Cube className="h-12 w-12 text-white/60 mb-2" />
                        <span className="text-white/60 text-sm font-medium">3D Model</span>
                        <span className="text-white/40 text-xs">Coming Soon</span>
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute top-2 right-2">
                        <star.icon className="h-6 w-6 text-white/40" />
                      </div>

                      {/* Animated Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{star.description}</p>

                  {/* Placeholder Controls */}
                  <div className="flex justify-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white/40 rounded-full" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white/40 rounded-full" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white/40 rounded-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="text-center">
        <div className="backdrop-blur-md bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-3xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-purple-300 mb-4">🚀 3D Models Coming Soon!</h3>
          <p className="text-gray-300 leading-relaxed">
            We're working on bringing you stunning, interactive 3D models of planets and stars. Soon you'll be able to
            rotate, zoom, and explore these celestial objects in incredible detail. Each model will feature accurate
            textures, realistic lighting, and educational annotations.
          </p>
        </div>
      </section>
    </div>
  )
}
