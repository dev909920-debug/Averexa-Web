import { RevealSection } from '@/components/motion/RevealSection'
import { ProcessFlowClient } from './ProcessFlowClient'

export function ProcessFlowSection() {
  return (
    <section id="process-flow" className="section-padding bg-ink-900">
      <div className="container-site">
        <RevealSection direction="left">
          <div className="mb-16 flex flex-col items-center gap-4 text-center">
            <span className="eyebrow">The Candidate Journey</span>
            <h2 className="text-balance max-w-2xl">
              Six Steps to Your{' '}
              <span className="text-gradient">Offer Letter.</span>
            </h2>
            <p className="body-lg max-w-xl text-white/60">
              From your first conversation to your first day on the job — a clear, proven journey
              with you in control the whole way.
            </p>
          </div>
        </RevealSection>

        <ProcessFlowClient />
      </div>
    </section>
  )
}
