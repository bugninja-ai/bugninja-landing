'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from './button'

interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
  ...props
}: PaginationProps) {
  const generatePages = () => {
    const pages: (number | string)[] = []
    const showLeft = currentPage > 2 + siblingCount
    const showRight = currentPage < totalPages - (1 + siblingCount)

    // Always show first page
    pages.push(1)
    
    // Show dots after first page
    if (showLeft) pages.push('...')

    // Show sibling pages
    for (let i = Math.max(2, currentPage - siblingCount); i <= Math.min(totalPages - 1, currentPage + siblingCount); i++) {
      pages.push(i)
    }

    // Show dots before last page
    if (showRight) pages.push('...')

    // Always show last page
    if (totalPages > 1) pages.push(totalPages)

    return pages
  }

  return (
    <nav
      className={cn('flex items-center justify-center gap-1', className)}
      {...props}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
      
      {generatePages().map((page, index) => {
        if (page === '...') {
          return (
            <Button
              key={`ellipsis-${index}`}
              variant="ghost"
              size="icon"
              disabled
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )
        }

        const pageNum = page as number
        return (
          <Button
            key={pageNum}
            variant={currentPage === pageNum ? 'default' : 'outline'}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </Button>
        )
      })}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </nav>
  )
} 