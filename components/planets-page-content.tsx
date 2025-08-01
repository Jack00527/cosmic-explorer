"use client"

import { useState, useCallback } from "react"
import { PlanetsGrid } from "@/components/planets-grid"
import { PlanetScrollBar } from "@/components/planet-scroll-bar"
import { SearchFunctionality } from "@/components/search-functionality"
import { KeyboardNavigation } from "@/components/keyboard-navigation"

export function PlanetsPageContent() {
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null)
  const [focusedPlanet, setFocusedPlanet] = useState<number | null>(null)
  const [modalPlanet, setModalPlanet] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])

  // Add useCallback to prevent the function from changing on every render
  const handleSearchResult = useCallback((query: string, results: any[]) => {
    setSearchQuery(query)
    setSearchResults(results)
  }, [])

  const handlePlanetSelect = (planetIndex: number) => {
    setSelectedPlanet(planetIndex)
  }

  const handlePlanetFocus = (planetIndex: number | null) => {
    setFocusedPlanet(planetIndex)
    // Clear focus after 3 seconds
    if (planetIndex !== null) {
      setTimeout(() => {
        setFocusedPlanet(null)
      }, 3000)
    }
  }

  const handleOpenModal = (planetIndex: number) => {
    setModalPlanet(planetIndex)
    setSelectedPlanet(planetIndex)
    setFocusedPlanet(null) // Clear focus when modal opens
  }

  const handleCloseModal = () => {
    setModalPlanet(null)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Explore the Planets
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover the fascinating worlds that orbit our Sun, each with unique characteristics, atmospheres, and
            mysteries waiting to be explored.
          </p>

          {/* Search Functionality */}
          <SearchFunctionality onPlanetSelect={handlePlanetSelect} onSearchResult={handleSearchResult} />
        </div>

        {/* Planet Scroll Bar - Centered and well-spaced */}
        <div className="mb-12">
          <PlanetScrollBar
            selectedPlanet={selectedPlanet}
            onPlanetSelect={handlePlanetSelect}
            onScrollToPlanet={handlePlanetFocus}
            onOpenModal={handleOpenModal}
            focusedPlanet={focusedPlanet}
          />
        </div>

        {/* Search Results */}
        {searchQuery && searchResults.length > 0 && (
          <div className="mb-8 p-4 bg-blue-500/10 border border-blue-400/20 rounded-2xl">
            <h3 className="text-blue-300 font-semibold mb-2">
              Search Results for "{searchQuery}" ({searchResults.length} found)
            </h3>
            <div className="flex flex-wrap gap-2">
              {searchResults.map((result, index) => (
                <span key={index} className="px-3 py-1 bg-white/10 text-white rounded-lg text-sm">
                  {result.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Keyboard Navigation Instructions */}
        <div className="mb-12 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-2xl">
          <h3 className="text-purple-300 font-semibold mb-4 text-center">⌨️ Navigation Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-300">
            <div className="text-center">
              <strong className="text-white block mb-2">Keyboard</strong>
              <div>Arrow Keys: Navigate planets</div>
              <div>Enter/Space: Open details</div>
              <div>1-8 Keys: Jump to planet</div>
            </div>
            <div className="text-center">
              <strong className="text-white block mb-2">Planet Bar</strong>
              <div>Single Click: Scroll to planet</div>
              <div>Double Click: Open details</div>
              <div>Hover: Preview highlight</div>
            </div>
            <div className="text-center">
              <strong className="text-white block mb-2">Planet Cards</strong>
              <div>Click: Expand info</div>
              <div>Learn More: Full details</div>
              <div>Compare: Side-by-side view</div>
            </div>
          </div>
        </div>

        {/* Planets Grid - Now uses full width without sidebar space */}
        <PlanetsGrid focusedPlanet={focusedPlanet} onPlanetFocus={handlePlanetFocus} onOpenModal={handleOpenModal} />

        {/* Keyboard Navigation Handler */}
        <KeyboardNavigation
          selectedPlanet={selectedPlanet}
          onPlanetSelect={handlePlanetSelect}
          onOpenModal={handleOpenModal}
          onCloseModal={handleCloseModal}
          isModalOpen={modalPlanet !== null}
          totalPlanets={8}
        />
      </div>
    </div>
  )
}
