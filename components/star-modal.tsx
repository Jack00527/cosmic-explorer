"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Share2, Facebook, Twitter, Copy, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

interface StarModalProps {
  star: {
    name: string
    description: string
    icon: any
    color: string
    examples: string[]
  }
  detailedInfo: {
    formation: string
    lifespan: string
    characteristics: string
    significance: string
    temperature?: string
    luminosity?: string
    spectralClass?: string
    density?: string
    magneticField?: string
  }
  quickLinks: {
    wikipedia: string
    youtube: string
  }
}

// Mock image gallery data for star types
const starImageGalleries = {
  "Main Sequence Stars": [
    "/placeholder.svg?height=300&width=400&text=Sun+Corona",
    "/placeholder.svg?height=300&width=400&text=Solar+Flares",
    "/placeholder.svg?height=300&width=400&text=Stellar+Comparison",
  ],
  "Red Giants": [
    "/placeholder.svg?height=300&width=400&text=Betelgeuse+Red+Giant",
    "/placeholder.svg?height=300&width=400&text=Red+Giant+Structure",
    "/placeholder.svg?height=300&width=400&text=Stellar+Evolution",
  ],
  "White Dwarfs": [
    "/placeholder.svg?height=300&width=400&text=White+Dwarf+Sirius+B",
    "/placeholder.svg?height=300&width=400&text=Planetary+Nebula",
    "/placeholder.svg?height=300&width=400&text=White+Dwarf+Cooling",
  ],
  "Neutron Stars": [
    "/placeholder.svg?height=300&width=400&text=Pulsar+Beams",
    "/placeholder.svg?height=300&width=400&text=Neutron+Star+Merger",
    "/placeholder.svg?height=300&width=400&text=Magnetosphere",
  ],
}

export function StarModal({ star, detailedInfo, quickLinks }: StarModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const images = starImageGalleries[star.name] || []

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/stars#${star.name.toLowerCase().replace(/\s+/g, "-")}`
  const shareText = `Learn about ${star.name} on Cosmic Explorer! Fascinating stellar phenomena explained.`

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
    <div className="p-6">
      <div className="grid lg:grid-cols-[35%_65%] gap-8">
        {/* Left Section - 35% width */}
        <div className="space-y-6">
          {/* Image Gallery */}
          <div className="relative">
            <div className="aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
              <img
                src={
                  images[currentImageIndex] ||
                  `/placeholder.svg?height=280&width=280&text=${star.name.replace(/\s+/g, "+")}`
                }
                alt={`${star.name} - Image ${currentImageIndex + 1}`}
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

            {/* Star Visualization Overlay */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20">
              <div
                className={`w-full h-full rounded-full bg-gradient-to-br ${star.color} shadow-2xl animate-pulse-glow flex items-center justify-center`}
              >
                <star.icon className="h-8 w-8 text-white opacity-80" />
              </div>
            </div>
          </div>

          {/* Share Button */}
          <div className="relative">
            <Button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-teal-600 hover:to-cyan-600 text-white border-0 rounded-xl transition-all duration-300"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share {star.name}
            </Button>

            {/* Share Menu */}
            {showShareMenu && (
              <div className="absolute top-full mt-2 left-0 right-0 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 z-10">
                <div className="space-y-2">
                  <Button
                    onClick={() => handleShare("twitter")}
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/10"
                  >
                    <Twitter className="mr-2 h-4 w-4" />
                    Share on Twitter
                  </Button>
                  <Button
                    onClick={() => handleShare("facebook")}
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/10"
                  >
                    <Facebook className="mr-2 h-4 w-4" />
                    Share on Facebook
                  </Button>
                  <Button
                    onClick={() => handleShare("copy")}
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/10"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Famous Examples */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Famous Examples</h3>
            <div className="flex flex-wrap gap-2">
              {star.examples.map((example, i) => (
                <Badge key={i} variant="secondary" className="bg-white/10 text-white border-white/20 px-3 py-1">
                  {example}
                </Badge>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
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
                  Wikipedia – {star.name}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start border-white/20 text-white hover:bg-white/10 rounded-xl bg-transparent"
              >
                <a href={quickLinks.youtube} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  YouTube – {star.name} Explained
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Section - 65% width */}
        <div className="space-y-6">
          {/* Overview */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-yellow-300 mb-3">Overview</h3>
            <p className="text-gray-300 leading-relaxed">{star.description}</p>
          </div>

          {/* Stellar Properties */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-yellow-300 mb-4">Stellar Properties</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {detailedInfo.temperature && (
                <div>
                  <span className="text-gray-400 block mb-1">Temperature</span>
                  <span className="text-white font-medium">{detailedInfo.temperature}</span>
                </div>
              )}
              {detailedInfo.luminosity && (
                <div>
                  <span className="text-gray-400 block mb-1">Luminosity</span>
                  <span className="text-white font-medium">{detailedInfo.luminosity}</span>
                </div>
              )}
              {detailedInfo.spectralClass && (
                <div>
                  <span className="text-gray-400 block mb-1">Spectral Class</span>
                  <span className="text-white font-medium">{detailedInfo.spectralClass}</span>
                </div>
              )}
              {detailedInfo.density && (
                <div>
                  <span className="text-gray-400 block mb-1">Density</span>
                  <span className="text-white font-medium">{detailedInfo.density}</span>
                </div>
              )}
              {detailedInfo.magneticField && (
                <div className="col-span-2">
                  <span className="text-gray-400 block mb-1">Magnetic Field</span>
                  <span className="text-white font-medium">{detailedInfo.magneticField}</span>
                </div>
              )}
            </div>
          </div>

          {/* Formation Process */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-yellow-300 mb-3">Formation Process</h3>
            <p className="text-gray-300 leading-relaxed">{detailedInfo.formation}</p>
          </div>

          {/* Stellar Lifespan */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-yellow-300 mb-3">Stellar Lifespan</h3>
            <p className="text-gray-300 leading-relaxed">{detailedInfo.lifespan}</p>
          </div>

          {/* Key Characteristics */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-yellow-300 mb-3">Key Characteristics</h3>
            <p className="text-gray-300 leading-relaxed">{detailedInfo.characteristics}</p>
          </div>

          {/* Cosmic Significance */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-yellow-300 mb-3">Cosmic Significance</h3>
            <p className="text-gray-300 leading-relaxed">{detailedInfo.significance}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
