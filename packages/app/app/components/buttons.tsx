'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Mail, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function ButtonShowcase() {
  const t = useTranslations('components')
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <div className="space-y-8">
      {/* Button Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('buttons.variants.title')}</h3>
        <div className="flex flex-wrap gap-4">
          <Button>{t('buttons.variants.primary')}</Button>
          <Button variant="secondary">{t('buttons.variants.secondary')}</Button>
          <Button variant="outline">{t('buttons.variants.outline')}</Button>
          <Button variant="ghost">{t('buttons.variants.ghost')}</Button>
          <Button variant="tertiary">{t('buttons.variants.tertiary')}</Button>
          <Button variant="destructive">{t('buttons.variants.destructive')}</Button>
        </div>
      </div>

      {/* Icon Buttons */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('buttons.icons.title')}</h3>
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
        <h3 className="text-lg font-medium">{t('buttons.icons.withIcon')}</h3>
        <div className="flex flex-wrap gap-4">
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            {t('buttons.icons.withIcon')}
          </Button>
          <Button variant="secondary">
            <Plus className="mr-2 h-4 w-4" />
            {t('buttons.icons.withIcon')}
          </Button>
        </div>
      </div>

      {/* Button Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Button Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg">{t('buttons.variants.primary')}</Button>
          <Button>{t('buttons.variants.primary')}</Button>
          <Button size="sm">{t('buttons.variants.primary')}</Button>
        </div>
      </div>

      {/* Loading State */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Loading State</h3>
        <div className="flex flex-wrap gap-4">
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('buttons.variants.primary')}
          </Button>
        </div>
      </div>
    </div>
  )
} 