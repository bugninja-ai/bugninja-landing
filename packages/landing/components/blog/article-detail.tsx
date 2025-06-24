'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react'
import { SingleArticleResponse } from '@/types/blog'
import { getStrapiImageUrl, formatDate } from '@/utils/strapi'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Divider } from '@/components/divider'

interface ArticleDetailProps {
  article: SingleArticleResponse['data']
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const { attributes } = article;
  
  // Helper functions to handle both data structures
  const getImageUrl = () => {
    if (attributes.featuredImage?.data?.attributes?.url) {
      return getStrapiImageUrl(attributes.featuredImage.data.attributes.url);
    }
    if ((attributes.featuredImage as any)?.url) {
      return getStrapiImageUrl((attributes.featuredImage as any).url);
    }
    return '/blog/featured-article.jpg';
  };

  const getImageAlt = () => {
    if (attributes.featuredImage?.data?.attributes?.alternativeText) {
      return attributes.featuredImage.data.attributes.alternativeText;
    }
    if ((attributes.featuredImage as any)?.alternativeText) {
      return (attributes.featuredImage as any).alternativeText;
    }
    return attributes.title;
  };

  const getAuthorName = () => {
    if (attributes.author?.name) {
      return attributes.author.name;
    }
    return null;
  };

  const getAuthorData = () => {
    if (attributes.author) {
      return attributes.author;
    }
    return null;
  };

  const getAuthorProfilePicture = () => {
    const authorData = getAuthorData();
    if (!authorData?.profilePicture) {
      return '/blog/default-author.jpg';
    }
    // Check if it's a StrapiImage type
    if ('data' in authorData.profilePicture) {
      return getStrapiImageUrl(authorData.profilePicture.data.attributes.url);
    }
    // If it's a simple URL object
    return getStrapiImageUrl(authorData.profilePicture.url);
  };

  const getAuthorSlug = () => {
    const authorData = getAuthorData();
    return authorData?.slug || null;
  };

  const getCategoriesArray = () => {
    if (attributes.categories?.data) {
      return attributes.categories.data;
    }
    if (Array.isArray(attributes.categories)) {
      return attributes.categories as any[];
    }
    return [];
  };

  const getTagsArray = () => {
    if (attributes.tags?.data) {
      return attributes.tags.data;
    }
    if (Array.isArray(attributes.tags)) {
      return attributes.tags as any[];
    }
    return [];
  };

  const imageUrl = getImageUrl();
  const authorName = getAuthorName();
  const authorProfilePicture = getAuthorProfilePicture();
  const authorSlug = getAuthorSlug();
  const categories = getCategoriesArray();
  const tags = getTagsArray();
  const ctas = attributes.cta || [];

