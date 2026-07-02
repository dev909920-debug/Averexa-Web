'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useReducedMotionContext } from '@/hooks/useReducedMotionContext'
import { BRAND_EASE } from '@/lib/motion'

type FadeUpProps = {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  const { shouldReduceMotion } = useReducedMotionContext()

  const variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.15, delay } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: BRAND_EASE, delay },
        },
      }

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-80px' }}
    >
      {children}
    </motion.div>
  )
}
