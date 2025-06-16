'use client'

import React, { useRef, useEffect } from 'react';
import { cn } from '@bugninja/shared-ui';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface H2WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function H2Wrapper({ children, className }: H2WrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const underline = underlineRef.current;
    
    if (!wrapper || !underline) return;

    // Set initial state
    gsap.set(underline, { scaleX: 0, transformOrigin: 'left' });

    // Create the main animation (center of screen)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top 70%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(underline, {
      scaleX: 1,
      duration: 0.8,
      ease: 'power2.out'
    });

    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={wrapperRef} className={cn('inline-flex flex-col', className)}>
      {children}
      <div 
        ref={underlineRef}
        className="h-[3px] bg-secondary-500"
        style={{ width: '100%' }}
      />
    </div>
  );
} 