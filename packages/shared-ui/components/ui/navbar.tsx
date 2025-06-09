'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'
import { Search, User, LogOut, ChevronDown, Columns, ScrollText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeSwitcher } from '@/components/providers/theme-switcher'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  logo?: React.ReactNode
  showSearch?: boolean
  onSearchClick?: () => void
  showViewSwitcher?: boolean
}

export function Navbar({ 
  className, 
  children, 
  logo, 
  showSearch = true,
  showViewSwitcher = false,
  onSearchClick,
  ...props 
}: NavbarProps) {
  const [scrolled, setScrolled] = React.useState(false)
  const [viewType, setViewType] = React.useState<'single' | 'split'>('single')

  // Add scroll event listener to the dashboard content area
  React.useEffect(() => {
    const setupScrollListener = () => {
      const dashboardContent = document.getElementById('dashboard-content');
      
      if (!dashboardContent) {
        setTimeout(setupScrollListener, 100);
        return undefined;
      }
      
      const handleScroll = () => {
        const isScrolled = dashboardContent.scrollTop > 10;
        if (isScrolled !== scrolled) {
          setScrolled(isScrolled);
        }
      };
      
      handleScroll();
      
      dashboardContent.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        dashboardContent.removeEventListener('scroll', handleScroll);
      };
    };
    
    const cleanup = setupScrollListener();
    return cleanup;
  }, [scrolled]);

  const handleSignOut = () => {
    // Simplified sign out - can be customized per implementation
    console.log('Sign out clicked')
  }

  return (
    <div
      className={cn(
        'flex h-16 items-center justify-between px-6 bg-background/95 sticky top-0 z-10 transition-all duration-200',
        scrolled ? 'border-b shadow-sm' : '',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        {logo && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                {logo}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem 
                className="cursor-pointer flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer flex items-center gap-2 text-destructive focus:text-destructive"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {children}
      </div>

      <div className="flex items-center gap-2">
        {showSearch && (
          <div className="relative mr-2">
            <Button variant="ghost" size="icon" onClick={onSearchClick}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        )}

        {showViewSwitcher && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                {viewType === 'single' ? (
                  <ScrollText className="h-5 w-5" />
                ) : (
                  <Columns className="h-5 w-5" />
                )}
                <span className="hidden md:inline-flex">View</span>
                <span className="sr-only">Switch View</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setViewType('single')}
              >
                <ScrollText className="mr-2 h-4 w-4" />
                <span>Single Page</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setViewType('split')}
              >
                <Columns className="mr-2 h-4 w-4" />
                <span>Split View</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
        <ThemeSwitcher />
      </div>
    </div>
  )
} 