'use client'

import React, { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import ServicesSection from './ServicesSection'
import BenefitsSection from './BenefitsSection'
import GallerySection from './GallerySection'
import ReviewsSection from './ReviewsSection'
import FAQSection from './FAQSection'
import ContactSection from './ContactSection'
import PromotionsSection from './PromotionsSection'
import { Oil } from '@/data/oils'

// Dynamically import components that might cause hydration issues
const OilSelector = dynamic(() => import('./OilSelector'), { ssr: false })
const OilShop = dynamic(() => import('./OilShop'), { ssr: false })

interface OilShopProps {
  onClose: () => void;
  cart: { id: string; name: string; price: number; quantity: number }[];
  setCart: React.Dispatch<React.SetStateAction<{ id: string; name: string; price: number; quantity: number }[]>>;
  setIsShopOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MainContent() {
  const [isShopOpen, setIsShopOpen] = useState(false)
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([])

  const addToCart = useCallback((oil: Oil) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === oil.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === oil.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...oil, quantity: 1 }]
    })
  }, [])

  return (
    <main className="min-h-screen bg-black text-white relative">
      <ServicesSection setIsShopOpen={setIsShopOpen} />
      <OilSelector addToCart={addToCart} />
      <BenefitsSection />
      <GallerySection />
      <ReviewsSection />
      <FAQSection />
      <ContactSection />
      <PromotionsSection />

      {isShopOpen && (
        <OilShop
          onClose={() => setIsShopOpen(false)}
          cart={cart}
          setCart={setCart}
          setIsShopOpen={setIsShopOpen}
        />
      )}
    </main>
  )
}

