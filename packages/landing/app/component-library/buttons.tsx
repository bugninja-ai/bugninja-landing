'use client'

import * as React from 'react'
import { Button } from '@bugninja/shared-ui/components/ui/button'
import { Plus, Trash2, Mail, Loader2 } from 'lucide-react'

export function ButtonShowcase() {
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <div className="space-y-8">
      {/* Button Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>

      {/* Icon Buttons */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Icon Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="default" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Button with Icon */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Buttons with Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
          <Button variant="secondary">
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Button Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Button Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg">Large</Button>
          <Button>Default</Button>
          <Button size="sm">Small</Button>
        </div>
      </div>

      {/* Loading State */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Loading State</h3>
        <div className="flex flex-wrap gap-4">
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </Button>
        </div>
      </div>
    </div>
  )
} 