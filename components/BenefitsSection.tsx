import React from 'react'
import { motion } from 'framer-motion'
import { Droplet, Moon, CupSodaIcon as Cup, Smile } from 'lucide-react'

const benefits = [
  {
    icon: Droplet,
    title: "Снятие стресса",
    description: "Каждая капля эфирного масла — это как прикосновение природы к Вашей душе. Устали от суеты? Закройте глаза, вдохните, и почувствуйте, как напряжение растворяется в ароматах покоя."
  },
  {
    icon: Moon,
    title: "Улучшение сна",
    description: "Эфирные масла — это идеальное завершение Вашего вечера. Создайте расслабляющий ритуал, который подарит Вам глубокий сон, обволакивающий покоем, и пробуждение в гармонии с новым днём, полным энергии и вдохновения."
  },
  {
    icon: Cup,
    title: "Укрепление иммунитета",
    description: "Сила природы в каждой капле: эфирные масла укрепляют защитные силы организма, обеспечивая здоровье и жизненную энергию."
  },
  {
    icon: Smile,
    title: "Повышение настроения",
    description: "С эфирными маслами Вы ощутите прилив легкости и вдохновения. Это натуральный источник радости, который помогает освежить мысли и наполнить день яркими эмоциями."
  }
]

interface BenefitCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const BenefitCard = ({ icon: Icon, title, description }: BenefitCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-[#3B1240] rounded-3xl p-6 flex gap-4 group hover:bg-[#461648] transition-all duration-300 relative z-10 h-full"
    >
      <div className="flex-shrink-0">
        <motion.div 
          className="w-12 h-12 rounded-full bg-[#4D1A50] flex items-center justify-center group-hover:bg-[#5D2060] transition-all duration-300"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-[#E4B0FF]">
          {title}
        </h3>
        <p className="text-white/90 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default function BenefitsSection() {
  return (
    <section id="преимущества" className="py-10 sm:py-14 relative z-10">
      <div className="container mx-auto px-4 relative">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#0E0317]/95 via-[#190226]/85 to-[#08010F]/95 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_25px_90px_rgba(43,8,75,0.55)]">
          <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(100,65,165,0.3),transparent_40%)]" />
          <div className="relative space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white text-center font-playfair tracking-[0.25em] uppercase"
            >
              Преимущества
            </motion.h2>
            <p className="text-center text-white/80 max-w-2xl mx-auto text-base sm:text-lg">
              Натуральные масла CPTG стандарта работают на всех уровнях — от эмоционального до физиологического, помогая возвращать баланс и энергию.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BenefitCard {...benefit} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
