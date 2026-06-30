import { RevealSection } from '@/components/motion/RevealSection'
import { CTAButton } from '@/components/ui/CTAButton'
import { Icon } from '@/components/ui/Icon'

const HEADING = 'var(--font-heading)' // Plus Jakarta Sans
const BODY    = 'var(--font-body)'    // DM Sans

export function ReferTeaserSection() {
  return (
    <section
      id="refer-teaser"
      aria-label="Refer & Earn"
      className="bg-snow-50"
    >
      <div className="container-site py-10 md:py-14 lg:py-16">
        <RevealSection>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-12">

            {/* Copy column */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Icon name="Share2" size="xs" className="text-emerald-500" aria-hidden="true" />
                <span className="eyebrow">Refer &amp; Earn</span>
              </div>

              <h2
                className="max-w-lg text-balance"
                style={{
                  fontFamily: HEADING,
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  lineHeight: 1.15,
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
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <CTAButton
                label="Know More"
                href="/refer"
                size="md"
                analyticsLocation="refer-teaser"
              />
            </div>

          </div>
        </RevealSection>
      </div>
    </section>
  )
}
