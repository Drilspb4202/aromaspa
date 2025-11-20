/**
 * Утилита для проксирования изображений через API route
 * Решает проблему блокировки imgbb в России без VPN
 */

const PROXY_BASE_URL = '/api/image-proxy'

/**
 * Проверяет, нужно ли проксировать URL
 */
export function shouldProxy(url: string): boolean {
  if (!url || typeof url !== 'string') return false
  
  try {
    const urlObj = new URL(url)
    // Проксируем только imgbb и другие проблемные домены
    return urlObj.hostname.includes('ibb.co') || 
           urlObj.hostname.includes('imgbb')
  } catch {
    // Если не валидный URL, не проксируем
    return false
  }
}

/**
 * Преобразует URL изображения в проксированный URL
 * Если URL не требует проксирования, возвращает оригинальный URL
 */
export function getProxiedImageUrl(url: string): string {
  if (!url) return url
  
  // Если это уже локальный URL или не требует проксирования
  if (url.startsWith('/') || url.startsWith('data:') || !shouldProxy(url)) {
    return url
  }

  // Создаем проксированный URL
  try {
    const encodedUrl = encodeURIComponent(url)
    return `${PROXY_BASE_URL}?url=${encodedUrl}`
  } catch {
    // В случае ошибки возвращаем оригинальный URL
    return url
  }
}

/**
 * Преобразует массив URL изображений
 */
export function getProxiedImageUrls(urls: string[]): string[] {
  return urls.map(url => getProxiedImageUrl(url))
}

/**
 * Преобразует объект с полем image в проксированный URL
 */
export function proxyImageInObject<T extends { image?: string }>(obj: T): T {
  if (obj.image) {
    return {
      ...obj,
      image: getProxiedImageUrl(obj.image),
    }
  }
  return obj
}

/**
 * Преобразует массив объектов с полем image
 */
export function proxyImagesInArray<T extends { image?: string }>(arr: T[]): T[] {
  return arr.map(item => proxyImageInObject(item))
}

