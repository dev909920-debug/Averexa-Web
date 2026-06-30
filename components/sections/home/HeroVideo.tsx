'use client'

import type { MotionStyle } from 'motion/react'
import { motion } from 'motion/react'

export function HeroVideo({ style }: { style: MotionStyle }) {
  return (
    <motion.video
      className="absolute inset-0 h-full w-full object-cover object-center"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      style={style}
    >
      <source src="https://files.catbox.moe/dq66me.mp4" type="video/mp4" />
    </motion.video>
  )
}
