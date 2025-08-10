"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Telescope } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/planets", label: "Planets" },
  { href: "/stars", label: "Stars" },
  { href: "/3d-view", label: "3D View" },
  { href: "/timeline", label: "Timeline" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down & past 100px
          setIsVisible(false)
        } else {
          // Scrolling up
          setIsVisible(true)
        }

        if (currentScrollY > 50) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }

        setLastScrollY(currentScrollY)
      }
    }

    const handleModalOpen = () => {
      setIsModalOpen(true)
      setIsVisible(false)
    }

    const handleModalClose = () => {
      setIsModalOpen(false)
      if (window.scrollY < 100) {
        setIsVisible(true)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      window.addEventListener("modal-open", handleModalOpen);
      window.addEventListener("modal-close", handleModalClose);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
        window.removeEventListener("modal-open", handleModalOpen);
        window.removeEventListener("modal-close", handleModalClose);
      };
    }
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 p-4 transition-transform duration-300 ${
        isVisible && !isModalOpen ? "translate-y-0" : "-translate-y-full"
      } ${isModalOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className="container mx-auto">
        <div
          className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 ${
            isScrolled ? "px-3 py-1" : "px-4 py-2"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                <Telescope className="h-6 w-6 text-white" />
              </div>
              <span
                className={`font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent transition-all duration-300 ${
                  isScrolled ? "text-lg" : "text-xl"
                }`}
              >
                Cosmic Explorer
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    pathname === item.href
                      ? "bg-white/20 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/20">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                      pathname === item.href
                        ? "bg-white/20 text-white"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
