'use client'

import { cn } from '@bugninja/shared-ui'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@bugninja/shared-ui/components/ui/button'
import { Navigation } from './navigation'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { NavigationOverlay } from './navigation-overlay'

interface PageHeaderProps {
  className?: string
}

export function PageHeader({ className }: PageHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="sticky top-0 z-50">
      <header className={cn(
        "w-full border-b border-border border-dashed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-200",
        //isScrolled && "bg-primary-100/40 dark:bg-primary-100/20",
        className
      )}>
        {/* Desktop container */}
        <div className="hidden lg:block">
          <div className="container mx-auto flex h-16 items-center px-4 border-l border-r border-dashed">
            {/* Logo */}
            <div className="w-[200px] flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/bugninja.svg"
                  alt="Bugninja Logo"
                  width={110}
                  height={28}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Center section - Navigation */}
            <div className="flex-1 flex justify-center">
              <div className="w-[400px] flex justify-center">
                <Navigation />
              </div>
            </div>

            {/* Right section - Action Buttons */}
            <div className="w-[200px] flex-shrink-0 flex items-center justify-end gap-3">
              <Button variant="ghost" size="default" className="whitespace-nowrap" asChild>
                <Link href="/book-meeting">
                  Book a demo
                </Link>
              </Button>
              <Button size="default" className="whitespace-nowrap" asChild>
                <Link href="/book-meeting">
                  Log in or register
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Tablet and Mobile container */}
        <div className="lg:hidden">
          <div className="flex h-16 items-center px-6">
            {/* Left section - Hamburger and Logo */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="relative h-8 w-8 transition-colors hover:bg-accent/10"
              >
                <Menu 
                  className={cn(
                    "h-5 w-5 absolute transition-all duration-200",
                    isOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                  )} 
                />
                <X 
                  className={cn(
                    "h-5 w-5 absolute transition-all duration-200",
                    isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                  )} 
                />
                <span className="sr-only">Toggle menu</span>
              </Button>

              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image
                  src="/bugninja.svg"
                  alt="Bugninja Logo"
                  width={110}
                  height={28}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Right section - Action Buttons (tablet only) */}
            <div className="hidden sm:flex flex-1 items-center justify-end gap-3">
              <Button variant="ghost" size="default" className="whitespace-nowrap" asChild>
                <Link href="/book-meeting">
                  Book a demo
                </Link>
              </Button>
              <Button size="default" className="whitespace-nowrap" asChild>
                <Link href="/book-meeting">
                  Log in or register
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Overlay */}
        <NavigationOverlay isOpen={isOpen} onOpenChange={setIsOpen} />
      </header>
    </div>
  )
} 