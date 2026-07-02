'use client'

import { motion, type Variants } from 'motion/react'
import { cn } from '@/lib/utils'
import { useReducedMotionContext } from '@/hooks/useReducedMotionContext'
import { BRAND_EASE } from '@/lib/motion'

type RevealSectionProps = {
  children: React.ReactNode
  direction?: 'up' | 'left' | 'right'
  delay?: number
  className?: string
}

export function RevealSection({
  children,
  direction = 'up',
  delay = 0,
  className,
}: RevealSectionProps) {
  const { shouldReduceMotion } = useReducedMotionContext()

  const hidden =
    direction === 'up'
      ? { opacity: 0, y: 50, scale: 0.97 }
      : { opacity: 0, x: direction === 'left' ? -60 : 60 }

  const visible =
    direction === 'up'
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 1, x: 0 }

  const variants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.15, ease: 'linear', delay } },
      }
    : {
        hidden,
        visible: {
          ...visible,
          transition: {
            duration: direction === 'up' ? 0.8 : 0.7,
            ease: BRAND_EASE,
            delay,
          },
        },
      }

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-70px' }}
    >
      {children}
    </motion.div>
  )
}
