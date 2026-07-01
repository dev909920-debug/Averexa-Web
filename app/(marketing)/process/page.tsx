import type { Metadata } from 'next'
import { pageMetadata } from '@/config/seo'
import { ProcessHero } from '@/components/sections/process/ProcessHero'
import { ProcessFlowSection } from '@/components/sections/process/ProcessFlowSection'
import { CTASection } from '@/components/sections/home/CTASection'

export const metadata: Metadata = pageMetadata({
  title: 'Our Process',
  description:
    'Six steps from profile review to signed offer letter — a transparent, proven candidate journey built for confidence at every stage of your US & Canada career move.',
  canonical: '/process',
  keywords: [
    'job placement process steps',
    'how to get a job in USA',
    'how to get a job in Canada',
    'career placement process',
    'resume to offer letter steps',
    'interview coaching process',
    'resume optimization process',
    'job search step by step USA',
    'candidate journey placement',
  ],
})

export default function ProcessPage() {
  return (
    <main id="main-content">
      <ProcessHero />
      <ProcessFlowSection />
      <CTASection />
    </main>
  )
}
