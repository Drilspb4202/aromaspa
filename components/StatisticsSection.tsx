import React from 'react'
import { motion } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'

const statistics = [
  { label: 'Довольных клиентов', value: 500 },
  { label: 'Проведенных сеансов', value: 1000 },
  { label: 'Лет опыта', value: 5 },
  { label: 'Видов эфирных масел', value: 50 },
]

export default function StatisticsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-900 to-black">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
        >
          Наши достижения
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-fuchsia-500 mb-2">
                <AnimatedCounter end={stat.value} />
              </div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

