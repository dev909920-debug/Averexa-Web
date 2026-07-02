import { Icon } from '@/components/ui/Icon'
import { RevealSection } from '@/components/motion/RevealSection'
import { StaggerContainer } from '@/components/motion/StaggerContainer'
import { StaggerItem } from '@/components/motion/StaggerItem'
import type { IconName } from '@/config/icons'

const steps: { icon: IconName; title: string; description: string }[] = [
  {
    icon: 'UserPlus',
    title: 'Refer',
    description:
      'Share the details of a friend or colleague looking for a US or Canada opportunity.',
  },
  {
    icon: 'Users',
    title: 'We Connect',
    description: 'Our team reaches out and guides them through their journey, step by step.',
  },
  {
    icon: 'Award',
    title: "You're Rewarded",
    description: 'When your referral is successfully placed, you earn a reward.',
  },
]

export function ReferStepsSection() {
  return (
    <section id="refer-steps" className="section-padding bg-ink-900 overflow-x-hidden">
      <div className="container-site">
        <RevealSection direction="left">
          <div className="mb-14 flex flex-col items-center gap-4 text-center">
            <span className="eyebrow">How It Works</span>
            <h2 className="text-balance max-w-xl">
              Three Simple{' '}
              <span className="text-gradient">Steps.</span>
            </h2>
            <p className="body-lg max-w-lg text-white/60">
              Helping someone you know take their next big career step has never been easier.
            </p>
          </div>
        </RevealSection>

        <StaggerContainer
          className="grid gap-6 sm:grid-cols-3"
          staggerDelay={0.12}
          delayChildren={0.1}
        >
          {steps.map((step, index) => (
            <StaggerItem key={step.title}>
              <div className="flex h-full flex-col items-center gap-4 rounded-xl border border-white/8 p-8 text-center glass">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <Icon name={step.icon} size="lg" className="text-emerald-500" aria-hidden="true" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-ink-900">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="body-sm text-white/60 leading-relaxed">{step.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <RevealSection direction="right" delay={0.1}>
          <p className="mx-auto mt-12 max-w-2xl text-center body-md text-white/50">
            Refer a friend or colleague and earn a reward. Contact us directly to learn about our
            referral compensation — we&apos;ll walk you through the details personally.
          </p>
        </RevealSection>
      </div>
    </section>
  )
}
