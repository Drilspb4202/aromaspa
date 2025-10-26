import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const reasons = [
  {
    title: "Индивидуальный подход",
    description: "Мы разрабатываем персональные решения, учитывая Ваши личные потребности и цели."
  },
  {
    title: "Высококачественные масла",
    description: "Используем только сертифицированные эфирные масла высшего качества CPTG."
  },
  {
    title: "Опытные специалисты",
    description: "Наша команда состоит из квалифицированных аромапрактиков с богатым опытом."
  },
  {
    title: "Комплексный подход",
    description: "Сочетаем древние знания с современными методиками для достижения наилучших результатов."
  }
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gradient-to-b from-purple-900 to-black relative z-10">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
        >
          Почему выбирают нас
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-purple-800/30 rounded-lg p-6 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-fuchsia-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-fuchsia-300 mb-2">{reason.title}</h3>
                  <p className="text-gray-300">{reason.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
