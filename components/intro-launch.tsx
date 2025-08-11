"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

/**
 * IntroLaunch
 * Fullscreen overlay intro with idle-floating rocket and starry theme.
 * On "Start Exploring", the rocket launches upward and an expanding exhaust
 * circle grows to cover the viewport. Once covered, the overlay fades out
 * revealing the homepage beneath without causing layout shifts.
 */
export function IntroLaunch() {
  const [isLaunching, setIsLaunching] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  // After launch completes, fade out and remove overlay
  useEffect(() => {
    if (!isLaunching) return

    const totalMs = 1500 // keep in sync with animation durations below
    const fadeDelay = 200 // small delay after cover to fade out
    const timer = setTimeout(() => setIsHidden(true), totalMs + fadeDelay)
    return () => clearTimeout(timer)
  }, [isLaunching])

  if (isHidden) return null

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-[60] overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
        aria-label="Intro screen"
      >
        {/* Background: subtle starry gradient to match Cosmic theme. The site-wide canvas sits behind this. */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950 to-black" />

        {/* Decorative stars (lightweight) */}
        <div className="pointer-events-none absolute inset-0">
          {[...Array(60)].map((_, i) => (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className="absolute block h-[2px] w-[2px] rounded-full bg-white/80 opacity-80"
              style={{
                left: `${(i * 137.5) % 100}%`,
                top: `${(i * 89.3) % 100}%`,
                transform: `translateZ(0)`,
                filter: `drop-shadow(0 0 4px rgba(255,255,255,0.5))`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-balance text-4xl font-bold md:text-6xl">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your Journey Through the Cosmos Begins Here
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300 md:text-xl">
              Interactive exploration of planets, stars, and cosmic events. Dive into a universe of knowledge.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => setIsLaunching(true)}
              className="transform-gpu rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3 text-lg font-semibold text-white shadow-lg shadow-purple-900/30 transition hover:scale-[1.02] hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
            >
              Start Exploring
            </button>

            <Link
              href="/about"
              className="rounded-xl border border-white/20 bg-white/5 px-7 py-3 text-lg font-medium text-white/90 backdrop-blur-sm transition hover:bg-white/10"
            >
              Other Projects
            </Link>
          </div>

          {/* Rocket */}
          <div className="pointer-events-none absolute bottom-20 left-1/2 -translate-x-1/2 transform-gpu will-change-transform">
            <motion.div
              initial={false}
              animate={isLaunching ? { y: "-120vh" } : { y: [0, -10, 0, 10, 0] }}
              transition={
                isLaunching
                  ? { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <Image
                src="/rocket.svg"
                alt="Rocket"
                width={120}
                height={120}
                className="drop-shadow-[0_8px_20px_rgba(255,255,255,0.3)]"
                priority
                draggable={false}
              />
            </motion.div>
          </div>
        </div>

        {/* Exhaust cover: grows to fill viewport, then overlay fades */}
        <motion.div
          className="pointer-events-none absolute bottom-20 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-white transform-gpu will-change-transform"
          initial={{ scale: 0, opacity: 0 }}
          animate={isLaunching ? { scale: 280, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
      </motion.div>
    </AnimatePresence>
  )
}


