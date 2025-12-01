import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import OptimizedImage from './OptimizedImage'
import { Droplet, SpaceIcon as Yoga, Coffee, Palette, Users2, BoxIcon as Bottle, Briefcase } from 'lucide-react'
import ShareButton from './ShareButton'
import StructuredData from './StructuredData'

const services = [
  {
    id: 1,
    title: "АромаДиагностика",
    icon: Droplet,
    duration: "2 часа",
    price: "3000₽",
    image: "https://i.ibb.co/P5fxRsY/2024-11-28-21-11-31.jpg",
    description: "Глубокая диагностика через ароматы, помогающая увидеть текущие эмоциональные и физические запросы.",
    bullets: [
      "Для тех, кто чувствует внутреннее напряжение, усталость или «потерю опоры»",
      "Помогает осознать свои ключевые состояния и запросы на изменения",
      "В результате — персональные ресурсные духи под Вашу задачу"
    ]
  },
  {
    id: 2,
    title: "АромаЙога",
    icon: Yoga,
    duration: "2,5 часа",
    price: "3000₽",
    image: "https://i.ibb.co/12HV51n/photo-2024-11-28-21-13-29.jpg",
    description: "Йога-практика с эфирными маслами для глубокого расслабления тела и успокоения ума.",
    bullets: [
      "Для тех, кто хочет мягко снять стресс и мышечные зажимы через движение и дыхание",
      "Помогает улучшить сон, концентрацию и гибкость тела",
      "Вы уходите с ощущением лёгкости, собранности и внутреннего баланса"
    ]
  },
  {
    id: 3,
    title: "АромаДегустация",
    icon: Coffee,
    duration: "1 час",
    price: "500₽",
    image: "https://i.ibb.co/CbM2886/photo-2024-11-28-21-13-32.jpg",
    description: "Практическое знакомство с эфирными маслами и способами их применения в жизни.",
    bullets: [
      "Для новичков в ароматерапии и тех, кто хочет «потрогать» масла перед покупкой",
      "Даем простые схемы: как применять масла для сна, энергии, иммунитета",
      "В итоге — базовый набор масел и идей, как встроить их в ежедневный уход"
    ]
  },
  {
    id: 4,
    title: "АромаНейрографика",
    icon: Palette,
    duration: "2 часа",
    price: "1000₽",
    image: "https://i.ibb.co/fnR67wP/photo-2024-11-28-21-13-26.jpg",
    description: "Творческая практика с нейрографикой и ароматами для мягкой переработки эмоций.",
    bullets: [
      "Для тех, кто «застрял» в переживаниях и хочет экологично их прожить",
      "Помогает снизить уровень тревоги, освободить голову от навязчивых мыслей",
      "На выходе — символический рисунок-ресурс и больше внутренней опоры"
    ]
  },
  {
    id: 5,
    title: "АромаТимбилдинг",
    icon: Users2,
    duration: "2 часа",
    price: "5000₽",
    image: "https://i.ibb.co/WvDvwKd/photo-2024-11-28-21-13-28.jpg",
    description: "Формат для команд и групп, где ароматы помогают создать доверие и вовлечённость.",
    bullets: [
      "Для компаний, проектов и творческих команд, которым важно усилить сплочённость",
      "Помогает участникам лучше понимать друг друга через общие ритуалы и впечатления",
      "Итог — тёплая атмосфера, эмоциональное сближение и «общий опыт» для команды"
    ]
  },
  {
    id: 7,
    title: "АромаБизнес",
    icon: Briefcase,
    image: "https://i.ibb.co/VJgt0kn/photo-2024-11-19-23-02-57.jpg",
    description: "Программа для тех, кто хочет зарабатывать на ароматерапии и запустить свой проект.",
    bullets: [
      "Для экспертов, коучей, мастеров и тех, кто хочет добавить Арома-направление в свою практику",
      "Помогает собрать линейку продуктов и услуг, понятную клиенту и прибыльную для вас",
      "Запрос «Хочу в АромаБизнес» — первый шаг к разбору вашей точки А и плана старта"
    ],
    action: "contact"
  },
  {
    id: 6,
    title: "Купить Эфирные Масла",
    icon: Bottle,
    image: "https://i.ibb.co/dGLN743/photo-2024-11-28-21-13-23.jpg",
    description: "Подбор масел и продукции doTERRA под ваши задачи с подробной инструкцией по применению.",
    bullets: [
      "Для тех, кто хочет выбрать безопасные масла без долгого изучения состава и брендов",
      "Подбираем решения под сон, стресс, иммунитет, детей и домашний уход",
      "Вы уходите с готовой схемой применения и понятным стартовым набором"
    ],
    action: "buy"
  }
]

