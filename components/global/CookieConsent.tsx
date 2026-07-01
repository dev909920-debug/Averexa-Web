'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { updateAnalyticsConsent } from '@/features/analytics/events'

const CONSENT_KEY = 'consent_status'

export function CookieConsent() {
  const [visible, setVisible] = useState(
    () => typeof window !== 'undefined' && !localStorage.getItem(CONSENT_KEY)
  )

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    updateAnalyticsConsent(true)
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'declined')
    updateAnalyticsConsent(false)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          className="fixed bottom-24 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 glass border border-white/10 rounded-xl p-4 shadow-xl shadow-black/40"
        >
          <p className="text-sm text-white/80 leading-relaxed mb-4">
            We use cookies to improve your experience. See our{' '}
            <Link href="/privacy" className="underline text-emerald-400 hover:text-emerald-300">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex gap-2">
            <button
              onClick={accept}
              className="flex-1 h-11 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              Accept
            </button>
            <button
              onClick={decline}
              className="flex-1 h-11 rounded-lg border border-white/20 text-white/70 hover:text-white text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
