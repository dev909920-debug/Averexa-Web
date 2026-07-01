'use client'

import { useRef } from 'react'
import { motion } from 'motion/react'
import { CTAButton } from '@/components/ui/CTAButton'
import { OutlineButton } from '@/components/ui/OutlineButton'
import { Icon } from '@/components/ui/Icon'
import { RevealSection } from '@/components/motion/RevealSection'
import { AuroraBackground } from '@/components/motion/AuroraBackground'
import type { IconName } from '@/config/icons'

type TickerItem = {
  label: string
  icon: IconName
}

const tickerItems: TickerItem[] = [
  { label: '120+ Placements', icon: 'Award' },
  { label: '90% Success Rate', icon: 'TrendingUp' },
  { label: '3+ Years Experience', icon: 'Clock' },
  { label: 'US & Canada Focus', icon: 'Globe' },
  { label: 'Guaranteed Interviews', icon: 'CheckCircle' },
  { label: 'Expert Guidance', icon: 'Target' },
  { label: 'Dedicated Recruiters', icon: 'Users' },
]

const headingWords = 'Ready to Start Your Journey?'.split(' ')

const ease = [0.16, 1, 0.3, 1] as const

export function CTASection() {
  const tickerRef = useRef<HTMLDivElement>(null)

  return (
    <AuroraBackground>
      <section id="cta" className="relative overflow-hidden section-padding bg-near-black">

        {/* Subtle warm gradient overlay for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,20,19,0) 40%, rgba(26,138,113,0.04) 100%)',
          }}
        />

        {/* ── Marquee ticker ──────────────────────────────────── */}
        <div
          className="absolute top-0 inset-x-0 border-b border-white/10 py-2.5"
          aria-hidden="true"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
          }}
        >
          <motion.div
            ref={tickerRef}
            className="flex gap-16 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 30,
              ease: 'linear',
              repeat: Infinity,
            }}
            whileHover={{ animationPlayState: 'paused' }}
            style={{ width: 'max-content' }}
          >
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase"
                style={{ color: 'rgba(255,255,255,0.28)' }}
              >
                <Icon name={item.icon} size="xs" className="text-emerald-400/60" />
                {item.label}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="container-site relative z-10">
          <RevealSection direction="left">
            <div className="flex flex-col items-center gap-8 text-center">

              {/* Eyebrow with decorative lines */}
              <div className="flex items-center justify-center gap-4">
                <span
                  className="block w-10 h-px"
                  style={{ background: 'rgba(26,138,113,1)', opacity: 0.55 }}
                />
                <span className="eyebrow">Get Started Today</span>
                <span
                  className="block w-10 h-px"
                  style={{ background: 'rgba(26,138,113,1)', opacity: 0.55 }}
                />
              </div>

              {/* Big editorial heading — per-word stagger */}
              <h2
                className="text-balance inline-flex flex-wrap items-baseline justify-center gap-x-[0.25em]"
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: 'clamp(3rem, 7vw, 8.5rem)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.03em',
                  fontWeight: 700,
                }}
              >
                {headingWords.map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 40, rotateX: -30 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  >
                    {word === 'Your' || word === 'Journey?' ? (
                      <span className="text-gradient italic">{word}</span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
              </h2>

              <p className="body-lg max-w-xl text-white/65">
                Join hundreds of professionals who have trusted Averexa to guide their career moves.
                Your next opportunity is closer than you think.
              </p>

              {/* Divider */}
              <div
                className="h-px w-16"
                style={{ background: 'rgba(26,138,113,0.25)' }}
                aria-hidden="true"
              />

              {/* Sign-off line */}
              <p
                className="text-balance text-white/50"
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: 'clamp(1.05rem, 1.6vw, 1.375rem)',
                  fontStyle: 'italic',
                  letterSpacing: '-0.01em',
                }}
              >
                Let&rsquo;s talk — your next chapter starts here.
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <CTAButton label="Book a Free Consultation" href="/contact" size="lg" />
                <OutlineButton label="View Our Process" href="/process" />
              </div>

            </div>
          </RevealSection>
        </div>

      </section>
    </AuroraBackground>
  )
}
