'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useReducedMotionContext } from '@/hooks/useReducedMotionContext'
import { EASE_OUT } from '@/lib/motion'

type OutlineButtonProps = {
  label: string
  href?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const baseClasses = cn(
  'relative inline-flex items-center justify-center h-11 px-6 rounded-lg',
  'text-sm font-medium text-white',
  'border border-mint-200/40 bg-transparent',
  'overflow-hidden select-none cursor-pointer',
  'transition-colors duration-200',
  // shimmer sweep via pseudo-element CSS only
  'before:absolute before:inset-0 before:translate-x-[-100%] before:bg-gradient-to-r before:from-transparent before:via-mint-200/8 before:to-transparent',
  'hover:before:translate-x-[100%] before:transition-transform before:duration-400',
  'focus-visible:outline-none',
)

export function OutlineButton({
  label,
  href,
  onClick,
  disabled = false,
  className,
  type = 'button',
}: OutlineButtonProps) {
  const { shouldReduceMotion } = useReducedMotionContext()

  const motionProps = disabled
    ? {}
    : {
        whileHover: shouldReduceMotion
          ? {}
          : {
              y: -2,
              borderColor: 'rgba(181,234,204,0.8)',
              boxShadow: '0 4px 16px rgba(255,255,255,0.08)',
              transition: { duration: 0.2, ease: EASE_OUT },
            },
        whileTap: { scale: 0.98, y: 0 },
      }

  const content = (
    <motion.span
      className={cn(baseClasses, disabled && 'opacity-50 cursor-not-allowed', className)}
      {...motionProps}
    >
      {label}
    </motion.span>
  )

  if (href && !disabled) {
    return (
      <Link href={href} className="inline-block focus-visible:ring-2 focus-visible:ring-mint-200/40 focus-visible:ring-offset-2 rounded-lg">
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-block focus-visible:ring-2 focus-visible:ring-mint-200/40 focus-visible:ring-offset-2 rounded-lg"
    >
      {content}
    </button>
  )
}
