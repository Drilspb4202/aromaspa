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
    description: "Сеанс включает индивидуальную консультацию, в ходе которой мы исследуем Ваше эмоциональное и физическое состояние методом АромаДиагностирования на базе 100% эфирных масел стандарта качества CPTG dōTERRA с расшифровкой, а также Вы получите в подарок индивидуальные ресурсные духи под Ваш запрос."
  },
  {
    id: 2,
    title: "АромаЙога",
    icon: Yoga,
    duration: "2,5 часа",
    price: "3000₽",
    image: "https://i.ibb.co/12HV51n/photo-2024-11-28-21-13-29.jpg",
    description: "Йога с эфирными маслами премиального качества для максимального расслабления и духовного подъёма. Эта практика сочетает дыхательные упражнения, растяжку и эфирные масла, чтобы помочь Вам достичь глубокой медитации и снять стресс. Эфирные масла усиливают эффект йоги, помогая расслабиться и сосредоточиться. Занятие проходит в спокойной атмосфере, где каждый элемент направлен на достижение внутреннего равновесия и гармонии."
  },
  {
    id: 3,
    title: "АромаДегустация",
    icon: Coffee,
    duration: "1 час",
    price: "500₽",
    image: "https://i.ibb.co/CbM2886/photo-2024-11-28-21-13-32.jpg",
    description: "Знакомство с эфирными маслами терапевтического качества и продуктами на их основе. Вы узнаете, как эфирные масла могут помочь Вам чувствовать себя лучше, расслабиться и зарядиться энергией. Это отличный способ открыть для себя мир АромаТерапии и подобрать эфирные масла, которые наиболее подходят именно Вам. В подарок Вы получите индивидуальную соль/скраб для ванн."
  },
  {
    id: 4,
    title: "АромаНейрографика",
    icon: Palette,
    duration: "2 часа",
    price: "1000₽",
    image: "https://i.ibb.co/fnR67wP/photo-2024-11-28-21-13-26.jpg",
    description: "Арт-Терапия с эфирными маслами премиального качества, помогает выразить эмоции через рисунок и освободиться от стресса. Сочетание эфирных масел и нейрографики стимулирует Ваше воображение и раскрывает творческие способности. Во время сеанса Вы создадите уникальные рисунки, которые помогут разобраться с эмоциями и найти новые пути для самовыражения, что усилит Ваш личностный рост и развитие."
  },
  {
    id: 5,
    title: "АромаТимбилдинг",
    icon: Users2,
    duration: "2 часа",
    price: "5000₽",
    image: "https://i.ibb.co/WvDvwKd/photo-2024-11-28-21-13-28.jpg",
    description: "Корпоративное или праздничное мероприятие для создания дружеской атмосферы и укрепления командного духа. Это мероприятие позволяет сблизить команду через соответствующую атмосферу и эфирные масла, а также зарядиться гармонией и позитивным настроением."
  },
  {
    id: 7,
    title: "АромаБизнес",
    icon: Briefcase,
    image: "https://i.ibb.co/VJgt0kn/photo-2024-11-19-23-02-57.jpg",
    description: "АромаБизнес – это не просто тренд, это стиль жизни, где бизнес сочетается с заботой о здоровье и гармонии. У меня уже есть команда профессионалов – АромаЭкспертов, и мы растем с каждым днем!\n\nВ нашей АромаШколе Вы сможете пройти обучение и начать зарабатывать в востребованной нише. Для моей команды – эксклюзивные условия, поддержка и программа лояльности.\n\nХочешь к нам? Запишись на услугу \"Хочу в АромаБизнес\" и начни свой путь уже сегодня!",
    action: "contact"
  },
  {
    id: 6,
    title: "Купить Эфирные Масла",
    icon: Bottle,
    image: "https://i.ibb.co/dGLN743/photo-2024-11-28-21-13-23.jpg",
    description: "Эфирные масла терапевтического качества и продукция на их основе обладают мощными целебными свойствами, помогая восстановить баланс тела и ума. Благодаря своему натуральному составу они улучшают настроение, снимают стресс, поддерживают иммунитет и способствуют общему оздоровлению организма. А специализированные диффузоры помогут Вам погрузиться в уникальный мир АромаТерапии. А мы поможем определиться с выбором продукции перед покупкой с учётом Ваших индивидуальных запросов.",
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
            <h3 className="text-base sm:text-lg font-bold text-fuchsia-400 group-hover:text-fuchsia-300 font-montserrat" itemProp="name"> {service.title}</h3>
          </div>
          {service.duration && (
            <div className="flex justify-between items-center bg-fuchsia-600/20 px-4 py-2 rounded-lg border border-fuchsia-500/30">
              <span className="text-sm sm:text-base text-white font-medium font-montserrat" itemProp="duration">{service.duration}</span>
              <span className="text-xl sm:text-2xl font-bold text-fuchsia-400 group-hover:text-fuchsia-300 font-montserrat">
                {service.title === "АромаДегустация" ? "Бесплатно" : service.price}
              </span>
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
          <h4 className="text-sm sm:text-md font-semibold text-white mb-2 font-montserrat">Описание услуги</h4>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed group-hover:text-white font-montserrat sm:line-clamp-none" itemProp="description">
            {service.description}
          </p>
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

