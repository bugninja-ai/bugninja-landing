'use client'

import * as React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Pagination } from '@/components/ui/pagination'
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { Sidebar, SidebarSection, SidebarItem } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { ChevronDown, Home, Users, Settings, BarChart } from 'lucide-react'

export function NavigationShowcase() {
  const [currentPage, setCurrentPage] = React.useState(1)

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tabs</h3>
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content for Tab 1</TabsContent>
          <TabsContent value="tab2">Content for Tab 2</TabsContent>
          <TabsContent value="tab3">Content for Tab 3</TabsContent>
        </Tabs>
      </div>

      {/* Breadcrumbs */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Breadcrumbs</h3>
        <Breadcrumb
          segments={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Current Page' },
          ]}
        />
      </div>

      {/* Pagination */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Pagination</h3>
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Dropdown Menu */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Dropdown Menu</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Dropdown Menu
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Item 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation Menu */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Navigation Menu</h3>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                  <NavigationMenuLink asChild>
                    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Introduction</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        A quick tutorial to get you up and running with the system.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                  <NavigationMenuLink asChild>
                    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Documentation</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Learn more about all available components.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Sidebar Navigation */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Sidebar Navigation</h3>
        <div className="rounded-xl border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-hidden">
          <div className="flex h-[400px]">
            <Sidebar className="border-r border-r-accent/10">
              <div className="flex h-14 items-center border-b border-b-accent/10 px-4">
                <span className="text-lg font-semibold">Acme Inc</span>
              </div>
              <div className="flex-1 overflow-auto">
                <SidebarSection title="Menu">
                  <SidebarItem href="/" icon={<Home className="text-sky-500" />} active>
                    Dashboard
                  </SidebarItem>
                  <SidebarItem href="/users" icon={<Users className="text-emerald-500" />}>
                    Customers
                  </SidebarItem>
                  <SidebarItem href="/orders" icon={<BarChart className="text-violet-500" />}>
                    Analytics
                  </SidebarItem>
                  <SidebarItem href="/settings" icon={<Settings className="text-amber-500" />}>
                    Settings
                  </SidebarItem>
                </SidebarSection>
              </div>
            </Sidebar>
            <div className="flex-1 p-6">
              <div className="rounded-lg border-2 border-dashed h-full flex items-center justify-center text-muted-foreground">
                Content area
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Mobile Navigation</h3>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">App Name</span>
            <Button variant="ghost" size="icon">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Mobile Navigation (Click the menu button)
          </div>
        </div>
      </div>
    </div>
  )
} 