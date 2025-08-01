"use client"

import { useEffect, useRef } from "react"

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Star properties
    const stars: Array<{
      x: number
      y: number
      size: number
      opacity: number
      twinkleSpeed: number
      twinkleOffset: number
    }> = []

    // Create stars
    const createStars = () => {
      const numStars = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000)) // Responsive star count
      stars.length = 0

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
        })
      }
    }

    createStars()

    // Nebula particles
    const nebulae: Array<{
      x: number
      y: number
      size: number
      opacity: number
      color: string
      drift: { x: number; y: number }
    }> = []

    // Create nebula particles
    const createNebulae = () => {
      const numNebulae = Math.min(20, Math.floor((canvas.width * canvas.height) / 50000))
      nebulae.length = 0

      const colors = ["rgba(138, 43, 226, ", "rgba(75, 0, 130, ", "rgba(25, 25, 112, ", "rgba(72, 61, 139, "]

      for (let i = 0; i < numNebulae; i++) {
        nebulae.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 100 + 50,
          opacity: Math.random() * 0.1 + 0.05,
          color: colors[Math.floor(Math.random() * colors.length)],
          drift: {
            x: (Math.random() - 0.5) * 0.2,
            y: (Math.random() - 0.5) * 0.2,
          },
        })
      }
    }

    createNebulae()

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.016 // ~60fps

      // Draw nebulae
      nebulae.forEach((nebula) => {
        // Update position
        nebula.x += nebula.drift.x
        nebula.y += nebula.drift.y

        // Wrap around screen
        if (nebula.x > canvas.width + nebula.size) nebula.x = -nebula.size
        if (nebula.x < -nebula.size) nebula.x = canvas.width + nebula.size
        if (nebula.y > canvas.height + nebula.size) nebula.y = -nebula.size
        if (nebula.y < -nebula.size) nebula.y = canvas.height + nebula.size

        // Draw nebula
        const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.size)
        gradient.addColorStop(0, `${nebula.color}${nebula.opacity})`)
        gradient.addColorStop(1, `${nebula.color}0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(nebula.x - nebula.size, nebula.y - nebula.size, nebula.size * 2, nebula.size * 2)
      })

      // Draw stars
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7
        const currentOpacity = star.opacity * twinkle

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`
        ctx.fill()

        // Add subtle glow for larger stars
        if (star.size > 1.5) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.1})`
          ctx.fill()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Recreate elements on resize
    const handleResize = () => {
      resizeCanvas()
      createStars()
      createNebulae()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}
