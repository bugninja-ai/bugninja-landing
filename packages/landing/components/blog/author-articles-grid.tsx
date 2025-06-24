'use client'

import Link from 'next/link'
import { Article } from '@/types/blog'
import { formatDate } from '@/utils/strapi'

interface AuthorArticlesGridProps {
  articles: Article[]
}

export function AuthorArticlesGrid({ articles }: AuthorArticlesGridProps) {
  if (!articles.length) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-20 border-l border-r border-dashed">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Articles by this author</h2>
        <div className="grid gap-8">
          {articles.map((article) => (
            <article key={article.id} className="group">
              <Link href={`/blog/${article.attributes.slug}`} className="block">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    {formatDate(article.attributes.publishDate)}
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary-600 transition-colors">
                    {article.attributes.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">
                    {article.attributes.summary}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
} 