'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
import type { IconName } from '@/config/icons'

type CoreValueCardProps = {
  icon: IconName
  title: string
  description: string
  className?: string
}

const SPRING = { stiffness: 280, damping: 28, mass: 0.5 }
const EASE = [0.16, 1, 0.3, 1] as const

export function CoreValueCard({ icon, title, description, className }: CoreValueCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [spot, setSpot] = useState({ x: 0, y: 0 })
  const [touched, setTouched] = useState(false)
  const touchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Spring-smoothed 3D tilt
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotX = useSpring(rawX, SPRING)
  const rotY = useSpring(rawY, SPRING)

  // Icon floats counter to tilt — creates depth illusion
  const iconDX = useTransform(rotY, [-10, 10], [-7, 7])
  const iconDY = useTransform(rotX, [-10, 10], [7, -7])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    rawX.set(((cy - y) / cy) * 9)
    rawY.set(((x - cx) / cx) * 9)
    setSpot({ x, y })
  }

  function handleMouseLeave() {
    setIsHovered(false)
    rawX.set(0)
    rawY.set(0)
  }

  const handleTouchStart = useCallback(() => {
    if (touchTimer.current) clearTimeout(touchTimer.current)
    setTouched(true)
    touchTimer.current = setTimeout(() => setTouched(false), 650)
  }, [])

  const variant = isHovered ? 'hover' : 'rest'

  return (
    // Perspective wrapper — keeps perspective off the transforming element
    <div style={{ perspective: '900px' }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        whileTap={{ scale: 0.97 }}
        animate={variant}
        initial="rest"
        style={{ rotateX: rotX, rotateY: rotY }}
        className={cn('group relative overflow-hidden rounded-xl p-6 glass', className)}
        variants={{
          rest: {
            borderColor: 'rgba(255,255,255,0.07)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
          },
          hover: {
            borderColor: 'rgba(26,138,113,0.42)',
            boxShadow:
              '0 28px 72px rgba(0,0,0,0.55), 0 0 0 1px rgba(26,138,113,0.22), 0 0 56px rgba(26,138,113,0.12)',
            transition: { duration: 0.28, ease: EASE },
          },
        }}
      >
        {/* ── Cursor spotlight (desktop) ── */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(340px circle at ${spot.x}px ${spot.y}px, rgba(26,138,113,0.13), transparent 65%)`,
          }}
        />

        {/* ── Touch glow (mobile) ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-500"
          style={{
            opacity: touched ? 1 : 0,
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(26,138,113,0.2) 0%, transparent 65%)',
          }}
        />

        {/* ── Shimmer sweep ── */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.055) 50%, transparent 75%)',
            skewX: -15,
          }}
          variants={{
            rest: { x: '-130%' },
            hover: { x: '130%', transition: { duration: 0.52, ease: EASE } },
          }}
        />

        {/* ── Top accent line ── */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-5 right-5 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(26,138,113,0.7), transparent)',
          }}
          variants={{
            rest: { opacity: 0, scaleX: 0.12 },
            hover: { opacity: 1, scaleX: 1, transition: { duration: 0.4 } },
          }}
        />

        {/* ── Corner ambient glow ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: 'radial-gradient(circle, rgba(26,138,113,0.1), transparent 70%)',
          }}
        />

        {/* ── Icon — floats counter to tilt ── */}
        <motion.div
          className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-lg"
          style={{
            background:
              'linear-gradient(135deg, rgba(26,138,113,0.14), rgba(181,234,204,0.05))',
            border: '1px solid rgba(26,138,113,0.18)',
            x: iconDX,
            y: iconDY,
          }}
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.12, transition: { duration: 0.25, ease: EASE } },
          }}
        >
          <motion.span
            variants={{
              rest: { color: '#B5EACC' },
              hover: { color: '#23A88A', transition: { duration: 0.2 } },
            }}
          >
            <Icon name={icon} size="md" aria-hidden="true" />
          </motion.span>
        </motion.div>

        {/* ── Text ── */}
        <div className="relative flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-white leading-snug">{title}</h3>
          <p className="body-sm text-white/60 leading-relaxed">{description}</p>
        </div>
      </motion.div>
    </div>
  )
}
