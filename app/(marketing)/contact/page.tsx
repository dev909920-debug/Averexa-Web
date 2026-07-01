import type { Metadata } from 'next'
import { pageMetadata } from '@/config/seo'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildLocalBusinessSchema } from '@/lib/schemas/localBusiness'
import { ContactHero } from '@/components/sections/contact/ContactHero'
import { ContactFormSection } from '@/components/sections/contact/ContactFormSection'
import { GoogleMapEmbed } from '@/components/sections/contact/GoogleMapEmbed'

export const metadata: Metadata = pageMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Averexa — whether you are hiring or looking for your next opportunity, we would love to hear from you.',
  canonical: '/contact',
  keywords: [
    'contact career placement agency',
    'book free career consultation',
    'speak to a recruiter',
    'US Canada job inquiry',
    'career consultation booking',
    'placement agency contact',
    'free career advice USA',
  ],
})

export default function ContactPage() {
  return (
    <main>
      <JsonLd schema={buildLocalBusinessSchema()} />
      <ContactHero />
      <ContactFormSection />
      <GoogleMapEmbed />
    </main>
  )
}