const ServiceCard = React.memo(({ service, handleAction }: {service: any, handleAction: any}) => {
  // Парсим цену для микроразметки
  const priceMatch = service.price?.match(/(\d+)/)
  const price = priceMatch ? priceMatch[1] : undefined
  
  return (
    <Card className="bg-purple-950/30 border-fuchsia-500/30 overflow-hidden transition-all duration-300 hover:bg-purple-900/40 rounded-2xl h-full flex flex-col backdrop-blur-sm" itemScope itemType="https://schema.org/Service">
      <CardContent className="p-3 flex flex-col h-full">
        <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl">
          <OptimizedImage
            src={service.image}
            alt={`${service.title} - AROMA SPA СТУДИЯ`}
            width={300}
            height={300}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            itemProp="image"
          />
        </div>
        <div className="flex-grow space-y-3">
          <div className="flex items-center justify-center gap-2">
            {React.createElement(service.icon, { className: "w-5 h-5 text-fuchsia-400" })}
            <h3 className="text-base sm:text-lg font-bold text-fuchsia-400 group-hover:text-fuchsia-300 font-montserrat" itemProp="name">
              {service.title}
            </h3>
          </div>

          {/* Бейдж с форматом и ценой в одной строке */}
          {service.duration && (
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-600/15 border border-fuchsia-500/40 px-4 py-1.5">
                <span className="text-xs sm:text-sm text-white font-montserrat" itemProp="duration">
                  {service.duration}
                </span>
                <span className="text-xs sm:text-sm text-fuchsia-300 font-semibold font-montserrat">
                  {service.title === "АромаДегустация" ? "Бесплатно" : service.price}
                </span>
              </div>
              {price && (
                <meta itemProp="offers" itemScope itemType="https://schema.org/Offer" />
              )}
            </div>
          )}
          {price && (
            <div itemScope itemType="https://schema.org/Offer" style={{ display: 'none' }}>
              <meta itemProp="price" content={price} />
              <meta itemProp="priceCurrency" content="RUB" />
              <meta itemProp="availability" content="https://schema.org/InStock" />
            </div>
          )}

          {/* Короткое описание + буллеты «для кого / что даёт» */}
          {service.description && (
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-montserrat" itemProp="description">
              {service.description}
            </p>
          )}
          {service.bullets && Array.isArray(service.bullets) && (
            <ul className="mt-1.5 space-y-1.5 text-xs sm:text-sm text-white/85 font-montserrat list-disc list-inside">
              {service.bullets.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-4">
          <Button
            className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-700 hover:from-fuchsia-500 hover:to-purple-600 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-fuchsia-500/50 border-2 border-fuchsia-400 font-montserrat text-sm sm:text-base py-2 sm:py-3 rounded-xl"
            onClick={() => {
              if (service.title === "Купить Эфирные Масла") {
                window.open('https://office.doterra.com/Application/index.cfm', '_blank', 'noopener,noreferrer');
              } else {
                handleAction(service.title, service.action || "book");
              }
            }}
            aria-label={service.action === "buy" ? `Купить ${service.title}` : `Записаться на ${service.title}`}
          >
            {service.action === "buy" ? "Купить" : "Записаться"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})

interface ServicesSectionProps {
  setIsShopOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ServicesSection({ setIsShopOpen }: ServicesSectionProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleAction = useCallback((service: string, action: string) => {
    if (action === "buy") {
      setIsShopOpen(true);
    } else if (action === "contact") {
      const contactForm = document.getElementById('контакты');
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const serviceSelect = document.querySelector('select[name="service"]') as HTMLSelectElement;
        if (serviceSelect) {
          serviceSelect.value = service; 
        }
      }
    } else {
      const bookingForm = document.getElementById('контакты')
      if (bookingForm) {
        bookingForm.scrollIntoView({ behavior: 'smooth', block: 'start' })
        const serviceSelect = document.querySelector('select[name="service"]') as HTMLSelectElement
        if (serviceSelect) {
          serviceSelect.value = service
        }
      }
    }
  }, [setIsShopOpen])

  const memoizedServices = useMemo(() => services, [])

  if (!isClient) {
    return (
      <section id="услуги" className="py-8 sm:py-12 relative z-10">
        <div className="container mx-auto px-4 relative">
          <div className="text-center text-white">Загрузка услуг...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="услуги" className="py-10 sm:py-14 relative z-10">
      <div className="container mx-auto px-4 relative">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#1F0228]/90 via-[#250230]/80 to-[#0B0115]/90 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_25px_90px_rgba(68,10,98,0.5)]">
          <div className="pointer-events-none absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,255,0.25),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(124,58,237,0.2),transparent_35%)]" />
          <div className="relative space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white text-center font-playfair tracking-[0.2em] uppercase"
            >
              Услуги
            </motion.h2>
            {/* JSON-LD микроразметка для услуг */}
            <StructuredData
              type="services"
              data={memoizedServices}
              businessName="AROMA SPA СТУДИЯ"
              businessUrl="https://www.radmilaessentialoil.ru"
              businessImage="https://www.radmilaessentialoil.ru/logo.jpg"
            />
            
            <div className="flex justify-center">
              <ShareButton className="bg-white/10 hover:bg-white/20 text-white border-white/20" />
            </div>
            <p className="text-center text-white/90 mb-4 max-w-2xl mx-auto font-montserrat text-base sm:text-lg">
              Откройте для себя мир профессиональной ароматерапии с нашими авторскими программами. Каждая услуга — это бережный ритуал заботы о теле и душе.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {memoizedServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group h-full ${index === memoizedServices.length - 1 ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}
                  itemScope
                  itemType="https://schema.org/Service"
                >
                  <ServiceCard service={service} handleAction={handleAction} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

