import { Card, CardContent } from "@/components/ui/card"
import { Telescope, Heart, Lightbulb, Users } from "lucide-react"

const values = [
  {
    icon: Telescope,
    title: "Innovation",
    description: "Pushing the boundaries of how we present and interact with astronomical knowledge.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Driven by an unwavering love for the cosmos and the desire to share its wonders.",
  },
  {
    icon: Lightbulb,
    title: "Curiosity",
    description: "Encouraging questions, exploration, and the never-ending quest for understanding.",
  },
  {
    icon: Users,
    title: "Accessibility",
    description: "Making complex astronomical concepts understandable and engaging for everyone.",
  },
]

export function AboutContent() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Cosmic Explorer
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Where passion meets the cosmos, and knowledge becomes an adventure.
          </p>
        </div>

        {/* Main Content */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-16">
          <div className="prose prose-lg prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
            At Cosmic Explorer, we believe space isn't just the final frontier — it's the greatest story never fully told. Our mission is to make the vast cosmos not only accessible but captivating for everyone, from curious students and amateur astronomers to lifelong science enthusiasts. Founded by Pranay — a passionate creator with a sharp eye for design and a deep curiosity for the cosmos — Cosmic Explorer is built to bridge the gap between aesthetic and education, all in a clean, modern experience.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Pranay envisioned a platform where accurate knowledge meets stunning interactivity. That vision powers our mission: to deliver beautifully visualized, easily understandable, and scientifically reliable content about the planets, stars, and cosmic events — all in one place. With design that feels intuitive and immersive, and information sourced from NASA, Wikipedia, and other credible sources, our goal is to help you explore space with clarity and wonder.
            </p>

            <h2 className="text-3xl font-bold text-white mb-6 mt-12">The Vision</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              We envision a future where anyone, regardless of their background in science, can embark on a journey
              through space and time. Our platform serves as a bridge between the latest astronomical discoveries and
              curious minds eager to explore the universe's mysteries.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed">
              Every element of Cosmic Explorer is designed with intention – from the glassmorphism interface that
              mirrors the ethereal beauty of nebulae, to the interactive timelines that make 13.8 billion years of
              cosmic history feel tangible and real.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Personal Note */}
        <div className="backdrop-blur-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">A Personal Note from Pranay</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              "Ever since I was a kid, I’ve been captivated by space — not just the planets or the stars, but the feeling of looking up and wondering what’s out there. To me, space is the greatest teacher we have. It shows us how small we are, yet how limitless our potential can be. It teaches patience, curiosity, and awe — all without saying a word. But as I grew up and tried to learn more, I found it surprisingly difficult to find a place that truly made space easy to explore. I'd jump from article to article, video to video, trying to piece together the vast puzzle of the cosmos. Most sites were either too cluttered, too technical, or simply uninspiring. That’s when the idea for Cosmic Explorer was born."
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              "This platform is my attempt to fix that. To create a space — no pun intended — where anyone, regardless of age or background, can explore the universe visually, interactively, and meaningfully. Whether you're here to learn something new, dive deep into planetary science, or just admire the cosmos, I hope you find something here that sparks your imagination.
              Welcome to Cosmic Explorer. Let’s journey through the stars together."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
