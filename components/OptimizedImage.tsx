'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getProxiedImageUrl } from '../utils/imageProxy'

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
  unoptimized?: boolean // Опционально, по умолчанию false (используется оптимизация)
}

// SVG placeholder для fallback
const placeholderSVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzlmNGJhZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+0JDRgNCw0LzQvtC70L7QstCw0YLRjDwvdGV4dD48L3N2Zz4='

const fallbackBlurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=='

export default function OptimizedImage({ src, alt, width, height, className, priority = false, loading, sizes, onClick, unoptimized = false }: OptimizedImageProps) {
  // Автоматически проксируем imgbb URL
  const proxiedSrc = getProxiedImageUrl(src)
  const [imgSrc, setImgSrc] = useState(proxiedSrc)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  // Обновляем src при изменении пропса
  useEffect(() => {
    const newProxiedSrc = getProxiedImageUrl(src)
    setImgSrc(newProxiedSrc)
    setHasError(false)
    setRetryCount(0)
  }, [src])

  const handleError = () => {
    // Если еще не пробовали оригинальный URL (без прокси), пробуем его
    if (retryCount === 0 && proxiedSrc !== src) {
      setRetryCount(1)
      setImgSrc(src)
      return
    }

    // Если уже пробовали оба варианта, используем placeholder
    if (!hasError) {
      setHasError(true)
      setImgSrc(placeholderSVG)
    }
  }

  return (
    <div className="relative" style={{ width, height }}>
      <Image
        src={imgSrc}
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
        unoptimized={unoptimized || hasError} // Отключаем оптимизацию для SVG placeholder
        onClick={onClick}
        style={onClick ? { cursor: 'pointer' } : undefined}
        onError={handleError}
        onLoad={() => {
          // Сбрасываем ошибку при успешной загрузке
          if (hasError) {
            setHasError(false)
          }
        }}
      />
    </div>
  )
}
