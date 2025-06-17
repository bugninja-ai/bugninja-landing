'use client'

import { BlogCard } from './blog-card'
import { cn } from '@bugninja/shared-ui'

interface BlogGridProps {
  articles: {
    title: string
    description: string
    slug: string
    image: string
    date: string
  }[]
  className?: string
}

export function BlogGrid({ articles, className }: BlogGridProps) {
  return (
    <div className={cn("container mx-auto py-20 px-4 border-l border-r border-border border-dashed", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <BlogCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  )
} 