'use client'

import { cn } from '@bugninja/shared-ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  className?: string
}

const navigationItems = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
]

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname()
  const isVertical = className?.includes('flex-col')

  return (
    <nav className={cn(
      "flex items-center gap-6",
      isVertical ? "w-full" : "justify-center",
      className
    )}>
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-foreground"
              : "text-muted-foreground",
            isVertical ? "w-full py-2 text-center" : ""
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
} 