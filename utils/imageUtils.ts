import { getProxiedImageUrl } from './imageProxy'

/**
 * Утилита для безопасной установки backgroundImage с обработкой ошибок
 */
export function getSafeBackgroundImage(url: string): string {
  if (!url) return ''
  
  // Проксируем imgbb URL
  const proxiedUrl = getProxiedImageUrl(url)
  
  try {
    // Проверяем, что URL валидный
    new URL(proxiedUrl.startsWith('/') ? `https://www.radmilaessentialoil.ru${proxiedUrl}` : proxiedUrl)
    return `url("${proxiedUrl}")`
  } catch {
    // В случае ошибки возвращаем пустую строку
    return ''
  }
}

/**
 * Создает стиль с безопасным backgroundImage и fallback цветом
 */
export function getSafeBackgroundStyle(
  imageUrl: string,
  fallbackColor: string = 'rgba(139, 92, 246, 0.1)' // Фиолетовый с прозрачностью
): Record<string, string> {
  return {
    backgroundImage: getSafeBackgroundImage(imageUrl),
    backgroundColor: fallbackColor,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }
}

