'use client'

import { motion } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { MOTION } from '@/config/motion'

export type ProcessNodeState = 'inactive' | 'active' | 'completed'

type ProcessNodeProps = {
  state: ProcessNodeState
  number: number
}

export function ProcessNode({ state, number }: ProcessNodeProps) {
  const isInactive = state === 'inactive'
  const isCompleted = state === 'completed'

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow ring visible once active or completed */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          opacity: isInactive ? 0 : 1,
          scale: isInactive ? 0.6 : 1,
        }}
        transition={{ duration: 0.4, ease: MOTION.ease.brand }}
        style={{ boxShadow: '0 0 0 6px rgba(26,138,113,0.12), 0 0 24px rgba(26,138,113,0.45)' }}
      />

      <motion.div
        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2"
        initial={false}
        animate={{
          scale: isInactive ? 0.85 : 1,
          backgroundColor: isInactive ? 'rgba(15,23,42,0.9)' : 'rgba(26,138,113,0.18)',
          borderColor: isInactive ? 'rgba(148,163,184,0.4)' : '#1A8A71',
        }}
        transition={{ duration: 0.35, ease: MOTION.ease.brand }}
      >
        {isCompleted ? (
          <Icon name="CheckCircle2" size="md" className="text-emerald-500" aria-hidden="true" />
        ) : (
          <motion.span
            initial={false}
            animate={{ color: isInactive ? '#94a3b8' : '#1A8A71' }}
            transition={{ duration: 0.35, ease: MOTION.ease.brand }}
            className="text-sm font-bold leading-none"
          >
            {number}
          </motion.span>
        )}
      </motion.div>
    </div>
  )
}
