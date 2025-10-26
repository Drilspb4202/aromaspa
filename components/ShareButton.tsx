'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Share2 } from 'lucide-react'
import ShareModal from './ShareModal'
import { motion, AnimatePresence } from 'framer-motion'

interface ShareButtonProps {
  url?: string
  className?: string
}

export default function ShareButton({ url, className }: ShareButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-32 right-4 z-50 md:bottom-20" 
          >
            <Button
              onClick={() => setIsModalOpen(true)}
              className={`w-12 h-12 rounded-full bg-white hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
              size="icon"
              variant="ghost"
            >
              <Share2 className="w-5 h-5 text-gray-700" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        url={shareUrl}
      />
    </>
  )
}
