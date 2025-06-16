import { PageHeader } from '@/components/page-header'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader />
      <main className="container mx-auto py-20 px-4 border-l border-r border-border">
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="display-font text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="display-font text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including when you:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Create an account</li>
              <li>Use our services</li>
              <li>Contact our support team</li>
              <li>Subscribe to our newsletter</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="display-font text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide and maintain our services</li>
              <li>Improve and personalize your experience</li>
              <li>Communicate with you about our services</li>
              <li>Protect against fraud and abuse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="display-font text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="display-font text-2xl font-semibold mb-4">4. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="display-font text-2xl font-semibold mb-4">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2">Email: privacy@bugninja.com</p>
            </section>
          </div>
        </div>
      </main>
      <CTASection />
      <Footer />
    </div>
  )
} 