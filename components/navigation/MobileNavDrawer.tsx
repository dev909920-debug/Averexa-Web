'use client'

import { motion, AnimatePresence } from 'motion/react'
import * as Dialog from '@radix-ui/react-dialog'
import { NavLinks } from './NavLinks'
import { NavCTA } from './NavCTA'
import { IconButton } from '@/components/ui/IconButton'
import { BRAND_EASE } from '@/lib/motion'

type MobileNavDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

export function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            {/* Backdrop */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={onClose}
              />
            </Dialog.Overlay>

            {/* Drawer */}
            <Dialog.Content asChild>
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.35, ease: BRAND_EASE }}
                className="fixed right-0 top-0 bottom-0 w-[min(320px,90vw)] bg-ink-900 border-l border-white/10 z-50 flex flex-col p-6"
                id="mobile-menu"
                aria-label="Mobile navigation"
              >
                <Dialog.Title className="sr-only">Navigation Menu</Dialog.Title>

                {/* Close button */}
                <div className="flex justify-end mb-8">
                  <IconButton
                    icon="X"
                    aria-label="Close navigation menu"
                    onClick={onClose}
                  />
                </div>

                {/* Nav links stagger in */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                  }}
                  className="flex-1"
                >
                  <NavLinks orientation="vertical" onNavigate={onClose} />
                </motion.div>

                {/* CTA at bottom */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <NavCTA />
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
