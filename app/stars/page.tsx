import { StarsContent } from "@/components/stars-content"

export default function StarsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Stellar Phenomena
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Journey through the lifecycle of stars, from stellar nurseries to supernovas, and discover the cosmic
            furnaces that light up our universe.
          </p>
        </div>
        <StarsContent />
      </div>
    </div>
  )
}
