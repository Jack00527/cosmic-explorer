"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeftRight, X } from "lucide-react"
import { PlanetSizeComparison } from "@/components/planet-size-comparison"

const planets = [
  {
    name: "Mercury",
    mass: "3.30 × 10²³ kg",
    radius: "2,439.7 km",
    distance: "57.9 million km",
    atmosphere: "Extremely thin",
    gravity: "3.7 m/s²",
    dayLength: "176 Earth days",
    yearLength: "88 Earth days",
    temperature: "427°C to -173°C",
    moons: "0",
    type: "Terrestrial",
    color: "from-gray-400 to-gray-600",
  },
  {
    name: "Venus",
    mass: "4.87 × 10²⁴ kg",
    radius: "6,051.8 km",
    distance: "108.2 million km",
    atmosphere: "Dense CO₂",
    gravity: "8.87 m/s²",
    dayLength: "243 Earth days",
    yearLength: "225 Earth days",
    temperature: "462°C (constant)",
    moons: "0",
    type: "Terrestrial",
    color: "from-yellow-400 to-orange-500",
  },
  {
    name: "Earth",
    mass: "5.97 × 10²⁴ kg",
    radius: "6,371 km",
    distance: "149.6 million km",
    atmosphere: "78% N₂, 21% O₂",
    gravity: "9.81 m/s²",
    dayLength: "24 hours",
    yearLength: "365.25 days",
    temperature: "15°C (average)",
    moons: "1",
    type: "Terrestrial",
    color: "from-blue-400 to-green-500",
  },
  {
    name: "Mars",
    mass: "6.42 × 10²³ kg",
    radius: "3,389.5 km",
    distance: "227.9 million km",
    atmosphere: "Thin CO₂",
    gravity: "3.71 m/s²",
    dayLength: "24.6 hours",
    yearLength: "687 Earth days",
    temperature: "-80°C (average)",
    moons: "2",
    type: "Terrestrial",
    color: "from-red-500 to-orange-600",
  },
  {
    name: "Jupiter",
    mass: "1.90 × 10²⁷ kg",
    radius: "69,911 km",
    distance: "778.5 million km",
    atmosphere: "Hydrogen and Helium",
    gravity: "24.79 m/s²",
    dayLength: "9.9 hours",
    yearLength: "12 Earth years",
    temperature: "-145°C (cloud tops)",
    moons: "80+",
    type: "Gas Giant",
    color: "from-orange-400 to-yellow-600",
  },
  {
    name: "Saturn",
    mass: "5.68 × 10²⁶ kg",
    radius: "58,232 km",
    distance: "1.43 billion km",
    atmosphere: "Hydrogen and Helium",
    gravity: "10.44 m/s²",
    dayLength: "10.7 hours",
    yearLength: "29 Earth years",
    temperature: "-178°C (average)",
    moons: "80+",
    type: "Gas Giant",
    color: "from-yellow-300 to-amber-500",
  },
  {
    name: "Uranus",
    mass: "8.68 × 10²⁵ kg",
    radius: "25,362 km",
    distance: "2.87 billion km",
    atmosphere: "Hydrogen, Helium, Methane",
    gravity: "8.69 m/s²",
    dayLength: "17.2 hours",
    yearLength: "84 Earth years",
    temperature: "-224°C (minimum)",
    moons: "27",
    type: "Ice Giant",
    color: "from-cyan-400 to-blue-500",
  },
  {
    name: "Neptune",
    mass: "1.02 × 10²⁶ kg",
    radius: "24,622 km",
    distance: "4.50 billion km",
    atmosphere: "Hydrogen, Helium, Methane",
    gravity: "11.15 m/s²",
    dayLength: "16.1 hours",
    yearLength: "165 Earth years",
    temperature: "-214°C (average)",
    moons: "14",
    type: "Ice Giant",
    color: "from-blue-500 to-indigo-600",
  },
]

