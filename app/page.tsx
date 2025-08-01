import { Hero } from "@/components/hero"
import { FeaturedSections } from "@/components/featured-sections"
import { Stats } from "@/components/stats"
import { SpaceNews } from "@/components/space-news"

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedSections />
      <SpaceNews />
    </>
  )
}
