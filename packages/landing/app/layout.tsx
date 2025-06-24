import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#6c66ee',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://bugninja.ai'),
  title: {
    default: 'Bugninja - AI-powered E2E testing',
    template: '%s | Bugninja'
  },
  description: 'Test smarter, not harder with Bugninja. Your AI-powered E2E testing solution that helps you create and maintain tests more efficiently.',
  icons: {
    icon: '/favicon.png',
  },
  other: {
    'msapplication-TileColor': '#6c66ee',
  },
  openGraph: {
    title: 'Bugninja - AI-powered E2E testing',
    description: 'Test smarter, not harder with Bugninja. Your AI-powered E2E testing solution that helps you create and maintain tests faster.',
    type: 'website',
    images: [{
      url: '/seo-image.png',
      width: 1200,
      height: 630,
      alt: 'Bugninja - Fully automated AI-based testing that never sleeps'
    }],
    siteName: 'Bugninja',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bugninja - AI-powered E2E testing',
    description: 'Test smarter, not harder with Bugninja. Your AI-powered E2E testing solution that helps you create and maintain tests faster.',
    images: [{
      url: '/seo-image.png',
      alt: 'Bugninja - Fully automated AI-based testing that never sleeps'
    }],
    site: '@bugninja',
    creator: '@bugninja'
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 