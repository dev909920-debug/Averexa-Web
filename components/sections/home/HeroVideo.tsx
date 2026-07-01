'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import type { MotionStyle } from 'motion/react'

const YOUTUBE_VIDEO_ID = 'Yr1wbFkyaLI'

export function HeroVideo({ style }: { style: MotionStyle }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div className="absolute inset-0 overflow-hidden" style={style}>
      <iframe
        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1&fs=0`}
        className={`absolute transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          pointerEvents: 'none',
          border: 0,
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '56.25vw',
          minHeight: '100vh',
          minWidth: '177.78vh',
          transform: 'translate(-50%, -50%)',
        }}
        allow="autoplay; encrypted-media"
        allowFullScreen
        aria-hidden="true"
        title="hero-background"
      />
      <div className="absolute inset-0" aria-hidden="true" />
    </motion.div>
  )
}
