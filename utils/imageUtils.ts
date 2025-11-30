/**
 * Утилиты для работы с изображениями
 */

import { getProxiedImageUrl, getImageFallbackUrl, shouldProxyUrl } from './imageProxy'

/**
 * Обрабатывает URL изображения: проксирует внешние URL и возвращает готовый к использованию URL
 * 
 * @param url - Оригинальный URL изображения
 * @param useProxy - Использовать ли проксирование (по умолчанию true)
 * @returns Обработанный URL изображения
 */
export function processImageUrl(url: string, useProxy: boolean = true): string {
  if (!url) {
    return getImageFallbackUrl()
  }

  // Если проксирование отключено, возвращаем оригинальный URL
  if (!useProxy) {
    return url
  }

  // Если нужно проксировать, создаем проксированный URL
  if (shouldProxyUrl(url)) {
    return getProxiedImageUrl(url)
  }

  // Иначе возвращаем оригинальный URL
  return url
}

/**
 * Создает blur placeholder для изображения
 */
export function getBlurPlaceholder(): string {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=='
}

/**
 * Обрабатывает ошибку загрузки изображения
 * Возвращает fallback URL
 */
export function handleImageError(originalUrl?: string): string {
  console.warn('Ошибка загрузки изображения, используется fallback:', originalUrl)
  return getImageFallbackUrl(originalUrl)
}

/**
 * Проверяет, является ли URL валидным изображением
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false

  // Проверяем data URL
  if (url.startsWith('data:image/')) {
    return true
  }

  // Проверяем обычный URL
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname.toLowerCase()
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico']
    return imageExtensions.some(ext => pathname.endsWith(ext)) || 
           urlObj.hostname.includes('ibb.co') ||
           urlObj.hostname.includes('imgbb.com')
  } catch {
    return false
  }
}

/**
 * Получает размеры изображения из URL (если указаны в параметрах)
 */
export function getImageDimensionsFromUrl(url: string): { width?: number; height?: number } {
  try {
    const urlObj = new URL(url)
    const width = urlObj.searchParams.get('w') || urlObj.searchParams.get('width')
    const height = urlObj.searchParams.get('h') || urlObj.searchParams.get('height')
    
    return {
      width: width ? parseInt(width, 10) : undefined,
      height: height ? parseInt(height, 10) : undefined,
    }
  } catch {
    return {}
  }
}

/**
 * Оптимизирует URL изображения для Next.js Image компонента
 */
export function optimizeImageUrlForNext(url: string): string {
  // Если это уже проксированный URL, возвращаем как есть
  if (url.includes('/api/image-proxy')) {
    return url
  }

  // Обрабатываем URL через прокси, если нужно
  return processImageUrl(url)
}

/**
 * Получает безопасный URL для использования в CSS свойстве backgroundImage
 * Проксирует внешние URL и возвращает строку в формате url("...")
 * 
 * @param url - Оригинальный URL изображения
 * @returns Строка в формате url("...") для использования в backgroundImage
 */
export function getSafeBackgroundImage(url: string): string {
  if (!url) {
    return `url("${getImageFallbackUrl()}")`
  }

  // Обрабатываем URL через прокси, если нужно
  const processedUrl = processImageUrl(url)
  return `url("${processedUrl}")`
}

