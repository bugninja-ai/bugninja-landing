'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

const logos = [
  { src: '/logos/logo1.svg', alt: 'Company 1' },
  { src: '/logos/logo2.svg', alt: 'Company 2' },
  { src: '/logos/logo3.svg', alt: 'Company 3' },
  { src: '/logos/logo4.svg', alt: 'Company 4' },
  { src: '/logos/logo5.svg', alt: 'Company 5' },
  { src: '/logos/logo6.svg', alt: 'Company 6' },
  { src: '/logos/logo7.svg', alt: 'Company 7' },
  { src: '/logos/logo8.svg', alt: 'Company 8' },
  { src: '/logos/logo9.svg', alt: 'Company 9' },
]

export function LogoTicker() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return

    const container = containerRef.current
    const wrapper = wrapperRef.current

    // Clone the logos for seamless loop
    const clone = wrapper.cloneNode(true) as HTMLElement
    container.appendChild(clone)

    // Calculate the total width of one set of logos
    const totalWidth = wrapper.offsetWidth

    // Create the animation with faster duration
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'none' },
    })

    tl.to([wrapper, clone], {
      x: -totalWidth,
      duration: 20, // Set to 2 seconds for very fast scrolling
    })

    // Cleanup
    return () => {
      tl.kill()
      if (clone.parentNode) {
        clone.parentNode.removeChild(clone)
      }
    }
  }, [])

  return (
    <div className="container mx-auto my-0 py-20 w-full px-4 border-l border-r border-white border-opacity-[0.05]">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Easily integrate with your existing testing framework
        </p>
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