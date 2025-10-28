import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: number
  name: string
  text: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Анна М.",
    text: "AROMA SPA СТУДИЯ изменило мою жизнь! Ароматерапия помогла мне справиться со стрессом и улучшить сон. Я очень благодарна команде за их профессионализм и заботу."
  },
  {
    id: 2,
    name: "Сергей К.",
    text: "Никогда не думал, что эфирные масла могут быть такими эффективными. После нескольких сеансов я почувствовал значительное улучшение своего эмоционального состояния."
  },
  {
    id: 3,
    name: "Елена В.",
    text: "АромаЙога в AROMA SPA СТУДИЯ - это нечто особенное. Сочетание йоги и ароматерапии создает невероятную атмосферу гармонии и спокойствия."
  }
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }, [])

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-purple-950/40 border border-fuchsia-500/30 rounded-lg p-6 text-center"
        >
          <p className="text-gray-300 mb-4">{testimonials[currentIndex].text}</p>
          <p className="text-fuchsia-400 font-bold">{testimonials[currentIndex].name}</p>
        </motion.div>
      </AnimatePresence>

      <Button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
        onClick={prevSlide}
        aria-label="Предыдущий отзыв"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
        onClick={nextSlide}
        aria-label="Следующий отзыв"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  )
}
