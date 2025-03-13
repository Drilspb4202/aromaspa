import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Droplet, SpaceIcon as Yoga, Coffee, Palette, Users2 } from 'lucide-react'
import { motion } from 'framer-motion'
import OptimizedImage from '../components/OptimizedImage'

const services = [
  {
    title: "АромаДиагностика",
    icon: Droplet,
    duration: "2 часа",
    price: "2000₽",
    image: "https://i.ibb.co/WHLYGSf/image.jpg",
    description: "Сеанс включает индивидуальную консультацию, в ходе которой мы исследуем Ваше эмоциональное и физическое состояние методом Аромадиагностирования на базе 100% эфирных масел стандарта качества CPTG doTERRA с расшифровкой, а также Вы получите в подарок индивидуальные ресурсные духи под Ваш запрос."
  },
  {
    title: "АромаЙога",
    icon: Yoga,
    duration: "2,5 часа",
    price: "2000₽",
    image: "https://i.ibb.co/HHvhpgf/image.jpg",
    description: "Йога с эфирными маслами для максимального расслабления и духовного подъёма. Эта практика сочетает дыхательные упражнения, растяжку и эфирные масла, чтобы помочь Вам достичь глубокой медитации и снять стресс."
  },
  {
    title: "АромаДегустация",
    icon: Coffee,
    duration: "1 час",
    price: "500₽",
    image: "https://i.ibb.co/R3qMGt5/image.jpg",
    description: "Знакомство с эфирными маслами терапевтического качества и продукты на их основе. Вы узнаете, как эфирные масла могут помочь Вам чувствовать себя лучше, расслабиться и зарядиться энергией."
  },
  {
    title: "АромаНейрографика",
    icon: Palette,
    duration: "2 часа",
    price: "1000₽",
    image: "https://i.ibb.co/h285SPn/image.jpg",
    description: "Арт-терапия с эфирными маслами, помогает выразить эмоции через рисунок и освободиться от стресса. Сочетание эфирных масел и нейрографики стимулирует Ваше воображение и раскрывает творческие способности."
  },
  {
    title: "АромаТимбилдинг",
    icon: Users2,
    duration: "2 часа",
    price: "5000₽",
    image: "https://i.ibb.co/Cwzr2s3/2.jpg",
    description: "Корпоративное или праздничное мероприятие для создания дружеской атмосферы и укрепления командного духа. Это мероприятие позволяет сблизить команду через соответствующую атмосферу и эфирные масла."
  }
]

export default function ServicesSection() {
  const handleBooking = (service: string) => {
    console.log(`Бронирование услуги: ${service}`)
  }

  return (
    <section id="услуги" className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,255,0.1),transparent_70%)]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
        >
          Наши Услуги
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Card className="bg-purple-950/40 border-fuchsia-500/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:bg-purple-900/50">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-6 ring-2 ring-fuchsia-500/50 group-hover:ring-fuchsia-400 transition-all duration-300">
                    <OptimizedImage
                      src={service.image || null}
                      alt={service.title}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      {React.createElement(service.icon, { className: "w-5 h-5 text-fuchsia-400" })}
                      <h3 className="text-xl font-bold text-fuchsia-400">{service.title}</h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-400 pt-4">
                      <span>{service.duration}</span>
                      <span className="font-bold text-fuchsia-400">{service.price}</span>
                    </div>
                    <Button
                      className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white transition-colors"
                      onClick={() => handleBooking(service.title)}
                    >
                      Записаться
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

