'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { CTAButton } from '@/components/ui/CTAButton'
import type { IconName } from '@/config/icons'

const NAVIGATE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Process', href: '/process' },
  { label: 'Services', href: '/services' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Refer & Earn', href: '/refer' },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
]

const CONNECT_LINKS: { label: string; href: string; icon: IconName; external: boolean }[] = [
  { label: 'Email Us', href: 'mailto:contact@averexaplacement.com', icon: 'Mail', external: false },
  { label: 'WhatsApp', href: 'https://wa.me/17312266022', icon: 'MessageCircle', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'Linkedin', external: true },
]

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.58rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.25)',
}

const LINK_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.875rem',
}

const ease = [0.16, 1, 0.3, 1] as const

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-near-black" role="contentinfo">

      {/* Top accent glow line */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, transparent 0%, rgba(26,138,113,0.45) 30%, rgba(181,234,204,0.6) 50%, rgba(26,138,113,0.45) 70%, transparent 100%)',
        }}
      />

      {/* ── Pre-footer editorial statement ───────────────────── */}
      <div className="border-b border-white/[0.05]">
        <div className="container-site py-20 md:py-28">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16">

            {/* Left — big editorial statement */}
            <motion.div
              className="min-w-0"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease }}
            >
              {/* "Let's talk" label */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="block h-px w-8 shrink-0"
                  style={{ background: '#1A8A71' }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.26em',
                    textTransform: 'uppercase',
                    color: 'rgba(26,138,113,0.8)',
                  }}
                >
                  Let&rsquo;s talk
                </span>
              </div>

              {/* Big editorial headline */}
              <h2
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: 'clamp(2.6rem, 5.5vw, 6.4rem)',
                  fontWeight: 700,
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                }}
              >
                <span className="block text-white">Your next chapter</span>
                <span
                  className="block"
                  style={{
                    background: 'linear-gradient(135deg, #B5EACC 0%, #1A8A71 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  starts here.
                </span>
              </h2>
            </motion.div>

            {/* Right — CTA */}
            <motion.div
              className="shrink-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.2, ease }}
            >
              <CTAButton label="Book a Free Consultation" href="/contact" size="lg" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── 4-column link grid ────────────────────────────────── */}
      <div className="relative z-10 border-b border-white/[0.05]">
        <div className="container-site py-14">
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-16">

            {/* Brand */}
            <div className="col-span-2 flex flex-col gap-5 lg:col-span-1">
              <Link href="/" aria-label="Averexa Placement — Home" className="inline-flex">
                <Image
                  src="/brand/logo.svg"
                  alt="Averexa Placement"
                  width={112}
                  height={112}
                  className="h-28 w-auto"
                />
              </Link>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.38)',
                  lineHeight: 1.75,
                  maxWidth: '26ch',
                }}
              >
                Full-time US &amp; Canada placements for ambitious professionals worldwide.
              </p>
            </div>

            {/* Navigate */}
            <div className="flex flex-col gap-5">
              <span style={LABEL_STYLE}>Navigate</span>
              <nav aria-label="Footer navigation">
                <ul className="flex flex-col gap-3">
                  {NAVIGATE_LINKS.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        style={LINK_STYLE}
                        className="text-white/45 transition-colors duration-200 hover:text-white"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Connect */}
            <div className="flex flex-col gap-5">
              <span style={LABEL_STYLE}>Connect</span>
              <ul className="flex flex-col gap-3">
                {CONNECT_LINKS.map(({ label, href, icon, external }) => (
                  <li key={href}>
                    <a
                      href={href}
                      style={LINK_STYLE}
                      className="flex items-center gap-2 text-white/45 transition-colors duration-200 hover:text-white"
                      {...(external
                        ? { target: '_blank', rel: 'noopener noreferrer', 'aria-label': label }
                        : {})}
                    >
                      <Icon name={icon} size="sm" aria-hidden="true" />
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-5">
              <span style={LABEL_STYLE}>Legal</span>
              <ul className="flex flex-col gap-3">
                {LEGAL_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      style={LINK_STYLE}
                      className="text-white/45 transition-colors duration-200 hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────── */}
      <div className="relative z-10">
        <div className="container-site flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.18)',
            }}
          >
            &copy; {currentYear} Averexa Placement. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.14)',
              maxWidth: '52ch',
              textAlign: 'right',
            }}
          >
            Career placement consultancy. Results vary. See our{' '}
            <Link
              href="/terms"
              className="underline decoration-white/20 underline-offset-2 hover:text-white/35 transition-colors duration-200"
            >
              Terms
            </Link>{' '}
            for details.
          </p>
        </div>
      </div>

      {/* AVEREXA giant watermark — architectural background element */}
      <div className="pt-6 pb-8 md:pt-10 md:pb-12">
        <p
          className="select-none text-center whitespace-nowrap cursor-default"
          style={{
            fontSize: 'clamp(48px, 12vw, 200px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(26,138,113,0.07)',
            fontWeight: 900,
            fontFamily: 'var(--font-clash, system-ui, sans-serif)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          {'AVEREXA'.split('').map((char, i) => (
            <motion.span
              key={i}
              className="watermark-char inline-block"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.3, ease }}
            >
              {char}
            </motion.span>
          ))}
        </p>
      </div>

      <style>{`
        .watermark-char {
          transition: color 0.3s ease, -webkit-text-stroke 0.3s ease;
        }
        .watermark-char:hover {
          color: rgba(26,138,113,0.3);
          -webkit-text-stroke: 2px rgba(26,138,113,0.55);
        }
      `}</style>
    </footer>
  )
}
