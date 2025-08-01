import { UniverseTimeline } from "@/components/universe-timeline"

export default function TimelinePage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Timeline of the Universe
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Travel through 13.8 billion years of cosmic history, from the Big Bang to the present day, and witness the
            key events that shaped our universe.
          </p>
        </div>
        <UniverseTimeline />
      </div>
    </div>
  )
}
