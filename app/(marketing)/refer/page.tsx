import type { Metadata } from 'next'
import { pageMetadata } from '@/config/seo'
import { ReferHero } from '@/components/sections/refer/ReferHero'
import { ReferStepsSection } from '@/components/sections/refer/ReferStepsSection'
import { ReferralFormSection } from '@/components/sections/refer/ReferralFormSection'
import { CTASection } from '@/components/sections/home/CTASection'

export const metadata: Metadata = pageMetadata({
  title: 'Refer & Earn',
  description:
    'Know someone exceptional? Refer them to Averexa and earn a reward when they are successfully placed in a full-time role across the US and Canada.',
  canonical: '/refer',
  keywords: [
    'refer and earn jobs',
    'referral program career placement',
    'earn money referring friends USA',
    'job referral bonus',
    'placement referral program',
  ],
})

export default function ReferPage() {
  return (
    <main id="main-content">
      <ReferHero />
      <ReferStepsSection />
      <ReferralFormSection />
      <CTASection />
    </main>
  )
}
