'use client'

import Image from 'next/image'
import { cn } from '@bugninja/shared-ui'

interface ArticleDetailProps {
  article: {
    title: string
    lead: string
    content: string
    image: string
    date: string
  }
  className?: string
}

export function ArticleDetail({ article, className }: ArticleDetailProps) {
  return (
    <article className={cn("container mx-auto py-20 px-4 border-l border-r border-border border-dashed", className)}>
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="display-font text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>
        <p className="text-xl text-muted-foreground mb-6">{article.lead}</p>
        <div className="text-sm text-muted-foreground">
          {article.date}
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative w-full h-[400px] md:h-[500px] mb-12">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      {/* Content */}
      <div 
        className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  )
} 