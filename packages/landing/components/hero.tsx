'use client'

import { CTAButton } from './cta-button'
import { SecondaryButton } from './secondary-button'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Hero() {
  const logoRef = useRef<HTMLImageElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = [logoRef.current, headlineRef.current, subheadlineRef.current, buttonsRef.current, heroImageRef.current]
    const validElements = elements.filter(el => el !== null)
    
    if (!validElements.length) return
    
    gsap.set(validElements, { autoAlpha: 0, y: 40 })
    gsap.to(validElements, {
      autoAlpha: 1,
      y: 0,
      duration: 1.1,
      stagger: 0.1,
      ease: 'power2.out',
    })
  }, [])

  return (
    <div className="container mx-auto">
      <div className="px-4 md:py-18 py-10 sm:pt-4 border-l border-r border-dashed">
        <div className="flex flex-col items-center mt-20">
          <div className="flex flex-col items-center text-center max-w-3xl">
            <Image
              ref={logoRef}
              src="/bugninja-icon.png"
              alt="Bugninja Logo"
              width={120}
              height={120}
              className="mb-10 shadow-xl shadow-primary-900/20 rounded-[29px] transition-transform duration-200 hover:scale-105"
            />
            <h1
              ref={headlineRef}
              className="display-font text-4xl md:text-6xl text-grey-950"
            >
              Fully automated AI-based testing that never sleeps  
            </h1>
            <p
              ref={subheadlineRef}
              className="mt-6 sm:mt-2 text-lg leading-8 text-muted-foreground"
            >
              Find bugs in your product before they cost you money.
            </p>
            <div
              ref={buttonsRef}
              className="mt-10 flex flex-col md:flex-row items-center gap-y-6 md:gap-y-0 md:gap-x-2"
            >
              <CTAButton href="/demo">
                Get started for free
              </CTAButton>
              <SecondaryButton href="/book-meeting">
                Book a demo
              </SecondaryButton>
            </div>
          </div>

          <div className="mt-16 w-full">
            <div
              ref={heroImageRef}
              className="relative aspect-video overflow-hidden rounded-xl bg-muted/50"
            >
              <Image
                src="/hero-image.png"
                alt="Bugninja Platform Preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 