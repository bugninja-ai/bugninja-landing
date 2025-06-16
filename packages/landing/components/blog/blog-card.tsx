'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@bugninja/shared-ui'

interface BlogCardProps {
  article: {
    title: string
    description: string
    slug: string
    image: string
    date: string
  }
  className?: string
}

export function BlogCard({ article, className }: BlogCardProps) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/blog/${article.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[16/9] mb-4 rounded-lg overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            {article.date}
          </div>
          <h3 className="text-xl font-semibold group-hover:text-primary-800 transition-colors">
            {article.title}
          </h3>
          <p className="text-muted-foreground line-clamp-2">
            {article.description}
          </p>
        </div>
      </Link>
    </article>
  )
} 