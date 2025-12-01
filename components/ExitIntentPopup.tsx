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
            className="fixed inset-0 bg-[#060213]/80 backdrop-blur-[6px] z-[100]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 via-purple-500/10 to-pink-500/20 blur-3xl rounded-[30px]" />
              <Card className="relative overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_rgba(7,2,21,0.95))] shadow-[0_25px_120px_rgba(138,43,226,0.45)]">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,0,128,0.2),transparent_35%)]" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
                  aria-label="Закрыть окно"
                >
                  <X className="w-5 h-5" />
                </button>
                <CardContent className="relative p-6 sm:p-8 space-y-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="bg-gradient-to-br from-fuchsia-400 to-purple-500 rounded-3xl p-3 shadow-[0_15px_45px_rgba(248,113,255,0.45)]">
                      <Gift className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-2">Special offer</p>
                      <h2 className="text-3xl font-semibold text-white mb-2 leading-tight">
                        Не уходите без подарка! <span className="ml-1">🎁</span>
                      </h2>
                      <p className="text-white/80 text-base max-w-md">
                        Бесплатная консультация и <span className="text-fuchsia-300 font-semibold">скидка 10%</span> на первый визит — только для гостей сайта.
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {['Персональный подбор', 'Расслабляющий сеанс', 'Приватные рекомендации'].map((chip) => (
                        <span key={chip} className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80 border border-white/10">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 rounded-2xl bg-white/5 border border-white/10 p-4 text-sm text-white/80">
                    <div>
                      <p className="font-semibold text-white mb-1">Эксперт</p>
                      <p className="text-white/70">Радмила Яковлева — сертифицированный аромапрактик</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Время ответа</p>
                      <p className="text-white/70">свяжемся в течение 15 минут после заявки</p>
                    </div>
                  </div>

                  <LeadCaptureForm
                    title="Оставьте контакты"
                    description="Мы подберём программу для вашего состояния и расскажем о подарке"
                    offer="Скидка 10% + персональный подбор эфирных масел"
                    variant="popup"
                    className="mb-0"
                  />

                  <p className="text-center text-xs text-white/50">
                    Мы бережно относимся к персональным данным. Отправляя заявку, вы принимаете условия политики конфиденциальности.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

