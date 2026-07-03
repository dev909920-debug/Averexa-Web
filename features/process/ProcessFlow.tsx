'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotionContext } from '@/hooks/useReducedMotionContext'
import { ProcessPathDesktop } from './ProcessPathDesktop'
import { ProcessPathMobile } from './ProcessPathMobile'

/**
 * Switches between the scroll-linked SVG path (desktop, motion enabled) and
 * the sequential card stack (mobile or reduced motion). The desktop component
 * unmounts entirely below 768px or under reduced motion never CSS-hidden 
 * so the SVG and scroll listeners do not run when they should not.
 */
export function ProcessFlow() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { shouldReduceMotion } = useReducedMotionContext()

  if (isDesktop && !shouldReduceMotion) {
    return <ProcessPathDesktop />
  }

  return <ProcessPathMobile />
}
