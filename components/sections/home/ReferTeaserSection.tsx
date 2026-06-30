import { RevealSection } from '@/components/motion/RevealSection'
import { CTAButton } from '@/components/ui/CTAButton'
import { Icon } from '@/components/ui/Icon'
import { ReferRewardGraphic } from './ReferRewardGraphic'

const HEADING = 'var(--font-heading)'
const BODY    = 'var(--font-body)'

export function ReferTeaserSection() {
  return (
    <section
      id="refer-teaser"
      aria-label="Refer & Earn"
    >
      <div className="bg-snow-50 mt-16 md:mt-20 lg:mt-24">
        <div className="container-site py-16 md:py-20 lg:py-24">
          <RevealSection>
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-16">

            {/* Copy column */}
            <div className="flex flex-col gap-4 md:max-w-lg">
              <div className="flex items-center gap-2">
                <Icon name="Share2" size="xs" className="text-emerald-500" aria-hidden="true" />
                <span className="eyebrow">Refer &amp; Earn</span>
              </div>

              <h2
                className="max-w-lg text-balance"
                style={{
                  fontFamily: HEADING,
                  fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-charcoal-800)',
                }}
              >
                Know Someone Ready for Their Next Move?
              </h2>

              <p
                className="max-w-md text-slate-600"
                style={{
                  fontFamily: BODY,
                  fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                  lineHeight: 1.7,
                }}
              >
                Refer a friend or colleague — when they&apos;re successfully placed, you&apos;re
                rewarded. Reach out to learn how.
              </p>

              <div className="mt-2">
                <CTAButton
                  label="Know More"
                  href="/refer"
                  size="md"
                  analyticsLocation="refer-teaser"
                />
              </div>
            </div>

            {/* SVG illustration column */}
            <div className="flex-shrink-0 hidden md:block">
              <ReferRewardGraphic />
            </div>

            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}
