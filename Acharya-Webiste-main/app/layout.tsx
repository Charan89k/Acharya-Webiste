import type { Metadata, Viewport } from 'next'
import { Inter, Cinzel } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { RouteObserver } from '@/components/route-observer'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ACHARYA | Akhila Chanakya Heritage for Advancement, Research, Youth & Academia',
  description: 'Discover the profound knowledge of legendary teachers. Timeless teachings, crafted for the modern seeker. A divine cultural institution dedicated to heritage, wisdom, and community growth.',
  generator: 'v0.app',
  keywords: ['ACHARYA', 'heritage', 'culture', 'education', 'community', 'vedic', 'wisdom', 'India'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1410',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${cinzel.variable} bg-background`}>
      <body className="font-sans antialiased text-slate-950">
        <RouteObserver />
        <Navbar />
        <div className="relative min-h-screen pt-28">{children}</div>
        <Footer />
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
