'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Star, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface SocialProofProps {
  className?: string
}

const proofItems = [
  { text: "Анна только что записалась на АромаДиагностику", icon: Users },
  { text: "Мария купила набор эфирных масел", icon: TrendingUp },
  { text: "Елена оставила 5-звездочный отзыв", icon: Star },
  { text: "Ольга записалась на АромаЙогу", icon: Users },
  { text: "Светлана приобрела подарочный сертификат", icon: TrendingUp },
]

export default function SocialProof({ className = "" }: SocialProofProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % proofItems.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const currentItem = proofItems[currentIndex]
  const Icon = currentItem.icon

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      <Card className="bg-gradient-to-br from-purple-900/30 via-fuchsia-900/30 to-pink-900/30 border-fuchsia-500/20 backdrop-blur-sm">
        <CardContent className="p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="bg-fuchsia-500/20 rounded-full p-2">
                <Icon className="w-4 h-4 text-fuchsia-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-300">
                  <span className="text-fuchsia-400 font-semibold">Только что:</span>{' '}
                  {currentItem.text}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}

