'use client'

import Image from 'next/image'

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
  return (
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
      blurDataURL={fallbackBlurDataURL}
      unoptimized
    />
  )
}
