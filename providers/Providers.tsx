'use client'

import { ReducedMotionProvider } from './ReducedMotionProvider'
import { LenisProvider } from './LenisProvider'
import { Toaster } from '@/components/ui/sonner'
import { Preloader } from '@/components/preloader/Preloader'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReducedMotionProvider>
      <Preloader />
      <LenisProvider>
        {children}
        <Toaster />
      </LenisProvider>
    </ReducedMotionProvider>
  )
}
