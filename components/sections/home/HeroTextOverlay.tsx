'use client'

import { motion } from 'motion/react'
import { CTAButton } from '@/components/ui/CTAButton'
import { OutlineButton } from '@/components/ui/OutlineButton'
import { staggerItem } from '@/lib/motion'

const trustItems = [
  '120+ Placements',
  '90% Success Rate',
  '3+ Years Experience',
  'US & Canada Focus',
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.8,
    },
  },
}

// Font families surfaced as constants so the intent is readable at a glance.
const SERIF = 'var(--font-display)'   // Instrument Serif — editorial, italic display
const SANS  = 'var(--font-heading)'   // Plus Jakarta Sans — confident geometric headings

export function HeroTextOverlay() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="absolute inset-0"
    >
      {/* ── Headline — top center ──────────────────────────────────────────
          Typographic split: "Your Next" and "Move Starts Here." are set
          in Plus Jakarta Sans 700 (modern, authoritative). "Career" breaks
          into Instrument Serif 400 italic — the editorial serif contrast
          signals the word that matters most, like a luxury brand masthead.
          ─────────────────────────────────────────────────────────────── */}
      <div className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none">
        <motion.h1
          variants={staggerItem}
          className="text-center"
        >
          {/* Line 1: "Your Next Career" — sans/serif contrast */}
          <span
            className="block text-white"
            style={{
              fontSize: 'clamp(2.75rem, 6.5vw + 0.25rem, 7rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
            }}
          >
            {/* "Your Next" — Plus Jakarta Sans bold */}
            <span style={{ fontFamily: SANS, fontWeight: 700 }}>
              Your Next{' '}
            </span>
            {/* "Career" — Instrument Serif italic: the typographic signature */}
            <span
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontStyle: 'italic',
                letterSpacing: '-0.01em',
              }}
            >
              Career
            </span>
          </span>

          {/* Line 2: "Move Starts Here." — all Plus Jakarta Sans */}
          <span
            className="block text-white"
            style={{
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: 'clamp(2.75rem, 6.5vw + 0.25rem, 7rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.032em',
              marginTop: '-0.04em',
            }}
          >
            Move{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #1A8A71, #B5EACC)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Starts Here.
            </span>
          </span>
        </motion.h1>
      </div>

      {/* ── Description — bottom left ─────────────────────────────────── */}
      <motion.div
        variants={staggerItem}
        className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px]"
      >
        <p
          className="text-white/80 leading-relaxed"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            lineHeight: 1.7,
          }}
        >
          We help ambitious professionals land full-time roles with leading employers across the US and
          Canada — with guaranteed interviews, expert preparation, and a dedicated recruiter at every
          step.
        </p>
      </motion.div>

      {/* ── CTA — bottom right ───────────────────────────────────────────── */}
      <motion.div
        variants={staggerItem}
        className="absolute bottom-20 sm:bottom-24 right-5 sm:right-10 md:right-14 max-w-[260px] flex flex-col items-end sm:items-start gap-5"
      >
        <div className="flex flex-col items-end sm:items-start gap-3">
          <CTAButton label="Book a Free Consultation" href="/contact" size="md" />
          <OutlineButton label="Start Your Journey" href="/process" />
        </div>
      </motion.div>

      {/* ── Trust strip — bottom center ──────────────────────────────────── */}
      <motion.div
        variants={staggerItem}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center gap-x-3 gap-y-2 flex-wrap md:flex-nowrap md:gap-x-5"
      >
        {trustItems.map((item) => (
          <span
            key={item}
            className="flex items-center gap-1.5 text-white/60"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              letterSpacing: '0.01em',
            }}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 1.4 }}
              className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                <path d="M1.5 4L3.5 6L6.5 2" stroke="#1A8A71" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
            {item}
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}
