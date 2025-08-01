"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"

const planets = [
  { name: "Mercury", emoji: "☿️", color: "text-gray-400" },
  { name: "Venus", emoji: "♀️", color: "text-yellow-400" },
  { name: "Earth", emoji: "🌍", color: "text-blue-400" },
  { name: "Mars", emoji: "♂️", color: "text-red-400" },
  { name: "Jupiter", emoji: "♃", color: "text-orange-400" },
  { name: "Saturn", emoji: "♄", color: "text-yellow-300" },
  { name: "Uranus", emoji: "♅", color: "text-cyan-400" },
  { name: "Neptune", emoji: "♆", color: "text-blue-500" },
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
                className={`text-4xl md:text-5xl mb-2 transition-all duration-300 ${
                  selectedPlanet === index || focusedPlanet === index ? "scale-110" : "group-hover:scale-110"
                }`}
              >
                {planet.emoji}
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
