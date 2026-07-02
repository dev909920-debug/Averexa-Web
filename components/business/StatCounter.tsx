'use client'

import { useEffect, useRef } from 'react'
import { useInView } from 'motion/react'
import { cn } from '@/lib/utils'
import { useCounterAnimation } from '@/hooks/useCounterAnimation'

type StatCounterProps = {
  value: number
  label: string
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

export function StatCounter({
  value,
  label,
  suffix = '',
  prefix = '',
  decimals = 0,
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-80px' })
  const { displayValue, trigger, reset } = useCounterAnimation(value, 0.8, decimals)

  useEffect(() => {
    if (isInView) trigger()
    else reset()
  }, [isInView, trigger, reset])

  const staticLabel = `${prefix}${value.toFixed(decimals)}${suffix} — ${label}`

  return (
    <div
      ref={ref}
      className={cn('flex flex-col items-start gap-1', className)}
      aria-label={staticLabel}
    >
      <p className="stat-number text-white" aria-hidden="true">
        {prefix}
        <span>{displayValue}</span>
        {suffix}
      </p>
      <p className="text-sm text-white/60 font-medium leading-snug">{label}</p>
    </div>
  )
}
