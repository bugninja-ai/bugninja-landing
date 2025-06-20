import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bugninja - AI-Powered Debugging Assistant',
  description: 'Debug smarter, not harder with Bugninja. Your AI-powered debugging assistant that helps you find and fix bugs faster.',
  themeColor: '#6c66ee',
  icons: {
    icon: '/favicon.png',
  },
  other: {
    'theme-color': '#6c66ee',
    'msapplication-TileColor': '#6c66ee',
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