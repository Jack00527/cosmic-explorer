"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Share2, Facebook, Twitter, Copy, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

interface PlanetModalProps {
  planet: {
    name: string
    mass: string
    radius: string
    distance: string
    atmosphere: string
    funFact: string
    color: string
    type: string
  }
  detailedInfo: {
    overview: string
    composition: string
    temperature: string
    exploration: string
    uniqueFeatures: string
    moons?: string
    gravity?: string
    dayLength?: string
    yearLength?: string
  }
  quickLinks: {
    wikipedia: string
    youtube: string
  }
}

// Mock image gallery data - in a real app, these would be actual planet images
const planetImageGalleries = {
  Mercury: [
    "/placeholder.svg?height=400&width=400&text=Mercury+Surface",
    "/placeholder.svg?height=400&width=400&text=Mercury+Craters",
    "/placeholder.svg?height=400&width=400&text=Mercury+Transit",
  ],
  Venus: [
    "/placeholder.svg?height=400&width=400&text=Venus+Surface",
    "/placeholder.svg?height=400&width=400&text=Venus+Clouds",
    "/placeholder.svg?height=400&width=400&text=Venus+Radar+Map",
  ],
  Earth: [
    "/placeholder.svg?height=400&width=400&text=Earth+Blue+Marble",
    "/placeholder.svg?height=400&width=400&text=Earth+Night+Lights",
    "/placeholder.svg?height=400&width=400&text=Earth+From+Space",
  ],
  Mars: [
    "/placeholder.svg?height=400&width=400&text=Mars+Surface",
    "/placeholder.svg?height=400&width=400&text=Mars+Polar+Caps",
    "/placeholder.svg?height=400&width=400&text=Mars+Olympus+Mons",
  ],
  Jupiter: [
    "/placeholder.svg?height=400&width=400&text=Jupiter+Great+Red+Spot",
    "/placeholder.svg?height=400&width=400&text=Jupiter+Moons",
    "/placeholder.svg?height=400&width=400&text=Jupiter+Storms",
  ],
  Saturn: [
    "/placeholder.svg?height=400&width=400&text=Saturn+Rings",
    "/placeholder.svg?height=400&width=400&text=Saturn+Hexagon",
    "/placeholder.svg?height=400&width=400&text=Saturn+Moons",
  ],
  Uranus: [
    "/placeholder.svg?height=400&width=400&text=Uranus+Tilted",
    "/placeholder.svg?height=400&width=400&text=Uranus+Rings",
    "/placeholder.svg?height=400&width=400&text=Uranus+Moons",
  ],
  Neptune: [
    "/placeholder.svg?height=400&width=400&text=Neptune+Blue",
    "/placeholder.svg?height=400&width=400&text=Neptune+Storms",
    "/placeholder.svg?height=400&width=400&text=Neptune+Triton",
  ],
}

