'use client'

import Image from 'next/image'
import { useState, useMemo } from 'react'
import { processImageUrl, handleImageError, getBlurPlaceholder } from '@/utils/imageUtils'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  loading?: "lazy" | "eager"
  sizes?: string
  onClick?: () => void
  useProxy?: boolean
  itemProp?: string
}

const fallbackBlurDataURL = getBlurPlaceholder()

export default function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  priority = false, 
  loading, 
  sizes, 
  onClick,
  useProxy = true,
  itemProp
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(() => processImageUrl(src, useProxy))
  const [hasError, setHasError] = useState(false)

  // Мемоизируем проксированный URL
  const proxiedSrc = useMemo(() => {
    if (hasError) {
      return handleImageError(src)
    }
    return processImageUrl(src, useProxy)
  }, [src, useProxy, hasError])

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      // Пробуем использовать оригинальный URL как fallback
      const fallbackUrl = handleImageError(src)
      setImageSrc(fallbackUrl)
    }
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      loading={loading || (priority ? "eager" : "lazy")}
      sizes={sizes || `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`}
      quality={90}
      placeholder="blur"
      blurDataURL={fallbackBlurDataURL}
      unoptimized
      onClick={onClick}
      onError={handleError}
      style={onClick ? { cursor: 'pointer' } : undefined}
      itemProp={itemProp}
    />
  )
}
