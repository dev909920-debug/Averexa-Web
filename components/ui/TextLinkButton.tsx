'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useReducedMotionContext } from '@/hooks/useReducedMotionContext'

type TextLinkButtonProps = {
  label: string
  href?: string
  onClick?: () => void
  className?: string
}

export function TextLinkButton({ label, href, onClick, className }: TextLinkButtonProps) {
  const { shouldReduceMotion } = useReducedMotionContext()

  const classes = cn(
    'relative inline-flex items-center text-emerald-500 font-medium text-sm py-2',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded',
    // underline draw-in from left
    'after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-emerald-500',
    'after:origin-left after:scale-x-0',
    shouldReduceMotion
      ? 'hover:after:scale-x-100'
      : 'after:transition-transform after:duration-250 after:ease-out hover:after:scale-x-100 hover:after:origin-left',
    className,
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {label}
    </button>
  )
}
