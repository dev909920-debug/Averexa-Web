import type { Metadata } from 'next'
import { pageMetadata } from '@/config/seo'
import { LegalDocument, LegalSection } from '@/components/legal/LegalDocument'

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Service',
  description:
    'The terms and conditions governing your use of the Averexa Placement website and services.',
})

export default function TermsPage() {
  return (
    <LegalDocument title="Terms of Service" lastUpdated="27 June 2026">
      <LegalSection heading="1. Acceptance of Terms">
        <p>
          By accessing or using the Averexa Placement website and services, you agree to be bound by
          these Terms of Service. If you do not agree with any part of these terms, please do not use
          our services.
        </p>
      </LegalSection>

      <LegalSection heading="2. Our Services">
        <p>
          Averexa Placement provides career placement consultancy services, including profile review,
          resume optimisation, interview preparation, and connection to potential employers across
          the US and Canada.
        </p>
      </LegalSection>

      <LegalSection heading="3. No Guarantee of Employment">
        <p>
          Averexa Placement is a career placement consultancy. We do not guarantee employment. We
          maximise your opportunity through preparation, advocacy, and access, but final hiring
          decisions rest solely with employers. Where we reference a &ldquo;guaranteed interview,&rdquo;
          this refers to an interview opportunity, not a guarantee of placement.
        </p>
      </LegalSection>

      <LegalSection heading="4. Your Responsibilities">
        <p>You agree to:</p>
        <ul>
          <li>Provide accurate and complete information about yourself.</li>
          <li>Engage with the preparation and process in good faith.</li>
          <li>Use the website and services only for lawful purposes.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="5. Fees">
        <p>
          All applicable service details and fees are communicated clearly and upfront. There are no
          hidden costs or unexpected charges.
        </p>
      </LegalSection>

      <LegalSection heading="6. Intellectual Property">
        <p>
          All content on this website, including text, graphics, logos, and software, is the property
          of Averexa Placement and is protected by applicable intellectual property laws.
        </p>
      </LegalSection>

      <LegalSection heading="7. Limitation of Liability">
        <p>
          To the fullest extent permitted by law, Averexa Placement shall not be liable for any
          indirect, incidental, or consequential damages arising from your use of our services.
        </p>
      </LegalSection>

      <LegalSection heading="8. Contact Us">
        <p>
          For any questions regarding these Terms, please reach out via our{' '}
          <a href="/contact">contact page</a>.
        </p>
      </LegalSection>
    </LegalDocument>
  )
}
