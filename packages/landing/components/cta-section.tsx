import { CTAButtonOnPrimary } from './cta-button'

export function CTASection() {
  return (
    <section className="w-full bg-[url('/bg-img.png')] bg-cover bg-center py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="display-font text-4xl sm:text-5xl text-white mb-8">
            Get Bugninja for free today
          </h1>
          <CTAButtonOnPrimary href="/demo">
            Get started for free
          </CTAButtonOnPrimary>
        </div>
      </div>
    </section>
  )
} 