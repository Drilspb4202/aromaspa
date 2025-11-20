'use client'

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react'
import { Button } from "../components/ui/button"
import { ChevronRight, Phone, Mail, Menu, Award, Clock, Users, Droplet, SpaceIcon as Yoga, Coffee, Palette, Users2, BoxIcon as Bottle, Flower, Briefcase, X, Loader2, ShoppingCart, Image, HelpCircle, Gift, BookOpen, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import OptimizedImage from '../components/OptimizedImage'
import { preloadImages } from '../utils/imagePreloader'
import dynamic from 'next/dynamic'
import ErrorBoundary from '../components/ErrorBoundary'
import OilSelector from '../components/OilSelector'
import OilShop from '@/components/OilShop'
import { Oil } from '@/data/oils'
import ServicesSection from '../components/ServicesSection'
import BenefitsSection from '../components/BenefitsSection'
import GallerySection from '../components/GallerySection'
import ReviewsSection from '../components/ReviewsSection'
import FAQSection from '../components/FAQSection'
import ContactSection from '../components/ContactSection'
import PromotionsSection from '../components/PromotionsSection'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { measurePerformance } from '../utils/performance'
import { CarouselSection } from '@/components/CarouselSection';
import { useCart } from '@/contexts/CartContext';
import { getSafeBackgroundImage } from '../utils/imageUtils';

const AnimatedCounter = React.memo(({ number, text }: { number: number, text: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest > 0 && latest < 1) {
        setCount(Math.floor(latest * number))
      }
    })
    return () => unsubscribe()
  }, [scrollYProgress, number])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-fuchsia-500 mb-2">{count}</div>
      <div className="text-sm text-gray-300">{text}</div>
    </div>
  )
})

AnimatedCounter.displayName = 'AnimatedCounter'

