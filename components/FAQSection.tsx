'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"

const faqItems = [
  {
    question: "Что такое ароматерапия?",
    answer: (
      <div className="space-y-4">
        <p className="text-white">Ароматерапия — это метод улучшения физического и эмоционального состояния с использованием натуральных эфирных масел терапевтического качества. Эти масла используются для вдыхания, массажа, нанесения на кожу, добавления в соль для ванн, а также для внутреннего применения. Рассмотрим три основных способа применения эфирных масел:</p>

        <div className="pl-4 border-l-2 border-fuchsia-500">
          <h3 className="text-lg font-semibold text-fuchsia-400 mb-2">1. Ароматический способ</h3>
          <p>Этот метод включает использование эфирных масел для очищения воздуха, поддержки дыхательной системы, управления эмоциями и настроением, а также для создания благоприятной атмосферы в доме. Эфирные масла можно вдыхать напрямую или использовать специальные диффузоры.</p>
        </div>

        <div className="pl-4 border-l-2 border-fuchsia-500">
          <h3 className="text-lg font-semibold text-fuchsia-400 mb-2">2. Наружное применение</h3>
          <p>Эфирные масла можно наносить на кожу, стопы или позвоночник, разбавляя их базовыми маслами, чтобы избежать раздражения. Также их используют в качестве натуральных духов. Нанесение масел на кожу позволяет воздействовать на организм через кровеносную систему, усиливая терапевтический эффект.</p>
        </div>

        <div className="pl-4 border-l-2 border-fuchsia-500">
          <h3 className="text-lg font-semibold text-fuchsia-400 mb-2">3. Внутреннее применение и добавки (БАДы)</h3>
          <p>Некоторые эфирные масла терапевтического качества можно применять внутрь. Они используются как биологически активные добавки (БАДы) для поддержания здоровья, укрепления иммунитета и улучшения пищеварения. Однако важно следить за качеством масел и строго соблюдать рекомендации по дозировке.</p>
        </div>

        <p className="italic text-fuchsia-400">Эфирные масла открывают широкий спектр возможностей для поддержания здоровья и улучшения качества жизни. Важно помнить, что для получения максимального эффекта следует выбирать только качественные масла и использовать их согласно рекомендациям.</p>
      </div>
    )
  },
  {
    question: "Как выбрать подходящее эфирное масло?",
    answer: (
      <div className="space-y-4">
        <p className="text-white">
          Выбор эфирного масла — это персональное путешествие к улучшению Вашего самочувствия и настроения. Независимо от того, с чем Вы сталкиваетесь: стресс, боль, перепады настроения, желание привлечь внимание противоположного пола, укрепить иммунитет или зарядиться энергией, — каждое масло обладает уникальными свойствами, способными принести гармонию и баланс.
        </p>
        <p>
          Чтобы сделать этот процесс максимально простым и эффективным, я рекомендую начать с <a href="#выбор-масел" className="text-fuchsia-400 hover:underline">АромаДиагностики</a>. Мой уникальный подход позволит точно определить идеальное сочетание масел, которое подойдёт именно Вам. Мы вместе выявим Ваши потребности и создадим ресурсные духи, которые станут Вашим помощником в жизни.
        </p>
        <p className="italic text-fuchsia-400 font-semibold">
          Позвольте себе открыть мир ароматов, которые преобразят Вашу реальность!
        </p>
      </div>
    )
  },
  {
    question: "Безопасно ли использовать эфирные масла?",
    answer: (
      <div className="space-y-4">
        <p>
          Эфирные масла могут быть безопасны и полезны, если использовать их правильно. Важно всегда соблюдать инструкции по применению и использовать только эфирные масла высокого терапевтического качества.
        </p>
        <p className="text-fuchsia-400 italic">
          Учитывайте, что у каждого человека может быть индивидуальная чувствительность к определенным эфирным маслам. Перед использованием обязательно проведите тест: нанесите разбавленное эфирное масло на небольшой участок кожи, используя качественное базовое растительное масло. Это поможет избежать нежелательных реакций.
        </p>
      </div>
    )
  },
  {
    question: "Как часто можно проводить АромаДиагностику?",
    answer: (
      <div className="space-y-4">
        <p>
          Аромадиагностика – это Ваш личный инструмент гармонии, который я рекомендую применять раз в 1–3 месяца или при любых значительных переменах в жизни. Правильно подобранные эфирные масла способны не только улучшить Ваше настроение, но и поддержать организм в период стресса и изменений.
        </p>
        <p className="text-fuchsia-400 italic">
          Регулярное проведение АромаДиагностики позволит идеально адаптировать использование эфирных масел под Ваши нужды, способствуя улучшению общего баланса и состояния.
        </p>
      </div>
    )
  },
  {
    question: "Можно ли сочетать ароматерапию с другими методами оздоровления?",
    answer: (
      <div className="space-y-4">
        <p>
          Ароматерапия является прекрасным дополнением к различным методам оздоровления, включая массаж, йогу, медитацию и традиционную медицину. Однако перед использованием эфирных масел или других ароматерапевтических средств необходимо проконсультироваться с врачом, особенно если у Вас есть хронические заболевания, аллергии или Вы принимаете лекарства.
        </p>
        <p className="text-fuchsia-400 italic">
          Правильное и безопасное использование ароматерапии может существенно укрепить здоровье и повысить качество жизни.
        </p>
      </div>
    )
  },
  {
    question: "Как купить эфирные масла?",
    answer: (
      <div className="space-y-4">
        <p>
          Вы можете приобрести высококачественные эфирные масла непосредственно у нас. Мы предлагаем широкий ассортимент масел терапевтического класса, а также продуктов на их основе, которые подходят для различных целей и потребностей.
        </p>
        <p>
          Для покупки масел Вы можете:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Посетить по предварительной записи AROMA SPA Студию в г. Санкт-Петербург, где я помогу Вам с выбором</li>
          <li>
            Заказать эфирные масла через наш онлайн-магазин{' '}
            <Button
              onClick={() => window.open('https://beta-doterra.myvoffice.com/Application/index.cfm?EnrollerID=14409682&Country=RUS', '_blank', 'noopener,noreferrer')}
              className="ml-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
              size="sm"
            >
              dōTERRA
            </Button>
          </li>
          <li>Связаться с нами по телефону, telegram, whatsapp для индивидуальной консультации и заказа</li>
        </ul>
        <p className="text-fuchsia-400 italic">
          Мы также предлагаем специальные наборы масел с открытием личного кабинета с постоянной скидкой 25% на всю продукцию, подобранную для конкретных целей, таких как релаксация, повышение энергии, улучшение сна, укрепления иммунитета, улучшения пищеварения. Не забудьте проконсультироваться с нами для получения персональных рекомендаций по использованию масел.
        </p>
      </div>
    )
  }
]

