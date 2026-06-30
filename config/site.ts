export const site = {
  name: 'Averexa Placement',
  description:
    'Averexa Placement helps ambitious professionals land full-time roles with leading employers across the US and Canada — with guaranteed interviews, expert mock prep, and a dedicated recruiter at every step.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://averexaplacement.com',
  tagline: 'Your Career. Across Borders.',
  phone: '+1 (731) 226-6022',
  email: 'hello@averexaplacement.com',
  // wa.me requires digits only, no + or spaces
  whatsapp: '17312266022',
  social: {
    linkedin: 'https://linkedin.com/company/averexa-placement',
    twitter: 'https://twitter.com/averexa',
  },
  address: {
    street: '737 Walker Rd Apt B',
    city: 'Jackson',
    state: 'TN',
    zip: '38305',
    country: 'US',
  },
  legalName: 'Averexa Placement',
  vatNumber: '',
  foundedYear: 2023,
} as const

export type Site = typeof site
