'use client'

import { motion } from 'motion/react'
import { RevealSection } from '@/components/motion/RevealSection'
import { StaggerContainer } from '@/components/motion/StaggerContainer'
import { StaggerItem } from '@/components/motion/StaggerItem'

const milestones = [
  {
    id: 'y1',
    period: 'Year 1',
    title: 'Foundation',
    description:
      'Averexa Placement founded with a mission to simplify cross-border careers for ambitious professionals worldwide.',
  },
  {
    id: 'y2',
    period: 'Year 2',
    title: 'Growth',
    description:
      'Expanded services across IT and Non-IT domains; built our employer network and refined our placement process.',
  },
  {
    id: 'y3',
    period: 'Year 3',
    title: 'Momentum',
    description:
      'Crossed 120+ successful placements with a 90% success rate — a milestone that proves our model works.',
  },
  {
    id: 'today',
    period: 'Today',
    title: 'Growing Forward',
    description:
      'Helping professionals across industries land full-time US & Canada roles with guaranteed interviews and dedicated recruiter support.',
  },
]

export function MilestoneTimeline() {
  return (
    <section id="journey" className="section-padding bg-ink-900 overflow-x-hidden">
      <div className="container-site">
        <RevealSection direction="left">
          <div className="mb-14 flex flex-col items-center gap-4 text-center">
            <span className="eyebrow">Our Journey</span>
            <h2 className="text-balance max-w-2xl">
              How Far{' '}
              <span className="text-gradient">We Have Come.</span>
            </h2>
          </div>
        </RevealSection>

        <StaggerContainer
          className="relative max-w-2xl mx-auto"
          staggerDelay={0.15}
          delayChildren={0.1}
        >
          {/* Vertical line */}
          <div
            className="absolute left-7 top-0 bottom-0 w-px bg-emerald-500/20"
            aria-hidden="true"
          />

          {milestones.map((milestone) => (
            <StaggerItem key={milestone.id}>
              <div className="relative flex gap-6 pb-12 last:pb-0">
                {/* Node */}
                <motion.div
                  className="relative z-10 flex-shrink-0"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false, margin: '-60px' }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10">
                    <div className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-emerald-500" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex flex-col gap-2 pt-3">
                  <span className="eyebrow text-xs text-emerald-500/80">{milestone.period}</span>
                  <h3 className="text-xl font-semibold text-white">{milestone.title}</h3>
                  <p className="body-lg text-white/60 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
