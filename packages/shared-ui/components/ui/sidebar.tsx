'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'
import Link from 'next/link'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  return (
    <div
      className={cn(
        'flex h-full flex-col bg-background/95',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  children?: React.ReactNode
}

export function SidebarSection({ title, children, className, ...props }: SidebarSectionProps) {
  return (
    <div className={cn('py-2', className)} {...props}>
      {title && (
        <h3 className="mb-2 px-3 text-sm font-medium text-muted-foreground">
          {title}
        </h3>
      )}
      <div className="space-y-1 px-1">
        {children}
      </div>
    </div>
  )
}

interface SidebarItemProps {
  href?: string
  active?: boolean
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
  onClick?: () => void
  prefetch?: boolean
  'data-umami-event'?: string
}

export function SidebarItem({
  href,
  active,
  icon,
  children,
  className,
  onClick,
  prefetch = false,
  'data-umami-event': umamiEvent,
}: SidebarItemProps) {
  const isCollapsed = !children && icon;
  
  const itemClasses = cn(
    'flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors min-h-[40px]',
    isCollapsed ? 'justify-center' : 'gap-3',
    'hover:bg-accent/50 hover:text-accent-foreground',
    active && 'bg-accent-foreground/5 text-accent-foreground',
    !active && 'text-muted-foreground hover:bg-accent-foreground/5',
    className
  )

  if (href) {
    return (
      <Link 
        href={href} 
        prefetch={prefetch} 
        className={itemClasses}
        data-umami-event={umamiEvent}
      >
        {icon && (
          <span className={cn("flex items-center", isCollapsed ? "h-5 w-5" : "h-4 w-4 shrink-0 opacity-70")}>
            {icon}
          </span>
        )}
        {children && <span className="flex items-center">{children}</span>}
      </Link>
    )
  }

  return (
    <button 
      onClick={onClick} 
      className={itemClasses}
      data-umami-event={umamiEvent}
    >
      {icon && (
        <span className={cn("flex items-center", isCollapsed ? "h-5 w-5" : "h-4 w-4 shrink-0 opacity-70")}>
          {icon}
        </span>
      )}
      {children && <span className="flex items-center">{children}</span>}
    </button>
  )
} 