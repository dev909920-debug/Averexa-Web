import type { Metadata } from 'next'
import { site } from './site'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    'US job placement',
    'Canada job placement',
    'career placement consultancy',
    'US visa jobs',
    'H1B job placement',
    'work authorization jobs USA',
    'interview preparation USA',
    'resume optimization ATS',
    'full-time placement US Canada',
    'cross-border careers',
    'job placement agency',
    'IT staffing USA',
    'tech job placement',
    'guaranteed interviews',
    'career coaching USA Canada',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: site.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@averexa',
    creator: '@averexa',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export function pageMetadata(
  overrides: Partial<Metadata> & { keywords?: string[]; canonical?: string },
): Metadata {
  const { canonical, keywords, ...rest } = overrides
  return {
    ...defaultMetadata,
    ...rest,
    ...(keywords && { keywords }),
    ...(canonical && { alternates: { canonical } }),
  }
}
