'use client'

import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

type MobileMenuButtonProps = {
  isOpen: boolean
  onClick: () => void
}

export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      onClick={onClick}
      className={cn(
        'relative h-11 w-11 inline-flex items-center justify-center rounded-md',
        'text-white/70 hover:text-white hover:bg-white/10',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
      )}
    >
      <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span
            key="close"
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </motion.span>
        ) : (
          <motion.span
            key="menu"
            initial={{ opacity: 0, rotate: 45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -45 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
