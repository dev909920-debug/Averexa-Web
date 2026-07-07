'use client'

import { motion } from 'motion/react'
import type { MotionStyle } from 'motion/react'

const VIDEO_URL =
  'https://res.cloudinary.com/yig3etij/video/upload/v1783422001/dq66me_uy7e0k.mp4'

export function HeroVideo({ style }: { style: MotionStyle }) {
  return (
    <motion.div className="absolute inset-0 overflow-hidden" style={style}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        className="absolute inset-0 h-full w-full"
        style={{ objectFit: 'cover', pointerEvents: 'none' }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      <div className="absolute inset-0" aria-hidden="true" />
    </motion.div>
  )
}
