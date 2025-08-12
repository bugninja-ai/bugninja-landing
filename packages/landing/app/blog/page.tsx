import { BlogHero } from '@/components/blog/blog-hero'
import { BlogGrid } from '@/components/blog/blog-grid'
import { Divider } from '@/components/divider'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'
import { getAllArticles, getFeaturedArticles } from '@/utils/strapi'
import { Metadata } from 'next'

// Force dynamic rendering to always fetch fresh data (works in production too)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    // Get ALL articles without any limits
    const allArticles = await getAllArticles(); // Get ALL articles without pagination
    
    // Find the most recent article by creation date (including hours/minutes)
    const sortedArticles = allArticles.data.sort((a, b) => {
      const dateA = new Date(a.attributes.publishDate || a.attributes.createdAt);
      const dateB = new Date(b.attributes.publishDate || b.attributes.createdAt);
      return dateB.getTime() - dateA.getTime(); // Most recent first
    });
    
    // The most recent article becomes the featured article
    const featuredArticle = sortedArticles[0];
    
    // Filter out the featured article from the grid to avoid duplication
    const gridArticles = sortedArticles.slice(1); // All articles except the most recent

    console.log(`📝 Total articles: ${allArticles.data.length}`);
    console.log(`🎯 Featured article: ${featuredArticle?.attributes?.title || 'None'} (${featuredArticle?.attributes?.publishDate || featuredArticle?.attributes?.createdAt})`);
    console.log(`📋 Grid articles: ${gridArticles.length}`);

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