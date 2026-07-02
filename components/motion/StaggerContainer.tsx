'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const motionElements = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
  nav: motion.nav,
  article: motion.article,
  aside: motion.aside,
  main: motion.main,
  header: motion.header,
  footer: motion.footer,
} as const

type MotionElementKey = keyof typeof motionElements

type StaggerContainerProps = {
  children: React.ReactNode
  staggerDelay?: number
  delayChildren?: number
  className?: string
  as?: MotionElementKey
}

export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  delayChildren = 0,
  className,
  as: tag = 'div',
}: StaggerContainerProps) {
  const MotionTag = motionElements[tag]

  return (
    <MotionTag
      className={cn(className)}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-80px' }}
    >
      {children}
    </MotionTag>
  )
}
