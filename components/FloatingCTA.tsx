'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Phone, X, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface FloatingCTAProps {
  phone?: string
  showAfterScroll?: number
}

export default function FloatingCTA({ 
  phone = "+7 995 600 01 22",
  showAfterScroll = 300 
}: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > showAfterScroll && !isDismissed) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showAfterScroll, isDismissed])

  const handleCall = () => {
    window.location.href = `tel:${phone.replace(/\s/g, '')}`
  }

  const handleChat = () => {
    // Открыть чат-бот (можно добавить логику)
    const chatButton = document.querySelector('[aria-label="Открыть чат"]') as HTMLElement
    if (chatButton) {
      chatButton.click()
    }
  }

  if (isDismissed) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-20 md:bottom-24 left-4 right-4 md:left-auto md:right-4 z-50 max-w-sm mx-auto md:mx-0"
        >
          <div className="bg-gradient-to-br from-purple-900 via-fuchsia-900 to-pink-900 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-fuchsia-400/30">
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="pr-6">
              <h3 className="text-white font-bold text-lg mb-2">
                Нужна консультация?
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Свяжитесь с нами прямо сейчас!
              </p>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleCall}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  size="sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Позвонить
                </Button>
                <Button
                  onClick={handleChat}
                  className="flex-1 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white"
                  size="sm"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Чат
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

