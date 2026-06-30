'use client'

import { useEffect, useRef } from 'react'
import type { MotionStyle } from 'motion/react'
import { motion } from 'motion/react'

export function HeroVideo({ style }: { style: MotionStyle }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let blobUrl: string | null = null

    const loadVideo = async () => {
      try {
        const res = await fetch('https://files.catbox.moe/dq66me.mp4')
        const blob = await res.blob()
        blobUrl = URL.createObjectURL(blob)
        video.src = blobUrl
      } catch {
        video.src = 'https://files.catbox.moe/dq66me.mp4'
      }
    }

    loadVideo()

    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl)
    }
  }, [])

  return (
    <motion.video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover object-center"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      style={style}
    />
  )
}
