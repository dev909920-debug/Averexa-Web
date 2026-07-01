import type { Metadata } from 'next'
import { pageMetadata } from '@/config/seo'
import { LegalDocument, LegalSection } from '@/components/legal/LegalDocument'

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Averexa Placement collects, uses, and protects the personal information you share with us.',
})

export default function PrivacyPage() {
  return (
    <LegalDocument title="Privacy Policy" lastUpdated="27 June 2026">
      <LegalSection heading="1. Introduction">
        <p>
          Averexa Placement (&ldquo;Averexa,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, disclose, and safeguard your information when you visit our website or use
          our placement services.
        </p>
      </LegalSection>

      <LegalSection heading="2. Information We Collect">
        <p>We may collect the following categories of information:</p>
        <ul>
          <li>Contact details you provide, such as your name, email address, and phone number.</li>
          <li>Career information, including your target job title and a description of your goals.</li>
          <li>Information about referrals you submit on behalf of others.</li>
          <li>Technical data such as IP address, browser type, and usage analytics.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="3. How We Use Your Information">
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to your enquiries and provide our placement services.</li>
          <li>Match your profile with relevant opportunities and prepare you for interviews.</li>
          <li>Communicate with you about your application and our services.</li>
          <li>Improve our website and understand how visitors use it.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="4. Sharing Your Information">
        <p>
          We do not sell your personal information. We may share relevant details with prospective
          employers as part of delivering our placement services, and with service providers who
          help us operate our business, subject to appropriate safeguards.
        </p>
      </LegalSection>

      <LegalSection heading="5. Data Security">
        <p>
          We implement reasonable technical and organisational measures to protect your information.
          However, no method of transmission over the internet is completely secure, and we cannot
          guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection heading="6. Your Rights">
        <p>
          Depending on your jurisdiction, you may have the right to access, correct, or delete the
          personal information we hold about you. To exercise these rights, please contact us using
          the details below.
        </p>
      </LegalSection>

      <LegalSection heading="7. Contact Us">
        <p>
          If you have any questions about this Privacy Policy, please reach out via our{' '}
          <a href="/contact">contact page</a>.
        </p>
      </LegalSection>
    </LegalDocument>
  )
}