  return (
    <>
      <section className="container mx-auto px-4 py-20 border-l border-r border-dashed border-border bg-white">
        {/* Back to Blog Link */}
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/blog"
            className="inline-flex items-center text-base text-gray-500 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to blog
          </Link>
        </div>

        <article className="mx-auto max-w-4xl">
          {/* Article Header */}
          <header className="mb-16">
            {/* Categories above title */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category: any) => (
                  <span
                    key={category.id}
                    className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {category.attributes?.name || category.name}
                  </span>
                ))}
              </div>
            )}

            {/* Article Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {attributes.title}
            </h1>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-base text-gray-600 mb-6">
              <span className="uppercase tracking-wider">
                {formatDate(attributes.publishDate)}
              </span>
              <span className="text-gray-400">•</span>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{attributes.readingTime} min read</span>
              </div>
              {authorName && (
                <>
                  <span className="text-gray-400">•</span>
                  <span>By {authorName}</span>
                </>
              )}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag: any) => (
                  <span
                    key={tag.id}
                    className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag.attributes?.name || tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Article Summary */}
            <p className="text-xl text-gray-700 leading-relaxed mb-12">
              {attributes.summary}
            </p>

            {/* Featured Image */}
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-16 shadow-lg">
              <Image
                src={imageUrl}
                alt={getImageAlt()}
                fill
                className="object-cover"
                priority
              />
            </div>
          </header>
        </article>
      </section>

      {/* Divider spanning full page width */}
      <Divider />

      <section className="container mx-auto px-4 py-20 border-l border-r border-dashed border-border bg-white">
        <article className="mx-auto max-w-4xl">
          {/* Article Content */}
          <div className="prose prose-xl max-w-none prose-gray">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({ node, ...props }) => (
                  <div className="my-8 overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden border border-dashed border-gray-300" {...props} />
                  </div>
                ),
                thead: ({ node, ...props }) => (
                  <thead className="bg-gray-50" {...props} />
                ),
                tr: ({ node, ...props }) => (
                  <tr 
                    className="border-b border-gray-200 last:border-none transition-colors hover:bg-gray-50/50" 
                    {...props} 
                  />
                ),
                td: ({ node, ...props }) => (
                  <td className="py-4 px-6 text-base align-middle text-gray-700" {...props} />
                ),
                th: ({ node, ...props }) => (
                  <th className="py-4 px-6 text-base font-semibold text-gray-900 text-left" {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a 
                    className="text-primary-600 hover:text-primary-700 font-medium underline decoration-primary-200 hover:decoration-primary-400 transition-colors" 
                    {...props}
                  />
                ),
                p: ({ node, children, ...props }) => {
                  const hasImg = children && Array.isArray(children) && children.some(
                    child => typeof child === 'object' && child && 'type' in child && child.type === 'img'
                  );

                  if (hasImg) {
                    return (
                      <div className="relative w-full rounded-xl overflow-hidden my-12" {...props}>
                        {children}
                      </div>
                    );
                  }

                  return <p className="text-xl text-gray-700 leading-relaxed mb-6" {...props}>{children}</p>;
                },
                h2: ({ node, ...props }) => (
                  <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4" {...props} />
                ),
                h4: ({ node, ...props }) => (
                  <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-3" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="text-xl text-gray-700 space-y-2 my-6" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="text-xl text-gray-700 space-y-2 my-6" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="text-xl text-gray-700 leading-relaxed" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-primary-500 bg-primary-50 pl-6 py-4 my-8 italic text-xl text-gray-700 rounded-r-lg" {...props} />
                ),
                code: ({ node, ...props }) => (
                  <code className="bg-gray-100 text-gray-800 rounded px-2 py-1 text-sm font-mono" {...props} />
                ),
                pre: ({ node, ...props }) => (
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto my-8" {...props} />
                ),
                img: ({ node, ...props }) => (
                  <img
                    {...props}
                    className="w-full rounded-xl my-12 shadow-lg"
                    loading="lazy"
                  />
                ),
              }}
            >
              {attributes.content || ''}
            </ReactMarkdown>
          </div>


          {/* CTAs Section */}
          {ctas.length > 0 && (
            <div className="mt-16 pt-8">
              <div className="flex flex-col space-y-4">
                {ctas.map((cta) => (
                  <a
                    key={cta.id}
                    href={cta.url}
                    target={cta.newTab ? "_blank" : "_self"}
                    rel={cta.newTab ? "noopener noreferrer" : ""}
                    className={
                      `inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 ` +
                      (cta.type === 'primary'
                        ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300')
                    }
                  >
                    <span>{cta.text}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* References Section */}
          {attributes.references && attributes.references.length > 0 && (
            <div className="mt-20 pt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">References</h2>
              <div className="grid gap-6">
                {attributes.references.map((reference) => (
                  <div key={reference.id} className="group">
                    <a
                      href={reference.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-6 bg-gray-50 rounded-xl transition-all hover:bg-gray-100 border border-dashed border-gray-300"
                    >
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary-600 mb-3 transition-colors">
                        {reference.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-base leading-relaxed">
                        {reference.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="font-medium">{reference.authors}</span>
                        <span className="mx-2">•</span>
                        <span>{reference.publisher}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(reference.publishDate)}</span>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About the Author Section */}
          {authorName && (
            <div className="mt-20 pt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">About the Author</h2>
              <div className="bg-gray-50 rounded-xl p-8 border border-dashed border-gray-300">
                <div className="flex items-start space-x-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={authorProfilePicture}
                      alt={authorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{authorName}</h3>
                    {getAuthorData()?.role && (
                      <p className="text-base text-gray-600 mb-3">{getAuthorData()?.role}</p>
                    )}
                    {getAuthorData()?.expertise && (
                      <p className="text-base text-gray-500 mb-4">{getAuthorData()?.expertise}</p>
                    )}
                    {authorSlug && (
                      <Link
                        href={`/author/${authorSlug}`}
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors group"
                      >
                        Read more
                        <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>
      </section>
    </>
  )
} 