const starTypes = [
  {
    name: "Main Sequence Stars",
    mass: "0.08 - 100 solar masses",
    radius: "0.1 - 15 solar radii",
    temperature: "2,300 - 50,000 K",
    luminosity: "0.0001 - 1,000,000 L☉",
    lifespan: "10 million - 100 billion years",
    density: "0.1 - 150 g/cm³",
    spectralClass: "O, B, A, F, G, K, M",
    examples: "Sun, Alpha Centauri, Sirius A",
    type: "Stellar Object",
    color: "from-yellow-400 to-orange-500",
  },
  {
    name: "Red Giants",
    mass: "0.5 - 8 solar masses",
    radius: "10 - 100 solar radii",
    temperature: "2,200 - 4,000 K",
    luminosity: "100 - 10,000 L☉",
    lifespan: "1 - 2 billion years",
    density: "0.0001 - 0.01 g/cm³",
    spectralClass: "K, M, S, C",
    examples: "Betelgeuse, Arcturus, Aldebaran",
    type: "Stellar Object",
    color: "from-red-400 to-orange-600",
  },
  {
    name: "White Dwarfs",
    mass: "0.5 - 1.4 solar masses",
    radius: "0.008 - 0.02 solar radii",
    temperature: "5,000 - 150,000 K",
    luminosity: "0.0001 - 0.1 L☉",
    lifespan: "Trillions of years",
    density: "200,000 - 1,000,000 g/cm³",
    spectralClass: "DA, DB, DO, DZ, DQ",
    examples: "Sirius B, Procyon B, Van Maanen 2",
    type: "Stellar Object",
    color: "from-white to-blue-200",
  },
  {
    name: "Neutron Stars",
    mass: "1.4 - 2 solar masses",
    radius: "10 - 15 km",
    temperature: "100,000 - 1,000,000 K",
    luminosity: "10^-6 - 100 L☉",
    lifespan: "Billions of years",
    density: "100,000,000 - 1,000,000,000 g/cm³",
    spectralClass: "Radio/X-ray emissions",
    examples: "Pulsar PSR B1919+21, Vela Pulsar, Crab Pulsar",
    type: "Stellar Object",
    color: "from-purple-400 to-blue-600",
  },
]

interface ComparisonToolProps {
  isOpen: boolean
  onClose: () => void
}

