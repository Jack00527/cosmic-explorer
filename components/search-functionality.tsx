"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

const searchData = [
  // Planets
  { type: "planet", name: "Mercury", keywords: ["smallest", "closest", "hot", "cold", "craters"], index: 0 },
  { type: "planet", name: "Venus", keywords: ["hottest", "greenhouse", "thick atmosphere", "retrograde"], index: 1 },
  { type: "planet", name: "Earth", keywords: ["life", "water", "blue", "home", "atmosphere"], index: 2 },
  { type: "planet", name: "Mars", keywords: ["red", "rovers", "olympus mons", "polar caps", "future"], index: 3 },
  {
    type: "planet",
    name: "Jupiter",
    keywords: ["largest", "gas giant", "great red spot", "moons", "storms"],
    index: 4,
  },
  { type: "planet", name: "Saturn", keywords: ["rings", "gas giant", "titan", "low density", "cassini"], index: 5 },
  { type: "planet", name: "Uranus", keywords: ["ice giant", "tilted", "sideways", "methane", "rings"], index: 6 },
  { type: "planet", name: "Neptune", keywords: ["ice giant", "windy", "blue", "triton", "farthest"], index: 7 },

  // General terms
  { type: "general", name: "Gas Giants", keywords: ["jupiter", "saturn", "hydrogen", "helium"], index: null },
  { type: "general", name: "Ice Giants", keywords: ["uranus", "neptune", "methane", "water"], index: null },
  { type: "general", name: "Terrestrial", keywords: ["mercury", "venus", "earth", "mars", "rocky"], index: null },
  { type: "general", name: "Solar System", keywords: ["planets", "sun", "orbit", "space"], index: null },
]

interface SearchFunctionalityProps {
  onPlanetSelect: (planetIndex: number) => void
  onSearchResult: (query: string, results: any[]) => void
}

export function SearchFunctionality({ onPlanetSelect, onSearchResult }: SearchFunctionalityProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim().length > 0) {
      const searchResults = searchData.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.keywords.some((keyword) => keyword.toLowerCase().includes(query.toLowerCase())),
      )
      setResults(searchResults)
      setIsOpen(searchResults.length > 0)
      setSelectedIndex(-1)
      // Remove the onSearchResult call from here to prevent infinite re-renders
    } else {
      setResults([])
      setIsOpen(false)
      setSelectedIndex(-1)
    }
  }, [query]) // Remove onSearchResult from dependencies

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % results.length)
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, results, selectedIndex])

  const handleResultClick = (result: any) => {
    if (result.type === "planet" && result.index !== null) {
      onPlanetSelect(result.index)
    }
    setQuery(result.name)
    setIsOpen(false)
    setSelectedIndex(-1)
    // Call onSearchResult here instead
    onSearchResult(result.name, [result])
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
    // Call onSearchResult here to clear results
    onSearchResult("", [])
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search planets, features, or facts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length > 0 && setIsOpen(true)}
          className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Results */}
          <div
            ref={resultsRef}
            className="absolute top-full mt-2 left-0 right-0 z-50 backdrop-blur-xl bg-gray-900/95 border border-white/30 rounded-2xl shadow-2xl max-h-80 overflow-y-auto"
          >
            <div className="p-2">
              {results.map((result, index) => (
                <div
                  key={`${result.type}-${result.name}`}
                  onClick={() => handleResultClick(result)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedIndex === index
                      ? "bg-blue-500/20 text-white"
                      : "hover:bg-white/10 text-gray-300 hover:text-white"
                  }`}
                >
                  <div className="flex-shrink-0">
                    {result.type === "planet" ? (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-xs">🪐</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
                        <Search className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{result.name}</div>
                    <div className="text-sm text-gray-400 truncate">
                      {result.type === "planet" ? "Planet" : "General"}
                    </div>
                  </div>
                  {result.type === "planet" && <div className="flex-shrink-0 text-xs text-gray-400">Click to view</div>}
                </div>
              ))}
            </div>

            {/* Search Tips */}
            <div className="border-t border-white/10 p-3 text-xs text-gray-400">
              <div className="flex items-center justify-between">
                <span>Use ↑↓ to navigate, Enter to select</span>
                <span>ESC to close</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
