'use client'

import { motion } from 'motion/react'
import { useLenisScroll } from '@/hooks/useLenisScroll'

/**
 * Thin emerald progress bar pinned to the top of the viewport. Reads Lenis's
 * smoothed scroll progress (never native scroll) so it stays in sync with the
 * site's smooth-scroll behaviour. Under reduced motion Lenis is disabled and
 * the bar simply stays at zero a graceful, non-distracting fallback.
 */
export function BlogReadingProgress() {
  const { scrollProgress } = useLenisScroll()

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-50 h-0.5 origin-left bg-emerald-500"
      style={{ scaleX: scrollProgress }}
    />
  )
}
