import { Playfair_Display, Montserrat } from 'next/font/google'

export const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-playfair',
  preload: true,
})

export const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-montserrat',
  preload: true,
})

