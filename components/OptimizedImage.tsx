'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  loading?: "lazy" | "eager"
}

const fallbackBlurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=='

export default function OptimizedImage({ src, alt, width, height, className, priority = false, loading }: OptimizedImageProps) {
  const [blurDataURL, setBlurDataURL] = useState(fallbackBlurDataURL)

  useEffect(() => {
    const generateBlurPlaceholder = async () => {
      try {
        const res = await fetch(`/api/blur-placeholder?url=${encodeURIComponent(src)}`)
        if (!res.ok) throw new Error('Failed to generate blur placeholder')
        const data = await res.json()
        setBlurDataURL(data.blurDataURL)
      } catch (error) {
        console.error('Error generating blur placeholder:', error)
        setBlurDataURL(fallbackBlurDataURL)
      }
    }
    if (!priority) {
      generateBlurPlaceholder()
    }
  }, [src, priority])

  return (
    <picture>
      <source type="image/webp" srcSet={`${src}?format=webp&w=${width}&q=90 1x, ${src}?format=webp&w=${width * 2}&q=90 2x`} />
      <source type="image/jpeg" srcSet={`${src}?w=${width}&q=90 1x, ${src}?w=${width * 2}&q=90 2x`} />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        loading={loading || (priority ? "eager" : "lazy")}
        sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`}
        quality={90}
        placeholder="blur"
        blurDataURL={blurDataURL}
      />
    </picture>
  )
}

