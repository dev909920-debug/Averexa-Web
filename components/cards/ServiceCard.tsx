'use client'

import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { TextLinkButton } from '@/components/ui/TextLinkButton'
import { cn } from '@/lib/utils'
import type { IconName } from '@/config/icons'

type ServiceCardProps = {
  icon: IconName
  title: string
  description: string
  href?: string
  className?: string
}

export function ServiceCard({ icon, title, description, href, className }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    })
  }

  function handleMouseLeave() {
    setSpotlight((prev) => ({ ...prev, visible: false }))
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial="rest"
      whileHover="hover"
      className={cn(
        'group relative overflow-hidden rounded-xl p-6',
        'glass',
        className,
      )}
      variants={{
        rest: {
          y: 0,
          borderColor: 'rgba(255,255,255,0.06)',
          boxShadow: '0 0 0 rgba(26,138,113,0)',
        },
        hover: {
          y: -6,
          scale: 1.02,
          borderColor: 'rgba(26,138,113,0.25)',
          boxShadow: '0 12px 44px rgba(26,138,113,0.25)',
          transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {/* Cursor-following spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.visible ? 1 : 0,
          background: `radial-gradient(280px circle at ${spotlight.x}px ${spotlight.y}px, rgba(26,138,113,0.1), transparent 70%)`,
        }}
      />

      {/* Top gradient accent bar */}
      <motion.div
        className="pointer-events-none absolute top-0 left-6 right-6 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(26,138,113,0.5), transparent)',
        }}
        variants={{
          rest: { opacity: 0, scaleX: 0.3 },
          hover: { opacity: 1, scaleX: 1, transition: { duration: 0.3 } },
        }}
      />

      {/* Ambient corner glow */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(circle, rgba(26,138,113,0.08), transparent 70%)',
        }}
      />

      <motion.div
        className="relative flex h-11 w-11 items-center justify-center rounded-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(26,138,113,0.12), rgba(181,234,204,0.05))',
          border: '1px solid rgba(26,138,113,0.15)',
        }}
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.1, transition: { duration: 0.2 } },
        }}
      >
        <motion.span
          variants={{
            rest: { color: '#FFFFFF' },
            hover: { color: '#23A88A', transition: { duration: 0.2 } },
          }}
        >
          <Icon name={icon} size="md" aria-hidden="true" />
        </motion.span>
      </motion.div>

      <div className="relative flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-white leading-snug">{title}</h3>
        <p className="body-sm text-white/60 leading-relaxed">{description}</p>
      </div>

      {href && (
        <div className="relative mt-auto pt-2">
          <TextLinkButton label="Learn more" href={href} />
        </div>
      )}
    </motion.div>
  )
}
