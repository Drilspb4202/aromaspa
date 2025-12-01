import React from 'react'
import { motion } from 'framer-motion'
import { HeartHandshake, Briefcase, Sparkles, Users } from 'lucide-react'

const audiences = [
  {
    title: "Для тех, кто устал от стресса",
    description: "Глубокое эмоциональное перезагрузочное сопровождение и мягкие ритуалы, которые помогают снять тревогу, восстановить сон и вернуть ощущение внутренней опоры.",
    icon: HeartHandshake,
  },
  {
    title: "Для женщин в поиске ресурса",
    description: "Индивидуальные аромапрактики, поддержка гормонального баланса и личные beauty-ритуалы для тех, кто хочет сиять и уверенно проявляться.",
    icon: Sparkles,
  },
  {
    title: "Для команд и бизнеса",
    description: "Арома-тимбилдинги, корпоративные форматы и подарочные наборы, которые создают особую атмосферу доверия и продуктивности внутри команды.",
    icon: Briefcase,
  },
  {
    title: "Для семей и заботы о близких",
    description: "Программы для родителей и детей, поддержка иммунитета, семейные мастер-классы и аромапрактики, которые укрепляют связь и здоровье дома.",
    icon: Users,
  },
]

export default function ForWhomSection() {
  return (
    <section id="для-кого" className="py-10 sm:py-14 relative z-10">
      <div className="container mx-auto px-4 relative">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#0C0316]/90 via-[#180124]/85 to-[#05000B]/90 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_25px_90px_rgba(18,4,38,0.55)]">
          <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.12),transparent_40%),radial-gradient(circle_at_85%_0%,rgba(126,58,237,0.2),transparent_45%)]" />
          <div className="relative space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white text-center font-playfair tracking-[0.3em] uppercase"
            >
              Для кого
            </motion.h2>
            <p className="text-center text-white/80 max-w-3xl mx-auto text-base sm:text-lg">
              Мы работаем с теми, кто ценит осознанность, качество и персональный подход. Ароматерапия — это язык заботы,
              на котором мы помогаем Вашему телу и эмоциям возвращаться в баланс.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {audiences.map((audience, index) => (
                <motion.div
                  key={audience.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="h-full bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-md flex gap-4 items-start hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-fuchsia-200">
                      <audience.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-white">{audience.title}</h3>
                      <p className="text-white/75 text-sm leading-relaxed">{audience.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

