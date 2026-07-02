'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useReducedMotionContext } from '@/hooks/useReducedMotionContext'
import { BRAND_EASE } from '@/lib/motion'

type StaggerItemProps = {
  children: React.ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const { shouldReduceMotion } = useReducedMotionContext()

  const variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.15 } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: BRAND_EASE },
        },
      }

  return (
    <motion.div className={cn(className)} variants={variants}>
      {children}
    </motion.div>
  )
}
