import { useState, useEffect, useCallback } from 'react'

export function useAutoSlide(length: number, interval = 5000) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % length)
  }, [length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + length) % length)
  }, [length])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  const togglePlaying = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  useEffect(() => {
    if (!isPlaying || length === 0) return

    const timer = setInterval(() => {
      nextSlide()
    }, interval)

    return () => clearInterval(timer)
  }, [isPlaying, nextSlide, interval, length])

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    isPlaying,
    togglePlaying
  }
}
