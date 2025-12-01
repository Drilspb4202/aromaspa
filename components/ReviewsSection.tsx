'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react'
import StructuredData from './StructuredData'

const reviews = [
  {
    id: 1,
    name: "Анна М.",
    text: "Потрясающий опыт! АромаДиагностика помогла мне лучше понять себя и свои потребности. Теперь я использую эфирные масла каждый день и чувствую себя намного лучше.",
    rating: 5,
    datePublished: "2024-11-15"
  },
  {
    id: 2,
    name: "Сергей К.",
    text: "АромаЙога - это нечто особенное. Сочетание йоги и ароматерапии создает невероятную атмосферу спокойствия и гармонии. Рекомендую всем!",
    rating: 5,
    datePublished: "2024-11-20"
  },
  {
    id: 3,
    name: "Елена В.",
    text: "Я скептически относилась к эфирным маслам, но после АромаДегустации полностью изменила свое мнение. Теперь это неотъемлемая часть моей жизни.",
    rating: 4,
    datePublished: "2024-12-01"
  }
]

export default function ReviewsSection() {
  return (
    <section id="отзывы" className="py-10 sm:py-14 relative z-10">
      <div className="container mx-auto px-4 relative">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#120118]/95 via-[#1D0223]/85 to-[#07000E]/95 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_25px_90px_rgba(30,4,52,0.55)]">
          <div className="pointer-events-none absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_15%_10%,rgba(249,115,255,0.2),transparent_45%),radial-gradient(circle_at_85%_0%,rgba(120,75,200,0.25),transparent_40%)]" />
          <div className="relative">
            {/* JSON-LD микроразметка для отзывов */}
            <StructuredData
              type="reviews"
              data={reviews}
              businessName="AROMA SPA СТУДИЯ"
              businessUrl="https://www.radmilaessentialoil.ru"
              businessImage="https://www.radmilaessentialoil.ru/logo.jpg"
            />
            
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-10 text-center font-playfair tracking-[0.2em] uppercase"
            >
              Отзывы
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  itemScope
                  itemType="https://schema.org/Review"
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-md overflow-hidden transition-all duration-300 hover:bg-white/10 h-full">
                    <CardContent className="p-5 flex flex-col justify-between h-full gap-4">
                      <div>
                        <p className="text-white/90 mb-4 font-montserrat" itemProp="reviewBody">{review.text}</p>
                        <motion.div 
                          className="flex items-center mb-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5, staggerChildren: 0.1 }}
                          itemScope
                          itemType="https://schema.org/Rating"
                        >
                          <meta itemProp="ratingValue" content={review.rating.toString()} />
                          <meta itemProp="bestRating" content="5" />
                          <meta itemProp="worstRating" content="1" />
                          {[...Array(review.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            >
                              <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                      <p className="text-fuchsia-300 font-bold font-playfair" itemProp="author" itemScope itemType="https://schema.org/Person">
                        <span itemProp="name">{review.name}</span>
                      </p>
                      {review.datePublished && (
                        <meta itemProp="datePublished" content={review.datePublished} />
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
