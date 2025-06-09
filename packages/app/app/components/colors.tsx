'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface ColorSwatchProps {
  label: string
  className?: string
  textClassName?: string
}

function ColorSwatch({ label, className, textClassName }: ColorSwatchProps) {
  return (
    <div className={cn('h-24 rounded-lg flex items-center px-4', className)}>
      <span className={cn('font-medium', textClassName)}>{label}</span>
    </div>
  )
}

export function ColorsShowcase() {
  const t = useTranslations('components')

  return (
    <div className="space-y-8">
      {/* Primary Colors */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('colors.primary.title')}</h3>
        <div className="grid grid-cols-3 gap-4">
          <ColorSwatch label={t('colors.primary.primary')} className="bg-primary" textClassName="text-primary-foreground" />
          <ColorSwatch label={t('colors.primary.light')} className="bg-primary/80" textClassName="text-primary-foreground" />
          <ColorSwatch label={t('colors.primary.dark')} className="bg-primary/90" textClassName="text-primary-foreground" />
        </div>
      </div>

      {/* Secondary Colors */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('colors.secondary.title')}</h3>
        <div className="grid grid-cols-3 gap-4">
          <ColorSwatch label={t('colors.secondary.secondary')} className="bg-secondary" textClassName="text-secondary-foreground" />
          <ColorSwatch label={t('colors.secondary.light')} className="bg-secondary/80" textClassName="text-secondary-foreground" />
          <ColorSwatch label={t('colors.secondary.dark')} className="bg-secondary/90" textClassName="text-secondary-foreground" />
        </div>
      </div>

      {/* Accent Colors */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('colors.accent.title')}</h3>
        <div className="grid grid-cols-3 gap-4">
          <ColorSwatch label={t('colors.accent.accent')} className="bg-accent" textClassName="text-accent-foreground" />
          <ColorSwatch label={t('colors.accent.light')} className="bg-accent/80" textClassName="text-accent-foreground" />
          <ColorSwatch label={t('colors.accent.dark')} className="bg-accent/90" textClassName="text-accent-foreground" />
        </div>
      </div>

      {/* Neutral Colors */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('colors.neutral.title')}</h3>
        <div className="grid grid-cols-4 gap-4">
          <ColorSwatch label={t('colors.neutral.background')} className="bg-background border" textClassName="text-foreground" />
          <ColorSwatch label={t('colors.neutral.foreground')} className="bg-foreground" textClassName="text-background" />
          <ColorSwatch label={t('colors.neutral.muted')} className="bg-muted" textClassName="text-muted-foreground" />
          <ColorSwatch label={t('colors.neutral.card')} className="bg-card border" textClassName="text-card-foreground" />
        </div>
      </div>

      {/* Status Colors */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('colors.status.title')}</h3>
        <div className="grid grid-cols-4 gap-4">
          <ColorSwatch label={t('colors.status.success')} className="bg-success" textClassName="text-success-foreground" />
          <ColorSwatch label={t('colors.status.error')} className="bg-destructive" textClassName="text-destructive-foreground" />
          <ColorSwatch label={t('colors.status.warning')} className="bg-warning" textClassName="text-warning-foreground" />
          <ColorSwatch label={t('colors.status.info')} className="bg-info" textClassName="text-info-foreground" />
        </div>
      </div>

      {/* Color Usage Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('colors.usage.title')}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-card rounded-lg border">
            <h4 className="font-medium mb-2 text-card-foreground">{t('colors.usage.cardTitle')}</h4>
            <p className="text-muted-foreground mb-4">{t('colors.usage.cardDescription')}</p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">{t('colors.usage.button')}</button>
          </div>
          <div className="p-6 bg-destructive/10 rounded-lg">
            <h4 className="font-medium text-destructive mb-2">{t('colors.usage.errorTitle')}</h4>
            <p className="text-destructive/90">{t('colors.usage.errorDescription')}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 