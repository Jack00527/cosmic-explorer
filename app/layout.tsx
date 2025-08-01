import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { CosmicBackground } from "@/components/cosmic-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cosmic Explorer - Explore the Cosmos, One Orbit at a Time",
  description:
    "Learn about the solar system, planets, stars, cosmic events, and the timeline of the universe through interactive and educational content.",
  keywords: ["solar system", "planets", "stars", "space", "astronomy", "universe", "cosmos"],
  authors: [{ name: "Your Name", url: "https://example.com" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cosmic-explorer.example.com",
    title: "Cosmic Explorer",
    description: "Explore the cosmos, one orbit at a time.",
    siteName: "Cosmic Explorer",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-white overflow-x-hidden`}>
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-blue-950/20 relative">
          <CosmicBackground />
          <Navigation />
          <main className="relative z-10">{children}</main>
        </div>
      </body>
    </html>
  )
}
