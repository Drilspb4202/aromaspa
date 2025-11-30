import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import OptimizedImage from './OptimizedImage'
import { useRouter } from 'next/navigation'

const galleryContent = [
  {
    type: "image",
    url: "https://i.ibb.co/J2538Kc/photo-2022-11-01-10-42-24.jpg",
    alt: "Ароматерапевтические масла"
  },
  {
    type: "image",
    url: "https://i.ibb.co/68SrzsV/photo-2023-04-23-08-59-31.jpg",
    alt: "Сеанс ароматерапии"
  },
  {
    type: "image",
    url: "https://i.ibb.co/2N2YCkh/photo-2023-08-13-09-04-23.jpg",
    alt: "Йога с ароматерапией"
  },
  {
    type: "image",
    url: "https://i.ibb.co/qpbRKTx/photo-2023-12-08-11-20-56.jpg",
    alt: "Ароматические свечи"
  },
  {
    type: "image",
    url: "https://i.ibb.co/wWcJtgr/photo-2023-12-08-11-21-08.jpg",
    alt: "Массаж с ароматическими маслами"
  },
  {
    type: "image",
    url: "https://i.ibb.co/1KCwRqn/photo-2024-06-02-03-40-51.jpg",
    alt: "Аромадиагностика"
  },
  {
    type: "image",
    url: "https://i.ibb.co/GJVvXRM/photo-2024-11-23-06-13-53.jpg",
    alt: "photo-2024-11-23-06-13-53"
  },
  {
    type: "image",
    url: "https://i.ibb.co/4pS7j2j/photo-2024-11-19-10-03-29.jpg",
    alt: "photo-2024-11-19-10-03-29"
  },
  {
    type: "image",
    url: "https://i.ibb.co/0V5vH77/photo-2024-09-08-06-54-44.jpg",
    alt: "photo-2024-09-08-06-54-44"
  },
  {
    type: "image",
    url: "https://i.ibb.co/T8ML6V7/photo-2024-08-21-01-28-39.jpg",
    alt: "photo-2024-08-21-01-28-39"
  },
  {
    type: "image",
    url: "https://i.ibb.co/YRQYFQy/photo-2024-08-21-01-28-18.jpg",
    alt: "photo-2024-08-21-01-28-18"
  },
  {
    type: "image",
    url: "https://i.ibb.co/q0DVJV1/photo-2024-08-21-01-25-54.jpg",
    alt: "photo-2024-08-21-01-25-54"
  },
  {
    type: "image",
    url: "https://i.ibb.co/SrCWq6t/photo-2024-08-01-23-10-09.jpg",
    alt: "photo-2024-08-01-23-10-09"
  },
  {
    type: "image",
    url: "https://i.ibb.co/9c8gtRm/photo-2024-11-28-08-35-18.jpg",
    alt: "photo-2024-11-28-08-35-18"
  },
  {
    type: "image",
    url: "https://i.ibb.co/zfq15P2/photo-2024-11-28-08-35-20.jpg",
    alt: "photo-2024-11-28-08-35-20"
  },
  {
    type: "image",
    url: "https://i.ibb.co/ypjxddc/photo-2024-11-28-08-35-21.jpg",
    alt: "photo-2024-11-28-08-35-21"
  },
  {
    type: "image",
    url: "https://i.ibb.co/MsB5YQf/photo-2024-11-28-08-35-20-2.jpg",
    alt: "photo-2024-11-28-08-35-20-2"
  },
  {
    type: "image",
    url: "https://i.ibb.co/cXN1Zm1/photo-2024-11-28-08-35-22.jpg",
    alt: "photo-2024-11-28-08-35-22"
  },
  {
    type: "image",
    url: "https://i.ibb.co/n8R9Rs3/photo-2024-11-28-08-35-23.jpg",
    alt: "photo-2024-11-28-08-35-23"
  },
  {
    type: "image",
    url: "https://i.ibb.co/0KKVxFJ/photo-2024-11-28-08-35-24.jpg",
    alt: "photo-2024-11-28-08-35-24"
  },
  {
    type: "image",
    url: "https://i.ibb.co/8bYXLDG/photo-2024-11-28-08-35-29.jpg",
    alt: "photo-2024-11-28-08-35-29"
  }
]

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const router = useRouter()

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryContent.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryContent.length) % galleryContent.length)
  }, [])

  const openModal = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) {
        if (e.key === 'ArrowLeft') {
          prevSlide()
        } else if (e.key === 'ArrowRight') {
          nextSlide()
        } else if (e.key === 'Escape') {
          closeModal()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, nextSlide, prevSlide, closeModal])

  return (
    <section id="галерея" className="py-12 relative z-10">
      <div className="container mx-auto px-4 relative">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
        >
          ГАЛЕРЕЯ
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryContent.slice(0, 6).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openModal(index)}
            >
              <OptimizedImage
                src={item.url}
                alt={item.alt}
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                loading={index < 3 ? "eager" : "lazy"}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center cursor-pointer"
            onClick={closeModal}
          >
            <motion.div
              className="relative w-full max-w-3xl mx-auto px-4 py-8"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-auto max-h-[80vh]"
              >
                <OptimizedImage
                  src={galleryContent[currentIndex].url}
                  alt={galleryContent[currentIndex].alt}
                  width={1200}
                  height={1200}
                  className="w-full h-full max-h-[70vh] object-contain rounded-lg"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                  priority
                  useProxy={true}
                />
                <Button
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    closeModal()
                  }}
                >
                  <X className="h-6 w-6" />
                </Button>
                <Button
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3"
                  onClick={(e) => {
                    e.stopPropagation()
                    prevSlide()
                  }}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3"
                  onClick={(e) => {
                    e.stopPropagation()
                    nextSlide()
                  }}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </motion.div>
              <div className="absolute bottom-4 left-0 right-0 text-center text-white/80">
                {currentIndex + 1} / {galleryContent.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
