'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { X, Gift } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import LeadCaptureForm from './LeadCaptureForm'

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Проверяем, показывали ли уже попап
    const shown = localStorage.getItem('exitIntentShown')
    if (shown) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Если мышь уходит вверх (к адресной строке), показываем попап
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true)
        setHasShown(true)
        localStorage.setItem('exitIntentShown', 'true')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [hasShown])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="bg-gradient-to-br from-purple-900 via-fuchsia-900 to-pink-900 border-fuchsia-400/30 backdrop-blur-md max-w-lg w-full relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Не уходите без подарка! 🎁
                  </h2>
                  <p className="text-gray-300">
                    Получите <span className="text-fuchsia-400 font-bold">бесплатную консультацию</span> и <span className="text-fuchsia-400 font-bold">скидку 10%</span> на первый визит
                  </p>
                </div>
                
                <LeadCaptureForm
                  title=""
                  description=""
                  offer=""
                  className="mb-0"
                />
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

