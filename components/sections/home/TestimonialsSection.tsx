'use client'

import { motion } from 'motion/react'
import { TestimonialsDesktop } from './TestimonialsDesktop'
import { TestimonialsMobile } from './TestimonialsMobile'

const ease = [0.16, 1, 0.3, 1] as const

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-ink-900/95 overflow-x-hidden">
      <div className="container-site">

        {/* Editorial split header — matches the About section's asymmetric style */}
        <div className="mb-16 flex flex-col gap-10 lg:flex-row lg:items-end lg:gap-20">

          {/* Left — large display title */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-3 mb-6"
            >
              <span
                className="text-emerald-500"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                }}
              >
                Candidate Stories
              </span>
              <motion.span
                className="block h-px"
                style={{ background: 'linear-gradient(to right, rgba(26,138,113,0.6), transparent)' }}
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, delay: 0.15, ease }}
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.75, delay: 0.05, ease }}
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(2.8rem, 6vw, 7rem)',
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
              }}
            >
              <span className="block text-white">Real People,</span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #B5EACC 0%, #1A8A71 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Real Results.
              </span>
            </motion.h2>
          </div>

          {/* Right — description + stat pair */}
          <motion.div
            className="flex-shrink-0 lg:max-w-[360px] flex flex-col gap-8 lg:pb-3"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.15, ease }}
          >
            <p
              className="text-white/55 leading-relaxed"
              style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)' }}
            >
              Hear directly from professionals who trusted Averexa with their career move —
              and landed the roles they deserved.
            </p>

            {/* Mini stat strip */}
            <div className="flex items-center gap-8">
              <div className="flex flex-col gap-1">
                <span
                  className="text-white font-bold"
                  style={{
                    fontFamily: 'var(--font-clash, system-ui)',
                    fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}
                >
                  120+
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(26,138,113,0.75)',
                  }}
                >
                  Placed
                </span>
              </div>

              <div className="w-px h-10 bg-white/8" />

              <div className="flex flex-col gap-1">
                <span
                  className="text-white font-bold"
                  style={{
                    fontFamily: 'var(--font-clash, system-ui)',
                    fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}
                >
                  90%
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(26,138,113,0.75)',
                  }}
                >
                  Success Rate
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        <div className="hidden md:block">
          <TestimonialsDesktop />
        </div>
        <div className="md:hidden">
          <TestimonialsMobile />
        </div>
      </div>
    </section>
  )
}
