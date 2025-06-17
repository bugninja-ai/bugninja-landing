'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@bugninja/shared-ui/components/ui/button'
import { cn } from '@bugninja/shared-ui'

interface BlogHeroProps {
  article: {
    title: string
    description: string
    slug: string
    image: string
    date: string
  }
  className?: string
}

export function BlogHero({ article, className }: BlogHeroProps) {
  return (
    <section className={cn("container mx-auto py-20 px-4 border-l border-r border-border border-dashed", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-6">
          <div className="text-sm text-muted-foreground">
            {article.date}
          </div>
          <h1 className="display-font text-4xl md:text-5xl font-bold tracking-tight">
            {article.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {article.description}
          </p>
          <Button size="default" asChild>
            <Link
              href={`/blog/${article.slug}`}
            >
              Read Article
            </Link>
          </Button>
        </div>

        {/* Image */}
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  )
} 