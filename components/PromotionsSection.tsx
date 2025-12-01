import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Tag } from 'lucide-react'
import OptimizedImage from './OptimizedImage'
import UrgencyTimer from './UrgencyTimer'
import SocialProof from './SocialProof'

const promotions = [
  {
    title: "Наградим по-королевски!",
    description: "Декабрь — особое время, когда мы готовим подарки любимым и близким и стараемся сделать рождественские и новогодние праздники по-настоящему волшебными. У нас есть многолетняя традиция дарить эфирное масло ладана именно в декабре. Ведь ладан — особо ценное масло. Это был один из щедрых даров волхвов — наравне с золотом и миррой. Ладан по праву считается королем эфирных масел, и в декабре Вы можете получить его бесплатно, сделав заказ от 200 PV с 1 по 31 декабря.",
  },
  {
    title: "Приведи друга",
    description: "Получите 15% скидку, когда приводите друга.",
    code: "FRIEND15",
    validUntil: "2024-12-31",
  },
  {
    title: "Первый визит",
    description: "10% скидка на первое посещение.",
    code: "NEWCLIENT10",
    validUntil: "2024-12-31",
  },
]

export default function PromotionsSection() {
  return (
    <section id="акции" className="py-10 sm:py-14 relative z-10">
      <div className="container mx-auto px-4 relative">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#1A0028]/90 via-[#270033]/80 to-[#05000A]/90 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_25px_90px_rgba(94,10,94,0.55)]">
          <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.12),transparent_50%),radial-gradient(circle_at_90%_0%,rgba(249,115,255,0.2),transparent_40%)]" />
          <div className="relative space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white text-center font-playfair tracking-[0.25em] uppercase"
            >
              Акции
            </motion.h2>

            <div className="mb-2 max-w-2xl mx-auto">
              <UrgencyTimer
                endDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
                title="Ограниченное предложение!"
                description="Акция действует только до конца месяца"
              />
            </div>

            <div className="mb-4 max-w-2xl mx-auto">
              <SocialProof />
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1"
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-md h-full">
                  <CardContent className="p-6 flex flex-col gap-6">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-3">Главное предложение</p>
                      <h3 className="text-2xl font-bold text-white mb-3">{promotions[0].title}</h3>
                      <p className="text-white/80 mb-6">{promotions[0].description}</p>
                      <Button
                        className="w-full sm:w-auto bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-400 hover:to-purple-500 text-white px-6 py-3 rounded-full"
                        onClick={() => {
                          window.open('https://beta-doterra.myvoffice.com/Application/index.cfm?EnrollerID=14409682&Country=RUS', '_blank', 'noopener,noreferrer')
                        }}
                      >
                        Перейти к покупке
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {promotions.slice(1).map((promo, index) => (
                        <Card key={index} className="bg-gradient-to-br from-[#5A1A69]/40 to-[#3C0E44]/60 border-white/5">
                          <CardContent className="p-4 space-y-3">
                            <div>
                              <h4 className="text-white font-semibold mb-1">{promo.title}</h4>
                              <p className="text-white/70 text-sm">{promo.description}</p>
                            </div>
                            <div className="space-y-2 text-white/60 text-sm">
                              {promo.code && (
                                <div className="flex items-center gap-2">
                                  <Tag className="w-4 h-4 text-fuchsia-300" />
                                  <span>Код: {promo.code}</span>
                                </div>
                              )}
                              {promo.validUntil && (
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-fuchsia-300" />
                                  <span>Действует до: 31.03.2026</span>
                                </div>
                              )}
                            </div>
                            {promo.code && (
                              <Button
                                variant="outline"
                                className="w-full border-white/20 text-white hover:bg-white/10"
                                onClick={() => {
                                  navigator.clipboard.writeText(promo.code)
                                  alert(`Код ${promo.code} скопирован!`)
                                }}
                              >
                                Скопировать код
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex-1"
              >
                <div className="rounded-[28px] overflow-hidden border border-white/10 shadow-[0_15px_60px_rgba(255,255,255,0.15)]">
                  <OptimizedImage
                    src="https://i.ibb.co/9VRPQZc/photo-2024-12-08-07-28-07.jpg"
                    alt="Ладан - король эфирных масел"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
