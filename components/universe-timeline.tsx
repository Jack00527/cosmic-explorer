"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const timelineEvents = [
  {
    time: "13.8 billion years ago",
    event: "The Big Bang",
    description: "The universe begins with a rapid expansion from an extremely hot, dense state.",
    era: "Planck Era",
    color: "from-red-500 to-orange-500",
  },
  {
    time: "13.7 billion years ago",
    event: "First Atoms Form",
    description: "Hydrogen and helium atoms form as the universe cools enough for electrons to bind to nuclei.",
    era: "Recombination",
    color: "from-orange-500 to-yellow-500",
  },
  {
    time: "13.6 billion years ago",
    event: "First Stars Ignite",
    description: "Population III stars form from primordial hydrogen and helium, beginning stellar nucleosynthesis.",
    era: "Stellar Era",
    color: "from-yellow-500 to-green-500",
  },
  {
    time: "13.2 billion years ago",
    event: "First Galaxies",
    description: "Gravity pulls matter together to form the first galaxies and galaxy clusters.",
    era: "Galactic Era",
    color: "from-green-500 to-blue-500",
  },
  {
    time: "9.2 billion years ago",
    event: "Milky Way Forms",
    description: "Our galaxy begins to take shape through mergers and accretion of smaller galaxies.",
    era: "Galactic Evolution",
    color: "from-blue-500 to-indigo-500",
  },
  {
    time: "4.6 billion years ago",
    event: "Solar System Birth",
    description: "Our Sun and solar system form from a collapsing molecular cloud.",
    era: "Solar Formation",
    color: "from-indigo-500 to-purple-500",
  },
  {
    time: "4.5 billion years ago",
    event: "Earth Forms",
    description: "Earth coalesces from the solar nebula and begins to differentiate into layers.",
    era: "Planetary Formation",
    color: "from-purple-500 to-pink-500",
  },
  {
    time: "3.8 billion years ago",
    event: "First Life",
    description: "Simple single-celled organisms appear in Earth's oceans.",
    era: "Abiogenesis",
    color: "from-pink-500 to-cyan-500",
  },
  {
    time: "Present Day",
    event: "Modern Universe",
    description: "The universe continues to expand, with ongoing star formation and evolution.",
    era: "Current Era",
    color: "from-cyan-500 to-blue-500",
  },
]

