'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryCarouselProps {
  images: Array<{
    type: string
    url: string
  }>
}

export function GalleryCarousel({ images }: GalleryCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const togglePlaying = () => {
    setIsPlaying(prev => !prev)
  }

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying || images.length === 0) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [isPlaying, images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide()
      } else if (event.key === 'ArrowRight') {
        nextSlide()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const imagePromises = images.map((image) => {
          return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = image.url
            img.onload = resolve
            img.onerror = reject
          })
        })
        await Promise.all(imagePromises)
        setIsLoading(false)
      } catch (error) {
        console.error('Error preloading images:', error)
        setIsLoading(false)
      }
    }
    preloadImages()
  }, [images])

  if (images.length === 0) {
    return null
  }

  return (
    <div className="relative w-full max-w-[90vmin] mx-auto">
      <div ref={containerRef} className="overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square"
          >
            {isLoading ? (
              <div className="absolute inset-0 bg-purple-900/30 animate-pulse" />
            ) : (
              images[currentSlide]?.type === 'video' ? (
                <iframe
                  src={images[currentSlide].url}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; muted"
                  allowFullScreen
                />
              ) : (
                <Image
                  src={images[currentSlide].url}
                  alt={`Gallery content ${currentSlide + 1}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={100}
                  onLoadingComplete={() => setIsLoading(false)}
                />
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
        <Button
          className="pointer-events-auto ml-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          className="pointer-events-auto mr-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4">
        {/* Play/Pause Button */}
        <Button
          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
          onClick={togglePlaying}
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>

        {/* Progress Indicators */}
        <div className="flex gap-2 overflow-x-auto max-w-[60%] px-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-4'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

