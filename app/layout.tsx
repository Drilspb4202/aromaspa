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
  metadataBase: new URL('https://radmilaessentialoil.ru'),
  title: {
    default: 'Арома Спа Студия | Радмила Яковлева - Аромопрактик | Эфирные масла dōTERRA',
    template: '%s | Арома Спа Студия'
  },
  description: 'Арома Спа Студия Радмилы Яковлевой - профессионального аромопрактика. Индивидуальные сеансы аромадиагностики, АромаЙога, продажа эфирных масел высокого качества dōTERRA. Улучшите свое здоровье и самочувствие с помощью натуральных методов.',
  keywords: [
    'Радмила Яковлева',
    'Аромопрактик',
    'Doterra',
    'CPTG',
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
    'СПб',
    'спа студия',
    'ароматерапия СПб',
    'массаж с маслами',
    'натуральная косметика',
    'здоровье',
    'релаксация',
    'эфирные масла купить',
    'dōTERRA купить',
    'ароматерапия СПб отзывы'
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
    // Настройки для Bingbot (используется ChatGPT для поиска)
    bingbot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'bc0164dd53862fad',
    yandex: 'bc0164dd53862fad',
    // Bing Webmaster Tools verification (для ChatGPT поиска)
    // Замените на ваш код после регистрации в Bing Webmaster Tools
    other: {
      'msvalidate.01': 'YOUR_BING_VERIFICATION_CODE', // Замените на реальный код
    },
  },
  alternates: {
    canonical: 'https://radmilaessentialoil.ru',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://radmilaessentialoil.ru',
    title: 'Арома Спа Студия | Радмила Яковлева - Аромопрактик | Эфирные масла dōTERRA',
    description: 'Арома Спа Студия Радмилы Яковлевой - индивидуальные услуги ароматерапии от профессионального аромопрактика. АромаДиагностика, АромаЙога, АромаДегустация и другие уникальные процедуры с эфирными маслами dōTERRA CPTG.',
    siteName: 'Арома Спа Студия',
    images: [
      {
        url: 'https://i.ibb.co/8NDztqx/radmila-jpg.jpg',
        width: 1200,
        height: 800,
        alt: 'Арома Спа Студия - Профессиональная Ароматерапия от Радмилы Яковлевой',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Арома Спа Студия | Радмила Яковлева - Аромопрактик',
    description: 'Индивидуальные услуги ароматерапии от Радмилы Яковлевой в Санкт-Петербурге. Эфирные масла dōTERRA для вашего здоровья и гармонии.',
    images: ['https://i.ibb.co/8NDztqx/radmila-jpg.jpg'],
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
  "alternateName": "AROMA SPA СТУДИЯ",
  "description": "Профессиональная ароматерапия в Санкт-Петербурге от Радмилы Яковлевой. Услуги: АромаДиагностика (3000₽), АромаЙога (3000₽), АромаДегустация (500₽), АромаНейрографика (1000₽), АромаТимбилдинг (5000₽). Продажа эфирных масел dōTERRA.",
  "url": "https://www.radmilaessentialoil.ru",
  "logo": "https://www.radmilaessentialoil.ru/logo-yar.png",
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
          "description": "Индивидуальная консультация с использованием эфирных масел dōTERRA CPTG. Продолжительность: 2 часа",
          "price": "3000",
          "priceCurrency": "RUB"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "АромаЙога",
          "description": "Йога с использованием эфирных масел для максимального расслабления и гармонии. Продолжительность: 2.5 часа",
          "price": "3000",
          "priceCurrency": "RUB"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "АромаДегустация",
          "description": "Знакомство с эфирными маслами и их свойствами. Продолжительность: 1 час",
          "price": "500",
          "priceCurrency": "RUB"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "АромаНейрографика",
          "description": "Создание рисунка с использованием эфирных масел и техники нейрографики. Продолжительность: 2 часа",
          "price": "1000",
          "priceCurrency": "RUB"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "АромаТимбилдинг",
          "description": "Командное мероприятие с ароматерапией для сплочения коллектива. Продолжительность: 2 часа",
          "price": "5000",
          "priceCurrency": "RUB"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "200"
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
      "datePublished": "2024-12-20",
      "reviewBody": "Потрясающий опыт! АромаДиагностика помогла мне лучше понять себя и свои потребности."
    }
  ],
  "founder": {
    "@type": "Person",
    "name": "Радмила Яковлева",
    "jobTitle": "Аромопрактик",
    "description": "Профессиональный аромопрактик, специалист по эфирным маслам dōTERRA CPTG"
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
        <meta name="google-site-verification" content="bc0164dd53862fad" />
        {/* Bing Webmaster Tools verification - замените на ваш код после регистрации */}
        <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
        
        <link rel="alternate" href="https://radmilaessentialoil.ru" hrefLang="ru-RU" />
        
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
        
        {/* Явные Open Graph теги для Telegram и других социальных сетей */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:url" content="https://radmilaessentialoil.ru" />
        <meta property="og:title" content="Арома Спа Студия | Радмила Яковлева - Аромопрактик | Эфирные масла dōTERRA" />
        <meta property="og:description" content="Арома Спа Студия Радмилы Яковлевой - индивидуальные услуги ароматерапии от профессионального аромопрактика. АромаДиагностика, АромаЙога, АромаДегустация и другие уникальные процедуры с эфирными маслами dōTERRA CPTG." />
        <meta property="og:image" content="https://i.ibb.co/8NDztqx/radmila-jpg.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content="Арома Спа Студия - Профессиональная Ароматерапия от Радмилы Яковлевой" />
        <meta property="og:site_name" content="Арома Спа Студия" />
        
        {/* Twitter Card теги */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Арома Спа Студия | Радмила Яковлева - Аромопрактик" />
        <meta name="twitter:description" content="Индивидуальные услуги ароматерапии от Радмилы Яковлевой в Санкт-Петербурге. Эфирные масла dōTERRA для вашего здоровья и гармонии." />
        <meta name="twitter:image" content="https://i.ibb.co/8NDztqx/radmila-jpg.jpg" />
        <meta name="twitter:creator" content="@AromaSpaStudio" />
        
        {/* Дополнительные метатеги для Bing и ChatGPT */}
        <meta name="language" content="Russian" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="coverage" content="worldwide" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />

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

