'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Gift, Phone, Mail } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { submitTelegramMessage } from '@/app/actions/telegram'

interface LeadCaptureFormProps {
  title?: string
  description?: string
  offer?: string
  className?: string
}

export default function LeadCaptureForm({
  title = "Получите бесплатную консультацию",
  description = "Оставьте контакты и мы свяжемся с вами в течение 15 минут",
  offer = "Бесплатная консультация + скидка 10% на первый визит",
  className = ""
}: LeadCaptureFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const message = `Новая заявка на консультацию:
Имя: ${name}
Телефон: ${phone}
Email: ${email || 'Не указан'}
Предложение: ${offer}`

      await submitTelegramMessage(message)

      toast({
        title: "Спасибо!",
        description: "Мы свяжемся с вами в ближайшее время",
      })

      setName('')
      setPhone('')
      setEmail('')
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={className}
    >
      <Card className="bg-gradient-to-br from-purple-900/40 via-fuchsia-900/40 to-pink-900/40 border-fuchsia-500/30 backdrop-blur-sm">
        <CardHeader className="p-5 pb-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-full p-1.5">
              <Gift className="w-4 h-4 text-white" />
            </div>
            <CardTitle className="text-white text-lg md:text-xl">{title}</CardTitle>
          </div>
          <p className="text-gray-300 text-xs md:text-sm">{description}</p>
          {offer && (
            <div className="mt-2 bg-fuchsia-500/20 border border-fuchsia-400/30 rounded-lg p-2">
              <p className="text-fuchsia-300 font-semibold text-xs md:text-sm">🎁 {offer}</p>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-5 pt-3">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white/10 border-fuchsia-400/30 text-white placeholder:text-gray-400 focus:border-fuchsia-400 h-11 rounded-xl"
              />
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="bg-white/10 border-fuchsia-400/30 text-white placeholder:text-gray-400 focus:border-fuchsia-400 h-11 rounded-xl"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email (необязательно)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-fuchsia-400/30 text-white placeholder:text-gray-400 focus:border-fuchsia-400 h-11 rounded-xl"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-700 hover:from-fuchsia-500 hover:to-purple-600 text-white font-semibold py-4 md:py-5 text-sm md:text-base rounded-xl"
            >
              {isSubmitting ? 'Отправка...' : 'Получить консультацию бесплатно'}
            </Button>
            <p className="text-xs text-gray-400 text-center">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

