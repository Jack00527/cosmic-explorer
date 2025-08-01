"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeftRight } from "lucide-react"
import { Modal } from "@/components/modal"
import { PlanetModal } from "@/components/planet-modal"
import { ComparisonTool } from "@/components/comparison-tool"

const planets = [
  {
    name: "Mercury",
    mass: "3.30 × 10²³ kg",
    radius: "2,439.7 km",
    distance: "57.9 million km",
    atmosphere: "Extremely thin",
    funFact: "A day on Mercury lasts 176 Earth days",
    image: "/planets/mercury.jpg",
    type: "Terrestrial",
  },
  {
    name: "Venus",
    mass: "4.87 × 10²⁴ kg",
    radius: "6,051.8 km",
    distance: "108.2 million km",
    atmosphere: "Dense CO₂",
    funFact: "Hottest planet in the solar system at 462°C",
    image: "/planets/venus.jpg",
    type: "Terrestrial",
  },
  {
    name: "Earth",
    mass: "5.97 × 10²⁴ kg",
    radius: "6,371 km",
    distance: "149.6 million km",
    atmosphere: "78% N₂, 21% O₂",
    funFact: "The only known planet with life",
    image: "/planets/earth.jpg",
    type: "Terrestrial",
  },
  {
    name: "Mars",
    mass: "6.42 × 10²³ kg",
    radius: "3,389.5 km",
    distance: "227.9 million km",
    atmosphere: "Thin CO₂",
    funFact: "Home to the largest volcano in the solar system",
    image: "/planets/mars.jpg",
    type: "Terrestrial",
  },
  {
    name: "Jupiter",
    mass: "1.90 × 10²⁷ kg",
    radius: "69,911 km",
    distance: "778.5 million km",
    atmosphere: "Hydrogen and Helium",
    funFact: "Has over 80 known moons",
    image: "/planets/jupiter.jpg",
    type: "Gas Giant",
  },
  {
    name: "Saturn",
    mass: "5.68 × 10²⁶ kg",
    radius: "58,232 km",
    distance: "1.43 billion km",
    atmosphere: "Hydrogen and Helium",
    funFact: "Could float in water due to its low density",
    image: "/planets/saturn.jpg",
    type: "Gas Giant",
  },
  {
    name: "Uranus",
    mass: "8.68 × 10²⁵ kg",
    radius: "25,362 km",
    distance: "2.87 billion km",
    atmosphere: "Hydrogen, Helium, Methane",
    funFact: "Rotates on its side at a 98° tilt",
    image: "/planets/uranus.jpg",
    type: "Ice Giant",
  },
  {
    name: "Neptune",
    mass: "1.02 × 10²⁶ kg",
    radius: "24,622 km",
    distance: "4.50 billion km",
    atmosphere: "Hydrogen, Helium, Methane",
    funFact: "Has the fastest winds in the solar system",
    image: "/planets/neptune.jpg",
    type: "Ice Giant",
  },
]

