'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { processSteps } from '@/content/process-steps'
import { Icon } from '@/components/ui/Icon'
import { MOTION } from '@/config/motion'
import type { IconName } from '@/config/icons'

const ease = [0.16, 1, 0.3, 1] as const

export function ProcessPathMobile() {
  return (
    <div className="relative px-4 mx-auto max-w-lg">
      {/* Vertical connecting line */}
      <div
        className="absolute left-[2.375rem] top-8 bottom-8 w-px pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(26,138,113,0.3) 8%, rgba(26,138,113,0.3) 92%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <ol className="relative flex flex-col gap-6">
        {processSteps.map((step, i) => {
          const fromLeft = i % 2 === 0
          return (
            <motion.li
              key={step.id}
              initial={{ opacity: 0, x: fromLeft ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, ease }}
              className="relative flex gap-3 items-start"
            >
              {/* Step node on the left line */}
              <motion.div
                className="flex-shrink-0 z-10 flex flex-col items-center justify-center rounded-full border"
                style={{
                  width: '3rem',
                  height: '3rem',
                  background: 'rgba(26,138,113,0.10)',
                  borderColor: 'rgba(26,138,113,0.35)',
                  boxShadow: '0 0 0 4px rgba(26,138,113,0.06)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38, delay: 0.08, ease }}
                whileTap={{ scale: 0.9 }}
              >
                <span
                  className="font-bold leading-none"
                  style={{
                    fontSize: '0.6rem',
                    letterSpacing: '0.18em',
                    color: 'rgba(26,138,113,0.7)',
                    marginBottom: '2px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {String(step.number).padStart(2, '0')}
                </span>
                <Icon
                  name={step.icon as IconName}
                  size="sm"
                  className="text-emerald-400"
                  aria-hidden="true"
                />
              </motion.div>

              {/* Card */}
              <motion.div
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.15 }}
                className="flex-1 min-w-0 rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(0,20,19,0.75)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Image banner */}
                {step.image && (
                  <div className="relative w-full overflow-hidden" style={{ height: '9rem' }}>
                    <Image
                      src={step.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 90vw, 560px"
                    />
                    {/* Gradient overlay for readability */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to bottom, rgba(0,20,19,0.1) 0%, rgba(0,20,19,0.55) 60%, rgba(0,20,19,0.92) 100%)',
                      }}
                      aria-hidden="true"
                    />
                    {/* Phase badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                        style={{
                          background: 'rgba(0,20,19,0.72)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          border: '1px solid rgba(26,138,113,0.28)',
                          fontSize: '0.55rem',
                          fontWeight: 600,
                          letterSpacing: '0.22em',
                          textTransform: 'uppercase',
                          color: 'rgba(26,138,113,0.9)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        <span
                          className="w-1 h-1 rounded-full bg-emerald-500 shrink-0"
                          style={{ boxShadow: '0 0 4px rgba(26,138,113,0.8)' }}
                        />
                        {step.phase}
                      </span>
                    </div>
                  </div>
                )}

                {/* Text content */}
                <div className="p-4">
                  {/* Title with gradient text — mirrors desktop */}
                  <h3
                    className="font-bold leading-tight mb-1"
                    style={{
                      fontSize: 'clamp(1.05rem, 3.8vw, 1.3rem)',
                      fontFamily: 'var(--font-heading)',
                      background:
                        'linear-gradient(135deg, #ffffff 0%, #d4f4e2 60%, #1A8A71 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mb-2 leading-snug"
                    style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.42)' }}
                  >
                    {step.subtitle}
                  </p>
                  <p
                    className="leading-relaxed mb-3"
                    style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)' }}
                  >
                    {step.description}
                  </p>

                  {/* Focus areas — tick-mark manifest, reads like a spec sheet */}
                  <div className="flex flex-col gap-2">
                    {step.tags.map((tag, ti) => (
                      <motion.div
                        key={tag}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 + ti * 0.08, ease }}
                      >
                        <span className="relative block h-px w-4 shrink-0 overflow-hidden" aria-hidden="true">
                          <motion.span
                            className="absolute inset-0 origin-left"
                            style={{ background: 'linear-gradient(to right, #1A8A71, #B5EACC)' }}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.16 + ti * 0.08, ease }}
                          />
                        </span>
                        <span
                          style={{
                            fontSize: '0.625rem',
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.4)',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {tag}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.li>
          )
        })}
      </ol>

      {/* CTA */}
      <motion.div
        className="mt-10 pb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45, ease: MOTION.ease.brand }}
      >
        <div
          className="rounded-xl p-5"
          style={{
            background:
              'linear-gradient(135deg, rgba(26,138,113,0.12) 0%, rgba(26,138,113,0.05) 100%)',
            border: '1px solid rgba(26,138,113,0.2)',
          }}
        >
          <p className="text-sm font-semibold text-white mb-1">Ready to Start Your Journey?</p>
          <p className="text-xs text-white/50 mb-4 leading-relaxed">
            Take the first step toward your next opportunity.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-emerald-400 active:bg-emerald-600"
          >
            Start Your Journey
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
