import Link from 'next/link'
import Image from 'next/image'

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-ink-900">
      {/* Minimal logo-only header */}
      <header className="border-b border-white/8">
        <div className="container-site flex h-20 items-center">
          <Link
            href="/"
            aria-label="Averexa Placement — Home"
            className="inline-flex items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <Image src="/brand/logo.svg" alt="Averexa Placement" width={96} height={96} className="h-24 w-auto" />
            <span className="text-base font-semibold text-white">Averexa Placement</span>
          </Link>
        </div>
      </header>

      <main id="main-content" className="flex-1">
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
