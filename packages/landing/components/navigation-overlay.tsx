'use client'

import { cn } from '@bugninja/shared-ui'
import { Navigation } from './navigation'
import * as Sheet from '@radix-ui/react-dialog'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Button } from '@bugninja/shared-ui/components/ui/button'
import Link from 'next/link'

interface NavigationOverlayProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function NavigationOverlay({ isOpen, onOpenChange }: NavigationOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Check if refs are available
      if (!overlayRef.current || !contentRef.current) return

      // Initial state
      gsap.set(overlayRef.current, { opacity: 0, x: '-100%' })
      gsap.set(contentRef.current, { x: '-100%' })

      // Create timeline
      const tl = gsap.timeline({ paused: true })
      
      // Add animations to timeline
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
      .to(contentRef.current, {
        x: '0%',
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.1') // Start slightly before the overlay animation ends
    })

    return () => ctx.revert() // Cleanup
  }, [])

  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return

    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
      gsap.to(contentRef.current, {
        x: '0%',
        duration: 0.4,
        ease: 'power2.out'
      })
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      })
      gsap.to(contentRef.current, {
        x: '-100%',
        duration: 0.4,
        ease: 'power2.in'
      })
    }
  }, [isOpen])

  const handleNavigationClick = () => {
    onOpenChange(false)
  }

  return (
    <Sheet.Root open={isOpen} onOpenChange={onOpenChange}>
      <Sheet.Portal>
        <Sheet.Overlay 
          ref={overlayRef}
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
        />
        <Sheet.Content 
          ref={contentRef}
          className="fixed inset-y-0 left-0 z-40 w-full max-w-sm border-r bg-background p-6 shadow-lg top-16"
        >
          <div className="flex flex-col h-full">
            {/* Navigation and buttons */}
            <div className="flex flex-col gap-6">
              {/* Navigation items */}
              <div className="flex flex-col gap-2">
                <Navigation 
                  isVertical={true} 
                  className="flex-col items-center space-y-2"
                  onClick={handleNavigationClick}
                />
              </div>

              {/* Separator line */}
              <div className="-mx-6">
                <div className="w-full border-t border-border border-dashed"></div>
              </div>

              {/* Action buttons (only visible in mobile menu on mobile) */}
              <div className="flex flex-col gap-3 sm:hidden items-center">
             
                <Button 
                  variant="ghost" 
                  className="w-full max-w-[200px] justify-center text-muted-foreground hover:text-foreground transition-colors hover:bg-accent/10" 
                  asChild
                >
                  <Link href="/book-meeting" onClick={() => onOpenChange(false)}>
                    Book a demo
                  </Link>
                </Button>
                <Button 
                  className="w-full max-w-[200px] justify-center transition-colors hover:bg-primary-800" 
                  asChild
                >
                  <Link href="/book-meeting" onClick={() => onOpenChange(false)}>
                    Log in or register
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Portal>
    </Sheet.Root>
  )
} 