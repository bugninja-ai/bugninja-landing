'use client'

import { cn } from '@bugninja/shared-ui'
import NextLink from 'next/link'
import { forwardRef } from 'react'

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  children: React.ReactNode
}

const baseButtonClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2'

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ href, className, children, ...props }, ref) => {
    const buttonClasses = cn('cta-button', className)

    if (href) {
      return (
        <NextLink href={href} className={buttonClasses}>
          {children}
        </NextLink>
      )
    }

    return (
      <button ref={ref} className={buttonClasses} {...props}>
        {children}
      </button>
    )
  }
)

CTAButton.displayName = 'CTAButton'

export const CTAButtonOnPrimary = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ href, className, children, ...props }, ref) => {
    const buttonClasses = cn('cta-button-on-primary', className)

    if (href) {
      return (
        <NextLink href={href} className={buttonClasses}>
          {children}
        </NextLink>
      )
    }

    return (
      <button ref={ref} className={buttonClasses} {...props}>
        {children}
      </button>
    )
  }
)

CTAButtonOnPrimary.displayName = 'CTAButtonOnPrimary' 