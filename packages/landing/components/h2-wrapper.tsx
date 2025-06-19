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

  return (
    <div ref={wrapperRef} className={cn('inline-flex flex-col', className)}>
      {children}
    </div>
  );
} 