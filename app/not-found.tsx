import type { Metadata } from 'next'
import { NotFoundContent } from '@/components/error/NotFoundContent'

export const metadata: Metadata = {
  title: '404 Page Not Found | Averexa',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return <NotFoundContent />
}
