'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/types/blog'
import { getStrapiImageUrl, formatDate } from '@/utils/strapi'

interface BlogGridProps {
  articles: Article[]
}

export function BlogGrid({ articles }: BlogGridProps) {
  return (
    <section className="container mx-auto px-4 py-20 border-l border-r border-dashed border-border bg-white">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Latest Articles</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Insights, updates, and stories from our team
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {articles.map((article) => {
          const { attributes } = article;
          const imageUrl = attributes.featuredImage?.data?.attributes?.url 
            ? getStrapiImageUrl(attributes.featuredImage.data.attributes.url)
            : '/blog/featured-article.jpg';

          return (
            <article key={article.id} className="flex flex-col items-start">
              <div className="relative w-full">
                <Image
                  src={imageUrl}
                  alt={attributes.featuredImage?.data?.attributes?.alternativeText || attributes.title}
                  width={2432}
                  height={1442}
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-1 text-xs text-gray-500">
                  <time dateTime={attributes.publishDate}>
                    {formatDate(attributes.publishDate)}
                  </time>
                  {attributes.author && (
                    <>
                      <span className="mx-1">•</span>
                      <span>By {attributes.author.name}</span>
                    </>
                  )}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/blog/${attributes.slug}`}>
                      <span className="absolute inset-0" />
                      {attributes.title}
                    </Link>
                  </h3>
                  {attributes.categories?.data && attributes.categories.data.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 mb-2">
                      {attributes.categories.data.map(category => (
                        <span
                          key={category.id}
                          className="inline-block bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium"
                        >
                          {category.attributes.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                    {attributes.summary}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  )
} 