'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'

export function TypographyShowcase() {
  const t = useTranslations('components')

  return (
    <div className="space-y-8">
      {/* Headings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('typography.headings.title')}</h3>
        <div className="space-y-4 bg-muted p-6 rounded-lg">
          <h1 className="text-4xl font-bold">{t('typography.headings.h1')}</h1>
          <h2 className="text-3xl font-bold">{t('typography.headings.h2')}</h2>
          <h3 className="text-2xl font-bold">{t('typography.headings.h3')}</h3>
        </div>
      </div>

      {/* Paragraph */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('typography.paragraph.title')}</h3>
        <div className="bg-muted p-6 rounded-lg">
          <p>{t('typography.paragraph.text')}</p>
        </div>
      </div>

      {/* Text Styles */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('typography.textStyles.title')}</h3>
        <div className="space-y-4 bg-muted p-6 rounded-lg">
          <p>{t('typography.textStyles.regular')}</p>
          <p className="font-bold">{t('typography.textStyles.bold')}</p>
          <p className="italic">{t('typography.textStyles.italic')}</p>
          <p className="underline">{t('typography.textStyles.underline')}</p>
        </div>
      </div>

      {/* Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('typography.links.title')}</h3>
        <div className="bg-muted p-6 rounded-lg">
          <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">{t('typography.links.text')}</a>
        </div>
      </div>

      {/* Lists */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('typography.lists.title')}</h3>
        <div className="grid grid-cols-2 gap-8 bg-muted p-6 rounded-lg">
          <div className="space-y-2">
            <p className="font-medium mb-2">{t('typography.lists.ordered.title')}</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>{t('typography.lists.ordered.item1')}</li>
              <li>{t('typography.lists.ordered.item2')}</li>
              <li>{t('typography.lists.ordered.item3')}</li>
            </ol>
          </div>
          <div className="space-y-2">
            <p className="font-medium mb-2">{t('typography.lists.unordered.title')}</p>
            <ul className="list-disc list-inside space-y-1">
              <li>{t('typography.lists.unordered.item1')}</li>
              <li>{t('typography.lists.unordered.item2')}</li>
              <li>{t('typography.lists.unordered.item3')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Blockquote */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('typography.blockquote.title')}</h3>
        <div className="bg-muted p-6 rounded-lg">
          <blockquote className="border-l-4 border-slate-300 dark:border-slate-600 pl-4 italic">
            {t('typography.blockquote.text')}
          </blockquote>
        </div>
      </div>
    </div>
  )
} 