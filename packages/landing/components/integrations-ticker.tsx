'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { H2Wrapper } from './h2-wrapper'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const integrations = [
  { src: '/integration1.png', alt: 'Integration 1' },
  { src: '/integration2.png', alt: 'Integration 2' },
  { src: '/integration3.png', alt: 'Integration 3' },
  { src: '/integration4.png', alt: 'Integration 4' },
  { src: '/integration5.png', alt: 'Integration 5' },
  { src: '/integration6.png', alt: 'Integration 6' },
  { src: '/integration7.png', alt: 'Integration 7' },
  { src: '/integration8.png', alt: 'Integration 8' },
  { src: '/integration9.png', alt: 'Integration 9' },
]

export function IntegrationsTicker() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Timeline | null>(null)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return

    const container = containerRef.current
    const wrapper = wrapperRef.current

    // Clone the logos for seamless loop
    const clone = wrapper.cloneNode(true) as HTMLElement
    container.appendChild(clone)

    // Calculate the total width of one set of logos
    const totalWidth = wrapper.offsetWidth

    // Create the animation
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'none' },
    })

    tl.to([wrapper, clone], {
      x: -totalWidth,
      duration: 40,
    })

    animationRef.current = tl

    // Set up scroll detection
    const handleScroll = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true
        tl.timeScale(1.5)
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
        tl.timeScale(1)
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      tl.kill()
      if (clone.parentNode) {
        clone.parentNode.removeChild(clone)
      }
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="container mx-auto my-0 py-20 w-full px-4 border-l border-r border-dashed">
      <div className="flex flex-col items-center justify-center mb-12">
        <H2Wrapper>
          <h2 className="display-font text-3xl font-bold">Integrations</h2>
        </H2Wrapper>
        <p className="mt-4 text-lg text-muted-foreground text-center max-w-2xl">
          Integrate your most used tools for testing, CI/CD, and automation. Connect with your favorite platforms and streamline your workflow with seamless integrations built for modern engineering teams.
        </p>
      </div>
      <div className="relative w-full overflow-hidden py-12">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />
        {/* Logo container */}
        <div ref={containerRef} className="flex w-full">
          <div ref={wrapperRef} className="flex items-center gap-12 px-6">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="relative h-12 w-[150px] flex-shrink-0 opacity-80 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
              >
                <Image
                  src={integration.src}
                  alt={integration.alt}
                  fill
                  className="object-contain"
                  priority={index < 5}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 