import { ThreeDView } from "@/components/three-d-view"

export default function ThreeDViewPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            3D Interactive View
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore planets and stars in stunning 3D detail. Rotate, zoom, and discover celestial objects like never
            before with our interactive 3D models.
          </p>
        </div>
        <ThreeDView />
      </div>
    </div>
  )
}
