/**
 * Утилиты для проксирования изображений через сервер
 */

const PROXY_BASE_URL = '/api/image-proxy'

/**
 * Проверяет, является ли URL изображением imgbb
 */
export function isImgbbUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname === 'i.ibb.co' || 
           urlObj.hostname === 'ibb.co' ||
           urlObj.hostname.includes('imgbb.com')
  } catch {
    return false
  }
}

/**
 * Проверяет, является ли URL внешним (не локальным)
 */
export function isExternalUrl(url: string): boolean {
  if (!url) return false
  
  // Если это data URL или относительный путь, это не внешний URL
  if (url.startsWith('data:') || url.startsWith('/') || url.startsWith('./')) {
    return false
  }

  try {
    const urlObj = new URL(url)
    // Проверяем, что это не localhost или внутренний адрес
    return !['localhost', '127.0.0.1', '0.0.0.0'].includes(urlObj.hostname) &&
           !urlObj.hostname.startsWith('192.168.') &&
           !urlObj.hostname.startsWith('10.') &&
           !urlObj.hostname.startsWith('172.')
  } catch {
    return false
  }
}

/**
 * Проверяет, нужно ли проксировать URL
 */
export function shouldProxyUrl(url: string): boolean {
  if (!url) return false
  return isExternalUrl(url) && (isImgbbUrl(url) || isExternalImageUrl(url))
}

/**
 * Проверяет, является ли URL внешним изображением
 */
function isExternalImageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    // Разрешенные домены для проксирования
    const allowedDomains = [
      'i.ibb.co',
      'ibb.co',
      'imgbb.com',
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
    ]
    return allowedDomains.some(domain => 
      urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
    )
  } catch {
    return false
  }
}

/**
 * Создает проксированный URL для изображения
 * 
 * @param originalUrl - Оригинальный URL изображения
 * @returns Проксированный URL или оригинальный, если проксирование не требуется
 */
export function getProxiedImageUrl(originalUrl: string): string {
  if (!originalUrl) return originalUrl

  // Если это не внешний URL, возвращаем как есть
  if (!shouldProxyUrl(originalUrl)) {
    return originalUrl
  }

  try {
    // Кодируем URL для передачи в query параметре
    const encodedUrl = encodeURIComponent(originalUrl)
    return `${PROXY_BASE_URL}?url=${encodedUrl}`
  } catch (error) {
    console.error('Ошибка создания проксированного URL:', error)
    // В случае ошибки возвращаем оригинальный URL
    return originalUrl
  }
}

/**
 * Получает fallback URL для изображения
 * Возвращает SVG placeholder, если оригинальный URL недоступен
 */
export function getImageFallbackUrl(originalUrl?: string): string {
  // SVG placeholder с градиентом (base64 encoded)
  // Используем готовую base64 строку для совместимости с клиентом и сервером
  const svgPlaceholder = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNhODU1Zjc7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2VjNDg5OTtzdG9wLW9wYWNpdHk6MSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+0JjQt9C+0LHRgNCw0LbQtdC90LjQtTwvdGV4dD4KPC9zdmc+`

  return originalUrl || svgPlaceholder
}

