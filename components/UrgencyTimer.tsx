'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface UrgencyTimerProps {
  endDate: Date
  title?: string
  description?: string
  className?: string
}

export default function UrgencyTimer({ 
  endDate, 
  title = "Ограниченное предложение!",
  description = "Успейте воспользоваться специальным предложением",
  className = ""
}: UrgencyTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const end = endDate.getTime()
      const difference = end - now

      if (difference <= 0) {
        setIsExpired(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  if (isExpired) {
    return null
  }

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-gradient-to-br from-fuchsia-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-3 border border-fuchsia-400/30 min-w-[70px]">
      <div className="text-2xl md:text-3xl font-bold text-fuchsia-400 mb-1">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-xs text-gray-300 uppercase">{label}</div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Card className="bg-gradient-to-br from-purple-900/40 via-fuchsia-900/40 to-pink-900/40 border-fuchsia-500/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-5 h-5 text-fuchsia-400 mr-2 animate-pulse" />
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
          <p className="text-gray-300 text-center mb-6 text-sm">{description}</p>
          
          <div className="flex justify-center gap-3 flex-wrap">
            <TimeUnit value={timeLeft.days} label="дней" />
            <TimeUnit value={timeLeft.hours} label="часов" />
            <TimeUnit value={timeLeft.minutes} label="минут" />
            <TimeUnit value={timeLeft.seconds} label="секунд" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

