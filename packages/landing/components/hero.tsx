'use client'

import { Button } from '@bugninja/shared-ui/components/ui/button'
import { CTAButton } from './cta-button'
import Image from 'next/image'

export function Hero() {
  return (
    <div className="container mx-auto">
      <div className="px-4 py-20 border-l border-r">
        <div className="flex flex-col items-center mt-20">
          <div className="flex flex-col items-center text-center max-w-3xl">
            <h1 className="display-font sm:text-6xl">
              Fully automated AI-based testing that never sleeps  
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Find bugs in your product before they cost you money.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <CTAButton href="/demo">
                Get started for free
              </CTAButton>
              <Button variant="outline" asChild>
                <a href="/docs">Book a demo</a>
              </Button>
            </div>
          </div>

          <div className="mt-16 w-full">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-muted/50">
              <Image
                src="/hero-image.png"
                alt="BugNinja Platform Preview"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 