function Spinner({ size = "default" }: { size?: "default" | "sm" | "lg" }) {
  const sizeClasses = {
    default: "w-4 h-4",
    sm: "w-3 h-3",
    lg: "w-6 h-6",
  }

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]}`} />
  )
}

const DynamicOilSelector = dynamic(() => import('../components/OilSelector'), {
  loading: () => (
    <div className="py-20 text-center text-white">
      <Spinner size="lg" />
      <p className="mt-4">Загрузка подбора масел...</p>
    </div>
  ),
  ssr: false,
})

const DynamicGallerySection = dynamic(() => import('../components/GallerySection'), {
  loading: () => (
    <div className="py-20 text-center text-white">
      <Spinner size="lg" />
      <p className="mt-4">Загрузка галереи...</p>
    </div>
  ),
  ssr: false,
})

export default function AromaSpaStudio() {
  const endMeasure = measurePerformance('AromaSpaStudio')
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
    return endMeasure
  }, [])

  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const { cart, addToCart: addToCartContext, removeFromCart: removeFromCartContext } = useCart();
  const [isShopOpen, setIsShopOpen] = useState(false)
  const [selectedQRCode, setSelectedQRCode] = useState<string | null>(null)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const sectionRefs = {
    'о-нас': useRef<HTMLElement>(null),
    'выбор-масел': useRef<HTMLElement>(null),
    'услуги': useRef<HTMLElement>(null),
    'акции': useRef<HTMLElement>(null),
    'преимущества': useRef<HTMLElement>(null),
    'галерея': useRef<HTMLElement>(null),
    'отзывы': useRef<HTMLElement>(null),
    'faq': useRef<HTMLElement>(null),
    'контакты': useRef<HTMLElement>(null),
  }


  // Оптимизированный обработчик скролла с throttling
  useEffect(() => {
    let rafId: number | null = null;
    let lastScrollTime = 0;
    const throttleMs = 100; // Throttle до 100ms

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < throttleMs) {
        return;
      }
      lastScrollTime = now;

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 100;
        let currentSection = '';
        
        Object.entries(sectionRefs).forEach(([key, ref]) => {
          if (ref.current) {
            const { offsetTop, offsetHeight } = ref.current;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              currentSection = key;
            }
          }
        });

        if (currentSection !== activeSection) {
          setActiveSection(currentSection);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once to set initial active section
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [activeSection]);

  useEffect(() => {
    const preloadKey = async () => {
      await preloadImages([
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Photoroom-20241123_220709-9M8bnY1P72q6nCaMMOk6MnJaHKyPUY.png",
        "https://i.ibb.co/8NDztqx/radmila-jpg.jpg"
      ])
    }
    preloadKey()
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const yOffset = -80 
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({top: y, behavior: 'smooth'})
    }
    setActiveSection(sectionId)
    setIsMenuOpen(false)
  }, [setIsMenuOpen, setActiveSection])

  const getTotalItems = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Используем функции из CartContext
  const addToCart = useCallback((oil: Oil) => {
    addToCartContext(oil);
  }, [addToCartContext]);

  const removeFromCart = useCallback((oilId: string) => {
    removeFromCartContext(oilId);
  }, [removeFromCartContext]);

  const navigation = [
    { name: 'О нас', href: '#о-нас', icon: Users },
    { name: 'Выбор масел', href: '#выбор-масел', icon: Droplet },
    { name: 'Услуги', href: '#услуги', icon: Award },
    { name: 'Акции', href: '#акции', icon: Gift },
    { name: 'Преимущества', href: '#преимущества', icon: Award },
    { name: 'Галерея', href: '#галерея', icon: Image },
    { name: 'Отзывы', href: '#отзывы', icon: Users },
    { name: 'FAQ', href: '#faq', icon: HelpCircle },
    { name: 'Контакты', href: '#контакты', icon: Phone },
    { name: 'Блог', href: '/blog', icon: BookOpen },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    { id: '1', title: 'Ароматерапия' },
    { id: '2', title: 'Массаж' },
    { id: '3', title: 'Спа-процедуры' },
    { id: '4', title: 'Очищение организма' },
    { id: '5', title: 'Консультация ароматерапевта' },
    { id: '6', title: 'Аромадиагностика' },
    // ... more services
  ];

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-black text-white relative">
        <header>
          <div 
            className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{
              backgroundImage: getSafeBackgroundImage('https://i.ibb.co/5LmmGTK/DALL-E-2024-12-06-03-15-04-A-luxurious-image-featuring-a-purple-theme-redesigned-to-showcase-drops-o.webp'),
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
            }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          </div>

          {/* Navigation */}
          <nav aria-label="Главное меню" className={`fixed w-full z-50 transition-all duration-300 ${scrollPosition > 50 ? 'bg-purple-900/80 backdrop-blur-md' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 py-2">
              <div className="flex justify-between items-center gap-2">
                <div className="flex items-center gap-4 hover:scale-105 transition-transform duration-300 min-w-0">
                  <OptimizedImage
                    src="/logo-yar.png"
                    alt="Logo ЯR"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full shadow-lg flex-shrink-0"
                    priority
                  />
                  <div className="hidden sm:block min-w-0 max-w-[180px] lg:max-w-none">
                    <h1 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-white via-purple-300 to-fuchsia-300 bg-clip-text text-transparent tracking-wider font-playfair leading-tight">
                      Гармония Души и Тела
                    </h1>
                    <div className="text-xs lg:text-sm font-light text-fuchsia-400 italic tracking-wide mt-1 leading-tight">
                      by Радмила Яковлева
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex space-x-1 bg-purple-900/60 backdrop-blur-md p-1 rounded-full shadow-lg text-xs flex-shrink-0">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => item.href.startsWith('#') ? scrollToSection(item.href.slice(1)) : router.push(item.href)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                        activeSection === item.href.slice(1) 
                          ? 'bg-purple-600 text-white shadow-md' 
                          : 'text-white hover:bg-purple-800/50'
                      } transition-all duration-300 ease-in-out`}
                      aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
                      aria-label={`Перейти к разделу ${item.name}`}
                    >
                      {React.createElement(item.icon, { className: "w-3 h-3 mr-1" })}
                      <span>{item.name}</span>
                    </button>
                  ))}
                  <Link
                    href="/shop"
                    className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                      activeSection === 'shop' 
                        ? 'bg-purple-600 text-white shadow-md' 
                        : 'text-white hover:bg-purple-800/50'
                    } transition-all duration-300 ease-in-out`}
                    aria-label="Перейти в магазин"
                  >
                    <ShoppingBag className="w-3 h-3 mr-1" />
                    <span>Магазин</span>
                    {isClient && cart.length > 0 && (
                      <span className="bg-fuchsia-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center ml-1">
                        {getTotalItems()}
                      </span>
                    )}
                  </Link>
                </div>
                <Button
                  className="md:hidden bg-purple-900/60 backdrop-blur-md hover:bg-purple-800/70"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
                >
                  {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
                </Button>
              </div>
            </div>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden bg-black/95 backdrop-blur-md overflow-hidden z-50"
                >
                  <div className="container mx-auto px-4 py-4">
                    {navigation.map((item) => (
                      <motion.button
                        key={item.name}
                        onClick={() => {
                          item.href.startsWith('#') ? scrollToSection(item.href.slice(1)) : router.push(item.href);
                          setIsMenuOpen(false)
                        }}
                        className="flex items-center gap-2 w-full text-left py-2 text-white hover:text-fuchsia-500 transition-colors"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        aria-label={`Перейти к разделу ${item.name}`}
                      >
                        {React.createElement(item.icon, { className: "w-5 h-5" })}
                        <span>{item.name}</span>
                      </motion.button>
                    ))}
                    <motion.button
                      onClick={() => {
                        router.push('/shop');
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full text-left py-2 text-white hover:text-fuchsia-500 transition-colors"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      aria-label="Перейти в магазин"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Магазин</span>
                      {isClient && cart.length > 0 && (
                        <span className="bg-fuchsia-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">
                          {cart.length}
                        </span>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* Mobile Bottom Navigation */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md z-50 border-t border-fuchsia-500/30" aria-label="Меню навигации">
            <div className="flex justify-around py-3 px-2">
              {['услуги', 'галерея', 'контакты', 'магазин', 'главная'].map((item) => (
                <button
                  key={item}
                  onClick={() => item === 'магазин' ? router.push('/shop') : item === 'главная' ? scrollToTop() : scrollToSection(item)}
                  className={`text-sm ${activeSection === item ? 'text-fuchsia-500' : 'text-white'} hover:text-fuchsia-500 transition-colors`}
                  aria-label={`Перейти к разделу ${item.charAt(0).toUpperCase() + item.slice(1)}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </header>

        <article>
          <section id="hero" aria-label="Главный баннер">
            {/* Hero Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative min-h-screen overflow-hidden pt-20 z-10"
            >
              <div className="container mx-auto px-4 py-12 relative z-10 flex items-center min-h-[calc(100vh-80px)]">
                <div className="w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 w-full max-w-[250px] mx-auto"
                  >
                    <OptimizedImage
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hxwo0WQe3vax9AD8KKTokvTiwnrUgq.png"
                      alt="AROMA SPA СТУДИЯ Logo"
                      width={250}
                      height={250}
                      className="w-full h-auto rounded-2xl"
                      priority
                    />
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 tracking-wider text-center font-playfair"
                  >
                    РАДМИЛЫ ЯКОВЛЕВОЙ
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-300 mb-8 text-center italic px-4 font-medium font-montserrat"
                  >
                    "Ваш путь к гармонии начинается здесь, касаясь души через заботу о теле"
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="w-full rounded-[2rem] overflow-hidden mb-8"
                  >
                    <OptimizedImage
                      src="https://i.ibb.co/8NDztqx/radmila-jpg.jpg"
                      alt="Радмила Яковлева - профессиональный аромаэксперт"
                      width={600}
                      height={800}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="w-full flex justify-center"
                  >
                    <Button
                      onClick={() => scrollToSection('услуги')}
                      className="w-full sm:w-auto bg-gradient-to-r from-fuchsia-600 to-purple-700 hover:from-fuchsia-500 hover:to-purple-600 text-white px-6 py-3 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-fuchsia-500/50 border-2 border-fuchsia-400"
                      aria-label="Перейти к разделу услуг"
                    >
                      Начать путешествие
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          </section>

          <section id="о-нас" ref={sectionRefs['о-нас']} aria-label="О нас" className="py-16 relative z-10">
            <div className="container mx-auto px-4 relative">
              <motion.h2
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-white mb-12 text-center font-playfair"
              >
                РАДМИЛА ЯКОВЛЕВА - ВАШ ЭКСПЕРТ В МИР АРОМАТЕРАПИИ
              </motion.h2>
              <div className="max-w-4xl mx-auto mb-16 text-center">
                <p className="text-lg text-gray-300 mb-6">
                  Добро пожаловать в AROMA SPA СТУДИЮ, где наука об АромаТерапии встречается с искусством исцеления. Я посвятила свою жизнь изучению и применению эфирных масел для улучшения физического и эмоционального благополучия.


                </p>
                <p className="text-lg text-gray-300 mb-6">
                  В нашей AROMA SPA СТУДИИ мы используем только 100% натуральные эфирные масла высочайшего качества CPTG от dōTERRA, чтобы обеспечить максимальную эффективность и безопасность каждой процедуры. Узнайте больше о наших услугах и преимуществах АромаТерапии.
                </p>
                <p className="text-lg text-gray-300">
                  Готовы начать свое путешествие к гармонии? <a href="#контакты" className="text-fuchsia-400 hover:text-fuchsia-300">Свяжитесь с нами</a> для записи на консультацию или посетите наш <a href="/shop" className="text-fuchsia-400 hover:text-fuchsia-300">магазин эфирных масел</a>.
                </p>
              </div>
              {/* Achievements Section */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-16 space-y-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-purple-950/40 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-purple-900/50 transition-all duration-300"
                  >
                    <Award className="w-12 h-12 text-fuchsia-400 mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-white mb-4 font-playfair">Квалификация</h3>
                    <p className="text-gray-300 font-playfair">
                      Дипломированный специалист с образованием Пищевого Тенолога
                      НИИ ИТМО (2014 г), АромаЭксперт, Куратор АромаШколы
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="bg-purple-950/40 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-purple-900/50 transition-all duration-300"
                  >
                    <Clock className="w-12 h-12 text-fuchsia-400 mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-white mb-4 font-playfair">Опыт</h3>
                    <p className="text-gray-300 font-playfair">
                      С 2023 года более 50 успешно проведенных АромаДиагностик
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="bg-purple-950/40 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-purple-900/50 transition-all duration-300"
                  >
                    <Users className="w-12 h-12 text-fuchsia-400 mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-white mb-4 font-playfair">Специализация</h3>
                    <p className="text-gray-300 font-playfair">
                      Очищение и омоложение организма
                      <br />
                      с помощью натуральных методов
                      <br />
                      более 10 лет
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="bg-purple-950/40 backdrop-blur-sm p-8 rounded-2xl max-w-3xl mx-auto"
                >
                  <h3 className="text-2xl font-bold text-white mb-8 text-center font-playfair">  Почему выбирают нас</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="text-fuchsia-400 mt-1">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                      <p className="text-white/90 font-montserrat">Мы разрабатываем персональные решения, учитывая Ваши личные потребности и цели. Каждая программа создаётся с максимальным вниманием к деталям, чтобы обеспечить наилучший результат именно для Вас.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-fuchsia-400 mt-1">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                      <p className="text-white/90 font-montserrat">Мы используем только сертифицированные эфирные масла высшего качества, которые проходят строгий контроль на чистоту и эффективность. Это гарантирует безопасность и максимальную пользу для вашего здоровья и самочувствия.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-fuchsia-400 mt-1">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                      <p className="text-white/90 font-montserrat">Мы соединяем древние знания с современными методиками, чтобы предложить гармоничное решение для Вашего тела и ума. Такой синтез позволяет достичь баланса и улучшить качество Вашей жизни на всех уровнях.</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section id="выбор-масел" ref={sectionRefs['выбор-масел']} aria-label="Подбор масел">
            {/* Oil Selector Section */}
            <motion.section className="py-20 relative z-10">
              <div className="container mx-auto px-4">
                <DynamicOilSelector addToCart={addToCart} removeFromCart={removeFromCart} />
              </div>
            </motion.section>
          </section>

          {/* Services Section */}
          <section id="услуги" ref={sectionRefs['услуги']} aria-label="Услуги" className="py-12 relative z-10">
            <div className="container mx-auto px-4 relative">
              <ErrorBoundary>
                <Suspense fallback={<div className="py-20 text-center text-white">Загрузка услуг...</div>}>
                  <ServicesSection setIsShopOpen={setIsShopOpen} />
                </Suspense>
              </ErrorBoundary>
              <div className="text-center mt-8">
                <p className="text-lg text-gray-300">
                  Хотите подобрать идеальное масло для Вашей процедуры? Воспользуйтесь нашим инструментом подбора масел.
                </p>
              </div>
            </div>
          </section>

          {/* Promotions Section */}
          <section id="акции" ref={sectionRefs['акции']} aria-label="Акции" className="relative z-10">
            <div className="container mx-auto px-4 relative">
              <ErrorBoundary>
                <Suspense fallback={<div className="py-20 text-center"><Spinner size="lg" /></div>}>
                  <PromotionsSection />
                </Suspense>
              </ErrorBoundary>
            </div>
          </section>

          {/* Benefits Section */}
          <section id="преимущества" ref={sectionRefs['преимущества']} aria-label="Преимущества" className="py-20 relative z-10">
            <div className="container mx-auto px-4 relative">
              <ErrorBoundary>
                <Suspense fallback={<div className="py-20 text-center"><Spinner size="lg" /></div>}>
                  <BenefitsSection />
                </Suspense>
              </ErrorBoundary>
            </div>
          </section>

          {/* Gallery Section */}
          <section id="галерея" ref={sectionRefs['галерея']} aria-label="Галерея" className="py-12 relative z-10">
            <div className="container mx-auto px-4 relative">
              <ErrorBoundary>
                <Suspense fallback={<div className="py-20 text-center"><Spinner size="lg" /></div>}>
                  <DynamicGallerySection />
                </Suspense>
              </ErrorBoundary>
            </div>
          </section>

          {/* Reviews Section */}
          <section id="отзывы" ref={sectionRefs['отзывы']} aria-label="Отзывы" className="relative z-10">
            <div className="container mx-auto px-4 relative">
              <ErrorBoundary>
                <Suspense fallback={<div className="py-20 text-center"><Spinner size="lg" /></div>}>
                  <ReviewsSection />
                </Suspense>
              </ErrorBoundary>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" ref={sectionRefs['faq']} aria-label="FAQ" className="relative z-10">
            <div className="container mx-auto px-4 relative">
              <ErrorBoundary>
                <Suspense fallback={<div className="py-20 text-center"><Spinner size="lg" /></div>}>
                  <FAQSection />
                </Suspense>
              </ErrorBoundary>
              <div className="text-center mt-8">
                <p className="text-lg text-gray-300">
                  Не нашли ответ на свой вопрос? Ознакомьтесь с нашими <a href="#услуги" className="text-fuchsia-400 hover:text-fuchsia-300">услугами</a> или <a href="#контакты" className="text-fuchsia-400 hover:text-fuchsia-300">свяжитесь с нами</a> для получения дополнительной информации.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="контакты" ref={sectionRefs['контакты']} aria-label="Контакты" className="relative z-10">
            <div className="container mx-auto px-4 relative">
              <ErrorBoundary>
                <ContactSection />
              </ErrorBoundary>
            </div>
          </section>
        </article>

        <footer className="bg-transparent backdrop-blur-sm text-white py-8 rounded-t-[2rem] relative z-10">
          <div className="container mx-auto px-4 pb-20 md:pb-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center mb-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <OptimizedImage
                    src="https://i.ibb.co/jKL33nC/image.png"
                    alt="QR код"
                    width={100}
                    height={100}
                    className="relative rounded-2xl w-28 h-28 cursor-pointer hover:scale-110 transition-all duration-300 shadow-2xl ring-2 ring-white/20 hover:ring-white/40"
                    onClick={() => setSelectedQRCode("https://i.ibb.co/wZXDcGH6/photo-2025-10-28-22-41-54.jpg")}
                  />
                </div>
              </div>
              <nav aria-label="Навигация по сайту" className="mb-4">
                <ul className="flex flex-wrap justify-center gap-4">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-white hover:text-fuchsia-500 transition-colors"
                        aria-label={`Перейти к разделу ${item.name}`}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="text-center font-playfair">
                <p>&copy; 2024 Гармония Души и Тела. Все права защищены.</p>
              </div>
            </div>          
          </div>
        </footer>

        {/* QR Code Modal */}
        <AnimatePresence>
          {selectedQRCode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/80 p-4"
              onClick={() => setSelectedQRCode(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-black/90 p-6 rounded-2xl shadow-2xl max-w-lg w-full"
              >
                <button
                  onClick={() => setSelectedQRCode(null)}
                  className="absolute top-4 right-4 text-white hover:text-fuchsia-400 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex flex-col items-center">
                  <OptimizedImage
                    src={selectedQRCode}
                    alt="QR код увеличенный"
                    width={400}
                    height={400}
                    className="rounded-lg w-full max-w-md"
                  />
                  <p className="mt-4 text-white/80 text-sm">
                    Наведите камеру на QR-код для сканирования
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </ErrorBoundary>
  )
}
