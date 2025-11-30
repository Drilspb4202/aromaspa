# Решение для проксирования изображений

## Обзор

Реализована система проксирования изображений через сервер для безопасной и оптимизированной загрузки внешних изображений (особенно с imgbb.com).

## Компоненты решения

### 1. API Route: `/api/image-proxy`

**Файл:** `app/api/image-proxy/route.ts`

**Функциональность:**
- Проксирует изображения через сервер Next.js
- Проверяет валидность URL и разрешенные домены
- Ограничивает размер изображений (максимум 10MB)
- Устанавливает кэширование на 1 год
- Обрабатывает ошибки с корректными HTTP статусами
- Поддерживает CORS для кросс-доменных запросов

**Использование:**
```
GET /api/image-proxy?url=<encoded-image-url>
```

**Пример:**
```
/api/image-proxy?url=https%3A%2F%2Fi.ibb.co%2Fexample.jpg
```

**Безопасность:**
- Проверка разрешенных доменов (whitelist)
- Валидация типа контента (только изображения)
- Ограничение размера файла
- Таймаут запросов (30 секунд)
- Защита от XSS через заголовки безопасности

### 2. Утилиты для работы с изображениями

#### `utils/imageProxy.ts`

**Функции:**
- `isImgbbUrl(url: string)` - проверяет, является ли URL изображением imgbb
- `isExternalUrl(url: string)` - проверяет, является ли URL внешним
- `shouldProxyUrl(url: string)` - определяет, нужно ли проксировать URL
- `getProxiedImageUrl(originalUrl: string)` - создает проксированный URL
- `getImageFallbackUrl(originalUrl?: string)` - возвращает fallback URL (SVG placeholder)

#### `utils/imageUtils.ts`

**Функции:**
- `processImageUrl(url: string, useProxy: boolean)` - обрабатывает URL изображения
- `getBlurPlaceholder()` - создает blur placeholder для Next.js Image
- `handleImageError(originalUrl?: string)` - обрабатывает ошибки загрузки
- `isValidImageUrl(url: string)` - проверяет валидность URL изображения
- `optimizeImageUrlForNext(url: string)` - оптимизирует URL для Next.js Image

### 3. Компонент OptimizedImage

**Файл:** `components/OptimizedImage.tsx`

**Улучшения:**
- Автоматическое проксирование внешних URL (особенно imgbb)
- Обработка ошибок с fallback на оригинальный URL и SVG placeholder
- Поддержка опции `useProxy` для отключения проксирования при необходимости
- Мемоизация проксированных URL для оптимизации производительности

**Использование:**
```tsx
<OptimizedImage
  src="https://i.ibb.co/example.jpg"
  alt="Example"
  width={400}
  height={400}
  useProxy={true} // по умолчанию true
/>
```

### 4. Обновленные компоненты

Следующие компоненты обновлены для использования проксирования:

- ✅ `components/OptimizedImage.tsx` - автоматическое проксирование
- ✅ `components/gallery-carousel.tsx` - проксирование в карусели
- ✅ `components/ShopPage.tsx` - проксирование backgroundImage
- ✅ `components/PromotionsSection.tsx` - проксирование backgroundImage
- ✅ `components/LazyImage.tsx` - использует OptimizedImage (автоматически)
- ✅ `components/ImageModal.tsx` - использует OptimizedImage (автоматически)
- ✅ `components/OilCard.tsx` - использует OptimizedImage (автоматически)
- ✅ `components/ServicesSection.tsx` - использует OptimizedImage (автоматически)

## Преимущества

### 1. Безопасность
- ✅ Защита от нежелательных доменов через whitelist
- ✅ Валидация типа контента
- ✅ Ограничение размера файлов
- ✅ Защита от XSS через заголовки безопасности

### 2. Производительность
- ✅ Кэширование на 1 год (max-age=31536000)
- ✅ Оптимизация загрузки через сервер
- ✅ Мемоизация проксированных URL
- ✅ Fallback на оригинальный URL при ошибках

### 3. Надежность
- ✅ Обработка ошибок с fallback
- ✅ Таймауты для предотвращения зависаний
- ✅ SVG placeholder при недоступности изображения
- ✅ Поддержка CORS

### 4. Удобство использования
- ✅ Автоматическое проксирование в OptimizedImage
- ✅ Прозрачная работа для разработчиков
- ✅ Поддержка как обычных URL, так и backgroundImage

## Разрешенные домены

По умолчанию разрешены следующие домены:
- `i.ibb.co` (imgbb)
- `ibb.co` (imgbb)
- `imgbb.com` (imgbb)
- `hebbkx1anhila5yf.public.blob.vercel-storage.com` (Vercel Blob Storage)

Для добавления новых доменов отредактируйте массив `ALLOWED_DOMAINS` в `app/api/image-proxy/route.ts`.

## Кэширование

Изображения кэшируются на **1 год** (31536000 секунд) с заголовком:
```
Cache-Control: public, max-age=31536000, immutable
```

Это означает, что браузер будет кэшировать изображения на длительный срок, что значительно улучшает производительность при повторных посещениях.

## Обработка ошибок

Система имеет многоуровневую обработку ошибок:

1. **Ошибка проксирования** → Fallback на оригинальный URL
2. **Ошибка загрузки оригинального URL** → SVG placeholder с градиентом
3. **Таймаут** → Возврат 504 статуса с информативным сообщением

## Примеры использования

### Использование в компонентах

```tsx
// Автоматическое проксирование через OptimizedImage
<OptimizedImage
  src="https://i.ibb.co/example.jpg"
  alt="Example"
  width={400}
  height={400}
/>

// Проксирование для backgroundImage
import { getProxiedImageUrl } from '@/utils/imageProxy'

<div style={{
  backgroundImage: `url("${getProxiedImageUrl('https://i.ibb.co/example.jpg')}")`
}} />

// Ручная обработка URL
import { processImageUrl } from '@/utils/imageUtils'

const imageUrl = processImageUrl('https://i.ibb.co/example.jpg', true)
```

### Отключение проксирования

```tsx
// Если нужно использовать оригинальный URL без проксирования
<OptimizedImage
  src="https://i.ibb.co/example.jpg"
  alt="Example"
  width={400}
  height={400}
  useProxy={false}
/>
```

## Технические детали

### Ограничения
- Максимальный размер изображения: **10MB**
- Таймаут запроса: **30 секунд**
- Поддерживаются только HTTPS/HTTP протоколы

### Заголовки безопасности
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Access-Control-Allow-Origin: *` (для CORS)

### Производительность
- Использование мемоизации для проксированных URL
- Кэширование на уровне браузера (1 год)
- Оптимизация через Next.js Image компонент

## Будущие улучшения

Возможные улучшения для будущих версий:
- [ ] Поддержка WebP конвертации
- [ ] Автоматическое изменение размера изображений
- [ ] Поддержка lazy loading для backgroundImage
- [ ] Метрики и мониторинг использования прокси
- [ ] Поддержка дополнительных форматов изображений

## Поддержка

При возникновении проблем:
1. Проверьте, что URL изображения валиден
2. Убедитесь, что домен в whitelist
3. Проверьте размер изображения (максимум 10MB)
4. Проверьте консоль браузера на наличие ошибок

## История изменений

- **2024-12-XX**: Первая реализация системы проксирования изображений
  - Создан API route `/api/image-proxy`
  - Добавлены утилиты `imageProxy.ts` и `imageUtils.ts`
  - Обновлен компонент `OptimizedImage`
  - Обновлены компоненты для использования проксирования
  - Настроено кэширование на 1 год
  - Добавлена обработка ошибок с fallback

