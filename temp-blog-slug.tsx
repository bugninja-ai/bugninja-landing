import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowLeft } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import { getArticles, getArticleBySlug, formatDate, getStrapiImageUrl } from '../../utils/strapi';
import { SingleArticleResponse } from '../../types/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from '../../contexts/ThemeContext';
import { ReactMarkdownProps } from 'react-markdown';

interface ArticlePageProps {
  article: SingleArticleResponse;
}

export default function ArticlePage({ article }: ArticlePageProps) {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  if (!article?.data) {
    return null;
  }

  const { attributes } = article.data;
  const { seo, featuredImage } = attributes;


  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{seo.metaTitle}</title>
        <meta name="title" content={seo.metaTitle} />
        <meta name="description" content={seo.metaDescription} />
        <meta name="keywords" content={seo.keywords} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={seo.canonicalURL} />
        <meta property="og:title" content={seo.metaTitle} />
        <meta property="og:description" content={seo.metaDescription} />
        <meta property="og:image" content={featuredImage?.data?.attributes?.url ? getStrapiImageUrl(featuredImage.data.attributes.url) : ''} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={seo.canonicalURL} />
        <meta property="twitter:title" content={seo.metaTitle} />
        <meta property="twitter:description" content={seo.metaDescription} />
        <meta property="twitter:image" content={featuredImage?.data?.attributes?.url ? getStrapiImageUrl(featuredImage.data.attributes.url) : ''} />

        {/* Canonical URL */}
        <link rel="canonical" href={seo.canonicalURL} />

        {/* Robots */}
        <meta name="robots" content={seo.metaRobots} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.structuredData) }}
        />
      </Head>

      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleTheme} />

      <main className="min-h-screen bg-white dark:bg-gray-900">
        {/* Back to Blog Link */}
        <div className="max-w-3xl mx-auto px-4 pt-24">
          <Link 
            href="/blog"
            className="inline-flex items-center text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to blog
          </Link>
        </div>

        <article className="max-w-3xl mx-auto px-4 pt-8 pb-20">
          {/* Article Header */}
          <header className="mb-12">
            {/* Article Meta */}
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <span className="uppercase tracking-wider">
                {formatDate(attributes.publishDate)}
              </span>
              <span>•</span>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{attributes.readingTime} min read</span>
              </div>
              <span>•</span>
              <span>By {seo.structuredData.author.name}</span>
            </div>

            {/* Article Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {attributes.title}
            </h1>

            {/* Article Summary */}
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {attributes.summary}
            </p>

            {/* Featured Image */}
            {featuredImage?.data?.attributes && (
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-12">
                <Image
                  src={getStrapiImageUrl(featuredImage.data.attributes.url)}
                  alt={featuredImage.data.attributes.alternativeText || attributes.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert prose-primary max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({ node, ...props }: ReactMarkdownProps) => (
                  <div className="my-4 overflow-x-auto">
                    <table className="w-full border-collapse text-left" {...props} />
                  </div>
                ),
                thead: ({ node, ...props }: ReactMarkdownProps) => (
                  <thead className="border-b border-gray-200 dark:border-gray-800" {...props} />
                ),
                tr: ({ node, ...props }: ReactMarkdownProps) => (
                  <tr 
                    className="border-b border-gray-100 dark:border-gray-800/50 last:border-none transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50" 
                    {...props} 
                  />
                ),
                td: ({ node, ...props }: ReactMarkdownProps) => (
                  <td className="py-4 pr-8 text-base align-middle text-gray-700 dark:text-gray-300" {...props} />
                ),
                th: ({ node, ...props }: ReactMarkdownProps) => (
                  <th className="py-4 pr-8 text-base font-medium text-gray-600 dark:text-gray-400" {...props} />
                ),
                a: ({ node, ...props }: ReactMarkdownProps) => (
                  <a 
                    className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 no-underline" 
                    {...props}
                  />
                ),
                p: ({ node, children, ...props }: ReactMarkdownProps) => {
                  // Check if the paragraph contains an image
                  const hasImg = children && Array.isArray(children) && children.some(
                    child => typeof child === 'object' && child && 'type' in child && child.type === 'img'
                  );

                  // If it contains an image, render a div instead of p to avoid invalid nesting
                  if (hasImg) {
                    return (
                      <div className="relative w-full rounded-lg overflow-hidden my-8" {...props}>
                        {children}
                      </div>
                    );
                  }

                  // Otherwise render a normal paragraph
                  return <p className="text-gray-700 dark:text-gray-300" {...props}>{children}</p>;
                },
                h2: ({ node, ...props }: ReactMarkdownProps) => (
                  <h2 className="text-gray-900 dark:text-white" {...props} />
                ),
                h3: ({ node, ...props }: ReactMarkdownProps) => (
                  <h3 className="text-gray-900 dark:text-white" {...props} />
                ),
                h4: ({ node, ...props }: ReactMarkdownProps) => (
                  <h4 className="text-gray-900 dark:text-white" {...props} />
                ),
                ul: ({ node, ...props }: ReactMarkdownProps) => (
                  <ul className="text-gray-700 dark:text-gray-300" {...props} />
                ),
                ol: ({ node, ...props }: ReactMarkdownProps) => (
                  <ol className="text-gray-700 dark:text-gray-300" {...props} />
                ),
                li: ({ node, ...props }: ReactMarkdownProps) => (
                  <li className="text-gray-700 dark:text-gray-300" {...props} />
                ),
                blockquote: ({ node, ...props }: ReactMarkdownProps) => (
                  <blockquote className="border-l-4 border-primary-500 dark:border-primary-400 pl-4 italic text-gray-700 dark:text-gray-300" {...props} />
                ),
                code: ({ node, ...props }: ReactMarkdownProps) => (
                  <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded px-1 py-0.5" {...props} />
                ),
                pre: ({ node, ...props }: ReactMarkdownProps) => (
                  <pre className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded p-4 overflow-x-auto" {...props} />
                ),
                img: ({ node, ...props }: ReactMarkdownProps) => (
                  <img
                    {...props}
                    className="w-full rounded-lg my-8"
                    loading="lazy"
                  />
                ),
              }}
            >
              {attributes.content}
            </ReactMarkdown>
          </div>


          {/* References Section */}
          {attributes.references && attributes.references.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">References</h2>
              <div className="space-y-6">
                {attributes.references.map((reference) => (
                  <div key={reference.id} className="group">
                    <a
                      href={reference.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 mb-2">
                        {reference.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {reference.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                        <span>{reference.authors}</span>
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

          {/* CTAs Section */}
          {attributes.cta && attributes.cta.length > 0 && (
            <div className="mt-5 pt-0 border-gray-200">
              <div className="flex flex-col space-y-4">
                {attributes.cta.map((cta) => {
                  const Icon = cta.icon ? require('lucide-react')[cta.icon] : null;
                  return (
                    <a
                      key={cta.id}
                      href={cta.url}
                      target={cta.newTab ? "_blank" : "_self"}
                      rel={cta.newTab ? "noopener noreferrer" : ""}
                      className={`
                        inline-flex items-center justify-center px-6 py-4 rounded-lg font-medium transition-colors
                        ${cta.type === 'primary' 
                          ? 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700' 
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'}
                      `}
                    >
                      <span>{cta.text}</span>
                      {Icon && <Icon className="ml-2 h-5 w-5" />}
                    </a>
                  );
                })}
              </div>
            </div>
          )}


          {/* Author Bio */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center">
              
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {seo.structuredData.author.name}
                </h3>
              
              </div>
            </div>
          </footer>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getArticles(1, 100);
  
  const paths = articles.data.map((article) => ({
    params: { slug: article.attributes.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const article = await getArticleBySlug(slug);

    return {
      props: {
        article,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}; 