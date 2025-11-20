import React from 'react'

interface Review {
  id: number
  name: string
  text: string
  rating: number
  datePublished?: string
}

interface Service {
  id: number
  title: string
  description: string
  duration?: string
  price?: string
  image?: string
}

interface StructuredDataProps {
  type: 'reviews' | 'services'
  data: Review[] | Service[]
  businessName?: string
  businessUrl?: string
  businessImage?: string
  businessAddress?: {
    streetAddress: string
    addressLocality: string
    postalCode: string
    addressCountry: string
  }
}

/**
 * Компонент для генерации JSON-LD структурированных данных
 * Поддерживает микроразметку для отзывов и услуг согласно schema.org
 */
export default function StructuredData({
  type,
  data,
  businessName = 'AROMA SPA СТУДИЯ',
  businessUrl = 'https://www.radmilaessentialoil.ru',
  businessImage = 'https://www.radmilaessentialoil.ru/logo.jpg',
  businessAddress = {
    streetAddress: 'Советский пр., д. 12, кв/оф. 2',
    addressLocality: 'Санкт-Петербург',
    postalCode: '192076',
    addressCountry: 'RU',
  },
}: StructuredDataProps) {
  const generateReviewsSchema = (reviews: Review[]) => {
    // Вычисляем средний рейтинг
    const avgRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${businessUrl}#business`,
      name: businessName,
      image: businessImage,
      address: {
        '@type': 'PostalAddress',
        streetAddress: businessAddress.streetAddress,
        addressLocality: businessAddress.addressLocality,
        postalCode: businessAddress.postalCode,
        addressCountry: businessAddress.addressCountry,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating.toFixed(1),
        reviewCount: reviews.length.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      review: reviews.map((review) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.name,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating.toString(),
          bestRating: '5',
          worstRating: '1',
        },
        reviewBody: review.text,
        datePublished: review.datePublished || new Date().toISOString().split('T')[0],
      })),
    }
  }

  const generateServicesSchema = (services: Service[]) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: services.map((service, index) => {
        // Парсим цену (убираем символы валюты и пробелы)
        const priceMatch = service.price?.match(/(\d+)/)
        const price = priceMatch ? priceMatch[1] : undefined

        return {
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Service',
            '@id': `${businessUrl}#service-${service.id}`,
            name: service.title,
            description: service.description,
            image: service.image,
            provider: {
              '@type': 'BeautySalon',
              '@id': `${businessUrl}#business`,
              name: businessName,
              image: businessImage,
              address: {
                '@type': 'PostalAddress',
                streetAddress: businessAddress.streetAddress,
                addressLocality: businessAddress.addressLocality,
                postalCode: businessAddress.postalCode,
                addressCountry: businessAddress.addressCountry,
              },
            },
            ...(price && {
              offers: {
                '@type': 'Offer',
                price: price,
                priceCurrency: 'RUB',
                availability: 'https://schema.org/InStock',
                url: `${businessUrl}#услуги`,
              },
            }),
            ...(service.duration && (() => {
              try {
                // Конвертируем duration в ISO 8601 формат
                // Примеры: "2 часа" -> "PT2H", "1 час" -> "PT1H", "2,5 часа" -> "PT2H30M"
                const durationStr = String(service.duration)
                const hoursMatch = durationStr.match(/(\d+(?:[.,]\d+)?)\s*час/i)
                if (hoursMatch) {
                  const hours = parseFloat(hoursMatch[1].replace(',', '.'))
                  const wholeHours = Math.floor(hours)
                  const minutes = Math.round((hours - wholeHours) * 60)
                  if (minutes > 0) {
                    return { duration: `PT${wholeHours}H${minutes}M` }
                  }
                  return { duration: `PT${wholeHours}H` }
                }
                // Если не найдены часы, пытаемся найти минуты
                const minutesMatch = durationStr.match(/(\d+)\s*мин/i)
                if (minutesMatch) {
                  return { duration: `PT${minutesMatch[1]}M` }
                }
                // Fallback - возвращаем оригинальное значение
                return {}
              } catch (error) {
                // В случае ошибки просто не добавляем duration
                return {}
              }
            })()),
          },
        }
      }),
    }
  }

  const schema =
    type === 'reviews'
      ? generateReviewsSchema(data as Review[])
      : generateServicesSchema(data as Service[])

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  )
}

