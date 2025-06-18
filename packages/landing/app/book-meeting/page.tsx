import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { H2Wrapper } from '@/components/h2-wrapper'
import { Divider } from '@/components/divider'
import Script from 'next/script'

export const metadata = {
  title: 'Book a Meeting - Bugninja',
  description: 'Schedule a meeting with our team to discuss how Bugninja can help with your automated testing needs.',
}

export default function BookMeetingPage() {
  return (
    <div className="flex min-h-screen flex-col background text-foreground gap-0">
      <PageHeader />
      <main className="flex-1">
        <section className="container mx-auto py-20 px-4 border-l border-r border-dashed">
          <div className="flex justify-center mb-12">
            <H2Wrapper>
              <h1 className="display-font text-4xl font-bold text-center">Book a Meeting</h1>
            </H2Wrapper>
          </div>
          
          <div className="max-w-4xl mx-auto text-center mb-8">
            <p className="text-lg text-muted-foreground mb-4">
              Ready to transform your testing workflow? Schedule a 30-minute call with our team to discuss how Bugninja can help automate your QA process.
            </p>          </div>

          <div className="max-w-4xl mx-auto">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/tamas-imets/30min?hide_event_type_details=1&hide_gdpr_banner=1" 
              style={{ minWidth: '320px', height: '1000px' }}
            />
          </div>
        </section>
      </main>
      <Divider />
      <Footer />
      
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="afterInteractive"
      />
      <Divider />
    </div>
  )
} 