import { ReferralForm } from '@/components/forms/ReferralForm'
import { FadeUp } from '@/components/motion/FadeUp'
import { RevealSection } from '@/components/motion/RevealSection'

export function ReferralFormSection() {
  return (
    <section id="referral-form" className="section-padding bg-ink-900/95 overflow-x-hidden">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <FadeUp delay={0.1}>
            <div className="flex flex-col gap-4 lg:sticky lg:top-32">
              <span className="eyebrow">Make a Referral</span>
              <h2 className="text-balance text-3xl font-bold leading-tight">
                Refer Someone{' '}
                <span className="text-gradient">Today.</span>
              </h2>
              <p className="body-md text-white/60">
                Fill in a few details and our team will take it from there. Your referral stays
                informed, and we&apos;ll personally walk you through your reward.
              </p>
              <p className="body-sm text-white/40">
                🔒 Your information and your referral&apos;s details are private and never shared.
              </p>
            </div>
          </FadeUp>

          <RevealSection direction="right">
            <div className="rounded-2xl border border-white/[0.06] bg-charcoal-800/40 p-6 sm:p-8 backdrop-blur-sm">
              <ReferralForm />
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}
