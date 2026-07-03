'use client'

import { useRef } from 'react'
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
} from 'motion/react'
import type { MotionValue } from 'motion/react'

interface Pt { x: number; y: number }

type ZigzagPathProps = {
  points: Pt[]
  svgW: number
  svgH: number
  scrollYProgress: MotionValue<number>
}

function buildPath(pts: Pt[]): string {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x},${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i]
    const p1 = pts[i + 1]
    const midY = (p0.y + p1.y) / 2
    d += ` C ${p0.x},${midY} ${p1.x},${midY} ${p1.x},${p1.y}`
  }
  return d
}

export function ZigzagPath({ points, svgW, svgH, scrollYProgress }: ZigzagPathProps) {
  const pathRef = useRef<SVGPathElement>(null)

  // Motion values for the glowing dot position (updated imperatively to avoid re-renders)
  const dotX = useMotionValue(points[0]?.x ?? 0)
  const dotY = useMotionValue(points[0]?.y ?? 0)

  const rawProgress = useTransform(scrollYProgress, [0.02, 0.96], [0, 1])
  const pathLength = useSpring(rawProgress, { stiffness: 60, damping: 20 })

  // Dot fades in once the path starts drawing
  const dotOpacity = useTransform(pathLength, [0, 0.03], [0, 1])

  // Track the drawing tip along the SVG path
  useMotionValueEvent(pathLength, 'change', (latest) => {
    const el = pathRef.current
    if (!el) return
    const total = el.getTotalLength()
    if (total === 0) return
    const pt = el.getPointAtLength(Math.min(latest, 1) * total)
    dotX.set(pt.x)
    dotY.set(pt.y)
  })

  const d = buildPath(points)
  if (!d || svgW === 0) return null

  return (
    <svg
      className="absolute inset-0 pointer-events-none hidden md:block"
      style={{ width: svgW, height: svgH, zIndex: 2, overflow: 'visible' }}
    >
      <defs>
        {/* Stroke gradient light mint at top fading to deep teal */}
        <linearGradient id="zigzag-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#B5EACC" stopOpacity="1" />
          <stop offset="38%"  stopColor="#1A8A71" stopOpacity="1" />
          <stop offset="100%" stopColor="#0A4A37" stopOpacity="0.8" />
        </linearGradient>

        {/* Multi-layer glow for the main stroke */}
        <filter id="zigzag-glow" x="-40%" y="-5%" width="180%" height="110%">
          <feGaussianBlur stdDeviation="6"  result="wide"  in="SourceGraphic" />
          <feGaussianBlur stdDeviation="2.5" result="tight" in="SourceGraphic" />
          <feMerge>
            <feMergeNode in="wide" />
            <feMergeNode in="tight" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Intense glow for the traveling dot */}
        <filter id="dot-glow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="8"  result="outer" in="SourceGraphic" />
          <feGaussianBlur stdDeviation="3"  result="inner" in="SourceGraphic" />
          <feMerge>
            <feMergeNode in="outer" />
            <feMergeNode in="inner" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ghost path full route shown as faint dashes so the user can see where the line will go */}
      <path
        d={d}
        fill="none"
        stroke="rgba(26,138,113,0.08)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="6 14"
      />

      {/* Animated draw stroke */}
      <motion.path
        ref={pathRef}
        d={d}
        fill="none"
        stroke="url(#zigzag-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#zigzag-glow)"
        style={{ pathLength }}
      />

      {/* Glowing orb at the drawing tip group moves together */}
      <motion.g style={{ x: dotX, y: dotY, opacity: dotOpacity }}>
        {/* Outer pulse ring */}
        <motion.circle
          cx={0} cy={0} r={14}
          fill="none"
          stroke="rgba(181,234,204,0.28)"
          strokeWidth="1"
          animate={{ r: [14, 30, 14], opacity: [0.28, 0, 0.28] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        />
        {/* Middle ring */}
        <motion.circle
          cx={0} cy={0} r={8}
          fill="none"
          stroke="rgba(181,234,204,0.45)"
          strokeWidth="1"
          animate={{ r: [8, 18, 8], opacity: [0.45, 0, 0.45] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
        />
        {/* Core bright dot */}
        <circle
          cx={0} cy={0} r={5}
          fill="#B5EACC"
          filter="url(#dot-glow)"
        />
        {/* Inner white hot core */}
        <circle cx={0} cy={0} r={2.5} fill="white" />
      </motion.g>
    </svg>
  )
}
