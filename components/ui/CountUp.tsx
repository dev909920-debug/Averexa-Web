'use client'

import { useRef, useState, useEffect } from 'react'
import { animate, useInView } from 'motion/react'

type CountUpProps = {
  value: number
  decimals?: number
  duration?: number
}

export function CountUp({ value, decimals = 0, duration = 1.5 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: false })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplay(latest.toFixed(decimals))
      },
    })
    return controls.stop
  }, [inView, value, decimals, duration])

  return <span ref={ref}>{display}</span>
}
