'use client'

import { cn } from '@bugninja/shared-ui'
import Link from 'next/link'
import { Button } from '@bugninja/shared-ui/components/ui/button'
import { Navigation } from './navigation'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { NavigationOverlay } from './navigation-overlay'

interface PageHeaderProps {
  className?: string
}

export function PageHeader({ className }: PageHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="sticky top-0 z-50">
    <header className={cn(
      "w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      {/* Desktop container */}
      <div className="hidden lg:block">
        <div className="container mx-auto flex h-16 items-center px-4 border-l border-r border-white border-opacity-[0.05]">
          {/* Logo */}
          <div className="w-[200px] flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold">BN</span>
              </div>
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
            <Button variant="ghost" size="sm" className="whitespace-nowrap" asChild>
              <Link href="/auth">
                Log in or register
              </Link>
            </Button>
            <Button size="sm" className="whitespace-nowrap" asChild>
              <Link href="/demo">
                Book a demo
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
              onClick={() => setIsOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold">BN</span>
              </div>
            </Link>
          </div>

          {/* Right section - Action Buttons (tablet only) */}
          <div className="hidden sm:flex flex-1 items-center justify-end gap-3">
            <Button variant="ghost" size="sm" className="whitespace-nowrap" asChild>
              <Link href="/auth">
                Log in or register
              </Link>
            </Button>
            <Button size="sm" className="whitespace-nowrap" asChild>
              <Link href="/demo">
                Book a demo
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