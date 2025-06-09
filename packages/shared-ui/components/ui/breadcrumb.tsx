import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  segments: {
    label: string
    href?: string
  }[]
  separator?: React.ReactNode
}

export function Breadcrumb({
  segments,
  separator = <ChevronRight className="h-4 w-4" />,
  className,
  ...props
}: BreadcrumbProps) {
  return (
    <nav className={cn('flex', className)} {...props}>
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1
          return (
            <li key={segment.label} className="flex items-center gap-2">
              {segment.href ? (
                <a
                  href={segment.href}
                  className={cn(
                    'hover:text-foreground transition-colors',
                    isLast && 'text-foreground font-medium'
                  )}
                >
                  {segment.label}
                </a>
              ) : (
                <span
                  className={cn(
                    isLast && 'text-foreground font-medium'
                  )}
                >
                  {segment.label}
                </span>
              )}
              {!isLast && separator}
            </li>
          )
        })}
      </ol>
    </nav>
  )
} 