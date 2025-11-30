import { NextRequest, NextResponse } from 'next/server'

/**
 * API Route для проксирования изображений через сервер
 * 
 * Использование: /api/image-proxy?url=<encoded-image-url>
 * 
 * Преимущества:
 * - Безопасная загрузка внешних изображений
 * - Кэширование на 1 год
 * - Обработка ошибок с fallback
 * - Поддержка CORS
 */

const ALLOWED_DOMAINS = [
  'i.ibb.co',
  'ibb.co',
  'imgbb.com',
  'hebbkx1anhila5yf.public.blob.vercel-storage.com',
]

const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 10MB

function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

function isAllowedDomain(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return ALLOWED_DOMAINS.some(domain => 
      urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
    )
  } catch {
    return false
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const imageUrl = searchParams.get('url')

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'URL параметр обязателен' },
        { status: 400 }
      )
    }

    // Декодируем URL
    const decodedUrl = decodeURIComponent(imageUrl)

    // Проверяем валидность URL
    if (!isValidUrl(decodedUrl)) {
      return NextResponse.json(
        { error: 'Некорректный URL' },
        { status: 400 }
      )
    }

    // Проверяем разрешенные домены
    if (!isAllowedDomain(decodedUrl)) {
      return NextResponse.json(
        { error: 'Домен не разрешен для проксирования' },
        { status: 403 }
      )
    }

    // Загружаем изображение
    const response = await fetch(decodedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ImageProxy/1.0)',
        'Accept': 'image/*',
      },
      // Таймаут 30 секунд
      signal: AbortSignal.timeout(30000),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Ошибка загрузки изображения: ${response.statusText}` },
        { status: response.status }
      )
    }

    // Проверяем размер контента
    const contentLength = response.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: 'Изображение слишком большое' },
        { status: 413 }
      )
    }

    // Проверяем тип контента
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.startsWith('image/')) {
      return NextResponse.json(
        { error: 'URL не указывает на изображение' },
        { status: 400 }
      )
    }

    // Получаем данные изображения
    const imageBuffer = await response.arrayBuffer()

    // Проверяем размер после загрузки
    if (imageBuffer.byteLength > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: 'Изображение слишком большое' },
        { status: 413 }
      )
    }

    // Возвращаем изображение с кэшированием на 1 год
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable', // 1 год
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
    })
  } catch (error) {
    console.error('Ошибка проксирования изображения:', error)
    
    // Если это ошибка таймаута или сети, возвращаем 504
    if (error instanceof Error && (error.name === 'AbortError' || error.message.includes('timeout'))) {
      return NextResponse.json(
        { error: 'Таймаут при загрузке изображения' },
        { status: 504 }
      )
    }

    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}

// Поддержка OPTIONS для CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

