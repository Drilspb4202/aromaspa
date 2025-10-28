import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Блог | AROMA SPA СТУДИЯ',
  description: 'Узнайте больше о ароматерапии и эфирных маслах в нашем блоге.',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