export default function FAQSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredFAQ = useMemo(() => {
    if (!searchTerm) return faqItems;
    
    const searchLower = searchTerm.toLowerCase();
    return faqItems.filter(item => {
      const questionMatch = item.question.toLowerCase().includes(searchLower);
      let answerMatch = false;
      if (typeof item.answer === 'string') {
        const answerStr = item.answer as string;
        answerMatch = answerStr.toLowerCase().includes(searchLower);
      }
      return questionMatch || answerMatch;
    });
  }, [searchTerm])

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-10 sm:py-14 relative z-10">
      <div className="container mx-auto px-4 relative">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#24002C]/90 via-[#19001F]/85 to-[#08000F]/90 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_25px_90px_rgba(22,3,32,0.55)]">
          <div className="pointer-events-none absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(147,51,234,0.25),transparent_40%)]" />
          <div className="relative max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-10 text-center font-playfair tracking-[0.25em] uppercase"
            >
              FAQ
            </motion.h2>
            <motion.div 
              className="relative mb-8"
              animate={{ scale: isSearchFocused ? 1.02 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Input
                type="text"
                placeholder="Поиск по вопросам..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50 transition-all duration-300"
                aria-label="Поиск по вопросам"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" aria-hidden="true" />
            </motion.div>
            <ul className="space-y-4">
              {filteredFAQ.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full text-left p-4 flex justify-between items-center text-white hover:text-fuchsia-300 transition-colors"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="font-semibold font-playfair">{item.question}</span>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-5 h-5" aria-hidden="true" />
                    )}
                  </button>
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: openIndex === index ? 'auto' : 0,
                      opacity: openIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 text-white/80">{item.answer}</div>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