const detailedPlanetsInfo = {
  0: {
    // Mercury
    overview:
      "Mercury is the smallest planet in our Solar System and the closest to the Sun. It's only slightly larger than Earth's Moon.",
    composition:
      "Mercury has a large metallic core, roughly 75% of the planet's radius. The core is likely made of iron and is partially molten.",
    temperature: "Surface temperatures range from 427°C (800°F) during the day to -173°C (-280°F) at night.",
    exploration:
      "NASA's MESSENGER spacecraft orbited Mercury from 2011-2015, and the BepiColombo mission (ESA/JAXA) is currently en route.",
    uniqueFeatures:
      "Mercury has no atmosphere to retain heat, experiences extreme temperature variations, and has water ice in permanently shadowed craters at its poles.",
    gravity: "3.7 m/s² (38% of Earth)",
    dayLength: "176 Earth days",
    yearLength: "88 Earth days",
  },
  1: {
    // Venus
    overview:
      "Venus is the second planet from the Sun and the hottest in our Solar System due to its thick, toxic atmosphere.",
    composition:
      "Venus has a similar size and mass to Earth, with a rocky surface covered by volcanic plains and highland regions.",
    temperature:
      "Surface temperature is a constant 462°C (864°F) due to a runaway greenhouse effect caused by its dense CO₂ atmosphere.",
    exploration:
      "Over 40 spacecraft have visited Venus, including Soviet Venera landers and NASA's Magellan orbiter. Future missions include VERITAS and DAVINCI+.",
    uniqueFeatures:
      "Venus rotates backwards (retrograde rotation), has the longest day of any planet (243 Earth days), and has sulfuric acid clouds.",
    gravity: "8.87 m/s² (90% of Earth)",
    dayLength: "243 Earth days",
    yearLength: "225 Earth days",
  },
  2: {
    // Earth
    overview:
      "Earth is the third planet from the Sun and the only known planet to harbor life. It's our home world with diverse ecosystems.",
    composition:
      "Earth has a layered structure: crust, mantle, outer core, and inner core. 71% of the surface is covered by oceans.",
    temperature: "Global average temperature is about 15°C (59°F), with climate zones ranging from polar to tropical.",
    exploration:
      "Earth is continuously monitored by satellites and space stations. The International Space Station provides a unique orbital laboratory.",
    uniqueFeatures:
      "Earth has plate tectonics, a magnetic field that protects from solar radiation, one large moon, and a diverse biosphere with millions of species.",
    gravity: "9.81 m/s² (100% Earth standard)",
    dayLength: "24 hours",
    yearLength: "365.25 days",
  },
  3: {
    // Mars
    overview:
      "Mars is the fourth planet from the Sun, known as the Red Planet due to iron oxide on its surface. It's a prime target for future human exploration.",
    composition:
      "Mars has a thin atmosphere (mostly CO₂), polar ice caps, the largest volcano in the Solar System (Olympus Mons), and evidence of ancient water activity.",
    temperature:
      "Average temperature is -80°C (-112°F), with seasonal variations and daily temperature swings of up to 100°C.",
    exploration:
      "Multiple rovers including Curiosity and Perseverance are currently exploring Mars. NASA plans human missions in the 2030s.",
    uniqueFeatures:
      "Mars has two small moons (Phobos and Deimos), dust storms that can cover the entire planet, and possible subsurface liquid water.",
    gravity: "3.71 m/s² (38% of Earth)",
    dayLength: "24.6 hours",
    yearLength: "687 Earth days",
  },
  4: {
    // Jupiter
    overview:
      "Jupiter is the largest planet in our Solar System, a gas giant with a mass greater than all other planets combined.",
    composition:
      "Primarily hydrogen and helium, with a possible rocky core. Jupiter acts as a 'cosmic vacuum cleaner,' protecting inner planets from asteroids.",
    temperature: "Cloud-top temperature is about -145°C (-234°F), but the core may reach 20,000°C (36,000°F).",
    exploration:
      "Visited by Pioneer, Voyager, Galileo, and currently the Juno mission. Future missions include the Europa Clipper.",
    uniqueFeatures:
      "Jupiter has over 80 moons including the four Galilean moons, the Great Red Spot storm, and a faint ring system.",
    gravity: "24.79 m/s² (253% of Earth)",
    dayLength: "9.9 hours",
    yearLength: "12 Earth years",
  },
  5: {
    // Saturn
    overview:
      "Saturn is the sixth planet from the Sun, famous for its spectacular ring system. It's a gas giant with the lowest density of any planet.",
    composition:
      "Primarily hydrogen and helium with a small rocky core. Saturn's rings are made of ice particles and rocky debris.",
    temperature: "Average temperature is -178°C (-288°F), with winds reaching up to 1,800 km/h (1,100 mph).",
    exploration:
      "The Cassini-Huygens mission provided detailed studies from 2004-2017. The Huygens probe landed on Saturn's moon Titan.",
    uniqueFeatures:
      "Saturn has over 80 moons including Titan (larger than Mercury) and Enceladus (with subsurface ocean), and the most prominent ring system.",
    gravity: "10.44 m/s² (106% of Earth)",
    dayLength: "10.7 hours",
    yearLength: "29 Earth years",
  },
  6: {
    // Uranus
    overview:
      "Uranus is the seventh planet from the Sun, an ice giant that rotates on its side. It was the first planet discovered with a telescope.",
    composition:
      "Made of water, methane, and ammonia ices surrounding a rocky core. Its blue-green color comes from methane in the atmosphere.",
    temperature: "Coldest planetary atmosphere in the Solar System with minimum temperature of -224°C (-371°F).",
    exploration:
      "Only visited by Voyager 2 in 1986. Future missions to the ice giants are being planned by NASA and ESA.",
    uniqueFeatures:
      "Uranus has 27 known moons, a faint ring system, and rotates at a 98-degree tilt, essentially rolling along its orbital path.",
    gravity: "8.69 m/s² (89% of Earth)",
    dayLength: "17.2 hours",
    yearLength: "84 Earth years",
  },
  7: {
    // Neptune
    overview:
      "Neptune is the eighth and outermost planet in our Solar System, an ice giant with the strongest winds of any planet.",
    composition:
      "Similar to Uranus, composed of water, methane, and ammonia ices. Its deep blue color comes from methane absorption of red light.",
    temperature:
      "Average temperature is -214°C (-353°F), yet it radiates 2.6 times more energy than it receives from the Sun.",
    exploration:
      "Only visited by Voyager 2 in 1989. It was the first planet discovered through mathematical prediction rather than observation.",
    uniqueFeatures:
      "Neptune has 14 known moons including Triton (which orbits backwards), winds up to 2,100 km/h, and a faint ring system.",
    gravity: "11.15 m/s² (114% of Earth)",
    dayLength: "16.1 hours",
    yearLength: "165 Earth years",
  },
}

