import { ArticleDetail } from '@/components/blog/article-detail'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { notFound } from 'next/navigation'
import { Divider } from '@/components/divider'
import { getArticleBySlug } from '@/utils/strapi'
import { Metadata } from 'next'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

async function getArticle(slug: string) {
  try {
    const article = await getArticleBySlug(slug);
    return article;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticle(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found | Bugninja',
      description: 'The requested article could not be found.',
    };
  }

  const { attributes } = article.data;
  const seo = attributes.seo;
  
  // Handle both data structures for featured image
  const imageUrl = attributes.featuredImage?.data?.attributes?.url 
    || (attributes.featuredImage as any)?.url
    || null;
    
  const fullImageUrl = imageUrl ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}` : null;

  // Construct the canonical URL using the clean slug
  const baseUrl = 'https://bugninja.ai';
  const canonicalUrl = `${baseUrl}/blog/${params.slug}`;

  // Get author name safely
  const authorName = attributes.author?.name || 'Bugninja';

  return {
    title: seo?.metaTitle || attributes.title,
    description: seo?.metaDescription || attributes.summary,
    keywords: seo?.keywords,
    robots: seo?.metaRobots || 'index, follow',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo?.metaTitle || attributes.title,
      description: seo?.metaDescription || attributes.summary,
      type: 'article',
      publishedTime: attributes.publishDate,
      modifiedTime: attributes.updateDate,
      authors: [authorName],
      url: canonicalUrl,
      images: fullImageUrl ? [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: `Featured image for ${attributes.title}`,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.metaTitle || attributes.title,
      description: seo?.metaDescription || attributes.summary,
      images: fullImageUrl ? [fullImageUrl] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug);
  if (!article) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-white gap-0">
      <PageHeader />
      <main className="flex-1">
        <ArticleDetail article={article.data} />
      </main>
      <Divider />
      <Footer />
    </div>
  )
} 