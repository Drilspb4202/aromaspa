'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Award, Users, Clock, CheckCircle2 } from 'lucide-react'

const badges = [
  {
    icon: Shield,
    title: "Гарантия качества",
    description: "100% натуральные масла CPTG стандарта"
  },
  {
    icon: Award,
    title: "Сертифицированный эксперт",
    description: "Опыт работы более 5 лет"
  },
  {
    icon: Users,
    title: "500+ довольных клиентов",
    description: "Реальные отзывы и результаты"
  },
  {
    icon: Clock,
    title: "Быстрая запись",
    description: "Запись на удобное время"
  },
  {
    icon: CheckCircle2,
    title: "Безопасная оплата",
    description: "Различные способы оплаты"
  }
]

export default function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 ${className}`}>
      {badges.map((badge, index) => {
        const Icon = badge.icon
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 backdrop-blur-sm rounded-xl p-4 border border-fuchsia-400/20 hover:border-fuchsia-400/40 transition-all duration-300 h-full flex flex-col items-center justify-center">
              <div className="bg-fuchsia-500/20 rounded-full p-3 mb-3">
                <Icon className="w-6 h-6 text-fuchsia-400" />
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">{badge.title}</h4>
              <p className="text-gray-400 text-xs">{badge.description}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

