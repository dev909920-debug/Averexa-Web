'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { CTAButton } from '@/components/ui/CTAButton'
import { RevealSection } from '@/components/motion/RevealSection'

const pillars = [
  {
    number: '01',
    title: 'Guaranteed\nInterviews',
    description:
      'Every enrolled candidate receives a guaranteed interview opportunity. We make the connections that others cannot.',
    image: '/assets/hero/home/pillar-guaranteed-interviews.png',
  },
  {
    number: '02',
    title: 'Expert\nPreparation',
    description:
      'From resume optimization to mock interviews, we prepare you to walk in with confidence and perform at your best.',
    image: '/assets/hero/home/pillar-expert-preparation.png',
  },
  {
    number: '03',
    title: 'Dedicated\nRecruiter',
    description:
      'You get a personal recruiter who knows your background, advocates for your profile, and guides you every step of the way.',
    image: '/assets/hero/home/pillar-dedicated-recruiter.png',
  },
]

const SLIDE_COUNT = pillars.length

export function AboutSummarySection() {
  const trackRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  // Track moves 0 → -200vw over first 75% of scroll — leaves 25% as "hold" on slide 3
  const x = useTransform(
    scrollYProgress,
    [0, 0.75],
    ['0vw', `${-(SLIDE_COUNT - 1) * 100}vw`],
  )

  // Slide 0: always visible
  const text0X = useTransform(scrollYProgress, [0, 1], [0, 0])
  const text0Opacity = useTransform(scrollYProgress, [0, 1], [1, 1])

  // Slide 1: centered at sp≈0.375, fades in just before
  const text1X = useTransform(scrollYProgress, [0.20, 0.36], [55, 0])
  const text1Opacity = useTransform(scrollYProgress, [0.18, 0.34], [0, 1])

  // Slide 2: centered at sp=0.75, fades in before — stays visible for hold period
  const text2X = useTransform(scrollYProgress, [0.54, 0.70], [55, 0])
  const text2Opacity = useTransform(scrollYProgress, [0.52, 0.68], [0, 1])

  // Per-slide image parallax scale
  const img0Scale = useTransform(scrollYProgress, [0, 0.30], [1.0, 1.07])
  const img1Scale = useTransform(scrollYProgress, [0.28, 0.55], [1.0, 1.07])
  const img2Scale = useTransform(scrollYProgress, [0.56, 0.82], [1.0, 1.07])

  // Slide progress indicator dot widths
  const dot0Width = useTransform(scrollYProgress, [0, 0.20], [28, 8])
  const dot1Width = useTransform(scrollYProgress, [0.15, 0.38, 0.55], [8, 28, 8])
  const dot2Width = useTransform(scrollYProgress, [0.52, 0.75], [8, 28])

  // Scroll hint fades on first scroll movement
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0])

  const textXValues = [text0X, text1X, text2X]
  const textOpacityValues = [text0Opacity, text1Opacity, text2Opacity]
  const imgScaleValues = [img0Scale, img1Scale, img2Scale]
  const dotWidths = [dot0Width, dot1Width, dot2Width]

  return (
    <section id="about" className="bg-ink-900">

      {/* ─── PART 1 · Editorial Split Header ─────────────────────── */}
      <div className="section-padding border-b border-white/[0.06] overflow-x-hidden">
        <div className="container-site">

          <RevealSection>
            <span className="eyebrow mb-10 block">About Averexa</span>
          </RevealSection>

          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:gap-20">

            {/* LEFT — mega editorial heading */}
            <RevealSection direction="left" className="min-w-0 flex-1">
              <h2
                aria-label="Your Career, Our Mission."
                className="select-none"
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: 'clamp(4rem, 9.5vw, 10rem)',
                  lineHeight: 0.86,
                  letterSpacing: '-0.01em',
                }}
              >
                <span
                  className="block text-white/30"
                  style={{ fontWeight: 300, fontStyle: 'italic', letterSpacing: '0.02em' }}
                >
                  Your
                </span>
                <span className="block text-white" style={{ fontWeight: 700 }}>
                  Career,
                </span>
                <span
                  className="block text-white/30"
                  style={{
                    fontWeight: 300,
                    fontStyle: 'italic',
                    fontSize: '0.64em',
                    marginTop: '0.06em',
                  }}
                >
                  Our
                </span>
                <span
                  className="block"
                  style={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #1A8A71 0%, #B5EACC 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Mission.
                </span>
              </h2>
            </RevealSection>

            {/* RIGHT — description paragraph + CTA */}
            <RevealSection direction="right" delay={0.2} className="flex-1 lg:max-w-[420px]">
              <div className="flex flex-col gap-6 lg:pb-6">
                <p className="body-lg text-white/65 leading-relaxed">
                  Averexa Placement is a career placement consultancy dedicated to helping ambitious
                  professionals secure full-time roles in the US and Canada. We combine deep employer
                  relationships, personalised guidance, and proven preparation to give you the best
                  possible shot at landing the role you deserve.
                </p>
                <p className="body-lg text-white/65 leading-relaxed">
                  We don&apos;t just find jobs — we build careers through transparency, preparation,
                  and relentless advocacy on your behalf.
                </p>
                <div className="pt-2">
                  <CTAButton label="Learn More About Us" href="/about" />
                </div>
              </div>
            </RevealSection>

          </div>
        </div>
      </div>

      {/* ─── PART 2 · Pinned Horizontal Scroll — desktop only ────── */}
      <div
        ref={trackRef}
        style={{ height: `${SLIDE_COUNT * 100 + 100}vh` }}
        className="relative hidden md:block"
      >
        {/* Sticky viewport frame */}
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Horizontal sliding track */}
          <motion.div
            style={{ x, width: `${SLIDE_COUNT * 100}vw` }}
            className="flex h-full"
          >
            {pillars.map((pillar, i) => (
              <div
                key={pillar.number}
                className="relative flex h-full flex-shrink-0"
                style={{ width: '100vw' }}
              >
                {/* ── Left: Text content ──────────────────────── */}
                <motion.div
                  style={{ x: textXValues[i], opacity: textOpacityValues[i] }}
                  className="relative z-10 flex w-1/2 flex-col justify-center px-10 md:px-16 lg:px-24"
                >
                  {/* Ghost number — editorial background element */}
                  <span
                    className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none leading-none text-white"
                    style={{
                      fontSize: 'clamp(9rem, 20vw, 18rem)',
                      opacity: 0.035,
                      fontFamily: 'var(--font-condensed)',
                      fontWeight: 400,
                    }}
                    aria-hidden="true"
                  >
                    {pillar.number}
                  </span>

                  <div className="relative">
                    {/* Step counter */}
                    <span
                      className="mb-6 block text-emerald-500"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {pillar.number}&thinsp;/&thinsp;0{SLIDE_COUNT}
                    </span>

                    {/* Pillar title */}
                    <h3
                      className="mb-5 text-white"
                      style={{
                        fontFamily: 'var(--font-editorial)',
                        fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
                        fontWeight: 700,
                        lineHeight: 0.95,
                        letterSpacing: '-0.01em',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {pillar.title}
                    </h3>

                    {/* Accent rule */}
                    <div
                      className="mb-8 h-px w-12 rounded-full"
                      style={{ background: 'rgba(26,138,113,0.55)' }}
                    />

                    {/* Description */}
                    <p
                      className="max-w-sm text-white/60 leading-relaxed"
                      style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.05rem)' }}
                    >
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>

                {/* ── Right: Image ─────────────────────────────── */}
                <div className="relative w-1/2 overflow-hidden">
                  <motion.div
                    style={{ scale: imgScaleValues[i] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={pillar.image}
                      alt={pillar.title.replace('\n', ' ')}
                      fill
                      className="object-cover object-center"
                      sizes="50vw"
                      priority={i === 0}
                    />
                  </motion.div>

                  {/* Left-edge blend with text column */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to right, #001413 0%, rgba(0,20,19,0.5) 30%, transparent 65%)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Bottom vignette */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,20,19,0.65) 0%, transparent 40%)',
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── Slide progress dots ───────────────────────────────── */}
          <div
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-1.5"
            aria-hidden="true"
          >
            {pillars.map((_, i) => (
              <motion.div
                key={i}
                style={{ width: dotWidths[i] }}
                className="h-[2px] rounded-full bg-emerald-500"
              />
            ))}
          </div>

          {/* ── Scroll hint (fades on first scroll) ──────────────── */}
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="absolute bottom-8 right-10 flex items-center gap-2 text-white/35"
            aria-hidden="true"
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              Scroll
            </span>
            <svg width="20" height="6" viewBox="0 0 20 6" fill="none">
              <path
                d="M0 3H18M18 3L15.5 1M18 3L15.5 5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

        </div>
      </div>

      {/* ─── PART 2 (mobile) · Vertical pillar stack ─────────────── */}
      <div className="section-padding md:hidden">
        <div className="container-site flex flex-col gap-14">
          {pillars.map((pillar) => (
            <div key={pillar.number} className="flex flex-col gap-5">
              {/* Image card */}
              <div className="relative h-56 w-full overflow-hidden rounded-xl">
                <Image
                  src={pillar.image}
                  alt={pillar.title.replace('\n', ' ')}
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,20,19,0.8) 0%, transparent 60%)',
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Counter */}
              <span
                className="text-emerald-500"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                }}
              >
                {pillar.number}&thinsp;/&thinsp;0{SLIDE_COUNT}
              </span>

              {/* Title */}
              <h3
                className="text-white"
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: 'clamp(2rem, 6vw, 3rem)',
                  fontWeight: 700,
                  lineHeight: 1.0,
                  letterSpacing: '-0.01em',
                  whiteSpace: 'pre-line',
                }}
              >
                {pillar.title}
              </h3>

              {/* Accent rule */}
              <div
                className="h-px w-10 rounded-full"
                style={{ background: 'rgba(26,138,113,0.55)' }}
              />

              {/* Description */}
              <p className="body-sm text-white/60 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
