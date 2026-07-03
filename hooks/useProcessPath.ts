'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import {
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from 'motion/react'
import { useLenisScroll } from '@/hooks/useLenisScroll'
import { MOTION } from '@/config/motion'
import { PROCESS_SCROLL_THRESHOLDS } from '@/types/process'

type UseProcessPathReturn = {
  /** Spring-smoothed 0→1 value driving the SVG path draw. */
  smoothedPathLength: MotionValue<number>
  /** Forward-only activation state per node (once true, never resets). */
  nodeStates: boolean[]
}

/**
 * Bridges Lenis virtual scroll into a spring-smoothed pathLength MotionValue
 * scoped to a section, plus a forward-only node activation array.
 *
 * Scroll is read from `LenisContext` (never native `useScroll`) so the path
 * stays in sync with Lenis's smoothed scroll position.
 */
export function useProcessPath(
  sectionRef: RefObject<HTMLElement | null>,
): UseProcessPathReturn {
  const { scrollY } = useLenisScroll()
  const boundsRef = useRef({ start: 0, end: 1 })

  // Measure the scroll window over which the path should draw.
  useEffect(() => {
    function measure() {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const absTop = rect.top + window.scrollY
      const vh = window.innerHeight
      const start = absTop - vh * 0.5
      const end = absTop + el.offsetHeight - vh
      boundsRef.current = { start, end: end > start ? end : start + 1 }
    }

    measure()
    window.addEventListener('resize', measure)
    // Re-measure once layout/fonts settle.
    const settleTimer = window.setTimeout(measure, 300)

    return () => {
      window.removeEventListener('resize', measure)
      window.clearTimeout(settleTimer)
    }
  }, [sectionRef])

  // Map the absolute Lenis scroll position into a clamped 0→1 progress.
  const rawProgress = useTransform(scrollY, (y) => {
    const { start, end } = boundsRef.current
    const p = (y - start) / (end - start)
    return p < 0 ? 0 : p > 1 ? 1 : p
  })

  const smoothedPathLength = useSpring(rawProgress, MOTION.spring.process)

  // Forward-only node activation a node never deactivates on scroll-back.
  const [nodeStates, setNodeStates] = useState<boolean[]>(() =>
    PROCESS_SCROLL_THRESHOLDS.map(() => false),
  )

  useMotionValueEvent(smoothedPathLength, 'change', (value) => {
    setNodeStates((prev) => {
      let changed = false
      const next = prev.map((active, i) => {
        if (!active && value >= PROCESS_SCROLL_THRESHOLDS[i]) {
          changed = true
          return true
        }
        return active
      })
      return changed ? next : prev
    })
  })

  return { smoothedPathLength, nodeStates }
}
