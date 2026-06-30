'use client'

import dynamic from 'next/dynamic'

// Rendered client-only: ProcessFlow picks desktop vs. mobile layout via a
// media query, and the two layouts differ structurally (scroll-linked SVG
// vs. a card stack). Skipping SSR here avoids a hydration mismatch and the
// resulting flash/swap between layouts on first paint. `ssr: false` requires
// a Client Component boundary, which is why this lives in its own file.
const ProcessFlow = dynamic(
  () => import('@/features/process/ProcessFlow').then((m) => m.ProcessFlow),
  { ssr: false, loading: () => <div className="min-h-[600px]" /> },
)

export function ProcessFlowClient() {
  return <ProcessFlow />
}
