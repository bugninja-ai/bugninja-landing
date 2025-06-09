'use client'

import * as React from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { cn } from '@bugninja/shared-ui/lib/utils'
import { ThemeSwitcher } from '@bugninja/shared-ui/components/providers/theme-switcher'
import { ButtonShowcase } from './buttons'
import { NavigationShowcase } from './navigation'
import { TypographyShowcase } from './typography'
import { ColorsShowcase } from './colors'
import { FormShowcase } from './forms'
import { FeedbackShowcase } from './feedback'
import { DataDisplayShowcase } from './data-display'
import { MediaShowcase } from './media'

export default function ComponentLibrary() {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'typography', label: 'Typography' },
    { id: 'colors', label: 'Colors' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'forms', label: 'Form elements' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'data', label: 'Data display' },
    { id: 'media', label: 'Media' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Header with theme switcher */}
        <div className="flex justify-end mb-10">
          <ThemeSwitcher />
        </div>
        
        {/* Page title and description */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Component Library</h1>
          <p className="text-muted-foreground text-xl max-w-4xl mx-auto leading-relaxed">
            Welcome to our component library. This library showcases all the available UI components and their variations.
          </p>
        </div>
        
        {/* Tabs */}
        <Tabs.Root defaultValue="overview" className="w-full">
          <Tabs.List className="flex items-center justify-center flex-wrap gap-2 rounded-lg bg-muted p-2 mb-12 mx-auto">
            {tabs.map((tab) => (
              <Tabs.Trigger
                key={tab.id}
                value={tab.id}
                                  className={cn(
                    'px-6 py-2 text-sm font-medium rounded-md transition-colors text-muted-foreground',
                    'hover:bg-background/50 hover:text-foreground',
                    'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'
                  )}
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {/* Tab content */}
          <div className="w-full">
            <Tabs.Content value="overview" className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-semibold mb-6">Overview</h2>
                <p className="text-muted-foreground text-lg max-w-5xl mx-auto leading-relaxed">
                  Explore our comprehensive collection of UI components built with React, TypeScript, and Tailwind CSS. 
                  Each component is designed with accessibility, performance, and developer experience in mind.
                </p>
              </div>
            </Tabs.Content>

            <Tabs.Content value="typography" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-semibold mb-4">Typography</h2>
                <p className="text-muted-foreground text-lg">Text styles, headings, and typography components</p>
              </div>
              <TypographyShowcase />
            </Tabs.Content>

            <Tabs.Content value="colors" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-semibold mb-4">Colors</h2>
                <p className="text-muted-foreground text-lg">Color palette and theme colors</p>
              </div>
              <ColorsShowcase />
            </Tabs.Content>

            <Tabs.Content value="buttons" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-semibold mb-4">Buttons</h2>
                <p className="text-muted-foreground text-lg">Interactive button components with various styles and states</p>
              </div>
              <ButtonShowcase />
            </Tabs.Content>

            <Tabs.Content value="forms" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-semibold mb-4">Form Elements</h2>
                <p className="text-muted-foreground text-lg">Input fields, forms, and form validation components</p>
              </div>
              <FormShowcase />
            </Tabs.Content>

            <Tabs.Content value="navigation" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-semibold mb-4">Navigation</h2>
                <p className="text-muted-foreground text-lg">Navigation components and breadcrumbs</p>
              </div>
              <NavigationShowcase />
            </Tabs.Content>

            <Tabs.Content value="feedback" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-semibold mb-4">Feedback</h2>
                <p className="text-muted-foreground text-lg">Alerts, toasts, modals, and user feedback components</p>
              </div>
              <FeedbackShowcase />
            </Tabs.Content>

            <Tabs.Content value="data" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-semibold mb-4">Data Display</h2>
                <p className="text-muted-foreground text-lg">Tables, cards, lists, and data presentation components</p>
              </div>
              <DataDisplayShowcase />
            </Tabs.Content>

            <Tabs.Content value="media" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-semibold mb-4">Media</h2>
                <p className="text-muted-foreground text-lg">Images, avatars, icons, and media components</p>
              </div>
              <MediaShowcase />
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </div>
    </div>
  )
} 