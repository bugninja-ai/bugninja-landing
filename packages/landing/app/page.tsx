import { PageHeader } from '@/components/page-header'
import { Hero } from '@/components/hero'
import { AboutUs } from '@/components/about-us'
import { Articles } from '@/components/articles'
import { FAQ } from '@/components/faq'
import { Footer } from '../components/footer'
import { CTASection } from '@/components/cta-section'
import { SectionFeatures } from '@/components/section-features'
import { Divider } from '@/components/divider'
import { Pricing } from '@/components/pricing'
import { LogoTicker } from '@/components/logo-ticker'
import { IntegrationsTicker } from '@/components/integrations-ticker'
import { Nvidia } from '@/components/nvidia'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col background text-foreground gap-0">
      <PageHeader />
      <main className="flex-1">
        <Hero />
        <Divider />
        <Nvidia />
        <Divider />
        <LogoTicker />
        <Divider />
        <SectionFeatures />
        <Divider />
        <IntegrationsTicker />
        <Divider />
        <Pricing />
        <Divider />
        <AboutUs />
        <Divider />
        <Articles />
        <Divider />
        <FAQ />
        <Divider />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
} 