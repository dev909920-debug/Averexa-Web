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
    'Meet the team behind Averexa — a dedicated cross-border placement partner helping ambitious professionals land full-time roles in the US and Canada.',
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
