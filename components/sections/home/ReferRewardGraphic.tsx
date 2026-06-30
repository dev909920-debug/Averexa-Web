'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export function ReferRewardGraphic({ className }: Props) {
  return (
    <div className={cn('relative flex items-center justify-center', className)} aria-hidden="true">
      {/* Concentric glow rings */}
      {[
        { size: 420, border: 'rgba(26,138,113,0.20)', glow: 'rgba(26,138,113,0.06)', delay: 0 },
        { size: 360, border: 'rgba(26,138,113,0.25)', glow: 'rgba(26,138,113,0.08)', delay: 0.3 },
        { size: 300, border: 'rgba(26,138,113,0.30)', glow: 'rgba(26,138,113,0.10)', delay: 0.6 },
        { size: 240, border: 'rgba(26,138,113,0.35)', glow: 'rgba(26,138,113,0.12)', delay: 0.9 },
        { size: 180, border: 'rgba(26,138,113,0.40)', glow: 'rgba(26,138,113,0.15)', delay: 1.2 },
      ].map((ring) => (
        <motion.div
          key={ring.size}
          className="absolute pointer-events-none"
          style={{
            width: ring.size,
            height: ring.size,
            borderRadius: '50%',
            border: '1.5px solid',
            borderColor: ring.border,
            boxShadow: `inset 0 0 ${ring.size * 0.15}px ${ring.glow}, 0 0 ${ring.size * 0.08}px ${ring.glow}`,
          }}
          animate={{
            scale: [0.92, 1.08, 0.92],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: ring.delay,
          }}
        />
      ))}

      {/* Sparkles */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-emerald-300"
        style={{ top: '4%', right: '8%', boxShadow: '0 0 10px rgba(26,138,113,0.7)' }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-amber-300"
        style={{ top: '12%', left: '4%', boxShadow: '0 0 10px rgba(245,158,11,0.6)' }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-emerald-200"
        style={{ bottom: '8%', right: '12%', boxShadow: '0 0 10px rgba(26,138,113,0.7)' }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-amber-200"
        style={{ bottom: '18%', left: '6%', boxShadow: '0 0 10px rgba(245,158,11,0.6)' }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />

      <div className="relative" style={{ width: 480, height: 380 }}>
        <Image
          src="/assets/hero/refer-reward-graphic.png"
          alt=""
          fill
          className="object-contain"
          sizes="480px"
          priority
        />
      </div>
    </div>
  )
}
