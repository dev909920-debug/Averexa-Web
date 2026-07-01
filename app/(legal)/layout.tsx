import Link from 'next/link'
import { Navbar } from '@/components/navigation/Navbar'

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-ink-900">
      <Navbar />

      <main id="main-content" className="flex-1 pt-20 md:pt-32">
        {children}
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-white/8 py-8">
        <div className="container-site flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-white/40">© 2026 Averexa Placement. All rights reserved.</p>
          <nav aria-label="Legal navigation" className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-white/50 hover:text-emerald-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/50 hover:text-emerald-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/" className="text-white/50 hover:text-emerald-400 transition-colors">
              Back to Home
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
