"use client"

import { useEffect } from "react"

interface KeyboardNavigationProps {
  selectedPlanet: number | null
  onPlanetSelect: (planetIndex: number) => void
  onOpenModal: (planetIndex: number) => void
  onCloseModal: () => void
  isModalOpen: boolean
  totalPlanets: number
}

export function KeyboardNavigation({
  selectedPlanet,
  onPlanetSelect,
  onOpenModal,
  onCloseModal,
  isModalOpen,
  totalPlanets,
}: KeyboardNavigationProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      // Modal controls
      if (isModalOpen) {
        switch (e.key) {
          case "Escape":
            e.preventDefault()
            onCloseModal()
            break
          case "ArrowLeft":
            e.preventDefault()
            if (selectedPlanet !== null && selectedPlanet > 0) {
              onOpenModal(selectedPlanet - 1)
            }
            break
          case "ArrowRight":
            e.preventDefault()
            if (selectedPlanet !== null && selectedPlanet < totalPlanets - 1) {
              onOpenModal(selectedPlanet + 1)
            }
            break
        }
        return
      }

      // Planet navigation controls
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          if (selectedPlanet === null) {
            onPlanetSelect(0)
          } else if (selectedPlanet > 0) {
            onPlanetSelect(selectedPlanet - 1)
          }
          break

        case "ArrowRight":
          e.preventDefault()
          if (selectedPlanet === null) {
            onPlanetSelect(0)
          } else if (selectedPlanet < totalPlanets - 1) {
            onPlanetSelect(selectedPlanet + 1)
          }
          break

        case "ArrowUp":
          e.preventDefault()
          if (selectedPlanet === null) {
            onPlanetSelect(0)
          } else {
            const newIndex = selectedPlanet - 4 < 0 ? selectedPlanet : selectedPlanet - 4
            onPlanetSelect(newIndex)
          }
          break

        case "ArrowDown":
          e.preventDefault()
          if (selectedPlanet === null) {
            onPlanetSelect(0)
          } else {
            const newIndex = selectedPlanet + 4 >= totalPlanets ? selectedPlanet : selectedPlanet + 4
            onPlanetSelect(newIndex)
          }
          break

        case "Enter":
        case " ":
          e.preventDefault()
          if (selectedPlanet !== null) {
            onOpenModal(selectedPlanet)
          }
          break

        case "Home":
          e.preventDefault()
          onPlanetSelect(0)
          break

        case "End":
          e.preventDefault()
          onPlanetSelect(totalPlanets - 1)
          break

        // Number keys for direct planet selection
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
          e.preventDefault()
          const planetIndex = Number.parseInt(e.key) - 1
          if (planetIndex < totalPlanets) {
            onPlanetSelect(planetIndex)
          }
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [selectedPlanet, onPlanetSelect, onOpenModal, onCloseModal, isModalOpen, totalPlanets])

  return null // This component only handles keyboard events
}
