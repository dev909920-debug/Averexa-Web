import type { Metadata } from 'next'
import { pageMetadata } from '@/config/seo'
import { AboutHero } from '@/components/sections/about/AboutHero'
import { AboutMissionSection } from '@/components/sections/about/AboutMissionSection'
import { CoreValuesSection } from '@/components/sections/about/CoreValuesSection'
import { MilestoneTimeline } from '@/components/sections/about/MilestoneTimeline'
import { EmployerNetworkSection } from '@/components/sections/about/EmployerNetworkSection'
import { CTASection } from '@/components/sections/home/CTASection'

export const metadata: Metadata = pageMetadata({
  title: 'About Us',
  description:
    'Meet Averexa Placement your dedicated cross-border career partner helping professionals land full-time jobs in the US and Canada with guaranteed interviews.',
  canonical: '/about',
  keywords: [
    'about Averexa Placement',
    'career placement company USA',
    'cross-border career partner',
    'job placement agency team',
    'US Canada career consultancy',
    'placement firm for immigrants',
    'professional recruiting company',
    'career success story',
    'best placement agency US Canada',
    'how placement agencies work USA',
  ],
})

export default function AboutPage() {
  return (
    <main id="main-content">
      <AboutHero />
      <AboutMissionSection />
      <CoreValuesSection />
      <MilestoneTimeline />
      <EmployerNetworkSection />
      <CTASection />
    </main>
  )
}
