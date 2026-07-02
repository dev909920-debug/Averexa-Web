import { CTAButton } from '@/components/ui/CTAButton'
import { RevealSection } from '@/components/motion/RevealSection'
import { FAQAccordion } from '@/components/sections/home/FAQAccordion'
import { servicesFaqItems } from '@/content/faq'

export function ServicesFAQSection() {
  return (
    <section id="services-faq" className="section-padding bg-ink-900/95 overflow-x-hidden">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <RevealSection direction="left">
            <div className="flex flex-col gap-6 lg:sticky lg:top-32">
              <span className="eyebrow">Common Questions</span>
              <h2 className="text-balance">
                Service{' '}
                <span className="text-gradient">Questions, Answered.</span>
              </h2>
              <p className="body-lg text-white/60 leading-relaxed">
                Still have questions about how our services work? We are always happy to walk you
                through the details — no pressure.
              </p>
              <CTAButton label="Contact Us" href="/contact" />
            </div>
          </RevealSection>

          <RevealSection direction="right" delay={0.1}>
            <FAQAccordion items={servicesFaqItems} />
          </RevealSection>
        </div>
      </div>
    </section>
  )
}
