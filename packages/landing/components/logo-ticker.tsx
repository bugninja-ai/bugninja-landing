'use client'

import React from 'react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { H2Wrapper } from './h2-wrapper'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const logos = [
  { src: '/partner1.png', alt: 'Partner 1' },
  { src: '/partner2.png', alt: 'Partner 2' },
  { src: '/partner3.png', alt: 'Partner 3' },
  { src: '/partner4.png', alt: 'Partner 4' },
  { src: '/partner5.png', alt: 'Partner 5' },
  { src: '/partner6.png', alt: 'Partner 6' },
  { src: '/partner7.png', alt: 'Partner 6' },
  { src: '/partner8.png', alt: 'Partner 6' },
  { src: '/partner9.png', alt: 'Partner 6' },
  { src: '/partner10.png', alt: 'Partner 6' },

]

export function LogoTicker() {
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
        // Speed up animation while scrolling
        tl.timeScale(1.5) // This makes the animation twice as fast (40s -> 20s)
      }

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Set a timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
        // Return to normal speed
        tl.timeScale(1)
      }, 150) // Wait 150ms after last scroll event
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup
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
      <div className="flex justify-center mb-12">
        <H2Wrapper>
          <h2 className="display-font text-3xl font-bold">Trusted by</h2>
        </H2Wrapper>
      </div>
      <div className="relative w-full overflow-hidden py-12">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

        {/* Logo container */}
        <div 
          ref={containerRef}
          className="flex w-full"
        >
          <div 
            ref={wrapperRef}
            className="flex items-center gap-12 px-6"
          >
            {logos.map((logo, index) => (
              <div
                key={index}
                className="relative h-12 w-[150px] flex-shrink-0 opacity-60 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="150px"
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