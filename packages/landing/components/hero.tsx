'use client'

import { CTAButton } from './cta-button'
import { SecondaryButton } from './secondary-button'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Hero() {
  const logoRef = useRef<HTMLImageElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLDivElement>(null)
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const heroImages = ['/hero.png', '/hero1.png', '/hero3.png']

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

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [heroImages.length])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  return (
    <>
      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0.8;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1.02);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-10px) translateX(5px);
          }
          66% {
            transform: translateY(5px) translateX(-5px);
          }
        }
        
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes noiseShift {
          0%, 100% {
            filter: blur(32px) contrast(1.1) brightness(1.02);
          }
          50% {
            filter: blur(32px) contrast(1.05) brightness(0.98);
          }
        }
        
        .gradient-circle-1 {
          animation: float 8s ease-in-out infinite, breathe 6s ease-in-out infinite, noiseShift 4s ease-in-out infinite;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(0,0,0,0.03) 0%, transparent 30%);
        }
        
        .gradient-circle-2 {
          animation: float 12s ease-in-out infinite 2s, breathe 8s ease-in-out infinite 1s, noiseShift 5s ease-in-out infinite 2s;
          background-image: 
            radial-gradient(circle at 60% 20%, rgba(255,255,255,0.08) 0%, transparent 40%),
            radial-gradient(circle at 30% 80%, rgba(255,255,255,0.06) 0%, transparent 50%),
            radial-gradient(circle at 70% 50%, rgba(0,0,0,0.02) 0%, transparent 35%);
        }
        
        .gradient-circle-3 {
          animation: float 10s ease-in-out infinite 4s, breathe 7s ease-in-out infinite 3s, noiseShift 6s ease-in-out infinite 1s;
          background-image: 
            radial-gradient(circle at 40% 60%, rgba(255,255,255,0.07) 0%, transparent 45%),
            radial-gradient(circle at 80% 30%, rgba(255,255,255,0.04) 0%, transparent 40%),
            radial-gradient(circle at 20% 90%, rgba(0,0,0,0.025) 0%, transparent 30%);
        }
      `}</style>
      <div className="container mx-auto relative overflow-hidden">
        {/* Gradient Background Circles */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Primary color circle */}
          <div className="gradient-circle-1 absolute top-10 left-0 w-96 h-96 bg-primary-200/35 rounded-full blur-2xl"></div>
          
          {/* Secondary color circle */}
          <div className="gradient-circle-2 absolute top-32 right-0 w-96 h-96 bg-secondary-200/25 rounded-full blur-2xl"></div>
          
          {/* Orange circle - using amber for warm orange tone */}
          <div className="gradient-circle-3 absolute top-80 left-1/4 w-72 h-72 bg-rose-200/25 rounded-full blur-3xl"></div>
        </div>
        
      <div className="px-4 md:py-18 py-10 sm:pt-4 border-l border-r border-dashed relative z-10">
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
              className="display-font text-4xl md:text-6xl text-grey-950 mb-3"
            >
              Fully automated AI-based testing that never sleeps  
            </h1>
            <p
              ref={subheadlineRef}
              className="mt-10 sm:mt-2 text-lg leading-8 text-muted-foreground max-w-xl"
            >
              Simulate real users for E2E testing and find bugs in your product before they cost you money.
            </p>
            <div
              ref={buttonsRef}
              className="mt-10 flex flex-col md:flex-row items-center gap-y-6 md:gap-y-0 md:gap-x-2"
            >
              <CTAButton href="/book-meeting">
                Get started for free
              </CTAButton>
              <SecondaryButton href="/book-meeting">
                Book a demo
              </SecondaryButton>
            </div>
          </div>

          <div className="mt-16 w-full px-12 pb-6">
            <div
              ref={heroImageRef}
              className="relative aspect-video overflow-hidden rounded-xl bg-muted/50 border-4 border-border/40 shadow-sm group"
            >
              {heroImages.map((imageSrc, index) => (
                <Image
                  key={imageSrc}
                  src={imageSrc}
                  alt="Bugninja Platform Preview"
                  fill
                  className={`object-cover object-top transition-opacity duration-1000 ease-in-out ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority={index === 0}
                />
              ))}
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
              
              {/* Dots indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 transform ${
                      index === currentImageIndex 
                        ? 'bg-primary-500 scale-110 shadow-lg shadow-primary-500/50' 
                        : 'bg-primary-200 hover:bg-primary-300 hover:scale-105'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
} 