'use client'

import { motion } from 'motion/react'
import { useReducedMotionContext } from '@/hooks/useReducedMotionContext'
import { site } from '@/config/site'
import { Icon } from '@/components/ui/Icon'

const WHATSAPP_NUMBER = site.whatsapp
const LINKEDIN_URL = site.social.linkedin

const ease = [0.16, 1, 0.3, 1] as const

type FabButtonProps = {
  href: string
  label: string
  color: string
  ringClassName: string
  delay: number
  shouldReduceMotion: boolean
  children: React.ReactNode
}

function FabButton({ href, label, color, ringClassName, delay, shouldReduceMotion, children }: FabButtonProps) {
  return (
    <motion.div
      className="group relative flex items-center"
      initial={{ opacity: 0, scale: 0.6, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease }}
    >
      {/* Tooltip — desktop only */}
      <span
        className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-ink-900/95 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg shadow-black/30 ring-1 ring-white/10 transition-opacity duration-200 group-hover:opacity-100 sm:block"
        aria-hidden="true"
      >
        {label}
      </span>

      <div className="relative h-14 w-14">
        {/* Pulse ring */}
        {!shouldReduceMotion && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ background: color }}
            aria-hidden="true"
          />
        )}

        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 ${ringClassName}`}
          style={{ background: color }}
        >
          {children}
        </motion.a>
      </div>
    </motion.div>
  )
}

export function WhatsAppFAB() {
  const { shouldReduceMotion } = useReducedMotionContext()

  return (
    <div
      className="floating-safe-bottom fixed right-4 z-[100] flex flex-col items-end gap-3 sm:right-6"
      role="complementary"
      aria-label="Contact Averexa"
    >
      {/* LinkedIn */}
      <FabButton
        href={LINKEDIN_URL}
        label="Connect on LinkedIn"
        color="#0A66C2"
        ringClassName="focus-visible:ring-[#0A66C2]"
        delay={0.28}
        shouldReduceMotion={shouldReduceMotion}
      >
        <Icon name="Linkedin" className="h-7 w-7 text-white" aria-hidden="true" strokeWidth={1.75} />
      </FabButton>

      {/* WhatsApp */}
      <FabButton
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        label="Chat on WhatsApp"
        color="#25D366"
        ringClassName="focus-visible:ring-[#25D366]"
        delay={0.1}
        shouldReduceMotion={shouldReduceMotion}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </FabButton>
    </div>
  )
}
