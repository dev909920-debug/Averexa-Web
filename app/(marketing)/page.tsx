import type { Metadata } from 'next'
import { pageMetadata } from '@/config/seo'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildFAQSchema } from '@/lib/schemas/faq'
import { faqItems } from '@/content/faq'
import { ScrollProgressBar } from '@/components/sections/home/ScrollProgressBar'
import { HeroSection } from '@/components/sections/home/HeroSection'
import { AboutSummarySection } from '@/components/sections/home/AboutSummarySection'
import { BentoSection } from '@/components/sections/home/BentoSection'
import { ProcessOverviewSection } from '@/components/sections/home/ProcessOverviewSection'
import { StatisticsSection } from '@/components/sections/home/StatisticsSection'
import { ReferTeaserSection } from '@/components/sections/home/ReferTeaserSection'
import { LogoScroller } from '@/components/sections/home/LogoScroller'
import { TestimonialsSection } from '@/components/sections/home/TestimonialsSection'
import { FAQSection } from '@/components/sections/home/FAQSection'
import { BlogPreviewSection } from '@/components/sections/home/BlogPreviewSection'
import { CTASection } from '@/components/sections/home/CTASection'

export const metadata: Metadata = pageMetadata({
  title: 'Averexa Placement — Your Next Career Move Starts Here',
  description:
    'We help ambitious professionals land full-time roles in the US and Canada with guaranteed interviews, expert preparation, and a dedicated recruiter at every step.',
})

export default function HomePage() {
  return (
    <main id="main-content">
      <ScrollProgressBar />
      <JsonLd schema={buildFAQSchema(faqItems)} />
      <HeroSection />
      <AboutSummarySection />
      <BentoSection />
      <ProcessOverviewSection />
      <StatisticsSection />
      <ReferTeaserSection />
      <LogoScroller />
      <TestimonialsSection />
      <FAQSection />
      <BlogPreviewSection />
      <CTASection />
    </main>
  )
}
