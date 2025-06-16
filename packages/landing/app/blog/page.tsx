import { BlogHero } from '@/components/blog/blog-hero'
import { BlogGrid } from '@/components/blog/blog-grid'
import { Divider } from '@/components/divider'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'

// This would typically come from a CMS or API
const featuredArticle = {
  title: "The Future of Bug Tracking: AI-Powered Solutions",
  description: "Discover how artificial intelligence is revolutionizing the way we track and manage software bugs, making the process more efficient and accurate than ever before.",
  slug: "future-of-bug-tracking",
  image: "/blog/featured-article.jpg",
  date: "March 15, 2024"
}

const articles = [
  {
    title: "10 Best Practices for Effective Bug Reporting",
    description: "Learn the essential tips and tricks for writing clear, actionable bug reports that help developers fix issues faster.",
    slug: "bug-reporting-best-practices",
    image: "/blog/bug-reporting.jpg",
    date: "March 10, 2024"
  },
  {
    title: "Integrating Bug Tracking into Your CI/CD Pipeline",
    description: "Learn how to seamlessly integrate bug tracking into your continuous integration and deployment workflow for better quality control.",
    slug: "cicd-integration",
    image: "/blog/cicd.jpg",
    date: "March 5, 2024"
  },
  {
    title: "The Psychology of Bug Reporting",
    description: "Understanding the human factors that influence how we report and handle software bugs.",
    slug: "psychology-of-bug-reporting",
    image: "/blog/psychology.jpg",
    date: "February 28, 2024"
  },
  {
    title: "Automated Testing: A Bug Tracker's Best Friend",
    description: "How automated testing complements your bug tracking system for more efficient quality assurance.",
    slug: "automated-testing",
    image: "/blog/testing.jpg",
    date: "February 20, 2024"
  },
  {
    title: "Remote Teams: Bug Tracking Best Practices",
    description: "Essential strategies for effective bug tracking in distributed development teams.",
    slug: "remote-teams-bug-tracking",
    image: "/blog/remote.jpg",
    date: "February 15, 2024"
  },
  {
    title: "The Cost of Poor Bug Tracking",
    description: "Understanding the financial and productivity impact of ineffective bug tracking systems.",
    slug: "cost-of-poor-bug-tracking",
    image: "/blog/cost.jpg",
    date: "February 10, 2024"
  }
]

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col background text-foreground gap-0">
      <PageHeader />
      <main className="flex-1">
        <BlogHero article={featuredArticle} />
        <Divider />
        <BlogGrid articles={articles} />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
} 