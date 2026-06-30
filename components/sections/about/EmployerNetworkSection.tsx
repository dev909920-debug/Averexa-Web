import Image from 'next/image'
import { RevealSection } from '@/components/motion/RevealSection'

export function EmployerNetworkSection() {
  return (
    <section id="employer-network" className="section-padding bg-ink-900/95">
      <div className="container-site">
        <RevealSection direction="right">
          <div className="mb-10 flex flex-col items-center gap-4 text-center">
            <span className="eyebrow">Our Network</span>
            <h2 className="text-balance max-w-2xl">
              Connecting You With{' '}
              <span className="text-gradient">Leading Employers.</span>
            </h2>
            <p className="body-lg max-w-xl text-white/60">
              We have built relationships with employers across technology, finance, healthcare, and
              beyond — so your profile reaches the right people.
            </p>
          </div>
        </RevealSection>

        <RevealSection direction="left" delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl border border-white/8">
            <div className="relative h-72 sm:h-96">
              <Image
                src="/assets/hero/about/employer-network.png"
                alt="Professional networking and employer connections"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(0,20,19,0.3) 0%, rgba(0,20,19,0.7) 100%)',
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
