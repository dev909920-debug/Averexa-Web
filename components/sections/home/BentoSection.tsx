'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import Image from 'next/image'
import { Icon } from '@/components/ui/Icon'
import type { IconName } from '@/config/icons'

type FeatureCard = {
  id: string
  icon: IconName
  title: string
  description: string
  image: string
  colSpan: 1 | 2
}

const cards: FeatureCard[] = [
  {
    id: 'end-to-end',
    icon: 'Award',
    title: 'End-to-End Career Support',
    description:
      'From profile review to offer negotiation and onboarding, we support candidates through every step of the hiring journey.',
    image: '/assets/hero/home/bento-end-to-end-support.png',
    colSpan: 2,
  },
  {
    id: 'interviews',
    icon: 'Shield',
    title: 'Guaranteed Interviews',
    description:
      'Every enrolled candidate receives at least one guaranteed interview with a relevant employer.',
    image: '/assets/hero/home/bento-guaranteed-interviews.png',
    colSpan: 1,
  },
  {
    id: 'resume',
    icon: 'FileText',
    title: 'Resume Optimization',
    description:
      'Professional resume optimization based on US and Canadian hiring standards.',
    image: '/assets/hero/home/bento-resume-optimization.png',
    colSpan: 1,
  },
  {
    id: 'network',
    icon: 'Globe',
    title: 'Employer Network',
    description:
      'Access our network of hiring companies across technology, finance, healthcare and operations.',
    image: '/assets/hero/home/bento-employer-network.png',
    colSpan: 2,
  },
  {
    id: 'coaching',
    icon: 'Target',
    title: 'Interview Coaching',
    description:
      'Mock interview sessions with expert feedback to improve confidence and communication.',
    image: '/assets/hero/home/bento-interview-coaching.png',
    colSpan: 2,
  },
  {
    id: 'marketing',
    icon: 'TrendingUp',
    title: 'Active Marketing',
    description:
      'We actively promote your profile directly to recruiters instead of waiting for job postings.',
    image: '/assets/hero/home/bento-active-marketing.png',
    colSpan: 1,
  },
]

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const DUR = '450ms'

type CardProps = FeatureCard & {
  isHovered: boolean
  dimmed: boolean
  onEnter: () => void
  onLeave: () => void
}

function FeatureCard({ id, icon, title, description, image, colSpan, isHovered, dimmed, onEnter, onLeave }: CardProps) {
  const minH = colSpan === 2 ? 260 : 220

  return (
    <div
      className={colSpan === 2 ? 'sm:col-span-2 lg:col-span-2' : ''}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        className="relative overflow-hidden rounded-xl"
        style={{
          minHeight: minH,
          border: isHovered
            ? '1px solid rgba(26,138,113,0.45)'
            : '1px solid rgba(255,255,255,0.08)',
          boxShadow: isHovered
            ? '0 24px 56px rgba(0,0,0,.55), 0 0 0 1px rgba(26,138,113,0.15)'
            : '0 2px 8px rgba(0,0,0,.25)',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          opacity: dimmed ? 0.5 : 1,
          transition: `all ${DUR} ${EASE}`,
        }}
      >
        {/* ── Background image — always visible ────────────── */}
        <div className="absolute inset-0">
          {/* Image with subtle zoom on hover */}
          <div
            className="absolute inset-0"
            style={{
              transform: isHovered ? 'scale(1.07)' : 'scale(1)',
              transition: `transform 600ms ${EASE}`,
            }}
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover object-center"
              sizes={colSpan === 2 ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 100vw, 33vw'}
            />
          </div>

          {/* Bottom gradient — always on for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,20,19,0.98) 0%, rgba(0,20,19,0.65) 50%, rgba(0,20,19,0.2) 100%)',
            }}
            aria-hidden="true"
          />

          {/* Flat top overlay — fades out on hover revealing image */}
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(0,20,19,0.42)',
              opacity: isHovered ? 0 : 1,
              transition: `opacity ${DUR} ${EASE}`,
            }}
            aria-hidden="true"
          />
        </div>

        {/* ── Card content ──────────────────────────────────── */}
        <div
          className="relative z-10 flex flex-col justify-between p-6"
          style={{ minHeight: minH }}
        >
          {/* Top row: icon + arrow */}
          <div className="flex items-start justify-between">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl border"
              style={{
                background: isHovered ? 'rgba(26,138,113,0.28)' : 'rgba(26,138,113,0.12)',
                borderColor: isHovered ? 'rgba(26,138,113,0.45)' : 'rgba(26,138,113,0.22)',
                transition: `all ${DUR} ${EASE}`,
              }}
            >
              <Icon name={icon} size="md" className="text-emerald-400" aria-hidden="true" />
            </div>

            <div
              style={{
                color: 'rgba(26,138,113,0.8)',
                transform: isHovered ? 'rotate(-45deg) scale(1)' : 'rotate(0deg) scale(0.6)',
                opacity: isHovered ? 1 : 0,
                transition: `all ${DUR} ${EASE}`,
              }}
            >
              <Icon name="ArrowUpRight" size="sm" aria-hidden="true" />
            </div>
          </div>

          {/* Bottom: title + description */}
          <div className="flex flex-col gap-0">
            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:
                  colSpan === 2
                    ? 'clamp(1.125rem, 1.8vw, 1.5rem)'
                    : '1.1rem',
                fontWeight: 700,
                letterSpacing: '0em',
                color: '#ffffff',
                lineHeight: 1.2,
              }}
            >
              {title}
            </h3>

            <AnimatePresence>
              {isHovered && (
                <motion.p
                  key={`desc-${id}`}
                  initial={{ opacity: 0, y: 14, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto', marginTop: 10 }}
                  exit={{ opacity: 0, y: 8, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.68)',
                    lineHeight: 1.65,
                    overflow: 'hidden',
                  }}
                >
                  {description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export function BentoSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-padding bg-ink-900/95"
    >
      <div className="container-site">
        {/* Editorial split header */}
        <div className="mb-16 flex flex-col gap-10 lg:flex-row lg:items-end lg:gap-20">

          {/* Left — title */}
          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-emerald-500"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                }}
              >
                What We Offer
              </span>
              <span
                className="block h-px w-10 shrink-0"
                style={{ background: 'linear-gradient(to right, rgba(26,138,113,0.55), transparent)' }}
              />
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(2.6rem, 5.5vw, 6.5rem)',
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
              }}
            >
              <span className="block text-white">Everything You Need</span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #B5EACC 0%, #1A8A71 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                to Land Your Role.
              </span>
            </h2>
          </motion.div>

          {/* Right — description */}
          <motion.p
            className="flex-shrink-0 lg:max-w-[340px] text-white/50 leading-relaxed lg:pb-2"
            style={{ fontSize: 'clamp(0.875rem, 1.05vw, 1rem)' }}
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            A complete career placement service — from first contact to your first day on the job.
            Every tool, every step, one dedicated team.
          </motion.p>

        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 60, scale: 0.94 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.94 }}
              transition={{ duration: 0.65, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className={card.colSpan === 2 ? 'sm:col-span-2 lg:col-span-2' : ''}
            >
              <FeatureCard
                {...card}
                isHovered={hoveredId === card.id}
                dimmed={hoveredId !== null && hoveredId !== card.id}
                onEnter={() => setHoveredId(card.id)}
                onLeave={() => setHoveredId(null)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
