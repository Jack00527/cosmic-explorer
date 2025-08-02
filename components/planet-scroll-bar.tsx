"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"

const planets = [
  { name: "Mercury", color: "text-gray-400", gradient: "from-gray-300 to-gray-600" },
  { name: "Venus", color: "text-yellow-400", gradient: "from-yellow-200 to-yellow-600" },
  { name: "Earth", color: "text-blue-400", gradient: "from-blue-300 to-green-500" },
  { name: "Mars", color: "text-red-400", gradient: "from-red-300 to-red-600" },
  { name: "Jupiter", color: "text-orange-400", gradient: "from-orange-200 to-orange-500" },
  { name: "Saturn", color: "text-amber-300", gradient: "from-amber-200 to-amber-500" },
  { name: "Uranus", color: "text-cyan-400", gradient: "from-cyan-200 to-cyan-600" },
  { name: "Neptune", color: "text-blue-500", gradient: "from-blue-400 to-blue-700" },
  { name: "Pluto", color: "text-gray-300", gradient: "from-gray-200 to-gray-500" },
]

interface PlanetScrollBarProps {
  selectedPlanet: number | null
  onPlanetSelect: (planetIndex: number) => void
  onScrollToPlanet?: (planetIndex: number) => void
  onOpenModal?: (planetIndex: number) => void
  focusedPlanet?: number | null
}

export function PlanetScrollBar({
  selectedPlanet,
  onPlanetSelect,
  onScrollToPlanet,
  onOpenModal,
  focusedPlanet,
}: PlanetScrollBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (selectedPlanet !== null && scrollRef.current) {
      const planetElement = scrollRef.current.children[selectedPlanet] as HTMLElement
      if (planetElement) {
        planetElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }
    }
  }, [selectedPlanet])

  const handlePlanetClick = (planetIndex: number) => {
    // Clear any existing timeout
    if (clickTimeout) {
      clearTimeout(clickTimeout)
      setClickTimeout(null)
      // This is a double-click, open modal
      if (onOpenModal) {
        onOpenModal(planetIndex)
      }
      return
    }

    // Set timeout for single click
    const timeout = setTimeout(() => {
      // Single click - scroll to planet
      if (onScrollToPlanet) {
        onScrollToPlanet(planetIndex)
      }
      setClickTimeout(null)
    }, 250) // 250ms delay to detect double-click

    setClickTimeout(timeout)
  }

  const handleKeyDown = (e: React.KeyboardEvent, planetIndex: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      if (onScrollToPlanet) {
        onScrollToPlanet(planetIndex)
      }
    }
  }

  return (
    <div className="w-full py-8 bg-gradient-to-r from-gray-900/50 via-purple-900/30 to-blue-900/50 backdrop-blur-sm border-y border-white/10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Solar System Planets
        </h2>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 px-4 scroll-smooth"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255, 255, 255, 0.3) transparent",
          }}
        >
          {planets.map((planet, index) => (
            <div
              key={planet.name}
              onClick={() => handlePlanetClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={0}
              role="button"
              aria-label={`${planet.name} - Click to scroll to planet, double-click to open details`}
              className={`flex-shrink-0 flex flex-col items-center cursor-pointer transition-all duration-300 p-4 rounded-2xl group focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${
                selectedPlanet === index
                  ? "bg-white/20 shadow-lg scale-110 ring-2 ring-blue-400/50"
                  : focusedPlanet === index
                    ? "bg-white/15 shadow-md scale-105 ring-2 ring-purple-400/50"
                    : "hover:bg-white/10 hover:scale-105"
              }`}
              style={{ scrollSnapAlign: "center" }}
            >
              <div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${planet.gradient} mb-2 transition-all duration-300 flex items-center justify-center shadow-lg ${
                  selectedPlanet === index || focusedPlanet === index ? "scale-110 shadow-md shadow-white/20" : "group-hover:scale-110"
                }`}
              >
                <div className="w-2/3 h-2/3 rounded-full bg-white/10 backdrop-blur-sm"></div>
              </div>
              <div
                className={`text-sm md:text-base font-medium transition-all duration-300 ${
                  selectedPlanet === index
                    ? "text-white"
                    : focusedPlanet === index
                      ? "text-purple-300"
                      : `${planet.color} group-hover:text-white`
                }`}
              >
                {planet.name}
              </div>
              {selectedPlanet === index && <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 animate-pulse" />}
              {focusedPlanet === index && selectedPlanet !== index && (
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Scroll indicators for mobile */}
        <div className="flex justify-center mt-4 md:hidden">
          <div className="flex gap-1">
            {planets.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  selectedPlanet === index ? "bg-blue-400" : focusedPlanet === index ? "bg-purple-400" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Interaction hint */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-400">Click to scroll to planet • Double-click to open details</p>
        </div>
      </div>
    </div>
  )
}
