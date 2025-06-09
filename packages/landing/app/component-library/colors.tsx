'use client'

import * as React from 'react'
import { cn } from '@bugninja/shared-ui/lib/utils'

interface ColorSwatchProps {
  label: string
  className: string
  textClassName?: string
}

function ColorSwatch({ label, className, textClassName = "text-foreground" }: ColorSwatchProps) {
  return (
    <div className={cn("rounded-lg p-6", className)}>
      <div className={cn("font-medium", textClassName)}>{label}</div>
    </div>
  )
}

export function ColorsShowcase() {
  return (
    <div className="space-y-8">
      {/* Primary */}
      <div>
        <h3 className="text-lg font-medium">Primary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ColorSwatch label="Primary" className="bg-primary" textClassName="text-primary-foreground" />
          <ColorSwatch label="Light" className="bg-primary/80" textClassName="text-primary-foreground" />
          <ColorSwatch label="Dark" className="bg-primary/90" textClassName="text-primary-foreground" />
        </div>
      </div>

      {/* Secondary */}
      <div>
        <h3 className="text-lg font-medium">Secondary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ColorSwatch label="Secondary" className="bg-secondary" textClassName="text-secondary-foreground" />
          <ColorSwatch label="Light" className="bg-secondary/80" textClassName="text-secondary-foreground" />
          <ColorSwatch label="Dark" className="bg-secondary/90" textClassName="text-secondary-foreground" />
        </div>
      </div>

      {/* Accent */}
      <div>
        <h3 className="text-lg font-medium">Accent</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ColorSwatch label="Accent" className="bg-accent" textClassName="text-accent-foreground" />
          <ColorSwatch label="Light" className="bg-accent/80" textClassName="text-accent-foreground" />
          <ColorSwatch label="Dark" className="bg-accent/90" textClassName="text-accent-foreground" />
        </div>
      </div>

      {/* Neutral */}
      <div>
        <h3 className="text-lg font-medium">Neutral</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ColorSwatch label="Background" className="bg-background border" textClassName="text-foreground" />
          <ColorSwatch label="Foreground" className="bg-foreground" textClassName="text-background" />
          <ColorSwatch label="Muted" className="bg-muted" textClassName="text-muted-foreground" />
          <ColorSwatch label="Card" className="bg-card border" textClassName="text-card-foreground" />
        </div>
      </div>

      {/* Status Colors */}
      <div>
        <h3 className="text-lg font-medium">Status Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ColorSwatch label="Destructive" className="bg-destructive" textClassName="text-destructive-foreground" />
          <ColorSwatch label="Success" className="bg-green-500" textClassName="text-white" />
          <ColorSwatch label="Warning" className="bg-yellow-500" textClassName="text-white" />
        </div>
      </div>
    </div>
  )
} 