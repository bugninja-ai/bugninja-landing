'use client'

import { cn } from '@bugninja/shared-ui'
import NextLink from 'next/link'
import { forwardRef } from 'react'

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  children: React.ReactNode
}

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