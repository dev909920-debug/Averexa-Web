'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'motion/react'
import type { ProcessStep } from '@/content/process-steps'

type ProcessStepCardProps = {
  step: ProcessStep
  index: number
  cardRef: (el: HTMLDivElement | null) => void
}

export function ProcessStepCard({ step, index, cardRef }: ProcessStepCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(wrapRef, { once: false, margin: '-8% 0px -8% 0px' })
  const isLeft = index % 2 === 0
  const ease = [0.16, 1, 0.3, 1] as const

  // Write both full class strings so Tailwind JIT can statically scan the arbitrary values
  const gridClass = isLeft
    ? 'grid gap-6 xl:gap-14 items-center md:grid-cols-[42%_58%]'
    : 'grid gap-6 xl:gap-14 items-center md:grid-cols-[58%_42%]'

  return (
    <div
      ref={(el) => {
        ;(wrapRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        cardRef(el)
      }}
      className="relative min-h-screen flex items-center py-24"
    >
      {/* Step divider line — connects steps visually */}
      {index > 0 && (
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(26,138,113,0.08) 20%, rgba(26,138,113,0.08) 80%, transparent)',
          }}
        />
      )}

      {/* Giant architectural watermark — outline, bottom corner, bleeds into next step */}
      <div
        className="absolute select-none pointer-events-none z-0"
        style={{
          fontSize: 'clamp(220px, 30vw, 460px)',
          lineHeight: 0.72,
          bottom: '-3rem',
          ...(isLeft ? { right: '-1%' } : { left: '-1%' }),
          color: 'transparent',
          WebkitTextStroke: '1px rgba(26,138,113,0.09)',
          fontWeight: 900,
          fontFamily: 'var(--font-clash, system-ui, sans-serif)',
          letterSpacing: '-0.06em',
        }}
      >
        {step.id}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-14">
        {/*
          Asymmetric grid: image always gets 58%, text 42%.
          row-start-1 on both cells prevents the CSS auto-placement bug on even steps
          where col-start going "backwards" (2→1 in DOM order) drops the image to row 2.
        */}
        <div className={gridClass}>

          {/* ── Typography ── */}
          <div
            className={
              isLeft
                ? 'col-start-1 md:col-start-1 md:row-start-1'
                : 'col-start-1 md:col-start-2 md:row-start-1'
            }
          >
            {/* Phase / step metadata row */}
            <motion.div
              className="flex items-center gap-4 mb-9"
              initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -20 : 20 }}
              transition={{ duration: 0.55, ease }}
            >
              <motion.div
                className="w-px origin-top"
                style={{
                  height: 40,
                  background: 'linear-gradient(to bottom, #1A8A71, transparent)',
                }}
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.5, delay: 0.08, ease }}
              />
              <div>
                <div
                  className="text-[10px] font-semibold tracking-[0.28em] uppercase text-emerald-500 leading-none mb-1"
                  style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)' }}
                >
                  {step.phase}
                </div>
                <div
                  className="text-[9px] tracking-[0.24em] uppercase text-emerald-500/40"
                  style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)' }}
                >
                  Step {step.id} of 07
                </div>
              </div>
            </motion.div>

            {/* Title — gradient fill + outline echo for 3-D depth */}
            <div className="relative mb-4">
              {/* Outline ghost shifted 2px for depth illusion */}
              <span
                aria-hidden
                className="absolute top-[2px] left-[2px] select-none pointer-events-none font-bold leading-[0.9] tracking-[-0.03em]"
                style={{
                  fontFamily: 'var(--font-clash, system-ui, sans-serif)',
                  fontSize: 'clamp(40px, 4.5vw, 80px)',
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(26,138,113,0.22)',
                }}
              >
                {step.title}
              </span>

              <motion.h3
                  className="relative font-bold leading-[0.9] tracking-[-0.03em]"
                  style={{
                    fontFamily: 'var(--font-clash, system-ui, sans-serif)',
                    fontSize: 'clamp(40px, 4.5vw, 80px)',
                    background:
                      'linear-gradient(158deg, #ffffff 0%, #f2faf7 35%, #B5EACC 63%, #1A8A71 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.9, delay: 0.05, ease }}
                >
                  {step.title}
                </motion.h3>
            </div>

            {/* Expanding accent rule */}
            <motion.div
              className="h-px mb-6 origin-left"
              style={{
                background:
                  'linear-gradient(to right, #1A8A71, rgba(26,138,113,0.25), transparent)',
              }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 0.18, ease }}
            />

            {/* Subtitle */}
            <motion.p
              className="text-xl sm:text-2xl text-white/60 font-light mb-4 leading-snug tracking-tight"
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.65, delay: 0.16, ease }}
            >
              {step.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-sm text-white/38 leading-relaxed mb-8 max-w-sm"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.26, ease }}
            >
              {step.description}
            </motion.p>

            {/* Tags — staggered scale-in */}
            <div className="flex flex-wrap gap-2">
              {step.tags.map((tag, ti) => (
                <motion.span
                  key={tag}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/10 bg-emerald-500/5 text-[11px] tracking-widest uppercase text-white/35"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.45, delay: 0.36 + ti * 0.07, ease }}
                >
                  <span
                    className="w-1 h-1 rounded-full bg-emerald-500 shrink-0"
                    style={{ boxShadow: '0 0 5px rgba(26,138,113,0.8)' }}
                  />
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* ── Image ── */}
          <div
            className={
              isLeft
                ? 'hidden md:block md:col-start-2 md:row-start-1'
                : 'hidden md:block md:col-start-1 md:row-start-1'
            }
          >
            <div className="relative w-full max-w-[800px] mx-auto">

              {/* Ambient bloom — radial glow behind the image */}
              <div
                className="absolute -inset-[18%] -z-10 rounded-full"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 58%, rgba(26,138,113,0.2) 0%, rgba(26,138,113,0.06) 48%, transparent 68%)',
                  filter: 'blur(52px)',
                }}
              />

              {/* Secondary accent bloom for extra depth */}
              <div
                className="absolute -inset-[8%] -z-10 rounded-full"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 50%, rgba(181,234,204,0.04) 0%, transparent 60%)',
                  filter: 'blur(24px)',
                }}
              />

              {/* Image with directional clip-path wipe — no box, no border */}
              <motion.div
                data-step-image
                className="relative w-full aspect-square"
                initial={{
                  clipPath: isLeft ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)',
                  opacity: 0,
                }}
                animate={
                  isInView
                    ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
                    : {
                        clipPath: isLeft ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)',
                        opacity: 0,
                      }
                }
                transition={{ duration: 1.05, delay: 0.1, ease }}
              >
                {step.image ? (
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span
                      className="text-[100px] font-bold text-emerald-500/8 select-none"
                      style={{ fontFamily: 'var(--font-clash, system-ui, sans-serif)' }}
                    >
                      {step.id}
                    </span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
