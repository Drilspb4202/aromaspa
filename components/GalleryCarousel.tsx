import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { Button } from "@/components/ui/button"
import OptimizedImage from './OptimizedImage'
import { preloadImages } from '../utils/imagePreloader'

interface GalleryCarouselProps {
  images: Array<{
    type: string
    url: string
  }>
}

export function GalleryCarousel({ images }: GalleryCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection)
    setCurrentSlide((prev) => (prev + newDirection + images.length) % images.length)
  }, [images.length])

  const nextSlide = useCallback(() => {
    paginate(1);
  }, [paginate]);

  useEffect(() => {
    if (!isPlaying || images.length === 0) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [isPlaying, images.length, nextSlide])

  useEffect(() => {
    const preload = async () => {
      await preloadImages(images.map(img => img.url))
    }
    preload()
  }, [images])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        paginate(-1)
      } else if (event.key === 'ArrowRight') {
        paginate(1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [paginate])

  const togglePlaying = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  return (
    <div className="relative w-full max-w-[90vmin] mx-auto">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
            className="absolute w-full h-full"
          >
            {images[currentSlide]?.type === 'video' ? (
              <iframe
                src={images[currentSlide].url}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; muted"
                allowFullScreen
                title={`Gallery content ${currentSlide + 1}`}
              />
            ) : (
              <OptimizedImage
                src={images[currentSlide].url}
                alt={`Gallery content ${currentSlide + 1}`}
                width={1200}
                height={1200}
                className="object-cover w-full h-full"
                priority={currentSlide === 0}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <Button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3"
        onClick={() => paginate(-1)}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3"
        onClick={() => paginate(1)}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4">
        <Button
          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
          onClick={togglePlaying}
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <div className="flex gap-2 overflow-x-auto max-w-[60%] px-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1)
                setCurrentSlide(index)
              }}
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