export function ComparisonTool({ isOpen, onClose }: ComparisonToolProps) {
  const [selectedPlanet1, setSelectedPlanet1] = useState<string>("")
  const [selectedPlanet2, setSelectedPlanet2] = useState<string>("")
  const [selectedStar1, setSelectedStar1] = useState<string>("")
  const [selectedStar2, setSelectedStar2] = useState<string>("")
  const [comparisonType, setComparisonType] = useState<"planets" | "stars">("planets")

  // Lock scroll and notify navbar when this modal opens/closes
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = "hidden"
    window.dispatchEvent(new CustomEvent("modal-open"))

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = "unset"
      window.dispatchEvent(new CustomEvent("modal-close"))
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const planet1 = planets.find((p) => p.name === selectedPlanet1)
  const planet2 = planets.find((p) => p.name === selectedPlanet2)
  const star1 = starTypes.find((s) => s.name === selectedStar1)
  const star2 = starTypes.find((s) => s.name === selectedStar2)

  const renderPlanetComparison = () => {
    if (!planet1 || !planet2) return null

    // Helper function to compare numeric values
    const compareNumeric = (val1, val2) => {
      // Extract numbers from strings
      const num1 = parseFloat(val1.replace(/[^0-9.]/g, ''));
      const num2 = parseFloat(val2.replace(/[^0-9.]/g, ''));
      
      if (isNaN(num1) || isNaN(num2)) return null; // Can't compare
      return num1 > num2 ? 1 : (num2 > num1 ? 2 : 0); // 1 if val1 is greater, 2 if val2 is greater, 0 if equal
    };

    // Helper function to determine which value is greater
    const compareValues = (label, val1, val2) => {
      // For moons, we can directly compare numeric values
      if (label === "Moons") {
        const moonCount1 = parseInt(val1.replace(/\+/g, ''));
        const moonCount2 = parseInt(val2.replace(/\+/g, ''));
        return moonCount1 > moonCount2 ? 1 : (moonCount2 > moonCount1 ? 2 : 0);
      }
      
      // For gravity, we can extract the numeric part
      if (label === "Gravity") {
        return compareNumeric(val1, val2);
      }
      
      // For radius, we can extract the numeric part
      if (label === "Radius") {
        return compareNumeric(val1, val2);
      }
      
      // For mass, we need to handle scientific notation
      if (label === "Mass") {
        // Extract the exponent
        const exp1 = val1.match(/10(\^|²|³|⁴|⁵|⁶|⁷|⁸|⁹)(\d+)/);
        const exp2 = val2.match(/10(\^|²|³|⁴|⁵|⁶|⁷|⁸|⁹)(\d+)/);
        
        if (exp1 && exp2) {
          const expVal1 = parseInt(exp1[2]);
          const expVal2 = parseInt(exp2[2]);
          
          if (expVal1 !== expVal2) {
            return expVal1 > expVal2 ? 1 : 2;
          } else {
            // If exponents are equal, compare the coefficients
            return compareNumeric(val1, val2);
          }
        }
      }
      
      return null; // Can't determine which is greater
    };

    const comparisonData = [
      { label: "Mass", value1: planet1.mass, value2: planet2.mass, greater: compareValues("Mass", planet1.mass, planet2.mass) },
      { label: "Radius", value1: planet1.radius, value2: planet2.radius, greater: compareValues("Radius", planet1.radius, planet2.radius) },
      { label: "Distance from Sun", value1: planet1.distance, value2: planet2.distance, greater: compareValues("Distance from Sun", planet1.distance, planet2.distance) },
      { label: "Atmosphere", value1: planet1.atmosphere, value2: planet2.atmosphere, greater: null },
      { label: "Gravity", value1: planet1.gravity, value2: planet2.gravity, greater: compareValues("Gravity", planet1.gravity, planet2.gravity) },
      { label: "Day Length", value1: planet1.dayLength, value2: planet2.dayLength, greater: null },
      { label: "Year Length", value1: planet1.yearLength, value2: planet2.yearLength, greater: null },
      { label: "Temperature", value1: planet1.temperature, value2: planet2.temperature, greater: null },
      { label: "Moons", value1: planet1.moons, value2: planet2.moons, greater: compareValues("Moons", planet1.moons, planet2.moons) },
    ]

    return (
      <div className="space-y-8">
        {/* Size Comparison */}
        <PlanetSizeComparison selectedPlanets={[planet1.name, planet2.name]} />

        {/* Data Comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Planet 1 */}
          <Card className="backdrop-blur-md bg-white/5 border border-white/10">
            <CardHeader className="text-center">
              <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${planet1.color} mb-4`} />
              <CardTitle className="text-white text-xl">{planet1.name}</CardTitle>
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                {planet1.type}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {comparisonData.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-400">{item.label}:</span>
                    <span 
                      className={`font-medium ${item.greater === 1 
                        ? 'text-blue-300 font-bold text-lg' 
                        : 'text-white'}`}
                    >
                      {item.value1}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Planet 2 */}
          <Card className="backdrop-blur-md bg-white/5 border border-white/10">
            <CardHeader className="text-center">
              <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${planet2.color} mb-4`} />
              <CardTitle className="text-white text-xl">{planet2.name}</CardTitle>
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                {planet2.type}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {comparisonData.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-400">{item.label}:</span>
                    <span 
                      className={`font-medium ${item.greater === 2 
                        ? 'text-blue-300 font-bold text-lg' 
                        : 'text-white'}`}
                    >
                      {item.value2}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderStarComparison = () => {
    if (!star1 || !star2) return null

    // Helper function to compare ranges
    const compareRanges = (range1, range2) => {
      // Extract the upper bounds of ranges like "0.08 - 100 solar masses"
      const getUpperBound = (range) => {
        const match = range.match(/- ([\d,]+)/)
        return match ? parseFloat(match[1].replace(/,/g, '')) : null
      }
      
      const upper1 = getUpperBound(range1)
      const upper2 = getUpperBound(range2)
      
      if (upper1 !== null && upper2 !== null) {
        return upper1 > upper2 ? 1 : (upper2 > upper1 ? 2 : 0)
      }
      return null
    }

    // Helper function to compare temperature ranges
    const compareTemperature = (temp1, temp2) => {
      // Extract the upper bounds of temperature ranges like "2,300 - 50,000 K"
      const getUpperBound = (temp) => {
        const match = temp.match(/- ([\d,]+)/)
        return match ? parseFloat(match[1].replace(/,/g, '')) : null
      }
      
      const upper1 = getUpperBound(temp1)
      const upper2 = getUpperBound(temp2)
      
      if (upper1 !== null && upper2 !== null) {
        return upper1 > upper2 ? 1 : (upper2 > upper1 ? 2 : 0)
      }
      return null
    }

    // Helper function to compare density
    const compareDensity = (density1, density2) => {
      // Extract the upper bounds of density ranges like "0.1 - 150 g/cm³"
      const getUpperBound = (density) => {
        const match = density.match(/- ([\d,]+)/)
        return match ? parseFloat(match[1].replace(/,/g, '')) : null
      }
      
      const upper1 = getUpperBound(density1)
      const upper2 = getUpperBound(density2)
      
      if (upper1 !== null && upper2 !== null) {
        return upper1 > upper2 ? 1 : (upper2 > upper1 ? 2 : 0)
      }
      return null
    }

    const comparisonData = [
      { label: "Mass", value1: star1.mass, value2: star2.mass, greater: compareRanges(star1.mass, star2.mass) },
      { label: "Radius", value1: star1.radius, value2: star2.radius, greater: compareRanges(star1.radius, star2.radius) },
      { label: "Temperature", value1: star1.temperature, value2: star2.temperature, greater: compareTemperature(star1.temperature, star2.temperature) },
      { label: "Luminosity", value1: star1.luminosity, value2: star2.luminosity, greater: compareRanges(star1.luminosity, star2.luminosity) },
      { label: "Lifespan", value1: star1.lifespan, value2: star2.lifespan, greater: compareRanges(star1.lifespan, star2.lifespan) },
      { label: "Density", value1: star1.density, value2: star2.density, greater: compareDensity(star1.density, star2.density) },
      { label: "Spectral Class", value1: star1.spectralClass, value2: star2.spectralClass, greater: null },
      { label: "Examples", value1: star1.examples, value2: star2.examples, greater: null },
    ]

    return (
      <div className="grid md:grid-cols-2 gap-6">
        {/* Star 1 */}
        <Card className="backdrop-blur-md bg-white/5 border border-white/10">
          <CardHeader className="text-center">
            <div
              className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${star1.color} mb-4 animate-pulse-glow`}
            />
            <CardTitle className="text-white text-xl">{star1.name}</CardTitle>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              {star1.type}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {comparisonData.map((item, index) => (
                <div key={index} className="text-sm">
                  <span className="text-gray-400 block mb-1">{item.label}:</span>
                  <span 
                    className={`font-medium ${item.greater === 1 
                      ? 'text-blue-300 font-bold text-lg' 
                      : 'text-white'}`}
                  >
                    {item.value1}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Star 2 */}
        <Card className="backdrop-blur-md bg-white/5 border border-white/10">
          <CardHeader className="text-center">
            <div
              className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${star2.color} mb-4 animate-pulse-glow`}
            />
            <CardTitle className="text-white text-xl">{star2.name}</CardTitle>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              {star2.type}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {comparisonData.map((item, index) => (
                <div key={index} className="text-sm">
                  <span className="text-gray-400 block mb-1">{item.label}:</span>
                  <span 
                    className={`font-medium ${item.greater === 2 
                      ? 'text-blue-300 font-bold text-lg' 
                      : 'text-white'}`}
                  >
                    {item.value2}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300 max-w-7xl max-h-[95vh] sm:max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <ArrowLeftRight className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Comparison Tool
            </h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10 rounded-xl">
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-4 sm:p-6">
          {/* Type Selection */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-white/5 rounded-xl p-1">
              <Button
                variant={comparisonType === "planets" ? "default" : "ghost"}
                onClick={() => setComparisonType("planets")}
                className={`rounded-lg ${
                  comparisonType === "planets"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                Compare Planets
              </Button>
              <Button
                variant={comparisonType === "stars" ? "default" : "ghost"}
                onClick={() => setComparisonType("stars")}
                className={`rounded-lg ${
                  comparisonType === "stars"
                    ? "bg-gradient-to-r from-yellow-600 to-orange-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                Compare Stars
              </Button>
            </div>
          </div>

          {/* Selection Controls */}
          {comparisonType === "planets" ? (
            <div className="flex justify-center mb-8">
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl w-full">
                <div className="text-center">
                  <label className="block text-white font-medium mb-2">Select First Planet</label>
                  <Select value={selectedPlanet1} onValueChange={setSelectedPlanet1}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Choose a planet..." />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      {planets.map((planet) => (
                        <SelectItem key={planet.name} value={planet.name} className="text-white hover:bg-white/10">
                          {planet.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-center">
                  <label className="block text-white font-medium mb-2">Select Second Planet</label>
                  <Select value={selectedPlanet2} onValueChange={setSelectedPlanet2}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Choose a planet..." />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      {planets.map((planet) => (
                        <SelectItem key={planet.name} value={planet.name} className="text-white hover:bg-white/10">
                          {planet.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mb-8">
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl w-full">
                <div className="text-center">
                  <label className="block text-white font-medium mb-2">Select First Star Type</label>
                  <Select value={selectedStar1} onValueChange={setSelectedStar1}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Choose a star type..." />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      {starTypes.map((star) => (
                        <SelectItem key={star.name} value={star.name} className="text-white hover:bg-white/10">
                          {star.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-center">
                  <label className="block text-white font-medium mb-2">Select Second Star Type</label>
                  <Select value={selectedStar2} onValueChange={setSelectedStar2}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Choose a star type..." />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      {starTypes.map((star) => (
                        <SelectItem key={star.name} value={star.name} className="text-white hover:bg-white/10">
                          {star.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Comparison Results */}
          {comparisonType === "planets" ? renderPlanetComparison() : renderStarComparison()}

          {/* No Selection Message */}
          {((comparisonType === "planets" && (!selectedPlanet1 || !selectedPlanet2)) ||
            (comparisonType === "stars" && (!selectedStar1 || !selectedStar2))) && (
            <div className="text-center py-12">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
                <ArrowLeftRight className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Select Objects to Compare</h3>
                <p className="text-gray-300">
                  Choose two {comparisonType === "planets" ? "planets" : "star types"} from the dropdowns above to see a
                  detailed side-by-side comparison.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
