'use client'

import { motion } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
import type { IconName } from '@/config/icons'

type ProcessStepCardProps = {
  stepNumber: number
  icon: IconName
  title: string
  description: string
  phase?: string
  subtitle?: string
  className?: string
}

export function ProcessStepCard({
  stepNumber,
  icon,
  title,
  description,
  phase,
  subtitle,
  className,
}: ProcessStepCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={cn('relative flex gap-3 rounded-xl px-4 py-5 glass border border-white/8', className)}
    >
      <div className="flex flex-col items-center gap-2 flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-sm font-bold text-emerald-500 leading-none">{stepNumber}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 min-w-0">
        {phase && (
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-emerald-500/60">
            {phase}
          </span>
        )}
        <div className="flex items-center gap-2">
          <Icon name={icon} size="sm" className="text-emerald-500 flex-shrink-0" aria-hidden="true" />
          <h3 className="text-base font-semibold text-white leading-snug break-words">{title}</h3>
        </div>
        {subtitle && (
          <p className="text-sm text-white/40 leading-snug -mt-0.5 break-words">{subtitle}</p>
        )}
        <p className="body-sm text-white/60 leading-relaxed break-words">{description}</p>
      </div>
    </motion.div>
  )
}