const planetQuickLinks = {
  0: {
    // Mercury
    wikipedia: "https://en.wikipedia.org/wiki/Mercury_(planet)",
    youtube: "https://www.youtube.com/watch?v=FYR2m5zc_jU",
  },
  1: {
    // Venus
    wikipedia: "https://en.wikipedia.org/wiki/Venus",
    youtube: "https://www.youtube.com/watch?v=Ix2uMMDjrm8",
  },
  2: {
    // Earth
    wikipedia: "https://en.wikipedia.org/wiki/Earth",
    youtube: "https://www.youtube.com/watch?v=RfBniXExA2I",
  },
  3: {
    // Mars
    wikipedia: "https://en.wikipedia.org/wiki/Mars",
    youtube: "https://www.youtube.com/watch?v=tnqLrufl0nE",
  },
  4: {
    // Jupiter
    wikipedia: "https://en.wikipedia.org/wiki/Jupiter",
    youtube: "https://www.youtube.com/watch?v=s5gyZezy4Jc",
  },
  5: {
    // Saturn
    wikipedia: "https://en.wikipedia.org/wiki/Saturn",
    youtube: "https://www.youtube.com/watch?v=514uBN7A0H4",
  },
  6: {
    // Uranus
    wikipedia: "https://en.wikipedia.org/wiki/Uranus",
    youtube: "https://www.youtube.com/watch?v=MqoHvE9oKLM",
  },
  7: {
    // Neptune
    wikipedia: "https://en.wikipedia.org/wiki/Neptune",
    youtube: "https://www.youtube.com/watch?v=1kQ7Zd8_k3I",
  },
}

interface PlanetsGridProps {
  focusedPlanet?: number | null
  onPlanetFocus?: (planetIndex: number | null) => void
  onOpenModal?: (planetIndex: number) => void
}

export function PlanetsGrid({ focusedPlanet, onPlanetFocus, onOpenModal }: PlanetsGridProps) {
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null)
  const [modalPlanet, setModalPlanet] = useState<number | null>(null)
  const [showComparison, setShowComparison] = useState(false)
  const planetRefs = useRef<(HTMLDivElement | null)[]>([])

  // Handle external modal opening
  useEffect(() => {
    if (onOpenModal && modalPlanet !== null) {
      onOpenModal(modalPlanet)
    }
  }, [modalPlanet, onOpenModal])

  const scrollToPlanet = (planetIndex: number) => {
    const planetElement = planetRefs.current[planetIndex]
    if (planetElement) {
      planetElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      })
      // Focus the planet for visual feedback
      if (onPlanetFocus) {
        onPlanetFocus(planetIndex)
      }
    }
  }

  const openPlanetModal = (planetIndex: number) => {
    setModalPlanet(planetIndex)
    setSelectedPlanet(planetIndex)
  }

  return (
    <div className="space-y-12">
      {/* Comparison Tool Button - Properly spaced */}
      <div className="flex justify-center py-8">
        <Button
          onClick={() => setShowComparison(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-red-600 text-white border-0 px-8 py-3 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <ArrowLeftRight className="mr-2 h-5 w-5" />
          Compare Planets
        </Button>
      </div>

      {/* Single horizontal divider above planet cards */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      {/* Planets Grid - Clean layout without vertical dividers */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-8">
        {planets.map((planet, index) => (
          <Card
            key={index}
            ref={(el) => { planetRefs.current[index] = el; }}
            className={`backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
              selectedPlanet === index ? "ring-2 ring-blue-400" : ""
            } ${focusedPlanet === index ? "ring-2 ring-purple-400 shadow-lg shadow-purple-400/20" : ""}`}
            onClick={() => setSelectedPlanet(selectedPlanet === index ? null : index)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">{planet.name}</h3>
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  {planet.type}
                </Badge>
              </div>

              <div className="w-20 h-20 mx-auto mb-6">
                <img
                  src={planet.image}
                  alt={planet.name}
                  className={`w-full h-full rounded-full object-cover shadow-lg transition-transform duration-300 ${focusedPlanet === index ? "animate-pulse-glow scale-110" : ""}`}
                />
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Mass:</span>
                  <span className="text-white">{planet.mass}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Radius:</span>
                  <span className="text-white">{planet.radius}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Distance:</span>
                  <span className="text-white">{planet.distance}</span>
                </div>

                {selectedPlanet === index && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                    <div>
                      <span className="text-gray-400 block mb-1">Atmosphere:</span>
                      <span className="text-white">{planet.atmosphere}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">Fun Fact:</span>
                      <span className="text-blue-300">{planet.funFact}</span>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        setModalPlanet(index)
                      }}
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl transition-all duration-300"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Planet Detail Modal */}
      {modalPlanet !== null && (
        <Modal isOpen={modalPlanet !== null} onClose={() => setModalPlanet(null)} title={planets[modalPlanet].name}>
          <PlanetModal
            planet={planets[modalPlanet]}
            detailedInfo={detailedPlanetsInfo[modalPlanet]}
            quickLinks={planetQuickLinks[modalPlanet]}
          />
        </Modal>
      )}

      {/* Comparison Tool Modal */}
      <ComparisonTool isOpen={showComparison} onClose={() => setShowComparison(false)} />
    </div>
  )
}
