import Image from 'next/image'
import { FAQAccordion } from './FAQAccordion'
import { CTAButton } from '@/components/ui/CTAButton'
import { RevealSection } from '@/components/motion/RevealSection'

export function FAQSection() {
  return (
    <section id="faq" className="relative overflow-hidden section-padding">
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/assets/hero/home/faq-ambient-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0,20,19,0.88)' }}
        />
      </div>

      <div className="container-site relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading */}
          <RevealSection direction="left">
            <div className="flex flex-col gap-6 lg:sticky lg:top-32">
              <span className="eyebrow">Frequently Asked</span>
              <h2 className="text-balance">
                Questions{' '}
                <span className="text-gradient">Answered.</span>
              </h2>
              <p className="body-lg text-white/60 leading-relaxed">
                We believe in full transparency. If you don&apos;t find your answer here, reach out
                and we&apos;ll get back to you promptly.
              </p>
              <CTAButton label="Contact Us" href="/contact" />
            </div>
          </RevealSection>

          {/* Right: accordion */}
          <RevealSection direction="right" delay={0.1}>
            <FAQAccordion />
          </RevealSection>
        </div>
      </div>
    </section>
  )
}
