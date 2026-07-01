'use client'

import { motion, AnimatePresence } from 'motion/react'
import { NavLinks } from './NavLinks'
import { NavCTA } from './NavCTA'
import { MobileMenuButton } from './MobileMenuButton'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type NavPillProps = {
  isScrolled: boolean
  mobileOpen: boolean
  onMobileToggle: () => void
  className?: string
}

export function NavPill({ isScrolled, mobileOpen, onMobileToggle, className }: NavPillProps) {
  return (
    <motion.div
      initial={false}
      animate={
        isScrolled
          ? {
              maxWidth: '900px',
              borderRadius: '9999px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            }
          : {
              maxWidth: '1280px',
              borderRadius: '0px',
              boxShadow: 'none',
            }
      }
      transition={{ type: 'spring', stiffness: 220, damping: 25 }}
      className={cn(
        'w-full mx-auto',
        isScrolled ? 'glass border border-white/10 px-6' : 'px-6 lg:px-12',
        className,
      )}
    >
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md"
          aria-label="Averexa Placement — Home"
        >
          <Image
            src="/brand/logo-nav.svg"
            alt="Averexa Placement"
            width={64}
            height={64}
            className="h-16 w-auto"
            priority
          />
          <span className="md:hidden text-white font-semibold text-base whitespace-nowrap">
            Averexa Placements
          </span>
          <div className="hidden md:block">
            <AnimatePresence>
              {!isScrolled && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-white font-semibold text-base overflow-hidden whitespace-nowrap"
                >
                  Averexa Placement
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex">
          <NavLinks />
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <NavCTA />
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <MobileMenuButton isOpen={mobileOpen} onClick={onMobileToggle} />
        </div>
      </div>
    </motion.div>
  )
}