const detailedTimelineInfo = {
  0: {
    // Big Bang
    scientificDetails:
      "The Big Bang theory describes the universe's expansion from an extremely hot, dense initial state. In the first fraction of a second, the universe underwent cosmic inflation, expanding faster than light.",
    evidence:
      "Key evidence includes cosmic microwave background radiation, observed expansion of the universe (Hubble's Law), and the abundance of light elements like hydrogen and helium.",
    temperature:
      "Initial temperature was approximately 10^32 Kelvin, cooling rapidly as the universe expanded. By one second after the Big Bang, temperature dropped to about 10 billion Kelvin.",
    significance:
      "This event marks the beginning of space, time, matter, and energy as we know them. It set the initial conditions for all subsequent cosmic evolution.",
  },
  1: {
    // First Atoms
    scientificDetails:
      "Recombination occurred when the universe cooled to about 3,000 Kelvin, allowing electrons to combine with protons and alpha particles to form neutral hydrogen and helium atoms.",
    evidence:
      "The cosmic microwave background radiation we observe today is the afterglow of this event, providing a snapshot of the universe at 380,000 years old.",
    temperature:
      "Universe temperature dropped from 4,000 Kelvin to 3,000 Kelvin during this period, making it cool enough for stable atoms to form.",
    significance:
      "This event made the universe transparent to light for the first time, ending the 'Dark Ages' and allowing photons to travel freely through space.",
  },
  2: {
    // First Stars
    scientificDetails:
      "Population III stars formed from primordial gas clouds composed only of hydrogen and helium. These massive stars (100-1000 solar masses) had no heavy elements.",
    evidence:
      "While no Population III stars have been directly observed, their existence is inferred from nucleosynthesis models and observations of extremely metal-poor stars.",
    temperature:
      "Core temperatures reached 100 million Kelvin, enabling nuclear fusion. Surface temperatures were around 50,000-100,000 Kelvin, much hotter than our Sun.",
    significance:
      "These stars produced the first heavy elements through nuclear fusion and supernova explosions, seeding the universe with carbon, oxygen, and other elements essential for life.",
  },
  3: {
    // First Galaxies
    scientificDetails:
      "Early galaxies formed through hierarchical structure formation, where dark matter halos merged and accumulated gas to form the first stellar systems.",
    evidence:
      "The James Webb Space Telescope has observed galaxies that formed just 400-600 million years after the Big Bang, earlier than previously thought possible.",
    temperature:
      "Intergalactic medium temperature was around 100-1000 Kelvin, while star-forming regions reached millions of degrees due to stellar feedback.",
    significance:
      "Galaxy formation marked the beginning of large-scale structure in the universe and created the environments where complex chemistry and eventually life could develop.",
  },
  4: {
    // Milky Way
    scientificDetails:
      "The Milky Way formed through the merger of smaller protogalactic fragments and the accretion of gas from the intergalactic medium over billions of years.",
    evidence:
      "Stellar archaeology reveals multiple generations of star formation, and the galaxy's structure shows evidence of past mergers, including the ongoing collision with the Sagittarius dwarf galaxy.",
    temperature:
      "The galactic disk maintains temperatures of 10-100 Kelvin in molecular clouds, while the galactic halo contains hot gas at millions of degrees.",
    significance:
      "Our galaxy's formation created the stable environment necessary for the formation of our solar system and the development of life on Earth.",
  },
  5: {
    // Solar System
    scientificDetails:
      "The solar system formed from the gravitational collapse of a molecular cloud, possibly triggered by a nearby supernova. The Sun formed first, followed by planetary accretion in the protoplanetary disk.",
    evidence:
      "Meteorite analysis reveals the solar system's age as 4.567 billion years. Isotopic ratios in meteorites provide evidence for supernova triggering and early solar system processes.",
    temperature:
      "The solar nebula had temperatures ranging from 2000K near the forming Sun to just 10K in the outer regions, determining the composition of different planetary zones.",
    significance:
      "Solar system formation created the diverse worlds we see today and established the conditions that would eventually lead to the emergence of life on Earth.",
  },
  6: {
    // Earth Formation
    scientificDetails:
      "Earth formed through planetary accretion over 10-100 million years. The Moon likely formed from debris after a Mars-sized object called Theia collided with the early Earth.",
    evidence:
      "Radiometric dating of the oldest rocks and zircon crystals indicates Earth's age. The Moon's composition and angular momentum support the giant impact hypothesis.",
    temperature:
      "Early Earth was molten with surface temperatures exceeding 1200°C. It took hundreds of millions of years to cool enough for liquid water to exist.",
    significance:
      "Earth's formation and early evolution created the unique conditions for life: liquid water, a protective atmosphere, and a stable climate system.",
  },
  7: {
    // First Life
    scientificDetails:
      "Life likely emerged in hydrothermal vents or shallow pools through chemical evolution, where organic molecules self-organized into self-replicating systems.",
    evidence:
      "Stromatolites (layered rock structures created by cyanobacteria) and chemical signatures in ancient rocks provide evidence for early life forms.",
    temperature:
      "Early Earth's oceans were warmer than today (40-80°C), and hydrothermal vents reached temperatures of 100-400°C, providing energy for early biochemistry.",
    significance:
      "The emergence of life began the process of biological evolution that would eventually lead to complex ecosystems and intelligent life capable of understanding the cosmos.",
  },
  8: {
    // Present Day
    scientificDetails:
      "The universe continues expanding with acceleration due to dark energy. Star formation continues but at a much slower rate than in the past, and galaxies continue to merge and evolve.",
    evidence:
      "Observations of distant supernovae revealed cosmic acceleration. The cosmic microwave background and large-scale structure confirm our understanding of cosmic evolution.",
    temperature:
      "The cosmic microwave background temperature is now 2.7 Kelvin. The universe will continue cooling as it expands, eventually reaching near absolute zero.",
    significance:
      "We live in a unique epoch where stars still shine and complex structures exist. In the far future, the universe will become cold and dark as stars burn out.",
  },
}

export function UniverseTimeline() {
  const [expandedTimeline, setExpandedTimeline] = useState<number | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-full" />

      <div className="space-y-12">
        {timelineEvents.map((event, index) => (
          <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
            <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
              <Card
                className={`backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  selectedEvent === index ? "ring-2 ring-blue-400" : ""
                }`}
                onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                      {event.era}
                    </Badge>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${event.color}`} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{event.event}</h3>
                  <p className="text-sm text-blue-300 mb-3">{event.time}</p>
                  <p className="text-gray-300">{event.description}</p>

                  {selectedEvent === index && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-sm text-gray-400 mb-3">
                        Click to learn more about this cosmic milestone and its significance in the evolution of our
                        universe.
                      </p>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedTimeline(expandedTimeline === index ? null : index)
                        }}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white border-0 rounded-xl transition-all duration-300"
                      >
                        {expandedTimeline === index ? "Show Less" : "Learn More"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  {expandedTimeline === index && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-4 text-sm">
                      <div>
                        <h4 className="text-green-300 font-semibold mb-2">Scientific Details</h4>
                        <p className="text-gray-300 leading-relaxed">{detailedTimelineInfo[index].scientificDetails}</p>
                      </div>
                      <div>
                        <h4 className="text-green-300 font-semibold mb-2">Evidence</h4>
                        <p className="text-gray-300 leading-relaxed">{detailedTimelineInfo[index].evidence}</p>
                      </div>
                      <div>
                        <h4 className="text-green-300 font-semibold mb-2">Temperature</h4>
                        <p className="text-gray-300 leading-relaxed">{detailedTimelineInfo[index].temperature}</p>
                      </div>
                      <div>
                        <h4 className="text-green-300 font-semibold mb-2">Significance</h4>
                        <p className="text-gray-300 leading-relaxed">{detailedTimelineInfo[index].significance}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="relative z-10">
              <div
                className={`w-6 h-6 bg-gradient-to-r ${event.color} rounded-full border-4 border-gray-950 shadow-lg`}
              />
            </div>

            <div className="w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}
