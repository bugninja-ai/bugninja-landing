import { PageHeader } from '@/components/page-header'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader />
      <main className="container mx-auto py-20 px-4 border-l border-r border-border">
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="display-font text-4xl font-bold mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="display-font text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using Bugninja&apos;s services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
            </section>

            <section className="mb-8">
              <h2 className="display-font text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p>Bugninja provides AI-powered bug detection and testing services. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.</p>
            </section>

            <section className="mb-8">
              <h2 className="display-font text-2xl font-semibold mb-4">3. User Accounts</h2>
              <p>To use our services, you must:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Be at least 18 years old</li>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="display-font text-2xl font-semibold mb-4">4. Payment Terms</h2>
              <p>For paid subscriptions:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Payments are processed securely through our payment providers</li>
                <li>Subscriptions are billed in advance on a monthly basis</li>
                <li>You can cancel your subscription at any time</li>
                <li>Refunds are handled on a case-by-case basis</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="display-font text-2xl font-semibold mb-4">5. Intellectual Property</h2>
              <p>All content, features, and functionality of our services are owned by Bugninja and are protected by international copyright, trademark, and other intellectual property laws.</p>
            </section>

            <section className="mb-8">
              <h2 className="display-font text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p>Bugninja shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.</p>
            </section>

            <section className="mb-8">
              <h2 className="display-font text-2xl font-semibold mb-4">7. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our website.</p>
            </section>

            <section className="mb-8">
              <h2 className="display-font text-2xl font-semibold mb-4">8. Contact Information</h2>
              <p>For questions about these Terms & Conditions, please contact us at:</p>
              <p className="mt-2">Email: legal@bugninja.com</p>
            </section>
          </div>
        </div>
      </main>
      <CTASection />
      <Footer />
    </div>
  )
} 