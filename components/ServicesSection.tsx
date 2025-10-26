import React, { useCallback, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import OptimizedImage from './OptimizedImage'
import { Droplet, SpaceIcon as Yoga, Coffee, Palette, Users2, BoxIcon as Bottle, Briefcase } from 'lucide-react'
import Head from 'next/head'
import ShareButton from './ShareButton'

const services = [
  {
    id: 1,
    title: "АромаДиагностика",
    icon: Droplet,
    duration: "2 часа",
    price: "2000₽",
    image: "https://i.ibb.co/P5fxRsY/2024-11-28-21-11-31.jpg",
    description: "Сеанс включает индивидуальную консультацию, в ходе которой мы исследуем Ваше эмоциональное и физическое состояние методом АромаДиагностирования на базе 100% эфирных масел стандарта качества CPTG doTERRA с расшифровкой, а также Вы получите в подарок индивидуальные ресурсные духи под Ваш запрос."
  },
  {
    id: 2,
    title: "АромаЙога",
    icon: Yoga,
    duration: "2,5 часа",
    price: "2000₽",
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
    description: "АромаБизнес – это не просто тренд, это стиль жизни, где бизнес сочетается с заботой о здоровье и гармонии. У меня уже есть команда профессионалов – АромаПрактиков, и мы растем с каждым днем!\n\nВ нашей АромаШколе Вы сможете пройти обучение и начать зарабатывать в востребованной нише. Для моей команды – эксклюзивные условия, поддержка и программа лояльности.\n\nХочешь к нам? Запишись на услугу \"Хочу в АромаБизнес\" и начни свой путь уже сегодня!",
    action: "contact"
  },
  {
    id: 6,
    title: "Купить Эфирные Масла",
    icon: Bottle,
    image: "https://i.ibb.co/dGLN743/photo-2024-11-28-21-13-23.jpg",
    description: "Эфирные масла терапевтического качества и продукция на их основе об��адают мощными целебными свойствами, помогая восстановить баланс тела и ума. Благодаря своему натуральному составу они улучшают настроение, снимают стресс, поддерживают иммунитет и способствуют общему оздоровлению организма. А специализированные диффузоры помогут Вам погрузиться в уникальный мир АромаТерапии. А мы поможем определиться с выбором продукции перед покупкой с учётом Ваших индивидуальных запросов.",
    action: "buy"
  }
]

const ServiceCard = React.memo(({ service, handleAction }: {service: any, handleAction: any}) => (
  <Card className="bg-purple-950/30 border-fuchsia-500/30 overflow-hidden transition-all duration-300 hover:bg-purple-900/40 rounded-2xl h-full flex flex-col backdrop-blur-sm">
    <CardContent className="p-3 flex flex-col h-full">
      <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl">
        <OptimizedImage
          src={service.image}
          alt={`${service.title} - Aroma Spa Studio`}
          width={300}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="flex-grow space-y-2">
        <div className="flex items-center justify-center gap-2">
          {React.createElement(service.icon, { className: "w-5 h-5 text-fuchsia-400" })}
          <h3 className="text-base sm:text-lg font-bold text-fuchsia-400 group-hover:text-fuchsia-300 font-montserrat"> {service.title}</h3>
        </div>
        <h4 className="text-sm sm:text-md font-semibold text-white mb-2 font-montserrat">Описание услуги</h4>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed group-hover:text-white font-montserrat sm:line-clamp-none">
          {service.description}
        </p>
        {service.title !== "Купить Эфирные Масла" && (
          <div className="flex justify-between items-center text-xs sm:text-sm text-gray-400 mt-2">
            <span>{service.duration}</span>
            <span className="font-bold text-fuchsia-400 group-hover:text-fuchsia-300 font-montserrat">
              {service.title === "АромаДегустация" ? "бесплатно" : service.price}
            </span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <Button
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white transition-colors font-montserrat text-sm sm:text-base py-2 sm:py-3"
          onClick={() => {
            if (service.title === "Купить Эфирные Масла") {
              window.open('https://beta-doterra.myvoffice.com/Application/index.cfm?EnrollerID=14409682&Country=RUS', '_blank', 'noopener,noreferrer');
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
))

interface ServicesSectionProps {
  setIsShopOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ServicesSection({ setIsShopOpen }: ServicesSectionProps) {
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

  return (
    <>
      <Head>
        <title>Услуги Aroma Spa Studio | Профессиональная Ароматерапия в Санкт-Петербурге</title>
        <meta name="description" content="Откройте для себя широкий спектр услуг ароматерапии в Aroma Spa Studio. От АромаДиагностики до АромаБизнеса - мы предлагаем уникальные решения для вашего здоровья и благополучия." />
        <meta name="keywords" content="ароматерапия, эфирные масла, АромаДиагностика, АромаЙога, АромаДегустация, АромаНейрографика, АромаТимбилдинг, АромаБизнес, Санкт-Петербург" />
        <link rel="canonical" href="https://www.radmilaessentialoil.ru/services" />
        <meta property="og:title" content="Услуги Aroma Spa Studio | Профессиональная Ароматерапия" />
        <meta property="og:description" content="Исследуйте наши уникальные услуги ароматерапии, от индивидуальной АромаДиагностики до корпоративного АромаТимбилдинга. Погрузитесь в мир ароматов с Aroma Spa Studio." />
        <meta property="og:image" content="https://www.radmilaessentialoil.ru/images/services-og.jpg" />
        <meta property="og:url" content="https://www.radmilaessentialoil.ru/services" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": services.map((service, index) => ({
              "@type": "Service",
              "position": index + 1,
              "name": service.title,
              "description": service.description,
              "offers": {
                "@type": "Offer",
                "price": service.price,
                "priceCurrency": "RUB"
              },
              "provider": {
                "@type": "LocalBusiness",
                "name": "Aroma Spa Studio",
                "image": "https://www.radmilaessentialoil.ru/logo.jpg",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Санкт-Петербург",
                  "addressCountry": "RU"
                }
              }
            }))
          })}
        </script>
      </Head>
      <section id="услуги" className="py-8 sm:py-12 relative z-10">
        <div className="container mx-auto px-4 relative">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-12 text-center font-playfair tracking-wide"
          >
            НАШИ УСЛУГИ
          </motion.h2>
          <div className="flex justify-center mb-8">
            <ShareButton className="bg-purple-900/50 hover:bg-purple-800/70 text-white border-fuchsia-500/30" />
          </div>
          <p className="text-center text-gray-300 mb-8 max-w-xl mx-auto">
            Откройте для себя мир профессиональной АромаТерапии с нашими уникальными услугами. Каждая услуга разработана для улучшения Вашего физического и эмоционального благополучия.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {memoizedServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group h-full ${index === memoizedServices.length - 1 ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}
              >
                <ServiceCard service={service} handleAction={handleAction} />
              </motion.div>
            ))}
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": services.map((service, index) => ({
              "@type": "Service",
              "position": index + 1,
              "name": service.title,
              "description": service.description,
              "provider": {
                "@type": "BeautySalon",
                "name": "Aroma Spa Studio",
                "image": "https://www.radmilaessentialoil.ru/logo.jpg",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Советский пр., д. 12, кв/оф. 2",
                  "addressLocality": "Санкт-Петербург",
                  "postalCode": "192076",
                  "addressCountry": "RU"
                }
              }
            }))
          }) }} />
        </div>
      </section>
    </>
  )
}
