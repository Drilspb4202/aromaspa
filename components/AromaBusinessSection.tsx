'use client'

import React, { useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { GraduationCap, Rocket, Users, Sparkles, ShieldCheck, Wallet } from 'lucide-react'

const steps = [
  {
    title: "Диагностика и цель",
    description: "Определяем формат обучения, желаемый доход и нишу: личная практика, школа, клуб или онлайн-продукты.",
    duration: "1 неделя",
  },
  {
    title: "Интенсивное обучение",
    description: "Практикуем продажи, упаковку программ, базу продукций doTERRA и работу с командами.",
    duration: "2–4 недели",
  },
  {
    title: "Запуск и поддержка",
    description: "Помогаем собрать первые кейсы, автоматизировать воронку и подключить Telegram/соцсети.",
    duration: "до 6 недель",
  },
]

const benefits = [
  {
    title: "Наставничество 1:1",
    description: "Выстраиваем стратегию совместно и корректируем на каждом этапе.",
    icon: Users,
  },
  {
    title: "Готовые сценарии",
    description: "Методички, презентации и уроки, которые можно сразу внедрять.",
    icon: GraduationCap,
  },
  {
    title: "Финансовая модель",
    description: "Помощь в расчёте предложения, маржинальности и точке роста.",
    icon: Wallet,
  },
  {
    title: "Защита бренда",
    description: "Рекомендуем только сертифицированные масла CPTG и безопасные методики.",
    icon: ShieldCheck,
  },
  {
    title: "Ускоренный старт",
    description: "Шорткаты по маркетингу, скрипты продаж и формат мини-ивентов.",
    icon: Rocket,
  },
  {
    title: "Комьюнити и PR",
    description: "Возможность выступать в АромаШколе и получать рекомендации.",
    icon: Sparkles,
  },
]

export default function AromaBusinessSection() {
  const handleCTA = useCallback(() => {
    const target = document.getElementById('контакты')
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <section id="арома-бизнес" className="py-10 sm:py-14 relative z-10">
      <div className="container mx-auto px-4 relative">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#1B0226]/95 via-[#280135]/85 to-[#05000A]/95 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_25px_90px_rgba(61,6,82,0.55)]">
          <div className="pointer-events-none absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.15),transparent_50%),radial-gradient(circle_at_80%_0%,rgba(196,84,255,0.25),transparent_40%)]" />
          <div className="relative space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white text-center font-playfair tracking-[0.25em] uppercase"
            >
              АромаБизнес & АромаШкола
            </motion.h2>
            <p className="text-center text-white/85 max-w-3xl mx-auto text-base sm:text-lg">
              От персонального наставничества до авторской школы. Помогаем запустить экологичный проект в сфере ароматерапии
              с проработанными продуктами и поддержкой эксперта.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-white/60">Этапы обучения</p>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex gap-4 bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-md"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/10 text-white/90 flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                          <span className="text-xs uppercase tracking-[0.3em] text-white/50">{step.duration}</span>
                        </div>
                        <p className="text-white/75 text-sm mt-2">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-white/60">Что вы получаете</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="bg-white/5 border border-white/10 rounded-3xl p-4 flex gap-3 items-start backdrop-blur-md"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-fuchsia-200">
                        <benefit.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white">{benefit.title}</h4>
                        <p className="text-white/75 text-sm mt-1">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div>
                <p className="text-white font-playfair text-lg">Готовы создать собственный ароматический бренд?</p>
                <p className="text-white/70 text-sm mt-1">Получите программу обучения и личную стратегическую сессию.</p>
              </div>
              <Button
                onClick={handleCTA}
                className="bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-400 hover:to-purple-500 text-white px-8 py-6 text-base rounded-full"
              >
                Получить программу
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

