'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/types/blog'
import { getStrapiImageUrl } from '@/utils/strapi'

interface BlogHeroProps {
  article: Article
}

export function BlogHero({ article }: BlogHeroProps) {
  const { attributes } = article;
  const imageUrl = attributes.featuredImage?.data?.attributes?.url 
    ? getStrapiImageUrl(attributes.featuredImage.data.attributes.url)
    : '/blog/featured-article.jpg';

  return (
    <section className="container mx-auto px-4 py-20 border-l border-r border-dashed border-border bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-6">
          {/* Categories above title */}
          {attributes.categories?.data && attributes.categories.data.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            {attributes.title}
          </h1>
          {/* Author above description */}
          {attributes.author?.data && (
            <div className="text-base text-gray-600">
              By {attributes.author.data.attributes.name}
            </div>
          )}
          <p className="text-xl text-gray-700 leading-relaxed">
            {attributes.summary}
          </p>
          <Link
            href={`/blog/${attributes.slug}`}
            className="inline-block rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-600 transition-colors"
          >
            Read more
          </Link>
        </div>
        {/* Image */}
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden w-full max-w-xl mx-auto lg:mx-0">
          <Image
            src={imageUrl}
            alt={attributes.featuredImage?.data?.attributes?.alternativeText || attributes.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  )
} 