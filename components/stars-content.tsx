"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Sun, Moon, ArrowRight } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/modal"
import { StarModal } from "@/components/star-modal"

const starTypes = [
  {
    name: "Main Sequence Stars",
    description: "Stars in their stable hydrogen-burning phase, like our Sun.",
    icon: Sun,
    color: "from-yellow-400 to-orange-500",
    examples: ["Sun", "Alpha Centauri", "Sirius A"],
  },
  {
    name: "Red Giants",
    description: "Evolved stars that have expanded and cooled.",
    icon: Sparkles,
    color: "from-red-400 to-orange-600",
    examples: ["Betelgeuse", "Arcturus", "Aldebaran"],
  },
  {
    name: "White Dwarfs",
    description: "Dense remnants of low to medium mass stars.",
    icon: Moon,
    color: "from-white to-blue-200",
    examples: ["Sirius B", "Procyon B", "Van Maanen 2"],
  },
  {
    name: "Neutron Stars",
    description: "Extremely dense stellar remnants from massive star collapse.",
    icon: Zap,
    color: "from-purple-400 to-blue-600",
    examples: ["Pulsar PSR B1919+21", "Vela Pulsar", "Crab Pulsar"],
  },
]

const lifecycle = [
  { phase: "Stellar Nebula", description: "Gas and dust cloud begins to collapse" },
  { phase: "Protostar", description: "Dense core forms and heats up" },
  { phase: "Main Sequence", description: "Stable hydrogen fusion begins" },
  { phase: "Red Giant", description: "Star expands as hydrogen depletes" },
  { phase: "Planetary Nebula", description: "Outer layers are expelled" },
  { phase: "White Dwarf", description: "Dense core remains, slowly cooling" },
]

const detailedStarInfo = {
  0: {
    // Main Sequence Stars
    formation:
      "Main sequence stars form when a protostar's core reaches about 10 million Kelvin, initiating hydrogen fusion through the proton-proton chain reaction or CNO cycle for more massive stars.",
    lifespan:
      "Main sequence lifetime depends on stellar mass: our Sun will spend about 10 billion years in this phase, while massive O-type stars may only last 3-10 million years, and low-mass M-dwarfs can burn for trillions of years.",
    characteristics:
      "These stars maintain hydrostatic equilibrium between gravitational collapse and radiation pressure from nuclear fusion in their cores. They follow the mass-luminosity relationship where more massive stars are exponentially more luminous.",
    significance:
      "About 90% of all stars are currently in the main sequence phase, making it the most common stellar classification in the universe. They are the primary source of heavy element production through stellar nucleosynthesis.",
    temperature: "2,300 - 50,000 K",
    luminosity: "0.0001 - 1,000,000 L☉",
    spectralClass: "O, B, A, F, G, K, M",
    density: "0.1 - 150 g/cm³",
    magneticField: "1 - 10,000 Gauss",
  },
  1: {
    // Red Giants
    formation:
      "Red giants form when main sequence stars exhaust hydrogen in their cores, causing the core to contract and heat up while the outer layers expand dramatically. This occurs when stars leave the main sequence after burning through their core hydrogen.",
    lifespan:
      "The red giant phase typically lasts 1-2 billion years for Sun-like stars, representing about 10% of their total stellar lifetime. More massive stars have shorter red giant phases lasting only millions of years.",
    characteristics:
      "These stars have cool surface temperatures (2,200-4,000K) but enormous radii (10-100 times larger than main sequence stars), making them very luminous despite their cooler temperatures. They have strong stellar winds that can eject significant mass.",
    significance:
      "Red giants are crucial for enriching the interstellar medium with heavy elements through stellar winds and eventual planetary nebula formation. They represent a critical evolutionary phase for intermediate-mass stars.",
    temperature: "2,200 - 4,000 K",
    luminosity: "100 - 10,000 L☉",
    spectralClass: "K, M, S, C",
    density: "0.0001 - 0.01 g/cm³",
    magneticField: "1 - 100 Gauss",
  },
  2: {
    // White Dwarfs
    formation:
      "White dwarfs are the final evolutionary stage for stars with initial masses less than 8 solar masses. They form after the star sheds its outer layers as a planetary nebula, leaving behind the hot, dense core.",
    lifespan:
      "White dwarfs cool over trillions of years, eventually becoming cold black dwarfs - a process that takes longer than the current age of the universe (13.8 billion years). They represent the ultimate fate of 97% of all stars.",
    characteristics:
      "Extremely dense objects with masses comparable to the Sun but radii similar to Earth. They are supported by electron degeneracy pressure rather than nuclear fusion. A teaspoon of white dwarf material would weigh about 5 tons on Earth.",
    significance:
      "White dwarfs in binary systems can explode as Type Ia supernovae when they accrete matter and exceed the Chandrasekhar limit, serving as 'standard candles' for measuring cosmic distances and discovering dark energy.",
    temperature: "5,000 - 150,000 K",
    luminosity: "0.0001 - 0.1 L☉",
    spectralClass: "DA, DB, DO, DZ, DQ",
    density: "200,000 - 1,000,000 g/cm³",
    magneticField: "1,000 - 1,000,000,000 Gauss",
  },
  3: {
    // Neutron Stars
    formation:
      "Neutron stars form during core-collapse supernovae when stars with 8-25 solar masses exhaust their nuclear fuel. The core collapses in less than a second, crushing protons and electrons together to form neutrons.",
    lifespan:
      "Neutron stars can remain active as pulsars for millions of years, gradually slowing down as they lose rotational energy through magnetic braking. They can exist for billions of years, slowly cooling and spinning down.",
    characteristics:
      "Incredibly dense objects with masses 1.4-2 times the Sun compressed into a sphere only 20 km in diameter. They have magnetic fields trillions of times stronger than Earth's and can rotate hundreds of times per second.",
    significance:
      "Neutron star mergers produce heavy elements like gold and platinum through r-process nucleosynthesis, and create gravitational waves detectable by LIGO and Virgo observatories. They serve as cosmic laboratories for extreme physics.",
    temperature: "100,000 - 1,000,000 K",
    luminosity: "10^-6 - 100 L☉",
    spectralClass: "None (classified by radio/X-ray emissions)",
    density: "100,000,000 - 1,000,000,000 g/cm³",
    magneticField: "100,000,000 - 1,000,000,000,000 Gauss",
  },
}

