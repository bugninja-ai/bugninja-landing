import { cn } from '@bugninja/shared-ui'
import { PageHeader } from '@/components/page-header'
import { Hero } from '@/components/hero'
import { LogoTicker } from '@/components/logo-ticker'
import { BentoGrid } from '@/components/bento-grid'
import { Pricing } from '../components/pricing'
import { AboutUs } from '@/components/about-us'
import { Articles } from '../components/articles'
import { Divider } from '@/components/divider'
import { FAQ } from '@/components/faq'
import { Footer } from '../components/footer'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col background text-foreground gap-0">
      <PageHeader />
      <Hero />
      <Divider />
      <LogoTicker />
      <Divider />
      <BentoGrid />
      <Divider />
      <Pricing />
      <Divider />
      <AboutUs />
      <Divider />
      <Articles />
      <Divider />
      <FAQ />
      <Footer />
    </div>
  )
} 