export const generateMetadata = (
title: string,
description: string,
path: string = '',
image: string = '/og-image.jpg'
) => {
const baseUrl = 'https://www.radmilaessentialoil.ru'
const url = `${baseUrl}${path}`

return {
  title: `${title} | Aroma Spa Studio`,
  description,
  canonical: url,
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url,
    title,
    description,
    images: [
      {
        url: `${baseUrl}${image}`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    siteName: 'Aroma Spa Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [`${baseUrl}${image}`],
    creator: '@AromaSpaStudio',
  },
  alternates: {
    canonical: url,
  },
}
}

export const generateProductSchema = (product: {
name: string
description: string
price: number
image: string
}) => {
return {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.image,
  offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: 'RUB',
    availability: 'https://schema.org/InStock',
  },
  brand: {
    '@type': 'Brand',
    name: 'doTERRA',
  },
}
}

export const generateServiceSchema = (service: {
name: string
description: string
price: number
duration: string
}) => {
return {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  provider: {
    '@type': 'LocalBusiness',
    name: 'Aroma Spa Studio',
    image: 'https://www.radmilaessentialoil.ru/logo.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Советский пр., д. 12, кв/оф. 2',
      addressLocality: 'Санкт-Петербург',
      postalCode: '192076',
      addressCountry: 'RU',
    },
  },
  offers: {
    '@type': 'Offer',
    price: service.price,
    priceCurrency: 'RUB',
  },
  duration: service.duration,
}
}

export const generateArticleSchema = (article: {
title: string
description: string
publishedTime: string
modifiedTime: string
author: string
image: string
}) => {
return {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  image: article.image,
  datePublished: article.publishedTime,
  dateModified: article.modifiedTime,
  author: {
    '@type': 'Person',
    name: article.author,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Aroma Spa Studio',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.radmilaessentialoil.ru/logo.jpg',
    },
  },
}
}
