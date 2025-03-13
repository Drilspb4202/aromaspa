import { useState, useEffect, useRef } from 'react'
import OptimizedImage from './OptimizedImage'

interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function LazyImage({ src, alt, width, height, className }: LazyImageProps) {
  const [isIntersecting, setIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true)
          observer.unobserve(entry.target)
        }
      },
      {
        rootMargin: '200px',
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {isIntersecting ? (
        <OptimizedImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
        />
      ) : (
        <div style={{ width, height }} className="bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}

