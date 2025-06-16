'use client'

import React from 'react';
import { cn } from '@bugninja/shared-ui'

interface FeatureCardProps {
  title: string
  description: string
  className?: string
  isLarge?: boolean
  imageAspectRatio?: '16:9' | 'vertical'
}

export const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  function FeatureCard({ 
    title, 
    description, 
    className, 
    isLarge,
    imageAspectRatio = '16:9'
  }, ref) {
    return (
      <div ref={ref} className={cn(
        "bg-gray-50 rounded-2xl p-4 flex flex-col justify-start border border-gray-100",
        isLarge && "md:row-span-2",
        className
      )}>
        <div className={cn(
          "w-full rounded-lg mb-4 flex justify-center bg-gray-300 dark:bg-gray-200",
          imageAspectRatio === '16:9'
            ? 'aspect-video'
            : 'aspect-[3/4] xl:aspect-[3/4] lg:aspect-[3/4] md:aspect-[3/4] sm:aspect-video'
        )}>
          <span className="text-muted-foreground">Image</span>
        </div>
        <div className="display-font text-xl font-semibold mb-2 text-left">{title}</div>
        <div className="text-muted-foreground text-left">{description}</div>
      </div>
    )
  }
); 