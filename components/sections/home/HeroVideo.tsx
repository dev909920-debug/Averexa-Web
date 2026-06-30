'use client'

import { motion } from 'motion/react'
import type { MotionStyle } from 'motion/react'

export function HeroVideo({ style }: { style: MotionStyle }) {
  return (
    <motion.div className="absolute inset-0" style={style}>
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="https://files.catbox.moe/dq66me.mp4" type="video/mp4" />
      </video>
    </motion.div>
  )
}
