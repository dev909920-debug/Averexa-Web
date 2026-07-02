'use client'

import { motion } from 'motion/react'
import { coreValues } from '@/content/core-values'
import { CoreValueCard } from '@/components/cards/CoreValueCard'

const EASE = [0.16, 1, 0.3, 1] as const

export function CoreValuesSection() {
  return (
    <section id="core-values" className="section-padding bg-ink-900/95">
      <div className="container-site">
        {/* Header */}
        <motion.div
          className="mb-14 flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="eyebrow">What Drives Us</span>
          <h2 className="text-balance max-w-2xl">
            Values We{' '}
            <span className="text-gradient">Live By.</span>
          </h2>
          <p className="body-lg max-w-xl text-white/60">
            Our core values aren&apos;t just words on a wall — they are the principles that guide
            every interaction, every placement, and every relationship we build.
          </p>
        </motion.div>

        {/* Cards grid — each card gets its own staggered scroll entrance */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value, i) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{
                duration: 0.72,
                delay: i * 0.09,
                ease: EASE,
              }}
            >
              <CoreValueCard
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
