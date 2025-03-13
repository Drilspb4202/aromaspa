import React from 'react'
import { motion } from 'framer-motion'

interface SmoothGradientProps {
  color1: string
  color2: string
  className?: string
}

const SmoothGradient: React.FC<SmoothGradientProps> = ({ color1, color2, className = '' }) => {
  return (
    <motion.div
      className={`w-full h-64 rounded-lg ${className}`}
      style={{
        background: `linear-gradient(to right, ${color1}, ${color2})`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex justify-between p-4 text-white text-shadow">
        <span>{color1}</span>
        <span>{color2}</span>
      </div>
    </motion.div>
  )
}

export default SmoothGradient

