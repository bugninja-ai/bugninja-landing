'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import * as Tabs from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ButtonShowcase } from '../components/buttons'
import { NavigationShowcase } from '../components/navigation'
import { TypographyShowcase } from '../components/typography'
import { ColorsShowcase } from '../components/colors'
import { FormShowcase } from '../components/forms'
import { FeedbackShowcase } from '../components/feedback'
import { DataDisplayShowcase } from '../components/data-display'
import { MediaShowcase } from '../components/media'
import { LanguageSwitcher } from '@/components/providers/language-switcher'
import { ThemeSwitcher } from '@/components/providers/theme-switcher'

export default function ComponentLibrary() {
  const t = useTranslations('components')

  const tabs = [
    { id: 'overview', label: t('navigation.overview') },
    { id: 'typography', label: t('navigation.typography') },
    { id: 'colors', label: t('navigation.colors') },
    { id: 'buttons', label: t('navigation.buttons') },
    { id: 'forms', label: t('navigation.forms') },
    { id: 'navigation', label: t('navigation.navigation') },
    { id: 'feedback', label: t('navigation.feedback') },
    { id: 'data', label: t('navigation.data') },
    { id: 'media', label: t('navigation.media') },
  ]

  return (
    <div className="container py-10">
      <div className="flex justify-end gap-4 mb-8">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">{t('common.componentLibrary')}</h1>
        <p className="text-gray-500">{t('common.welcomeMessage')}</p>
      </div>
      
      <Tabs.Root defaultValue="overview">
        <Tabs.List className="flex items-center justify-center space-x-1 rounded-lg bg-muted p-1 mb-8">
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-colors text-muted-foreground',
                'hover:bg-background/50 hover:text-foreground',
                'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'
              )}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <div className="mt-6">
          <Tabs.Content value="overview" className="space-y-4">
            <h2 className="text-2xl font-semibold">{t('navigation.overview')}</h2>
            <p>{t('common.welcomeMessage')}</p>
          </Tabs.Content>

          <Tabs.Content value="typography" className="space-y-4">
            <h2 className="text-2xl font-semibold">{t('navigation.typography')}</h2>
            <TypographyShowcase />
          </Tabs.Content>

          <Tabs.Content value="colors" className="space-y-4">
            <h2 className="text-2xl font-semibold">{t('navigation.colors')}</h2>
            <ColorsShowcase />
          </Tabs.Content>

          <Tabs.Content value="buttons" className="space-y-4">
            <h2 className="text-2xl font-semibold">{t('navigation.buttons')}</h2>
            <ButtonShowcase />
          </Tabs.Content>

          <Tabs.Content value="forms" className="space-y-4">
            <h2 className="text-2xl font-semibold">{t('navigation.forms')}</h2>
            <FormShowcase />
          </Tabs.Content>

          <Tabs.Content value="navigation" className="space-y-4">
            <h2 className="text-2xl font-semibold">{t('navigation.navigation')}</h2>
            <NavigationShowcase />
          </Tabs.Content>

          <Tabs.Content value="feedback" className="space-y-4">
            <h2 className="text-2xl font-semibold">{t('navigation.feedback')}</h2>
            <FeedbackShowcase />
          </Tabs.Content>

          <Tabs.Content value="data" className="space-y-4">
            <h2 className="text-2xl font-semibold">{t('navigation.data')}</h2>
            <DataDisplayShowcase />
          </Tabs.Content>

          <Tabs.Content value="media" className="space-y-4">
            <h2 className="text-2xl font-semibold">{t('navigation.media')}</h2>
            <MediaShowcase />
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  )
} 