export function PlanetModal({ planet, detailedInfo, quickLinks }: PlanetModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const images = planetImageGalleries[planet.name] || []

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/planets#${planet.name.toLowerCase()}`
  const shareText = `Check out ${planet.name} on Cosmic Explorer! ${planet.funFact}`

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedText = encodeURIComponent(shareText)

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, "_blank")
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank")
        break
      case "copy":
        navigator.clipboard.writeText(shareUrl)
        setShowShareMenu(false)
        break
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Mobile Layout - Stack vertically */}
      <div className="block lg:hidden space-y-6">
        {/* Image Gallery - Mobile */}
        <div className="w-full">
          <div className="relative aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
            <img
              src={images[currentImageIndex] || `/placeholder.svg?height=300&width=300&text=${planet.name}`}
              alt={`${planet.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Gallery Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Planet Visualization Overlay */}
          <div className="flex justify-center mt-4">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${planet.color} shadow-lg animate-pulse-glow`} />
          </div>
        </div>

        {/* Basic Info - Mobile */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Basic Properties</h3>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              {planet.type}
            </Badge>
          </div>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-2">
                <span className="text-lg">🪐</span> Mass:
              </span>
              <span className="text-white font-medium">{planet.mass}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-2">
                <span className="text-lg">📏</span> Radius:
              </span>
              <span className="text-white font-medium">{planet.radius}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-2">
                <span className="text-lg">🌌</span> Distance from Sun:
              </span>
              <span className="text-white font-medium">{planet.distance}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-2">
                <span className="text-lg">🌫️</span> Atmosphere:
              </span>
              <span className="text-white font-medium">{planet.atmosphere}</span>
            </div>
            {detailedInfo.gravity && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400 flex items-center gap-2">
                  <span className="text-lg">🌀</span> Gravity:
                </span>
                <span className="text-white font-medium">{detailedInfo.gravity}</span>
              </div>
            )}
            {detailedInfo.dayLength && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400 flex items-center gap-2">
                  <span className="text-lg">☀️</span> Day Length:
                </span>
                <span className="text-white font-medium">{detailedInfo.dayLength}</span>
              </div>
            )}
            {detailedInfo.yearLength && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400 flex items-center gap-2">
                  <span className="text-lg">🔁</span> Year Length:
                </span>
                <span className="text-white font-medium">{detailedInfo.yearLength}</span>
              </div>
            )}
          </div>
        </div>

        {/* Share & Quick Links - Mobile */}
        <div className="space-y-4">
          {/* Share Button */}
          <div className="relative">
            <Button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-teal-600 hover:to-cyan-600 text-white border-0 rounded-xl transition-all duration-300"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share {planet.name}
            </Button>

            {/* Enhanced Share Menu */}
            {showShareMenu && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                  onClick={() => setShowShareMenu(false)}
                />

                {/* Share Menu */}
                <div className="absolute top-full mt-2 left-0 right-0 z-50 backdrop-blur-xl bg-gray-900/90 border border-white/30 rounded-2xl p-6 shadow-2xl animate-in fade-in-0 slide-in-from-top-2 duration-300">
                  <h4 className="text-white font-semibold mb-4 text-center">Share {planet.name}</h4>
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleShare("twitter")}
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-blue-500/20 hover:text-blue-300 transition-all duration-300 rounded-xl p-4"
                    >
                      <Twitter className="mr-3 h-5 w-5" />
                      Share on Twitter
                    </Button>
                    <Button
                      onClick={() => handleShare("facebook")}
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-blue-600/20 hover:text-blue-300 transition-all duration-300 rounded-xl p-4"
                    >
                      <Facebook className="mr-3 h-5 w-5" />
                      Share on Facebook
                    </Button>
                    <Button
                      onClick={() => handleShare("copy")}
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-green-500/20 hover:text-green-300 transition-all duration-300 rounded-xl p-4"
                    >
                      <Copy className="mr-3 h-5 w-5" />
                      Copy Link
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Quick Links */}
          <div className="backdrop-blur-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-2xl p-4">
            <h3 className="text-lg font-bold text-blue-300 mb-3">Quick Links</h3>
            <div className="space-y-2">
              <Button
                asChild
                variant="outline"
                className="w-full justify-start border-white/20 text-white hover:bg-white/10 rounded-xl bg-transparent"
              >
                <a href={quickLinks.wikipedia} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Wikipedia – {planet.name}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start border-white/20 text-white hover:bg-white/10 rounded-xl bg-transparent"
              >
                <a href={quickLinks.youtube} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  YouTube – {planet.name} Explained
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Content Sections - Mobile */}
        <div className="space-y-4">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4">
            <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
              <span className="text-xl">📖</span> Overview
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">{detailedInfo.overview}</p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4">
            <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
              <span className="text-xl">🧱</span> Composition & Structure
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">{detailedInfo.composition}</p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4">
            <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
              <span className="text-xl">🌡️</span> Temperature & Climate
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">{detailedInfo.temperature}</p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4">
            <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
              <span className="text-xl">🚀</span> Exploration History
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">{detailedInfo.exploration}</p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4">
            <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
              <span className="text-xl">✨</span> Unique Features
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">{detailedInfo.uniqueFeatures}</p>
          </div>

          <div className="backdrop-blur-md bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-2xl p-4">
            <h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
              <span className="text-xl">💡</span> Did You Know?
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">{planet.funFact}</p>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Side by side */}
      <div className="hidden lg:grid lg:grid-cols-[400px_1fr] xl:grid-cols-[450px_1fr] gap-8">
        {/* Left Section - Fixed width */}
        <div className="space-y-6">
          {/* Image Gallery - Desktop */}
          <div className="relative">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
              <img
                src={images[currentImageIndex] || `/placeholder.svg?height=400&width=400&text=${planet.name}`}
                alt={`${planet.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Gallery Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Planet Visualization Overlay */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20">
              <div
                className={`w-full h-full rounded-full bg-gradient-to-br ${planet.color} shadow-2xl animate-pulse-glow`}
              />
            </div>
          </div>

          {/* Share Button - Desktop */}
          <div className="relative">
            <Button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-teal-600 hover:to-cyan-600 text-white border-0 rounded-xl transition-all duration-300"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share {planet.name}
            </Button>

            {/* Enhanced Share Menu - Desktop */}
            {showShareMenu && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                  onClick={() => setShowShareMenu(false)}
                />

                {/* Share Menu */}
                <div className="absolute top-full mt-3 left-0 right-0 z-50 backdrop-blur-xl bg-gray-900/90 border border-white/30 rounded-2xl p-6 shadow-2xl animate-in fade-in-0 slide-in-from-top-2 duration-300">
                  <h4 className="text-white font-semibold mb-4 text-center">Share {planet.name}</h4>
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleShare("twitter")}
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-blue-500/20 hover:text-blue-300 transition-all duration-300 rounded-xl p-4"
                    >
                      <Twitter className="mr-3 h-5 w-5" />
                      Share on Twitter
                    </Button>
                    <Button
                      onClick={() => handleShare("facebook")}
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-blue-600/20 hover:text-blue-300 transition-all duration-300 rounded-xl p-4"
                    >
                      <Facebook className="mr-3 h-5 w-5" />
                      Share on Facebook
                    </Button>
                    <Button
                      onClick={() => handleShare("copy")}
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-green-500/20 hover:text-green-300 transition-all duration-300 rounded-xl p-4"
                    >
                      <Copy className="mr-3 h-5 w-5" />
                      Copy Link
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Quick Links - Desktop */}
          <div className="backdrop-blur-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-blue-300 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Button
                asChild
                variant="outline"
                className="w-full justify-start border-white/20 text-white hover:bg-white/10 rounded-xl bg-transparent"
              >
                <a href={quickLinks.wikipedia} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Wikipedia – {planet.name}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start border-white/20 text-white hover:bg-white/10 rounded-xl bg-transparent"
              >
                <a href={quickLinks.youtube} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  YouTube – {planet.name} Explained
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Section - Flexible width */}
        <div className="space-y-6 min-w-0">
          {/* Basic Info - Desktop */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Basic Properties</h3>
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                {planet.type}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400 flex items-center gap-2 mb-1">
                  <span className="text-lg">🪐</span> Mass
                </span>
                <span className="text-white font-medium">{planet.mass}</span>
              </div>
              <div>
                <span className="text-gray-400 flex items-center gap-2 mb-1">
                  <span className="text-lg">📏</span> Radius
                </span>
                <span className="text-white font-medium">{planet.radius}</span>
              </div>
              <div>
                <span className="text-gray-400 flex items-center gap-2 mb-1">
                  <span className="text-lg">🌌</span> Distance from Sun
                </span>
                <span className="text-white font-medium">{planet.distance}</span>
              </div>
              <div>
                <span className="text-gray-400 flex items-center gap-2 mb-1">
                  <span className="text-lg">🌫️</span> Atmosphere
                </span>
                <span className="text-white font-medium">{planet.atmosphere}</span>
              </div>
              {detailedInfo.gravity && (
                <div>
                  <span className="text-gray-400 flex items-center gap-2 mb-1">
                    <span className="text-lg">🌀</span> Gravity
                  </span>
                  <span className="text-white font-medium">{detailedInfo.gravity}</span>
                </div>
              )}
              {detailedInfo.dayLength && (
                <div>
                  <span className="text-gray-400 flex items-center gap-2 mb-1">
                    <span className="text-lg">☀️</span> Day Length
                  </span>
                  <span className="text-white font-medium">{detailedInfo.dayLength}</span>
                </div>
              )}
              {detailedInfo.yearLength && (
                <div className="col-span-2">
                  <span className="text-gray-400 flex items-center gap-2 mb-1">
                    <span className="text-lg">🔁</span> Year Length
                  </span>
                  <span className="text-white font-medium">{detailedInfo.yearLength}</span>
                </div>
              )}
            </div>
          </div>

          {/* Content Sections - Desktop */}
          <div className="space-y-6">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                <span className="text-2xl">📖</span> Overview
              </h3>
              <p className="text-gray-300 leading-relaxed">{detailedInfo.overview}</p>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                <span className="text-2xl">🧱</span> Composition & Structure
              </h3>
              <p className="text-gray-300 leading-relaxed">{detailedInfo.composition}</p>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                <span className="text-2xl">🌡️</span> Temperature & Climate
              </h3>
              <p className="text-gray-300 leading-relaxed">{detailedInfo.temperature}</p>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                <span className="text-2xl">🚀</span> Exploration History
              </h3>
              <p className="text-gray-300 leading-relaxed">{detailedInfo.exploration}</p>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                <span className="text-2xl">✨</span> Unique Features
              </h3>
              <p className="text-gray-300 leading-relaxed">{detailedInfo.uniqueFeatures}</p>
            </div>

            <div className="backdrop-blur-md bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span> Did You Know?
              </h3>
              <p className="text-gray-300 leading-relaxed">{planet.funFact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
