import React from 'react'
import type { Metadata } from 'next'
import { playfair, montserrat } from './fonts'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import MobileNavigation from './components/MobileNavigation'
import ShareButton from '@/components/ShareButton'
import ScrollingHeader from '@/components/ScrollingHeader'
import Favicon from './components/Favicon';
import ChatBot from '@/components/ChatBot'
import Script from 'next/script';
import { CartProvider } from '@/contexts/CartContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.radmilaessentialoil.ru'),
  title: {
    default: 'Арома Спа Студия | Радмила Яковлева - Аромопрактик | Эфирные масла doTERRA',
    template: '%s | Арома Спа Студия'
  },
  description: 'Арома Спа Студия Радмилы Яковлевой - профессионального аромопрактика. Индивидуальные сеансы аромадиагностики, АромаЙога, продажа эфирных масел высокого качества doTERRA. Улучшите свое здоровье и самочувствие с помощью натуральных методов.',
  keywords: [
    'Радмила',
    'Аромопрактик',
    'Doterra',
    'Эфирные масла',
    'арома спа студия',
    'ароматерапия',
    'АромаДиагностика',
    'АромаЙога',
    'АромаДегустация',
    'АромаНейрографика',
    'АромаТимбилдинг',
    'АромаБизнес',
    'Санкт-Петербург',
    'спа студия',
    'массаж с маслами',
    'натуральная косметика',
    'здоровье',
    'релаксация'
  ],
  authors: [{ name: 'Радмила Яковлева', url: 'https://www.radmilaessentialoil.ru/about' }],
  creator: 'Радмила Яковлева',
  publisher: 'Арома Спа Студия',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    yandex: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'bc0164dd53862fad',
  },
  alternates: {
    canonical: 'https://www.radmilaessentialoil.ru',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://www.radmilaessentialoil.ru',
    title: 'Арома Спа Студия | Радмила Яковлева - Аромопрактик | Эфирные масла doTERRA',
    description: 'Арома Спа Студия Радмилы Яковлевой - индивидуальные услуги ароматерапии от профессионального аромопрактика. АромаДиагностика, АромаЙога, АромаДегустация и другие уникальные процедуры с эфирными маслами doTERRA CPTG.',
    siteName: 'Арома Спа Студия',
    images: [
      {
        url: 'https://www.radmilaessentialoil.ru/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Арома Спа Студия - Профессиональная Ароматерапия',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Арома Спа Студия | Радмила Яковлева - Аромопрактик',
    description: 'Индивидуальные услуги ароматерапии от Радмилы Яковлевой в Санкт-Петербурге. Эфирные масла doTERRA для вашего здоровья и гармонии.',
    images: ['https://www.radmilaessentialoil.ru/twitter-card-image.jpg'],
    creator: '@AromaSpaStudio',
    creatorId: '1467726470533754880',
    siteId: '1467726470533754880',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  appleWebApp: {
    title: 'Арома Спа Студия',
    statusBarStyle: 'default',
    capable: true,
    startupImage: [
      '/apple-splash-2048-2732.jpg',
      '/apple-splash-1668-2388.jpg',
      '/apple-splash-1536-2048.jpg',
      '/apple-splash-1125-2436.jpg',
      '/apple-splash-828-1792.jpg',
    ],
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  },
    generator: 'v0.dev'
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "SpaAndBeautyBusiness",
  "@id": "https://www.radmilaessentialoil.ru",
  "name": "Арома Спа Студия",
  "alternateName": "Aroma Spa Studio",
  "description": "Профессиональная ароматерапия в Санкт-Петербурге от Радмилы Яковлевой. Услуги: АромаДиагностика, АромаЙога, АромаДегустация, АромаНейрографика, АромаТимбилдинг. Продажа эфирных масел doTERRA.",
  "url": "https://www.radmilaessentialoil.ru",
  "logo": "https://www.radmilaessentialoil.ru/logo.jpg",
  "image": [
    "https://www.radmilaessentialoil.ru/images/studio-1.jpg",
    "https://www.radmilaessentialoil.ru/images/studio-2.jpg",
    "https://www.radmilaessentialoil.ru/images/studio-3.jpg"
  ],
  "telephone": "+79956000122",
  "email": "contact@radmilaessentialoil.ru",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Советский пр., д. 12, кв/оф. 2",
    "addressLocality": "Санкт-Петербург",
    "postalCode": "192076",
    "addressCountry": "RU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 59.9343,
    "longitude": 30.3351
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    }
  ],
  "priceRange": "$$",
  "paymentAccepted": ["Наличные", "Банковские карты", "Перевод на карту"],
  "currenciesAccepted": "RUB",
  "sameAs": [
    "https://vk.com/aroma_spa_studio",
    "https://www.instagram.com/aroma_spa_studio/",
    "https://t.me/aroma_spa_studio"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Услуги Арома Спа Студии",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "АромаДиагностика",
          "description": "Индивидуальная консультация с использованием эфирных масел doTERRA",
          "price": "2000",
          "priceCurrency": "RUB"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "АромаЙога",
          "description": "Йога с использованием эфирных масел для максимального расслабления",
          "price": "2000",
          "priceCurrency": "RUB"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Анна М."
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "datePublished": "2024-01-15",
      "reviewBody": "Потрясающий опыт! АромаДиагностика помогла мне лучше понять себя и свои потребности."
    }
  ],
  "founder": {
    "@type": "Person",
    "name": "Радмила Яковлева",
    "jobTitle": "Аромопрактик",
    "description": "Профессиональный аромопрактик, специалист по эфирным маслам doTERRA"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Главная",
      "item": "https://www.radmilaessentialoil.ru"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Услуги",
      "item": "https://www.radmilaessentialoil.ru/services"
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="ru" 
      className={`${playfair.variable} ${montserrat.variable} font-sans`}
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="yandex-verification" content="bc0164dd53862fad" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        
        <link rel="canonical" href="https://www.radmilaessentialoil.ru" />
        <link rel="alternate" href="https://www.radmilaessentialoil.ru" hrefLang="ru-RU" />
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        <meta name="geo.region" content="RU-SPE" />
        <meta name="geo.placename" content="Санкт-Петербург" />
        <meta name="geo.position" content="59.9343;30.3351" />
        <meta name="ICBM" content="59.9343, 30.3351" />

        <Favicon />

        {/* Yandex.RTB */}
        <script>window.yaContextCb=window.yaContextCb||[]</script>
        <script src="https://yandex.ru/ads/system/context.js" async></script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className="antialiased">
        <CartProvider>
          <div className="md:hidden">
            <ScrollingHeader />
          </div>
          <main itemScope itemType="https://schema.org/WebPageElement" itemProp="mainContentOfPage">
            {children}
          </main>
          <Toaster />
          <ShareButton />
          <ChatBot />
          <MobileNavigation />
          <Script strategy="afterInteractive" id="yandex-metrika">
            {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(99439906, "init", {
                   clickmap:true,
                   trackLinks:true,
                   accurateTrackBounce:true,
                   webvisor:true
              });
            `}
          </Script>
          <noscript>
            <div><img src="https://mc.yandex.ru/watch/99439906" style={{ position: 'absolute', left: '-9999px' }} alt="" /></div>
          </noscript>
          {/* Yandex.RTB R-A-13605260-1 */}
          <div id="yandex_rtb_R-A-13605260-1"></div>
          <Script strategy="afterInteractive" id="yandex-rtb">
            {`
              window.yaContextCb.push(() => {
                Ya.Context.AdvManager.render({
                  "blockId": "R-A-13605260-1",
                  "renderTo": "yandex_rtb_R-A-13605260-1"
                })
              })
            `}
          </Script>
        </CartProvider>
      </body>
    </html>
  )
}



import './globals.css'
