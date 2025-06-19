'use client'

import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(true)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    setMounted(true)
    
    // Only enable on desktop devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      setIsVisible(false)
      return
    }

    let mouseX = 0
    let mouseY = 0

    const updatePosition = () => {
      setPosition({ x: mouseX, y: mouseY })
      requestAnimationFrame(updatePosition)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseEnter = () => {
      setOpacity(1)
    }

    const handleMouseLeave = () => {
      setOpacity(0)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const interactiveElements = 'a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])'
      if ((e.target as Element)?.closest(interactiveElements)) {
        setOpacity(0.3)
      } else {
        setOpacity(1)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)

    updatePosition()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  if (!mounted || !isVisible) return null

  return (
    <>
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
      
      {/* Full viewport crosshair lines */}
      <div className="fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-200" style={{ opacity }}>
        {/* Vertical line - spans full height */}
        <div 
          className="absolute top-0 h-screen border-l border-dashed border-border opacity-60"
          style={{ 
            left: position.x,
            transform: 'translateX(-0.5px)'
          }}
        />
        
        {/* Horizontal line - spans full width */}
        <div 
          className="absolute left-0 w-screen border-t border-dashed border-border opacity-60"
          style={{ 
            top: position.y,
            transform: 'translateY(-0.5px)'
          }}
        />
        
        {/* Darker center segments for better visibility */}
        {/* Darker vertical center segment */}
        <div 
          className="absolute border-l border-dashed border-border"
          style={{ 
            left: position.x,
            top: position.y - 5,
            height: '10px',
            transform: 'translateX(-0.5px)'
          }}
        />
        
        {/* Darker horizontal center segment */}
        <div 
          className="absolute border-t border-dashed border-border"
          style={{ 
            top: position.y,
            left: position.x - 5,
            width: '10px',
            transform: 'translateY(-0.5px)'
          }}
        />
        
        {/* Small dot at intersection for enhanced visibility */}
        <div 
          className="absolute w-2 h-2 bg-border rounded-full opacity-80"
          style={{
            left: position.x - 4,
            top: position.y - 4,
          }}
        />
      </div>
    </>
  )
} 