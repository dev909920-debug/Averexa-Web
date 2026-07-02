'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { homepageProcessSteps } from '@/content/process-steps'
import { RevealSection } from '@/components/motion/RevealSection'
import { Icon } from '@/components/ui/Icon'
import { CTAButton } from '@/components/ui/CTAButton'
import type { IconName } from '@/config/icons'

const ease = [0.16, 1, 0.3, 1] as const

export function ProcessOverviewSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 50%'],
  })

  const lineProgress = useTransform(scrollYProgress, [0.0, 0.85], [0, 1])
  const dotTop = useTransform(scrollYProgress, [0.0, 0.85], ['0%', '100%'])

  // Seven staggered reveal windows (~0.12 apart) spanning the journey —
  // one per candidate-journey step, Career Counseling → Onboarding.
  const s0o = useTransform(scrollYProgress, [0.02, 0.11], [0, 1])
  const s0y = useTransform(scrollYProgress, [0.02, 0.13], [32, 0])
  const s1o = useTransform(scrollYProgress, [0.14, 0.23], [0, 1])
  const s1y = useTransform(scrollYProgress, [0.14, 0.25], [32, 0])
  const s2o = useTransform(scrollYProgress, [0.26, 0.35], [0, 1])
  const s2y = useTransform(scrollYProgress, [0.26, 0.37], [32, 0])
  const s3o = useTransform(scrollYProgress, [0.38, 0.47], [0, 1])
  const s3y = useTransform(scrollYProgress, [0.38, 0.49], [32, 0])
  const s4o = useTransform(scrollYProgress, [0.50, 0.59], [0, 1])
  const s4y = useTransform(scrollYProgress, [0.50, 0.61], [32, 0])
  const s5o = useTransform(scrollYProgress, [0.62, 0.71], [0, 1])
  const s5y = useTransform(scrollYProgress, [0.62, 0.73], [32, 0])
  const s6o = useTransform(scrollYProgress, [0.74, 0.83], [0, 1])
  const s6y = useTransform(scrollYProgress, [0.74, 0.85], [32, 0])

  const stepOpacities = [s0o, s1o, s2o, s3o, s4o, s5o, s6o]
  const stepYs = [s0y, s1y, s2y, s3y, s4y, s5y, s6y]

  return (
    <section id="process" ref={containerRef} className="section-padding bg-ink-900 relative overflow-hidden">

      {/* Subtle green glow behind timeline */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none hidden lg:block"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 500px 600px at 70% 50%, rgba(26,138,113,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="container-site relative z-10">

        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">

          {/* ── Left: Editorial header ─────────────────────────── */}
          <div className="lg:w-5/12 lg:sticky lg:top-32 lg:self-start flex flex-col gap-6">
            <RevealSection>
              <span className="eyebrow mb-4 block">How It Works</span>
            </RevealSection>
            <RevealSection>
              <h2
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: 'clamp(3rem, 6vw, 7rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.9,
                }}
              >
                <span className="text-white">Your</span>{' '}
                <span
                  className="italic"
                  style={{ fontWeight: 300, color: 'rgba(255,255,255,0.25)' }}
                >
                  Journey
                </span>
                <br />
                <span className="text-white">to a</span>{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #1A8A71 0%, #B5EACC 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  New Career.
                </span>
              </h2>
            </RevealSection>
            <RevealSection>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  color: 'rgba(255,255,255,0.38)',
                  lineHeight: 1.7,
                  maxWidth: '36ch',
                }}
              >
                A structured, transparent process — with you in control at every stage.
              </p>
            </RevealSection>
          </div>

          {/* ── Right: Centered vertical timeline ─────────────── */}
          <div className="lg:w-7/12 relative">

            {/* Connector line — centered */}
            <div
              className="absolute hidden md:block"
              style={{
                left: '50%',
                marginLeft: '-0.5px',
                top: '1.375rem',
                bottom: '1.375rem',
                width: '1px',
                background: 'rgba(255,255,255,0.07)',
              }}
            />

            {/* Animated fill line */}
            <motion.div
              className="absolute hidden md:block origin-top"
              style={{
                left: '50%',
                marginLeft: '-0.5px',
                top: '1.375rem',
                width: '1px',
                scaleY: lineProgress,
                background: 'linear-gradient(to bottom, rgba(26,138,113,0.6) 0%, #1A8A71 40%, #B5EACC 100%)',
                filter: 'drop-shadow(0 0 4px rgba(26,138,113,0.7))',
              }}
            />

            {/* Traveling glow dot */}
            <motion.div
              className="absolute hidden md:block -translate-x-1/2"
              style={{
                left: '50%',
                top: dotTop,
                x: '-50%',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#B5EACC',
                boxShadow: '0 0 0 3px rgba(181,234,204,0.2), 0 0 12px rgba(181,234,204,0.7), 0 0 24px rgba(26,138,113,0.5)',
              }}
            />

            {/* ── Mobile: icon rail + title index ──────────────────── */}
            <div className="relative flex flex-col md:hidden">

              {/* Static rail */}
              <div
                className="absolute"
                style={{
                  left: '2rem',
                  marginLeft: '-0.75px',
                  top: '2rem',
                  bottom: '2rem',
                  width: '1.5px',
                  background: 'rgba(255,255,255,0.06)',
                }}
              />

              {/* Animated fill rail — draws down as the section scrolls */}
              <motion.div
                className="absolute origin-top"
                style={{
                  left: '2rem',
                  marginLeft: '-0.75px',
                  top: '2rem',
                  width: '1.5px',
                  scaleY: lineProgress,
                  background: 'linear-gradient(to bottom, rgba(26,138,113,0.4) 0%, #1A8A71 50%, #B5EACC 100%)',
                  filter: 'drop-shadow(0 0 3px rgba(26,138,113,0.5))',
                }}
              />

              {/* Traveling glow dot */}
              <motion.div
                className="absolute -translate-x-1/2"
                style={{
                  left: '2rem',
                  top: dotTop,
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#B5EACC',
                  boxShadow: '0 0 0 3px rgba(181,234,204,0.2), 0 0 10px rgba(181,234,204,0.7), 0 0 20px rgba(26,138,113,0.5)',
                }}
              />

              {homepageProcessSteps.map((step, i) => (
                <motion.div
                  key={step.id}
                  className="group relative flex items-center gap-5 py-7"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease }}
                >
                  {/* Big icon — sits on the rail */}
                  <motion.div
                    className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border"
                    initial={{
                      scale: 0.75,
                      background: '#001413',
                      borderColor: 'rgba(26,138,113,0.22)',
                      boxShadow: '0 0 0 5px #001413',
                    }}
                    whileInView={{
                      scale: 1,
                      background: '#001413',
                      borderColor: 'rgba(26,138,113,0.55)',
                      boxShadow: '0 0 0 5px #001413, 0 0 18px rgba(26,138,113,0.4)',
                    }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease }}
                  >
                    <Icon name={step.icon as IconName} size="xl" className="text-emerald-300" aria-hidden="true" />
                  </motion.div>

                  {/* Text */}
                  <motion.div
                    className="relative z-10 min-w-0 flex-1"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.6, delay: i * 0.05 + 0.12, ease }}
                  >
                    <span
                      className="block tracking-widest mb-1"
                      style={{
                        fontFamily: 'var(--font-jetbrains-mono)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: 'rgba(26,138,113,0.55)',
                      }}
                    >
                      {String(step.number).padStart(2, '0')}
                    </span>
                    <h3
                      className="text-white text-balance"
                      style={{
                        fontFamily: 'var(--font-editorial)',
                        fontSize: 'clamp(1.25rem, 5.5vw, 1.625rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                      }}
                    >
                      {step.title}
                    </h3>
                    <span
                      className="block mt-1 truncate"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.35)',
                      }}
                    >
                      {step.subtitle}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* ── Desktop: centered vertical timeline ──────────────── */}
            <div className="hidden md:flex md:flex-col md:gap-0">
              {homepageProcessSteps.map((step, i) => {
                const isLeft = i % 2 === 0

                return (
                  <motion.div
                    key={step.id}
                    style={{ opacity: stepOpacities[i], y: stepYs[i] }}
                    className={`relative flex items-start gap-5 py-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    {/* Content */}
                    <div className={`flex-1 min-w-0 block ${isLeft ? 'text-right pr-12' : 'text-left pl-12'}`}>
                      <div
                        className="relative inline-block text-left rounded-2xl border p-5 transition-all duration-400 group hover:border-emerald-500/20"
                        style={{
                          borderColor: 'rgba(255,255,255,0.04)',
                          background: 'rgba(255,255,255,0.02)',
                          maxWidth: '320px',
                        }}
                      >
                        {/* Hover glow */}
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                          style={{
                            background:
                              'radial-gradient(ellipse at 50% 50%, rgba(26,138,113,0.06) 0%, transparent 70%)',
                          }}
                        />

                        <div className="relative z-10">
                          <span
                            className="block tracking-widest mb-0.5"
                            style={{
                              fontFamily: 'var(--font-jetbrains-mono)',
                              fontSize: '0.55rem',
                              letterSpacing: '0.22em',
                              textTransform: 'uppercase',
                              color: 'rgba(26,138,113,0.5)',
                            }}
                          >
                            {String(step.number).padStart(2, '0')}
                          </span>
                          <h3
                            className="text-white font-medium transition-colors duration-300 group-hover:text-emerald-300"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '1.0625rem',
                              lineHeight: 1.3,
                            }}
                          >
                            {step.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Icon circle on the line */}
                    <div className="relative z-10 flex flex-shrink-0 items-start pt-2">
                      <motion.div
                        className="flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-full border"
                        initial={{
                          background: '#001413',
                          borderColor: 'rgba(26,138,113,0.22)',
                          boxShadow: '0 0 0 5px #001413',
                        }}
                        whileInView={{
                          background: '#001413',
                          borderColor: 'rgba(26,138,113,0.5)',
                          boxShadow: '0 0 0 5px #001413, 0 0 14px rgba(26,138,113,0.35)',
                        }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, delay: i * 0.14 + 0.15 }}
                      >
                        <Icon name={step.icon as IconName} size="sm" className="text-emerald-400" aria-hidden="true" />
                      </motion.div>
                    </div>

                    {/* Empty spacer for opposite side */}
                    <div className="flex-1 min-w-0" />
                  </motion.div>
                )
              })}
            </div>
          </div>

        </div>

        {/* ── Bottom CTA ──────────────────────────────────────────── */}
        <RevealSection delay={0.2}>
          <div className="mt-16 flex justify-center lg:mt-20">
            <CTAButton label="Explore the Full Process" href="/process" size="lg" />
          </div>
        </RevealSection>

      </div>
    </section>
  )
}
