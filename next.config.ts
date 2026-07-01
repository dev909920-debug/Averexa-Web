import type { NextConfig } from 'next'

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline'
    https://challenges.cloudflare.com
    https://www.googletagmanager.com
    https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https:;
  font-src 'self';
  frame-src
    https://challenges.cloudflare.com
    https://www.google.com
    https://maps.googleapis.com
    https://maps.gstatic.com
    https://www.youtube.com
    https://www.youtube-nocookie.com;
  connect-src 'self'
    https://challenges.cloudflare.com
    https://www.google-analytics.com
    https://analytics.google.com
    https://www.googletagmanager.com;
  media-src 'self' blob:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim()

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin-allow-popups',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-site',
  },
]

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/s2/favicons/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        // Cache static assets aggressively
        source: '/assets/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  async redirects() {
    return []
  },
}

export default nextConfig
