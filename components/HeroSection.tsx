'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import OptimizedImage from './OptimizedImage'

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false)
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <OptimizedImage
          src="https://i.ibb.co/5LmmGTK/DALL-E-2024-12-06-03-15-04-A-luxurious-image-featuring-a-purple-theme-redesigned-to-showcase-drops-o.webp"
          alt="Фоновое изображение спа"
          width={1920}
          height={1080}
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex flex-col items-center max-w-[90vw] sm:max-w-full mx-auto space-y-2 sm:space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-2 w-full max-w-[200px] sm:max-w-[250px] mx-auto"
            >
              <OptimizedImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hxwo0WQe3vax9AD8KKTokvTiwnrUgq.png"
                alt="AROMA SPA СТУДИЯ Logo"
                width={250}
                height={250}
                className="w-full h-auto rounded-2xl"
                priority
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 tracking-wider text-center font-playfair"
            >
              РАДМИЛЫ ЯКОВЛЕВОЙ
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-8 text-center italic px-2 sm:px-4 font-medium font-montserrat"
            >
              "Ваш путь к гармонии начинается здесь, касаясь души через заботу о теле"
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="w-full rounded-[2rem] overflow-hidden mb-8"
            >
              <OptimizedImage
                src="https://i.ibb.co/8NDztqx/radmila-jpg.jpg"
                alt="Радмила Яковлева - профессиональный аромаэксперт"
                width={600}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="w-full flex justify-center"
            >
              <Button
                onClick={() => {
                  const servicesSection = document.getElementById('услуги')
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/50"
              >
                Начать путешествие
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
