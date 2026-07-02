'use client'

import { motion } from 'motion/react'
import { services } from '@/content/services'
import { ServiceCard } from '@/components/cards/ServiceCard'

const EASE = [0.16, 1, 0.3, 1] as const

export function ServiceGridSection() {
  return (
    <section id="services-grid" className="section-padding bg-ink-900">
      <div className="container-site">
        {/* Header */}
        <motion.div
          className="mb-14 flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="eyebrow">Our Expertise</span>
          <h2 className="text-balance max-w-2xl">
            Everything You Need to{' '}
            <span className="text-gradient">Land Your Role.</span>
          </h2>
          <p className="body-lg max-w-xl text-white/60">
            From your first profile review to your first day on the job — a complete placement
            service built around your career goals.
          </p>
        </motion.div>

        {/* Cards grid — staggered scroll entrance per card */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{
                duration: 0.72,
                delay: i * 0.07,
                ease: EASE,
              }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                href="/contact"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
