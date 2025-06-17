import { BlogHero } from '@/components/blog/blog-hero'
import { BlogGrid } from '@/components/blog/blog-grid'
import { Divider } from '@/components/divider'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'
import { getArticles, getFeaturedArticles } from '@/utils/strapi'

async function getBlogData() {
  try {
    const [featuredArticles, articles] = await Promise.all([
      getFeaturedArticles(1),
      getArticles(1, 6)
    ]);

    return {
      featuredArticle: featuredArticles.data[0],
      articles: articles.data
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