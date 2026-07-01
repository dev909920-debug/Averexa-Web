'use client'

import { useState } from 'react'
import { useNavScroll } from '@/hooks/useNavScroll'
import { NavPill } from './NavPill'
import { MobileNavDrawer } from './MobileNavDrawer'
import { cn } from '@/lib/utils'

export function Navbar() {
  const isScrolled = useNavScroll()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-30 transition-all duration-300',
          isScrolled ? 'py-2' : 'py-0',
        )}
        role="banner"
      >
        <NavPill
          isScrolled={isScrolled}
          mobileOpen={mobileOpen}
          onMobileToggle={() => setMobileOpen((prev) => !prev)}
        />
      </header>

      <MobileNavDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
