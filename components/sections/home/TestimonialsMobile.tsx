'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { TestimonialCard } from '@/components/cards/TestimonialCard'
import { testimonials } from '@/content/testimonials'
import { BRAND_EASE } from '@/lib/motion'

export function TestimonialsMobile() {
  const [current, setCurrent] = useState(0)

  function prev() {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }

  function next() {
    setCurrent((c) => (c + 1) % testimonials.length)
  }

  const t = testimonials[current]!

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: BRAND_EASE }}
          >
            <TestimonialCard
              quote={t.quote}
              name={t.name}
              role={t.title}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-emerald-500' : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
