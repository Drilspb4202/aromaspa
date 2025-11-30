'use client'

import Image from 'next/image'
import { useState, useMemo, useEffect } from 'react'
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
  // Мемоизируем проксированный URL
  const proxiedSrc = useMemo(() => {
    return processImageUrl(src, useProxy)
  }, [src, useProxy])

  const [imageSrc, setImageSrc] = useState(proxiedSrc)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Обновляем imageSrc при изменении proxiedSrc
  useEffect(() => {
    if (proxiedSrc !== imageSrc && !hasError) {
      setImageSrc(proxiedSrc)
      setIsLoading(true)
      setHasError(false)
    }
  }, [proxiedSrc, imageSrc, hasError])

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setIsLoading(false)
      // Пробуем использовать оригинальный URL как fallback
      const fallbackUrl = handleImageError(src)
      setImageSrc(fallbackUrl)
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <span className="relative inline-block">
      {isLoading && (
        <span className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 animate-pulse flex items-center justify-center z-10 rounded-lg pointer-events-none">
          <span className="w-8 h-8 border-4 border-fuchsia-400 border-t-transparent rounded-full animate-spin" />
        </span>
      )}
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
        onLoad={handleLoad}
        style={onClick ? { cursor: 'pointer' } : undefined}
        itemProp={itemProp}
      />
    </span>
  )
}
