"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const planets = [
  { name: "Mercury", radius: 2439.7, color: "from-gray-400 to-gray-600", type: "Terrestrial" },
  { name: "Venus", radius: 6051.8, color: "from-yellow-400 to-orange-500", type: "Terrestrial" },
  { name: "Earth", radius: 6371, color: "from-blue-400 to-green-500", type: "Terrestrial" },
  { name: "Mars", radius: 3389.5, color: "from-red-500 to-orange-600", type: "Terrestrial" },
  { name: "Jupiter", radius: 69911, color: "from-orange-400 to-yellow-600", type: "Gas Giant" },
  { name: "Saturn", radius: 58232, color: "from-yellow-300 to-amber-500", type: "Gas Giant" },
  { name: "Uranus", radius: 25362, color: "from-cyan-400 to-blue-500", type: "Ice Giant" },
  { name: "Neptune", radius: 24622, color: "from-blue-500 to-indigo-600", type: "Ice Giant" },
]

interface PlanetSizeComparisonProps {
  selectedPlanets?: string[]
}

export function PlanetSizeComparison({ selectedPlanets = [] }: PlanetSizeComparisonProps) {
  const [viewMode, setViewMode] = useState<"all" | "selected">("all")

  const planetsToShow =
    viewMode === "selected" && selectedPlanets.length > 0
      ? planets.filter((planet) => selectedPlanets.includes(planet.name))
      : planets

  // Calculate relative sizes (Earth = 100px for reference)
  const earthRadius = 6371
  const baseSize = 100
  const maxDisplaySize = 200 // Maximum size for display purposes

  const getPlanetSize = (radius: number) => {
    const relativeSize = (radius / earthRadius) * baseSize
    // Cap the size for better visualization
    return Math.min(relativeSize, maxDisplaySize)
  }

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      {selectedPlanets.length > 0 && (
        <div className="flex justify-center">
          <div className="flex bg-white/5 rounded-xl p-1">
            <Button
              variant={viewMode === "all" ? "default" : "ghost"}
              onClick={() => setViewMode("all")}
              className={`rounded-lg ${
                viewMode === "all"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              All Planets
            </Button>
            <Button
              variant={viewMode === "selected" ? "default" : "ghost"}
              onClick={() => setViewMode("selected")}
              className={`rounded-lg ${
                viewMode === "selected"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Selected Only ({selectedPlanets.length})
            </Button>
          </div>
        </div>
      )}

      {/* Size Comparison Visualization */}
      <Card className="backdrop-blur-md bg-white/5 border border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-center flex items-center justify-center gap-2">
            <span className="text-2xl">📏</span>
            Planet Size Comparison
          </CardTitle>
          <p className="text-gray-300 text-center text-sm">
            Relative sizes compared to Earth (not to scale with distances)
          </p>
        </CardHeader>
        <CardContent>
          {/* Desktop Layout */}
          <div className="hidden md:flex items-end justify-center gap-4 p-8 overflow-x-auto">
            {planetsToShow.map((planet, index) => {
              const size = getPlanetSize(planet.radius)
              return (
                <div key={planet.name} className="flex flex-col items-center group">
                  <div
                    className={`rounded-full bg-gradient-to-br ${planet.color} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl flex items-center justify-center relative`}
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      minWidth: "20px",
                      minHeight: "20px",
                    }}
                  >
                    {/* Size indicator for very small planets */}
                    {size < 30 && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {planet.radius.toLocaleString()} km
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <div className="text-white font-medium text-sm">{planet.name}</div>
                    <div className="text-gray-400 text-xs">{planet.radius.toLocaleString()} km</div>
                    <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-xs mt-1">
                      {planet.type}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            {planetsToShow.map((planet, index) => {
              const size = Math.min(getPlanetSize(planet.radius), 80) // Smaller max size for mobile
              return (
                <div
                  key={planet.name}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div
                    className={`rounded-full bg-gradient-to-br ${planet.color} shadow-lg flex-shrink-0`}
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      minWidth: "20px",
                      minHeight: "20px",
                    }}
                  />
                  <div className="flex-1">
                    <div className="text-white font-medium">{planet.name}</div>
                    <div className="text-gray-400 text-sm">Radius: {planet.radius.toLocaleString()} km</div>
                    <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-xs mt-1">
                      {planet.type}
                    </Badge>
                  </div>
                  <div className="text-right text-sm">
                    <div className="text-gray-400">vs Earth</div>
                    <div className="text-white font-medium">{(planet.radius / earthRadius).toFixed(2)}x</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Size Reference */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl">
            <h4 className="text-blue-300 font-semibold mb-2 text-center">Size Reference</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-white font-medium">Smallest</div>
                <div className="text-gray-300">Mercury</div>
                <div className="text-gray-400">{planets[0].radius.toLocaleString()} km</div>
              </div>
              <div className="text-center">
                <div className="text-white font-medium">Largest</div>
                <div className="text-gray-300">Jupiter</div>
                <div className="text-gray-400">{planets[4].radius.toLocaleString()} km</div>
              </div>
              <div className="text-center">
                <div className="text-white font-medium">Earth Reference</div>
                <div className="text-gray-300">1.00x</div>
                <div className="text-gray-400">{earthRadius.toLocaleString()} km</div>
              </div>
              <div className="text-center">
                <div className="text-white font-medium">Jupiter vs Earth</div>
                <div className="text-gray-300">{(planets[4].radius / earthRadius).toFixed(1)}x</div>
                <div className="text-gray-400">11 times larger</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
