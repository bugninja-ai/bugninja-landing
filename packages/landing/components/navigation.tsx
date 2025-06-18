'use client'

import { cn } from '@bugninja/shared-ui'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navigationItems = [
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'About', href: '#about' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '#faq' },
]

interface NavigationProps {
  isVertical?: boolean
  className?: string
  onClick?: () => void
}

export function Navigation({ isVertical = false, className, onClick }: NavigationProps) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a page route (doesn't start with #), let default navigation work
    if (!href.startsWith('#')) {
      onClick?.()
      return
    }

    // If we're not on the home page, let the default link behavior work
    if (!isHomePage) return

    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      // Update URL without triggering scroll
      window.history.pushState(null, '', href)
    }
    
    // Call the parent onClick handler if provided (for overlay)
    onClick?.()
  }

  return (
    <nav className={cn(
      "flex gap-6",
      isVertical ? "flex-col" : "flex-row",
      className
    )}>
      {navigationItems.map((item) => {
        // For page routes (like /blog), use as-is. For section anchors, handle based on current page
        const fullHref = item.href.startsWith('#') 
          ? (isHomePage ? item.href : `/${item.href}`)
          : item.href
        
        return (
          <Link
            key={item.href}
            href={fullHref}
            onClick={(e) => handleClick(e, item.href)}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary-800 cursor-pointer",
              pathname === item.href
                ? "text-foreground"
                : "text-muted-foreground",
              isVertical ? "w-full py-2 text-center" : ""
            )}
          >
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
} 