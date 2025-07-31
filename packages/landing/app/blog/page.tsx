import { BlogHero } from '@/components/blog/blog-hero'
import { BlogGrid } from '@/components/blog/blog-grid'
import { Divider } from '@/components/divider'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'
import { getArticles, getFeaturedArticles } from '@/utils/strapi'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - AI Testing Insights & Tutorials | Bugninja',
  description: 'Explore the latest insights, tutorials, and best practices in AI-powered automated testing. Learn how to improve your testing workflow with Bugninja.',
  openGraph: {
    title: 'Blog - AI Testing Insights & Tutorials',
    description: 'Explore the latest insights, tutorials, and best practices in AI-powered automated testing. Learn how to improve your testing workflow with Bugninja.',
    type: 'website',
    images: [{
      url: '/seo-image.png',
      width: 1200,
      height: 630,
      alt: 'Bugninja - Fully automated AI-based testing that never sleeps'
    }],
    siteName: 'Bugninja',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - AI Testing Insights & Tutorials',
    description: 'Explore the latest insights, tutorials, and best practices in AI-powered automated testing.',
    images: [{
      url: '/seo-image.png',
      alt: 'Bugninja - Fully automated AI-based testing that never sleeps'
    }],
    site: '@bugninja',
    creator: '@bugninja'
  },
}

async function getBlogData() {
  try {
    const [featuredArticles, articles] = await Promise.all([
      getFeaturedArticles(1),
      getArticles(1, 6)
    ]);

    const featuredArticle = featuredArticles.data[0];
    
    // Filter out the featured article from the grid to avoid duplication
    const gridArticles = featuredArticle 
      ? articles.data.filter(article => article.id !== featuredArticle.id)
      : articles.data;

    return {
      featuredArticle,
      articles: gridArticles
    };
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return {
      featuredArticle: null,
      articles: []
    };
  }
}

export default async function BlogPage() {
  const { featuredArticle, articles } = await getBlogData();

  return (
    <div className="flex min-h-screen flex-col bg-white gap-0">
      <PageHeader />
      <main className="flex-1">
        {featuredArticle && (
          <>
            <BlogHero article={featuredArticle} />
            <Divider />
          </>
        )}
        <BlogGrid articles={articles} />
        <Divider />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
} 