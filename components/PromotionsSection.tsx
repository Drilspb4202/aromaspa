import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Tag } from 'lucide-react'
import OptimizedImage from './OptimizedImage'

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
    <section id="акции" className="py-12 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url("https://i.ibb.co/5LmmGTK/DALL-E-2024-12-06-03-15-04-A-luxurious-image-featuring-a-purple-theme-redesigned-to-showcase-drops-o.webp")',
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
        >
          АКЦИИ И СКИДКИ
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <Card className="bg-purple-950/40 border-fuchsia-500/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:bg-purple-900/50 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="text-2xl font-bold text-fuchsia-400 mb-4">Наградим по-кролевски!</h3>
                <p className="text-gray-300 mb-6 flex-grow">{promotions[0].description}</p>
                <Button
                  className="mb-6 bg-fuchsia-600 hover:bg-fuchsia-700 text-white transition-colors"
                  onClick={() => {
                    window.open('https://beta-doterra.myvoffice.com/Application/index.cfm?EnrollerID=14409682&Country=RUS', '_blank', 'noopener,noreferrer')
                  }}
                >
                  Перейти к покупке
                </Button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {promotions.slice(1).map((promo, index) => (
                    <Card key={index} className="bg-purple-950/60 border-fuchsia-500/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:bg-purple-900/50">
                      <CardContent className="p-4 flex flex-col justify-between h-full">
                        <div>
                          <h3 className="text-lg font-bold text-fuchsia-400 mb-2">{promo.title}</h3>
                          <p className="text-gray-300 text-sm mb-3">{promo.description}</p>
                          {promo.code && (
                            <div className="flex items-center text-gray-400 mb-2">
                              <Tag className="w-4 h-4 mr-2" />
                              <span>Код: {promo.code}</span>
                            </div>
                          )}
                          {promo.validUntil && (
                            <div className="flex items-center text-gray-400">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>Действует до: 30.06.2025</span>
                            </div>
                          )}
                        </div>
                        {promo.code && (
                          <Button
                            className="mt-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white transition-colors"
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1"
          >
            <div className="h-full rounded-lg overflow-hidden">
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
    </section>
  )
}

