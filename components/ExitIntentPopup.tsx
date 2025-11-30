'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Gift, Sparkles } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { submitTelegramMessage } from '@/app/actions/telegram'

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const message = `Новая заявка на консультацию (Exit Intent):
Имя: ${name}
Телефон: ${phone}
Email: ${email || 'Не указан'}
Предложение: Бесплатная консультация + скидка 10% на первый визит`

      await submitTelegramMessage(message)

      toast({
        title: "Спасибо!",
        description: "Мы свяжемся с вами в ближайшее время",
      })

      setName('')
      setPhone('')
      setEmail('')
      setIsOpen(false)
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop с улучшенным эффектом */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gradient-to-br from-black/90 via-purple-900/50 to-black/90 backdrop-blur-md z-[100]"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Декоративные элементы фона */}
          <div className="fixed inset-0 z-[101] pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {/* Модальное окно */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50, rotateX: 15 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.5
            }}
            className="fixed inset-0 z-[102] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-lg w-full">
              {/* Свечение вокруг модального окна */}
              <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-50 animate-pulse" />
              
              {/* Основной контейнер */}
              <div className="relative bg-gradient-to-br from-purple-950/95 via-fuchsia-950/95 to-pink-950/95 backdrop-blur-xl rounded-3xl border-2 border-fuchsia-400/40 shadow-2xl overflow-hidden">
                {/* Декоративные линии */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-50" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-50" />
                
                {/* Кнопка закрытия */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 group"
                  aria-label="Закрыть"
                >
                  <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                </button>
                
                {/* Контент */}
                <div className="p-8 md:p-10">
                  {/* Заголовок с иконкой */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-8"
                  >
                    {/* Анимированная иконка подарка */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 15,
                        delay: 0.3 
                      }}
                      className="relative inline-block mb-6"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-full blur-xl opacity-60 animate-pulse" />
                      <div className="relative bg-gradient-to-br from-fuchsia-500 via-pink-500 to-purple-500 rounded-full p-5 w-20 h-20 mx-auto flex items-center justify-center shadow-2xl">
                        <Gift className="w-10 h-10 text-white drop-shadow-lg" />
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            repeatDelay: 3 
                          }}
                          className="absolute -top-2 -right-2"
                        >
                          <Sparkles className="w-6 h-6 text-yellow-400" />
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    <motion.h2
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-3xl md:text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white via-fuchsia-200 to-pink-200 bg-clip-text text-transparent"
                    >
                      Не уходите без подарка! 🎁
                    </motion.h2>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-gray-300 text-lg leading-relaxed"
                    >
                      Получите <span className="text-fuchsia-400 font-bold text-xl">бесплатную консультацию</span> и{' '}
                      <span className="text-pink-400 font-bold text-xl">скидку 10%</span> на первый визит
                    </motion.p>
                  </motion.div>
                  
                  {/* Форма */}
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="space-y-3">
                      <Input
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-white/10 border-fuchsia-400/30 text-white placeholder:text-gray-400 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/50 transition-all duration-300 h-12 text-base"
                      />
                      <Input
                        type="tel"
                        placeholder="Телефон"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="bg-white/10 border-fuchsia-400/30 text-white placeholder:text-gray-400 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/50 transition-all duration-300 h-12 text-base"
                      />
                      <Input
                        type="email"
                        placeholder="Email (необязательно)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/10 border-fuchsia-400/30 text-white placeholder:text-gray-400 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/50 transition-all duration-300 h-12 text-base"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 hover:from-fuchsia-500 hover:via-pink-500 hover:to-purple-500 text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-2xl hover:shadow-fuchsia-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border-2 border-white/20 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                            Отправка...
                          </>
                        ) : (
                          <>
                            <Gift className="w-5 h-5" />
                            Получить консультацию бесплатно
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </Button>
                    
                    <p className="text-xs text-gray-400 text-center mt-3">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </motion.form>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