const starQuickLinks = {
  0: {
    // Main Sequence Stars
    wikipedia: "https://en.wikipedia.org/wiki/Main_sequence",
    youtube: "https://www.youtube.com/watch?v=PM9CQDlQI0A",
  },
  1: {
    // Red Giants
    wikipedia: "https://en.wikipedia.org/wiki/Red_giant",
    youtube: "https://www.youtube.com/watch?v=mCscfR9VIPU",
  },
  2: {
    // White Dwarfs
    wikipedia: "https://en.wikipedia.org/wiki/White_dwarf",
    youtube: "https://www.youtube.com/watch?v=ruvQLW7-LSM",
  },
  3: {
    // Neutron Stars
    wikipedia: "https://en.wikipedia.org/wiki/Neutron_star",
    youtube: "https://www.youtube.com/watch?v=b2xEktioF5s",
  },
}

export function StarsContent() {
  const [modalStar, setModalStar] = useState<number | null>(null)

  return (
    <div className="space-y-16">
      {/* Star Types */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Types of Stars
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {starTypes.map((type, index) => (
            <Card
              key={index}
              className="backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
            >
              <CardHeader className="text-center">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${type.color} flex items-center justify-center mx-auto mb-4`}
                >
                  <type.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">{type.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{type.description}</p>
                <div className="space-y-2 mb-4">
                  <span className="text-sm text-gray-400">Examples:</span>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((example, i) => (
                      <Badge key={i} variant="secondary" className="bg-white/10 text-white border-white/20">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() => setModalStar(index)}
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-orange-600 hover:to-red-600 text-white border-0 rounded-xl transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stellar Lifecycle */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Stellar Lifecycle
        </h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full" />
          <div className="space-y-8">
            {lifecycle.map((phase, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                  <Card className="backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{phase.phase}</h3>
                      <p className="text-gray-300">{phase.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="relative z-10">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-4 border-gray-950" />
                </div>
                <div className="w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalStar !== null && (
        <Modal isOpen={modalStar !== null} onClose={() => setModalStar(null)} title={starTypes[modalStar].name}>
          <StarModal
            star={starTypes[modalStar]}
            detailedInfo={detailedStarInfo[modalStar]}
            quickLinks={starQuickLinks[modalStar]}
          />
        </Modal>
      )}
    </div>
  )
}
