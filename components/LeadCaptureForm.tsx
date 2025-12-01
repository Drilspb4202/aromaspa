'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Gift } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { submitTelegramMessage } from '@/app/actions/telegram'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'

interface LeadCaptureFormProps {
  title?: string
  description?: string
  offer?: string
  className?: string
  variant?: 'default' | 'popup'
  source?: string
}

export default function LeadCaptureForm({
  title = "Получите бесплатную консультацию",
  description = "Оставьте контакты и мы свяжемся с вами в течение 15 минут",
  offer = "Бесплатная консультация + скидка 10% на первый визит",
  className = "",
  variant = 'default',
  source,
}: LeadCaptureFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [messenger, setMessenger] = useState('')
  const [request, setRequest] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const message = `Новая заявка на консультацию${source ? ` (${source})` : ''}:
Имя: ${name}
Телефон: ${phone}
Email: ${email || 'Не указан'}
Мессенджер: ${messenger || 'Не указан'}
Запрос: ${request || 'Не указан'}
Предложение: ${offer}`

      await submitTelegramMessage(message)

      toast({
        title: "Спасибо!",
        description: "Мы свяжемся с вами в ближайшее время",
      })

      setName('')
      setPhone('')
      setEmail('')
      setMessenger('')
      setRequest('')
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

  const isPopup = variant === 'popup'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(className, isPopup && 'w-full')}
    >
      <Card
        className={cn(
          "bg-gradient-to-br from-purple-900/40 via-fuchsia-900/40 to-pink-900/40 border-fuchsia-500/30 backdrop-blur-sm",
          isPopup && "bg-white/5 border-white/15 shadow-[0_25px_80px_rgba(82,0,89,0.45)]"
        )}
      >
        <CardHeader className={cn("pb-3", isPopup && "pb-2 text-center items-center gap-3")}>
          <div className={cn("flex items-center gap-2 mb-1", isPopup && "justify-center")}>
            <div className={cn(
              "bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-full p-1.5",
              isPopup && "p-2 shadow-[0_10px_40px_rgba(247,86,255,0.4)]"
            )}>
              <Gift className={cn("text-white", isPopup ? "w-5 h-5" : "w-4 h-4")} />
            </div>
            {title && (
              <CardTitle className={cn("text-white text-lg", isPopup && "text-2xl font-semibold tracking-tight")}>
                {title}
              </CardTitle>
            )}
          </div>
          {description && (
            <p className={cn("text-gray-300 text-xs", isPopup && "text-white/80 text-sm max-w-md")}>
              {description}
            </p>
          )}
          {offer && (
            <div className={cn(
              "mt-2 bg-fuchsia-500/20 border border-fuchsia-400/30 rounded-lg p-2",
              isPopup && "bg-white/10 border-white/20 text-sm"
            )}>
              <p className="text-fuchsia-300 font-semibold text-xs">🎁 {offer}</p>
            </div>
          )}
        </CardHeader>
        <CardContent className={cn("pt-0", isPopup && "pt-2")}>
          <form onSubmit={handleSubmit} className={cn("space-y-3", isPopup && "space-y-4")}>
            <div>
              <Input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={cn(
                  "bg-white/10 border-fuchsia-400/30 text-white placeholder:text-gray-400 focus:border-fuchsia-400",
                  isPopup && "bg-white/15 border-white/20 text-white/90 placeholder:text-white/60"
                )}
              />
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={cn(
                  "bg-white/10 border-fuchsia-400/30 text-white placeholder:text-gray-400 focus:border-fuchsia-400",
                  isPopup && "bg-white/15 border-white/20 text-white/90 placeholder:text-white/60"
                )}
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email (необязательно)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "bg-white/10 border-fuchsia-400/30 text-white placeholder:text-gray-400 focus:border-fuchsia-400",
                  isPopup && "bg-white/15 border-white/20 text-white/90 placeholder:text-white/60"
                )}
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Удобный мессенджер (WhatsApp, Telegram и т.д.)"
                value={messenger}
                onChange={(e) => setMessenger(e.target.value)}
                className={cn(
                  "bg-white/10 border-fuchsia-400/30 text-white placeholder:text-gray-400 focus:border-fuchsia-400",
                  isPopup && "bg-white/15 border-white/20 text-white/90 placeholder:text-white/60"
                )}
              />
            </div>
            <div>
              <Textarea
                placeholder="Кратко опишите ваш запрос (например: «Хочу снятие стресса и лучше спать»)"
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                className={cn(
                  "bg-white/10 border-fuchsia-400/30 text-white placeholder:text-gray-400 focus:border-fuchsia-400 min-h-[80px]",
                  isPopup && "bg-white/15 border-white/20 text-white/90 placeholder:text-white/60"
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full bg-gradient-to-r from-fuchsia-600 to-purple-700 hover:from-fuchsia-500 hover:to-purple-600 text-white font-semibold py-4 text-base",
                isPopup && "text-sm py-3 shadow-[0_12px_40px_rgba(139,92,246,0.55)]"
              )}
            >
              {isSubmitting ? 'Отправка...' : 'Получить консультацию бесплатно'}
            </Button>
            <p className="text-xs text-gray-400 text-center mt-2">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

