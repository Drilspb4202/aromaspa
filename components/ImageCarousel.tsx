import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import LazyImage from './LazyImage'

interface ImageCarouselProps {
  images: string[]
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [images.length])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-2xl">
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.div
          key={currentIndex}
          custom={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <LazyImage
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            width={400}
            height={256}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <Button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  )
}

export default ImageCarousel

