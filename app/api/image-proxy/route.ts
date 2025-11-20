import { NextRequest, NextResponse } from 'next/server'

/**
 * API Route для проксирования изображений с imgbb и других внешних источников
 * Это решает проблему блокировки imgbb в России без VPN
 * Сервер Vercel имеет доступ к imgbb, поэтому может проксировать изображения
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const imageUrl = searchParams.get('url')

    if (!imageUrl) {
      return new NextResponse('URL параметр обязателен', { status: 400 })
    }

    // Проверяем, что URL безопасен (только imgbb и разрешенные домены)
    const allowedDomains = [
      'i.ibb.co',
      'ibb.co',
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
    ]

    let url: URL
    try {
      url = new URL(imageUrl)
    } catch {
      return new NextResponse('Некорректный URL', { status: 400 })
    }

    // Проверяем домен
    const isAllowed = allowedDomains.some(domain => 
      url.hostname === domain || url.hostname.endsWith(`.${domain}`)
    )

    if (!isAllowed) {
      return new NextResponse('Домен не разрешен', { status: 403 })
    }

    // Загружаем изображение с внешнего источника
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.radmilaessentialoil.ru',
      },
      // Таймаут 10 секунд
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      return new NextResponse('Ошибка загрузки изображения', { 
        status: response.status 
      })
    }

    // Получаем тип контента
    const contentType = response.headers.get('content-type') || 'image/jpeg'
    
    // Проверяем, что это изображение
    if (!contentType.startsWith('image/')) {
      return new NextResponse('Ресурс не является изображением', { status: 400 })
    }

    // Получаем данные изображения
    const imageBuffer = await response.arrayBuffer()

    // Возвращаем изображение с кэшированием
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable', // Кэш на 1 год
        'CDN-Cache-Control': 'public, max-age=31536000',
        'Vercel-CDN-Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (error) {
    console.error('Ошибка проксирования изображения:', error)
    
    // Если таймаут или ошибка сети
    if (error instanceof Error && error.name === 'AbortError') {
      return new NextResponse('Таймаут загрузки изображения', { status: 504 })
    }

    return new NextResponse('Внутренняя ошибка сервера', { status: 500 })
  }
}

